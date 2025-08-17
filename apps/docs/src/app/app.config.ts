import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import {
  NG_DOC_DEFAULT_PAGE_PROCESSORS,
  NG_DOC_DEFAULT_PAGE_SKELETON,
  NgDocDefaultSearchEngine,
  provideNgDocApp,
  provideMainPageProcessor,
  providePageSkeleton,
  provideSearchEngine,
} from '@ng-doc/app';
import { NG_DOC_ROUTING, provideNgDocContext } from '@ng-doc/generated';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideNgxOverlay } from '@ngx-overlay/ngx-overlay';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideNgDocContext(),
    // Provide default configuration for the documentation app
    provideNgDocApp({
      shiki: {
        themes: [
          import('shiki/themes/material-theme-darker.mjs'),
          import('shiki/themes/material-theme-lighter.mjs'),
        ],
        theme: {
          dark: 'material-theme-darker',
          light: 'material-theme-lighter',
        },
      },
    }),
    provideSearchEngine(NgDocDefaultSearchEngine),
    providePageSkeleton(NG_DOC_DEFAULT_PAGE_SKELETON),
    provideMainPageProcessor(NG_DOC_DEFAULT_PAGE_PROCESSORS),
    // Provide animations
    provideAnimations(),
    // Provide HttpClient with interceptors (NgDoc uses interceptors)
    provideHttpClient(withInterceptorsFromDi()),
    // Add generated routes to the application
    provideRouter(
      NG_DOC_ROUTING,
      // Enable anchor scrolling
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      }),
    ),
    provideNgxOverlay(),
  ],
};
