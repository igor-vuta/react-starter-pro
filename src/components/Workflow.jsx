import CodeBlock from './CodeBlock'
import Section from './Section'
import { scripts } from '../data/content'

const gates = [
  {
    stage: 'On save',
    tool: 'Prettier',
    detail:
      'Formatting is not a code-review topic. Enable "format on save" in your editor, or run `npm run format`.',
  },
  {
    stage: 'On commit',
    tool: 'Husky + lint-staged',
    detail:
      'The pre-commit hook formats and lints only the staged files, then commit-msg checks the message against Conventional Commits.',
  },
  {
    stage: 'On pull request',
    tool: 'GitHub Actions',
    detail:
      'CI re-runs format:check, lint and build. A red check blocks the merge — the same command you can run locally with `npm run verify`.',
  },
]

export default function Workflow() {
  return (
    <Section
      id="workflow"
      eyebrow="Daily workflow"
      title="Three gates, all of them local first"
      description="Nothing here only exists in CI. Every check that can fail your pull request can be run on your machine before you push."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {gates.map((gate, index) => (
          <article key={gate.stage} className="card">
            <span className="pill">Step {index + 1}</span>
            <h3 className="mt-4 font-semibold text-ink-900 dark:text-white">{gate.stage}</h3>
            <p className="mt-1 text-sm font-medium text-brand-600 dark:text-brand-400">
              {gate.tool}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink-600 dark:text-ink-400">
              {gate.detail}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-ink-500 dark:text-ink-400">
            npm scripts
          </h3>
          <div className="overflow-hidden rounded-xl border border-ink-200 dark:border-ink-800">
            <table className="w-full text-left text-sm">
              <tbody className="divide-y divide-ink-100 dark:divide-ink-800">
                {scripts.map((script) => (
                  <tr key={script.cmd} className="hover:bg-ink-50/70 dark:hover:bg-ink-900/60">
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-brand-700 dark:text-brand-300">
                      {script.cmd}
                    </td>
                    <td className="px-4 py-3 text-ink-600 dark:text-ink-400">{script.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-ink-500 dark:text-ink-400">
            A typical change
          </h3>
          <CodeBlock
            label="bash"
            code={`git switch develop && git pull
git switch -c feat/user-profile

# ... write code ...

npm run verify                 # format + lint + build
git add .
git commit -m "feat(profile): add avatar upload"
git push -u origin feat/user-profile
gh pr create --base develop`}
          />
          <p className="mt-4 text-sm leading-relaxed text-ink-600 dark:text-ink-400">
            The commit message must match{' '}
            <code className="font-mono text-xs">type(scope): subject</code>. Allowed types:{' '}
            <code className="font-mono text-xs">
              feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert
            </code>
            .
          </p>
        </div>
      </div>
    </Section>
  )
}
