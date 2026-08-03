import CodeBlock from './CodeBlock'
import Section from './Section'
import { quickStart } from '../data/content'

export default function QuickStart() {
  return (
    <Section
      id="quick-start"
      eyebrow="Quick start"
      title="Running in under a minute"
      description="Node 20 or newer and npm are the only prerequisites. `npm install` also installs the Git hooks, so the first commit is already protected."
    >
      <ol className="grid gap-6 lg:grid-cols-2">
        {quickStart.map((step, index) => (
          <li key={step.label} className="flex gap-4">
            <span className="mt-1 grid size-8 shrink-0 place-items-center rounded-full border border-brand-200 bg-brand-50 text-sm font-semibold text-brand-700 dark:border-brand-800 dark:bg-brand-500/10 dark:text-brand-300">
              {index + 1}
            </span>
            <div className="min-w-0 flex-1">
              <p className="mb-2 text-sm font-medium text-ink-800 dark:text-ink-200">
                {step.label}
              </p>
              <CodeBlock code={step.code} />
            </div>
          </li>
        ))}
      </ol>

      <p className="mt-8 rounded-xl border border-amber-300/60 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
        <strong className="font-semibold">Heads up:</strong> the dev server runs at{' '}
        <code className="font-mono">http://localhost:5173</code>. The production build is served
        under <code className="font-mono">/react-starter-pro/</code> (see{' '}
        <code className="font-mono">base</code> in <code className="font-mono">vite.config.js</code>
        ) — change that to <code className="font-mono">&apos;/&apos;</code> if you deploy to a root
        domain.
      </p>
    </Section>
  )
}
