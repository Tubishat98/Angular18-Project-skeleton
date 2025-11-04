import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientService } from './http-client.service';
import { API_ENDPOINTS } from '../../constants/api.constants';
import { IUser, IUserProfileUpdate, IChangePassword } from '../../models/user.model';
import { IPaginatedResponse } from '../../models/api-response.model';

/**
 * API service
 * Provides typed methods for API endpoints
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly http = inject(HttpClientService);

  // User endpoints

  /**
   * Gets user profile
   * @returns Observable of user profile
   * @example
   * this.apiService.getUserProfile().subscribe(user => {
   *   console.log(user);
   * });
   */
  getUserProfile(): Observable<IUser> {
    return this.http.get<IUser>(API_ENDPOINTS.USERS.PROFILE);
  }

  /**
   * Updates user profile
   * @param updates - Profile updates
   * @returns Observable of updated user
   * @example
   * this.apiService.updateUserProfile({ firstName: 'John' }).subscribe();
   */
  updateUserProfile(updates: IUserProfileUpdate): Observable<IUser> {
    return this.http.put<IUser>(API_ENDPOINTS.USERS.UPDATE_PROFILE, updates);
  }

  /**
   * Changes user password
   * @param passwordData - Password change data
   * @returns Observable of success
   * @example
   * this.apiService.changePassword({
   *   currentPassword: 'old',
   *   newPassword: 'new',
   *   confirmPassword: 'new'
   * }).subscribe();
   */
  changePassword(passwordData: IChangePassword): Observable<void> {
    return this.http.post<void>(API_ENDPOINTS.USERS.CHANGE_PASSWORD, passwordData);
  }

  /**
   * Gets all users (paginated)
   * @param page - Page number
   * @param pageSize - Page size
   * @returns Observable of paginated users
   * @example
   * this.apiService.getUsers(1, 10).subscribe(response => {
   *   console.log(response.data);
   * });
   */
  getUsers(page: number = 1, pageSize: number = 10): Observable<IPaginatedResponse<IUser>> {
    return this.http.get<IPaginatedResponse<IUser>>(API_ENDPOINTS.USERS.BASE, {
      params: { page: page.toString(), pageSize: pageSize.toString() }
    });
  }

  // Dashboard endpoints

  /**
   * Gets dashboard statistics
   * @returns Observable of dashboard stats
   * @example
   * this.apiService.getDashboardStats().subscribe(stats => {
   *   console.log(stats);
   * });
   */
  getDashboardStats(): Observable<any> {
    return this.http.get<any>(API_ENDPOINTS.DASHBOARD.STATS);
  }
}

