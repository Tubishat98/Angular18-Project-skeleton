import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Users list component
 */
@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Users</h1>
        <button class="btn btn-primary">
          Add User
        </button>
      </div>

      <div class="card">
        <p class="text-gray-600 dark:text-gray-400">
          Users list will be displayed here. This is a placeholder component.
        </p>
      </div>
    </div>
  `
})
export class UsersListComponent {}
