# Angular 18 Enterprise Skeleton

A complete enterprise-grade Angular 18+ application architecture with comprehensive features including JWT authentication, caching, error handling, interceptors, guards, and more.

## Features

- ✅ **JWT Authentication** - Complete auth flow with access/refresh tokens
- ✅ **Interceptors** - Auth, Error, Loading, Cache, Retry, Logging
- ✅ **Guards** - Auth, Role, Permission guards
- ✅ **Caching System** - Multi-layer caching with TTL and eviction strategies
- ✅ **Error Handling** - Global error handler with user-friendly messages
- ✅ **State Management** - Lightweight state management with BehaviorSubjects
- ✅ **Services** - Comprehensive service layer (Auth, HTTP, Cache, Storage, Logger, etc.)
- ✅ **Shared Components** - Reusable components, directives, pipes, validators
- ✅ **Feature Modules** - Lazy-loaded feature modules
- ✅ **TypeScript** - Strict mode with comprehensive typing
- ✅ **Documentation** - JSDoc comments throughout

## Project Structure

```
src/
├── app/
│   ├── core/           # Core functionality (guards, interceptors, services)
│   ├── shared/         # Shared components, directives, pipes, validators
│   ├── features/       # Feature modules (auth, dashboard, users, settings)
│   ├── layout/         # Layout components (header, footer, sidebar)
│   └── config/         # Application configuration
├── environments/       # Environment configurations
└── assets/             # Static assets
```

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- Angular CLI 18+

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment:
Edit `src/environments/environment.ts` and `environment.production.ts` with your API URLs and configuration.

3. Start development server:
```bash
npm start
```

4. Build for production:
```bash
npm run build:prod
```

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for development
- `npm run build:prod` - Build for production
- `npm test` - Run unit tests
- `npm run lint` - Run linter
- `npm run format` - Format code with Prettier
- `npm run analyze` - Analyze bundle size

## Configuration

### Environment Variables

Edit environment files in `src/environments/`:
- `environment.ts` - Development
- `environment.development.ts` - Development specific
- `environment.production.ts` - Production

### API Configuration

Update API endpoints in `src/app/core/constants/api.constants.ts`

### Cache Configuration

Configure caching in `src/app/core/services/cache/cache-config.ts`

## Usage Examples

### Authentication

```typescript
// Login
this.authService.login({ email, password, rememberMe }).subscribe({
  next: (response) => console.log('Logged in'),
  error: (error) => console.error('Login failed', error)
});

// Check authentication
this.authService.isAuthenticated$.subscribe(isAuth => {
  console.log('Is authenticated:', isAuth);
});
```

### HTTP Requests

```typescript
// Using HttpClientService
this.httpClient.get<User>('/users/123').subscribe(user => {
  console.log(user);
});

// Using API Service
this.apiService.getUserProfile().subscribe(profile => {
  console.log(profile);
});
```

### Caching

```typescript
// Get from cache
this.cacheService.get<User>('user:123').subscribe(user => {
  if (user) {
    // Use cached value
  }
});

// Set in cache
this.cacheService.set('user:123', userData, 60000); // 1 minute TTL
```

### Guards

```typescript
// Protect route with auth
{ path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }

// Protect route with role
{ 
  path: 'admin', 
  component: AdminComponent, 
  canActivate: [RoleGuard],
  data: { roles: [UserRole.ADMIN] }
}
```

## Architecture

### Core Services

- **AuthService** - Authentication and authorization
- **TokenService** - JWT token management
- **HttpClientService** - HTTP client wrapper
- **CacheService** - In-memory caching
- **StorageService** - localStorage/sessionStorage abstraction
- **LoggerService** - Application logging
- **ErrorHandlerService** - Error processing
- **NotificationService** - Toast notifications

### Interceptors

- **AuthInterceptor** - Adds Bearer token to requests
- **ErrorInterceptor** - Global error handling
- **LoadingInterceptor** - Loading state management
- **CacheInterceptor** - HTTP response caching
- **RetryInterceptor** - Automatic retry with exponential backoff
- **LoggingInterceptor** - Request/response logging

### Guards

- **AuthGuard** - Authentication check
- **RoleGuard** - Role-based access control
- **PermissionGuard** - Permission-based access control

## Best Practices

1. **Type Safety** - All code is fully typed (no `any` types)
2. **Error Handling** - Comprehensive error handling throughout
3. **Documentation** - JSDoc comments on all public methods
4. **Lazy Loading** - Feature modules are lazy-loaded
5. **Standalone Components** - Modern Angular standalone components
6. **Immutable State** - State updates are immutable
7. **Observable Cleanup** - Proper unsubscription with takeUntil pattern

## Security

- JWT token management with secure storage
- XSS prevention with input sanitization
- CSRF protection (ready for implementation)
- Secure HTTP-only cookie option
- Input validation and sanitization

## Testing

Run tests with:
```bash
npm test
```

Generate coverage report:
```bash
npm run test:coverage
```

## Contributing

1. Follow the naming conventions
2. Add JSDoc comments to all public methods
3. Write unit tests for new features
4. Follow the existing code style

## License

MIT

## Additional Resources

- [Architecture Guide](./ARCHITECTURE.md) - Detailed architecture documentation
- [API Integration Guide](./API_INTEGRATION_GUIDE.md) - How to integrate with REST APIs
- [Quick Start Guide](./QUICKSTART.md) - Getting started quickly
- [Improvements](./IMPROVEMENTS.md) - Recommended enhancements for production

## Support

For issues and questions, please open an issue in the repository.

## License

MIT

