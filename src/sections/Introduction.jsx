import Cite from '../components/Cite'
import Note from '../components/Note'
import Section from '../components/Section'
import Subsection from '../components/Subsection'

export default function Introduction() {
  return (
    <Section
      id="introduction"
      number="1"
      title="Introduction"
      lead="What problem this template solves, what it claims to do about it, and the boundaries of that claim."
    >
      <Subsection id="problem" number="1.1" title="The cost of a blank repository">
        <p>
          Creating a React application takes one command. Creating a React application that a team
          can still work in six months later takes considerably longer, and the difference is not
          code — it is decisions. Which formatter, and configured how? Which lint rules, and are
          warnings errors? Does anything run before a commit, or only in continuous integration? How
          does a change reach production, and who may push what, where?
        </p>
        <p>
          Each question is individually small. The difficulty is that they interact. A linter with
          opinions about whitespace will fight a formatter with different opinions, and the loser is
          whoever last ran the tool; every pull request then carries unrelated reformatting noise
          that reviewers must read past.
          <Cite n={5} /> A pre-commit hook that runs a different set of checks from CI trains
          developers to trust a signal that does not predict the outcome. A repository with no
          stated branching model still <em>has</em> one — an implicit, undocumented one that each
          contributor infers differently.
        </p>
        <p>
          These costs are not paid once at setup. They are paid on every commit, by everyone, for
          the life of the project, and they compound: a warning nobody is obliged to fix becomes ten
          thousand lines of lint output that nobody reads, at which point the linter has been
          switched off in practice while remaining switched on in configuration.
        </p>
      </Subsection>

      <Subsection id="thesis" number="1.2" title="What this template claims">
        <p>
          This template asserts that the decisions above have defensible defaults, that those
          defaults are worth more written down than argued fresh in each project, and that three
          properties are worth enforcing mechanically:
        </p>
        <ol>
          <li>
            <strong>Each tool answers exactly one question.</strong> Prettier decides how code
            looks. ESLint decides whether it is correct. commitlint decides whether the history is
            legible. Where two tools could overlap, one is explicitly disabled in that region (§
            <a href="#separation">3.1</a>).
          </li>
          <li>
            <strong>No check exists only in continuous integration.</strong> Every gate that can
            fail a pull request is runnable on a developer&rsquo;s machine with a single command,{' '}
            <code>npm&nbsp;run&nbsp;verify</code>. CI is a second opinion, not the only opinion (§
            <a href="#ci">3.6</a>).
          </li>
          <li>
            <strong>Code moves in one direction.</strong> Changes flow{' '}
            <code>feature/*&nbsp;→&nbsp;develop&nbsp;→&nbsp;staging&nbsp;→&nbsp;main</code>, never
            backwards and never sideways, with one documented exception — the hotfix back-merge,
            which exists precisely because violating the rule silently loses work (§
            <a href="#hotfix">4.5</a>).
          </li>
        </ol>
        <p>
          Everything else in this document follows from those three commitments. Where a choice was
          genuinely close, §<a href="#decisions">6</a> records what was rejected and what the
          accepted option costs.
        </p>
      </Subsection>

      <Subsection id="scope" number="1.3" title="Scope and non-goals">
        <p>
          The template targets{' '}
          <strong>client-rendered, browser-delivered React applications</strong> built by a small
          team — roughly one to eight developers — deploying to static hosting. It is a starting
          point to be modified, not a dependency to be upgraded: once cloned, the configuration is
          yours, and there is no upstream that will change it underneath you.
        </p>
        <p>
          Deliberately absent, with reasoning in §<a href="#decisions">6</a>:
        </p>
        <dl>
          <dt>Server-side rendering and routing-as-a-framework</dt>
          <dd>
            If an application needs server rendering, streaming, or file-based routing, a framework
            that provides them coherently is a better foundation than this template plus four
            plugins. React Router v8 is installed for client-side routing when it is wanted.
            <Cite n={13} />
          </dd>

          <dt>A test framework</dt>
          <dd>
            Testing choices depend on what is being tested, and an unused, misconfigured test
            harness is worse than none. §<a href="#extending">5.4</a> names the conventional choices
            and how to add them.
          </dd>

          <dt>A state-management library</dt>
          <dd>
            Most applications reach production on component state, context, and a server-cache
            library. Selecting a global store before a requirement exists is a decision made too
            early.
            <Cite n={14} />
          </dd>

          <dt>TypeScript</dt>
          <dd>
            A significant and reversible choice, discussed as decision <strong>D2</strong> in §
            <a href="#decisions">6</a>. The type packages are installed so that migration is
            incremental rather than a rewrite.
          </dd>
        </dl>

        <Note label="On reading this document">
          <p>
            §<a href="#usage">5</a> is self-contained: a reader who wants to install the template
            and start working can go there directly and return to §<a href="#toolchain">3</a> and §
            <a href="#branching">4</a> when a hook rejects something and the reason is not obvious.
            The in-repository documents under <code>docs/</code> mirror this material in a form
            better suited to reading beside an editor.
          </p>
        </Note>
      </Subsection>
    </Section>
  )
}
