import Section from '../components/Section'

/**
 * The decision register. Each entry states the choice, what it was chosen
 * over, the reasoning, and — importantly — what the choice costs. A rationale
 * with no stated cost is advocacy rather than analysis.
 */
const decisions = [
  {
    id: 'D1',
    title: 'npm, not pnpm or yarn',
    alternatives: 'pnpm, yarn (classic and berry), bun',
    rationale:
      'npm ships with Node, so there is no bootstrap step before the bootstrap step, and no version skew between a developer’s machine and the CI runner. pnpm’s content-addressed store is genuinely faster and stricter about phantom dependencies, but for a project of this size the saving is seconds and the cost is a prerequisite that must be installed and pinned before anyone can build.',
    cost: 'Slower installs and a larger node_modules than pnpm. Reversible in an afternoon: delete the lockfile, run the other tool, update the workflow.',
    revisit: 'When the repository becomes a monorepo, or install time is measured in minutes.',
  },
  {
    id: 'D2',
    title: 'JavaScript, not TypeScript',
    alternatives: 'TypeScript from the outset; JSDoc type annotations with checkJs',
    rationale:
      'TypeScript is the right answer for most applications above a certain size, and this is a template rather than an application. Adopting it here imposes type-level decisions — strictness, how far to type third-party boundaries — on every user of the template, including those writing a fifty-component project where inference would carry them fine. The type packages are installed so the migration is incremental: rename a file to .tsx, add tsconfig, and the rest continues to work.',
    cost: 'No compile-time guarantees. Refactoring across many files relies on tests and review rather than the compiler, and prop contracts are documented only by usage. react/prop-types is disabled rather than enabled, which is a deliberate acceptance of this cost, not an oversight.',
    revisit:
      'Immediately, if the project will exceed roughly twenty components or be maintained by more than three people.',
  },
  {
    id: 'D3',
    title: 'Tailwind CSS, not CSS Modules or a CSS-in-JS runtime',
    alternatives: 'CSS Modules, vanilla-extract, styled-components, plain stylesheets',
    rationale:
      'Utility classes keep the style and the markup in one place, which makes deleting a component genuinely delete its styles — the failure mode of long-lived stylesheets is accumulated rules nobody dares remove. Tailwind v4 also compiles away entirely: there is no runtime, unlike styled-components, which ships a CSS engine to the browser. The theme lives in one @theme block, so a token change propagates without a search.',
    cost: 'Markup is visually noisy, and the utility vocabulary must be learned. Long class strings resist review. The mitigation is the extraction threshold described in §2.4, applied honestly.',
    revisit:
      'If the team owns a design system with its own tokens and component library, where a semantic layer may fit better.',
  },
  {
    id: 'D4',
    title: 'Vite, not a full framework',
    alternatives: 'Next.js, Remix, Astro, Create React App',
    rationale:
      'The template targets client-rendered applications on static hosting. A framework that provides SSR, file-based routing, and a server runtime is a better foundation when those are needed — but adopting one to get a dev server means inheriting a deployment model and a rendering model that a static site does not use. Create React App is unmaintained and its build is markedly slower.',
    cost: 'No server rendering, so first paint requires the JavaScript bundle, and search-engine coverage depends on client-side rendering. Applications that need SSR should migrate rather than bolt it on.',
    revisit: 'When SEO, streaming, or server-side data loading becomes a requirement.',
  },
  {
    id: 'D5',
    title: 'Warnings fail the build',
    alternatives: 'Warnings as advisory; errors only',
    rationale:
      'A warning nobody must fix accumulates until the output is longer than anyone reads, at which point every rule is effectively disabled while appearing enabled. Zero is the only count that is stable over time, because it is the only count where a new warning is visible.',
    cost: 'Occasional friction when a rule is wrong about a specific case. Resolved by an inline disable comment carrying a reason — which converts an ignored warning into a decision recorded in the diff.',
    revisit:
      'Never, in the author’s view. This is the single highest-return constraint in the toolchain.',
  },
  {
    id: 'D6',
    title: 'No test framework is shipped',
    alternatives: 'Vitest preconfigured with an example test',
    rationale:
      'The right testing strategy depends on what the application does, and a preconfigured harness with one trivial passing test is worse than nothing: it produces a green badge that certifies no behaviour, and teams treat the presence of a test directory as evidence that testing is handled.',
    cost: 'Testing is a deliberate act the user must perform, and some will not. §5.4 names the conventional choices to reduce that friction.',
    revisit: 'On the first bug that reaches production twice.',
  },
  {
    id: 'D7',
    title: 'Four branches, not trunk-based development',
    alternatives: 'Trunk-based, GitHub Flow, full Git Flow',
    rationale:
      'Trunk-based development is the better model when there is comprehensive automated test coverage and feature flags, because the trunk can be trusted continuously. This template ships neither and cannot assume either, so a human verification stage substitutes for automated confidence. The full Git Flow machinery is rejected in §4.2: its release and support branches solve maintaining several published versions at once, which a continuously deployed web application does not do.',
    cost: 'More ceremony than a two-person project strictly needs, and a change takes longer to reach production. §4.8 describes the honest reduction for solo work.',
    revisit: 'Once a real test suite exists — at that point trunk-based becomes strictly better.',
  },
  {
    id: 'D8',
    title: 'react-router v8, replacing react-router-dom',
    alternatives: 'Pinning react-router-dom below the affected range; removing routing entirely',
    rationale:
      'react-router-dom carried a high-severity advisory across its entire current 7.x range with no fixed release in that line. The affected mode is unused here, so real exposure was nil — but a permanently unresolvable npm audit finding trains a team to ignore audit output, which is a durable harm larger than the original risk. v8 consolidates the DOM bindings into react-router and is unaffected.',
    cost: 'Import paths differ from most tutorials, which still say react-router-dom. Noted in §5.4 for exactly that reason.',
    revisit: 'Not applicable; audit is clean.',
  },
]

