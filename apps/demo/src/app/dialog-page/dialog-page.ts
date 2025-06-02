import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgxoDialog } from '@ngx-overlay/ngx-overlay';

@Component({
  selector: 'app-dialog-page',
  imports: [NgxoDialog],
  templateUrl: './dialog-page.html',
  styleUrl: './dialog-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogPage {}
