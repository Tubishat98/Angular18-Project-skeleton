/**
 * Date utility functions
 * Provides common date manipulation and formatting functions
 */

/**
 * Formats a date to a readable string
 * @param date - Date object or string
 * @param format - Format string (default: 'MMM dd, yyyy')
 * @returns Formatted date string
 * @example
 * formatDate(new Date(), 'MM/dd/yyyy') // "12/25/2023"
 */
export function formatDate(
  date: Date | string | null | undefined,
  format: string = 'MMM dd, yyyy'
): string {
  if (!date) {
    return '';
  }
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) {
    return '';
  }
  
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: format.includes('MMM') ? 'short' : 'numeric',
    day: 'numeric',
    hour: format.includes('HH') ? '2-digit' : undefined,
    minute: format.includes('mm') ? '2-digit' : undefined,
    second: format.includes('ss') ? '2-digit' : undefined
  };
  
  return new Intl.DateTimeFormat('en-US', options).format(dateObj);
}

/**
 * Gets relative time string (e.g., "2 hours ago", "in 3 days")
 * @param date - Date object or string
 * @returns Relative time string
 * @example
 * getRelativeTime(new Date(Date.now() - 3600000)) // "1 hour ago"
 */
export function getRelativeTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return 'just now';
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  }
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
  }
  
  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
}

/**
 * Checks if a date is today
 * @param date - Date object or string
 * @returns True if date is today
 * @example
 * isToday(new Date()) // true
 */
export function isToday(date: Date | string): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  
  return (
    dateObj.getDate() === today.getDate() &&
    dateObj.getMonth() === today.getMonth() &&
    dateObj.getFullYear() === today.getFullYear()
  );
}

/**
 * Checks if a date is in the past
 * @param date - Date object or string
 * @returns True if date is in the past
 * @example
 * isPast(new Date('2020-01-01')) // true
 */
export function isPast(date: Date | string): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.getTime() < Date.now();
}

/**
 * Checks if a date is in the future
 * @param date - Date object or string
 * @returns True if date is in the future
 * @example
 * isFuture(new Date('2030-01-01')) // true
 */
export function isFuture(date: Date | string): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.getTime() > Date.now();
}

/**
 * Adds days to a date
 * @param date - Date object or string
 * @param days - Number of days to add (can be negative)
 * @returns New date object
 * @example
 * addDays(new Date(), 7) // Date 7 days from now
 */
export function addDays(date: Date | string, days: number): Date {
  const dateObj = typeof date === 'string' ? new Date(date) : new Date(date);
  dateObj.setDate(dateObj.getDate() + days);
  return dateObj;
}

/**
 * Gets the start of day for a date
 * @param date - Date object or string
 * @returns Date object set to start of day
 * @example
 * getStartOfDay(new Date()) // Date at 00:00:00
 */
export function getStartOfDay(date: Date | string): Date {
  const dateObj = typeof date === 'string' ? new Date(date) : new Date(date);
  dateObj.setHours(0, 0, 0, 0);
  return dateObj;
}

/**
 * Gets the end of day for a date
 * @param date - Date object or string
 * @returns Date object set to end of day
 * @example
 * getEndOfDay(new Date()) // Date at 23:59:59.999
 */
export function getEndOfDay(date: Date | string): Date {
  const dateObj = typeof date === 'string' ? new Date(date) : new Date(date);
  dateObj.setHours(23, 59, 59, 999);
  return dateObj;
}

