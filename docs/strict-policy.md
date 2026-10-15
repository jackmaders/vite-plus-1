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

| Biome check                                                     | Native Oxlint / compiler counterpart                                                                                                       |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `noExplicitAny`                                                 | `typescript/no-explicit-any`                                                                                                               |
| `noImplicitAnyLet`                                              | Compiler `strict` / `noImplicitAny`; no exact ban on evolving-any locals                                                                   |
| `useImportType`, type-only exports                              | `typescript/consistent-type-imports`, `typescript/consistent-type-exports`; compiler `verbatimModuleSyntax`                                |
| `noFloatingPromises`, `noMisusedPromises`                       | `typescript/no-floating-promises`, `typescript/no-misused-promises`                                                                        |
| `noNonNullAssertion`                                            | `typescript/no-non-null-assertion`                                                                                                         |
| `noNonNullAssertedOptionalChain`                                | `typescript/no-non-null-asserted-optional-chain`                                                                                           |
| `noExtraNonNullAssertion`                                       | `typescript/no-extra-non-null-assertion`                                                                                                   |
| `noConfusingNonNullAssertion`                                   | `typescript/no-confusing-non-null-assertion`                                                                                               |
| `noInferrableTypes`                                             | `typescript/no-inferrable-types`                                                                                                           |
| `noBannedTypes`                                                 | `typescript/ban-types`, `typescript/no-wrapper-object-types`                                                                               |
| `noEmptyInterface`                                              | `typescript/no-empty-interface`, `typescript/no-empty-object-type`                                                                         |
| `noNamespace`                                                   | `typescript/no-namespace`                                                                                                                  |
| `noParameterProperties`                                         | `typescript/parameter-properties`                                                                                                          |
| `noEnum`, `useEnumInitializers`                                 | `no-restricted-syntax` is unavailable; enum ban has no exact native counterpart; `typescript/prefer-enum-initializers` covers initializers |
| `noDuplicateEnumValues`                                         | `typescript/no-duplicate-enum-values`                                                                                                      |
| `noUnsafeDeclarationMerging`                                    | `typescript/no-unsafe-declaration-merging`                                                                                                 |
| `useAsConstAssertion`                                           | `typescript/prefer-as-const`                                                                                                               |
| `useArrayType`                                                  | `typescript/array-type`                                                                                                                    |
| `useConsistentBuiltinInstantiation`                             | `typescript/consistent-generic-constructors` plus native constructor rules                                                                 |
| `useConsistentMemberAccessibility`                              | `typescript/explicit-member-accessibility`                                                                                                 |
| `useConsistentTypeDefinitions`                                  | `typescript/consistent-type-definitions`                                                                                                   |
| `useShorthandFunctionType`                                      | `typescript/prefer-function-type`                                                                                                          |
| `useAwait`, `useAwaitThenable`                                  | `typescript/require-await`, `typescript/await-thenable`                                                                                    |
| `useExhaustiveSwitchCases`                                      | `typescript/switch-exhaustiveness-check`                                                                                                   |
| `useOptionalChain`, `useNullishCoalescing`                      | `typescript/prefer-optional-chain`, `typescript/prefer-nullish-coalescing`                                                                 |
| `noUnusedVariables`, `noUnusedFunctionParameters`               | Existing compiler `noUnusedLocals`, `noUnusedParameters`, plus native `no-unused-vars`                                                     |
| `noUnreachable`, `noUnusedLabels`                               | Compiler unreachable/unused-label checks and native `no-unreachable`, `no-unused-labels`                                                   |
| `useExplicitType`, `useExplicitReturnType` (reference disabled) | No annotation mandate; disable `typescript/explicit-function-return-type` and `typescript/explicit-module-boundary-types`                  |

Compiler checks and type-aware unsafe-value rules add coverage beyond Biome's
syntax checks. Some similarly named checks differ on default options and edge cases;
category names are not evidence of one-to-one compatibility.
