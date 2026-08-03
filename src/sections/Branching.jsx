import Cite from '../components/Cite'
import CodeBlock from '../components/CodeBlock'
import Figure from '../components/Figure'
import Note from '../components/Note'
import Section from '../components/Section'
import Subsection from '../components/Subsection'
import Table from '../components/Table'

const code = (text) => <code>{text}</code>

export default function Branching() {
  return (
    <Section
      id="branching"
      number="4"
      title="The four-branch integration model"
      lead="Why a branching model is required, which alternatives were considered and rejected, and the exact protocol for moving a change from a working copy to production."
    >
      <Subsection id="why-model" number="4.1" title="Why a branching model is necessary">
        <p>
          Every repository has a branching model. The only question is whether it was chosen or
          inherited by accident, and an accidental model is expensive in a specific way: it is not
          written down, so each contributor infers a different one, and the differences surface as
          merge conflicts, as work that reaches production before it was verified, and as fixes that
          silently disappear.
        </p>
        <p>An explicit model answers four questions the same way for everyone:</p>
        <ol>
          <li>
            <strong>Where does new work start?</strong> If the answer varies, feature branches are
            cut from inconsistent bases and integration becomes an archaeology exercise.
          </li>
          <li>
            <strong>What is the state of production, right now?</strong> There must be exactly one
            ref that answers this, and it must be true without qualification.
          </li>
          <li>
            <strong>Where is a change verified before users see it?</strong> Some class of defect —
            base-path errors, bundle-only failures, integration between two features merged the same
            afternoon — is not observable in development.
          </li>
          <li>
            <strong>
              How does an emergency fix reach production without dragging unrelated work with it?
            </strong>{' '}
            This is the question that most models answer badly, and answering it badly is how a fix
            gets reverted by the next release.
          </li>
        </ol>
      </Subsection>

      <Subsection id="alternatives" number="4.2" title="Alternatives considered">
        <p>
          The model below is not the only defensible one, and for some teams it is the wrong one.
          The candidates and the conditions under which each is correct:
        </p>

        <Table
          number="4"
          caption="Comparison of branching models. The correct choice is a function of release cadence, team size, and whether a verification stage is required between merge and release — not of which model is most fashionable."
          columns={['Model', 'Shape', 'Correct when', 'Rejected here because']}
          rows={[
            [
              <strong key="t">Trunk-based</strong>,
              'One branch; short-lived or no branches; features behind flags.',
              'Continuous deployment, strong automated test coverage, feature flags in place.',
              'Requires a test suite this template deliberately does not ship, and flag infrastructure a starter cannot assume.',
            ],
            [
              <strong key="g">GitHub Flow</strong>,
              'main plus feature branches; merge deploys.',
              'A single environment, continuous delivery, small team, low blast radius.',
              'Provides no stage between merge and production, so main serves as both integration and release surface.',
            ],
            [
              <strong key="f">Git Flow</strong>,
              'main, develop, plus release/*, hotfix/* and support/* branches.',
              'Versioned software with parallel supported releases — installed products, SDKs, firmware.',
              'The release and support branch machinery addresses maintaining several versions at once, which a continuously deployed web application does not do.',
            ],
            [
              <strong key="h">This model</strong>,
              'feature/* → develop → staging → main.',
              'Periodic releases, a QA or UAT step, one production environment, 1–8 developers.',
              '—',
            ],
          ]}
        />

        <p>
          The model here is Git Flow
          <Cite n={9} /> with the release and support branches removed and a permanent{' '}
          <code>staging</code> branch in their place. It keeps the property that motivates Git Flow
          — a stabilisation surface distinct from the integration surface — while removing the
          ceremony that exists to serve multiple concurrently supported versions. It is
          correspondingly heavier than GitHub Flow
          <Cite n={10} /> and trunk-based development
          <Cite n={11} />, and that weight buys exactly one thing: somewhere to verify a release
          candidate that is not production.
        </p>
      </Subsection>

      <Subsection id="branches" number="4.3" title="Definition of the branches">
        <Table
          number="5"
          caption="The four branches. The three permanent branches are protected; feature branches are disposable and should not outlive the work they carry."
          columns={['Branch', 'Purpose', 'From', 'Into', 'Protected', 'Lifetime']}
          rows={[
            [
              code('main'),
              'Production. Always deployable; merging here publishes.',
              code('staging'),
              '—',
              'Yes',
              'Permanent',
            ],
            [
              code('staging'),
              'Release candidate. QA and UAT run here; only defect fixes are accepted.',
              code('develop'),
              code('main'),
              'Yes',
              'Permanent',
            ],
            [
              code('develop'),
              'Integration. Everything lands here first; the shared base for new work.',
              code('main'),
              code('staging'),
              'Yes',
              'Permanent',
            ],
            [
              code('feature/*'),
              'One unit of work — a ticket, a fix, a document.',
              code('develop'),
              code('develop'),
              'No',
              'Hours to days',
            ],
          ]}
        />

        <Figure
          number="3"
          mono
          caption="The promotion graph. The forward path is the only route to production. The single reverse edge is the hotfix back-merge described in §4.5; it exists because omitting it causes the next release to revert the fix."
        >
          {`   feature/*        develop         staging          main
       │               │               │               │
       │  PR + review  │               │               │
       ├──────────────▶│               │               │
       │   (squash)    │               │               │
       │               │  PR "release" │               │
       │               ├──────────────▶│               │
       │               │ (merge commit)│   QA / UAT    │
       │               │               │  fixes only   │
       │               │               │  PR "release" │
       │               │               ├──────────────▶│
       │               │               │ (merge commit)│──▶ 🚀 deploy
       │               │               │               │    + tag vX.Y.Z
       │               │               │               │
       │               │◀ ─ ─ ─ ─ ─ ─ ─┼ ─ ─ ─ ─ ─ ─ ─ ┤
       │               │   back-merge after a hotfix   │
                                     (§4.5)`}
        </Figure>
      </Subsection>

      <Subsection id="promotion" number="4.4" title="The promotion protocol">
        <h4>Feature work</h4>
        <p>
          Branch from an up-to-date <code>develop</code>, one branch per unit of work. Branch names
          are lowercase and hyphenated (<code>feat/…</code>, <code>fix/…</code>, <code>docs/…</code>
          , <code>chore/…</code>); ticket numbers belong in the commit body or the pull-request
          title, where they survive a squash.
        </p>

        <CodeBlock
          label="bash"
          caption="Listing 8. The complete cycle for a change. npm run verify is the same command CI runs, so a green result here predicts a green pull request."
          code={`git switch develop && git pull --ff-only
git switch -c feat/design-decision-register

# … work, committing as you go …

npm run verify
git push -u origin feat/design-decision-register
gh pr create --base develop --fill`}
        />

        <p>
          Keep a long-running branch current by <strong>rebasing</strong> rather than merging, so
          that history stays linear and the eventual squash is clean:
        </p>
        <CodeBlock
          code={`git fetch origin
git rebase origin/develop
git push --force-with-lease`}
        />
        <p>
          Two constraints on that: never rebase a branch someone else has already pulled, and never
          force-push a protected branch — the protection rules in §<a href="#protection">4.7</a>{' '}
          reject the attempt, which is the intended behaviour rather than an obstacle.{' '}
          <code>--force-with-lease</code> rather than <code>--force</code> because it refuses to
          overwrite commits you have not seen.
        </p>

        <h4>Cutting a release candidate</h4>
        <p>
          When <code>develop</code> contains everything the release needs, open a pull request from{' '}
          <code>develop</code> into <code>staging</code>. From that moment <code>staging</code> is
          frozen with respect to features: only defect fixes are accepted, and each one is merged
          back down into <code>develop</code> immediately so the two do not diverge.
        </p>

        <h4>Releasing</h4>
        <CodeBlock
          label="bash"
          code={`gh pr create --base main --head staging --title "release: v1.3.0"
# after the merge
git switch main && git pull --ff-only
git tag -s v1.3.0 -m "v1.3.0"
git push origin v1.3.0`}
        />
        <p>
          Merging into <code>main</code> triggers deployment. Tag every release with a signed
          semantic-version tag
          <Cite n={8} />: the tag is what lets you answer &ldquo;what was running when this was
          reported?&rdquo; six weeks later, and reconstructing that from merge commits is far harder
          than it sounds.
        </p>
      </Subsection>

      <Subsection id="hotfix" number="4.5" title="Hotfixes and the back-merge obligation">
        <p>
          Production is broken and the fix cannot wait for the release train. The hotfix branches
          from <code>main</code> — not from <code>develop</code>, which contains unreleased work —
          and merges back into <code>main</code>.
        </p>

        <CodeBlock
          label="bash"
          code={`git switch main && git pull --ff-only
git switch -c hotfix/broken-asset-paths
# … fix, verify …
gh pr create --base main --fill`}
        />

        <p>
          What follows is the step most often skipped, and skipping it produces a failure that looks
          inexplicable. After the hotfix merges, <code>main</code> contains a commit that{' '}
          <code>staging</code> and <code>develop</code> do not. The next release therefore ships a
          tree in which the fix is absent, and the bug returns — apparently spontaneously, weeks
          later, with no commit that reverted anything. The fix must be merged downward:
        </p>

        <CodeBlock
          code={`git switch staging && git merge --no-ff main && git push
git switch develop && git merge --no-ff staging && git push`}
        />

        <Note label="Why this is the model's one reverse edge">
          <p>
            Every other rule here says code moves forward only. The back-merge is the exception, and
            it is not an inconsistency: the invariant being protected is not &ldquo;merges point
            downstream&rdquo; but{' '}
            <em>
              &ldquo;no branch upstream of production lacks a commit that production has&rdquo;
            </em>
            . A hotfix is the only operation that can violate it, so it is the only operation that
            carries a mandatory reverse merge. Treat it as part of the hotfix, not as follow-up work
            — an unfinished hotfix is a scheduled regression.
          </p>
        </Note>
      </Subsection>

      <Subsection id="merge-strategy" number="4.6" title="Merge strategy per edge">
        <p>
          The merge strategy is not uniform, because the edges answer different questions. On the
          feature edge the useful unit is the change; on the release edges it is the release.
        </p>

        <Table
          number="6"
          caption="Merge strategy by edge, and the reasoning. Squashing at the release boundary would collapse a whole release into one commit, destroying the per-change history exactly where it is most needed during an incident."
          columns={['Edge', 'Strategy', 'Reasoning']}
          rows={[
            [
              <span key="a">
                {code('feature/*')} → {code('develop')}
              </span>,
              'Squash',
              'develop reads as one commit per unit of work. Intermediate "wip" commits carry no information once the work is complete.',
            ],
            [
              <span key="b">
                {code('develop')} → {code('staging')}
              </span>,
              'Merge commit',
              'Preserves the individual changes making up the release, which is what you bisect through when the candidate fails QA.',
            ],
            [
              <span key="c">
                {code('staging')} → {code('main')}
              </span>,
              'Merge commit',
              'Records the release boundary explicitly, so "what shipped on the 3rd" is answerable from the graph.',
            ],
            [
              <span key="d">
                {code('hotfix/*')} → {code('main')}
              </span>,
              'Squash',
              'One commit, trivially revertible and trivially cherry-picked into the downstream back-merge.',
            ],
          ]}
        />

        <p>
          Delete feature branches after merge. GitHub can do this automatically under Settings →
          General → &ldquo;Automatically delete head branches&rdquo;, which is worth enabling: a
          branch list that reflects work in progress is a useful signal, and one containing ninety
          merged branches is not.
        </p>
      </Subsection>

      <Subsection id="protection" number="4.7" title="Branch protection">
        <p>
          The model is a convention until the forge enforces it.
          <Cite n={15} /> The three permanent branches should require a pull request, a passing CI
          run, and — for <code>staging</code> and <code>main</code> — an approving review, with
          force pushes and deletions blocked.
        </p>

        <CodeBlock
          label="bash"
          caption="Listing 9. Applying the rules to all three branches. Adjust the review count to the team; on a solo project, requiring an approval you cannot give will simply block you, and the honest configuration is to require the status check alone."
          code={`for BRANCH in main staging develop; do
  gh api -X PUT "repos/<owner>/<repo>/branches/$BRANCH/protection" \\
    -H "Accept: application/vnd.github+json" \\
    -F "required_status_checks[strict]=true" \\
    -F "required_status_checks[contexts][]=Format, lint and build" \\
    -F "required_pull_request_reviews[required_approving_review_count]=1" \\
    -F "enforce_admins=false" \\
    -F "restrictions=null" \\
    -F "allow_force_pushes=false" \\
    -F "allow_deletions=false"
done`}
        />

        <p>
          <code>strict=true</code> requires a branch to be up to date with its base before merging.
          This is the setting that prevents the case where two pull requests each pass CI
          individually and break the base once both are merged, and it is worth the occasional extra
          rebase.
        </p>
      </Subsection>

      <Subsection id="solo" number="4.8" title="The degenerate case: working alone">
        <p>
          On a single-developer project the review requirement is theatre — but the rest is not.{' '}
          <code>staging</code> is where you discover that the production bundle resolves a path
          differently from the dev server, which is a defect class that has nothing to do with team
          size. Retain the branches, drop the required approval, and keep the required status check.
        </p>
        <p>
          If even that is too heavy for the work at hand, collapse to{' '}
          <code>feature/*&nbsp;→&nbsp;develop&nbsp;→&nbsp;main</code> and reintroduce{' '}
          <code>staging</code> when there are users whose morning your deploy can ruin. Two rules
          are worth keeping at any scale: never commit directly to <code>main</code>, and never
          merge before CI has run.
        </p>
      </Subsection>
    </Section>
  )
}
