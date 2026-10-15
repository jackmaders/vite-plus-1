# Unit and component tests

Use `vp test` for the normal run and `vp test watch` during development. Run
`vp run test:coverage` for a single run with enforced coverage. The Vite Task
has caching disabled so every invocation executes tests. Reports are written to
`coverage/` (HTML, LCOV and JSON summary), ignored by Git, and uploaded by CI.

Import test APIs from `vite-plus/test`, never a separately installed Vitest.
Vite+ 1.2.0 bundles Vitest 5.0.4; `@vitest/coverage-v8` is pinned to 5.0.4.
Recheck `vp toolchain` and align the provider when upgrading Vite+.

Colocate `*.spec.ts` and `*.spec.tsx` in each feature's `__tests__` directory,
following the reference project's conventions. Route tests live under
`src/routes/__tests__`; navigation tests under `src/components/__tests__`.
TanStack's route generator ignores `__tests__` directories. Vitest runs React's
Vite plugin without the Start build/SSR plugin to avoid framework transforms
and generated build state during unit tests.

`src/testing/render-router.tsx` creates a fresh application router with memory
history, loads it, and renders the real document shell. It accepts only the
initial path and returns a user-event instance: extend this helper only when a
current test needs more. All interactions are awaited. Assert accessible roles,
visible content and document metadata. Mock external boundaries when needed;
keep routing and the component under test real. Explicit `afterEach(cleanup)`
works without Vitest globals and unmounts the rendered document after every test.
Do not share routers or mutable fixtures across tests.

Coverage includes every authored TS/TSX/JS/JSX file under `src`, even files no
test imports. All four global thresholds—statements, branches, functions and
lines—must remain at 100% for future changes. Exclusions are limited to generated
`src/routeTree.gen.ts`, declaration files, `__tests__` directories and test-only
`src/testing` infrastructure. Configuration is outside `src`. CSS is validated
by the build, not executable JavaScript coverage. There are **no authored
framework-entry exclusions**: the router factory and root document are covered.
Start supplies its default client/server entries from dependencies; this app
has no authored client/server bootstrap files to exclude. New authored entries
fall into the include pattern and require meaningful tests or an individually
justified technical exclusion.

Current tests cover home/about content, direct route loads, navigation in both
directions, document language/title and the router's unknown-URL response. The
current authored code has no conditional branches (0/0, reported as 100%). This
is unit/component validation in happy-dom, not browser or deployed SSR testing.

Validation included a temporary, unimported application module with a two-way
branch. Coverage failed with exit 1: statements/lines 76.92%, functions 85.71%,
branches 0%. Removing the probe restored 100% in all four metrics. No probe is
retained in the repository.

The stable `Unit Tests` PR job runs coverage and uploads the report even on
failure. `✅ Status Checks` requires quality, build and unit results to equal
`success`, so failures, cancellations and unexpected skips block the existing
required check. No repository ruleset change is needed.
