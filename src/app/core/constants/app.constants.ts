/**
 * Application-wide constants
 */
export const APP_NAME = 'Angular Enterprise App';
export const APP_VERSION = '1.0.0';

/**
 * Date and time formats
 */
export const DATE_FORMATS = {
  SHORT: 'MM/dd/yyyy',
  MEDIUM: 'MMM dd, yyyy',
  LONG: 'MMMM dd, yyyy',
  FULL: 'EEEE, MMMM dd, yyyy',
  TIME: 'HH:mm:ss',
  DATETIME: 'MMM dd, yyyy HH:mm'
} as const;

/**
 * Pagination defaults
 */
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50, 100],
  MAX_PAGE_SIZE: 100
} as const;

/**
 * Validation rules
 */
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 128,
  USERNAME_MIN_LENGTH: 3,
  USERNAME_MAX_LENGTH: 50,
  EMAIL_MAX_LENGTH: 255
} as const;

/**
 * Timeout values (in milliseconds)
 */
export const TIMEOUTS = {
  TOAST_DURATION: 3000,
  DEBOUNCE_DEFAULT: 300,
  RETRY_DELAY: 1000,
  TOKEN_REFRESH_BEFORE_EXPIRY: 5 * 60 * 1000 // 5 minutes
} as const;

