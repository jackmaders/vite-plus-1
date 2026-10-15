import { defineConfig } from "vite-plus";

export default defineConfig({
  fmt: {},
  lint: {
    categories: {
      correctness: "error",
      nursery: "error",
      pedantic: "error",
      perf: "error",
      restriction: "error",
      style: "error",
      suspicious: "error",
    },
    env: { browser: true, node: false },
    jsPlugins: [
      { name: "vite-plus", specifier: "vite-plus/oxlint-plugin" },
      "eslint-plugin-regexp",
    ],
    options: {
      denyWarnings: true,
      reportUnusedDisableDirectives: "error",
      typeAware: true,
      typeCheck: true,
    },
    overrides: [
      {
        env: { browser: false, node: true },
        files: ["**/*.config.ts", "scripts/**/*.ts"],
      },
      {
        files: ["**/*.config.ts"],
        rules: {
          // Vite configuration uses a default export, matching the reference.
          "import/no-default-export": "off",
        },
      },
      {
        files: ["src/counter.ts"],
        rules: {
          // DOM elements are mutable platform objects; the counter updates textContent.
          "typescript/prefer-readonly-parameter-types": "off",
        },
      },
    ],
    plugins: ["typescript", "unicorn", "oxc", "import", "promise", "jsdoc", "node"],
    rules: {
      "func-style": ["error", "declaration"],
      // The reference permits exports next to declarations instead of requiring a footer.
      "import/exports-last": "off",
      // Named exports are the reference convention; these rules require the opposite.
      "import/no-named-export": "off",
      // CSS imports install styles; other unassigned imports remain prohibited.
      "import/no-unassigned-import": ["error", { allow: ["**/*.css"] }],
      // A single named export remains named, matching the reference.
      "import/prefer-default-export": "off",
      // Match the reference's deliberate allowance for conditional expressions.
      "no-ternary": "off",
      // Separate declarations preserve initialization order across DOM rendering.
      "one-var": ["error", "never"],
      "regexp/confusing-quantifier": "error",
      "regexp/control-character-escape": "error",
      "regexp/grapheme-string-literal": "error",
      // Native unicorn/no-hex-escape prohibits hexadecimal escapes; keep Unicode escapes.
      "regexp/hexadecimal-escape": "off",
      // Native unicorn/escape-case already owns escape casing.
      "regexp/letter-case": "off",
      "regexp/match-any": "error",
      "regexp/negation": "error",
      "regexp/no-contradiction-with-assertion": "error",
      "regexp/no-control-character": "error",
      "regexp/no-dupe-characters-character-class": "error",
      "regexp/no-dupe-disjunctions": "error",
      "regexp/no-empty-alternative": "error",
      "regexp/no-empty-capturing-group": "error",
      // Native no-empty-character-class already rejects this pattern.
      "regexp/no-empty-character-class": "off",
      "regexp/no-empty-group": "error",
      "regexp/no-empty-lookarounds-assertion": "error",
      "regexp/no-empty-string-literal": "error",
      "regexp/no-escape-backspace": "error",
      "regexp/no-extra-lookaround-assertions": "error",
      // Native no-invalid-regexp already validates constant RegExp constructors.
      "regexp/no-invalid-regexp": "off",
      "regexp/no-invisible-character": "error",
      "regexp/no-lazy-ends": "error",
      "regexp/no-legacy-features": "error",
      "regexp/no-misleading-capturing-group": "error",
      // Native no-misleading-character-class covers misleading Unicode characters.
      "regexp/no-misleading-unicode-character": "off",
      "regexp/no-missing-g-flag": "error",
      "regexp/no-non-standard-flag": "error",
      "regexp/no-obscure-range": "error",
      "regexp/no-octal": "error",
      "regexp/no-optional-assertion": "error",
      "regexp/no-potentially-useless-backreference": "error",
      "regexp/no-standalone-backslash": "error",
      "regexp/no-super-linear-backtracking": "error",
      "regexp/no-super-linear-move": "error",
      "regexp/no-trivially-nested-assertion": "error",
      "regexp/no-trivially-nested-quantifier": "error",
      "regexp/no-unused-capturing-group": "error",
      "regexp/no-useless-assertions": "error",
      // Native no-useless-backreference already rejects useless backreferences.
      "regexp/no-useless-backreference": "off",
      "regexp/no-useless-character-class": "error",
      "regexp/no-useless-dollar-replacements": "error",
      // Native no-useless-escape already checks unnecessary escapes.
      "regexp/no-useless-escape": "off",
      "regexp/no-useless-flag": "error",
      "regexp/no-useless-lazy": "error",
      "regexp/no-useless-non-capturing-group": "error",
      "regexp/no-useless-quantifier": "error",
      "regexp/no-useless-range": "error",
      "regexp/no-useless-set-operand": "error",
      "regexp/no-useless-string-literal": "error",
      "regexp/no-useless-two-nums-quantifier": "error",
      "regexp/no-zero-quantifier": "error",
      "regexp/optimal-lookaround-quantifier": "error",
      "regexp/optimal-quantifier-concatenation": "error",
      "regexp/prefer-character-class": "error",
      "regexp/prefer-d": "error",
      "regexp/prefer-escape-replacement-dollar-char": "error",
      "regexp/prefer-lookaround": "error",
      "regexp/prefer-named-backreference": "error",
      // Native prefer-named-capture-group already requires named captures.
      "regexp/prefer-named-capture-group": "off",
      "regexp/prefer-named-replacement": "error",
      "regexp/prefer-plus-quantifier": "error",
      "regexp/prefer-predefined-assertion": "error",
      "regexp/prefer-quantifier": "error",
      "regexp/prefer-question-quantifier": "error",
      "regexp/prefer-range": "error",
      // Native typescript/prefer-regexp-exec already enforces this.
      "regexp/prefer-regexp-exec": "off",
      // Native unicorn/prefer-regexp-test already enforces this.
      "regexp/prefer-regexp-test": "off",
      "regexp/prefer-result-array-groups": "error",
      "regexp/prefer-set-operation": "error",
      "regexp/prefer-star-quantifier": "error",
      "regexp/prefer-unicode-codepoint-escapes": "error",
      "regexp/prefer-w": "error",
      // Native require-unicode-regexp already requires Unicode mode.
      "regexp/require-unicode-regexp": "off",
      // The v flag requires ES2024; preserve the current ES2023 compiler target.
      "regexp/require-unicode-sets-regexp": "off",
      "regexp/simplify-set-operations": "error",
      "regexp/sort-alternatives": "error",
      "regexp/sort-character-class-elements": "error",
      "regexp/sort-flags": "error",
      "regexp/strict": "error",
      "regexp/unicode-escape": "error",
      "regexp/unicode-property": "error",
      "regexp/use-ignore-case": "error",
      // Oxfmt owns import ordering; competing alphabetic ordering disagrees with it.
      "sort-imports": "off",
      // Match the reference's preference for inferred types and return types.
      "typescript/explicit-function-return-type": "off",
      "typescript/explicit-module-boundary-types": "off",
      "vite-plus/prefer-vite-plus-imports": "error",
    },
  },
  staged: {
    "*": "vp check --fix",
  },
});
