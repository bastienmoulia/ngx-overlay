import { KeyValuePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NGXO_TOOLTIP_CSS_VARIABLES,
  NgxoTooltip,
} from '@ngx-overlay/ngx-overlay';
import { HeaderComponent } from '../header/header.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { DemoCodeComponent } from '../demo-code/demo-code.component';

@Component({
  selector: 'app-tooltip-page',
  imports: [
    NgxoTooltip,
    KeyValuePipe,
    HeaderComponent,
    SidenavComponent,
    DemoCodeComponent,
  ],
  templateUrl: './tooltip-page.html',
  styleUrl: './tooltip-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'main-layout',
  },
})
export class TooltipPage {
  cssVariables = NGXO_TOOLTIP_CSS_VARIABLES;
}
