# Repository setup

This phase adds repository governance to the current Vite starter. It does not implement TanStack Start, authentication, databases, migrations, Cloudflare infrastructure, or deployment.

## Prerequisites and preparation

Install [Vite+](https://viteplus.dev/guide/), Git, Python 3, and the [GitHub CLI](https://cli.github.com/). Authenticate with `gh auth login`; repository administration rights are needed to apply restrictions. GitHub Actions must be enabled.

Vite+ 1.2.0 is pinned in `pnpm-workspace.yaml` and CI. `package.json` pins managed Node 24.22.0 through `devEngines.runtime` and managed pnpm 12.11.2 through `devEngines.packageManager`. Keep these and CI aligned when upgrading. CI pins action revisions, including [setup-vp v1.21.2](https://github.com/voidzero-dev/setup-vp/tree/v1.21.2).

```bash
vp env use
vp install
vp check
vp build
vp run build
gh repo view --json nameWithOwner
git switch -c chore/project-setup
```

`vp check` centralizes formatting, Oxlint, and type checking through `vite.config.ts`. `vp run build` also validates the starter's existing TypeScript build script. `vp dev` starts development. CI uses `setup-vp` with `run-install: true` to install dependencies; pnpm enforces the lockfile in CI automatically.

There are no tests yet. Do not add placeholder tests or treat “no tests found” as successful coverage. The existing AGENTS.md review checklist remains applicable when real test infrastructure arrives; this phase validates quality and build only.

## GitHub restrictions and rollout

Confirm the repository before changing settings:

```bash
gh api repos/jackmaders/vite-plus --jq '{default_branch,allow_squash_merge,allow_merge_commit,allow_rebase_merge,delete_branch_on_merge}'
gh api 'repos/jackmaders/vite-plus/rulesets?includes_parents=true'
gh api repos/jackmaders/vite-plus/branches/main/protection
```

A 404 with “Branch not protected” means no classic branch protection exists; separately inspect rulesets. Preserve unrelated repository settings and inherited policies.

```bash
gh repo edit jackmaders/vite-plus --default-branch main \
  --delete-branch-on-merge --enable-squash-merge \
  --enable-merge-commit=false --enable-rebase-merge=false
```

Push the governance branch and open a PR against main before enabling the required contexts. All PRs targeting main, including documentation-only changes, run `Code Quality` (`vp check`) and `Build` (`vp build`). Both jobs are required directly by branch protection. Workflow dispatch supports manual diagnostics once the workflow exists on main. A superseded run may be cancelled by concurrency; the latest run must pass.

```bash
git push --set-upstream origin HEAD
gh pr create --base main --fill
gh pr checks --watch
```

Wait for successful `Code Quality` and `Build` check runs before applying protection to avoid a bootstrap deadlock. Verify their spelling and GitHub Actions app ID (15368) in the check-runs API. Then apply the checked-in policy:

```bash
python3 scripts/apply-ruleset.py jackmaders/vite-plus
gh api repos/jackmaders/vite-plus/rulesets
gh api repos/jackmaders/vite-plus/rules/branches/main
gh pr checks --required
```

The application script is idempotent: it updates the matching repository ruleset by name or exact main-branch target, creates one only if absent, and stops on ambiguous matches. It preserves unrelated rule types and leaves other rulesets untouched. Review existing exclusions and shared branch scopes before adapting a differently scoped ruleset; this policy deliberately targets only main. The script must be run from an environment allowed to access GitHub.

`Protect Main` prevents deletion and force pushes, requires linear history, PRs, resolved conversations, and an up-to-date branch with the GitHub Actions `Code Quality` and `Build` contexts passing. Only squash merges are allowed. The solo-maintainer policy requires zero approvals, dismisses stale approvals, requires neither code-owner nor last-push approval, and has no bypass actors. Repository settings automatically delete merged branches. Do not merge during setup verification; review the PR first.

## Verify and troubleshoot

Inspect `gh pr checks`, the Actions logs, and the effective branch rules after rollout. A pending required check commonly means a misspelled context, a workflow that has not registered yet, disabled Actions, a first-time contributor awaiting workflow approval, or an outdated branch. Confirm `Code Quality` and `Build` are emitted by GitHub Actions, update the PR branch from main when needed, and rerun failed checks after fixing their cause. Do not disable protection to bypass failures. There are no path filters, so documentation changes must also run both required jobs.

If runtime or package-manager setup fails, run `vp env doctor` and include its output when asking for help. If an API operation returns 403/422, inspect administrator permissions, inherited rules, and repository-plan support; report exactly which restriction was not applied. Local JSON is not evidence of active remote protection.

## Future phases

Application migration will have its own PR. Add meaningful unit tests and coverage, browser checks, migration-drift checks, or deployment validation only when their infrastructure exists. Add new required jobs to the ruleset’s status checks when their infrastructure is ready. Keep lint, formatting, and type checking in Vite+; do not introduce duplicate toolchains. Knip and Cloudflare jobs are deferred. Lighthouse is excluded. No deployment instructions in the reference are currently working functionality here.
