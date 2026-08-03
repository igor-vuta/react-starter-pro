import Cite from '../components/Cite'
import CodeBlock from '../components/CodeBlock'
import Note from '../components/Note'
import Section from '../components/Section'
import Subsection from '../components/Subsection'
import Table from '../components/Table'
import { commands } from '../data/document'

export default function Usage() {
  return (
    <Section
      id="usage"
      number="5"
      title="Operating the template"
      lead="The practical guide: installation, the loop you will repeat every day, the full command reference, and how to extend the template without fighting it."
    >
      <Subsection id="installation" number="5.1" title="Installation">
        <p>
          The prerequisites are Node 20 or newer — pinned in <code>.nvmrc</code> and read by CI —
          and npm. The repository uses npm and <code>package-lock.json</code>; introducing a second
          package manager produces a second lockfile and breaks <code>npm&nbsp;ci</code> in the
          workflow.
        </p>

        <CodeBlock
          label="bash"
          caption="Listing 10. Installation. npm install also runs the prepare script, which installs the Git hooks — the first commit in a fresh clone is already governed."
          code={`npx degit igor-vuta/react-starter-pro my-app
cd my-app

npm install     # dependencies, and the Git hooks
npm run dev     # http://localhost:5173`}
        />

        <p>
          <code>degit</code> copies the tree without its Git history, which is what you want for a
          template — the alternative, <code>git&nbsp;clone</code>, leaves you committing onto
          someone else&rsquo;s history. Verify that the hooks were installed:{' '}
          <code>git&nbsp;config&nbsp;core.hooksPath</code> should print <code>.husky/_</code>. If
          the repository was installed with <code>--ignore-scripts</code>, run{' '}
          <code>npx husky</code> once.
        </p>
      </Subsection>

      <Subsection id="daily-loop" number="5.2" title="The daily loop">
        <p>
          Almost all work follows one shape. It is worth reading once as a whole, because each step
          exists to make a later step cheap.
        </p>

        <CodeBlock
          label="bash"
          caption="Listing 11. The complete change cycle, annotated. Steps 1 and 2 keep integration cheap; step 4 makes CI predictable; step 5 is the only point at which a human other than you is involved."
          code={`# 1. Start from an up-to-date integration branch
git switch develop && git pull --ff-only

# 2. One branch per unit of work
git switch -c feat/pricing-table

# 3. Work. The dev server hot-reloads; Prettier runs on save.
npm run dev

# 4. Run the exact gate CI will run
npm run verify

# 5. Commit — hooks format, lint, and validate the message
git add .
git commit -m "feat(pricing): add the comparison table"

# 6. Push and open a pull request against develop
git push -u origin feat/pricing-table
gh pr create --base develop --fill`}
        />

        <p>
          When a commit is rejected, the hook output states which of the two gates failed. An ESLint
          error names a file and a rule; a commitlint failure names the rule from §
          <a href="#commitlint">3.5</a> that the message violated. Neither requires investigation
          beyond reading the message.
        </p>
      </Subsection>

      <Subsection id="commands" number="5.3" title="Command reference">
        <Table
          number="7"
          caption="Every script defined in package.json, with the circumstance in which it is the right one to run. In routine work only dev, verify, and occasionally preview are needed."
          columns={['Command', 'Effect', 'When']}
          rows={commands.map((entry) => [
            <code key={entry.cmd}>{entry.cmd}</code>,
            entry.desc,
            entry.when,
          ])}
        />

        <Note label="The one command worth memorising">
          <p>
            <code>npm&nbsp;run&nbsp;verify</code> is <code>format:check</code>, then{' '}
            <code>lint</code>, then <code>build</code> — byte-for-byte what the continuous-
            integration job executes. Running it before pushing converts a five-minute round trip
            through CI into a thirty-second local check, which is the entire argument for §
            <a href="#ci">3.6</a> in one line.
          </p>
        </Note>
      </Subsection>

      <Subsection id="extending" number="5.4" title="Extending the template">
        <h4>Adding routes</h4>
        <p>
          React Router v8 is installed; import from <code>react-router</code>, as the former{' '}
          <code>react-router-dom</code> package was consolidated into it.
          <Cite n={13} />
        </p>
        <CodeBlock
          label="src/main.jsx"
          caption="Listing 12. The basename is not optional when the site is served from a subpath — omitting it produces a router that matches no route in production while working correctly in development."
          code={`import { BrowserRouter, Routes, Route } from 'react-router'

createRoot(document.getElementById('root')).render(
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </BrowserRouter>
)`}
        />

        <h4>Environment variables</h4>
        <p>
          Vite exposes only variables prefixed <code>VITE_</code>, read through{' '}
          <code>import.meta.env</code>. The prefix is a safety boundary, and it is worth stating
          plainly:{' '}
          <strong>
            anything so prefixed is inlined into the client bundle and is publicly readable.
          </strong>{' '}
          A secret placed there is a published secret. Server-side credentials belong to a server.
        </p>

        <h4>Deployment and the base path</h4>
        <p>
          <code>vite.config.js</code> sets <code>base:&nbsp;&apos;/react-starter-pro/&apos;</code>{' '}
          because GitHub Pages serves project sites from a subpath. Deploying to a root domain
          without changing this to <code>&apos;/&apos;</code> yields a blank page and asset requests
          that 404 — the single most common failure when adapting this template.
        </p>

        <h4>What to add, and when</h4>
        <Table
          number="8"
          caption="Conventional next dependencies. Each is omitted from the template because the right choice depends on requirements the template cannot know; none is difficult to add once the requirement is real."
          columns={['Requirement', 'Conventional choice']}
          rows={[
            ['Unit and component tests', 'Vitest with React Testing Library'],
            ['End-to-end tests', 'Playwright'],
            ['Server state and caching', 'TanStack Query'],
            [
              'Global client state',
              'Zustand — after useState and context are demonstrably insufficient',
            ],
            ['Forms and validation', 'React Hook Form with Zod'],
            ['Accessible interactive primitives', 'Radix Primitives or Headless UI'],
            ['Static types', 'TypeScript — @types/react is already installed'],
          ]}
        />
      </Subsection>
    </Section>
  )
}
