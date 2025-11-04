import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Application state interface
 */
export interface IAppState {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  sidebarCollapsed: boolean;
  isLoading: boolean;
}

/**
 * Application state service
 * Manages global application state
 */
@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  private readonly initialState: IAppState = {
    theme: 'light',
    language: 'en',
    sidebarCollapsed: false,
    isLoading: false
  };

  private readonly stateSubject = new BehaviorSubject<IAppState>(this.initialState);
  public readonly state$ = this.stateSubject.asObservable();

  /**
   * Gets the current state
   * @returns Current application state
   * @example
   * const state = this.appState.getState();
   */
  getState(): IAppState {
    return this.stateSubject.value;
  }

  /**
   * Updates the application state
   * @param updates - Partial state updates
   * @example
   * this.appState.updateState({ theme: 'dark' });
   */
  updateState(updates: Partial<IAppState>): void {
    const currentState = this.stateSubject.value;
    this.stateSubject.next({ ...currentState, ...updates });
  }

  /**
   * Sets the theme
   * @param theme - Theme value
   * @example
   * this.appState.setTheme('dark');
   */
  setTheme(theme: 'light' | 'dark' | 'auto'): void {
    this.updateState({ theme });
  }

  /**
   * Sets the language
   * @param language - Language code
   * @example
   * this.appState.setLanguage('es');
   */
  setLanguage(language: string): void {
    this.updateState({ language });
  }

  /**
   * Toggles sidebar collapsed state
   * @example
   * this.appState.toggleSidebar();
   */
  toggleSidebar(): void {
    const currentState = this.stateSubject.value;
    this.updateState({ sidebarCollapsed: !currentState.sidebarCollapsed });
  }

  /**
   * Sets loading state
   * @param isLoading - Loading state
   * @example
   * this.appState.setLoading(true);
   */
  setLoading(isLoading: boolean): void {
    this.updateState({ isLoading });
  }

  /**
   * Resets state to initial values
   * @example
   * this.appState.reset();
   */
  reset(): void {
    this.stateSubject.next({ ...this.initialState });
  }
}

