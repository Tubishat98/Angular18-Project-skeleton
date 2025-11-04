import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from '../app.routes';
import { AuthInterceptor } from '../core/interceptors/auth.interceptor';
import { ErrorInterceptor } from '../core/interceptors/error.interceptor';
import { LoadingInterceptor } from '../core/interceptors/loading.interceptor';
import { CacheInterceptor } from '../core/interceptors/cache.interceptor';
import { RetryInterceptor } from '../core/interceptors/retry.interceptor';
import { LoggingInterceptor } from '../core/interceptors/logging.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler } from '@angular/core';
import { GlobalErrorHandler } from '../core/services/error/global-error-handler';
import { TranslateLoader, TranslateService, provideTranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { APP_INITIALIZER } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Custom TranslateLoader that loads from assets
 */
export class CustomTranslateLoader implements TranslateLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string): Observable<any> {
    return this.http.get(`./assets/i18n/${lang}.json`);
  }
}

/**
 * Factory function for TranslateLoader
 */
export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
  return new CustomTranslateLoader(http);
}

/**
 * Factory function to initialize TranslateService
 */
export function initializeTranslateService(translateService: TranslateService): () => Promise<any> {
  return () => {
    try {
      translateService.setDefaultLang('en');
      translateService.addLangs(['en', 'ar']);
      const savedLang = localStorage.getItem('language') || 'en';
      
      // Don't block app initialization - load translations asynchronously
      setTimeout(() => {
        translateService.use(savedLang).subscribe({
          next: () => {
            console.log('Translations loaded successfully');
          },
          error: (error) => {
            console.error('Error loading translation:', error);
            // Fallback to default language
            translateService.use('en').subscribe();
          }
        });
      }, 0);
      
      // Return immediately to not block app initialization
      return Promise.resolve();
    } catch (error) {
      console.error('Error initializing TranslateService:', error);
      return Promise.resolve();
    }
  };
}

/**
 * Application configuration
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    // Use provideTranslateService to provide all required dependencies automatically
    ...provideTranslateService({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      fallbackLang: 'en',
      lang: 'en'
    }),
    // Removed APP_INITIALIZER to prevent blocking - TranslateService will initialize on first use
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: initializeTranslateService,
    //   deps: [TranslateService],
    //   multi: true
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CacheInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RetryInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptor,
      multi: true
    },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    }
  ]
};

