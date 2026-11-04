export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // Bodies and footers are written unwrapped, one line per paragraph or
    // bullet; Conventional Commits sets no line length. The header limit stays.
    "body-max-line-length": [0],
    "footer-max-line-length": [0],
  },
};
