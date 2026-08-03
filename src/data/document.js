export const REPO_URL = 'https://github.com/igor-vuta/react-starter-pro'

export const meta = {
  title: 'React Starter Pro',
  subtitle:
    'A specification and rationale for an opinionated React application template, its code-quality toolchain, and its four-branch integration model',
  version: '1.0.0',
  license: 'MIT',
  revised: 'August 2026',
}

/**
 * Section registry. `Contents` renders the table of contents from this, and
 * `useActiveSection` observes the same ids — so adding a section here and
 * giving the component a matching id is all that is required.
 */
export const outline = [
  {
    number: '1',
    id: 'introduction',
    title: 'Introduction',
    children: [
      { number: '1.1', id: 'problem', title: 'The cost of a blank repository' },
      { number: '1.2', id: 'thesis', title: 'What this template claims' },
      { number: '1.3', id: 'scope', title: 'Scope and non-goals' },
    ],
  },
  {
    number: '2',
    id: 'architecture',
    title: 'System architecture',
    children: [
      { number: '2.1', id: 'pipeline', title: 'The build pipeline' },
      { number: '2.2', id: 'dependencies', title: 'Dependency inventory' },
      { number: '2.3', id: 'layout', title: 'Source layout and conventions' },
      { number: '2.4', id: 'styling', title: 'Styling architecture' },
    ],
  },
  {
    number: '3',
    id: 'toolchain',
    title: 'The code-quality toolchain',
    children: [
      { number: '3.1', id: 'separation', title: 'A principle of separation' },
      { number: '3.2', id: 'prettier', title: 'Formatting: Prettier' },
      { number: '3.3', id: 'eslint', title: 'Static analysis: ESLint' },
      { number: '3.4', id: 'hooks', title: 'Enforcement: Husky and lint-staged' },
      { number: '3.5', id: 'commitlint', title: 'History: commitlint' },
      { number: '3.6', id: 'ci', title: 'Verification: continuous integration' },
    ],
  },
  {
    number: '4',
    id: 'branching',
    title: 'The four-branch integration model',
    children: [
      { number: '4.1', id: 'why-model', title: 'Why a branching model is necessary' },
      { number: '4.2', id: 'alternatives', title: 'Alternatives considered' },
      { number: '4.3', id: 'branches', title: 'Definition of the branches' },
      { number: '4.4', id: 'promotion', title: 'The promotion protocol' },
      { number: '4.5', id: 'hotfix', title: 'Hotfixes and the back-merge obligation' },
      { number: '4.6', id: 'merge-strategy', title: 'Merge strategy per edge' },
      { number: '4.7', id: 'protection', title: 'Branch protection' },
      { number: '4.8', id: 'solo', title: 'The degenerate case: working alone' },
    ],
  },
  {
    number: '5',
    id: 'usage',
    title: 'Operating the template',
    children: [
      { number: '5.1', id: 'installation', title: 'Installation' },
      { number: '5.2', id: 'daily-loop', title: 'The daily loop' },
      { number: '5.3', id: 'commands', title: 'Command reference' },
      { number: '5.4', id: 'extending', title: 'Extending the template' },
    ],
  },
  { number: '6', id: 'decisions', title: 'Design decisions and trade-offs' },
  { number: '7', id: 'limitations', title: 'Limitations' },
  { number: '8', id: 'references', title: 'References' },
  { number: 'A', id: 'appendix-glossary', title: 'Appendix A. Glossary' },
]

