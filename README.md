# NgxOverlay

NgxOverlay is a lightweight Angular library designed to leverage the latest CSS and HTML features while maintaining compatibility with most browsers. It provides an elegant solution for creating overlay components such as modals, tooltips, and popups using modern web standards. The library is built with performance and flexibility in mind, allowing developers to implement rich overlay experiences without sacrificing browser support across different platforms.

## Installation

```bash
npm install @ngx-overlay/ngx-overlay
```

## Compatibility issues and workarounds

- For positioning overlays, the CSS anchors positioning feature is used, which is [not supported in some browsers yet](https://caniuse.com/css-anchor-positioning). To ensure compatibility, the `@floating-ui/dom` library is loaded when needed.
- For displaying tooltips, we use the `interestfor` attribute, which is not supported in all browsers. To ensure compatibility, we use a [polyfill](https://github.com/mfreed7/interestfor).

## Usage

// TODO: Add usage instructions

## Contributing

We welcome contributions to NgxOverlay! If you have suggestions, bug reports, or feature requests, please open an issue or submit a pull request on our [GitHub repository](https://github.com/bastienmoulia/ngx-overlay).
