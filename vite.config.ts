import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig, lazyPlugins } from "vite-plus";

export default defineConfig({
  fmt: { ignorePatterns: ["src/routeTree.gen.ts"] },
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
    ignorePatterns: ["src/routeTree.gen.ts"],
    jsPlugins: [
      { name: "vite-plus", specifier: "vite-plus/oxlint-plugin" },
      "eslint-plugin-no-unsanitized",
      { name: "react-hooks-js", specifier: "eslint-plugin-react-hooks" },
      "@tanstack/eslint-plugin-router",
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
        files: ["src/routes/**/*.tsx"],
        rules: {
          // File routes must export the route object for TanStack tooling and HMR.
          // Route components are hoisted declarations, matching the reference layout.
          "no-use-before-define": ["error", { functions: false }],
          "react/only-export-components": "off",
        },
      },
      {
        files: ["src/routes/__root.tsx"],
        rules: {
          // The document shell owns html/body/navigation and needs four JSX levels.
          "react/jsx-max-depth": ["error", { max: 4 }],
          // React owns the nested ReactNode types; component props remain readonly.
          "typescript/prefer-readonly-parameter-types": [
            "error",
            { allow: [{ from: "package", name: "ReactNode", package: "react" }] },
          ],
          // HTML charset metadata requires the hyphenated UTF-8 label.
          "unicorn/text-encoding-identifier-case": ["error", { withDash: true }],
        },
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
      // The reference permits exports next to declarations instead of requiring a footer.
      "import/exports-last": "off",
      // Named exports are the reference convention; these rules require the opposite.
      "import/no-named-export": "off",
      // CSS imports install styles; other unassigned imports remain prohibited.
      "import/no-unassigned-import": ["error", { allow: ["**/*.css"] }],
      // A single named export remains named, matching the reference.
      "import/prefer-default-export": "off",
      "jsx-a11y/anchor-is-valid": ["error", { components: ["Link"], specialLink: ["to"] }],
      // Match the reference's deliberate allowance for conditional expressions.
      "no-ternary": "off",
      "no-unsanitized/method": "error",
      "no-unsanitized/property": "error",
      // Separate declarations preserve initialization order across DOM rendering.
      "one-var": ["error", "never"],
      // These compiler checks have no native equivalent in Oxlint 1.88.0.
      "react-hooks-js/config": "error",
      "react-hooks-js/gating": "error",
      // Compiler checks duplicate the dedicated native Hooks diagnostics.
      "react/exhaustive-effect-dependencies": "off",
      "react/hooks": "off",
      "react/jsx-filename-extension": ["error", { extensions: [".tsx"] }],
      // This starter has no translation layer; readable static page copy is intentional.
      "react/jsx-no-literals": "off",
      // React 19 uses the automatic JSX runtime.
      "react/react-in-jsx-scope": "off",
      // Oxfmt owns import ordering; competing alphabetic ordering disagrees with it.
      "sort-imports": "off",
      // Match the reference's preference for inferred types and return types.
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
