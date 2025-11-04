import { ICacheConfig } from '../app/core/services/cache/cache.interface';
import { LogLevel } from '../app/core/services/logger/logger.config';

/**
 * Development environment configuration
 */
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  apiVersion: 'v1',
  cacheConfig: {
    ttl: 1 * 60 * 1000, // 1 minute (shorter for dev)
    maxSize: 50,
    strategy: 'LRU' as const,
    enabled: true
  } as ICacheConfig,
  logLevel: LogLevel.DEBUG,
  tokenConfig: {
    accessTokenKey: 'access_token',
    refreshTokenKey: 'refresh_token',
    tokenExpiry: 15 * 60 * 1000 // 15 minutes
  },
  enableLogging: true,
  enableCache: true
};

