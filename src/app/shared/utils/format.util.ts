/**
 * Format utility functions
 * Common formatting functions for currency, numbers, dates, etc.
 */

/**
 * Formats a number as currency
 * @param value - The number to format
 * @param currency - Currency code (default: 'USD')
 * @param locale - Locale string (default: 'en-US')
 * @returns Formatted currency string
 * @example
 * formatCurrency(1234.56) // '$1,234.56'
 * formatCurrency(1234.56, 'EUR', 'de-DE') // '1.234,56 €'
 */
export function formatCurrency(
  value: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  }).format(value);
}

/**
 * Formats a number with thousand separators
 * @param value - The number to format
 * @param decimals - Number of decimal places (default: 0)
 * @param locale - Locale string (default: 'en-US')
 * @returns Formatted number string
 * @example
 * formatNumber(1234567) // '1,234,567'
 * formatNumber(1234.567, 2) // '1,234.57'
 */
export function formatNumber(
  value: number,
  decimals: number = 0,
  locale: string = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value);
}

/**
 * Formats a phone number
 * @param phone - Phone number string
 * @param format - Format pattern (default: US format)
 * @returns Formatted phone number
 * @example
 * formatPhone('1234567890') // '(123) 456-7890'
 */
export function formatPhone(phone: string, format: 'us' | 'international' = 'us'): string {
  const cleaned = phone.replace(/\D/g, '');
  
  if (format === 'us' && cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  
  return phone;
}

/**
 * Formats bytes to human-readable size
 * @param bytes - Number of bytes
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted size string
 * @example
 * formatBytes(1024) // '1 KB'
 * formatBytes(1048576) // '1 MB'
 */
export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`;
}

/**
 * Formats a percentage
 * @param value - The value to format (0-1 or 0-100)
 * @param decimals - Number of decimal places (default: 1)
 * @param isDecimal - Whether value is 0-1 (true) or 0-100 (false)
 * @returns Formatted percentage string
 * @example
 * formatPercent(0.1234) // '12.3%'
 * formatPercent(12.34, 0, false) // '12%'
 */
export function formatPercent(
  value: number,
  decimals: number = 1,
  isDecimal: boolean = true
): string {
  const percent = isDecimal ? value * 100 : value;
  return `${percent.toFixed(decimals)}%`;
}

/**
 * Abbreviates a large number
 * @param value - The number to abbreviate
 * @param decimals - Number of decimal places (default: 1)
 * @returns Abbreviated number string
 * @example
 * abbreviateNumber(1234) // '1.2K'
 * abbreviateNumber(1234567) // '1.2M'
 */
export function abbreviateNumber(value: number, decimals: number = 1): string {
  if (value >= 1000000000) {
    return `${(value / 1000000000).toFixed(decimals)}B`;
  }
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(decimals)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(decimals)}K`;
  }
  return value.toString();
}

