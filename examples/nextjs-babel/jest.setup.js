import { jestPreviewConfigure } from 'jest-preview';

jestPreviewConfigure({
  // An array of relative path from the root of your project
  externalCss: [
    'styles/globals.css',
  ],
});
