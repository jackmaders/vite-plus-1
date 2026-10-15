# Vite+ with React and TanStack Start

The official TanStack Start blank React scaffold, generated with `vp create`,
with a second route and strict linting. Vite+ owns
runtime management, dependencies, development, builds, formatting, linting, type
checking, and tests.

```bash
vp install
vp dev
```

Visit the URL printed by Vite+. `/` and `/about` render on the server; their links
navigate in the browser after hydration.

```bash
vp check         # Oxfmt, Oxlint, and strict TypeScript validation
vp run build     # Build client assets and the server request handler
vp preview       # Preview the production build locally
```

No tests exist yet. `vp test --passWithNoTests` verifies that state without adding
a test framework or browser infrastructure.

```text
src/
├── router.tsx          # Create a router per request; register inferred types
├── routes/__root.tsx   # Document, metadata, stylesheet, navigation
├── routes/index.tsx    # /
├── routes/about.tsx    # /about
├── routeTree.gen.ts    # Committed output from TanStack's route generator
└── styles.css
```

Add routes under `src/routes` using TanStack's `createFileRoute` and `Route` export.
Run `vp dev` or `vp run build` to regenerate `src/routeTree.gen.ts`, then commit the
updated tree with the routes. Never edit or format the generated file manually.
The existing Build PR check rejects route-tree drift after building.

Configuration stays in `vite.config.ts` (strict compiler options in
`tsconfig.json`). TanStack Start supplies its default StrictMode hydration and streaming server entries;
`vp run build` writes the request handler to `dist/server/server.js` and static
assets to `dist/client`. `vp preview` serves both locally. A production host adapter
and deployment are outside this starter's scope.

See [starter provenance](docs/starter-provenance.md) for the generator command and
exact adaptations, [setup](docs/setup.md) for repository setup and development, and
[lint policy](docs/lint-policy.md) for coverage, exceptions, and deferred plugins.
