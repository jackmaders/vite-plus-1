# Plugin coverage and adoption

Reviewed 2026-10-15 against primary upstream documentation and the reference at
`/home/jackw/dev/personal/template-tanstack-start/biome.json` and `scripts/biome/*.grit`.
These are adoption decisions, not installed integrations: this starter has no React,
TanStack, component-test, or Playwright infrastructure yet.

## Loading plugins

Keep `vite-plus/prefer-vite-plus-imports`. Configure plugins in the existing
`vite.config.ts` lint block. A JavaScript plugin needs both a `jsPlugins` entry and
explicit `rules` entries; native categories do not enable its rules. Translate the
chosen upstream preset into explicit error severities and test it with temporary
positive and negative examples. Do not paste ESLint flat configs into Oxlint.
[Vite+ lint configuration](https://viteplus.dev/guide/lint).

Oxlint's JavaScript API targets ESLint 9+, is still alpha, and does not support
rules requiring TypeScript parser services. Testing Library, Playwright, and React
Hooks have upstream Oxlint conformance tests; TanStack and Boundaries are not on
that documented list. Their compatibility therefore remains unverified for the
locked Vite+ version until installation probes pass.
[Oxlint JavaScript plugin support](https://oxc.rs/docs/guide/usage/linter/js-plugins.html).

## First-party integrations

| Package                          | Maintenance and missing coverage                                                                                                                                                                                                                       | Adoption phase                                                                                                                |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| `eslint-plugin-react-hooks`      | Maintained in React's repository; its recommended rules include compiler diagnostics before compiler adoption. Native hooks checks overlap; compare actual compiler coverage as described below.                                                       | Install with React; enable only rules without equivalent native behavior. Enable native React and accessibility plugins then. |
| `@tanstack/eslint-plugin-query`  | Maintained with TanStack Query. Query-key dependencies, stable clients, unstable dependencies, rest destructuring, void query functions, query/mutation property ordering and query options are library-specific checks absent from native categories. | Install with Query; explicitly configure applicable rules after compatibility probes.                                         |
| `@tanstack/eslint-plugin-router` | Maintained with TanStack Router; its documented rule checks `createRoute` property ordering, which general object sorting cannot replace.                                                                                                              | Install with Router; review narrow exceptions for throwing redirect/not-found values then.                                    |
| `eslint-plugin-testing-library`  | Maintained by Testing Library; release history includes 7.16.2 (2026-03-24). Checks query/event semantics beyond generic promises or Vitest rules.                                                                                                     | Install with component tests; scope to their files and enable native Vitest rules with that infrastructure.                   |

Sources: [React plugin README](https://github.com/react/react/blob/main/packages/eslint-plugin-react-hooks/README.md),
[Query plugin source documentation](https://raw.githubusercontent.com/TanStack/query/main/docs/eslint/eslint-plugin-query.md),
[Router plugin documentation](https://tanstack.com/router/latest/docs/eslint/eslint-plugin-router),
[Testing Library releases](https://github.com/testing-library/eslint-plugin-testing-library/releases).

React's documented recommended checks include `exhaustive-deps`, `rules-of-hooks`,
`component-hook-factories`, `config`, `gating`, `error-boundaries`, `globals`,
`immutability`, `incompatible-library`, `preserve-manual-memoization`, `purity`,
`refs`, `set-state-in-effect`, `set-state-in-render`, `static-components`,
`unsupported-syntax`, and `use-memo`.
[React rule inventory](https://react.dev/reference/eslint-plugin-react-hooks).

The locked Oxlint **1.88.0** schema was inspected locally at
`node_modules/.pnpm/oxlint@1.88.0_*/node_modules/oxlint/configuration_schema.json`.
It registers the following coverage; this is concrete rule availability, not a
claim of identical diagnostics for every input.

| React Hooks recommended rule                                          | Locked native rule            | Decision at React introduction                                                                                                                         |
| --------------------------------------------------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `exhaustive-deps`                                                     | `react/exhaustive-deps`       | Use native; probe custom effect hooks and dependency options.                                                                                          |
| `rules-of-hooks`                                                      | `react/rules-of-hooks`        | Use native; probe conditional hooks and React's `use` exception.                                                                                       |
| `error-boundaries`, `globals`, `immutability`, `incompatible-library` | Same names under `react/`     | Use native experimental compiler analysis; probe representative diagnostics.                                                                           |
| `preserve-manual-memoization`, `purity`, `refs`                       | Same names under `react/`     | Use native experimental compiler analysis.                                                                                                             |
| `set-state-in-effect`, `set-state-in-render`, `static-components`     | Same names under `react/`     | Use native experimental compiler analysis.                                                                                                             |
| `unsupported-syntax`, `use-memo`                                      | Same names under `react/`     | Use native experimental compiler analysis.                                                                                                             |
| `component-hook-factories`                                            | No same-name rule registered  | Enable first-party `react-hooks/component-hook-factories`; probe overlap with native `static-components` and `hooks` before considering a replacement. |
| `config`, `gating`                                                    | No same-name rules registered | Enable first-party `react-hooks/config` and `react-hooks/gating` when their compiler configuration is applicable.                                      |

Oxlint documents its native compiler analysis as experimental. Register the
first-party package with React and explicitly configure the missing rules above;
do not also enable duplicate first-party versions of the 14 checks with native
counterparts. At adoption, verify actual behavior on the locked toolchain and
record any semantic gap. The local `vp lint --rules` command returned no inventory
during this review, so the packaged schema was used instead.
[Native plugin coverage](https://oxc.rs/docs/guide/usage/linter/plugins),
[versioned native rule inventory](https://oxc.rs/docs/guide/usage/linter/rules.html).
