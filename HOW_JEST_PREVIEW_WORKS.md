# How Jest Preview Works

## How it works ELI5

Jest Preview turns JSDOM to a real DOM and user can see it on a browser. It saved the HTML from JSDOM and serve over a web server (with a web socket connection). It also uses [Jest Tranformations](https://jestjs.io/docs/code-transformation) to handle CSS and files (e.g: images).

## Components

- Jest Preview Server: when you run `jest-preview` (`server/previewServer.js`)
- External Browser (Jest Preview Dashboard): e.g: Chrome
- Jest process: `jest`

## How Jest Preview's components interact

- In **Jest process**, whenever `preview.debug()` is triggerd or a test fails in [Automatic Mode](https://www.jest-preview.com/blog/automatic-mode), a html file is saved to `node_modules/.cache/jest-preview`.
- **Jest Preview Server** serve that html file to the **External Browser**.
- If that html file changes, **Jest Preview Server** will send a websocket event to **External Browser** to trigger reloading for newest UI.

## How to display images and CSS

Usually, images and CSS are dropped when testing in Jest. In opposite, Jest Preview tries to keep images and CSS in the Jest tests (JSDOM).

### Images and CSS imported to components

- [Code transformation](https://jestjs.io/docs/code-transformation)
- File transformation: Serve source file directly
- CSS transformation: Jest Preview turn a css file to a javascript file then try to inject CSS to the `document.head`. Think of Jest Preview try to make any CSS strategy to a CSS-in-JS in Jest.
  - CSS Modules: Process via post css then inject the output to the `document.head`.
  - Sass: Process by Dart Sass then inject the output to the `document.head`.
  - Vanilla CSS: Inject css to the head.
- CSS-in-JS (styled-components, emotion...): Already inject css to the `document.head` by CSS-in-JS themselves.

### Global CSS

- Currerntly, CSS outside a rendered component is handled via `jestPreviewConfigure`. The general approach is to save CSS to a file then Jest Preview Server injects it to the preview on demand. This approach is simple and easy to implement. However, the CSS does not appear in the JSDOM, and it's hard to write tests for it. In the future, we would like to move global CSS to the JSDOM (i.e: `document.head`).
