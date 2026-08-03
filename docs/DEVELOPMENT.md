# Development guide

Everything you need to work in this repository day to day. If you only read one
section, read [Your first change](#your-first-change).

- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Scripts](#scripts)
- [Project structure](#project-structure)
- [Your first change](#your-first-change)
- [Styling with Tailwind v4](#styling-with-tailwind-v4)
- [Adding routes](#adding-routes)
- [Environment variables](#environment-variables)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

| Tool | Version | Notes                                                   |
| ---- | ------- | ------------------------------------------------------- |
| Node | >= 20   | `.nvmrc` pins 20 — run `nvm use` if you use nvm         |
| npm  | >= 10   | Ships with Node 20; the lockfile is `package-lock.json` |
| Git  | any     | SSH remote recommended, signed commits encouraged       |

This project uses **npm**, not pnpm or yarn. Mixing package managers produces a
second lockfile and breaks `npm ci` in CI, so stick to npm.

## Setup

```bash
git clone git@github.com:igor-vuta/react-starter-pro.git
cd react-starter-pro
npm install     # also installs the Git hooks via the `prepare` script
npm run dev     # http://localhost:5173
```

`npm install` runs `husky`, which points `core.hooksPath` at `.husky/`. If you
clone with `--no-checkout` or install with `--ignore-scripts`, the hooks will not
be active — run `npx husky` once to fix it.

## Scripts

| Script                 | What it does                                                       |
| ---------------------- | ------------------------------------------------------------------ |
| `npm run dev`          | Vite dev server with hot module replacement                        |
| `npm run build`        | Production build into `dist/`                                      |
| `npm run preview`      | Serve the built `dist/` locally — use it to check the real bundle  |
| `npm run lint`         | ESLint across the repo; **fails on warnings** (`--max-warnings=0`) |
| `npm run lint:fix`     | ESLint with autofix                                                |
| `npm run format`       | Rewrite files with Prettier                                        |
| `npm run format:check` | Fail if anything is unformatted — this is what CI runs             |
| `npm run verify`       | `format:check` + `lint` + `build`, the full pre-push gate          |

**Run `npm run verify` before you push.** It is exactly what CI runs, so a green
local run means a green pull request.

## Project structure

```
react-starter-pro/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml              # lint + format + build on every PR
│   │   └── gh-pages.yml        # deploy main to GitHub Pages
│   └── PULL_REQUEST_TEMPLATE.md
├── .husky/
│   ├── pre-commit              # runs lint-staged
│   └── commit-msg              # runs commitlint
├── docs/
│   ├── DEVELOPMENT.md          # you are here
│   ├── BRANCHING.md            # the four-branch strategy
│   ├── CODE_QUALITY.md         # ESLint, Prettier, Husky in detail
│   └── RESOURCES.md            # curated reading list
├── src/
│   ├── components/             # one component per file, PascalCase
│   ├── data/content.js         # copy and link data for the landing page
│   ├── hooks/                  # reusable hooks, prefixed with `use`
│   ├── App.jsx                 # page composition
│   ├── main.jsx                # React root
│   └── index.css               # Tailwind import + @theme design tokens
├── commitlint.config.js
├── eslint.config.js            # ESLint flat config
├── vite.config.js
└── .prettierrc
```

Conventions:

- **Components** are PascalCase files with a default export, one per file.
- **Hooks** live in `src/hooks/`, are named `useThing`, and use named exports.
- **Static copy** (feature lists, links) lives in `src/data/` rather than being
  buried in JSX, so it can be edited without touching markup.
- No barrel (`index.js`) files — import from the concrete path.

## Your first change

```bash
# 1. Start from an up-to-date develop
git switch develop
git pull --ff-only

# 2. Branch, one branch per unit of work
git switch -c feat/pricing-section

# 3. Work. The dev server hot-reloads.
npm run dev

# 4. Check it the way CI will
npm run verify

# 5. Commit — the hooks format, lint and validate the message
git add .
git commit -m "feat(landing): add a pricing section"

# 6. Push and open a PR against develop
git push -u origin feat/pricing-section
gh pr create --base develop --fill
```

If the commit is rejected, read the hook output — it is either a lint error in a
staged file or a malformed commit message. See
[CODE_QUALITY.md](./CODE_QUALITY.md).

## Styling with Tailwind v4

Tailwind v4 is configured **in CSS**, not in a JS config file. There is no
`tailwind.config.js` in this repo, and adding one will not do anything.

Design tokens live in the `@theme` block in `src/index.css`:

```css
@theme {
  --color-brand-500: #338bff; /* -> bg-brand-500, text-brand-500, ... */
  --font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
}
```

Any custom property you declare there becomes a utility class automatically.
Repeated utility clusters are extracted into `@layer components` (see `.card`
and `.pill`) rather than being copy-pasted across files.

Dark mode uses a **class**, not the OS preference, so the in-app toggle can
override the system setting:

```css
@custom-variant dark (&:where(.dark, .dark *));
```

An inline script in `index.html` applies the stored theme before first paint to
avoid a flash of the wrong theme; `src/hooks/useTheme.js` owns it afterwards.

## Adding routes

React Router v8 is installed. Import from `react-router` (the separate
`react-router-dom` package is no longer used):

```jsx
import { BrowserRouter, Routes, Route } from 'react-router'

createRoot(document.getElementById('root')).render(
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </BrowserRouter>
)
```

`basename={import.meta.env.BASE_URL}` matters — the production build is served
from a subpath on GitHub Pages (see below).

## Environment variables

Vite only exposes variables prefixed with `VITE_`:

```bash
# .env.local  (git-ignored)
VITE_API_URL=https://api.example.com
```

```js
const apiUrl = import.meta.env.VITE_API_URL
```

Never put secrets in a `VITE_` variable — everything prefixed that way is
inlined into the client bundle and is publicly readable.

## Deployment

Pushing to `main` triggers `.github/workflows/gh-pages.yml`, which builds and
publishes to GitHub Pages: <https://igor-vuta.github.io/react-starter-pro/>

Because the site is served from a subpath, `vite.config.js` sets:

```js
base: '/react-starter-pro/'
```

If you deploy this template somewhere else, change `base` to `'/'` (or your own
subpath) or asset URLs will 404.

## Troubleshooting

**The Git hooks do not run.**
`git config core.hooksPath` should print `.husky/_`. If it does not, run
`npx husky`. To bypass hooks in a genuine emergency: `git commit --no-verify`
(and expect CI to catch whatever you skipped).

**`npm ci` fails in CI but `npm install` works locally.**
The lockfile is out of sync with `package.json`. Run `npm install`, commit the
updated `package-lock.json`.

**Blank page on GitHub Pages, assets 404.**
`base` in `vite.config.js` does not match the deployed path.

**Tailwind class has no effect.**
Tailwind scans source files for complete class strings. Dynamically built names
like `` `text-${color}-500` `` are never generated — write the full class name,
or map values to complete class strings.

**ESLint reports `'window' is not defined`.**
The browser globals are enabled for `**/*.{js,jsx}` only. Node-only config files
are covered by a separate block at the bottom of `eslint.config.js` — add your
file to its `files` array.
