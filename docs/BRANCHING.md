# Branching strategy

A four-branch model: **`feature/*` → `develop` → `staging` → `main`**.

It is Git Flow with the fat trimmed off — enough structure to run a release
train and a QA stage, without the release/support branch ceremony that most
teams never use.

---

## The branches

| Branch      | Purpose                      | Branches from | Merges into           | Protected | Lifetime   |
| ----------- | ---------------------------- | ------------- | --------------------- | --------- | ---------- |
| `main`      | Production. Always shippable | `staging`     | —                     | ✅        | permanent  |
| `staging`   | Release candidate / QA       | `develop`     | `main`                | ✅        | permanent  |
| `develop`   | Integration branch           | `main`        | `staging`             | ✅        | permanent  |
| `feature/*` | One unit of work             | `develop`     | `develop`             | ❌        | short      |
| `hotfix/*`  | Production emergency         | `main`        | `main` (+ back-merge) | ❌        | very short |

**Code only moves in one direction.** Nothing is ever committed directly to a
protected branch, and every promotion is a reviewed pull request.

```
feature/*  ──▶  develop  ──▶  staging  ──▶  main  ──▶  🚀 GitHub Pages
                   ▲                          │
                   └──────── hotfix/* ◀───────┘
                        (back-merged down)
```

---

## Branch naming

```
feat/<short-description>      feat/pricing-section
fix/<short-description>       fix/mobile-nav-overflow
docs/<short-description>      docs/branching-guide
chore/<short-description>     chore/bump-vite
hotfix/<short-description>    hotfix/broken-asset-paths
```

Lowercase, hyphen-separated, no ticket numbers in the branch name — put those in
the commit body (`Refs: #123`) or the PR title so they survive the squash.

---

## The flows

### Feature work

```bash
git switch develop
git pull --ff-only
git switch -c feat/pricing-section

# ... work, committing as you go ...

npm run verify
git push -u origin feat/pricing-section
gh pr create --base develop --fill
```

Keep the branch current by **rebasing**, not merging, so history stays linear:

```bash
git fetch origin
git rebase origin/develop
git push --force-with-lease
```

Never rebase a branch someone else has pulled. Never force-push a protected
branch — the protection rules block it anyway.

### Cutting a release candidate

When `develop` holds everything the release needs:

```bash
gh pr create --base staging --head develop --title "release: v1.3.0"
```

QA and UAT run against `staging`. From that point only **fixes** land on
`staging` — no new features. Every fix is merged into `staging` and then merged
back down into `develop` so it is not lost:

```bash
git switch develop && git merge --no-ff staging && git push
```

### Releasing to production

```bash
gh pr create --base main --head staging --title "release: v1.3.0"
# after merge:
git switch main && git pull --ff-only
git tag -s v1.3.0 -m "v1.3.0"
git push origin v1.3.0
```

Merging into `main` triggers the GitHub Pages deploy. Tag every release with a
[SemVer](https://semver.org/) tag so you can point at exactly what shipped.

### Hotfixes

Production is broken and the fix cannot wait for the train:

```bash
git switch main && git pull --ff-only
git switch -c hotfix/broken-asset-paths

# ... fix, verify ...

gh pr create --base main --fill
```

After it merges, **merge `main` down into `staging` and `develop`** — otherwise
the next release silently reverts the hotfix:

```bash
git switch staging && git merge --no-ff main && git push
git switch develop && git merge --no-ff staging && git push
```

---

## Merge strategy

| Merge                   | Strategy             | Why                                             |
| ----------------------- | -------------------- | ----------------------------------------------- |
| `feature/*` → `develop` | **Squash and merge** | One tidy commit per unit of work                |
| `develop` → `staging`   | **Merge commit**     | Preserves the individual commits in the release |
| `staging` → `main`      | **Merge commit**     | Keeps the release boundary visible in history   |
| `hotfix/*` → `main`     | **Squash and merge** | One commit, easy to cherry-pick or revert       |

Delete feature branches after merge (GitHub can do this automatically:
Settings → General → "Automatically delete head branches").

---

## Branch protection

Apply these rules to `main`, `staging` and `develop`
(Settings → Branches → Add branch ruleset):

- ✅ Require a pull request before merging
  - `main` and `staging`: 1+ approving review
  - Dismiss stale approvals when new commits are pushed
- ✅ Require status checks to pass — select **`Format, lint and build`** and
  **`Conventional commits`** from the CI workflow
- ✅ Require branches to be up to date before merging
- ✅ Block force pushes
- ✅ Restrict deletions
- ⬜ Include administrators — optional, but recommended for `main`

Set it up in one go with the CLI:

```bash
for BRANCH in main staging develop; do
  gh api -X PUT "repos/igor-vuta/react-starter-pro/branches/$BRANCH/protection" \
    -H "Accept: application/vnd.github+json" \
    -F "required_status_checks[strict]=true" \
    -F "required_status_checks[contexts][]=Format, lint and build" \
    -F "required_pull_request_reviews[required_approving_review_count]=1" \
    -F "enforce_admins=false" \
    -F "restrictions=null" \
    -F "allow_force_pushes=false" \
    -F "allow_deletions=false"
done
```

> Branch protection on private repositories requires a paid plan. On a free
> private repo, treat the rules above as team convention instead.

---

## Working solo

The model still pays off on a one-person project — `staging` is where you catch
the thing that only breaks in a production build. If it feels heavy, collapse to
`feature/* → develop → main` and add `staging` back when you have real users.

What is _not_ worth dropping: never committing straight to `main`, and always
letting CI run before a merge.
