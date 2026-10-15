# Official starter provenance

The application source was copied from an actual official TanStack Start blank
React scaffold generated on 2026-10-15 with Vite+ 1.2.0 and the resolved
`@tanstack/cli` **0.71.1**. It was generated outside this repository, in
`/tmp/vite-plus-official-tanstack`, using:

```bash
cd /tmp
vp create @tanstack/start \
  --no-git --no-hooks --no-agent --no-editor --no-interactive -- \
  vite-plus-official-tanstack --framework React --blank --no-examples \
  --no-git --no-intent --non-interactive
```

`vp create` delegates to the official `@tanstack/cli create` command and adds
`--no-install --no-toolchain` before applying its Vite+ adaptations and installing
with the managed package manager. `--blank` selects the minimal scaffold without
Tailwind, devtools, tests, examples, or optional add-ons. No deployment adapter was
selected. The generated `.cta.json` records `projectPreset: "blank"`,
`framework: "react"`, `routerOnly: false`, and an empty `chosenAddOns` array.

## Files copied and adaptations

| Generated file                                  | Repository adaptation                                                                                                                                                                          |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/routes/index.tsx`                          | Copied unchanged, including the welcome heading and edit instructions                                                                                                                          |
| `src/styles.css`                                | Copied unchanged; no custom starter design                                                                                                                                                     |
| `src/router.tsx`                                | Copied; reorder option keys for linting. Preserve the generated router alias, local variable, intent preloading, zero preload stale time, scroll restoration, and inferred registration        |
| `src/routes/__root.tsx`                         | Copied; add Home/About navigation, use the existing source alias for CSS, make ReactNode a type import and props readonly, sort metadata keys, and add two documented narrow lint suppressions |
| `src/routes/index.tsx` → `src/routes/about.tsx` | Copy the official page as the second route; change only its path, component name, heading, and edit-instruction filename                                                                       |
| `vite.config.ts`                                | Adopt the generated `lazyPlugins` wrapper while retaining the repository's strict centralized configuration; use `?? []` to satisfy exact optional-property checking                           |
| `package.json`                                  | Use the generated exact Router `1.170.44` and Start `1.169.2` versions. Retain compatible React 19, Vite+ catalog/runtime management, strict tooling dependencies, and existing scripts        |

The official blank scaffold has no custom client or server entry file. This
repository follows it: Start's built-in client entry wraps hydration in
`startTransition` and React `StrictMode`; the default server entry streams the
rendered document. The earlier custom `src/client.tsx` was removed.

The scaffold's separate `tsr.config.json` only selects React and its
`generate-routes` script invokes the router CLI. Neither is copied: the existing
centralized Start Vite plugin already generates React routes during development
and builds. Keep the committed route tree and Build drift verification.

The generated package metadata, editor configuration, starter README, and loose
compiler defaults do not replace this repository's governance, documentation,
strict compiler settings, or lint policy. The reference project remains unchanged.
