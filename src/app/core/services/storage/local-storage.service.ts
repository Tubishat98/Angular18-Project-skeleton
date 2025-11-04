import { Injectable } from '@angular/core';
import { STORAGE_KEYS } from '../../constants/storage-keys.constants';

/**
 * LocalStorage service
 * Provides safe operations for localStorage with error handling
 */
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  /**
   * Checks if localStorage is available
   * @returns True if localStorage is available
   */
  private isAvailable(): boolean {
    try {
      const test = '__localStorage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Sets a value in localStorage
   * @param key - Storage key
   * @param value - Value to store (will be stringified)
   * @returns True if successful, false otherwise
   * @example
   * this.localStorage.setItem('user', userData);
   */
  setItem<T>(key: string, value: T): boolean {
    if (!this.isAvailable()) {
      console.warn('localStorage is not available');
      return false;
    }

    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(key, serialized);
      return true;
    } catch (error) {
      console.error('Error setting localStorage item:', error);
      return false;
    }
  }

  /**
   * Gets a value from localStorage
   * @param key - Storage key
   * @returns Parsed value or null if not found
   * @example
   * const user = this.localStorage.getItem<IUser>('user');
   */
  getItem<T>(key: string): T | null {
    if (!this.isAvailable()) {
      return null;
    }

    try {
      const item = localStorage.getItem(key);
      if (item === null) {
        return null;
      }
      return JSON.parse(item) as T;
    } catch (error) {
      console.error('Error getting localStorage item:', error);
      return null;
    }
  }

  /**
   * Removes an item from localStorage
   * @param key - Storage key
   * @returns True if successful
   * @example
   * this.localStorage.removeItem('user');
   */
  removeItem(key: string): boolean {
    if (!this.isAvailable()) {
      return false;
    }

    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing localStorage item:', error);
      return false;
    }
  }

  /**
   * Clears all items from localStorage
   * @returns True if successful
   * @example
   * this.localStorage.clear();
   */
  clear(): boolean {
    if (!this.isAvailable()) {
      return false;
    }

    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  }

  /**
   * Gets all keys from localStorage
   * @returns Array of keys
   * @example
   * const keys = this.localStorage.getKeys();
   */
  getKeys(): string[] {
    if (!this.isAvailable()) {
      return [];
    }

    try {
      return Object.keys(localStorage);
    } catch (error) {
      console.error('Error getting localStorage keys:', error);
      return [];
    }
  }

  /**
   * Checks if a key exists in localStorage
   * @param key - Storage key
   * @returns True if key exists
   * @example
   * if (this.localStorage.hasKey('user')) {
   *   // Key exists
   * }
   */
  hasKey(key: string): boolean {
    if (!this.isAvailable()) {
      return false;
    }

    return localStorage.getItem(key) !== null;
  }

  /**
   * Gets the size of localStorage (approximate)
   * @returns Size in bytes
   * @example
   * const size = this.localStorage.getSize();
   */
  getSize(): number {
    if (!this.isAvailable()) {
      return 0;
    }

    try {
      let total = 0;
      for (const key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          total += localStorage[key].length + key.length;
        }
      }
      return total;
    } catch (error) {
      console.error('Error calculating localStorage size:', error);
      return 0;
    }
  }
}