export default function Decisions() {
  return (
    <Section
      id="decisions"
      number="6"
      title="Design decisions and trade-offs"
      lead="The register of choices that were genuinely contested, each with what it was chosen over, what it costs, and the condition under which it should be revisited."
    >
      <p>
        A rationale that lists only benefits is advocacy. Each entry below therefore states a cost
        and a revisit condition — the observable circumstance under which the decision stops being
        correct. Readers adapting the template are encouraged to disagree with any of these
        explicitly, in writing, in their own fork.
      </p>

      <ol className="!mt-8 !max-w-none !list-none !space-y-6 !pl-0">
        {decisions.map((decision) => (
          <li
            key={decision.id}
            className="rounded-sm border rule bg-paper-tint/40 p-6 dark:bg-night-tint/40"
          >
            <div className="flex flex-wrap items-baseline gap-3">
              <span className="rounded-xs bg-accent px-2 py-0.5 font-mono text-[0.7rem] font-semibold text-paper dark:bg-clay dark:text-night">
                {decision.id}
              </span>
              <h3 className="!mt-0 !mb-0 font-sans text-[1.02rem] font-semibold text-ink dark:text-white">
                {decision.title}
              </h3>
            </div>

            <dl className="!mt-4 !max-w-none">
              <dt>Considered</dt>
              <dd className="!text-[0.95rem]">{decision.alternatives}</dd>

              <dt>Rationale</dt>
              <dd className="!text-[0.95rem]">{decision.rationale}</dd>

              <dt>Cost accepted</dt>
              <dd className="!text-[0.95rem]">{decision.cost}</dd>

              <dt>Revisit when</dt>
              <dd className="!text-[0.95rem]">{decision.revisit}</dd>
            </dl>
          </li>
        ))}
      </ol>
    </Section>
  )
}
