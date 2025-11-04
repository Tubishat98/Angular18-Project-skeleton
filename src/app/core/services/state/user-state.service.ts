import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from '../../models/user.model';

/**
 * User state service
 * Manages user state across the application
 */
@Injectable({
  providedIn: 'root'
})
export class UserStateService {
  private readonly userSubject = new BehaviorSubject<IUser | null>(null);
  public readonly user$ = this.userSubject.asObservable();

  /**
   * Sets the current user
   * @param user - User object
   * @example
   * this.userState.setUser(user);
   */
  setUser(user: IUser | null): void {
    this.userSubject.next(user);
  }

  /**
   * Gets the current user
   * @returns Current user or null
   * @example
   * const user = this.userState.getUser();
   */
  getUser(): IUser | null {
    return this.userSubject.value;
  }

  /**
   * Updates user properties
   * @param updates - Partial user updates
   * @example
   * this.userState.updateUser({ firstName: 'John' });
   */
  updateUser(updates: Partial<IUser>): void {
    const currentUser = this.userSubject.value;
    if (currentUser) {
      this.userSubject.next({ ...currentUser, ...updates });
    }
  }

  /**
   * Clears the current user
   * @example
   * this.userState.clearUser();
   */
  clearUser(): void {
    this.userSubject.next(null);
  }
}

