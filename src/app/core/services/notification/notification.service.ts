import { Injectable, inject } from '@angular/core';
import { ToastService } from './toast.service';

/**
 * Notification service
 * Unified service for showing notifications and alerts
 */
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly toastService = inject(ToastService);

  /**
   * Shows a success notification
   * @param message - Notification message
   * @param duration - Duration in milliseconds
   * @example
   * this.notificationService.success('Saved successfully');
   */
  success(message: string, duration?: number): void {
    this.toastService.success(message, duration);
  }

  /**
   * Shows an error notification
   * @param message - Notification message
   * @param duration - Duration in milliseconds
   * @example
   * this.notificationService.error('Failed to save');
   */
  error(message: string, duration?: number): void {
    this.toastService.error(message, duration);
  }

  /**
   * Shows a warning notification
   * @param message - Notification message
   * @param duration - Duration in milliseconds
   * @example
   * this.notificationService.warning('Please review your changes');
   */
  warning(message: string, duration?: number): void {
    this.toastService.warning(message, duration);
  }

  /**
   * Shows an info notification
   * @param message - Notification message
   * @param duration - Duration in milliseconds
   * @example
   * this.notificationService.info('New feature available');
   */
  info(message: string, duration?: number): void {
    this.toastService.info(message, duration);
  }
}

