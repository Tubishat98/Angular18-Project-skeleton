/**
 * Storage keys constants
 * Centralized keys for localStorage and sessionStorage
 */
export const STORAGE_KEYS = {
  // Authentication
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user',
  REMEMBER_ME: 'remember_me',
  
  // User preferences
  THEME: 'theme',
  LANGUAGE: 'language',
  SIDEBAR_COLLAPSED: 'sidebar_collapsed',
  
  // Cache
  CACHE_PREFIX: 'cache_',
  CACHE_METADATA: 'cache_metadata',
  
  // App state
  APP_STATE: 'app_state',
  LAST_ROUTE: 'last_route'
} as const;

