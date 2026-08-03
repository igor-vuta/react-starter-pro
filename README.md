<div align="center">

# ⚡️ React Starter Pro

**A React 19 + Vite template that already has the boring parts solved.**

[Live demo](https://igor-vuta.github.io/react-starter-pro/) ·
[Development guide](./docs/DEVELOPMENT.md) ·
[Branching strategy](./docs/BRANCHING.md) ·
[Code quality](./docs/CODE_QUALITY.md) ·
[Resources](./docs/RESOURCES.md)

<img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React 19" />
<img src="https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white" alt="Vite 6" />
<img src="https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind v4" />
<img src="https://img.shields.io/badge/ESLint-flat_config-4B32C3?logo=eslint&logoColor=white" alt="ESLint" />
<img src="https://img.shields.io/badge/Prettier-enforced-F7B93E?logo=prettier&logoColor=black" alt="Prettier" />
<img src="https://img.shields.io/badge/Husky-hooks-42B983?logo=git&logoColor=white" alt="Husky" />
<img src="https://img.shields.io/badge/License-MIT-green" alt="MIT" />

</div>

---

## Why this template

Most starters give you a build tool and stop. This one also gives you the
workflow: a linter and formatter that do not fight, Git hooks that catch
problems before they reach CI, and a four-branch strategy that still works when
there is more than one person on the repo.

- ⚡ **React 19 + Vite 6** — instant HMR, optimised production build
- 🎨 **Tailwind CSS v4** — CSS-first theming, design tokens in `@theme`
- 🌗 **Light / dark theme** — class-based, persisted, no flash on load
- 🧹 **ESLint 9 flat config** — React, hooks and fast-refresh rules, zero warnings tolerated
- 💅 **Prettier** — one formatting source of truth
- 🐶 **Husky + lint-staged + commitlint** — pre-commit and commit-msg gates
- 🌿 **Four-branch strategy** — `feature/*` → `develop` → `staging` → `main`
- 🤖 **GitHub Actions** — CI on every PR, auto-deploy from `main` to Pages

---

## Quick start

```bash
# Clone (or hit "Use this template" on GitHub)
git clone https://github.com/igor-vuta/react-starter-pro.git my-app
cd my-app

npm install     # installs dependencies *and* the Git hooks
npm run dev     # http://localhost:5173
```

Requires **Node 20+** (`.nvmrc` pins it) and npm. Then read
[docs/DEVELOPMENT.md](./docs/DEVELOPMENT.md).

---

## Scripts

| Script                 | What it does                                               |
| ---------------------- | ---------------------------------------------------------- |
| `npm run dev`          | Dev server with hot module replacement                     |
| `npm run build`        | Production build into `dist/`                              |
| `npm run preview`      | Serve the production build locally                         |
| `npm run lint`         | ESLint across the repo — **fails on warnings**             |
| `npm run lint:fix`     | ESLint with autofix                                        |
| `npm run format`       | Rewrite files with Prettier                                |
| `npm run format:check` | Fail if anything is unformatted                            |
| `npm run verify`       | `format:check` + `lint` + `build` — the exact gate CI runs |

> Run `npm run verify` before pushing and CI will not surprise you.

---

## Project structure

```
react-starter-pro/
├── .github/
│   ├── workflows/ci.yml         # format + lint + build on every PR
│   ├── workflows/gh-pages.yml   # deploy main to GitHub Pages
│   └── PULL_REQUEST_TEMPLATE.md
├── .husky/
│   ├── pre-commit               # lint-staged
│   └── commit-msg               # commitlint
├── docs/
│   ├── DEVELOPMENT.md           # setup, scripts, structure, troubleshooting
│   ├── BRANCHING.md             # the four-branch strategy in full
│   ├── CODE_QUALITY.md          # ESLint, Prettier, Husky explained
│   ├── CONTRIBUTING.md          # the short version
│   └── RESOURCES.md             # curated reading list
├── src/
│   ├── components/              # one component per file, PascalCase
│   ├── data/content.js          # page copy and links, kept out of the JSX
│   ├── hooks/useTheme.js        # theme state + persistence
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css                # Tailwind import + @theme design tokens
├── commitlint.config.js
├── eslint.config.js
├── vite.config.js
└── .prettierrc
```

There is **no `tailwind.config.js`** — Tailwind v4 is configured in CSS. See
[Styling with Tailwind v4](./docs/DEVELOPMENT.md#styling-with-tailwind-v4).

---

## The workflow

Three gates, each runnable locally:

| When            | What runs                               | Command          |
| --------------- | --------------------------------------- | ---------------- |
| On save         | Prettier                                | `npm run format` |
| On commit       | lint-staged → Prettier + ESLint         | (automatic)      |
|                 | commitlint → Conventional Commits       | (automatic)      |
| On pull request | format:check + lint + build, commitlint | `npm run verify` |

Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git commit -m "feat(landing): add a pricing section"
git commit -m "fix: prevent the nav from overflowing on small screens"
```

Details: [docs/CODE_QUALITY.md](./docs/CODE_QUALITY.md).

---

## Branching strategy

```
feature/*  ──▶  develop  ──▶  staging  ──▶  main  ──▶  🚀 GitHub Pages
                   ▲                          │
                   └──────── hotfix/* ◀───────┘
```

| Branch      | Purpose                      | Branches from | Merges into | Protected |
| ----------- | ---------------------------- | ------------- | ----------- | --------- |
| `main`      | Production, always shippable | `staging`     | —           | ✅        |
| `staging`   | Release candidate / QA       | `develop`     | `main`      | ✅        |
| `develop`   | Integration branch           | `main`        | `staging`   | ✅        |
| `feature/*` | One unit of work             | `develop`     | `develop`   | ❌        |

Code only moves forward, every promotion is a reviewed pull request, and nothing
is committed directly to a protected branch. Full rules, merge strategies,
hotfix flow and branch-protection setup:
[docs/BRANCHING.md](./docs/BRANCHING.md).

---

## Deployment

Merging into `main` builds and publishes to GitHub Pages via
`.github/workflows/gh-pages.yml`. The site is served from a subpath, so
`vite.config.js` sets `base: '/react-starter-pro/'` — change it to `'/'` if you
deploy to a root domain.

---

## Contributing

Pull requests welcome. Branch from `develop`, run `npm run verify`, and target
`develop`. See [docs/CONTRIBUTING.md](./docs/CONTRIBUTING.md).

---

## License

[MIT](./LICENSE)

<div align="center">
<sub>Built with React 19, Vite and Tailwind CSS.</sub>
</div>
