# Repository setup

This phase adds repository governance to the current Vite starter. It does not implement TanStack Start, authentication, databases, migrations, Cloudflare infrastructure, or deployment.

## Prerequisites and preparation

Install [Vite+](https://viteplus.dev/guide/), Git, Python 3, and the [GitHub CLI](https://cli.github.com/). Authenticate with `gh auth login`; repository administration rights are needed to apply restrictions. GitHub Actions must be enabled.

Vite+ 1.2.0 is pinned in `pnpm-workspace.yaml` and CI. `.node-version` pins managed Node 24.22.0; `package.json` pins managed pnpm 12.11.2. Keep these and CI aligned when upgrading. CI pins action revisions, including [setup-vp v1.21.2](https://github.com/voidzero-dev/setup-vp/tree/v1.21.2).

```bash
vp env use
vp install
vp check
vp build
vp run build
gh repo view --json nameWithOwner
git switch -c chore/project-setup
```

`vp check` centralizes formatting, Oxlint, and type checking through `vite.config.ts`. `vp run build` also validates the starter's existing TypeScript build script. `vp dev` starts development. Installation in CI uses `vp install --frozen-lockfile`.

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

Push the governance branch and open a PR against main before enabling the required context. All PRs targeting main, including documentation-only changes, run `Code Quality` (`vp check`) and `Build` (`vp build`). `PR Checks` always runs after both and fails if either fails, is skipped, or is cancelled. Workflow dispatch supports manual diagnostics once the workflow exists on main. A superseded run may be cancelled by concurrency; the latest run must pass.

```bash
git push --set-upstream origin HEAD
gh pr create --base main --fill
gh pr checks --watch
```

Wait for an actual successful `PR Checks` check run before applying protection to avoid a bootstrap deadlock. Verify its spelling and GitHub Actions app ID (15368) in the check-runs API. Then apply the checked-in policy:

```bash
python3 scripts/apply-ruleset.py jackmaders/vite-plus
gh api repos/jackmaders/vite-plus/rulesets
gh api repos/jackmaders/vite-plus/rules/branches/main
gh pr checks --required
```

The application script is idempotent: it updates the matching repository ruleset by name or exact main-branch target, creates one only if absent, and stops on ambiguous matches. It preserves unrelated rule types and leaves other rulesets untouched. Review existing exclusions and shared branch scopes before adapting a differently scoped ruleset; this policy deliberately targets only main. The script must be run from an environment allowed to access GitHub.

`Protect Main` prevents deletion and force pushes, requires linear history, PRs, resolved conversations, and an up-to-date branch with the GitHub Actions `PR Checks` context passing. Only squash merges are allowed. The solo-maintainer policy requires zero approvals, dismisses stale approvals, requires neither code-owner nor last-push approval, and has no bypass actors. Repository settings automatically delete merged branches. Do not merge during setup verification; review the PR first.

## Advisory AI review

The reference's PR Agent configuration is carried over with [v0.47.0](https://github.com/The-PR-Agent/pr-agent/releases/tag/v0.47.0), pinned by commit. [Google's model catalog](https://ai.google.dev/gemini-api/docs/models) was checked on 2026-10-15: the primary model is `gemini/gemini-3.8-flash`, with `gemini/gemini-3.5-flash-lite` as fallback. Older preview and restricted legacy fallback models from the reference are omitted. Model access and quotas depend on the API project.

An administrator can store a Google AI Studio key using the interactive prompt:

```bash
gh secret set GEMINI_API_KEY --repo jackmaders/vite-plus
```

Never commit or print the value. Without this secret, the review action is skipped and a summary explains why. The workflow runs for opened, reopened, and ready-for-review non-draft PRs. It uses `pull_request_target`, so it may only become active after landing on the default branch. It never checks out, installs, or executes PR-controlled code; only the pinned reviewer receives credentials and reads PR data through the API. Treat PR text and diffs as untrusted input. Write permissions are limited to review comments/issues; repository contents remain read-only. AI review is advisory and is never a required merge check.

## Verify and troubleshoot

Inspect `gh pr checks`, the Actions logs, and the effective branch rules after rollout. A pending required check commonly means a misspelled context, a workflow that has not registered yet, disabled Actions, a first-time contributor awaiting workflow approval, or an outdated branch. Confirm `PR Checks` is emitted by GitHub Actions, update the PR branch from main when needed, and rerun failed checks after fixing their cause. Do not disable protection to bypass failures. There are no path filters, so documentation changes must also produce the aggregate.

If runtime or package-manager setup fails, run `vp env doctor` and include its output when asking for help. If an API operation returns 403/422, inspect administrator permissions, inherited rules, and repository-plan support; report exactly which restriction was not applied. Local JSON is not evidence of active remote protection.

## Future phases

Application migration will have its own PR. Add meaningful unit tests and coverage, browser checks, migration-drift checks, or deployment validation only when their infrastructure exists. Extend the aggregate's `needs` and explicit success assertions together so new required jobs cannot silently skip. Keep lint, formatting, and type checking in Vite+; do not introduce duplicate toolchains. Knip and Cloudflare jobs are deferred. Lighthouse is excluded. No deployment instructions in the reference are currently working functionality here.
