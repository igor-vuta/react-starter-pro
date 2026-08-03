import Cite from '../components/Cite'
import CodeBlock from '../components/CodeBlock'
import Figure from '../components/Figure'
import Note from '../components/Note'
import Section from '../components/Section'
import Subsection from '../components/Subsection'
import Table from '../components/Table'

const code = (text) => <code>{text}</code>

export default function Architecture() {
  return (
    <Section
      id="architecture"
      number="2"
      title="System architecture"
      lead="The build pipeline, the dependencies and why each is present, the source layout, and how styling is organised."
    >
      <Subsection id="pipeline" number="2.1" title="The build pipeline">
        <p>
          Vite operates in two distinct modes, and understanding the split explains most of its
          behaviour.
          <Cite n={2} /> In development it does not bundle: it serves source files over native ES
          modules, transforming each one on demand with esbuild as the browser requests it. Start-up
          time is therefore roughly independent of project size, and an edit invalidates one module
          rather than a bundle. In production it does bundle, with Rollup, because hundreds of
          unbundled module requests over a network is a poor delivery strategy.
        </p>

        <Figure
          number="1"
          mono
          caption="The two modes of the build pipeline. The development path optimises for feedback latency; the production path optimises for delivery. Both consume the same source tree, which is why what runs locally and what ships cannot diverge structurally."
        >
          {`  DEVELOPMENT  (npm run dev)
  ┌──────────┐   request    ┌───────────┐   native ESM   ┌─────────┐
  │  source  │ ───────────▶ │  esbuild  │ ─────────────▶ │ browser │
  │  *.jsx   │ ◀─────────── │ transform │    HMR patch   │         │
  └──────────┘   invalidate └───────────┘                └─────────┘
        │                    no bundling — per-module, on demand
        │
        ▼
  PRODUCTION  (npm run build)
  ┌──────────┐   ┌────────────┐   ┌──────────────┐   ┌──────────────┐
  │  source  │──▶│   Rollup   │──▶│  tree-shake  │──▶│    dist/     │
  │  + CSS   │   │   bundle   │   │  minify      │   │ hashed asset │
  └──────────┘   └────────────┘   └──────────────┘   └──────────────┘
                        │
                        └── Tailwind scans sources, emits only used utilities`}
        </Figure>

        <p>
          One consequence deserves emphasis because it causes a recurring class of bug: the
          production bundle is the artefact that ships, and it is not what you were looking at
          during development. Module resolution, environment variables, and the public base path all
          behave differently. <code>npm&nbsp;run&nbsp;preview</code> serves the built output over
          HTTP for exactly this reason, and it is the only way to catch a base-path error before it
          reaches a live site (§<a href="#extending">5.4</a>).
        </p>
      </Subsection>

      <Subsection id="dependencies" number="2.2" title="Dependency inventory">
        <p>
          A dependency is a permanent obligation: it must be updated, audited, and eventually
          replaced. The list is therefore short, and each entry below states what would break if it
          were removed.
        </p>

        <Table
          number="1"
          caption="Runtime and development dependencies, with the justification for each. Anything that could not be justified in one sentence was not included."
          columns={['Package', 'Role', 'Why it is present']}
          rows={[
            [
              code('react'),
              'Runtime',
              'The component model and reconciler. React 19 is used for the stable Actions and form hooks, and for ref-as-prop.',
            ],
            [
              code('react-dom'),
              'Runtime',
              'The browser renderer. Separate from react because React targets more than the DOM.',
            ],
            [
              code('react-router'),
              'Runtime',
              'Client-side routing, installed but unused so that adding a second page is a five-line change rather than a dependency decision. v8 merges the former react-router-dom into one package.',
            ],
            [code('vite'), 'Build', 'Development server and production bundler. See §2.1.'],
            [
              code('@vitejs/plugin-react'),
              'Build',
              'JSX transformation and React Fast Refresh wiring for Vite.',
            ],
            [
              code('tailwindcss'),
              'Build',
              'The utility engine. In v4 it is driven from CSS; there is no JavaScript config file.',
            ],
            [
              code('@tailwindcss/vite'),
              'Build',
              'First-party Vite integration, which is faster than routing Tailwind through PostCSS.',
            ],
            [
              code('eslint'),
              'Quality',
              'Static analysis. Configured as flat config in eslint.config.js (§3.3).',
            ],
            [
              code('eslint-plugin-react-hooks'),
              'Quality',
              'Enforces the Rules of Hooks, which are correctness constraints rather than style preferences.',
            ],
            [
              code('eslint-plugin-react-refresh'),
              'Quality',
              'Warns when a module’s exports would silently disable fast refresh for that file.',
            ],
            [
              code('eslint-config-prettier'),
              'Quality',
              'Disables every ESLint rule that expresses a formatting opinion. The mechanism behind §3.1.',
            ],
            [code('prettier'), 'Quality', 'The single formatting authority.'],
            [
              code('husky'),
              'Automation',
              'Version-controlled Git hooks that survive a fresh clone.',
            ],
            [
              code('lint-staged'),
              'Automation',
              'Restricts commit-time work to staged files, keeping the hook fast enough not to be bypassed.',
            ],
            [
              code('@commitlint/*'),
              'Automation',
              'Validates commit messages against the Conventional Commits grammar (§3.5).',
            ],
            [
              code('@babel/eslint-parser'),
              'Quality',
              'Lets ESLint parse JSX without requiring TypeScript. Removable if the project migrates (D2).',
            ],
          ]}
        />

        <Note label="A worked example of dependency risk">
          <p>
            During the preparation of this template, <code>react-router-dom</code> carried a
            high-severity advisory affecting release-candidate versions in its 7.x line, with no
            fixed version available within that range. The advisory concerned a mode the template
            does not use, so the exposure was nil — but a permanently unresolvable{' '}
            <code>npm&nbsp;audit</code> warning is itself a defect, because it teaches the team to
            ignore audit output. The resolution was to move to <code>react-router</code> v8, where
            the package was consolidated and the advisory does not apply. The general lesson: an
            unfixable warning must be either resolved or explicitly recorded, never simply
            tolerated.
          </p>
        </Note>
      </Subsection>

      <Subsection id="layout" number="2.3" title="Source layout and conventions">
        <p>
          The layout is shallow on purpose. Deep hierarchies force a categorisation decision on
          every new file, and in a small application that decision carries no information.
        </p>

        <CodeBlock
          label="src/"
          caption="Listing 1. The source tree. Components are grouped by kind rather than by feature, which is appropriate up to roughly thirty components; beyond that, group by feature and keep this structure inside each feature directory."
          code={`src/
├── components/          reusable presentation units, one per file
│   ├── Section.jsx      PascalCase name, default export
│   ├── Table.jsx
│   └── …
├── sections/            the sections of this document, in reading order
│   ├── Introduction.jsx
│   └── …
├── data/                content and configuration, kept out of markup
│   └── document.js      outline, references, glossary, command list
├── hooks/               reusable behaviour, named useX, named exports
│   ├── useTheme.js
│   └── useActiveSection.js
├── App.jsx              composition only — no logic of its own
├── main.jsx             the React root
└── index.css            Tailwind import, @theme tokens, document typography`}
        />

        <p>
          Four conventions are worth stating because they are enforced by review rather than
          tooling:
        </p>
        <ol>
          <li>
            <strong>One component per file, named in PascalCase, default-exported.</strong> The file
            name is the component name, so a stack trace names a file.
          </li>
          <li>
            <strong>Hooks are named exports.</strong> The distinction from components is visible at
            the import site, and it keeps the react-refresh rule satisfied.
          </li>
          <li>
            <strong>
              Prose and link data live in <code>src/data/</code>.
            </strong>{' '}
            Editing a sentence should not require reading JSX, and the same data can drive two views
            — the table of contents and the section headings both derive from one outline.
          </li>
          <li>
            <strong>No barrel files.</strong> An <code>index.js</code> that re-exports a directory
            obscures where a symbol is defined and defeats tree-shaking for marginal convenience.
          </li>
        </ol>
      </Subsection>

      <Subsection id="styling" number="2.4" title="Styling architecture">
        <p>
          Tailwind v4 inverts its predecessor&rsquo;s configuration model: the theme is declared in
          CSS, in an <code>@theme</code> block, and every custom property declared there becomes a
          utility class.
          <Cite n={3} /> There is no <code>tailwind.config.js</code> in this repository, and adding
          one has no effect — a point worth internalising, because muscle memory from v3 leads
          people to create one and then debug why it is ignored.
        </p>

        <CodeBlock
          label="src/index.css"
          caption="Listing 2. Declaring a design token. The custom property name determines the generated utilities; --color-accent yields text-accent, bg-accent, border-accent and their opacity modifiers."
          code={`@theme {
  --color-accent: #8a2b2b;              /* → text-accent, bg-accent, … */
  --font-serif: 'Source Serif 4', Georgia, serif;
}`}
        />

        <p>Styles are placed at one of three levels, and the level is a deliberate choice:</p>
        <dl>
          <dt>Utilities in markup — the default</dt>
          <dd>
            One-off layout and spacing. Co-locating them with the element keeps the change local and
            makes deletion safe.
          </dd>

          <dt>
            <code>@layer components</code> — for repetition
          </dt>
          <dd>
            When the same cluster of utilities appears in three or more places, it is extracted (
            <code>.label</code>, <code>.rule</code>). This is a threshold, not a preference:
            extracting earlier creates indirection with no payoff.
          </dd>

          <dt>
            Element styling under <code>.article</code> — for prose
          </dt>
          <dd>
            The document body is authored as semantic HTML and styled once by element. Requiring
            three utility classes on every paragraph of a long document would make the prose
            unreadable in source, which is where it is edited.
          </dd>
        </dl>

        <h4>Dark mode and the flash problem</h4>
        <p>
          The theme is toggled by a class on <code>&lt;html&gt;</code> rather than by the{' '}
          <code>prefers-color-scheme</code> media query, so that an explicit choice can override the
          operating system:
        </p>
        <CodeBlock code={`@custom-variant dark (&:where(.dark, .dark *));`} />
        <p>
          This introduces a problem. The stored preference lives in <code>localStorage</code>, which
          React can only read after its bundle has loaded and executed — several hundred
          milliseconds during which a reader who chose dark sees a white page. The fix is a small
          synchronous script in <code>index.html</code> that applies the class before the browser
          paints. It is duplicated logic, and it is justified: it is the only place in the
          application where execution order relative to first paint matters.
        </p>
        <CodeBlock
          label="index.html"
          caption="Listing 3. Applying the stored theme before first paint. The script is intentionally blocking; deferring it would reintroduce the flash it exists to prevent."
          code={`<script>
  try {
    const stored = localStorage.getItem('rsp-theme')
    const dark = stored === 'dark' ||
      (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)
    document.documentElement.classList.toggle('dark', dark)
  } catch {
    // Private browsing can throw on localStorage; useTheme settles it later.
  }
</script>`}
        />
      </Subsection>
    </Section>
  )
}
