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
  DOCUMENT,
  Directive,
  AfterViewInit,
  ViewContainerRef,
  inputBinding,
} from '@angular/core';

export const NGXO_TOOLTIP_CSS_VARIABLES = {
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

export type NgxoTooltipPosition = 'top' | 'bottom' | 'left' | 'right';

@Component({
  selector: 'ngxo-tooltip',
  template: `<ng-content /> `,
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
      margin: var(
        --ngxo-tooltip-margin,
        ${NGXO_TOOLTIP_CSS_VARIABLES['--ngxo-tooltip-margin']}
      );
      padding: var(
        --ngxo-tooltip-padding,
        ${NGXO_TOOLTIP_CSS_VARIABLES['--ngxo-tooltip-padding']}
      );
      border-radius: var(
        --ngxo-tooltip-border-radius,
        ${NGXO_TOOLTIP_CSS_VARIABLES['--ngxo-tooltip-border-radius']}
      );
      background: var(
        --ngxo-tooltip-background-color,
        ${NGXO_TOOLTIP_CSS_VARIABLES['--ngxo-tooltip-background-color']}
      );
      color: var(
        --ngxo-tooltip-text-color,
        ${NGXO_TOOLTIP_CSS_VARIABLES['--ngxo-tooltip-text-color']}
      );
      border: var(
        --ngxo-tooltip-border,
        ${NGXO_TOOLTIP_CSS_VARIABLES['--ngxo-tooltip-border']}
      );
      font: var(
        --ngxo-tooltip-font,
        ${NGXO_TOOLTIP_CSS_VARIABLES['--ngxo-tooltip-font']}
      );
      box-shadow: var(
        --ngxo-tooltip-box-shadow,
        ${NGXO_TOOLTIP_CSS_VARIABLES['--ngxo-tooltip-box-shadow']}
      );
      transition: var(
        --ngxo-tooltip-transition,
        ${NGXO_TOOLTIP_CSS_VARIABLES['--ngxo-tooltip-transition']}
      );
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
export class NgxoTooltip implements OnDestroy {
  #document = inject(DOCUMENT);
  #elementRef = inject(ElementRef<HTMLElement>);

  interestId = input.required<string>();
  position = input<NgxoTooltipPosition>('top');
  style = input<{ [key: string]: string | null }>({});
  showDelay = input<number | null>(null);
  hideDelay = input<number | null>(null);
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
          styles['position-area'] = 'top';
          styles['position-try-fallbacks'] = 'flip-block';
          styles['position-try-order'] = 'most-height';
          break;
        case 'bottom':
          styles['position-area'] = 'bottom';
          styles['position-try-fallbacks'] = 'flip-block';
          styles['position-try-order'] = 'most-height';

          break;
        case 'left':
          styles['position-area'] = 'center left';
          styles['position-try-fallbacks'] = 'flip-inline';
          break;
        case 'right':
          styles['position-area'] = 'center right';
          styles['position-try-fallbacks'] = 'flip-inline';
          break;
      }
    }
    return styles;
  });
  styleString = computed(() => {
    return this.styleToString({ ...this.computedStyle(), ...this.style() });
  });
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private cleanup: () => void = () => {};

  constructor() {
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
      this.hasInterestPolyfill.set(true);
    }

    if (!('anchorName' in document.documentElement.style)) {
      this.noCssAnchor.set(true);
    }

    effect(() => {
      if (this.hasInterestPolyfill()) {
        const target = this.#document.querySelector(
          '[interestfor="' + this.interestId() + '"]',
        );
        if (target) {
          const style: { [key: string]: string } = {
            'anchor-name': `--${this.interestId()}`,
          };
          if (this.showDelay()) {
            style['interest-show-delay'] = `${this.showDelay()}ms`;
            style['--interest-show-delay'] = `${this.showDelay()}ms`;
          }
          if (this.hideDelay()) {
            style['interest-hide-delay'] = `${this.hideDelay()}ms`;
            style['--interest-hide-delay'] = `${this.hideDelay()}ms`;
          }
          target.setAttribute('style', this.styleToString(style));
          Array.from(target.children).forEach((child) => {
            (child as HTMLElement).style.pointerEvents = 'none';
          });
          this.target.set(target as HTMLElement);
        } else {
          console.warn(
            `Element with interestfor="${this.interestId()}" not found.`,
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
            },
          );
        })();
      }
    });
  }

  ngOnDestroy(): void {
    this.cleanup();
  }

  private styleToString(style: { [key: string]: string | null }): string {
    return Object.entries(style)
      .map(([key, value]) => `${key}: ${value}`)
      .join('; ');
  }
}

@Directive({
  selector: '[ngxoTooltip]',
  host: {
    '[attr.interestfor]': 'interestId()',
  },
})
export class NgxoTooltipDirective implements AfterViewInit {
  #viewContainerRef = inject(ViewContainerRef);

  // properties
  interestId = signal(window.crypto.randomUUID());

  // inputs
  ngxoTooltip = input.required<string>();
  ngxoTooltipPosition = input<NgxoTooltipPosition>('top');
  ngxoTooltipCssClass = input<string>();
  ngxoTooltipStyle = input<{ [key: string]: string | null }>();
  ngxoTooltipShowDelay = input<number>(300); // in milliseconds
  ngxoTooltipHideDelay = input<number>(300); // in milliseconds

  ngAfterViewInit() {
    const doc = new DOMParser().parseFromString(
      this.ngxoTooltip(),
      'text/html',
    );

    this.#viewContainerRef.createComponent(NgxoTooltip, {
      bindings: [
        inputBinding('interestId', this.interestId),
        inputBinding('position', this.ngxoTooltipPosition),
        //inputBinding('cssClass', this.ngxoTooltipCssClass),
        inputBinding('style', this.ngxoTooltipStyle),
        inputBinding('showDelay', this.ngxoTooltipShowDelay),
        inputBinding('hideDelay', this.ngxoTooltipHideDelay),
      ],

      projectableNodes: [[...Array.from(doc.body.childNodes)]],
    });
  }
}
