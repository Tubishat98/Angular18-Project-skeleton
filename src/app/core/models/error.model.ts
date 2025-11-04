import { HttpStatus } from '../enums/http-status.enum';

/**
 * Application error interface
 */
export interface IAppError {
  message: string;
  code?: string;
  statusCode?: HttpStatus;
  details?: any;
  timestamp: string;
  stack?: string;
}

/**
 * HTTP error class
 */
export class HttpError extends Error {
  constructor(
    public readonly statusCode: HttpStatus,
    public override readonly message: string,
    public readonly details?: any
  ) {
    super(message);
    this.name = 'HttpError';
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}

/**
 * Validation error class
 */
export class ValidationError extends Error {
  constructor(
    public override readonly message: string,
    public readonly errors: Record<string, string[]>
  ) {
    super(message);
    this.name = 'ValidationError';
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

/**
 * Authentication error class
 */
export class AuthenticationError extends Error {
  constructor(
    public override readonly message: string = 'Authentication failed',
    public readonly code?: string
  ) {
    super(message);
    this.name = 'AuthenticationError';
    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
}

/**
 * Business logic error class
 */
export class BusinessLogicError extends Error {
  constructor(
    public override readonly message: string,
    public readonly code: string,
    public readonly details?: any
  ) {
    super(message);
    this.name = 'BusinessLogicError';
    Object.setPrototypeOf(this, BusinessLogicError.prototype);
  }
}

