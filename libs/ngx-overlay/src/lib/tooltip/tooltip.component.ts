import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  OnDestroy,
  signal,
} from '@angular/core';

export const TOOLTIP_CSS_VARIABLES = {
  '--ngxo-tooltip-margin': '0',
  '--ngxo-tooltip-background-color': '#000',
  '--ngxo-tooltip-text-color': '#fff',
  '--ngxo-tooltip-offset': '.5rem',
  '--ngxo-tooltip-border-radius': '.25rem',
  '--ngxo-tooltip-border': 'none',
  '--ngxo-tooltip-padding': '.5rem',
  '--ngxo-tooltip-font': 'normal 1rem',
  '--ngxo-tooltip-box-shadow': 'none',
  '--ngxo-tooltip-transition': 'opacity 0.3s ease-in-out',
};

@Component({
  selector: 'ngxo-tooltip',
  template: ` <ng-content /> `,
  host: {
    popover: 'hint',
    role: 'tooltip',
    '[attr.id]': 'interestId()',
    '[attr.style]': 'styleString()',
  },
  styles: `
    :host {
      inset: unset;
      position: absolute;
      margin: var(--ngxo-tooltip-margin, ${TOOLTIP_CSS_VARIABLES['--ngxo-tooltip-margin']});
      padding: var(--ngxo-tooltip-padding, ${TOOLTIP_CSS_VARIABLES['--ngxo-tooltip-padding']});
      border-radius: var(--ngxo-tooltip-border-radius, ${TOOLTIP_CSS_VARIABLES['--ngxo-tooltip-border-radius']});
      background: var(--ngxo-tooltip-background-color, ${TOOLTIP_CSS_VARIABLES['--ngxo-tooltip-background-color']});
      color: var(--ngxo-tooltip-text-color, ${TOOLTIP_CSS_VARIABLES['--ngxo-tooltip-text-color']});
      border: var(--ngxo-tooltip-border, ${TOOLTIP_CSS_VARIABLES['--ngxo-tooltip-border']});
      font: var(--ngxo-tooltip-font, ${TOOLTIP_CSS_VARIABLES['--ngxo-tooltip-font']});
      box-shadow: var(--ngxo-tooltip-box-shadow, ${TOOLTIP_CSS_VARIABLES['--ngxo-tooltip-box-shadow']});
      transition: var(--ngxo-tooltip-transition, ${TOOLTIP_CSS_VARIABLES['--ngxo-tooltip-transition']});
      opacity: 0;

      &:popover-open {
        opacity: 1;
      }
    }

    @starting-style {
      :host:popover-open {
        opacity: 0;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxoTooltipComponent implements OnDestroy {
  #document = inject(DOCUMENT);
  #elementRef = inject(ElementRef<HTMLElement>);

  interestId = input.required<string>();
  position = input<'top' | 'bottom' | 'left' | 'right'>('top');
  style = input<string | null>(null);
  hasInterestPolyfill = signal(false);
  noCssAnchor = signal(false);
  target = signal<HTMLElement>(undefined!);
  computedStyle = computed(() => {
    const styles: { [key: string]: string | null } = {
      'position-anchor': '--' + this.interestId(),
    };
    if (this.noCssAnchor()) {
      styles['top'] = 'auto';
      styles['bottom'] = 'auto';
      styles['left'] = 'auto';
      styles['right'] = 'auto';
    } else {
      switch (this.position()) {
        case 'top':
          styles['bottom'] =
            'calc(anchor(top) + var(--ngxo-tooltip-offset, 5px))';
          styles['justify-self'] = 'anchor-center';
          styles['position-try-fallbacks'] = 'flip-block';
          break;
        case 'bottom':
          styles['top'] =
            'calc(anchor(bottom) + var(--ngxo-tooltip-offset, 5px))';
          styles['justify-self'] = 'anchor-center';
          styles['position-try-fallbacks'] = 'flip-block';
          break;
        case 'left':
          styles['right'] =
            'calc(anchor(left) + var(--ngxo-tooltip-offset, 5px))';
          styles['align-self'] = 'anchor-center';
          styles['position-try-fallbacks'] = 'flip-inline';
          break;
        case 'right':
          styles['left'] =
            'calc(anchor(right) + var(--ngxo-tooltip-offset, 5px))';
          styles['align-self'] = 'anchor-center';
          styles['position-try-fallbacks'] = 'flip-inline';
          break;
      }
    }
    return styles;
  });
  styleString = computed(() => {
    let styleString = Object.entries(this.computedStyle())
      .map(([k, v]) => `${k}:${v}`)
      .join(';');
    if (this.style()) {
      styleString += ';' + this.style();
    }
    return styleString;
  });
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private cleanup: () => void = () => {};

  constructor() {
    // eslint-disable-next-line no-prototype-builtins
    if (!HTMLButtonElement.prototype.hasOwnProperty('interestTargetElement')) {
      const src = 'https://unpkg.com/interesttarget/src/interesttarget.min.js';
      const scriptExists = Array.from(document.scripts).some(
        (s) => s.src === src
      );
      if (!scriptExists) {
        const newScript = document.createElement('script');
        newScript.src = src;
        newScript.async = false;
        document.head.appendChild(newScript);
      }
      this.hasInterestPolyfill.set(true);
    }

    if (!('anchorName' in document.documentElement.style)) {
      this.noCssAnchor.set(true);
    }

    effect(() => {
      if (this.hasInterestPolyfill()) {
        const target = this.#document.querySelector(
          '[interesttarget="' + this.interestId() + '"]'
        );
        if (target) {
          target.setAttribute('style', `anchor-name: --${this.interestId()}`);
          Array.from(target.children).forEach((child) => {
            (child as HTMLElement).style.pointerEvents = 'none';
          });
          this.target.set(target as HTMLElement);
        } else {
          console.warn(
            `Element with interesttarget="${this.interestId()}" not found.`
          );
        }
      }
    });

    effect(() => {
      if (this.target() && this.noCssAnchor()) {
        (async () => {
          const { autoUpdate, computePosition, offset } = await import(
            '@floating-ui/dom'
          );
          this.cleanup();
          this.cleanup = autoUpdate(
            this.target(),
            this.#elementRef.nativeElement,
            () => {
              computePosition(this.target(), this.#elementRef.nativeElement, {
                placement: this.position(),
                middleware: [offset(4)],
              }).then(({ x, y }) => {
                Object.assign(this.#elementRef.nativeElement.style, {
                  left: `${x}px`,
                  top: `${y}px`,
                });
              });
            }
          );
        })();
      }
    });
  }

  ngOnDestroy(): void {
    this.cleanup();
  }
}
