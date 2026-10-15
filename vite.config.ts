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
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
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
