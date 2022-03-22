// import fs from "fs";
// import path from "path";

const fs = require("fs");
const path = require("path");
// TODO1: We can support image import by convert image to base 64
// or just copy image to preview folder
// Currently, we copy to preview folder. But convert to base64 might be a better idea
// Since we can avoid the File I/O operations and keep images in the memory
// To experiment about this idea but low priority. First, make it work.

// TODO2: HIGH PRIORITY What about files that are not images? e.g. pdf, doc, mp3?
// I suppose it's OK. Because as I recalled, webpack still convert pdf, doc, mp3 => link (file-loader?)
export function processFile(src: string, filename: string): string {
  const assetFilename = JSON.stringify(path.basename(filename));
  // console.log("fileTransform");
  // console.log("src", src);
  // console.log("filename", filename);
  // TODO: MEDIUM PRIORITY: For PoC, we only copy image file to preview folder and keep the BASENAME.
  // That means `assets/images/abc.png` will be copied to `./node_modules/.cache/jest-preview-dom/abc.png`
  // We should keep the structure. i.e: `./node_modules/.cache/jest-preview-dom/assets/images/abc.png`
  // The reason we need to keep the structure since there might be 2 images with the same name in 2 different folders.
  // E.g: `assets/images/abc.png` vs `demo/abc.png` => only 1 `abc.png`
  // However, we might not need to make it nested if we using hashing to differentiate.
  // Hash might be a better solution for 0.0.1
  // Same for cssTransform
  // assets/images/abc.png => fdsfs343r3.png
  // demo/abc.png  => dfdfsgs.png
  if (!fs.existsSync("./node_modules/.cache/jest-preview-dom")) {
    fs.mkdirSync("./node_modules/.cache/jest-preview-dom", {
      recursive: true,
    });
  }
  fs.writeFileSync(
    `./node_modules/.cache/jest-preview-dom/${path.basename(filename)}`,
    src,
    {
      flag: "w",
    }
  );

  return `module.exports = ${assetFilename};`;
}
