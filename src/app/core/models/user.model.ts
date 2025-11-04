import { UserRole } from '../enums/user-role.enum';

/**
 * User model interface
 * Represents a user entity in the application
 */
export interface IUser {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  isActive: boolean;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
  preferences?: IUserPreferences;
}

/**
 * User preferences interface
 */
export interface IUserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  timezone: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
}

/**
 * User profile update payload
 */
export interface IUserProfileUpdate {
  firstName?: string;
  lastName?: string;
  avatar?: string;
  preferences?: Partial<IUserPreferences>;
}

/**
 * Change password payload
 */
export interface IChangePassword {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

