<p align="center">
 <img align="center" alt="Jest Preview Logo" src="https://user-images.githubusercontent.com/8603085/161993303-e904a087-78a1-4abd-bb8d-3ef2cc6db442.svg" width="250"/>
</p>

<h1 align="center">
Jest Preview
</h1>

<p align="center">
Debug your Jest tests. Effortlessly. 🛠🖼 
</p>
  
<p align="center">
  <img align="center" src="https://user-images.githubusercontent.com/8603085/162259399-19e47402-cf99-445b-8b5a-d00e82d1fb2d.gif" alt="Jest Preview Demo" />
</p>

<p align="center">
  <a href="https://stackblitz.com/edit/jest-preview?file=README.md" title="Try Jest Preview Now">Try Jest Preview Online</a>. No downloads needed!
</p>

<!-- prettier-ignore-start -->
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-4-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
<!-- prettier-ignore-end -->

![PRs Welcome](https://img.shields.io/badge/PRs-welcome-green.svg)
[![npm](https://img.shields.io/npm/v/jest-preview)](https://www.npmjs.com/package/jest-preview)

## Why **jest-preview**

When writing tests using Jest, we usually debug by reading the HTML code. Sometimes the HTML is too complex and it's hard to imagine how the UI looks in our head. `jest-preview` initiates a server and serve your HTML in a browser, then you can see your actual UI visually. This way, it helps you debug jest tests faster.

`jest-preview` is initially design to work with [jest](https://jestjs.io/) and [react-testing-library](https://testing-library.com/docs/react-testing-library/intro/). However it's framework-agnostic and you can use it with any testing libraries.

## Features

- 👀 Preview your actual app's HTML in a browser in milliseconds.
- 🔄 Auto reload browser when execute `preview.debug()`.
- 💅 Support CSS:
  - ✅ Direct CSS import
  - ✅ [Styled-components](https://styled-components.com/)
  - ✅ External CSS
  - 🚧 [CSS Modules](https://github.com/css-modules/css-modules)
  - 🚧 [Sass](https://sass-lang.com/)
- 🌄 Support viewing images.

## How to use `jest-preview` in 2 lines of code

```diff
+import preview from 'jest-preview';

describe('App', () => {
  it('should work as expected', () => {
    render(<App />);

+    preview.debug();
  });
});
```

## Examples

- Use with [Vite](https://vitejs.dev/): [Example with Vite](https://github.com/nvh95/jest-preview/tree/main/examples/vite)
- Use with [Create React App](https://create-react-app.dev/): [Example with CRA](https://github.com/nvh95/jest-preview/tree/main/examples/create-react-app)

## Installation

1. Install `jest-preview`

```bash
npm install jest-preview
# Or
yarn add jest-preview
pnpm install jest-preview
```

2. Create `cssTransform.js` and `fileTransform.js`

```javascript
// config/jest/cssTransform.js
'use strict';

const { processCss } = require('jest-preview');

module.exports = {
  process(src, filename) {
    return processCss(src, filename);
  },
};
```

```javascript
// config/jest/fileTransform.js
'use strict';

const { processFile } = require('jest-preview');

module.exports = {
  process(src, filename) {
    return processFile(src, filename);
  },
};
```

For Create React App users, please use `processFileCRA` instead of `processFile`. See more at [examples/create-react-app/README.md](./examples/create-react-app/README.md#installation-and-usage)

3. Configure jest's transform to intercept CSS and files

```javascript
// jest.config.js
transform: {
    "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
    "^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)": "<rootDir>/config/jest/fileTransform.js",
  },
```

4. (Optional) Configure external CSS

Sometimes, there are some CSS files imported outside your current test components (e.g: CSS imported in `src/index.js`, `src/main.tsx`). In this case, you can manually add those CSS files to `jest-preview` by `jestPreviewConfigure`.

```js
  // jest.config.js
  {
    setupFilesAfterEnv: ["./config/jest/setupTests.js"],
  }
```

```js
// ./config/jest/setupTests.js
import { jestPreviewConfigure } from 'jest-preview';

// Should be path from root of your project
jestPreviewConfigure({
  externalCss: [
    'demo/global.css',
    'node_modules/@your-design-system/css/dist/index.min.css',
    'node_modules/bootstrap/dist/css/bootstrap.min.css',
  ],
});
```

## Usage

1. Update to `package.json`

```json
{
  "scripts": {
    "jest-preview": "jest-preview"
  }
}
```

Optionally, you can use `npm-run-all` to run jest and `jest-preview` server in parallel

```json
{
  "scripts": {
    "test:debug": "npm-run-all -p test jest-preview"
  },
  "devDependencies": {
    "npm-run-all": "latest"
  }
}
```

2. Run the `jest-preview` server

```bash
# You can use PORT to customize port, default to 3336
npm run jest-preview
# Or
yarn jest-preview
pnpm run jest-preview
```

3. Preview your html from jest. Following code demo how to use it with [react-testing-library](https://testing-library.com/docs/react-testing-library/intro/)

```javascript
import preview from 'jest-preview';

describe('App', () => {
  it('should work as expected', () => {
    render(<App />);

    userEvent.click(screen.getByTestId('increase'));
    userEvent.click(screen.getByTestId('increase'));

    // Open http://localhost:3336 to see the preview
    preview.debug();

    expect(screen.getByTestId('count')).toContainHTML('2');
  });
});
```

Then visit http://localhost:3336 to see the preview

<img alt="Preview your jest test in the browser" src="https://user-images.githubusercontent.com/8603085/161393898-7e283e38-6114-4064-9414-a0ce6d52361d.png" width="600" />

## Upcoming features

- Support css-in-js
  - ✅ Styled-components
- Multiple preview
- [You name it](https://github.com/nvh95/jest-preview/labels/feature_request)

## Run jest-preview locally

Install dependencies

```bash
npm install
```

To see the real demo app

```bash
npm run dev
```

Run `jest` and ` jest-preview` simultaneously

```bash
npm run test
```

Open chrome at http://localhost:3336 to see the preview

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://hung.dev"><img src="https://avatars.githubusercontent.com/u/8603085?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Hung Viet Nguyen</b></sub></a><br /><a href="https://github.com/nvh95/jest-preview/commits?author=nvh95" title="Code">💻</a> <a href="https://github.com/nvh95/jest-preview/commits?author=nvh95" title="Documentation">📖</a> <a href="#example-nvh95" title="Examples">💡</a></td>
    <td align="center"><a href="https://github.com/ntt261298"><img src="https://avatars.githubusercontent.com/u/36792554?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Truong Nguyen</b></sub></a><br /><a href="https://github.com/nvh95/jest-preview/commits?author=ntt261298" title="Code">💻</a> <a href="https://github.com/nvh95/jest-preview/commits?author=ntt261298" title="Documentation">📖</a> <a href="#example-ntt261298" title="Examples">💡</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/viet-doan-830061a0/"><img src="https://avatars.githubusercontent.com/u/103036586?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Viet Huu Doan</b></sub></a><br /><a href="#design-doanhuuviet" title="Design">🎨</a></td>
    <td align="center"><a href="https://github.com/ntbinh-Harvey"><img src="https://avatars.githubusercontent.com/u/57211574?v=4?s=100" width="100px;" alt=""/><br /><sub><b>HarveyNguyen</b></sub></a><br /><a href="https://github.com/nvh95/jest-preview/commits?author=ntbinh-Harvey" title="Tests">⚠️</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## License

![This is open source software](https://user-images.githubusercontent.com/8603085/161439058-98faea42-c6e6-46f4-9ce6-218fad5f3b9a.gif)

MIT
