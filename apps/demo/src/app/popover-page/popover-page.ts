import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidenavComponent } from '../sidenav/sidenav.component';

@Component({
  selector: 'app-popover-page',
  imports: [HeaderComponent, SidenavComponent],
  templateUrl: './popover-page.html',
  styleUrl: './popover-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'main-layout',
  },
})
export class PopoverPage {}
