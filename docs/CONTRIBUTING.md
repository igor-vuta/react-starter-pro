# Contributing

Thanks for taking the time. This is the short version — the long versions live in
[DEVELOPMENT.md](./DEVELOPMENT.md), [BRANCHING.md](./BRANCHING.md) and
[CODE_QUALITY.md](./CODE_QUALITY.md).

## Setup

```bash
npm install     # installs dependencies and the Git hooks
npm run dev
```

## Making a change

1. Branch from `develop`: `git switch -c feat/your-thing`
2. Make the change
3. `npm run verify` — format check, lint, build. This is exactly what CI runs.
4. Commit using [Conventional Commits](https://www.conventionalcommits.org/):
   `feat(scope): what changed`
5. Push and open a pull request **against `develop`**

The `pre-commit` hook formats and lints your staged files; the `commit-msg` hook
validates the message. If a commit is rejected, the hook output says why.

## What gets a pull request approved

- It targets the right base branch (`develop` for features and fixes, `main`
  only for hotfixes)
- CI is green
- Commits are conventional and the history is readable — squash your `wip`
  commits before asking for review
- Docs are updated if the change affects setup or behaviour
- UI changes include a screenshot

## What to avoid

- Committing directly to `main`, `staging` or `develop`
- Reformatting unrelated files — Prettier runs on staged files for a reason
- Adding a dependency without saying in the PR description why it earns its place
- Mixing package managers; this repo uses **npm** and `package-lock.json`

## Reporting a bug

Open an issue with: what you did, what you expected, what happened, and your
Node version (`node -v`). A minimal reproduction is worth more than a long
description.
