import { Route } from '@angular/router';
import { TooltipComponent } from './tooltip/tooltip.component';

export const appRoutes: Route[] = [
  {
    path: 'tooltip',
    component: TooltipComponent,
  },
  {
    path: '**',
    redirectTo: 'tooltip',
  },
];
