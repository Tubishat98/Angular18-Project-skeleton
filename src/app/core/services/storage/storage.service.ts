import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { SessionStorageService } from './session-storage.service';
import { CacheType } from '../../enums/cache-type.enum';

/**
 * Unified storage service
 * Provides abstraction over localStorage and sessionStorage
 */
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly sessionStorageService: SessionStorageService
  ) {}

  /**
   * Sets a value in the specified storage type
   * @param key - Storage key
   * @param value - Value to store
   * @param type - Storage type (default: localStorage)
   * @returns True if successful
   * @example
   * this.storage.setItem('user', userData, CacheType.LOCAL_STORAGE);
   */
  setItem<T>(
    key: string,
    value: T,
    type: CacheType = CacheType.LOCAL_STORAGE
  ): boolean {
    switch (type) {
      case CacheType.LOCAL_STORAGE:
        return this.localStorageService.setItem(key, value);
      case CacheType.SESSION_STORAGE:
        return this.sessionStorageService.setItem(key, value);
      default:
        console.warn(`Storage type ${type} not supported`);
        return false;
    }
  }

  /**
   * Gets a value from the specified storage type
   * @param key - Storage key
   * @param type - Storage type (default: localStorage)
   * @returns Parsed value or null
   * @example
   * const user = this.storage.getItem<IUser>('user', CacheType.LOCAL_STORAGE);
   */
  getItem<T>(
    key: string,
    type: CacheType = CacheType.LOCAL_STORAGE
  ): T | null {
    switch (type) {
      case CacheType.LOCAL_STORAGE:
        return this.localStorageService.getItem<T>(key);
      case CacheType.SESSION_STORAGE:
        return this.sessionStorageService.getItem<T>(key);
      default:
        return null;
    }
  }

  /**
   * Removes an item from the specified storage type
   * @param key - Storage key
   * @param type - Storage type (default: localStorage)
   * @returns True if successful
   * @example
   * this.storage.removeItem('user', CacheType.LOCAL_STORAGE);
   */
  removeItem(
    key: string,
    type: CacheType = CacheType.LOCAL_STORAGE
  ): boolean {
    switch (type) {
      case CacheType.LOCAL_STORAGE:
        return this.localStorageService.removeItem(key);
      case CacheType.SESSION_STORAGE:
        return this.sessionStorageService.removeItem(key);
      default:
        return false;
    }
  }

  /**
   * Clears all items from the specified storage type
   * @param type - Storage type (default: localStorage)
   * @returns True if successful
   * @example
   * this.storage.clear(CacheType.LOCAL_STORAGE);
   */
  clear(type: CacheType = CacheType.LOCAL_STORAGE): boolean {
    switch (type) {
      case CacheType.LOCAL_STORAGE:
        return this.localStorageService.clear();
      case CacheType.SESSION_STORAGE:
        return this.sessionStorageService.clear();
      default:
        return false;
    }
  }
}

