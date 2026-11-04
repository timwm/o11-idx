// Fails when the VS Code extension package would miss a file it needs.
//
// .vscodeignore is an allowlist, and vsce packages happily without a file
// package.json points to (a theme, the icon): the extension would install but
// not work. This lists what `vsce package` would include and checks it.
import fs from "node:fs";
import { listFiles, PackageManager } from "@vscode/vsce";

const manifest = JSON.parse(fs.readFileSync("package.json", "utf8"));
const normalize = (p) => p.replace(/^\.\//, "");

const required = [
  ...(manifest.contributes?.themes ?? []).map((theme) => theme.path),
  manifest.icon,
  "LICENSE", // GPL-2.0 requires distributing the license text.
]
  .filter(Boolean)
  .map(normalize);

// No runtime dependencies, so vsce must not ask npm for them (as `vsce package
// --no-dependencies`). `PackageManager.None` is a number; a string would not match.
const packaged = new Set(
  (
    await listFiles({ cwd: process.cwd(), packageManager: PackageManager.None })
  ).map(normalize),
);
const missing = required.filter((file) => !packaged.has(file));

if (missing.length > 0) {
  console.error(
    `[FAILURE] The extension package would miss: ${missing.join(", ")}\n  Add each to the allowlist in .vscodeignore.`,
  );
  process.exit(1);
}
