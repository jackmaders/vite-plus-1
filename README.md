# Vite+ with React and TanStack Start

A minimal server-rendered React starter with typed file-based routing. Vite+ owns
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
├── client.tsx          # Hydrate the document in React StrictMode
├── router.tsx          # Create a router per request; register inferred types
├── routes/__root.tsx   # Document, metadata, stylesheet, navigation, fallback
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
`tsconfig.json`). TanStack Start supplies its default streaming server entry;
`vp run build` writes the request handler to `dist/server/server.js` and static
assets to `dist/client`. `vp preview` serves both locally. A production host adapter
and deployment are outside this starter's scope.

See [setup](docs/setup.md) for repository setup and development, and
[lint policy](docs/lint-policy.md) for coverage, exceptions, and deferred plugins.
