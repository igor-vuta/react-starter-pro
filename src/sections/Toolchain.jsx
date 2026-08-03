import Cite from '../components/Cite'
import CodeBlock from '../components/CodeBlock'
import Figure from '../components/Figure'
import Note from '../components/Note'
import Section from '../components/Section'
import Subsection from '../components/Subsection'
import Table from '../components/Table'

const code = (text) => <code>{text}</code>

export default function Toolchain() {
  return (
    <Section
      id="toolchain"
      number="3"
      title="The code-quality toolchain"
      lead="Four tools and one continuous-integration workflow, each derived from a single principle: one tool, one question."
    >
      <Subsection id="separation" number="3.1" title="A principle of separation">
        <p>
          Most quality-tooling pain comes from overlap. Two tools with an opinion about the same
          text will disagree eventually, and when they do the result is not a decision but a race —
          whichever ran last wins, and the file changes back and forth depending on who committed.
          The template therefore assigns each tool exactly one question and removes its authority
          everywhere else.
        </p>

        <Table
          number="2"
          caption="The division of responsibility. The rightmost column is the question each tool is permitted to answer; nothing else in the toolchain may answer that question."
          columns={['Tool', 'Runs at', 'The one question it answers']}
          rows={[
            [code('prettier'), 'Save, and pre-commit', 'How should this code look?'],
            [code('eslint'), 'Pre-commit, and CI', 'Is this code correct and idiomatic?'],
            [code('commitlint'), 'commit-msg', 'Is this history legible?'],
            [code('vite build'), 'CI', 'Does this actually compile?'],
          ]}
        />

        <p>
          The separation is enforced mechanically rather than by convention.{' '}
          <code>eslint-config-prettier</code> is a configuration object that switches off every
          ESLint rule expressing a formatting opinion, and it is placed <strong>last</strong> in the
          flat-config array so that it overrides everything before it.
          <Cite n={5} /> Order is load-bearing: moved earlier, a later preset re-enables the rules
          it disabled, and the two tools begin fighting again with no visible cause.
        </p>
      </Subsection>

      <Subsection id="prettier" number="3.2" title="Formatting: Prettier">
        <h4>What it does</h4>
        <p>
          Prettier discards the formatting of the source and re-prints it from the syntax tree
          according to a small, fixed set of options. Its output is a function of the code, not of
          the author.
        </p>

        <h4>Why it is non-negotiable</h4>
        <p>
          The argument for an automatic formatter is not that its style is superior — it is that
          formatting ceases to be a topic. Time spent discussing brace placement in review is time
          not spent discussing whether the code is right, and unlike brace placement, correctness
          cannot be delegated to a tool. A secondary benefit compounds: because output is
          deterministic, diffs contain only semantic change, so <code>git blame</code> keeps
          pointing at the commit that changed behaviour rather than the one that reflowed a line.
        </p>

        <CodeBlock
          label=".prettierrc"
          caption="Listing 4. The complete formatting configuration. The specific values matter far less than their being fixed — a project that agrees on 80 columns rather than 100 loses nothing, provided it stops discussing it."
          code={`{
  "semi": false,
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "trailingComma": "es5"
}`}
        />

        <h4>How to use it</h4>
        <p>
          Enable format-on-save in your editor and then forget the tool exists. If formatting ever
          appears in a code review, an editor is misconfigured — that is a setup bug, not a style
          disagreement. <code>npm&nbsp;run&nbsp;format</code> rewrites the tree;{' '}
          <code>npm&nbsp;run&nbsp;format:check</code> reports without writing and is what CI runs.
        </p>
      </Subsection>

      <Subsection id="eslint" number="3.3" title="Static analysis: ESLint">
        <p>
          Where Prettier asks how code looks, ESLint asks whether it is right. The configuration
          uses the ESLint 9 flat format: an exported array of configuration objects, applied in
          order, with later entries overriding earlier ones.
          <Cite n={4} /> The ordering is the design.
        </p>

        <CodeBlock
          label="eslint.config.js (structure)"
          caption="Listing 5. The configuration is read top to bottom and the last matching entry wins, which is why the Prettier compatibility layer is placed at the end."
          code={`export default [
  { ignores: ['dist/**', 'node_modules/**'] },   // 1. never lint build output
  js.configs.recommended,                        // 2. core correctness rules
  { files: ['**/*.{js,jsx}'], /* … */ },         // 3. React, hooks, browser globals
  { files: ['*.config.js'], /* … */ },           // 4. Node globals for config files
  prettier,                                      // 5. LAST — disable style rules
]`}
        />

        <p>
          Rules were selected against one test:{' '}
          <em>would a violation plausibly become a defect, or is it merely a matter of taste?</em>{' '}
          Taste is Prettier&rsquo;s domain and was excluded.
        </p>

        <Table
          number="3"
          caption="Selected rules and their justification. The React prop-types rule is disabled deliberately — runtime type checks in a codebase that has chosen not to adopt static types provide little and cost ceremony on every component."
          columns={['Rule', 'Level', 'Justification']}
          rows={[
            [
              code('react-hooks/rules-of-hooks'),
              'error',
              'A conditionally called hook desynchronises React’s internal state ordering. This is a defect class, not a preference.',
            ],
            [
              code('react-hooks/exhaustive-deps'),
              'warn',
              'A missing dependency produces a stale closure — a bug that reproduces intermittently and is expensive to find. A warning rather than an error because a minority of suppressions are legitimate.',
            ],
            [
              code('react-refresh/only-export-components'),
              'warn',
              'Mixing component and non-component exports silently disables fast refresh for the module, degrading the development loop with no error.',
            ],
            [
              code('no-unused-vars'),
              'error',
              'Usually the residue of an incomplete edit. Names prefixed with _ are exempt, which keeps intentional placeholders expressible.',
            ],
            [
              code('no-console'),
              'warn',
              'Debug output that reaches production is noise; console.warn and console.error are permitted because they are deliberate.',
            ],
            [code('prefer-const'), 'error', 'A binding that is never reassigned should say so.'],
            [
              code('eqeqeq'),
              'error',
              'Loose equality follows coercion rules almost nobody has memorised correctly.',
            ],
            [
              code('react/prop-types'),
              'off',
              'Deliberate. See D2 in §6 for the position on typing.',
            ],
          ]}
        />

        <h4>Why warnings fail the build</h4>
        <p>
          <code>npm&nbsp;run&nbsp;lint</code> runs with <code>--max-warnings=0</code>, so a warning
          fails exactly as an error does. This appears severe and is a response to an observable
          failure mode: a warning that nobody is required to fix is a warning that accumulates. Once
          the count passes some threshold — in practice a screenful — the output stops being read,
          and at that point every rule in the configuration is effectively disabled while appearing
          enabled. Zero is the only stable count.
        </p>
        <p>
          The escape hatch is a targeted suppression with a stated reason, which converts an ignored
          warning into a reviewable decision:
        </p>
        <CodeBlock
          code={`// eslint-disable-next-line react-hooks/exhaustive-deps -- mount only; deps would re-subscribe
useEffect(() => subscribe(), [])`}
        />
      </Subsection>

      <Subsection id="hooks" number="3.4" title="Enforcement: Husky and lint-staged">
        <p>
          Configuration that must be remembered is not enforcement. Husky makes the hooks part of
          the repository: it sets <code>core.hooksPath</code> to the tracked <code>.husky/</code>{' '}
          directory, so a fresh clone acquires the hooks during <code>npm&nbsp;install</code> via
          the <code>prepare</code> script, with no per-developer setup step to forget.
          <Cite n={6} />
        </p>

        <CodeBlock label=".husky/pre-commit" code={`npx --no-install lint-staged`} />

        <p>
          lint-staged then restricts all work to the files in the Git index. This is a performance
          decision with a behavioural purpose: a hook that takes twenty seconds will be bypassed
          with <code>--no-verify</code> within a week, and a bypassed hook enforces nothing. Scoping
          to staged files keeps the commit-time cost proportional to the size of the change rather
          than the size of the repository.
        </p>

        <CodeBlock
          label="package.json"
          caption="Listing 6. Files rewritten by Prettier or fixed by ESLint are re-staged automatically, so the committed content is always the corrected content. A commit is rejected only when ESLint finds something it cannot fix — which is the only case where a human is actually needed."
          code={`"lint-staged": {
  "*.{js,jsx,ts,tsx}": ["prettier --write", "eslint --fix --max-warnings=0"],
  "*.{css,html,json,md,yml,yaml}": ["prettier --write"]
}`}
        />

        <Note label="On bypassing the hooks">
          <p>
            <code>git commit --no-verify</code> is legitimate for a checkpoint commit on a private
            branch that will be squashed before review. It is not a route into a pull request: CI
            runs the same checks against the merge, so bypassing locally defers the failure rather
            than avoiding it. The hooks are a fast local mirror of CI, not a second, weaker
            authority.
          </p>
        </Note>
      </Subsection>

      <Subsection id="commitlint" number="3.5" title="History: commitlint">
        <p>
          A commit message is the only durable explanation of <em>why</em> a change was made; the
          diff already shows what. The <code>commit-msg</code> hook validates each message against
          the Conventional Commits grammar
          <Cite n={7} />:
        </p>

        <CodeBlock
          caption="Listing 7. The grammar. The type is drawn from a closed set; scope is optional; a trailing ! or a BREAKING CHANGE footer marks an incompatible change."
          code={`type(optional scope): subject

optional body

optional footer

feat(document): add the design-decision register
fix: prevent the contents column from overlapping the article
docs(branching): describe the hotfix back-merge obligation
chore(deps): replace react-router-dom with react-router 8`}
        />

        <p>Three benefits justify the constraint, and they are cumulative:</p>
        <ol>
          <li>
            <strong>The log becomes scannable.</strong> A structured prefix lets a reader filter six
            months of history to the fixes, or to one subsystem, without reading every subject line.
          </li>
          <li>
            <strong>Releases can be derived rather than assembled.</strong> Types map onto semantic
            versioning — <code>fix</code> to patch, <code>feat</code> to minor,{' '}
            <code>BREAKING&nbsp;CHANGE</code> to major — so a changelog is generated from history
            instead of remembered at release time.
            <Cite n={8} />
          </li>
          <li>
            <strong>It forces a small act of framing.</strong> Choosing between <code>fix</code> and{' '}
            <code>refactor</code> requires deciding what the change actually is, which is a useful
            thirty seconds.
          </li>
        </ol>

        <p>
          The rules enforced are: a type from the closed set (<code>feat</code>, <code>fix</code>,{' '}
          <code>docs</code>, <code>style</code>, <code>refactor</code>, <code>perf</code>,{' '}
          <code>test</code>, <code>build</code>, <code>ci</code>, <code>chore</code>,{' '}
          <code>revert</code>); a subject that is not Start-Case, PascalCase or UPPERCASE; and a
          header of at most 100 characters, which is the width at which most interfaces truncate.
        </p>
      </Subsection>

      <Subsection id="ci" number="3.6" title="Verification: continuous integration">
        <p>
          Local hooks are fast and defeatable. Continuous integration is slow and authoritative. The
          template runs the same checks in both places, and the duplication is the point: the hook
          gives a developer an answer in seconds, and CI gives the repository an answer that cannot
          be skipped.
          <Cite n={12} />
        </p>

        <Figure
          number="2"
          mono
          caption="The three gates and their latencies. Each is a superset of the one before it, and every gate is reproducible locally — the CI column contains no check that npm run verify does not perform."
        >
          {`  ON SAVE            ON COMMIT                    ON PULL REQUEST
  ~50 ms             ~2 s                         ~30 s
  ┌──────────┐       ┌─────────────────────┐      ┌──────────────────────┐
  │ Prettier │  ──▶  │ lint-staged         │ ──▶  │ format:check         │
  │  editor  │       │  ├ prettier --write │      │ lint  (0 warnings)   │
  └──────────┘       │  └ eslint --fix     │      │ build                │
                     │ commitlint          │      │ commitlint (PR range)│
                     └─────────────────────┘      └──────────────────────┘
                       staged files only            whole repository
                       bypassable (--no-verify)     required check

                     └────────── npm run verify reproduces this ─────────┘`}
        </Figure>

        <p>
          The workflow in <code>.github/workflows/ci.yml</code> runs on pull requests into{' '}
          <code>develop</code>, <code>staging</code> and <code>main</code>, and is registered as a
          required status check on each (§<a href="#protection">4.7</a>). A second job lints every
          commit message in the pull request range, which catches the messages written under{' '}
          <code>--no-verify</code>. CI sets <code>HUSKY=0</code> so the hooks do not attempt to
          install themselves inside the runner. A separate workflow builds and publishes to GitHub
          Pages on merge into <code>main</code>.
        </p>
        <p>
          The single most useful property of this arrangement is stated as a rule:{' '}
          <strong>no check exists only in CI.</strong> If a pull request can fail for a reason a
          developer cannot reproduce with one command, the feedback loop is broken, and people
          respond by pushing speculatively and waiting — which is slower for everyone and teaches
          the wrong habit.
        </p>
      </Subsection>
    </Section>
  )
}
