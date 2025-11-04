import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { CacheService } from '../services/cache/cache.service';
import { CacheStrategy } from '../services/cache/cache.interface';

/**
 * Cache interceptor
 * Implements HTTP response caching with different strategies
 */
@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  private readonly cacheService = inject(CacheService);

  /**
   * Intercepts HTTP requests to implement caching
   * @param request - HTTP request
   * @param next - Next handler
   * @returns Observable of HTTP event
   */
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Only cache GET requests
    if (request.method !== 'GET') {
      return next.handle(request);
    }

    // Skip cache if flag is set
    if (request.headers.get('skip-cache') === 'true') {
      const cloned = request.clone({
        headers: request.headers.delete('skip-cache')
      });
      return next.handle(cloned);
    }

    // Get cache strategy from header or use default
    const strategy = (request.headers.get('cache-strategy') as CacheStrategy) || 'cache-first';
    const cacheKey = this.getCacheKey(request);
    const ttl = this.getCacheTTL(request);

    // Handle different cache strategies
    switch (strategy) {
      case 'cache-only':
        return this.handleCacheOnly(cacheKey);
      case 'network-only':
        return this.handleNetworkOnly(request, next, cacheKey, ttl);
      case 'network-first':
        return this.handleNetworkFirst(request, next, cacheKey, ttl);
      case 'cache-first':
      default:
        return this.handleCacheFirst(request, next, cacheKey, ttl);
    }
  }

  /**
   * Gets cache key from request
   * @param request - HTTP request
   * @returns Cache key
   * @private
   */
  private getCacheKey(request: HttpRequest<unknown>): string {
    const url = request.urlWithParams;
    return `http_cache:${url}`;
  }

  /**
   * Gets cache TTL from request headers
   * @param request - HTTP request
   * @returns TTL in milliseconds or undefined
   * @private
   */
  private getCacheTTL(request: HttpRequest<unknown>): number | undefined {
    const ttlHeader = request.headers.get('cache-ttl');
    if (ttlHeader) {
      return parseInt(ttlHeader, 10);
    }
    return undefined;
  }

  /**
   * Handles cache-only strategy
   * @param cacheKey - Cache key
   * @returns Observable of cached response or error
   * @private
   */
  private handleCacheOnly(cacheKey: string): Observable<HttpResponse<unknown>> {
    return this.cacheService.get<HttpResponse<unknown>>(cacheKey).pipe(
      switchMap((cached) => {
        if (!cached) {
          return throwError(() => new Error('Cache miss for cache-only strategy'));
        }
        return of(cached);
      })
    );
  }

  /**
   * Handles network-only strategy
   * @param request - HTTP request
   * @param next - Next handler
   * @param cacheKey - Cache key
   * @param ttl - Cache TTL
   * @returns Observable of HTTP event
   * @private
   */
  private handleNetworkOnly(
    request: HttpRequest<unknown>,
    next: HttpHandler,
    cacheKey: string,
    ttl?: number
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          this.cacheService.set(cacheKey, event, ttl);
        }
      })
    );
  }

  /**
   * Handles cache-first strategy
   * @param request - HTTP request
   * @param next - Next handler
   * @param cacheKey - Cache key
   * @param ttl - Cache TTL
   * @returns Observable of HTTP event
   * @private
   */
  private handleCacheFirst(
    request: HttpRequest<unknown>,
    next: HttpHandler,
    cacheKey: string,
    ttl?: number
  ): Observable<HttpEvent<unknown>> {
    return this.cacheService.get<HttpResponse<unknown>>(cacheKey).pipe(
      switchMap((cached) => {
        if (cached) {
          return of(cached);
        }
        return next.handle(request).pipe(
          tap((event) => {
            if (event instanceof HttpResponse) {
              this.cacheService.set(cacheKey, event, ttl);
            }
          })
        );
      })
    );
  }

  /**
   * Handles network-first strategy
   * @param request - HTTP request
   * @param next - Next handler
   * @param cacheKey - Cache key
   * @param ttl - Cache TTL
   * @returns Observable of HTTP event
   * @private
   */
  private handleNetworkFirst(
    request: HttpRequest<unknown>,
    next: HttpHandler,
    cacheKey: string,
    ttl?: number
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          this.cacheService.set(cacheKey, event, ttl);
        }
      })
    );
  }
}

