# vite-plus-official-tanstack

A minimal TanStack Start app with home and about routes and plain CSS.

```bash
vp install
vp dev
```

Edit `src/routes/index.tsx` to get started. Add route files under
`src/routes`; TanStack Router updates `src/routeTree.gen.ts` for you.

Build the production app with:

```bash
vp run build
```

Run unit/component tests with `vp test`, or watch with `vp test watch`.
Run `vp run test:coverage` to enforce 100% statements, branches, functions and
lines across authored application source. Future changes must preserve all four
thresholds. See [test conventions and coverage scope](docs/testing.md),
[lint policy](docs/lint-policy.md) and [setup](docs/setup.md).
