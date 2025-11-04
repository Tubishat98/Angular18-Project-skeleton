import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { TokenService } from '../services/auth/token.service';
import { RefreshTokenService } from '../services/auth/refresh-token.service';
import { PUBLIC_ENDPOINTS } from '../constants/api.constants';

/**
 * Auth interceptor
 * Adds Bearer token to requests and handles token refresh
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly tokenService = inject(TokenService);
  private readonly refreshTokenService = inject(RefreshTokenService);
  private readonly isRefreshingSubject = new BehaviorSubject<boolean>(false);

  /**
   * Intercepts HTTP requests to add authentication token
   * @param request - HTTP request
   * @param next - Next handler
   * @returns Observable of HTTP event
   */
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Skip auth for public endpoints
    if (this.isPublicEndpoint(request.url)) {
      return next.handle(request);
    }

    // Skip auth if skipAuth flag is set
    if (request.headers.get('skip-auth') === 'true') {
      const cloned = request.clone({
        headers: request.headers.delete('skip-auth')
      });
      return next.handle(cloned);
    }

    // Add token to request
    const authRequest = this.addTokenToRequest(request);

    return next.handle(authRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle 401 Unauthorized
        if (error.status === 401 && !this.isRefreshingSubject.value) {
          return this.handle401Error(request, next);
        }

        return throwError(() => error);
      })
    );
  }

  /**
   * Adds Bearer token to request
   * @param request - HTTP request
   * @returns Cloned request with Authorization header
   * @private
   */
  private addTokenToRequest(request: HttpRequest<unknown>): HttpRequest<unknown> {
    const token = this.tokenService.getAccessToken();

    if (!token) {
      return request;
    }

    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  /**
   * Checks if endpoint is public (doesn't require auth)
   * @param url - Request URL
   * @returns True if public endpoint
   * @private
   */
  private isPublicEndpoint(url: string): boolean {
    return PUBLIC_ENDPOINTS.some((endpoint) => url.includes(endpoint));
  }

  /**
   * Handles 401 Unauthorized errors by attempting token refresh
   * @param request - Failed request
   * @param next - Next handler
   * @returns Observable of HTTP event
   * @private
   */
  private handle401Error(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.isRefreshingSubject.next(true);

    return this.refreshTokenService.refreshToken().pipe(
      switchMap((refreshResponse) => {
        this.isRefreshingSubject.next(false);
        // Retry the original request with new token
        return next.handle(this.addTokenToRequest(request));
      }),
      catchError((error) => {
        this.isRefreshingSubject.next(false);
        // Refresh failed, clear tokens and redirect to login
        this.tokenService.clearTokens();
        // TODO: Navigate to login page or emit logout event
        return throwError(() => error);
      })
    );
  }
}

