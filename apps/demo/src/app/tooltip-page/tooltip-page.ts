import { KeyValuePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NgxoTooltip,
  NgxoTooltipPosition,
  NGXO_TOOLTIP_CSS_VARIABLES,
} from '@ngx-overlay/ngx-overlay';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-tooltip-page',
  imports: [NgxoTooltip, KeyValuePipe, HeaderComponent],
  templateUrl: './tooltip-page.html',
  styleUrl: './tooltip-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipPage {
  positions: NgxoTooltipPosition[] = ['top', 'bottom', 'left', 'right'];
  cssVariables = NGXO_TOOLTIP_CSS_VARIABLES;
}
