# Strict policy migration

Reference: `~/dev/personal/template-tanstack-start/biome.json`, `tsconfig.json`,
and `scripts/biome/*.grit`, read on 2026-10-15. This is a staged migration of the
policy, not a claim that Oxlint categories reproduce every Biome rule.

## 1. Compiler and TypeScript rules

`vp check` remains the entry point with `typeAware: true` and `typeCheck: true`.
The compiler now copies `strict`, `exactOptionalPropertyTypes`,
`noUncheckedIndexedAccess`, `noImplicitOverride`,
`noPropertyAccessFromIndexSignature`, `noUncheckedSideEffectImports`,
`allowUnreachableCode: false`, and `allowUnusedLabels: false`. Existing unused-code,
fallthrough, erasable syntax, bundler resolution, module and emit settings remain.
Root configuration files and TypeScript scripts join `src` in type checking.
React, test globals, and Cloudflare types await their corresponding infrastructure.

The reference enables whole Biome categories, so these mappings describe relevant
checks from those categories. They are semantic counterparts, not identical presets.
Native TypeScript rules are selected explicitly in step 1; step 2 enables all
categories from the selected native plugins, including the counterparts below.

| Biome check                                                     | Native Oxlint / compiler counterpart                                                                                                 |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `noExplicitAny`                                                 | `typescript/no-explicit-any`                                                                                                         |
| `noImplicitAnyLet`                                              | Compiler `strict` / `noImplicitAny`; no exact ban on evolving-any locals                                                             |
| `useImportType`, type-only exports                              | `typescript/consistent-type-imports`, `typescript/consistent-type-exports`; compiler `verbatimModuleSyntax`                          |
| `noFloatingPromises`, `noMisusedPromises`                       | `typescript/no-floating-promises`, `typescript/no-misused-promises`                                                                  |
| `noNonNullAssertion`                                            | `typescript/no-non-null-assertion`                                                                                                   |
| `noNonNullAssertedOptionalChain`                                | `typescript/no-non-null-asserted-optional-chain`                                                                                     |
| `noExtraNonNullAssertion`                                       | `typescript/no-extra-non-null-assertion`                                                                                             |
| `noConfusingNonNullAssertion`                                   | `typescript/no-confusing-non-null-assertion`                                                                                         |
| `noInferrableTypes`                                             | `typescript/no-inferrable-types`                                                                                                     |
| `noBannedTypes`                                                 | `typescript/ban-types`, `typescript/no-wrapper-object-types`                                                                         |
| `noEmptyInterface`                                              | `typescript/no-empty-interface`, `typescript/no-empty-object-type`                                                                   |
| `noNamespace`                                                   | `typescript/no-namespace`                                                                                                            |
| `noParameterProperties`                                         | `typescript/parameter-properties`                                                                                                    |
| `noEnum`, `useEnumInitializers`                                 | Compiler `erasableSyntaxOnly` rejects enums here; no native enum-ban rule; `typescript/prefer-enum-initializers` covers initializers |
| `noDuplicateEnumValues`                                         | `typescript/no-duplicate-enum-values`                                                                                                |
| `noUnsafeDeclarationMerging`                                    | `typescript/no-unsafe-declaration-merging`                                                                                           |
| `useAsConstAssertion`                                           | `typescript/prefer-as-const`                                                                                                         |
| `useArrayType`                                                  | `typescript/array-type`                                                                                                              |
| `useConsistentBuiltinInstantiation`                             | `typescript/consistent-generic-constructors` plus native constructor rules                                                           |
| `useConsistentMemberAccessibility`                              | `typescript/explicit-member-accessibility`                                                                                           |
| `useConsistentTypeDefinitions`                                  | `typescript/consistent-type-definitions`                                                                                             |
| `useShorthandFunctionType`                                      | `typescript/prefer-function-type`                                                                                                    |
| `useAwait`, `useAwaitThenable`                                  | `typescript/require-await`, `typescript/await-thenable`                                                                              |
| `useExhaustiveSwitchCases`                                      | `typescript/switch-exhaustiveness-check`                                                                                             |
| `useOptionalChain`, `useNullishCoalescing`                      | `typescript/prefer-optional-chain`, `typescript/prefer-nullish-coalescing`                                                           |
| `noUnusedVariables`, `noUnusedFunctionParameters`               | Existing compiler `noUnusedLocals`, `noUnusedParameters`, plus native `no-unused-vars`                                               |
| `noUnreachable`, `noUnusedLabels`                               | Compiler unreachable/unused-label checks and native `no-unreachable`, `no-unused-labels`                                             |
| `useExplicitType`, `useExplicitReturnType` (reference disabled) | No annotation mandate; disable `typescript/explicit-function-return-type` and `typescript/explicit-module-boundary-types`            |

Compiler checks and type-aware unsafe-value rules add coverage beyond Biome's
syntax checks. Some similarly named checks differ on default options and edge cases;
category names are not evidence of one-to-one compatibility.

## 2. Native rule baseline and exceptions

