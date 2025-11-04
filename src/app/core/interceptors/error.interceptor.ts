import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandlerService } from '../services/error/error-handler.service';

/**
 * Error interceptor
 * Handles HTTP errors globally
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private readonly errorHandler = inject(ErrorHandlerService);

  /**
   * Intercepts HTTP requests to handle errors
   * @param request - HTTP request
   * @param next - Next handler
   * @returns Observable of HTTP event
   */
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Skip error handling if flag is set
    if (request.headers.get('skip-error-handling') === 'true') {
      const cloned = request.clone({
        headers: request.headers.delete('skip-error-handling')
      });
      return next.handle(cloned);
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle network errors
        if (!error.error && error.status === 0) {
          this.errorHandler.handleError(
            this.errorHandler.createError(
              'Network error. Please check your connection.',
              'NETWORK_ERROR'
            )
          );
          return throwError(() => error);
        }

        // Handle HTTP errors
        this.errorHandler.handleHttpError(error);
        return throwError(() => error);
      })
    );
  }
}

