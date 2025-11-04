/**
 * API constants
 * Centralized API endpoint definitions and configuration
 */
export const API_BASE_URL = '/api';
export const API_VERSION = 'v1';
export const API_TIMEOUT = 30000; // 30 seconds

/**
 * API endpoints
 */
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    VERIFY: '/auth/verify',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password'
  },
  USERS: {
    BASE: '/users',
    PROFILE: '/users/profile',
    UPDATE_PROFILE: '/users/profile',
    CHANGE_PASSWORD: '/users/change-password'
  },
  DASHBOARD: {
    BASE: '/dashboard',
    STATS: '/dashboard/stats'
  },
  SETTINGS: {
    BASE: '/settings',
    PREFERENCES: '/settings/preferences'
  }
} as const;

/**
 * Public endpoints that don't require authentication
 */
export const PUBLIC_ENDPOINTS = [
  API_ENDPOINTS.AUTH.LOGIN,
  API_ENDPOINTS.AUTH.REGISTER,
  API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
  API_ENDPOINTS.AUTH.RESET_PASSWORD
];

