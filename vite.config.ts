import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig, lazyPlugins } from "vite-plus";

// oxlint-disable-next-line import/no-default-export -- Vite configuration requires a default export.
export default defineConfig({
  // TanStack owns the generated route tree formatting; builds verify its contents.
  fmt: { ignorePatterns: ["src/routeTree.gen.ts"] },
  lint: {
    // Enable every native rule category at error severity; exceptions are listed below.
    categories: {
      correctness: "error",
      nursery: "error",
      pedantic: "error",
      perf: "error",
      restriction: "error",
      style: "error",
      suspicious: "error",
    },
    // Application code may use browser APIs; Node globals belong to tooling overrides.
    env: { browser: true, node: false },
    // Generated assertions and naming are framework-owned, not application lint policy.
    ignorePatterns: ["src/routeTree.gen.ts"],
    // Load checks missing from native Oxlint; each JavaScript rule is enabled explicitly below.
    jsPlugins: [
      { name: "vite-plus", specifier: "vite-plus/oxlint-plugin" },
      "eslint-plugin-no-unsanitized",
      "@tanstack/eslint-plugin-router",
    ],
    options: {
      // Fail validation on warnings too, including warnings emitted by JavaScript plugins.
      denyWarnings: true,
      // Reject obsolete ignore comments so exceptions cannot silently accumulate.
      reportUnusedDisableDirectives: "error",
      // Run lint rules that need resolved TypeScript types, such as floating-promise checks.
      typeAware: true,
      // Also run compiler diagnostics; typed linting alone does not check TypeScript correctness.
      typeCheck: true,
    },
    overrides: [
      {
        // Config and script modules run in Node; reject accidental browser-global use here.
        env: { browser: false, node: true },
        files: ["**/*.config.ts", "scripts/**/*.ts"],
      },
      {
        files: ["src/routes/**/*.tsx"],
        rules: {
          // Reject references before declarations, except hoisted functions.
          // Routes register their components above the function bodies, as in the official scaffold.
          "no-use-before-define": ["error", { functions: false }],
          // Normally restrict exports to components for Fast Refresh.
          // TanStack routes require a Route object and private components; allowExportNames still rejects that pattern in Oxlint 1.88.
          "react/only-export-components": "off",
        },
      },
    ],
    // This list replaces native defaults, so retain the default plugins as well as stack additions.
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
      // Order route options so dependent callbacks retain TypeScript inference.
      // This JavaScript plugin rule needs explicit activation; native categories do not enable it.
      "@tanstack/router/create-route-property-order": "error",
      // Reject invalid identifiers in route parameters before they reach generated route types.
      // Explicitly enable this Router-specific JavaScript check at error severity.
      "@tanstack/router/route-param-names": "error",

      // Require function declarations for named functions, matching the reference and scaffold.
      // The default prefers expressions; callbacks passed directly to APIs remain allowed.
      "func-style": ["error", "declaration"],
      // Allow exports beside their declarations instead of forcing an export footer.
      // This preserves the reference convention and keeps each public declaration self-contained.
      "import/exports-last": "off",
      // Allow named exports, which this rule would otherwise prohibit.
      // The router, routes, and shared components use named exports for explicit imports.
      "import/no-named-export": "off",
      // Reject imports used only for side effects, except CSS imports that install styles.
      // Keep the strict import policy without blocking legitimate stylesheet loading.
      "import/no-unassigned-import": ["error", { allow: ["**/*.css"] }],
      // Allow a module with one export to keep that export named.
      // Avoid forcing default exports when a route or component is the only exported declaration.
      "import/prefer-default-export": "off",
      // Check TanStack Link destinations through its to prop, as well as native anchor hrefs.
      // Without these options, valid router links look like anchors missing their destinations.
      "jsx-a11y/anchor-is-valid": ["error", { components: ["Link"], specialLink: ["to"] }],
      // Allow conditional expressions, which this restriction would otherwise ban.
      // The reference permits concise value selection; other checks still reject nested ternaries.
      "no-ternary": "off",
      // Reject unsafe HTML passed to DOM methods such as insertAdjacentHTML.
      // Explicitly enable this JavaScript plugin rule to cover injection sinks beyond React JSX.
      "no-unsanitized/method": "error",
      // Reject unsafe assignments to HTML properties such as innerHTML and outerHTML.
      // Enable this separate sink check explicitly; the method rule does not cover assignments.
      "no-unsanitized/property": "error",
      // Reject unused bindings and every unused parameter, including those before a used one.
      // The default only checks trailing parameters; keep full lint coverage alongside TypeScript.
      "no-unused-vars": ["error", { args: "all" }],
      // Require a separate declaration for each variable instead of grouped declarators.
      // Override the default grouping preference to match the reference and simplify edits.
      "one-var": ["error", "never"],
      // Disable the compiler-based effect dependency check to avoid duplicate diagnostics.
      // The dedicated native react/exhaustive-deps rule remains enabled through categories.
      "react/exhaustive-effect-dependencies": "off",
      // Disable the overlapping compiler-based Hook ordering check.
      // The dedicated native react/rules-of-hooks rule remains enabled; upstream also avoids this overlap.
      "react/hooks": "off",
      // Restrict JSX to .tsx files rather than the default .jsx extension.
      // This is a TypeScript React project, including TanStack file routes.
      "react/jsx-filename-extension": ["error", { extensions: [".tsx"] }],
      // Allow literal JSX text instead of requiring copy to come from expressions.
      // The official welcome page uses static text and this starter has no translation layer.
      "react/jsx-no-literals": "off",
      // Allow JSX without importing the React namespace.
      // The configured automatic react-jsx runtime supplies the JSX implementation.
      "react/react-in-jsx-scope": "off",
      // Disable this rule's alphabetic import ordering.
      // Oxfmt already orders imports; competing ordering policies produce contradictory fixes.
      "sort-imports": "off",
      // Allow TypeScript to infer function return types instead of requiring annotations.
      // Preserve the reference preference and TanStack inference without weakening type checking.
      "typescript/explicit-function-return-type": "off",
      // Allow inferred types at exported function boundaries.
      // Do not require redundant annotations for router factories and React component return types.
      "typescript/explicit-module-boundary-types": "off",
      // Require supported tooling imports to use vite-plus instead of separate Vite/Vitest packages.
      // Keep tooling on the unified version graph; this JavaScript rule needs explicit activation.
      "vite-plus/prefer-vite-plus-imports": "error",
    },
    settings: {
      // Apply anchor accessibility semantics to Link instead of treating it as an opaque component.
      "jsx-a11y": { components: { Link: "a" } },
      // React link checks must recognize to as the destination, including target/rel safety checks.
      react: { linkComponents: [{ attribute: "to", name: "Link" }] },
    },
  },
  plugins: lazyPlugins(() => [tanstackStart(), viteReact()]) ?? [],
  resolve: { tsconfigPaths: true },
  staged: {
    "*": "vp check --fix",
  },
});
