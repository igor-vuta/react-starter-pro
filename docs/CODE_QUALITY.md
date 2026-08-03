# Code quality

Three tools, three moments, one rule each:

| Tool                   | Runs                | Answers                               |
| ---------------------- | ------------------- | ------------------------------------- |
| **Prettier**           | on save / on commit | _How should this code look?_          |
| **ESLint**             | on commit / on PR   | _Is this code correct and idiomatic?_ |
| **Husky + commitlint** | on commit           | _Is this history readable?_           |

They do not overlap. `eslint-config-prettier` is loaded **last** in
`eslint.config.js` and switches off every ESLint rule that has an opinion about
formatting, so the two can never disagree.

---

## Prettier

Configuration lives in `.prettierrc`:

```json
{
  "semi": false,
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

`.prettierignore` keeps `dist/`, `node_modules/`, `package-lock.json` and
Husky's internals out of scope.

```bash
npm run format         # rewrite everything
npm run format:check   # fail if anything is unformatted (CI runs this)
```

**Turn on format-on-save in your editor.** VS Code:

```jsonc
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
}
```

Formatting should never appear in a code review. If it does, someone's editor is
not configured.

---

## ESLint

`eslint.config.js` uses the **flat config** format (ESLint 9). The blocks, in
order:

1. `ignores` — `dist/`, `node_modules/`, `coverage/`
2. `js.configs.recommended` — the core correctness rules
3. The main block for `**/*.{js,jsx}`: Babel parser (JSX without TypeScript),
   browser + ES2021 globals, and the React, React Hooks and React Refresh
   plugins
4. A Node-globals block for `*.config.js`
5. `eslint-config-prettier` — **last**, so it can disable formatting rules

Rules worth knowing about:

| Rule                                   | Level | Why                                                         |
| -------------------------------------- | ----- | ----------------------------------------------------------- |
| `react-hooks/rules-of-hooks`           | error | Conditional hooks are a real bug, not a style choice        |
| `react-hooks/exhaustive-deps`          | warn  | Missing deps cause stale closures                           |
| `react-refresh/only-export-components` | warn  | Mixed exports break fast refresh in dev                     |
| `no-unused-vars`                       | error | `_`-prefixed names are exempt, for intentional placeholders |
| `no-console`                           | warn  | `console.warn` / `console.error` allowed                    |
| `prefer-const`, `eqeqeq`               | error | Cheap correctness wins                                      |
| `react/prop-types`                     | off   | Deliberate — this template is plain JSX                     |

```bash
npm run lint       # --max-warnings=0, so warnings fail too
npm run lint:fix   # autofix what can be autofixed
```

Warnings fail the build on purpose. A warning nobody has to fix is a warning
that accumulates until the output is unreadable.

Disabling a rule inline is fine when it is genuinely wrong — but say why:

```js
// eslint-disable-next-line react-hooks/exhaustive-deps -- run once on mount only
useEffect(() => { ... }, [])
```

---

## Husky

Husky points `core.hooksPath` at `.husky/`, so the hooks are versioned with the
repo and every clone gets them after `npm install` (via the `prepare` script).

### `.husky/pre-commit`

```sh
npx --no-install lint-staged
```

`lint-staged` (configured in `package.json`) runs only against **staged** files:

```json
"lint-staged": {
  "*.{js,jsx,ts,tsx}": ["prettier --write", "eslint --fix --max-warnings=0"],
  "*.{css,html,json,md,yml,yaml}": ["prettier --write"]
}
```

Files that Prettier or ESLint rewrite are re-staged automatically. A commit is
rejected only when ESLint finds something it cannot fix — which is the point.

### `.husky/commit-msg`

```sh
npx --no-install commitlint --edit "$1"
```

Validates the message against `commitlint.config.js`.

---

## Commit messages

[Conventional Commits](https://www.conventionalcommits.org/):

```
type(optional scope): subject

optional body

optional footer
```

Allowed types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`,
`build`, `ci`, `chore`, `revert`.

Rules the hook enforces: type must be from that list, the subject must not be
Start-Case/PascalCase/UPPERCASE, and the header must be ≤ 100 characters.

✅ Good:

```
feat(landing): add a pricing section
fix: prevent the nav from overflowing on small screens
docs(branching): document the hotfix back-merge
chore(deps): bump vite to 6.3.5
```

❌ Rejected:

```
Added pricing section          # no type
feat: Add Pricing Section      # start-case subject
update stuff                   # no type, and says nothing
```

Breaking changes get a `!` and a footer:

```
feat(api)!: drop the v1 response shape

BREAKING CHANGE: clients must read `data.items` instead of `data`.
```

---

## CI

`.github/workflows/ci.yml` runs on every PR into `develop`, `staging` or `main`:

1. **Format, lint and build** — `npm run format:check`, `npm run lint`,
   `npm run build`
2. **Conventional commits** — commitlint over every commit in the PR range

Both are required status checks on the protected branches
(see [BRANCHING.md](./BRANCHING.md#branch-protection)).

`npm run verify` runs the same first job locally. Run it before you push and CI
will not surprise you.

---

## Bypassing the hooks

```bash
git commit --no-verify -m "wip: mid-refactor checkpoint"
```

Legitimate for a scratch commit on your own branch that you will squash. It is
not an escape hatch for a pull request — CI runs the same checks and will fail.

CI sets `HUSKY=0` so the hooks do not try to install themselves inside the
runner.