export const references = [
  {
    id: 1,
    text: 'Meta Open Source. React documentation.',
    href: 'https://react.dev/learn',
  },
  {
    id: 2,
    text: 'Evan You et al. Vite — Next Generation Frontend Tooling.',
    href: 'https://vite.dev/guide/',
  },
  {
    id: 3,
    text: 'Tailwind Labs. Tailwind CSS v4 documentation — theme variables.',
    href: 'https://tailwindcss.com/docs/theme',
  },
  {
    id: 4,
    text: 'OpenJS Foundation. ESLint — configuration files (flat config).',
    href: 'https://eslint.org/docs/latest/use/configure/',
  },
  {
    id: 5,
    text: 'Prettier. Integrating with linters.',
    href: 'https://prettier.io/docs/en/integrating-with-linters',
  },
  {
    id: 6,
    text: 'typicode. Husky — modern native Git hooks.',
    href: 'https://typicode.github.io/husky/',
  },
  {
    id: 7,
    text: 'Conventional Commits 1.0.0 specification.',
    href: 'https://www.conventionalcommits.org/en/v1.0.0/',
  },
  {
    id: 8,
    text: 'Preston-Werner, T. Semantic Versioning 2.0.0.',
    href: 'https://semver.org/',
  },
  {
    id: 9,
    text: 'Driessen, V. A successful Git branching model (2010) — the original Git Flow.',
    href: 'https://nvie.com/posts/a-successful-git-branching-model/',
  },
  {
    id: 10,
    text: 'GitHub. Understanding the GitHub flow.',
    href: 'https://docs.github.com/en/get-started/using-github/github-flow',
  },
  {
    id: 11,
    text: 'Hammant, P. Trunk Based Development.',
    href: 'https://trunkbaseddevelopment.com/',
  },
  {
    id: 12,
    text: 'Fowler, M. Continuous Integration (2006).',
    href: 'https://martinfowler.com/articles/continuousIntegration.html',
  },
  {
    id: 13,
    text: 'React Router documentation (v8).',
    href: 'https://reactrouter.com/home',
  },
  {
    id: 14,
    text: 'React. You Might Not Need an Effect.',
    href: 'https://react.dev/learn/you-might-not-need-an-effect',
  },
  {
    id: 15,
    text: 'GitHub. About protected branches.',
    href: 'https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches',
  },
  {
    id: 16,
    text: 'W3C. Web Content Accessibility Guidelines (WCAG) 2.2 quick reference.',
    href: 'https://www.w3.org/WAI/WCAG22/quickref/',
  },
]

export const glossary = [
  {
    term: 'Back-merge',
    definition:
      'Merging a downstream branch into an upstream one — here, merging main into staging and develop after a hotfix, so the fix is not reverted by the next release.',
  },
  {
    term: 'Fast refresh',
    definition:
      'Vite and React preserving component state across an edit. It only works when a module exports components exclusively, which is what the react-refresh lint rule protects.',
  },
  {
    term: 'Flat config',
    definition:
      'The ESLint 9 configuration format: an exported array of configuration objects applied in order, replacing the cascading .eslintrc system.',
  },
  {
    term: 'FOUC',
    definition:
      'Flash of unstyled (or wrongly themed) content — the brief moment before styles or a stored theme preference are applied. Avoided here by a blocking inline script.',
  },
  {
    term: 'Promotion',
    definition:
      'Moving a change from one long-lived branch to the next stage of the pipeline via a reviewed pull request, rather than by direct commit.',
  },
  {
    term: 'Release candidate',
    definition:
      'A build believed to be shippable, held on staging for verification. Only defect fixes are accepted onto it.',
  },
  {
    term: 'Squash merge',
    definition:
      'Collapsing every commit on a branch into a single commit on the target branch. Used for feature branches so develop reads as one commit per unit of work.',
  },
  {
    term: 'Staged files',
    definition:
      'Files added to the Git index and about to be committed. lint-staged restricts its work to exactly this set.',
  },
]

export const commands = [
  {
    cmd: 'npm run dev',
    desc: 'Start the Vite development server with hot module replacement.',
    when: 'While writing code.',
  },
  {
    cmd: 'npm run build',
    desc: 'Produce an optimised production bundle in dist/.',
    when: 'Before deploying; part of verify.',
  },
  {
    cmd: 'npm run preview',
    desc: 'Serve the built bundle locally over HTTP.',
    when: 'To test the real artefact, including the base path.',
  },
  {
    cmd: 'npm run lint',
    desc: 'Run ESLint over the repository. Fails on warnings.',
    when: 'Before pushing; part of verify.',
  },
  {
    cmd: 'npm run lint:fix',
    desc: 'Run ESLint with autofix applied.',
    when: 'After a large refactor.',
  },
  {
    cmd: 'npm run format',
    desc: 'Rewrite all files with Prettier.',
    when: 'Rarely — the commit hook does this for you.',
  },
  {
    cmd: 'npm run format:check',
    desc: 'Fail if any file is unformatted, changing nothing.',
    when: 'In CI; part of verify.',
  },
  {
    cmd: 'npm run verify',
    desc: 'format:check, then lint, then build.',
    when: 'Before every push. Identical to the CI gate.',
  },
]
