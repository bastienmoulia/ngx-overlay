import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgxoDialog } from '@ngx-overlay/ngx-overlay';
import { HeaderComponent } from '../header/header.component';
import { SidenavComponent } from '../sidenav/sidenav.component';

@Component({
  selector: 'app-dialog-page',
  imports: [NgxoDialog, HeaderComponent, SidenavComponent],
  templateUrl: './dialog-page.html',
  styleUrl: './dialog-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'main-layout',
  },
})
export class DialogPage {}
