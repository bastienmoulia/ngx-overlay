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
  viewChild,
} from '@angular/core';

@Component({
  selector: 'ngxo-tooltip',
  template: `
    <div
      id="{{ interestId() }}"
      popover="hint"
      #popover
      class="{{ cssClass() }}"
      role="tooltip"
      [style]="styles()"
    >
      <ng-content />
    </div>
  `,
  styles: `
    :host {
      display: contents;
    }

    [popover="hint"] {
      inset: unset;
      position: absolute;
      margin: 0;
      padding: 8px;
      border-radius: 6px;
      background: #000;
      color: #fff;
      border: none;
      font-size: 1rem;
      font-weight: normal;
      transition: opacity 0.3s ease-in-out;
      opacity: 0;
    }

    [popover="hint"]:popover-open {
      opacity: 1;
    }

    @starting-style {
      [popover="hint"]:popover-open {
        opacity: 0;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxoTooltipComponent implements OnDestroy {
  #document = inject(DOCUMENT);

  interestId = input.required<string>();
  tooltip = viewChild.required<ElementRef>('popover');
  position = input<'top' | 'bottom' | 'left' | 'right'>('top');
  cssClass = input<string>();
  hasInterestPolyfill = signal(false);
  noCssAnchor = signal(false);
  target = signal<HTMLElement>(undefined!);
  styles = computed(() => {
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
            this.tooltip().nativeElement,
            () => {
              computePosition(this.target(), this.tooltip().nativeElement, {
                placement: this.position(),
                middleware: [offset(4)],
              }).then(({ x, y }) => {
                Object.assign(this.tooltip().nativeElement.style, {
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
