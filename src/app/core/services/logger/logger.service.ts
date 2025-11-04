import { Injectable } from '@angular/core';
import { LogLevel, ILoggerConfig, DEFAULT_LOGGER_CONFIG } from './logger.config';
import { environment } from '../../../../environments/environment';

/**
 * Logger service
 * Provides centralized logging with different log levels
 */
@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  private readonly config: ILoggerConfig;
  private readonly logs: Array<{ level: string; message: string; timestamp: string; data?: any }> = [];

  constructor() {
    this.config = {
      ...DEFAULT_LOGGER_CONFIG,
      level: environment.production ? LogLevel.ERROR : LogLevel.DEBUG
    };
  }

  /**
   * Logs a debug message
   * @param message - Log message
   * @param data - Additional data to log
   * @example
   * this.logger.debug('User logged in', { userId: '123' });
   */
  debug(message: string, data?: any): void {
    this.log(LogLevel.DEBUG, 'DEBUG', message, data);
  }

  /**
   * Logs an info message
   * @param message - Log message
   * @param data - Additional data to log
   * @example
   * this.logger.info('Request completed', { duration: 100 });
   */
  info(message: string, data?: any): void {
    this.log(LogLevel.INFO, 'INFO', message, data);
  }

  /**
   * Logs a warning message
   * @param message - Log message
   * @param data - Additional data to log
   * @example
   * this.logger.warn('Deprecated API used', { endpoint: '/api/old' });
   */
  warn(message: string, data?: any): void {
    this.log(LogLevel.WARN, 'WARN', message, data);
  }

  /**
   * Logs an error message
   * @param message - Log message
   * @param error - Error object or additional data
   * @example
   * this.logger.error('Request failed', error);
   */
  error(message: string, error?: any): void {
    this.log(LogLevel.ERROR, 'ERROR', message, error);
  }

  /**
   * Internal log method
   * @param level - Log level
   * @param levelLabel - Log level label
   * @param message - Log message
   * @param data - Additional data
   * @private
   */
  private log(level: LogLevel, levelLabel: string, message: string, data?: any): void {
    if (level < this.config.level) {
      return;
    }

    const timestamp = new Date().toISOString();
    const logEntry = {
      level: levelLabel,
      message,
      timestamp,
      data
    };

    // Store log
    this.logs.push(logEntry);
    if (this.config.maxLogSize && this.logs.length > this.config.maxLogSize) {
      this.logs.shift();
    }

    // Console logging
    if (this.config.enableConsole) {
      const consoleMethod = this.getConsoleMethod(level);
      if (data) {
        consoleMethod(`[${levelLabel}] ${message}`, data);
      } else {
        consoleMethod(`[${levelLabel}] ${message}`);
      }
    }

    // Remote logging (TODO: Implement remote logging)
    if (this.config.enableRemote && this.config.remoteEndpoint) {
      this.sendToRemote(logEntry);
    }
  }

  /**
   * Gets the appropriate console method for log level
   * @param level - Log level
   * @returns Console method
   * @private
   */
  private getConsoleMethod(level: LogLevel): (...args: any[]) => void {
    switch (level) {
      case LogLevel.DEBUG:
        return console.debug;
      case LogLevel.INFO:
        return console.info;
      case LogLevel.WARN:
        return console.warn;
      case LogLevel.ERROR:
        return console.error;
      default:
        return console.log;
    }
  }

  /**
   * Sends log to remote endpoint
   * @param logEntry - Log entry
   * @private
   */
  private sendToRemote(logEntry: any): void {
    // TODO: Implement remote logging
    // Example: this.http.post(this.config.remoteEndpoint, logEntry).subscribe();
  }

  /**
   * Gets all logs
   * @returns Array of log entries
   * @example
   * const logs = this.logger.getLogs();
   */
  getLogs(): Array<{ level: string; message: string; timestamp: string; data?: any }> {
    return [...this.logs];
  }

  /**
   * Clears all logs
   * @example
   * this.logger.clearLogs();
   */
  clearLogs(): void {
    this.logs.length = 0;
  }
}

