import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../../core/services/theme/theme.service';
import { AppStateService } from '../../../../core/services/state/app-state.service';

/**
 * Settings component
 */
@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>

      <div class="card">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Theme Settings</h2>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Theme
            </label>
            <div class="flex space-x-4">
              <button
                (click)="setTheme('light')"
                [class.bg-primary-600]="currentTheme === 'light'"
                [class.text-white]="currentTheme === 'light'"
                [class.bg-gray-200]="currentTheme !== 'light'"
                [class.dark:bg-gray-700]="currentTheme !== 'light'"
                class="px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Light
              </button>
              <button
                (click)="setTheme('dark')"
                [class.bg-primary-600]="currentTheme === 'dark'"
                [class.text-white]="currentTheme === 'dark'"
                [class.bg-gray-200]="currentTheme !== 'dark'"
                [class.dark:bg-gray-700]="currentTheme !== 'dark'"
                class="px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Dark
              </button>
              <button
                (click)="setTheme('auto')"
                [class.bg-primary-600]="currentTheme === 'auto'"
                [class.text-white]="currentTheme === 'auto'"
                [class.bg-gray-200]="currentTheme !== 'auto'"
                [class.dark:bg-gray-700]="currentTheme !== 'auto'"
                class="px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Auto
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Application Settings</h2>
        <p class="text-gray-600 dark:text-gray-400">
          More settings will be available here.
        </p>
      </div>
    </div>
  `
})
export class SettingsComponent {
  private readonly themeService = inject(ThemeService);
  private readonly appState = inject(AppStateService);

  get currentTheme(): 'light' | 'dark' | 'auto' {
    return this.appState.getState().theme;
  }

  setTheme(theme: 'light' | 'dark' | 'auto'): void {
    this.themeService.setTheme(theme);
  }
}
