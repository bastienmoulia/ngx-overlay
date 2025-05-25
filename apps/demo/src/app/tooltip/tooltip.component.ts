import { KeyValuePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  NgxoTooltipComponent,
  TOOLTIP_CSS_VARIABLES,
} from '@ngx-overlay/ngx-overlay';

@Component({
  selector: 'app-tooltip',
  imports: [NgxoTooltipComponent, KeyValuePipe],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipComponent {
  positions: ('top' | 'bottom' | 'left' | 'right')[] = [
    'top',
    'bottom',
    'left',
    'right',
  ];
  cssVariables = TOOLTIP_CSS_VARIABLES;
}
