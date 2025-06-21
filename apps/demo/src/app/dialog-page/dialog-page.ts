import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgxoDialog } from '@ngx-overlay/ngx-overlay';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-dialog-page',
  imports: [NgxoDialog, HeaderComponent],
  templateUrl: './dialog-page.html',
  styleUrl: './dialog-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogPage {}
