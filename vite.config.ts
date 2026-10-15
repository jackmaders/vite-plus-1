import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import process from "node:process";
import { defineConfig, lazyPlugins } from "vite-plus";

const GENERATED_FILES = ["src/routeTree.gen.ts"];

// Colocate unit/component specs with features; keep future e2e suites outside this scope.
const TEST_FILES = ["src/**/__tests__/**/*.spec.{ts,tsx}"];

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
      // Testing Library 7.16.2 runs through Oxlint 1.88.0 JS support; no unsupported rules observed.
      // Native Vitest owns test structure; this plugin owns queries, rendering and interactions.
      { name: "testing-library", specifier: "eslint-plugin-testing-library" },
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
      // Router loading and user interactions must be awaited in tests and their wrappers.
      { files: [...TEST_FILES, "src/testing/**"], rules: { "oxc/no-async-await": "off" } },
      // Register the entire jest-dom matcher namespace once in runner setup.
      { files: ["tests/vitest/setup.ts"], rules: { "import/no-namespace": "off" } },
      {
        files: TEST_FILES,
        // Existing error-level categories enable native Vitest rules only for unit/component specs.
        plugins: ["vitest"],
        rules: {
          // Explicitly inventory all 29 plugin rules; all apply at error except the conflict below.
          // Loading and negative probes verified focused-test and DOM-node-access diagnostics.
          // Lint cannot validate browser/CSS/SSR behavior or reference-specific Grit conventions.
          "testing-library/await-async-events": "error",
          "testing-library/await-async-queries": "error",
          "testing-library/await-async-utils": "error",
          "testing-library/consistent-data-testid": "error",
          "testing-library/no-await-sync-events": "error",
          "testing-library/no-await-sync-queries": "error",
          "testing-library/no-container": "error",
          "testing-library/no-debugging-utils": "error",
          "testing-library/no-dom-import": "error",
          "testing-library/no-global-regexp-flag-in-query": "error",
          "testing-library/no-manual-cleanup": "error",
          "testing-library/no-node-access": "error",
          "testing-library/no-promise-in-fire-event": "error",
          "testing-library/no-render-in-lifecycle": "error",
          "testing-library/no-test-id-queries": "error",
          "testing-library/no-unnecessary-act": "error",
          "testing-library/no-wait-for-multiple-assertions": "error",
          "testing-library/no-wait-for-side-effects": "error",
          "testing-library/no-wait-for-snapshot": "error",
          "testing-library/prefer-explicit-assert": "error",
          "testing-library/prefer-find-by": "error",
          // Conflicts with prefer-explicit-assert; assert the intended visible/present behavior.
          "testing-library/prefer-implicit-assert": "off",
          "testing-library/prefer-presence-queries": "error",
          "testing-library/prefer-query-by-disappearance": "error",
          "testing-library/prefer-query-matchers": "error",
          "testing-library/prefer-screen-queries": "error",
          "testing-library/prefer-user-event": "error",
          "testing-library/prefer-user-event-setup": "error",
          "testing-library/render-result-naming-convention": "error",
          // Match the reference project’s colocated .spec convention.
          "vitest/consistent-test-filename": ["error", { pattern: ".*\\.spec\\.[tj]sx?$" }],
          // APIs must be explicitly imported from vite-plus/test; Vitest globals stay disabled.
          "vitest/no-importing-vitest-globals": "off",
          // Awaited assertions already reject; counts add no protection for these unconditional tests.
          "vitest/prefer-expect-assertions": "off",
          // Oxlint recognizes canonical Vitest imports but misidentifies vite-plus/test imports.
          // No-undef/type checking require declarations; Vite+ enforces the import package.
          "vitest/prefer-importing-vitest-globals": "off",
          // Vitest’s default timeout bounds every test without repeated per-test literals.
          "vitest/require-test-timeout": "off",
        },
      },
      {
        env: { browser: false, node: true },
        files: ["**/*.config.ts"],
      },
      {
        files: ["**/*.config.ts"],
        rules: {
          "import/no-default-export": "off",
          // Vite configuration reads node:process to distinguish unit runs from app builds.
          "import/no-nodejs-modules": "off",
        },
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
      "typescript/prefer-readonly-parameter-types": "off",
      "vite-plus/prefer-vite-plus-imports": "error",
    },
    settings: {
      "jsx-a11y": { components: { Link: "a" } },
      react: { linkComponents: [{ attribute: "to", name: "Link" }] },
    },
  },
  plugins:
    lazyPlugins(() => {
      // Keep React transforms in tests, but avoid Start’s build/SSR transforms and generated state.
      if (process.env["VITEST"] === "true") {
        return [viteReact()];
      }
      // Colocated specs are test modules, so exclude them from file-based route generation.
      return [tanstackStart({ router: { routeFileIgnorePattern: "__tests__" } }), viteReact()];
    }) ?? [],
  resolve: { tsconfigPaths: true },
  // Keep vp test / vp test watch as normal interfaces; coverage runs once and never replays a cache.
  run: { tasks: { "test:coverage": { cache: false, command: "vp test run --coverage" } } },
  staged: {
    "*": "vp check --fix",
  },
  test: {
    coverage: {
      // Exclude only generated code, types, specs and test utilities; routes/components stay covered.
      // Router/root entries are authored and covered; client/server defaults come from dependencies.
      exclude: [...GENERATED_FILES, "**/*.d.ts", "**/__tests__/**", "src/testing/**"],
      // Explicit inclusion measures unimported application files, so new untested modules fail.
      include: ["src/**/*.{ts,tsx,js,jsx}"],
      // @vitest/coverage-v8 is pinned to bundled Vitest 5.0.4; align on upgrades via vp toolchain.
      provider: "v8",
      // Console feedback plus browsable HTML, LCOV integrations and machine-readable totals for CI.
      reporter: ["text", "html", "lcov", "json-summary"],
      // Future changes must preserve every metric; an unimported branch probe verified exit 1.
      thresholds: { branches: 100, functions: 100, lines: 100, statements: 100 },
    },
    // DOM component testing without adding a browser/e2e runner.
    environment: "happy-dom",
    include: TEST_FILES,
    // Restore spies between tests to prevent mutable mock state leaking across cases.
    restoreMocks: true,
    // Runner-wide matchers and explicit cleanup run before each file; reserve tests/ for future e2e.
    setupFiles: ["./tests/vitest/setup.ts"],
  },
});
