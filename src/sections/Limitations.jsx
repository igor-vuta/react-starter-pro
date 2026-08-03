import Cite from '../components/Cite'
import Section from '../components/Section'

export default function Limitations() {
  return (
    <Section
      id="limitations"
      number="7"
      title="Limitations"
      lead="Where this template is the wrong tool, and what it does not verify about the code you write in it."
    >
      <p>
        A template that claims to suit every project suits none in particular. The following are
        stated so that a reader can reject the template quickly rather than discover the mismatch
        three weeks in.
      </p>

      <h3>Situations in which it is the wrong starting point</h3>
      <ul>
        <li>
          <strong>Server-side rendering is required.</strong> If first paint must not wait for
          JavaScript, or content must be indexable without client-side rendering, begin with a
          framework that provides rendering on the server coherently. Retrofitting it is a rewrite.
        </li>
        <li>
          <strong>The team practises continuous deployment.</strong> If every merge should reach
          users within minutes, the <code>staging</code> stage is pure latency. Adopt trunk-based
          development with the test coverage and feature flags that make it safe.
          <Cite n={11} />
        </li>
        <li>
          <strong>Several released versions are supported concurrently.</strong> Installed software,
          SDKs, and firmware need the release and support branches this model removed. Use the full
          Git Flow.
          <Cite n={9} />
        </li>
        <li>
          <strong>The project is a throwaway prototype.</strong> The commit-message grammar and the
          four-branch promotion path cost more than a two-day experiment can repay.
        </li>
        <li>
          <strong>The team is larger than roughly eight developers.</strong> A single{' '}
          <code>develop</code> branch becomes contended; the model needs either shorter-lived
          branches or a per-team integration layer.
        </li>
      </ul>

      <h3>What the toolchain does not check</h3>
      <p>
        The gates in §<a href="#toolchain">3</a> are real but narrow, and it is important not to
        read a green pull request as more than it is. Nothing in this template verifies:
      </p>
      <ul>
        <li>
          <strong>That the code works.</strong> There are no tests (decision <strong>D6</strong>).
          The build proves that the code compiles and the linter proves it avoids a catalogue of
          known mistakes; neither observes behaviour.
        </li>
        <li>
          <strong>That the interface is accessible.</strong> No automated accessibility checking is
          configured. Semantic markup and visible focus styling are used throughout, but that is a
          starting posture, not a conformance claim.
          <Cite n={16} />
        </li>
        <li>
          <strong>That the bundle is a reasonable size.</strong> No budget is enforced and no
          analysis runs. A dependency that adds three hundred kilobytes will merge without comment.
        </li>
        <li>
          <strong>That dependencies are current or unexploited.</strong> No automated dependency
          updates or scheduled audits are configured; <code>npm&nbsp;audit</code> is a manual act.
        </li>
        <li>
          <strong>That the commit message is accurate.</strong> commitlint validates grammar, not
          truth. <code>fix: correct rounding</code> on a commit that adds a feature passes.
        </li>
      </ul>

      <h3>Known sharp edges</h3>
      <ul>
        <li>
          <strong>Tailwind class names must be complete strings.</strong> The compiler scans source
          text, so <code>{'`text-${color}-500`'}</code> generates nothing. Map values to whole class
          names instead.
        </li>
        <li>
          <strong>The base path is easy to get wrong.</strong> See §<a href="#extending">5.4</a>;
          the symptom is a blank page in production and nothing at all in development.
        </li>
        <li>
          <strong>The hooks are per-clone.</strong> Installing with <code>--ignore-scripts</code>{' '}
          silently produces an unguarded repository. Verify with{' '}
          <code>git&nbsp;config&nbsp;core.hooksPath</code>.
        </li>
        <li>
          <strong>Branch protection is not applied by cloning.</strong> §
          <a href="#protection">4.7</a> gives the commands, but until they are run the model is
          documentation rather than enforcement.
        </li>
      </ul>
    </Section>
  )
}
