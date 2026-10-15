# Lint policy

All seven native Oxlint categories remain enabled at error severity, with
warnings and unused suppressions failing validation. Type-aware lint and type
checking remain enabled. Explicit exceptions in `vite.config.ts` take precedence.

Existing policy permits named exports, adjacent exports, CSS side-effect
imports, inferred signatures, mutable parameter types, formatter-owned import
ordering and separate variable declarations. React permits JSX literals, the
automatic JSX runtime and `.tsx` filenames. The deprecated `react/hooks` rule
is disabled. Route modules may export their required `Route` object alongside
components. Link accessibility settings recognize TanStack's `to` property.
TanStack Router's two JS rules and both No Unsanitized sink rules remain errors.
Node built-ins are permitted only in configuration, whose required default
export is also allowed. Application code retains the Node import restriction.

## Unit/component rules

Native Oxlint Vitest rules are enabled through all categories only for
`src/**/__tests__/**/*.spec.{ts,tsx}`. They do not apply to future Playwright
suites. The filename rule explicitly accepts the reference's `.spec` convention.
The following scoped exceptions have concrete reasons:

| Rule                                     | Reason                                                                                                                                                                                                   |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `oxc/no-async-await`                     | Tests and test infrastructure await router loads and user interactions.                                                                                                                                  |
| `vitest/no-importing-vitest-globals`     | Tests explicitly import APIs through the required `vite-plus/test` module; globals are disabled.                                                                                                         |
| `vitest/prefer-importing-vitest-globals` | Oxlint 1.88.0 recognizes canonical Vitest imports, but reports the required Vite+ imports as globals. `no-undef` and type checking still require declarations; Vite+'s import rule enforces the package. |
| `vitest/prefer-expect-assertions`        | Awaited assertions reject normally; unconditional assertion counts add no protection for these tests. Reconsider for callback-only assertions.                                                           |
| `vitest/require-test-timeout`            | Vitest's default timeout already bounds every test; repeated timeout literals obscure behavioral tests.                                                                                                  |
| `import/no-namespace` (setup only)       | `expect.extend` registers the complete jest-dom matcher namespace once.                                                                                                                                  |

## Testing Library JavaScript plugin

`eslint-plugin-testing-library` 7.16.2 runs through Oxlint 1.88.0 JavaScript
plugin support. All 29 rules are explicitly set to error except
`prefer-implicit-assert`, which conflicts with `prefer-explicit-assert`.
Explicit assertions state the intended visibility/presence behavior. There are
no unsupported rules observed with this installed toolchain. Native Vitest
rules own test structure, assertions and async expectations; the JS plugin owns
Testing Library queries, render usage and user-event conventions. No additional
Vitest ESLint plugin is installed, avoiding duplicate Vitest diagnostics.

Compatibility was checked by loading the full rule inventory in `vp check`
and rejecting a temporary `.only` test (native `vitest/no-focused-tests`) and
`.parentElement` access (`testing-library/no-node-access`). These probes were
removed. Re-evaluate compatibility when upgrading either tool; plugin loading
alone does not prove every future syntax path is supported.

Remaining gaps include browser behavior, CSS semantics, deployed SSR behavior,
and reference-specific Grit policies such as arrange/act/assert comments and
architecture boundaries. Tests cover visible application behavior; lint does
not establish correctness or coverage. This change does not restore historical
plugins that are absent from the current main configuration.
