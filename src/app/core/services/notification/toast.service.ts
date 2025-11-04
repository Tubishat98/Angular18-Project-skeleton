import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

/**
 * Toast message interface
 */
export interface IToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  timestamp: Date;
}

/**
 * Toast service
 * Manages toast notifications
 */
@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private readonly toastSubject = new Subject<IToastMessage>();
  public readonly toast$ = this.toastSubject.asObservable();

  /**
   * Shows a success toast
   * @param message - Toast message
   * @param duration - Duration in milliseconds (default: 3000)
   * @example
   * this.toastService.success('Operation completed successfully');
   */
  success(message: string, duration: number = 3000): void {
    this.show(message, 'success', duration);
  }

  /**
   * Shows an error toast
   * @param message - Toast message
   * @param duration - Duration in milliseconds (default: 5000)
   * @example
   * this.toastService.error('Operation failed');
   */
  error(message: string, duration: number = 5000): void {
    this.show(message, 'error', duration);
  }

  /**
   * Shows a warning toast
   * @param message - Toast message
   * @param duration - Duration in milliseconds (default: 4000)
   * @example
   * this.toastService.warning('Please check your input');
   */
  warning(message: string, duration: number = 4000): void {
    this.show(message, 'warning', duration);
  }

  /**
   * Shows an info toast
   * @param message - Toast message
   * @param duration - Duration in milliseconds (default: 3000)
   * @example
   * this.toastService.info('New update available');
   */
  info(message: string, duration: number = 3000): void {
    this.show(message, 'info', duration);
  }

  /**
   * Shows a toast message
   * @param message - Toast message
   * @param type - Toast type
   * @param duration - Duration in milliseconds
   * @private
   */
  private show(message: string, type: IToastMessage['type'], duration: number): void {
    const toast: IToastMessage = {
      id: this.generateId(),
      message,
      type,
      duration,
      timestamp: new Date()
    };

    this.toastSubject.next(toast);
  }

  /**
   * Generates a unique ID for toast
   * @returns Unique ID
   * @private
   */
  private generateId(): string {
    return `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}

