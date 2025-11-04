import { environment } from '../../environments/environment';

/**
 * Environment configuration helper
 * Provides easy access to environment variables
 */
export class EnvironmentConfig {
  /**
   * Gets the API base URL
   * @returns API base URL
   */
  static getApiUrl(): string {
    return environment.apiUrl;
  }

  /**
   * Gets the API version
   * @returns API version
   */
  static getApiVersion(): string {
    return environment.apiVersion;
  }

  /**
   * Checks if production mode
   * @returns True if production
   */
  static isProduction(): boolean {
    return environment.production;
  }

  /**
   * Gets cache configuration
   * @returns Cache configuration
   */
  static getCacheConfig() {
    return environment.cacheConfig;
  }

  /**
   * Gets log level
   * @returns Log level
   */
  static getLogLevel() {
    return environment.logLevel;
  }

  /**
   * Gets token configuration
   * @returns Token configuration
   */
  static getTokenConfig() {
    return environment.tokenConfig;
  }
}

