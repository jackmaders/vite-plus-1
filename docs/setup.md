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

Vite+ installs the configured Node 24.22.0 and pnpm 12.11.2. Validate with `vp env current`.

## GitHub Setup

Create a repository with GitHub Actions enabled. Replace `OWNER/REPO` with your new repository name. You need repository administration rights to apply the ruleset.

```bash
git init -b main
git add .
git commit -m "chore: initialize project"
gh repo create OWNER/REPO --private --source=. --remote=origin --push
gh repo edit OWNER/REPO --default-branch main \
  --delete-branch-on-merge --enable-squash-merge \
  --enable-merge-commit=false --enable-rebase-merge=false
```

Run the checks once before requiring them:

```bash
gh workflow run pull-request.yml --repo OWNER/REPO --ref main
gh run list --repo OWNER/REPO --workflow pull-request.yml --limit 1
gh run watch RUN_ID --repo OWNER/REPO --exit-status
```

After `Code Quality` and `Build` pass, apply the main-branch ruleset:

```bash
gh api --method POST repos/OWNER/REPO/rulesets \
  --input .github/rulesets/protect-main.json
gh api repos/OWNER/REPO/rules/branches/main
```

For an existing repository, inspect `gh api repos/OWNER/REPO/rulesets` first. If `Protect Main` already exists, update it with `--method PUT repos/OWNER/REPO/rulesets/RULESET_ID` and the same input file.

For AI reviews, add a Gemini API key as a repository secret:

```bash
gh secret set GEMINI_API_KEY --repo OWNER/REPO
```
