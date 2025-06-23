import { KeyValuePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NgxoTooltip,
  NgxoTooltipPosition,
  NGXO_TOOLTIP_CSS_VARIABLES,
  NgxoTooltipDirective,
} from '@ngx-overlay/ngx-overlay';
import { HeaderComponent } from '../header/header.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { DemoCodeComponent } from '../demo-code/demo-code.component';

@Component({
  selector: 'app-tooltip-page',
  imports: [
    NgxoTooltip,
    NgxoTooltipDirective,
    KeyValuePipe,
    HeaderComponent,
    SidenavComponent,
    DemoCodeComponent,
  ],
  templateUrl: './tooltip-page.html',
  styleUrl: './tooltip-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipPage {
  positions: NgxoTooltipPosition[] = ['top', 'bottom', 'left', 'right'];
  cssVariables = NGXO_TOOLTIP_CSS_VARIABLES;
}
