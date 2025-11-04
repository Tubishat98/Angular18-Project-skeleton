/**
 * Validation utility functions
 * Common validation helpers for forms and data
 */

/**
 * Validates email format
 * @param email - Email string to validate
 * @returns True if email is valid
 * @example
 * isValidEmail('user@example.com') // true
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') {
    return false;
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

/**
 * Validates password strength
 * @param password - Password string to validate
 * @param minLength - Minimum length (default: 8)
 * @returns Object with validation result and errors
 * @example
 * const result = validatePasswordStrength('MyP@ss123');
 * if (result.isValid) {
 *   // Password is strong
 * }
 */
export function validatePasswordStrength(
  password: string,
  minLength: number = 8
): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!password) {
    errors.push('Password is required');
    return { isValid: false, errors };
  }
  
  if (password.length < minLength) {
    errors.push(`Password must be at least ${minLength} characters long`);
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validates URL format
 * @param url - URL string to validate
 * @returns True if URL is valid
 * @example
 * isValidUrl('https://example.com') // true
 */
export function isValidUrl(url: string): boolean {
  if (!url || typeof url !== 'string') {
    return false;
  }
  
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validates phone number (US format)
 * @param phone - Phone number string
 * @returns True if phone number is valid
 * @example
 * isValidPhoneNumber('+1234567890') // true
 */
export function isValidPhoneNumber(phone: string): boolean {
  if (!phone || typeof phone !== 'string') {
    return false;
  }
  
  const phoneRegex = /^\+?[\d\s\-()]+$/;
  const cleaned = phone.replace(/[\s\-()]/g, '');
  
  return phoneRegex.test(phone) && cleaned.length >= 10 && cleaned.length <= 15;
}

/**
 * Validates if a value is not empty
 * @param value - Value to validate
 * @returns True if value is not empty
 * @example
 * isNotEmpty('hello') // true
 * isNotEmpty('') // false
 */
export function isNotEmpty(value: any): boolean {
  if (value === null || value === undefined) {
    return false;
  }
  
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  
  if (Array.isArray(value)) {
    return value.length > 0;
  }
  
  if (typeof value === 'object') {
    return Object.keys(value).length > 0;
  }
  
  return true;
}

/**
 * Sanitizes string input (removes HTML tags and dangerous characters)
 * @param input - String to sanitize
 * @returns Sanitized string
 * @example
 * sanitizeInput('<script>alert("xss")</script>') // 'alert("xss")'
 */
export function sanitizeInput(input: string): string {
  if (!input || typeof input !== 'string') {
    return '';
  }
  
  return input
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/[<>]/g, '') // Remove remaining angle brackets
    .trim();
}

/**
 * Validates date format
 * @param date - Date string to validate
 * @param format - Expected format (optional)
 * @returns True if date is valid
 * @example
 * isValidDate('2023-12-25') // true
 */
export function isValidDate(date: string): boolean {
  if (!date || typeof date !== 'string') {
    return false;
  }
  
  const dateObj = new Date(date);
  return !isNaN(dateObj.getTime());
}

