export const REPO_URL = 'https://github.com/igor-vuta/react-starter-pro'

export const features = [
  {
    icon: '⚡',
    title: 'React 19 + Vite 6',
    body: 'Instant HMR in development and a pre-optimised Rollup build for production. No config to babysit.',
  },
  {
    icon: '🎨',
    title: 'Tailwind CSS v4',
    body: 'CSS-first theming via @theme — design tokens live next to your styles, no JS config file required.',
  },
  {
    icon: '🧹',
    title: 'ESLint (flat config)',
    body: 'React, hooks and fast-refresh rules wired up. `npm run lint` fails on warnings so nothing drifts.',
  },
  {
    icon: '💅',
    title: 'Prettier',
    body: 'One formatting source of truth. eslint-config-prettier disables every rule that would fight it.',
  },
  {
    icon: '🐶',
    title: 'Husky + lint-staged',
    body: 'pre-commit formats and lints only the files you staged; commit-msg enforces Conventional Commits.',
  },
  {
    icon: '🌿',
    title: '4-branch strategy',
    body: 'feature → develop → staging → main. Predictable promotion, no surprise merges into production.',
  },
]

export const quickStart = [
  {
    label: 'Scaffold from the template',
    code: 'npx degit igor-vuta/react-starter-pro my-app\ncd my-app',
  },
  { label: 'Install dependencies (also installs the Git hooks)', code: 'npm install' },
  { label: 'Start the dev server on http://localhost:5173', code: 'npm run dev' },
  { label: 'Format, lint and build before you push', code: 'npm run verify' },
]

export const branches = [
  {
    name: 'feature/*',
    role: 'Where the work happens',
    detail:
      'Short-lived. Branch off develop, one branch per ticket, rebase often, delete after merge.',
    color: 'from-emerald-400 to-teal-500',
    from: 'develop',
    protected: false,
  },
  {
    name: 'develop',
    role: 'Integration branch',
    detail: 'Everything merges here first via PR. CI runs lint + build on every pull request.',
    color: 'from-sky-400 to-brand-500',
    from: 'feature/*',
    protected: true,
  },
  {
    name: 'staging',
    role: 'Release candidate',
    detail:
      'Cut from develop when a release is ready. Only fixes land here — QA and UAT run against it.',
    color: 'from-amber-400 to-orange-500',
    from: 'develop',
    protected: true,
  },
  {
    name: 'main',
    role: 'Production',
    detail: 'Always deployable. Merging here triggers the GitHub Pages deploy. Tag every release.',
    color: 'from-fuchsia-500 to-rose-500',
    from: 'staging',
    protected: true,
  },
]

export const scripts = [
  { cmd: 'npm run dev', desc: 'Vite dev server with hot module replacement' },
  { cmd: 'npm run build', desc: 'Production build into dist/' },
  { cmd: 'npm run preview', desc: 'Serve the production build locally' },
  { cmd: 'npm run lint', desc: 'ESLint across the repo, zero warnings tolerated' },
  { cmd: 'npm run lint:fix', desc: 'ESLint with autofix' },
  { cmd: 'npm run format', desc: 'Rewrite files with Prettier' },
  { cmd: 'npm run format:check', desc: 'Fail if anything is unformatted (used in CI)' },
  { cmd: 'npm run verify', desc: 'format:check + lint + build — the same gate CI runs' },
]

export const resources = [
  {
    group: 'Core stack',
    links: [
      {
        name: 'React docs',
        href: 'https://react.dev/learn',
        note: 'The rewritten, hooks-first docs',
      },
      {
        name: 'Vite guide',
        href: 'https://vite.dev/guide/',
        note: 'Config, env vars, static assets',
      },
      {
        name: 'Tailwind CSS v4',
        href: 'https://tailwindcss.com/docs',
        note: 'CSS-first config and @theme',
      },
      {
        name: 'React Router v8',
        href: 'https://reactrouter.com/home',
        note: "Installed and ready — import from 'react-router'",
      },
    ],
  },
  {
    group: 'Code quality',
    links: [
      {
        name: 'ESLint flat config',
        href: 'https://eslint.org/docs/latest/use/configure/',
        note: 'How eslint.config.js works',
      },
      {
        name: 'Prettier options',
        href: 'https://prettier.io/docs/en/options',
        note: 'Everything in .prettierrc',
      },
      {
        name: 'Husky',
        href: 'https://typicode.github.io/husky/',
        note: 'Git hooks that survive a fresh clone',
      },
      {
        name: 'lint-staged',
        href: 'https://github.com/lint-staged/lint-staged',
        note: 'Run linters on staged files only',
      },
    ],
  },
  {
    group: 'Workflow',
    links: [
      {
        name: 'Conventional Commits',
        href: 'https://www.conventionalcommits.org/',
        note: 'The commit format the hook enforces',
      },
      {
        name: 'Semantic Versioning',
        href: 'https://semver.org/',
        note: 'How to tag releases from main',
      },
      {
        name: 'GitHub Flow vs Git Flow',
        href: 'https://docs.github.com/en/get-started/using-github/github-flow',
        note: 'Context for the 4-branch model',
      },
      {
        name: 'Signing commits',
        href: 'https://docs.github.com/en/authentication/managing-commit-signature-verification',
        note: 'GPG / SSH verified commits',
      },
    ],
  },
]
