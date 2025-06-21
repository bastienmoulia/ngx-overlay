import { KeyValuePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgxoTooltip, TOOLTIP_CSS_VARIABLES } from '@ngx-overlay/ngx-overlay';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-tooltip-page',
  imports: [NgxoTooltip, KeyValuePipe, HeaderComponent],
  templateUrl: './tooltip-page.html',
  styleUrl: './tooltip-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipPage {
  positions: ('top' | 'bottom' | 'left' | 'right')[] = [
    'top',
    'bottom',
    'left',
    'right',
  ];
  cssVariables = TOOLTIP_CSS_VARIABLES;
}
