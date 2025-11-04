import { IJwtPayload } from '../models/auth.model';

/**
 * JWT utility functions
 * Handles JWT token decoding and validation
 */

/**
 * Decodes a JWT token without verification
 * @param token - JWT token string
 * @returns Decoded payload or null if invalid
 * @example
 * const payload = decodeJwtToken(token);
 * if (payload) {
 *   console.log('User ID:', payload.sub);
 * }
 */
export function decodeJwtToken(token: string): IJwtPayload | null {
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) {
      return null;
    }
    
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    
    return JSON.parse(jsonPayload) as IJwtPayload;
  } catch (error) {
    console.error('Error decoding JWT token:', error);
    return null;
  }
}

/**
 * Checks if a JWT token is expired
 * @param token - JWT token string
 * @returns True if token is expired, false otherwise
 * @example
 * if (isTokenExpired(token)) {
 *   // Refresh token
 * }
 */
export function isTokenExpired(token: string): boolean {
  const payload = decodeJwtToken(token);
  if (!payload || !payload.exp) {
    return true;
  }
  
  const expirationTime = payload.exp * 1000; // Convert to milliseconds
  const currentTime = Date.now();
  const bufferTime = 60000; // 1 minute buffer
  
  return currentTime >= (expirationTime - bufferTime);
}

/**
 * Gets the expiration time of a JWT token
 * @param token - JWT token string
 * @returns Expiration timestamp in milliseconds or null if invalid
 * @example
 * const expiry = getTokenExpiration(token);
 * if (expiry) {
 *   const timeUntilExpiry = expiry - Date.now();
 * }
 */
export function getTokenExpiration(token: string): number | null {
  const payload = decodeJwtToken(token);
  if (!payload || !payload.exp) {
    return null;
  }
  
  return payload.exp * 1000; // Convert to milliseconds
}

/**
 * Gets the time until token expiration
 * @param token - JWT token string
 * @returns Time until expiration in milliseconds or null if invalid/expired
 * @example
 * const timeLeft = getTimeUntilExpiration(token);
 * if (timeLeft && timeLeft < 300000) {
 *   // Refresh token soon (less than 5 minutes)
 * }
 */
export function getTimeUntilExpiration(token: string): number | null {
  const expiration = getTokenExpiration(token);
  if (!expiration) {
    return null;
  }
  
  const timeLeft = expiration - Date.now();
  return timeLeft > 0 ? timeLeft : null;
}

/**
 * Validates JWT token structure
 * @param token - JWT token string
 * @returns True if token has valid structure, false otherwise
 * @example
 * if (isValidTokenStructure(token)) {
 *   // Process token
 * }
 */
export function isValidTokenStructure(token: string): boolean {
  if (!token || typeof token !== 'string') {
    return false;
  }
  
  const parts = token.split('.');
  return parts.length === 3;
}

