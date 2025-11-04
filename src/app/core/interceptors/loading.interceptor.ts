import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AppStateService } from '../services/state/app-state.service';

/**
 * Loading interceptor
 * Manages global loading state for HTTP requests
 */
@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private readonly appState = inject(AppStateService);
  private activeRequests = 0;

  /**
   * Intercepts HTTP requests to manage loading state
   * @param request - HTTP request
   * @param next - Next handler
   * @returns Observable of HTTP event
   */
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Skip loading for specific requests
    if (request.headers.get('skip-loading') === 'true') {
      const cloned = request.clone({
        headers: request.headers.delete('skip-loading')
      });
      return next.handle(cloned);
    }

    // Increment active requests
    this.activeRequests++;
    if (this.activeRequests === 1) {
      this.appState.setLoading(true);
    }

    return next.handle(request).pipe(
      finalize(() => {
        // Decrement active requests
        this.activeRequests--;
        if (this.activeRequests === 0) {
          this.appState.setLoading(false);
        }
      })
    );
  }
}

