# Plugin coverage and adoption

Reviewed 2026-10-15 against primary upstream documentation and the reference at
`/home/jackw/dev/personal/template-tanstack-start/biome.json` and `scripts/biome/*.grit`.
Framework integrations below are adoption decisions: this starter has no React,
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

## Third-party integrations

| Candidate                                    | Maintenance / compatibility                                                                                                                                                                                                   | Overlap and recommendation                                                                                                                                                                                                                                                                                                             |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `eslint-plugin-playwright`                   | Community maintained, with an active repository and changelog; documented Oxlint conformance coverage. It is not Microsoft's first-party Playwright package.                                                                  | Install when end-to-end tests arrive, scoped to those files. Prioritize missing Playwright awaits, web-first assertions, locator APIs, and timeout bans. Generic promise and test rules overlap, but do not understand all Playwright semantics. Keep Oxfmt responsible for spacing rather than enabling the preset's formatting rule. |
| `eslint-plugin-boundaries`                   | Maintained independently; current documentation is version 7.1.0, with ESLint 9 support since v5. No documented Oxlint conformance guarantee.                                                                                 | Consider when feature directories and aliases arrive. Classification/dependency policies can enforce shared → feature → composition direction and isolation. Probe alias resolution, type imports, re-exports and dynamic imports before adoption.                                                                                     |
| `eslint-plugin-import` `no-restricted-paths` | Maintained import ecosystem; resolved-path zones support `target`, `from`, and exceptions. This rule is absent from the current native rule inventory. Requires a JS alias because `import` is a reserved native plugin name. | Alternative for a small fixed folder graph, only if native `no-restricted-imports` scoped overrides cannot express the requirement. Do not install an entire duplicate import rule set.                                                                                                                                                |

