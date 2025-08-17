---
keyword: GettingStartedPage
---

## Installation

To add the package, run the following command:

```bash
npm install @ngx-overlay/ngx-overlay
```

## Configuration

Add the provider to your application configuration or module:

```typescript
//...
import { provideNgxOverlay } from '@ngx-overlay/ngx-overlay';

bootstrapApplication(AppComponent, {
  providers: [
    //...
    provideNgxOverlay(),
  ],
});
```

## Supported Browsers

This library use some relatively new browsers technologies:

- the [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API)<br>Newly available in the Baseline 2025
- the CSS [anchor](https://developer.mozilla.org/en-US/docs/Web/CSS/anchor) function<br>Limited availability (not working in the last version of Firefox, and in Technical Preview in Safari)
- the JavaScript [Interest Invokers](https://open-ui.org/components/interest-invokers.explainer/)<br>Not available, a [small polyfill](https://www.npmjs.com/package/interestfor) is needed

So for now it's only working on:

- Chrome 125+
- Edge 125+
- Opera 111+
- Safari 26+
