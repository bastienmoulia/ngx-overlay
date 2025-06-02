import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ngxo-dialog',
  imports: [],
  template: `<dialog [attr.closedby]="closedby()">
    <ng-content />
  </dialog>`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxoDialog {
  closedby = input<'none' | 'closerequest' | 'any'>('any');
}
