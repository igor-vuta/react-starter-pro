# Useful materials

A curated reading list for the stack this template ships with. Official docs
first — they are better than almost every tutorial.

---

## Core stack

### React 19

- [react.dev — Learn React](https://react.dev/learn) — the rewritten,
  hooks-first tutorial. Start here.
- [Rules of Hooks](https://react.dev/reference/rules/rules-of-hooks) — what the
  `react-hooks` ESLint rules are actually enforcing.
- [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
  — the single highest-value page in the docs.
- [React 19 release notes](https://react.dev/blog/2024/12/05/react-19) — Actions,
  `use`, ref-as-prop, the new form hooks.
- [Thinking in React](https://react.dev/learn/thinking-in-react) — how to break a
  design into components.

### Vite 6

- [Vite guide](https://vite.dev/guide/) — dev server, build, static assets.
- [Env variables and modes](https://vite.dev/guide/env-and-mode) — how
  `import.meta.env` and `VITE_` prefixes work.
- [Build options](https://vite.dev/config/build-options) — code splitting,
  chunking, source maps.
- [Why Vite](https://vite.dev/guide/why) — the esbuild/Rollup split explained.

### Tailwind CSS v4

- [Tailwind docs](https://tailwindcss.com/docs) — v4 is **CSS-first**; a
  `tailwind.config.js` does nothing here.
- [Theme variables](https://tailwindcss.com/docs/theme) — the `@theme` block in
  `src/index.css`.
- [Adding custom styles](https://tailwindcss.com/docs/adding-custom-styles) —
  when to reach for `@layer components`.
- [Dark mode](https://tailwindcss.com/docs/dark-mode) — the `@custom-variant`
  class strategy this project uses.
- [Upgrade guide (v3 → v4)](https://tailwindcss.com/docs/upgrade-guide) — useful
  context if your muscle memory is from v3.

### React Router v8

- [React Router home](https://reactrouter.com/home) — installed and ready.
  Import from `react-router`; `react-router-dom` is no longer a separate
  package.
- [Picking a mode](https://reactrouter.com/start/modes) — declarative, data, or
  framework mode.

---

## Code quality

- [ESLint — Configure](https://eslint.org/docs/latest/use/configure/) — the flat
  config format used in `eslint.config.js`.
- [ESLint rules reference](https://eslint.org/docs/latest/rules/) — searchable
  list of every core rule.
- [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)
- [Prettier options](https://prettier.io/docs/en/options) — everything you can
  put in `.prettierrc`.
- [Prettier — integrating with linters](https://prettier.io/docs/en/integrating-with-linters)
  — why `eslint-config-prettier` must load last.
- [Husky](https://typicode.github.io/husky/) — Git hooks that survive a clone.
- [lint-staged](https://github.com/lint-staged/lint-staged) — run tools against
  staged files only.
- [commitlint](https://commitlint.js.org/) — the rules and their configuration.

---

## Git and workflow

- [Conventional Commits](https://www.conventionalcommits.org/) — the commit
  format the `commit-msg` hook enforces.
- [Semantic Versioning](https://semver.org/) — how to number the tags you cut
  from `main`.
- [GitHub Flow](https://docs.github.com/en/get-started/using-github/github-flow)
  — the simpler model this project's four-branch strategy extends.
- [Atlassian — Gitflow workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)
  — the fuller model it trims down.
- [Pro Git (free book)](https://git-scm.com/book/en/v2) — chapters 3 (branching)
  and 7 (rewriting history) are the ones that pay off.
- [Signing commits](https://docs.github.com/en/authentication/managing-commit-signature-verification)
  — GPG or SSH verified commits.
- [GitHub Actions docs](https://docs.github.com/en/actions) — the CI in
  `.github/workflows/`.
- [Branch protection rules](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)

---

## Going further

Things this template deliberately leaves out, with the obvious next step for
each:

| Need                | Reach for                                                                                              |
| ------------------- | ------------------------------------------------------------------------------------------------------ |
| Testing             | [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/react)             |
| End-to-end tests    | [Playwright](https://playwright.dev/)                                                                  |
| Server state        | [TanStack Query](https://tanstack.com/query/latest)                                                    |
| Client state        | [Zustand](https://zustand.docs.pmnd.rs/) — reach for it after `useState` and context stop being enough |
| Forms               | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)                              |
| Accessible UI parts | [Radix Primitives](https://www.radix-ui.com/primitives) or [Headless UI](https://headlessui.com/)      |
| Icons               | [Lucide](https://lucide.dev/)                                                                          |
| Animation           | [Motion](https://motion.dev/)                                                                          |
| Type safety         | [TypeScript](https://www.typescriptlang.org/) — `@types/react` is already installed                    |
| Component workshop  | [Storybook](https://storybook.js.org/)                                                                 |
| Bundle analysis     | [rollup-plugin-visualizer](https://github.com/btd/rollup-plugin-visualizer)                            |

---

## Reference

- [Can I use](https://caniuse.com/) — browser support tables.
- [MDN Web Docs](https://developer.mozilla.org/) — the reference for the platform
  underneath React.
- [WCAG quick reference](https://www.w3.org/WAI/WCAG22/quickref/) — accessibility
  checklist.
- [web.dev — Core Web Vitals](https://web.dev/articles/vitals) — what to measure
  after it works.
