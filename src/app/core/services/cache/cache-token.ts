import { InjectionToken } from '@angular/core';
import { ICacheConfig } from './cache.interface';

/**
 * Cache configuration injection token
 * Use this to provide custom cache configuration
 * @example
 * providers: [
 *   {
 *     provide: CACHE_CONFIG_TOKEN,
 *     useValue: { ttl: 60000, maxSize: 50, strategy: 'LRU', enabled: true }
 *   }
 * ]
 */
export const CACHE_CONFIG_TOKEN = new InjectionToken<ICacheConfig>('CACHE_CONFIG');

