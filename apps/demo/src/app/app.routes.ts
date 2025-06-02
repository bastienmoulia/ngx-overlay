import { Route } from '@angular/router';
import { TooltipComponent } from './tooltip/tooltip.component';
import { DialogComponent } from './dialog/dialog.component';
import { HomeComponent } from './home/home.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'dialog',
    component: DialogComponent,
  },
  {
    path: 'tooltip',
    component: TooltipComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
