import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { StorageService } from '../storage/storage.service';
import { CacheType } from '../../enums/cache-type.enum';
import { STORAGE_KEYS } from '../../constants/storage-keys.constants';
import {
  decodeJwtToken,
  isTokenExpired,
  getTokenExpiration,
  isValidTokenStructure
} from '../../utils/jwt.util';
import { IJwtPayload } from '../../models/auth.model';

/**
 * Token service
 * Manages JWT access and refresh tokens
 */
@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly accessTokenSubject = new BehaviorSubject<string | null>(
    null
  );
  private readonly refreshTokenSubject = new BehaviorSubject<string | null>(
    null
  );

  public readonly accessToken$ = this.accessTokenSubject.asObservable();
  public readonly refreshToken$ = this.refreshTokenSubject.asObservable();

  constructor(private readonly storageService: StorageService) {
    this.loadTokensFromStorage();
  }

  /**
   * Loads tokens from storage on service initialization
   * @private
   */
  private loadTokensFromStorage(): void {
    const accessToken = this.storageService.getItem<string>(
      STORAGE_KEYS.ACCESS_TOKEN,
      CacheType.LOCAL_STORAGE
    );
    const refreshToken = this.storageService.getItem<string>(
      STORAGE_KEYS.REFRESH_TOKEN,
      CacheType.LOCAL_STORAGE
    );

    if (accessToken) {
      this.accessTokenSubject.next(accessToken);
    }
    if (refreshToken) {
      this.refreshTokenSubject.next(refreshToken);
    }
  }

  /**
   * Sets the access token
   * @param token - Access token string
   * @param persist - Whether to persist to storage (default: true)
   * @returns True if successful
   * @example
   * this.tokenService.setAccessToken('eyJhbGciOiJIUzI1NiIs...');
   */
  setAccessToken(token: string, persist: boolean = true): boolean {
    if (!isValidTokenStructure(token)) {
      console.error('Invalid token structure');
      return false;
    }

    this.accessTokenSubject.next(token);

    if (persist) {
      return this.storageService.setItem(
        STORAGE_KEYS.ACCESS_TOKEN,
        token,
        CacheType.LOCAL_STORAGE
      );
    }

    return true;
  }

  /**
   * Gets the current access token
   * @returns Access token or null
   * @example
   * const token = this.tokenService.getAccessToken();
   */
  getAccessToken(): string | null {
    return this.accessTokenSubject.value;
  }

  /**
   * Sets the refresh token
   * @param token - Refresh token string
   * @param persist - Whether to persist to storage (default: true)
   * @returns True if successful
   * @example
   * this.tokenService.setRefreshToken('refresh_token_string');
   */
  setRefreshToken(token: string, persist: boolean = true): boolean {
    this.refreshTokenSubject.next(token);

    if (persist) {
      return this.storageService.setItem(
        STORAGE_KEYS.REFRESH_TOKEN,
        token,
        CacheType.LOCAL_STORAGE
      );
    }

    return true;
  }

  /**
   * Gets the current refresh token
   * @returns Refresh token or null
   * @example
   * const refreshToken = this.tokenService.getRefreshToken();
   */
  getRefreshToken(): string | null {
    return this.refreshTokenSubject.value;
  }

  /**
   * Sets both access and refresh tokens
   * @param accessToken - Access token
   * @param refreshToken - Refresh token
   * @param persist - Whether to persist to storage (default: true)
   * @returns True if both tokens were set successfully
   * @example
   * this.tokenService.setTokens(accessToken, refreshToken);
   */
  setTokens(
    accessToken: string,
    refreshToken: string,
    persist: boolean = true
  ): boolean {
    const accessSet = this.setAccessToken(accessToken, persist);
    const refreshSet = this.setRefreshToken(refreshToken, persist);
    return accessSet && refreshSet;
  }

  /**
   * Checks if the access token is expired
   * @returns True if token is expired or doesn't exist
   * @example
   * if (this.tokenService.isAccessTokenExpired()) {
   *   // Token expired, need to refresh
   * }
   */
  isAccessTokenExpired(): boolean {
    const token = this.getAccessToken();
    if (!token) {
      return true;
    }
    return isTokenExpired(token);
  }

  /**
   * Gets the access token expiration time
   * @returns Expiration timestamp in milliseconds or null
   * @example
   * const expiry = this.tokenService.getAccessTokenExpiration();
   */
  getAccessTokenExpiration(): number | null {
    const token = this.getAccessToken();
    if (!token) {
      return null;
    }
    return getTokenExpiration(token);
  }

  /**
   * Decodes the access token payload
   * @returns Decoded JWT payload or null
   * @example
   * const payload = this.tokenService.decodeAccessToken();
   * if (payload) {
   *   console.log('User ID:', payload.sub);
   * }
   */
  decodeAccessToken(): IJwtPayload | null {
    const token = this.getAccessToken();
    if (!token) {
      return null;
    }
    return decodeJwtToken(token);
  }

  /**
   * Clears all tokens
   * @returns True if successful
   * @example
   * this.tokenService.clearTokens();
   */
  clearTokens(): boolean {
    this.accessTokenSubject.next(null);
    this.refreshTokenSubject.next(null);

    const accessRemoved = this.storageService.removeItem(
      STORAGE_KEYS.ACCESS_TOKEN,
      CacheType.LOCAL_STORAGE
    );
    const refreshRemoved = this.storageService.removeItem(
      STORAGE_KEYS.REFRESH_TOKEN,
      CacheType.LOCAL_STORAGE
    );

    return accessRemoved && refreshRemoved;
  }

  /**
   * Checks if tokens exist
   * @returns True if both tokens exist
   * @example
   * if (this.tokenService.hasTokens()) {
   *   // User might be authenticated
   * }
   */
  hasTokens(): boolean {
    return (
      this.getAccessToken() !== null && this.getRefreshToken() !== null
    );
  }
}

