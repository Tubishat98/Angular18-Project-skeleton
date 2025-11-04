import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Dashboard component
 */
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="card">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Total Users</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">1,234</p>
            </div>
            <div class="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
              <svg class="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Revenue</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">$45,678</p>
            </div>
            <div class="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <svg class="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Orders</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">567</p>
            </div>
            <div class="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <svg class="w-5 h-5 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Growth</p>
              <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">+12.5%</p>
            </div>
            <div class="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Welcome Card -->
      <div class="card">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">Welcome!</h2>
        <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          This is your dashboard. Authentication is currently disabled for testing purposes.
          You can navigate between Dashboard, Users, and Settings using the sidebar.
        </p>
        <p class="text-sm text-gray-600 dark:text-gray-400 mt-3 leading-relaxed">
          The theme can be toggled using the button in the header. The app supports light and dark modes.
        </p>
      </div>
    </div>
  `
})
export class DashboardComponent {}
