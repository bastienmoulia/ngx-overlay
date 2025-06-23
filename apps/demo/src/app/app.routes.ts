import { Route } from '@angular/router';
import { TooltipPage } from './tooltip-page/tooltip-page';
import { DialogPage } from './dialog-page/dialog-page';
import { HomePage } from './home-page/home-page';
import { PopoverPage } from './popover-page/popover-page';
import { ToastPage } from './toast-page/toast-page';

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
    path: 'popover',
    component: PopoverPage,
  },
  {
    path: 'toast',
    component: ToastPage,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
