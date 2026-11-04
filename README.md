# O11 IDX Theme

<p align="center">
  <img src="https://raw.githubusercontent.com/timwm/o11-idx/main/assets/img/icon-strip.png" alt="O11 IDX Logo" width="auto" height="128"
  style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.3);">
</p>

<p align="center">
  <strong>A beautiful theme for VS Code inspired by Google IDX</strong>
</p>

<p align="center">
  <!-- <a href="https://marketplace.visualstudio.com/items?itemName=timwm.o11-idx">
    <img src="https://vsmarketplacebadges.dev/rating-short/timwm.o11-idx.svg?style=for-the-badge&label=Rating&color=ffb870" alt="Rating">
  </a> -->
  <!-- <a href="https://marketplace.visualstudio.com/items?itemName=timwm.o11-idx">
    <img src="https://vsmarketplacebadges.dev/installs-short/timwm.o11-idx.svg?style=for-the-badge&label=Installs&color=70ff87" alt="Installations">
  </a> -->
</p>

<div align="center" style="text-align: center;">

[![Visual Studio Marketplace](https://vsmarketplacebadges.dev/version-short/timwm.o11-idx.svg?style=for-the-badge&label=Version&color=0f7095)](https://marketplace.visualstudio.com/items?itemName=timwm.o11-idx)
[![Downloads](https://vsmarketplacebadges.dev/downloads-short/timwm.o11-idx.svg?style=for-the-badge&label=VS%20Marketplace%20Downloads&color=0f7095)](https://marketplace.visualstudio.com/items?itemName=timwm.o11-idx)
[![OpenVSX Registry](https://img.shields.io/open-vsx/dt/timwm/o11-idx?color=purple&label=OpenVSX%20Downloads&style=for-the-badge)](https://open-vsx.org/extension/timwm/o11-idx)
<!-- [![Installs](https://vsmarketplacebadges.dev/installs-short/timwm.o11-idx.svg?style=for-the-badge&label=Installs&color=0f7095)](https://marketplace.visualstudio.com/items?itemName=timwm.o11-idx) -->
<!-- [![Open VSX Registry](https://img.shields.io/open-vsx/v/timwm/o11-idx?color=purple&label=Open%20VSX&style=for-the-badge)](https://open-vsx.org/extension/timwm/o11-idx) -->
[![Build Status](https://img.shields.io/github/actions/workflow/status/timwm/o11-idx/ci.yml?branch=main&style=for-the-badge&logo=github)](https://github.com/timwm/o11-idx/actions/workflows/ci.yml)
[![License](https://img.shields.io/github/license/timwm/o11-idx?style=for-the-badge)](https://github.com/timwm/o11-idx/blob/main/LICENSE)

</div>

<p align="center">Enjoying O11 IDX? Support the project by starring it or becoming a sponsor on <a href="https://github.com/sponsors/timwm">GitHub Sponsors</a>.</p>
<p align="center">
  <!-- Sponsor -->
  <!-- <a href="https://github.com/sponsors/timwm">
    <img src="https://img.shields.io/badge/%F0%9F%92%96-Sponsor%20me!-ff69b4?style=for-the-badge" alt="Sponsor Me">
  </a> -->
  <a href="https://buymeacoffee.com/timwm">
    <img src="https://img.shields.io/badge/Buy%20Me%20A%20Coffee-☕-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black" alt="Buy Me A Coffee">
  </a>
  <a href="https://github.com/timwm/o11-idx/stargazers">
    <img src="https://img.shields.io/github/stars/timwm/o11-idx?style=for-the-badge&color=ffb870" alt="GitHub Stars">
  </a>
</p>

---

## ✨ Features

O11 IDX is a carefully crafted dark theme that brings the elegant aesthetics of Google IDX to your VS Code environment. Designed with developer comfort and productivity in mind, this theme offers:

### 🎨 **Beautiful Color Palette**

- **Deep, comfortable backgrounds** - Reduce eye strain during long coding sessions
- **Carefully selected syntax colors** - Enhanced code readability with distinct token colors
- **Soft, vibrant accents** - Purple, blue, and green highlights that pop without overwhelming

### 🔍 **Enhanced Readability**

- **High contrast where it matters** - Keywords, strings, and functions stand out clearly
- **Optimized bracket highlighting** - Easily track code blocks with color-coded brackets
- **Subtle UI elements** - Interface components that don't distract from your code

### 💡 **Smart Syntax Highlighting**

- **Multi-language support** - Consistent, beautiful colors across JavaScript, TypeScript, Python, HTML, CSS, C/C++, Haskell and more
- **Distinct token colors** - Keywords, strings, functions, variables, constants and types each have their own color
- **Markdown support** - Beautiful rendering for documentation

### 🎯 **Polished UI Elements**

- **Dark activity bar** - Clean, modern sidebar with purple accents
- **Elegant editor tabs** - Easy-to-read tabs with active state indicators
- **Refined status bar** - Subtle information display at the bottom
- **Consistent terminal colors** - ANSI colors that match the theme aesthetic

---

## 📸 Screenshots

### Editor View

<p align="center">
  <img src="https://raw.githubusercontent.com/timwm/o11-idx/main/assets/img/editor-view.png" alt="O11 IDX Theme - Full Editor View" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.3);">
</p>

### Theme Preview

<p align="center">
  <img src="https://raw.githubusercontent.com/timwm/o11-idx/main/assets/img/theme-preview.png" alt="O11 IDX Theme - Original Design" style="border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.3);">
</p>

---

## 🚀 Installation

### Via VS Code Marketplace

1. Open **Extensions** sidebar panel in VS Code (`Ctrl+Shift+X` / `Cmd+Shift+X`)
2. Search for **"O11 IDX"**
3. Click **Install**
4. Go to **File > Preferences > Theme > Color Theme** (or `Ctrl+K Ctrl+T` / `Cmd+K Cmd+T`)
5. Select **O11 IDX**

### Via Command Line

```bash
code --install-extension timwm.o11-idx
```

### Manual Installation

1. Download the `.vsix` file from [GitHub Releases](https://github.com/timwm/o11-idx/releases)
2. Open VS Code
3. Go to Extensions view
4. Click on the `...` menu at the top
5. Select **Install from VSIX...**
6. Choose the downloaded file

### Outside VS Code (npm)

The theme is also published to npm as strict JSON, for tools that load VS Code themes, such as [Shiki](https://shiki.style), and through Shiki the Monaco editor ([`@shikijs/monaco`](https://shiki.style/packages/monaco)):

```bash
npm install o11-idx
```

```js
import { createHighlighter } from "shiki";
import o11Idx from "o11-idx" with { type: "json" };

const highlighter = await createHighlighter({
  themes: [o11Idx],
  langs: ["ts"],
});
const html = highlighter.codeToHtml(code, { lang: "ts", theme: "O11 IDX" });
```

---

## 🎨 Color Palette

| Color                                                                       | Hex       | Usage                                              |
| --------------------------------------------------------------------------- | --------- | -------------------------------------------------- |
| ![#000410](https://img.shields.io/badge/%20-000410?style=flat&color=000410) | `#000410` | Editor and activity bar background                 |
| ![#010816](https://img.shields.io/badge/%20-010816?style=flat&color=010816) | `#010816` | Sidebar background                                 |
| ![#d9dfe7](https://img.shields.io/badge/%20-d9dfe7?style=flat&color=d9dfe7) | `#d9dfe7` | Editor foreground, text                            |
| ![#a87ffb](https://img.shields.io/badge/%20-a87ffb?style=flat&color=a87ffb) | `#a87ffb` | Accent: active tab, activity bar, badges, buttons  |
| ![#556677](https://img.shields.io/badge/%20-556677?style=flat&color=556677) | `#556677` | Comments                                           |
| ![#df769b](https://img.shields.io/badge/%20-df769b?style=flat&color=df769b) | `#df769b` | Keywords, operators                                |
| ![#16b673](https://img.shields.io/badge/%20-16b673?style=flat&color=16b673) | `#16b673` | Storage (`const`, `class`, `def`), HTML tags       |
| ![#e66533](https://img.shields.io/badge/%20-e66533?style=flat&color=e66533) | `#e66533` | Strings                                            |
| ![#d5971a](https://img.shields.io/badge/%20-d5971a?style=flat&color=d5971a) | `#d5971a` | Template strings                                   |
| ![#16a3b6](https://img.shields.io/badge/%20-16a3b6?style=flat&color=16a3b6) | `#16a3b6` | Functions                                          |
| ![#49d6e9](https://img.shields.io/badge/%20-49d6e9?style=flat&color=49d6e9) | `#49d6e9` | Built-ins such as Python's `print`                 |
| ![#e4b781](https://img.shields.io/badge/%20-e4b781?style=flat&color=e4b781) | `#e4b781` | Variables, properties                              |
| ![#a83dee](https://img.shields.io/badge/%20-a83dee?style=flat&color=a83dee) | `#a83dee` | Constants, HTML attributes                         |
| ![#7060eb](https://img.shields.io/badge/%20-7060eb?style=flat&color=7060eb) | `#7060eb` | Numbers, `true` / `null`                           |
| ![#49ace9](https://img.shields.io/badge/%20-49ace9?style=flat&color=49ace9) | `#49ace9` | Class names                                        |
| ![#d67e5c](https://img.shields.io/badge/%20-d67e5c?style=flat&color=d67e5c) | `#d67e5c` | Types, interfaces, primitives (`string`, `number`) |
| ![#85cdf1](https://img.shields.io/badge/%20-85cdf1?style=flat&color=85cdf1) | `#85cdf1` | HTML attribute values                              |

---

## ⚙️ Configuration

### Recommended Font Settings

For the best experience with O11 IDX, I recommend these font settings:

```jsonc
{
  "editor.fontFamily": "'Cartograph CF', 'JetBrains Mono', 'Fira Code', Inconsolata, 'Source Code Pro Medium', 'Droid Sans Mono', monospace",
  "editor.fontLigatures": true
}
```

### Semantic Highlighting (optional)

Semantic highlighting colors names by what the language server knows about them across your project, not only by syntax. O11 IDX leaves it off by default, as its colors are tuned for syntax highlighting (tuning them for semantic tokens is tracked in [#13](https://github.com/timwm/o11-idx/issues/13)). To turn it on, add one of these to your `settings.json`:

```jsonc
{
  // For every theme
  "editor.semanticHighlighting.enabled": true,

  // Or only for O11 IDX
  "editor.semanticTokenColorCustomizations": {
    "[O11 IDX]": {
      "enabled": true,
      // Optional: color `const` like other variables
      "rules": { "variable.readonly": "#e4b781" }
    }
  }
}
```

---

## 🔧 Customization

You can customize the theme colors in your `settings.json`:

```jsonc
{
  "workbench.colorCustomizations": {
    "[O11 IDX]": {
      "editor.background": "#171f2b"
      // Add your custom colors here
    }
  },
  "editor.tokenColorCustomizations": {
    "[O11 IDX]": {
      "comments": "#7F8D9F"
      // Customize syntax colors here
    }
  }
  // ...
}
```

---

## 🤝 Contributing

We love contributions! Contributors are thanked automatically:

- When your pull request is merged, it gets a thank-you comment (with a welcome on your first one).
- When a release includes it, the pull request gets a comment linking that release.

`pnpm contributors:latest` lists everyone who contributed since the last release, with commit counts and GitHub avatars.

### How to Contribute

See [CONTRIBUTING.md](CONTRIBUTING.md) for setting up, testing the theme locally, commit conventions and how releases work. In short:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes using conventional commits (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Your contribution will be automatically recognized in the next release! 🎉

---

## 🐛 Issues & Suggestions

Found a bug or have a suggestion? Please open an issue on [GitHub Issues](https://github.com/timwm/o11-idx/issues).

---

## 📝 Changelog

See [CHANGELOG.md](CHANGELOG.md) for a detailed history of changes.

---

## 📄 License

This theme is licensed under the [GPL-2.0](LICENSE) license.

---

## 💖 Support

If you enjoy this theme, please consider:

- ⭐ [Starring the repository](https://github.com/timwm/o11-idx)
- 📢 Sharing it with others
- 🐛 Reporting bugs or suggesting improvements

---

## 🙏 Acknowledgments

- Inspired by **Google IDX**
- Built with love for the VS Code community

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/timwm">timwm</a>
</p>

<p align="center">
  <strong>Happy Coding! 🚀</strong>
</p>
