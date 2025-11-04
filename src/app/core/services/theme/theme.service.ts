import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AppStateService } from '../state/app-state.service';
import { StorageService } from '../storage/storage.service';
import { CacheType } from '../../enums/cache-type.enum';
import { STORAGE_KEYS } from '../../constants/storage-keys.constants';

/**
 * Theme service
 * Manages application theme and applies it to the document
 */
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly appState = inject(AppStateService);
  private readonly storage = inject(StorageService);
  private readonly document = inject(DOCUMENT) as Document;

  constructor() {
    this.initializeTheme();
  }

  /**
   * Initializes theme from storage or system preference
   * @private
   */
  private initializeTheme(): void {
    const savedTheme = this.storage.getItem<'light' | 'dark' | 'auto'>(
      STORAGE_KEYS.THEME,
      CacheType.LOCAL_STORAGE
    );

    if (savedTheme) {
      this.setTheme(savedTheme);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialTheme: 'light' | 'dark' | 'auto' = prefersDark ? 'auto' : 'light';
      this.setTheme(initialTheme);
    }

    // Listen to system theme changes if auto mode
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      const currentTheme = this.appState.getState().theme;
      if (currentTheme === 'auto') {
        this.applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  /**
   * Sets the theme
   * @param theme - Theme value ('light', 'dark', or 'auto')
   * @example
   * this.themeService.setTheme('dark');
   */
  setTheme(theme: 'light' | 'dark' | 'auto'): void {
    this.appState.setTheme(theme);
    this.storage.setItem(STORAGE_KEYS.THEME, theme, CacheType.LOCAL_STORAGE);

    if (theme === 'auto') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.applyTheme(prefersDark ? 'dark' : 'light');
    } else {
      this.applyTheme(theme);
    }
  }

  /**
   * Applies theme class to document
   * @param theme - Theme to apply
   * @private
   */
  private applyTheme(theme: 'light' | 'dark'): void {
    const htmlElement = this.document.documentElement;
    const bodyElement = this.document.body;
    
    if (theme === 'dark') {
      htmlElement.classList.add('dark');
      bodyElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
      bodyElement.classList.remove('dark');
    }
  }

  /**
   * Toggles between light and dark theme
   * @example
   * this.themeService.toggleTheme();
   */
  toggleTheme(): void {
    const currentTheme = this.appState.getState().theme;
    if (currentTheme === 'dark') {
      this.setTheme('light');
    } else if (currentTheme === 'light') {
      this.setTheme('dark');
    } else {
      // If auto, toggle to opposite of current system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.setTheme(prefersDark ? 'light' : 'dark');
    }
  }

  /**
   * Gets current theme
   * @returns Current theme
   * @example
   * const theme = this.themeService.getCurrentTheme();
   */
  getCurrentTheme(): 'light' | 'dark' | 'auto' {
    return this.appState.getState().theme;
  }
}

