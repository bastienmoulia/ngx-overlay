import {
  EnvironmentProviders,
  inject,
  Injectable,
  provideAppInitializer,
  Provider,
} from '@angular/core';

export interface NgxOverlayConfig {
  noImportPolyfill: boolean;
}

export function provideNgxOverlay(
  config?: NgxOverlayConfig,
): Array<EnvironmentProviders | Provider> {
  return [
    provideAppInitializer(() => {
      inject(NgxOverlayService).init(config);
    }),
  ];
}

@Injectable({
  providedIn: 'root',
})
export class NgxOverlayService {
  async init(config?: NgxOverlayConfig): Promise<void> {
    if (config?.noImportPolyfill) {
      return;
    }
    console.log('Initializing NgxOverlayService with config:', config);
    // eslint-disable-next-line no-prototype-builtins
    if (!HTMLButtonElement.prototype.hasOwnProperty('interestforElement')) {
      const src = 'https://unpkg.com/interestfor/src/interestfor.min.js';
      const scriptExists = Array.from(document.scripts).some(
        (s) => s.src === src,
      );
      if (!scriptExists) {
        const newScript = document.createElement('script');
        newScript.src = src;
        newScript.async = false;
        document.head.appendChild(newScript);
      }
    }
  }
}
