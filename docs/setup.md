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

## Local validation

```bash
vp check
vp test
vp test watch
vp run test:coverage
vp run build
```

Use watch mode while editing; the coverage task always runs once without task
caching. Keep statements, branches, functions and lines at 100% for every future
change. CI runs coverage in `🧪 Unit Tests` and uploads `unit-test-coverage`; the
existing required `✅ Status Checks` gates this job along with quality/build.

Colocate unit/component specs in feature `__tests__` directories under `src`.
Import test APIs from `vite-plus/test`. Runner-wide matchers and cleanup live in
`tests/vitest/setup.ts`; reusable router wrappers live in `src/testing/wrappers`.
Tests own Testing Library rendering and awaited user-event interactions.

Coverage includes all application TS/TSX/JS/JSX under `src`, including unimported
files. Exclusions cover the generated route tree, declarations, tests and
`src/testing` utilities. No authored entry points are excluded: the router and
root document are tested; client/server bootstrap defaults come from dependencies.
The V8 provider must match bundled Vitest (`vp toolchain`): currently 5.0.4.

Native Oxlint Vitest rules apply only to unit/component specs. Testing Library's
JS plugin enables 28 of 29 rules at error; implicit assertions are disabled in
favor of its conflicting explicit-assertion rule. Compatibility probes confirmed
focused tests and direct DOM-node access are rejected. No unsupported plugin
rules were observed. Remaining gaps include browser/CSS/deployed SSR behavior
and reference-specific Grit conventions.

Scoped lint exceptions permit awaited tests, the reference's `.spec` filenames,
and setup's complete matcher namespace import. Vitest import rules disagree
with each other and fail to recognize the required `vite-plus/test` imports;
`no-undef`, type checking and Vite+'s import rule retain enforcement. Assertion
counts and per-test timeout literals are disabled because awaited assertions
reject normally and Vitest already enforces a default timeout. Configuration
permits Node built-ins for detecting test runs. All other existing lint policy
remains in place.
