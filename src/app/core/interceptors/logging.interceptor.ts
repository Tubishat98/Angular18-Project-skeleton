import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggerService } from '../services/logger/logger.service';
import { environment } from '../../../environments/environment';

/**
 * Logging interceptor
 * Logs all HTTP requests and responses
 */
@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  private readonly logger = inject(LoggerService);

  /**
   * Intercepts HTTP requests to log them
   * @param request - HTTP request
   * @param next - Next handler
   * @returns Observable of HTTP event
   */
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Skip logging in production or if flag is set
    if (environment.production || request.headers.get('skip-logging') === 'true') {
      const cloned = request.headers.get('skip-logging')
        ? request.clone({
            headers: request.headers.delete('skip-logging')
          })
        : request;
      return next.handle(cloned);
    }

    const startTime = Date.now();
    const method = request.method;
    const url = request.urlWithParams;

    // Log request
    this.logger.debug(`HTTP ${method} Request`, {
      url,
      headers: this.sanitizeHeaders(request.headers),
      body: request.body
    });

    return next.handle(request).pipe(
      tap({
        next: (event) => {
          if (event instanceof HttpResponse) {
            const duration = Date.now() - startTime;
            this.logger.debug(`HTTP ${method} Response`, {
              url,
              status: event.status,
              statusText: event.statusText,
              duration: `${duration}ms`,
              headers: this.sanitizeHeaders(event.headers),
              body: event.body
            });
          }
        },
        error: (error) => {
          const duration = Date.now() - startTime;
          this.logger.error(`HTTP ${method} Error`, {
            url,
            status: error.status,
            statusText: error.statusText,
            duration: `${duration}ms`,
            error: error.message
          });
        }
      })
    );
  }

  /**
   * Sanitizes headers for logging (removes sensitive data)
   * @param headers - HTTP headers
   * @returns Sanitized headers object
   * @private
   */
  private sanitizeHeaders(headers: any): Record<string, string> {
    const sanitized: Record<string, string> = {};
    const sensitiveHeaders = ['authorization', 'cookie', 'x-api-key'];

    headers.keys().forEach((key: string) => {
      const lowerKey = key.toLowerCase();
      if (sensitiveHeaders.some((sensitive) => lowerKey.includes(sensitive))) {
        sanitized[key] = '***REDACTED***';
      } else {
        sanitized[key] = headers.get(key);
      }
    });

    return sanitized;
  }
}