All seven categories (`correctness`, `suspicious`, `pedantic`, `perf`, `style`,
`restriction`, `nursery`) are errors. `all` alone would omit nursery. Plugins are
explicitly TypeScript, Unicorn, Oxc, imports, promises, JSDoc, and Node, alongside
the existing Vite+ JavaScript import plugin. Categories apply to selected native
plugins only. React, accessibility, and Vitest await those technologies.

Browser globals apply to application code; configuration and TypeScript scripts
use Node globals instead. Node/import restrictions remain enabled; add any
necessary Node-module or process-environment exceptions narrowly when such code
exists. Environment globals do not add React, Cloudflare, or Node ambient types to
the compiler. `denyWarnings: true` rejects warnings and
`reportUnusedDisableDirectives: "error"` rejects obsolete suppressions.

Every disabled rule has a nearby configuration comment. The native exception list (additional JS plugin decisions are linked below):

| Setting                                           | Scope            | Reason                                                                                           |
| ------------------------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------ |
| `import/no-named-export: off`                     | Global           | Contradicts reference named exports                                                              |
| `import/prefer-default-export: off`               | Global           | Contradicts named exports for single-export modules                                              |
| `import/exports-last: off`                        | Global           | Reference explicitly permits exports alongside declarations                                      |
| `typescript/explicit-function-return-type: off`   | Global           | Reference disables mandatory return types                                                        |
| `typescript/explicit-module-boundary-types: off`  | Global           | Preserve inferred exported return types                                                          |
| `no-ternary: off`                                 | Global           | Reference explicitly permits ternaries                                                           |
| `oxc/no-rest-spread-properties: off`              | `vite.config.ts` | Declarative rule tables use spread; `Object.assign` conflicts with native `prefer-object-spread` |
| `sort-imports: off`                               | Global           | Oxfmt owns sorting; ESLint alphabetic declaration ordering conflicts                             |
| `import/no-default-export: off`                   | `**/*.config.ts` | Framework config default export, matching reference                                              |
| `typescript/prefer-readonly-parameter-types: off` | `src/counter.ts` | HTML button is a mutable DOM object; counter updates its text                                    |

Configured restrictions (not disabled rules): `func-style` requires declarations;
arrow callbacks remain valid. `one-var: never` keeps declarations separate across
DOM rendering and initialization. `import/no-unassigned-import` permits only CSS
patterns, keeping JavaScript side-effect imports restricted. `sort-keys` and other
nonconflicting style restrictions remain active; configuration keys were sorted.
The counter uses named numeric constants and `textContent`; required DOM elements
are checked before use instead of using non-null assertions.

Reference conventions not yet applicable (React Native/Solid exclusions, JSX
literals/binds/props, generated route files, mock naming, component-library CSS,
and test-only magic numbers) are not speculative global exceptions here. Introduce
scoped settings when those files and technologies arrive.

## Unsupported or deferred policy

Oxlint's categories are not Biome's category inventory. JSX accessibility and React
checks are deferred to React adoption. CSS syntax/semantic rules, Tailwind directive
validation, arbitrary-value restrictions, duplicate-selector and layering checks
are unsupported by this native JS/TS lint setup. Oxfmt formats styles but does not
replace those checks. Biome assists are not lint rules; Oxfmt handles formatting
and import ordering, but does not promise every Biome assist transformation.

No exact native equivalent is established here for every Biome naming convention,
all secret detection heuristics. The reference disables `noSecrets`; the subsequently
requested Sonar safety extension enables its available secret checks. The existing
compiler `erasableSyntaxOnly` rejects TypeScript enums and parameter properties. The original six Grit checks are reviewed separately, with no custom
ports introduced. Framework and architecture checks require the corresponding
application/test layout before meaningful configuration.

## Verification

Validated with local Vite+ 1.2.0, Oxlint 1.88.0, oxlint-tsgolint 7.0.2004,
Oxfmt 0.73.0 and Vitest 5.0.4. Run `vp check` and `vp run build` (the build script
runs `tsc` then the production Vite build). `vp test --passWithNoTests` verifies the
runner; no test infrastructure exists yet. Existing required PR checks are unchanged.

Temporary files were created, linted using `vp lint`, then removed. Negative probes
confirmed rejection of source default exports, explicit `any`, non-null assertions,
JavaScript side-effect imports, unused suppression directives, arrow function
variables, floating promises, browser globals in config files, explicit undefined
for optional properties, and unchecked indexed access. A warning-level debugger
probe still failed through `denyWarnings`. Positive probes confirmed a named
function with inferred return type, CSS side-effect imports, and a named configuration
value exported as default. Anonymous default object exports remain restricted.

Plugin maintenance, compatibility, original Grit coverage, and adoption phases are
recorded in [the plugin review](./lint-plugin-review.md).

The installed Regexp, No Unsanitized, and SonarJS rules and all individual JS
exceptions are documented in [the plugin review](./lint-plugin-review.md) and the
commented explicit rule tables under `lint/`. These augment the original migration.
