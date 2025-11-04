/**
 * Log levels enumeration
 */
export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  NONE = 4
}

/**
 * Logger configuration interface
 */
export interface ILoggerConfig {
  level: LogLevel;
  enableConsole: boolean;
  enableRemote: boolean;
  remoteEndpoint?: string;
  maxLogSize?: number;
}

/**
 * Default logger configuration
 */
export const DEFAULT_LOGGER_CONFIG: ILoggerConfig = {
  level: LogLevel.INFO,
  enableConsole: true,
  enableRemote: false,
  maxLogSize: 1000
};

