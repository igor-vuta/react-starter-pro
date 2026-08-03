import { meta, REPO_URL } from '../data/document'

const metadata = [
  { label: 'Version', value: meta.version },
  { label: 'Licence', value: meta.license },
  { label: 'Revised', value: meta.revised },
  { label: 'Stack', value: 'React 19 · Vite 6 · Tailwind 4' },
]

export default function Masthead() {
  return (
    <header id="top" className="border-b-2 rule pb-10">
      <p className="label">Technical documentation · Project template</p>

      <h1 className="mt-4 font-serif text-[2.6rem] font-bold leading-[1.1] tracking-[-0.015em] text-ink dark:text-white sm:text-[3.2rem]">
        {meta.title}
      </h1>

      <p className="mt-4 max-w-[52ch] font-serif text-[1.15rem] leading-snug text-muted italic dark:text-parchment-muted">
        {meta.subtitle}
      </p>

      <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-4 border-y rule py-4 sm:grid-cols-4">
        {metadata.map((item) => (
          <div key={item.label}>
            <dt className="label !text-[0.65rem]">{item.label}</dt>
            <dd className="mt-1 font-sans text-[0.85rem] text-ink dark:text-parchment">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>

      <section className="mt-8 max-w-[70ch]">
        <h2 className="label mb-3">Abstract</h2>
        <div className="article !text-[1.02rem]">
          <p className="!text-[1.02rem]">
            The cost of starting a web application is not the installation of its dependencies; it
            is the set of decisions that must be made before the first useful line of code, and the
            interactions between those decisions once made. A formatter and a linter that disagree
            produce churn. A hook that runs checks the continuous-integration server does not
            produces false confidence. A branching model chosen implicitly produces a repository
            whose history nobody can read.
          </p>
          <p>
            <strong>React Starter Pro</strong> fixes these decisions and states the reasoning behind
            each one. It specifies a build pipeline (React 19 on Vite), a styling system (Tailwind
            CSS v4, configured in CSS), a quality toolchain in which each tool answers exactly one
            question, and a four-branch integration model —{' '}
            <code>feature/*&nbsp;→&nbsp;develop&nbsp;→&nbsp;staging&nbsp;→&nbsp;main</code> — in
            which code moves in one direction only and every promotion is a reviewed pull request.
          </p>
          <p>
            This document is the template&rsquo;s specification, its operating manual, and its
            justification. §<a href="#introduction">1</a> states the problem and the claim. §
            <a href="#architecture">2</a> describes the architecture. §<a href="#toolchain">3</a>{' '}
            derives the toolchain from a single principle of separation. §<a href="#branching">4</a>{' '}
            defines the branching model and compares it against the alternatives. §
            <a href="#usage">5</a> is the practical guide. §<a href="#decisions">6</a> records the
            decisions as explicit trade-offs, and §<a href="#limitations">7</a> states where the
            template should not be used.
          </p>
        </div>
      </section>

      <div className="no-print mt-8 flex flex-wrap gap-3 font-sans text-[0.82rem]">
        <a
          href="#usage"
          className="rounded-xs border border-ink bg-ink px-4 py-2 font-medium text-paper transition
            hover:opacity-85 dark:border-parchment dark:bg-parchment dark:text-night"
        >
          Read the operating guide
        </a>
        <a
          href={REPO_URL}
          target="_blank"
          rel="noreferrer"
          className="rounded-xs border rule px-4 py-2 font-medium text-ink transition
            hover:border-accent hover:text-accent dark:text-parchment dark:hover:border-clay
            dark:hover:text-clay"
        >
          Repository ↗
        </a>
      </div>
    </header>
  )
}
