// Writes the theme as strict JSON for the npm package.
//
// The source theme is JSONC: VS Code accepts its comments, but `JSON.parse`,
// `import ... with { type: "json" }` and bundlers do not. Runs on `prepack`, so
// the npm tarball carries dist/o11-idx-color-theme.json; the VS Code extension
// keeps using the source file.
import fs from "node:fs";
import path from "node:path";
import { parse, printParseErrorCode } from "jsonc-parser";

const SOURCE = path.resolve("themes/O11 IDX-color-theme.json");
const OUTPUT = path.resolve("dist/o11-idx-color-theme.json");

const errors = [];
const theme = parse(fs.readFileSync(SOURCE, "utf8"), errors, {
  allowTrailingComma: true,
});

if (errors.length > 0) {
  for (const { error, offset } of errors) {
    console.error(
      `FATAL: ${path.basename(SOURCE)} at offset ${offset}: ${printParseErrorCode(error)}`,
    );
  }
  process.exit(1);
}

fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
fs.writeFileSync(OUTPUT, `${JSON.stringify(theme, null, 2)}\n`);
