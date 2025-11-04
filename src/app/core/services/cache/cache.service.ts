import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  ICacheEntry,
  ICacheConfig,
  ICacheStats,
  CacheStrategy
} from './cache.interface';
import { DEFAULT_CACHE_CONFIG } from './cache-config';

/**
 * Cache service
 * Provides in-memory caching with TTL and eviction strategies
 */
@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private readonly cache = new Map<string, ICacheEntry>();
  private readonly config: ICacheConfig;
  private stats = {
    hits: 0,
    misses: 0,
    evictions: 0
  };

  constructor() {
    // Use default configuration
    // TODO: If you need custom configuration, create an InjectionToken
    // and provide it via APP_INITIALIZER or use environment config
    this.config = { ...DEFAULT_CACHE_CONFIG };
    this.startCleanupInterval();
  }

  /**
   * Gets a value from cache
   * @param key - Cache key
   * @returns Observable of cached value or null if not found/expired
   * @example
   * this.cacheService.get<User>('user:123').subscribe(value => {
   *   if (value) {
   *     // Use cached value
   *   }
   * });
   */
  get<T>(key: string): Observable<T | null> {
    const entry = this.cache.get(key);

    if (!entry) {
      this.stats.misses++;
      return of(null);
    }

    // Check if expired
    if (this.isExpired(entry)) {
      this.cache.delete(key);
      this.stats.misses++;
      return of(null);
    }

    this.stats.hits++;
    return of(entry.value as T);
  }

  /**
   * Sets a value in cache
   * @param key - Cache key
   * @param value - Value to cache
   * @param ttl - Time to live in milliseconds (optional, uses config default)
   * @returns True if successful
   * @example
   * this.cacheService.set('user:123', userData, 60000);
   */
  set<T>(key: string, value: T, ttl?: number): boolean {
    if (!this.config.enabled) {
      return false;
    }

    const entryTtl = ttl ?? this.config.ttl;
    const timestamp = Date.now();
    const expiresAt = entryTtl ? timestamp + entryTtl : undefined;

    const entry: ICacheEntry<T> = {
      key,
      value,
      timestamp,
      ttl: entryTtl,
      expiresAt
    };

    // Check if we need to evict
    if (this.config.maxSize && this.cache.size >= this.config.maxSize) {
      this.evict();
    }

    this.cache.set(key, entry);
    return true;
  }

  /**
   * Removes a value from cache
   * @param key - Cache key
   * @returns True if removed
   * @example
   * this.cacheService.delete('user:123');
   */
  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  /**
   * Clears all cache entries
   * @example
   * this.cacheService.clear();
   */
  clear(): void {
    this.cache.clear();
    this.resetStats();
  }

  /**
   * Checks if a key exists in cache
   * @param key - Cache key
   * @returns True if exists and not expired
   * @example
   * if (this.cacheService.has('user:123')) {
   *   // Key exists
   * }
   */
  has(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry) {
      return false;
    }
    return !this.isExpired(entry);
  }

  /**
   * Gets cache statistics
   * @returns Cache statistics
   * @example
   * const stats = this.cacheService.getStats();
   * console.log('Hit rate:', stats.hitRate);
   */
  getStats(): ICacheStats {
    const total = this.stats.hits + this.stats.misses;
    const hitRate = total > 0 ? this.stats.hits / total : 0;

    return {
      size: this.cache.size,
      hits: this.stats.hits,
      misses: this.stats.misses,
      hitRate,
      evictions: this.stats.evictions
    };
  }

  /**
   * Invalidates cache entries matching a pattern
   * @param pattern - Pattern to match (string or regex)
   * @returns Number of entries removed
   * @example
   * this.cacheService.invalidatePattern(/^user:/);
   */
  invalidatePattern(pattern: string | RegExp): number {
    let count = 0;
    const regex = typeof pattern === 'string' ? new RegExp(pattern) : pattern;

    for (const key of this.cache.keys()) {
      if (regex.test(key)) {
        this.cache.delete(key);
        count++;
      }
    }

    return count;
  }

  /**
   * Warms the cache with multiple entries
   * @param entries - Array of key-value pairs
   * @example
   * this.cacheService.warmCache([
   *   { key: 'user:1', value: user1 },
   *   { key: 'user:2', value: user2 }
   * ]);
   */
  warmCache<T>(entries: Array<{ key: string; value: T; ttl?: number }>): void {
    entries.forEach((entry) => {
      this.set(entry.key, entry.value, entry.ttl);
    });
  }

  /**
   * Checks if an entry is expired
   * @param entry - Cache entry
   * @returns True if expired
   * @private
   */
  private isExpired(entry: ICacheEntry): boolean {
    if (!entry.expiresAt) {
      return false;
    }
    return Date.now() >= entry.expiresAt;
  }

  /**
   * Evicts an entry based on strategy
   * @private
   */
  private evict(): void {
    if (this.cache.size === 0) {
      return;
    }

    let keyToEvict: string | null = null;

    if (this.config.strategy === 'LRU') {
      // Find oldest entry (lowest timestamp)
      let oldestTimestamp = Infinity;
      for (const [key, entry] of this.cache.entries()) {
        if (entry.timestamp < oldestTimestamp) {
          oldestTimestamp = entry.timestamp;
          keyToEvict = key;
        }
      }
    } else if (this.config.strategy === 'FIFO') {
      // Evict first inserted (also lowest timestamp for FIFO)
      let oldestTimestamp = Infinity;
      for (const [key, entry] of this.cache.entries()) {
        if (entry.timestamp < oldestTimestamp) {
          oldestTimestamp = entry.timestamp;
          keyToEvict = key;
        }
      }
    }

    if (keyToEvict) {
      this.cache.delete(keyToEvict);
      this.stats.evictions++;
    }
  }

  /**
   * Starts cleanup interval to remove expired entries
   * @private
   */
  private startCleanupInterval(): void {
    setInterval(() => {
      this.cleanupExpired();
    }, 60000); // Run every minute
  }

  /**
   * Removes expired entries from cache
   * @private
   */
  private cleanupExpired(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (entry.expiresAt && now >= entry.expiresAt) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Resets cache statistics
   * @private
   */
  private resetStats(): void {
    this.stats = {
      hits: 0,
      misses: 0,
      evictions: 0
    };
  }
}

