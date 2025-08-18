import {
  ApplicationRef,
  Binding,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  createComponent,
  EnvironmentInjector,
  inject,
  Injectable,
  Injector,
  input,
  inputBinding,
  output,
  outputBinding,
  signal,
  TemplateRef,
  Type,
  viewChild,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'ngxo-dialog',
  imports: [NgTemplateOutlet],
  template: `<dialog
    [attr.closedby]="closedby()"
    [class]="class()"
    (click)="dialogClick($event)"
  >
    <ng-content>
      @if (template()) {
        <ng-container
          *ngTemplateOutlet="template(); context: { $implicit: this }"
        />
      }
    </ng-content>
  </dialog>`,
  styles: ``,
  host: {
    '(document:keydown.escape)': 'escape($event)',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxoDialog {
  closedby = input<'none' | 'closerequest' | 'any'>('any');
  class = input<string | null>(null);
  backdropClose = input(false, {
    transform: booleanAttribute,
  });
  preventEsc = input(false, {
    transform: booleanAttribute,
  });
  template = input<TemplateRef<any> | null>(null);

  closeDialog = output<Event>();

  dialog = viewChild<{ nativeElement: HTMLDialogElement }>('dialog');

  dialogElement = computed(() => this.dialog()?.nativeElement);

  open(): void {
    this.dialogElement()?.showModal();
  }

  close(returnValue?: string): void {
    this.dialogElement()?.close(returnValue);
  }

  escape(e: KeyboardEvent): void {
    if (this.dialogElement()?.open && this.preventEsc()) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  dialogClick(e: MouseEvent): void {
    if (this.backdropClose()) {
      const rect = this.dialogElement()?.getBoundingClientRect();
      if (rect) {
        const isInDialog =
          rect?.top <= e.clientY &&
          e.clientY <= rect?.top + rect?.height &&
          rect?.left <= e.clientX &&
          e.clientX <= rect?.left + rect?.width;
        if (!isInDialog) {
          this.close('backdrop');
        }
      }
    }
  }
}

export interface NgxoDialogOptions {
  backdropClose?: boolean;
  preventEsc?: boolean;
  class?: string;
}

export class NgxoActiveDialog {
  close(result?: any): void {}
}

@Injectable({
  providedIn: 'root',
})
export class NgxoDialogService {
  #applicationRef = inject(ApplicationRef);
  #environmentInjector = inject(EnvironmentInjector);
  #injector = inject(Injector);

  openComponent<T>(
    component: Type<T>,
    options: NgxoDialogOptions = {},
    bindings: Binding[] = [],
  ) {
    return new Promise((resolve) => {
      const activeDialog = new NgxoActiveDialog();
      const elementInjector = Injector.create({
        providers: [{ provide: NgxoActiveDialog, useValue: activeDialog }],
        parent: this.#injector,
      });

      const modalContentRef = createComponent(component, {
        environmentInjector: this.#environmentInjector,
        elementInjector,
        bindings,
      });

      const dialogRef = createComponent(NgxoDialog, {
        environmentInjector: this.#environmentInjector,
        bindings: [
          inputBinding('backdropClose', signal(options.backdropClose)),
          inputBinding('preventEsc', signal(options.preventEsc)),
          inputBinding('class', signal(options.class)),
          outputBinding('closeModal', (e: Event) => {
            const { nativeElement } = dialogRef.location;
            nativeElement.parentNode.removeChild(nativeElement);
            resolve(e);
          }),
        ],
        projectableNodes: [[modalContentRef.location.nativeElement]],
      });

      document.body.appendChild(dialogRef.location.nativeElement);

      this.#applicationRef.attachView(modalContentRef.hostView);
      this.#applicationRef.attachView(dialogRef.hostView);
      dialogRef.instance.open();

      activeDialog.close = (result?: any) => {
        dialogRef.instance.close(result);
      };
    });
  }

  openTemplate(template?: TemplateRef<any>, options: NgxoDialogOptions = {}) {
    return new Promise((resolve) => {
      const activeDialog = new NgxoActiveDialog();

      const dialogRef = createComponent(NgxoDialog, {
        environmentInjector: this.#environmentInjector,
        bindings: [
          inputBinding('backdropClose', signal(options.backdropClose)),
          inputBinding('preventEsc', signal(options.preventEsc)),
          inputBinding('class', signal(options.class)),
          inputBinding('template', signal(template)),
          outputBinding('closeModal', (e: Event) => {
            const { nativeElement } = dialogRef.location;
            nativeElement.parentNode.removeChild(nativeElement);
            resolve(e);
          }),
        ],
      });

      document.body.appendChild(dialogRef.location.nativeElement);

      this.#applicationRef.attachView(dialogRef.hostView);
      dialogRef.instance.open();

      activeDialog.close = (result?: any) => {
        dialogRef.instance.close(result);
      };
    });
  }
}
