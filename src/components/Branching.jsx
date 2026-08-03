import Section from './Section'
import { branches } from '../data/content'

export default function Branching() {
  return (
    <Section
      id="branching"
      eyebrow="Branching model"
      title="Four branches, one direction of travel"
      description="Code only ever moves forward: feature → develop → staging → main. Nothing is committed directly to a protected branch, and every promotion is a reviewed pull request."
    >
      <ol className="relative space-y-4 before:absolute before:left-[1.4rem] before:top-4 before:bottom-4 before:w-px before:bg-ink-200 dark:before:bg-ink-800">
        {branches.map((branch, index) => (
          <li key={branch.name} className="relative flex gap-5">
            <span
              className={`relative z-10 mt-1 grid size-11 shrink-0 place-items-center rounded-full bg-gradient-to-br ${branch.color} text-sm font-bold text-white shadow-md`}
              aria-hidden="true"
            >
              {index + 1}
            </span>
            <div className="card flex-1">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <code className="font-mono text-sm font-semibold text-ink-900 dark:text-white">
                  {branch.name}
                </code>
                <span className="pill">{branch.role}</span>
                {branch.protected ? (
                  <span className="pill border-emerald-300 text-emerald-700 dark:border-emerald-700 dark:text-emerald-400">
                    🔒 protected
                  </span>
                ) : (
                  <span className="pill">short-lived</span>
                )}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink-600 dark:text-ink-400">
                {branch.detail}
              </p>
              <p className="mt-3 text-xs text-ink-500 dark:text-ink-500">
                Merges in from <code className="font-mono">{branch.from}</code>
              </p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <div className="card">
          <h3 className="font-semibold text-ink-900 dark:text-white">Hotfixes</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-600 dark:text-ink-400">
            Production emergencies branch from <code className="font-mono">main</code> as{' '}
            <code className="font-mono">hotfix/*</code>, merge back into{' '}
            <code className="font-mono">main</code>, then get merged down into{' '}
            <code className="font-mono">staging</code> and{' '}
            <code className="font-mono">develop</code> so the fix is never lost in the next release.
          </p>
        </div>
        <div className="card">
          <h3 className="font-semibold text-ink-900 dark:text-white">Branch protection</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-600 dark:text-ink-400">
            <code className="font-mono">develop</code>, <code className="font-mono">staging</code>{' '}
            and <code className="font-mono">main</code> require a passing CI run and at least one
            approving review. Direct pushes and force pushes are blocked. See{' '}
            <code className="font-mono">docs/BRANCHING.md</code> for the exact settings.
          </p>
        </div>
      </div>
    </Section>
  )
}
