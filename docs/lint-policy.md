# Lint policy

Reviewed 2026-10-15 against Vite+ 1.2.0, Oxlint 1.88.0, React Hooks 7.1.1, and
TanStack Router ESLint plugin 1.162.0. All configuration lives in `vite.config.ts`.
Every applicable native rule remains enabled at **error** through all seven
categories, including nursery. Warnings and unused suppressions fail validation.
JavaScript plugin rules require explicit entries: categories do not enable them.

## Baseline from PR #2

The merged policy enables TypeScript, Unicorn, Oxc, Import, Promise, JSDoc, and
Node plugins, strict type-aware/type-check validation, both No Unsanitized sink
rules, and Vite+'s import rule. Compiler strictness includes exact optional
properties, checked indexed access, checked side-effect imports, unused-code
checks, and unreachable-code checks. Inferred types/return types and named exports
remain preferred. No compiler strictness flag was relaxed for React.

PR #2's description also mentions Regexp/SonarJS and policy documents, but those
files and dependencies are absent from its merged commit `6ccdefc`. This document
records the actual checked-in baseline plus this migration. Its earlier plugin
review was recovered from the local review artifact and checked against current
first-party docs and the installed packages.

## React and accessibility coverage

Native `react`, `react-perf`, and `jsx-a11y` plugins are now enabled across every
category. Coverage includes JSX correctness, React state/lifecycle restrictions,
Hooks ordering/dependencies, compiler diagnostics, unstable render allocations,
and accessibility semantics. The inventory was checked in Oxlint's installed
`configuration_schema.json`; `vp lint --rules` currently emits no inventory.

| React Hooks 7.1.1 checks                                                                                                  | Implementation                                                                                                                                                     |
| ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `rules-of-hooks`, `exhaustive-deps`                                                                                       | Dedicated native rules (diagnostics display `react-hooks`; config accepts `react/`)                                                                                |
| `capitalized-calls`, `static-components`, `use-memo`, `void-use-memo`, `preserve-manual-memoization`, `memo-dependencies` | Native `react/` rules                                                                                                                                              |
| `incompatible-library`, `immutability`, `globals`, `refs`, `set-state-in-effect`, `no-deriving-state-in-effects`          | Native `react/` rules                                                                                                                                              |
| `error-boundaries`, `purity`, `set-state-in-render`, `syntax`, `unsupported-syntax`, `rule-suppression`                   | Native `react/` rules                                                                                                                                              |
| `invariant`, `todo`                                                                                                       | Native compiler diagnostics; categories retain error severity                                                                                                      |
| `hooks`, `exhaustive-effect-dependencies`                                                                                 | Native compiler variants disabled because probes produce duplicate ordering/dependency diagnostics; dedicated native Hooks rules stay enabled                      |
| `config`, `gating`                                                                                                        | Explicit error-level JavaScript rules under alias `react-hooks-js`; no native equivalent                                                                           |
| `memoized-effect-dependencies`                                                                                            | Deferred: installed 7.1.1 registers this rule but has no producer for its diagnostic category; a changing-dependency probe instead triggers native exhaustive-deps |
| `fbt`                                                                                                                     | Deferred: no FBT internationalization library in this app                                                                                                          |
| `component-hook-factories`                                                                                                | Not enabled: React 7.1.1 marks it deprecated/removed since 7.1.0; native static-components retains nested-component checks                                         |

