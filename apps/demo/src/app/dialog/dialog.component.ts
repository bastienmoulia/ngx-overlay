import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgxoDialogComponent } from '@ngx-overlay/ngx-overlay';

@Component({
  selector: 'app-dialog',
  imports: [NgxoDialogComponent],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent {}
