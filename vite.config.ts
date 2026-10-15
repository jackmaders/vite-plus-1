import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig, lazyPlugins } from "vite-plus";

const GENERATED_FILES = ["src/routeTree.gen.ts"];

export default defineConfig({
  fmt: { ignorePatterns: GENERATED_FILES },
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
    ignorePatterns: GENERATED_FILES,
    jsPlugins: [
      { name: "vite-plus", specifier: "vite-plus/oxlint-plugin" },
      { name: "no-unsanitized", specifier: "eslint-plugin-no-unsanitized" },
      { name: "@tanstack/router", specifier: "@tanstack/eslint-plugin-router" },
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
        files: ["**/*.config.ts"],
      },
      {
        files: ["**/*.config.ts"],
        rules: { "import/no-default-export": "off" },
      },
      {
        files: ["src/routes/**/*.tsx"],
        rules: { "react/only-export-components": "off" },
      },
    ],
    plugins: [
      "typescript",
      "unicorn",
      "oxc",
      "import",
      "promise",
      "jsdoc",
      "node",
      "react",
      "react-perf",
      "jsx-a11y",
    ],
    rules: {
      "@tanstack/router/create-route-property-order": "error",
      "@tanstack/router/route-param-names": "error",
      "func-style": ["error", "declaration"],
      "import/exports-last": "off",
      "import/no-named-export": "off",
      "import/no-unassigned-import": ["error", { allow: ["**/*.css"] }],
      "import/prefer-default-export": "off",
      "jsx-a11y/anchor-is-valid": ["error", { components: ["Link"], specialLink: ["to"] }],
      "no-unsanitized/method": "error",
      "no-unsanitized/property": "error",
      "no-unused-vars": ["error", { args: "all" }],
      "no-use-before-define": ["error", { functions: false }],
      "one-var": ["error", "never"],
      "react/hooks": "off",
      "react/jsx-filename-extension": ["error", { extensions: [".tsx"] }],
      "react/jsx-no-literals": "off",
      "react/react-in-jsx-scope": "off",
      "sort-imports": "off",
      "typescript/explicit-function-return-type": "off",
      "typescript/explicit-module-boundary-types": "off",
      "vite-plus/prefer-vite-plus-imports": "error",
    },
    settings: {
      "jsx-a11y": { components: { Link: "a" } },
      react: { linkComponents: [{ attribute: "to", name: "Link" }] },
    },
  },
  plugins: lazyPlugins(() => [tanstackStart(), viteReact()]) ?? [],
  resolve: { tsconfigPaths: true },
  staged: {
    "*": "vp check --fix",
  },
});