The first-party [React Hooks plugin](https://react.dev/reference/eslint-plugin-react-hooks)
surfaces compiler checks without requiring compilation. This app does not enable
React Compiler transforms. Existing native equivalents stay responsible for their
checks rather than loading duplicate JS versions. Native compiler analysis is
experimental; matching names are not proof of identical behavior on every input.

TanStack `Link` is mapped to `a` for JSX accessibility. `anchor-is-valid` explicitly
recognizes `to` via `specialLink`; React link settings also identify `to` using the
installed version's typed `attribute` field. Empty and unsafe-target Link probes
fail, while the actual links pass. Do not substitute fake `href` props or disable
anchor checks for the router.

## First-party TanStack plugins and compatibility

Both installed Router rules are explicitly errors:

- `@tanstack/router/create-route-property-order`: preserves inference-sensitive
  route option ordering. Its upstream warning severity is promoted to error.
- `@tanstack/router/route-param-names`: rejects invalid parameter identifiers,
  including parameters in file-route path declarations.

The [Router plugin docs](https://tanstack.com/router/latest/docs/eslint/eslint-plugin-router)
currently describe property ordering; the installed source adds parameter names.
Both rules pass positive application checks and fail negative probes under the
locked Oxlint version, without TypeScript parser services.

The current [Start plugin](https://tanstack.com/start/latest/docs/eslint/eslint-plugin-start)
0.1.0 provides `no-async-client-component` and
`no-client-code-in-server-component`. Both call `getParserServices` and throw
under Oxlint 1.88.0. It was installed, tested, then removed because neither rule
can run. Do not claim server/client-boundary lint coverage from native categories.
Revisit when Oxlint supports those services or Start adds compatible checks.
Start's own build-time import protection still runs.

[Oxlint's JS plugin API](https://oxc.rs/docs/guide/usage/linter/js-plugins.html)
is alpha and targets ESLint 9+. React Hooks has upstream conformance coverage;
Router was verified locally. Compiler gating reports a correctly located error
for an invalid dynamic gating directive. An invalid compiler `target` is rejected,
but its locationless `config` diagnostic displays as an empty warning in this
Oxlint version; `denyWarnings` still makes the check fail. This is an upstream
reporting limitation, not reliable human-readable configuration feedback.

## Exceptions and scoped options

| Scope                                 | Rule / option                                                                               | Reason                                                                                                                                                                              |
| ------------------------------------- | ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| All source (preserved)                | `import/exports-last`, `import/no-named-export`, `import/prefer-default-export` off         | Reference uses named exports alongside declarations                                                                                                                                 |
| All source (preserved)                | `typescript/explicit-function-return-type`, `typescript/explicit-module-boundary-types` off | Preserve inference                                                                                                                                                                  |
| All source (preserved)                | `no-ternary` off; `one-var: never`; `func-style: declaration`                               | Preserve reference expression/declaration conventions                                                                                                                               |
| All source (preserved)                | `sort-imports` off                                                                          | Oxfmt owns import ordering                                                                                                                                                          |
| All source (preserved)                | `import/no-unassigned-import` permits CSS                                                   | Stylesheets have intentional side effects                                                                                                                                           |
| `**/*.config.ts` (preserved)          | `import/no-default-export` off                                                              | Tool configuration requires a default export                                                                                                                                        |
| Config and script modules (preserved) | Node environment; browser globals off                                                       | Tooling runs in Node                                                                                                                                                                |
| All React                             | `react/react-in-jsx-scope` off                                                              | Automatic `react-jsx` runtime needs no React namespace import                                                                                                                       |
| All React                             | `react/jsx-no-literals` off                                                                 | Static starter copy; no translation layer exists                                                                                                                                    |
| All React                             | `react/jsx-filename-extension` allows `.tsx`                                                | TypeScript JSX convention                                                                                                                                                           |
| All React                             | `react/hooks`, `react/exhaustive-effect-dependencies` off                                   | Duplicate dedicated Hooks diagnostics, demonstrated by probes                                                                                                                       |
| `src/routes/**/*.tsx`                 | `react/only-export-components` off                                                          | Routes export the required `Route` object and keep their components private; `allowExportNames: ["Route"]` still reports private components in Oxlint 1.88. Start handles route HMR |
| `src/routes/**/*.tsx`                 | `no-use-before-define` allows function declarations                                         | Hoisted route component declarations below route configuration match the reference; variable/class checks remain                                                                    |
| `src/routes/__root.tsx`               | `react/jsx-max-depth: 4`                                                                    | Document shell contains html/body/header/nav/link                                                                                                                                   |
| `src/routes/__root.tsx`               | `react/no-multi-comp` ignores stateless components                                          | Colocate framework shell and not-found fallback                                                                                                                                     |
| `RootDocument` declaration only       | `typescript/prefer-readonly-parameter-types` suppression                                    | Props are readonly, but ReactNode includes framework-owned mutable element/iterable types                                                                                           |
| `src/routeTree.gen.ts` only           | Excluded from lint and formatting                                                           | TanStack owns generated naming, assertions, exports, and formatting; build verifies committed output, TypeScript consumes the tree                                                  |

The old counter-only mutable DOM parameter exception was removed with the counter.
No global filename relaxation was needed for `__root.tsx` or future `$param` route
filenames. Keep framework-specific exceptions in the route directory.

## Deferred recommendations from PR #2

| Candidate                                    | Decision for this stack                                                                                                                                                                   |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TanStack Query / Form plugins                | Defer until those libraries are used; neither is installed                                                                                                                                |
| Testing Library / native Vitest rules        | Defer until component or unit tests exist                                                                                                                                                 |
| Playwright plugin                            | Defer until browser-test infrastructure exists; temporary external validation adds no project dependency                                                                                  |
| Boundaries / Import JS `no-restricted-paths` | No features or cross-feature dependency graph to enforce yet. Native imports and the source alias suffice; evaluate resolved boundaries when real modules appear                          |
| Regexp                                       | No application regular expressions; defer additional JS engine cost until regex code needs that coverage                                                                                  |
| SonarJS                                      | No application logic beyond document/routes; native rules cover the present code. Revisit missing heuristic/security coverage with substantive logic and explicit per-rule overlap review |
| CSS / Tailwind tooling                       | Plain CSS only; Oxfmt formats it but does not provide semantic CSS linting. No Tailwind integration                                                                                       |
| Custom Grit ports                            | Mock factories, once-mocks, AAA, waitFor side effects, and user-event policies require test infrastructure. Architecture policies require actual feature modules                          |

## Verification

Temporary probes reject conditional Hooks, missing dependencies, impure rendering,
empty/unsafe TanStack links, inline JSX object allocations, incorrect route option
order, and invalid route parameter names. First-party compiler gating was checked
with a temporary rule option and invalid directive; invalid compiler target
configuration blocks validation with the reporting caveat above. All probes were
removed. `vp check` verifies positive application/configuration examples without
warnings or stale suppressions. Both production pages were checked in Chromium
for SSR, hydration, client navigation, browser Back, and browser errors without
adding browser-test infrastructure.