Sources: [Playwright plugin](https://github.com/mskelton/eslint-plugin-playwright),
[Playwright changelog](https://github.com/mskelton/eslint-plugin-playwright/blob/main/CHANGELOG.md),
[Boundaries rules](https://www.jsboundaries.dev/docs/rules/),
[Boundaries installation / compatibility](https://www.jsboundaries.dev/docs/installation/),
[resolved import zones](https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-restricted-paths.md).

## Comparison with the actual Grit checks

| Reference check                    | Native or maintained-plugin replacement                                                                                                                                                                                                                       | Remaining gap / timing                                                                                                                                                           |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `architecture-boundaries.grit`     | Native restricted-import patterns and directory overrides can ban `__mocks__` imports, parent imports, composition imports from shared/features, and the account/posts cross-imports. Boundaries provides scalable resolved classification if later required. | Configure after actual feature layout and `@/` alias exist; probe side-effect imports and alias bypasses. Avoid a custom port before this evaluation.                            |
| `prefer-user-event.grit`           | Testing Library's `prefer-user-event`, combined with its async-event rules.                                                                                                                                                                                   | Enable with component tests; verify the reference's event subset and `userEvent.setup()` convention.                                                                             |
| `no-side-effects-in-wait-for.grit` | Testing Library's `no-wait-for-side-effects` covers interaction/render side effects.                                                                                                                                                                          | Probe all reference mock mutation methods and `vi` reset/spy operations; generic plugin coverage must not be claimed for those extra cases without evidence.                     |
| `no-inline-vitest-mock.grit`       | No native equivalent identified. Locked Oxlint 1.88.0 does **not** register `no-restricted-syntax`; generic native AST selectors are not an available replacement.                                                                                            | A later maintained JS rule or small local rule must inspect factories passed to `vi.mock` / `vi.doMock`, including argument shapes and aliases. Defer to test infrastructure.    |
| `prefer-once-mocks.grit`           | No native equivalent identified; locked Oxlint has no `no-restricted-syntax` selector rule.                                                                                                                                                                   | A later maintained JS rule or small local rule remains a candidate; preserve persistent defaults in `__mocks__` and assess aliases first.                                        |
| `require-test-aaa.grit`            | Generic assertion rules can require expectations but do not enforce this policy.                                                                                                                                                                              | No equivalent identified for ordered Act/Assert comments and assertion-only statements after Assert. A later custom rule remains a candidate after infrastructure/plugin probes. |

[Testing Library's maintained rule inventory](https://github.com/testing-library/eslint-plugin-testing-library)
and [Oxlint plugin compatibility discussion](https://github.com/oxc-project/oxc/discussions/14862)
support the maintained component-test replacements. Playwright linting addresses
end-to-end test behavior; it does not replace these Vitest-specific Grit policies.

## CSS and Tailwind gap

The reference enables CSS lint categories and Tailwind directive parsing, with
narrow exceptions for arbitrary values in `src/components/ui/**` and duplicate
selectors/layered styles in `src/styles.css`. Native Oxlint JavaScript/TypeScript
rules do not recreate CSS semantic checks, Tailwind arbitrary-value restrictions,
or stylesheet layer policy. Oxfmt formatting is not lint coverage. Record these as
unsupported now; evaluate maintained stylesheet/Tailwind tooling when that stack
arrives, preserving those precise exceptions rather than claiming category parity.
The reference's Biome assists (including source sorting) also require a separate
comparison with Oxfmt sorting and compiler/linter behavior.

## Additional installed safety plugins

### Regexp 3.3.1

Registered through `jsPlugins` with explicit settings for every exported rule.
All nondeprecated, nonconflicting rules are errors, including super-linear
backtracking/movement, contradictory assertions, missing flags, captures and
replacement checks. Existing native equivalents remain authoritative for empty
character classes, constructor validity, unnecessary escapes, exec/test preference,
Unicode-mode requirements, and escape style. Each excluded rule is commented next
to its setting. The ES2024 `v` flag is deferred because the compiler target remains
ES2023. Regex-content conventions supplement Oxfmt rather than replacing it.

Sources: [Regexp rule inventory](https://ota-meshi.github.io/eslint-plugin-regexp/rules/)
and [Oxlint JS plugin conformance](https://oxc.rs/docs/guide/usage/linter/js-plugins.html).

Regexp probes rejected nested quantifiers with exponential backtracking and an
impossible anchor; a simple anchored linear expression passed.

### No Unsanitized 4.1.5

Both `no-unsanitized/property` and `no-unsanitized/method` are errors. The starter
renders a static HTML template and assigns imported asset URLs with image `src`
properties. No sanitizer exemption is needed. These are DOM-sink checks, not a
general taint analysis or a validator for every URL protocol.

Temporary probes rejected `location.hash` assigned to `innerHTML` and passed to
`insertAdjacentHTML`; `textContent` and literal HTML passed. Both plugin rules run
under the locked Oxlint. Mozilla is not on Oxlint's published conformance list, so
these local probes establish the compatibility used here.

Source: [Mozilla's plugin and rules](https://github.com/mozilla/eslint-plugin-no-unsanitized).

### SonarJS 4.2.2

All 295 exported rules have explicit decisions across three type-checked modules:

- `lint/sonar-rules.ts`: 102 enabled error-level checks, including cognitive and
  expression complexity, duplicate functions/branches, collection mistakes,
  suspicious returns, cryptographic and server-security patterns, and hardcoded
  secrets.
- `lint/sonar-unavailable.ts`: 82 deprecated or TypeScript-service-dependent rules.
  JavaScript plugin type services are unsupported by Oxlint; native TypeScript
  checks and Regexp cover many, but not every, excluded diagnostic.
- `lint/sonar-exceptions.ts`: 111 individually commented exclusions for native or
  Regexp counterparts, formatting conflicts, missing framework/test infrastructure,
  and policies requiring a project-specific pattern or license-header template.

No plugin preset or native category implicitly supplies these rules. Versions are
pinned so upgrades require an explicit rule-inventory review. Comparisons use the
installed package metadata, including `docs.requiresTypeChecking` and `deprecated`.
Some native overlaps are partial; additional Sonar checks remain enabled in those
cases rather than assuming identical behavior.

The requested broader safety policy enables Sonar's secret/password/signature and
wallet-phrase checks even though the original Biome policy disabled `noSecrets`.
These heuristics may need narrowly scoped exceptions for legitimate fixtures when
tests arrive. No such exception is currently needed.

Observed downsides and resolutions:

- `sonarjs/no-reference-error` falsely reported the built-in `Error` constructor.
  The native `no-undef` rule remains authoritative; the duplicate JS rule is off.
- Sonar's layout rules compete with Oxfmt and are explicitly off. Native object
  spread prohibitions also conflict with `prefer-object-spread`; only
  `vite.config.ts` permits spread for composing the explicit rule tables.
- This small project's lint/type pass increased from about 0.7 seconds with Regexp
  to about 1.4 seconds with Sonar on the same machine. This is an informal local
  observation, not a benchmark guarantee.
- Type-service rules cannot be made effective merely by enabling
  `lint.options.typeAware`: that option powers native analysis, not JS parser services.

Temporary probes rejected a hardcoded IP, a password-like literal, and reading an
empty collection with `join`; a nonempty collection and a normal typed function
passed. The empty-collection rule does not cover every newer API (an `at` probe did
not trigger it). Native and compiler checks remain enabled alongside these rules.

Sources: [Sonar's maintained plugin documentation](https://github.com/SonarSource/SonarJS/blob/master/packages/analysis/src/jsts/rules/README.md),
[rule implementations](https://github.com/SonarSource/SonarJS/tree/master/packages/analysis/src/jsts/rules),
and [Oxlint API limits and conformance](https://oxc.rs/docs/guide/usage/linter/js-plugins.html).
