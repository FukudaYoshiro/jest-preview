import path from 'path';
import camelcase from 'camelcase';

function getRelativeFilename(filename: string): string {
  return filename.split(process.cwd())[1];
}

export function processFile(src: string, filename: string): string {
  const relativeFilename = getRelativeFilename(filename);
  return `module.exports = ${JSON.stringify(relativeFilename)};`;
}

export function processFileCRA(src: string, filename: string): string {
  // /Users/your-name/your-project/src/assets/image.png => /src/assets/image.png
  const relativeFilename = JSON.stringify(getRelativeFilename(filename));

  if (filename.match(/\.svg$/)) {
    // Based on how SVGR generates a component name:
    // https://github.com/smooth-code/svgr/blob/01b194cf967347d43d4cbe6b434404731b87cf27/packages/core/src/state.js#L6
    const pascalCaseFilename = camelcase(path.parse(filename).name, {
      pascalCase: true,
    });
    const componentName = `Svg${pascalCaseFilename}`;
    return `const React = require('react');
    module.exports = {
      __esModule: true,
      default: ${relativeFilename},
      ReactComponent: React.forwardRef(function ${componentName}(props, ref) {
        return {
          $$typeof: Symbol.for('react.element'),
          type: 'svg',
          ref: ref,
          key: null,
          props: Object.assign({}, props, {
            children: ${relativeFilename}
          })
        };
      }),
    };`;
  }

  return `module.exports = ${relativeFilename};`;
}

export function processCss(src: string, filename: string): string {
  console.log('processCSs', filename);
  const relativeFilename = getRelativeFilename(filename);
  // Transform to a javascript module that load a <link rel="stylesheet"> tag to the page.
  return `const relativeCssPath = "${relativeFilename}";
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = relativeCssPath;
  document.body.appendChild(link);
  
  module.exports = JSON.stringify(relativeCssPath);`;
}

// TODO: MEDIUM PRIORITY To research about getCacheKey
// Reference:
// - https://jestjs.io/docs/code-transformation#writing-custom-transformers
// - https://github.com/swc-project/jest/blob/17cf883b46c050a485975d8ce96a05277cf6032f/index.ts#L37-L52
// const cacheKeyFunction = createCacheKey();
// export function getCacheKey(src: string, filename: string, ...rest): string {
//   const baseCacheKey = cacheKeyFunction(src, filename, ...rest);
//   return crypto.createHash('md5').update(baseCacheKey).digest('hex');
// }

// We cannot create async transformer if we are using CommonJS
// We can use that if we opt-in to ESM. But I don't think it's a good idea for now
// Need to find a way to support async actions (compile CSS Modules)
// For now. My idea is tp move transform logic to the transformed file itself (similar to what we do for cssTransform)
// Reference: https://github.com/facebook/jest/issues/11081#issuecomment-791259034
// https://github.com/facebook/jest/issues/11458
// Also, there is a inconsistency in jest docs about should `process` be required
// https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
// A transformer must be an object with at least a process function
// https://jestjs.io/docs/code-transformation#writing-custom-transformers
// As can be seen, only process or processAsync is mandatory to implement
export function processCSSModules(src: string, filename: string): string {
  
  return `
const postcss = require('postcss');
const CSSModulesSync = require('postcss-modules-sync').default;
const cssSrc = ${JSON.stringify(src)};

let exportedTokens = {};

const result = postcss(
  CSSModulesSync({
    getJSON: (tokens) => {
      exportedTokens = tokens;
    },
  }),
)
.process(cssSrc, { from: ${JSON.stringify(filename)} })

const style = document.createElement('style');
style.type = 'text/css';
style.appendChild(document.createTextNode(result.css));
document.body.appendChild(style);

result.sync();
module.exports = exportedTokens`;
}
