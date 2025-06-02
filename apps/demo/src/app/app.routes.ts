import { Route } from '@angular/router';
import { TooltipPage } from './tooltip-page/tooltip-page';
import { DialogPage } from './dialog-page/dialog-page';
import { HomePage } from './home-page/home-page';

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'dialog',
    component: DialogPage,
  },
  {
    path: 'tooltip',
    component: TooltipPage,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
