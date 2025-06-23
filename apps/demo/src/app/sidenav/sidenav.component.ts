import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent {
  links = [
    { path: '/tooltip', label: 'Tooltip' },
    { path: '/popover', label: 'Popover' },
    { path: '/dialog', label: 'Dialog' },
    { path: '/toast', label: 'Toast' },
  ];
}
