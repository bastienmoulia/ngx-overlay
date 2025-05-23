import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgxoTooltipComponent } from '@ngx-overlay/ngx-overlay';

@Component({
  selector: 'app-tooltip',
  imports: [NgxoTooltipComponent],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipComponent {}
