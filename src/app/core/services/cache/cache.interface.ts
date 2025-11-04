/**
 * Cache entry interface
 */
export interface ICacheEntry<T = any> {
  key: string;
  value: T;
  timestamp: number;
  ttl?: number; // Time to live in milliseconds
  expiresAt?: number; // Expiration timestamp
}

/**
 * Cache configuration interface
 */
export interface ICacheConfig {
  ttl?: number; // Time to live in milliseconds
  maxSize?: number; // Maximum cache size
  strategy?: 'LRU' | 'FIFO'; // Eviction strategy
  enabled?: boolean; // Whether caching is enabled
}

/**
 * Cache statistics interface
 */
export interface ICacheStats {
  size: number;
  hits: number;
  misses: number;
  hitRate: number;
  evictions: number;
}

/**
 * Cache strategy enum
 */
export type CacheStrategy = 'cache-first' | 'network-first' | 'cache-only' | 'network-only';

