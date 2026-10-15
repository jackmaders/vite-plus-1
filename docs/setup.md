# Repository setup

## Project Setup

Prerequisites:

- [Vite+](https://viteplus.dev/guide/) 1.2.0: validate with `vp --version`.
- [Git](https://git-scm.com/downloads) 2.28 or newer: validate with `git --version`.
- [GitHub CLI](https://cli.github.com/) 2.x: validate with `gh --version` and authenticate with `gh auth login`.

Create the project and enter the generated directory:

```bash
vp create github:jackmaders/vite-plus
cd <project-name>
vp install
```

Set `name` in `package.json` to your new project name; remote templates retain the template's package name. The GitHub repository name is inferred from this field.

Vite+ installs the configured Node 24.22.0 and pnpm 12.11.2. Validate with `vp env current`.

## GitHub Setup

```bash
export GH_OWNER="$(gh api user --jq .login)"
export GH_REPO="${GH_OWNER}/$(node -p 'require("./package.json").name')"

git add .
git commit -m "chore: initialize project"
gh repo create "$GH_REPO" --public --source=. --remote=origin --push
gh repo edit --default-branch main \
  --delete-branch-on-merge --enable-squash-merge \
  --enable-merge-commit=false --enable-rebase-merge=false
```

Run the checks once before requiring them:

```bash
gh workflow run pull-request.yml --ref main
gh run list --workflow pull-request.yml --limit 1
gh run watch RUN_ID --exit-status
```

After `✅ Status Checks` passes, apply the main-branch ruleset:

```bash
gh api --method POST 'repos/{owner}/{repo}/rulesets' \
  --input .github/rulesets/protect-main.json
gh api 'repos/{owner}/{repo}/rules/branches/main'
```

For an existing repository, inspect `gh api 'repos/{owner}/{repo}/rulesets'` first. If `Protect Main` already exists, update it with `--method PUT 'repos/{owner}/{repo}/rulesets/RULESET_ID'` and the same input file.

For AI reviews, add a Gemini API key as a repository secret:

```bash
gh secret set GEMINI_API_KEY
```

## React and TanStack Start workflow

```bash
vp install
vp dev
```

Open the printed local URL and follow Home → About → Home. Both `/` and `/about`
are server-rendered React pages. TanStack Router takes over navigation after
Start’s default client entry hydrates the document in StrictMode. `src/router.tsx` creates a
fresh router for each request and registers its inferred type. The root route
owns the HTML document, head metadata, stylesheet and navigation.
Start supplies the default client and streaming server entries, so no custom adapter
is needed for development or preview.

Use `vp add` and `vp remove` for dependencies. Keep Vite, Start, React plugin, lint,
format, and staged-check configuration in `vite.config.ts`; import supported
tooling APIs from `vite-plus`. The `@/` source alias is declared in `tsconfig.json`
and resolved by Vite's `resolve.tsconfigPaths` setting.

To add a page, create a `.tsx` file in `src/routes` exporting `Route` from
`createFileRoute`. Follow TanStack's filename conventions (`index`, `__root`,
`$param`, and layout prefixes); use named function components and inferred return
types. Development and build regenerate `src/routeTree.gen.ts`. Commit it with any
route changes; it remains type-visible but excluded from lint and formatting.

Validate and preview before pushing:

```bash
vp check
vp run build
vp test --passWithNoTests
vp preview
```

The build script delegates to `vp build`. Type checking runs in `vp check`, using
Oxlint's type-aware and type-check options and the strict compiler configuration.
There are currently no test files; no separate test framework has been introduced.

Preview uses the built client assets and server request handler. Direct requests
to `/` and `/about` should return HTML containing their page headings even with
JavaScript disabled. With JavaScript enabled, links should change pages without a
new document request; browser Back should restore the previous page.

PR checks retain the names `🔎 Code Quality`, `🏗️ Build`, and `✅ Status Checks`.
Build now runs `vp run build` followed by
`git diff --exit-code -- src/routeTree.gen.ts`, so stale generated routes fail the
existing required check. Repository protections and advisory AI review are
unchanged. Hosting adapters, deployment, authentication, data libraries, UI
libraries, and browser-test infrastructure remain outside this migration.

See [lint policy](lint-policy.md) before adding hooks, route loaders, or exceptions.

The application files originate from the official blank scaffold generated with
`vp create @tanstack/start`. See [starter provenance](starter-provenance.md) for
the resolved generator version, exact command, copied files, and adaptations.
