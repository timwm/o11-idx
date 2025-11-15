import fs from "node:fs";
import path from "node:path";

// --- Configuration ---
const PACKAGE_JSON_PATH = path.resolve("package.json");
const MANIFEST_PATH = path.resolve(".release-please-manifest.json");
// Standard key (fallback) for single-package repositories used by release-please
const MANIFEST_KEY = ".";

/**
 * Safely reads and parses a JSON file synchronously.
 * Exits the process if parsing fails, but returns null if the file is not found (ENOENT).
 * @param {string} filePath The full path to the JSON file.
 * @returns {object | null} The parsed JSON object, or null if file not found.
 */
function readJsonFile(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileContent);
  } catch (error) {
    // Handle the expected case: manifest file not existing on first run
    if (error.code === "ENOENT") {
      return null;
    }
    console.error(
      `FATAL: Error reading or parsing ${path.basename(filePath)}:`,
      error.message,
    );
    process.exit(1);
  }
}

/**
 * Main function to compare package.json version with .release-please-manifest.json version.
 * Exits with 0 on success/initial state, and 1 on failure.
 */
function checkVersions() {
  // 1. Get package.json version
  const packageJson = readJsonFile(PACKAGE_JSON_PATH);
  if (!packageJson) {
    console.error(
      `FATAL: Required file ${path.basename(PACKAGE_JSON_PATH)} not found.`,
    );
    process.exit(1);
  }
  const packageVersion = packageJson.version;
  if (!packageVersion) {
    console.error(
      `FATAL: 'version' field not found in ${path.basename(PACKAGE_JSON_PATH)}.`,
    );
    process.exit(1);
  }

  // 2. Get manifest version, handling the initial/missing state
  const manifest = readJsonFile(MANIFEST_PATH);

  if (!manifest || Object.keys(manifest).length === 0) {
    console.log(
      `[PASS] ${path.basename(MANIFEST_PATH)} not found or empty. Assuming initial run/no prior release sync. Check skipped.`,
    );
    process.exit(0);
  }

  // Get version from the standard release-please key
  let key = packageJson.name;
  let manifestVersion = manifest[key];

  if (!manifestVersion) {
    // Fallback to the standard single-package key
    key = MANIFEST_KEY;
    manifestVersion = manifest[key];
  }

  if (!manifestVersion) {
    console.log(
      `[PASS] Found ${path.basename(MANIFEST_PATH)}, but key '${key}' is missing or empty. Skipping version comparison.`,
    );
    process.exit(0);
  }

  // 3. Compare versions
  if (packageVersion !== manifestVersion) {
    console.error(
      `[FAILURE] Versions MISMATCH!
      package.json version:          ${packageVersion}
      .release-please-manifest.json: ${manifestVersion}`,
    );
    process.exit(1);
  }
}

checkVersions();
