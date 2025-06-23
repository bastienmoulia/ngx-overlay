import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidenavComponent } from '../sidenav/sidenav.component';

@Component({
  selector: 'app-toast-page',
  imports: [HeaderComponent, SidenavComponent],
  templateUrl: './toast-page.html',
  styleUrl: './toast-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastPage {}
