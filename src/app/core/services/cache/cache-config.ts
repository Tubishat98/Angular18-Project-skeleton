import { ICacheConfig } from './cache.interface';

/**
 * Default cache configuration
 */
export const DEFAULT_CACHE_CONFIG: ICacheConfig = {
  ttl: 5 * 60 * 1000, // 5 minutes
  maxSize: 100,
  strategy: 'LRU',
  enabled: true
};

/**
 * Cache configuration for different scenarios
 */
export const CACHE_CONFIGS = {
  SHORT_TERM: {
    ttl: 1 * 60 * 1000, // 1 minute
    maxSize: 50,
    strategy: 'LRU' as const,
    enabled: true
  },
  MEDIUM_TERM: {
    ttl: 5 * 60 * 1000, // 5 minutes
    maxSize: 100,
    strategy: 'LRU' as const,
    enabled: true
  },
  LONG_TERM: {
    ttl: 30 * 60 * 1000, // 30 minutes
    maxSize: 200,
    strategy: 'LRU' as const,
    enabled: true
  },
  USER_DATA: {
    ttl: 15 * 60 * 1000, // 15 minutes
    maxSize: 50,
    strategy: 'LRU' as const,
    enabled: true
  },
  API_RESPONSE: {
    ttl: 5 * 60 * 1000, // 5 minutes
    maxSize: 100,
    strategy: 'LRU' as const,
    enabled: true
  }
} as const;

