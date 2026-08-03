import Section from './Section'
import { resources } from '../data/content'

export default function Resources() {
  return (
    <Section
      id="resources"
      eyebrow="Useful materials"
      title="The docs you will actually open"
      description="Bookmarked references for everything this template ships with, grouped by when you need them."
    >
      <div className="grid gap-5 md:grid-cols-3">
        {resources.map((group) => (
          <div key={group.group} className="card">
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-600 dark:text-brand-400">
              {group.group}
            </h3>
            <ul className="mt-5 space-y-4">
              {group.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-baseline gap-1.5 font-medium text-ink-900 transition hover:text-brand-600 dark:text-white dark:hover:text-brand-400"
                  >
                    {link.name}
                    <span
                      aria-hidden="true"
                      className="translate-x-0 text-xs opacity-50 transition group-hover:translate-x-0.5 group-hover:opacity-100"
                    >
                      ↗
                    </span>
                  </a>
                  <p className="mt-0.5 text-sm leading-relaxed text-ink-500 dark:text-ink-400">
                    {link.note}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-ink-200 bg-ink-50/60 p-6 dark:border-ink-800 dark:bg-ink-900/50">
        <h3 className="font-semibold text-ink-900 dark:text-white">In-repo documentation</h3>
        <ul className="mt-3 grid gap-2 text-sm text-ink-600 dark:text-ink-400 sm:grid-cols-2">
          <li>
            <code className="font-mono text-xs">docs/DEVELOPMENT.md</code> — setup, scripts, project
            structure, troubleshooting
          </li>
          <li>
            <code className="font-mono text-xs">docs/BRANCHING.md</code> — the four-branch strategy
            in full
          </li>
          <li>
            <code className="font-mono text-xs">docs/CODE_QUALITY.md</code> — ESLint, Prettier and
            Husky explained
          </li>
          <li>
            <code className="font-mono text-xs">docs/RESOURCES.md</code> — the link list above, plus
            more
          </li>
          <li>
            <code className="font-mono text-xs">docs/CONTRIBUTING.md</code> — the short version of
            all of it
          </li>
        </ul>
      </div>
    </Section>
  )
}
