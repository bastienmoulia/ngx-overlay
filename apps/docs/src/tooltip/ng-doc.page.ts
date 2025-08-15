import { NgDocPage } from '@ng-doc/core';
import { TooltipDemoComponent } from '../demos/tooltip-demo/tooltip-demo.component';
import { TooltipPositioningDemoComponent } from '../demos/tooltip-positioning-demo/tooltip-positioning-demo.component';
import { TooltipDelayDemoComponent } from '../demos/tooltip-delay-demo/tooltip-delay-demo.component';
import { TooltipCustomStyleDemoComponent } from '../demos/tooltip-custom-style-demo/tooltip-custom-style-demo.component';

const TooltipPage: NgDocPage = {
  title: `Tooltip`,
  mdFile: './index.md',
  demos: {
    TooltipDemoComponent,
    TooltipPositioningDemoComponent,
    TooltipDelayDemoComponent,
    TooltipCustomStyleDemoComponent,
  },
};

export default TooltipPage;
