import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, timer } from 'rxjs';
import { retryWhen, mergeMap, take } from 'rxjs/operators';
import { LoggerService } from '../services/logger/logger.service';
import { HttpStatus } from '../enums/http-status.enum';

/**
 * Retry interceptor configuration
 */
interface IRetryConfig {
  maxRetries: number;
  retryDelay: number;
  retryableStatusCodes: number[];
  exponentialBackoff: boolean;
}

/**
 * Default retry configuration
 */
const DEFAULT_RETRY_CONFIG: IRetryConfig = {
  maxRetries: 3,
  retryDelay: 1000,
  retryableStatusCodes: [
    HttpStatus.INTERNAL_SERVER_ERROR,
    HttpStatus.BAD_GATEWAY,
    HttpStatus.SERVICE_UNAVAILABLE,
    HttpStatus.GATEWAY_TIMEOUT
  ],
  exponentialBackoff: true
};

/**
 * Retry interceptor
 * Automatically retries failed HTTP requests
 */
@Injectable()
export class RetryInterceptor implements HttpInterceptor {
  private readonly logger = inject(LoggerService);

  /**
   * Intercepts HTTP requests to implement retry logic
   * @param request - HTTP request
   * @param next - Next handler
   * @returns Observable of HTTP event
   */
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Skip retry if flag is set
    if (request.headers.get('skip-retry') === 'true') {
      const cloned = request.clone({
        headers: request.headers.delete('skip-retry')
      });
      return next.handle(cloned);
    }

    // Get retry config from headers or use default
    const config = this.getRetryConfig(request);

    return next.handle(request).pipe(
      retryWhen((errors) => {
        let retryCount = 0;
        return errors.pipe(
          mergeMap((error: HttpErrorResponse) => {
            // Check if error is retryable
            if (!this.isRetryable(error, config)) {
              return throwError(() => error);
            }

            // Check if max retries reached
            if (retryCount >= config.maxRetries) {
              this.logger.warn('Max retries reached', {
                url: request.url,
                retries: retryCount
              });
              return throwError(() => error);
            }

            retryCount++;
            const delay = this.calculateDelay(retryCount, config);

            this.logger.debug('Retrying request', {
              url: request.url,
              attempt: retryCount,
              delay
            });

            return timer(delay);
          }),
          take(config.maxRetries + 1)
        );
      })
    );
  }

  /**
   * Gets retry configuration from request or uses default
   * @param request - HTTP request
   * @returns Retry configuration
   * @private
   */
  private getRetryConfig(request: HttpRequest<unknown>): IRetryConfig {
    const maxRetries = parseInt(request.headers.get('max-retries') || '0', 10);
    const retryDelay = parseInt(request.headers.get('retry-delay') || '0', 10);
    const exponentialBackoff = request.headers.get('exponential-backoff') !== 'false';

    return {
      maxRetries: maxRetries || DEFAULT_RETRY_CONFIG.maxRetries,
      retryDelay: retryDelay || DEFAULT_RETRY_CONFIG.retryDelay,
      retryableStatusCodes: DEFAULT_RETRY_CONFIG.retryableStatusCodes,
      exponentialBackoff
    };
  }

  /**
   * Checks if error is retryable
   * @param error - HTTP error response
   * @param config - Retry configuration
   * @returns True if retryable
   * @private
   */
  private isRetryable(error: HttpErrorResponse, config: IRetryConfig): boolean {
    // Don't retry client errors (4xx) except specific ones
    if (error.status >= 400 && error.status < 500) {
      return config.retryableStatusCodes.includes(error.status);
    }

    // Retry server errors (5xx) and network errors (0)
    return (
      error.status === 0 ||
      error.status >= 500 ||
      config.retryableStatusCodes.includes(error.status)
    );
  }

  /**
   * Calculates delay for retry
   * @param retryCount - Current retry attempt
   * @param config - Retry configuration
   * @returns Delay in milliseconds
   * @private
   */
  private calculateDelay(retryCount: number, config: IRetryConfig): number {
    if (!config.exponentialBackoff) {
      return config.retryDelay;
    }

    // Exponential backoff: delay * 2^(retryCount - 1)
    return config.retryDelay * Math.pow(2, retryCount - 1);
  }
}

