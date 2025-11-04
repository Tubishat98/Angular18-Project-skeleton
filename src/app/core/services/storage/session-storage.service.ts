import { Injectable } from '@angular/core';

/**
 * SessionStorage service
 * Provides safe operations for sessionStorage with error handling
 */
@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  /**
   * Checks if sessionStorage is available
   * @returns True if sessionStorage is available
   */
  private isAvailable(): boolean {
    try {
      const test = '__sessionStorage_test__';
      sessionStorage.setItem(test, test);
      sessionStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Sets a value in sessionStorage
   * @param key - Storage key
   * @param value - Value to store (will be stringified)
   * @returns True if successful, false otherwise
   * @example
   * this.sessionStorage.setItem('tempData', data);
   */
  setItem<T>(key: string, value: T): boolean {
    if (!this.isAvailable()) {
      console.warn('sessionStorage is not available');
      return false;
    }

    try {
      const serialized = JSON.stringify(value);
      sessionStorage.setItem(key, serialized);
      return true;
    } catch (error) {
      console.error('Error setting sessionStorage item:', error);
      return false;
    }
  }

  /**
   * Gets a value from sessionStorage
   * @param key - Storage key
   * @returns Parsed value or null if not found
   * @example
   * const data = this.sessionStorage.getItem<T>('tempData');
   */
  getItem<T>(key: string): T | null {
    if (!this.isAvailable()) {
      return null;
    }

    try {
      const item = sessionStorage.getItem(key);
      if (item === null) {
        return null;
      }
      return JSON.parse(item) as T;
    } catch (error) {
      console.error('Error getting sessionStorage item:', error);
      return null;
    }
  }

  /**
   * Removes an item from sessionStorage
   * @param key - Storage key
   * @returns True if successful
   * @example
   * this.sessionStorage.removeItem('tempData');
   */
  removeItem(key: string): boolean {
    if (!this.isAvailable()) {
      return false;
    }

    try {
      sessionStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing sessionStorage item:', error);
      return false;
    }
  }

  /**
   * Clears all items from sessionStorage
   * @returns True if successful
   * @example
   * this.sessionStorage.clear();
   */
  clear(): boolean {
    if (!this.isAvailable()) {
      return false;
    }

    try {
      sessionStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing sessionStorage:', error);
      return false;
    }
  }

  /**
   * Gets all keys from sessionStorage
   * @returns Array of keys
   * @example
   * const keys = this.sessionStorage.getKeys();
   */
  getKeys(): string[] {
    if (!this.isAvailable()) {
      return [];
    }

    try {
      return Object.keys(sessionStorage);
    } catch (error) {
      console.error('Error getting sessionStorage keys:', error);
      return [];
    }
  }

  /**
   * Checks if a key exists in sessionStorage
   * @param key - Storage key
   * @returns True if key exists
   * @example
   * if (this.sessionStorage.hasKey('tempData')) {
   *   // Key exists
   * }
   */
  hasKey(key: string): boolean {
    if (!this.isAvailable()) {
      return false;
    }

    return sessionStorage.getItem(key) !== null;
  }
}

