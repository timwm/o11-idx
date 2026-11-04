# Contributing to O11 IDX

Thanks for helping improve O11 IDX! This guide covers setting up the project, trying your changes in VS Code, and getting them merged.

## Setup

You need:

- **Node.js 26** (the version in [`.node-version`](.node-version); any version from 22.22.1 works).
- **pnpm**, installed as described at <https://pnpm.io/installation>. Any recent pnpm runs the version pinned in `package.json` (`packageManager`) by itself.

```bash
git clone https://github.com/timwm/o11-idx.git
cd o11-idx
pnpm install
```

`pnpm install` also sets up the Git hooks (see [Commits](#commits)).

## Trying your changes

The whole theme is one file: [`themes/O11 IDX-color-theme.json`](themes/O11%20IDX-color-theme.json). It is JSONC, so `//` comments are fine.

1. Open the repository in VS Code and press <kbd>F5</kbd> (the **Extension** launch configuration). A second window, the Extension Development Host, opens with the theme loaded.
2. In that window, pick **O11 IDX** under **Preferences: Color Theme** (<kbd>Ctrl</kbd>/<kbd>Cmd</kbd>+<kbd>K</kbd> <kbd>Ctrl</kbd>/<kbd>Cmd</kbd>+<kbd>T</kbd>).
3. After editing the theme file, run **Developer: Reload Window** in the Extension Development Host to see the result.
4. To find which scope colors a token, run **Developer: Inspect Editor Tokens and Scopes** and click on the token.

To try the packaged extension instead:

```bash
pnpm build   # lints, then writes o11-idx-<version>.vsix
```

Then run **Extensions: Install from VSIX...** and choose that file.

## Checks

| Command                | What it does                                                                        |
| ---------------------- | ----------------------------------------------------------------------------------- |
| `pnpm lint`            | Lints with Biome (CI runs this too).                                                |
| `pnpm format`          | Formats with Biome.                                                                 |
| `pnpm build`           | Lints, runs `vsix:check`, then packages the extension (`.vsix`).                    |
| `pnpm vsix:check`      | Fails if the extension would miss the theme, icon or license (see `.vscodeignore`). |
| `pnpm build:npm-theme` | Checks the theme parses and writes the strict-JSON npm copy to `dist/`.             |
| `pnpm pack`            | Builds the npm package (`.tgz`) to inspect what would be published.                 |

## Commits

Commit messages follow [Conventional Commits](https://www.conventionalcommits.org) (`feat: …`, `fix: …`, `chore: …`); they decide the next version number and the changelog. The Git hooks help:

- **commit-msg** checks the message with commitlint.
- **pre-commit** runs lint-staged (Biome) and checks that the version in `package.json` matches `.release-please-manifest.json`.
- An empty commit message, or `pnpm commit`, opens the Commitizen prompt.

For a color change, `fix:` is usual; use `feat:` for something new, such as support for another language's tokens.

## Pull requests

- Keep one change per pull request.
- For anything visual, add **before and after screenshots**; the pull request template asks for them.
- Don't edit `version` in `package.json` or `CHANGELOG.md`: releases do that.
- CI lints and packages the extension; both must pass.

## Releases

Releases are automated, so contributors don't need to do anything:

1. [release-please](https://github.com/googleapis/release-please) keeps a release pull request open, built from the commit messages on `main`.
2. Merging it tags `vX.Y.Z` and publishes a GitHub release.
3. The release publishes the extension to the VS Code Marketplace and Open VSX, and the theme to npm.

## Dependencies

[Renovate](https://docs.renovatebot.com) proposes dependency updates every Monday, once a release is at least three days old; security fixes come straight away. pnpm applies the same three-day rule on install (`minimumReleaseAge` in `pnpm-workspace.yaml`). A security fix younger than that fails to install until it is listed under `minimumReleaseAgeExclude` there (see the comment in that file).
