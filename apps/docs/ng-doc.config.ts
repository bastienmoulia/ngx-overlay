import { NgDocConfiguration } from '@ng-doc/builder';

const config: NgDocConfiguration = {
  docsPath: 'apps/docs/src',
  shiki: {
    themes: {
      dark: 'material-theme-darker',
      light: 'material-theme-lighter',
    },
  },
};

export default config;
