import CodeBlock from './CodeBlock'
import { REPO_URL } from '../data/content'

const stack = ['React 19', 'Vite 6', 'Tailwind v4', 'ESLint', 'Prettier', 'Husky']

export default function Hero() {
  return (
    <div id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* Decorative background — purely visual, hidden from assistive tech. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-12rem] size-[38rem] -translate-x-1/2 rounded-full bg-brand-500/20 blur-3xl animate-float dark:bg-brand-600/20" />
        <div className="absolute right-[-8rem] top-40 size-[24rem] rounded-full bg-fuchsia-400/10 blur-3xl dark:bg-fuchsia-500/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(120,130,160,0.18)_1px,transparent_0)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
          <div className="animate-fade-up">
            <span className="pill">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              Template · MIT licensed
            </span>

            <h1 className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight text-ink-900 dark:text-white sm:text-6xl">
              Ship React apps{' '}
              <span className="bg-gradient-to-r from-brand-500 via-brand-600 to-fuchsia-500 bg-clip-text text-transparent">
                without the setup tax
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-600 dark:text-ink-400">
              A production-shaped starter: React 19 and Vite for speed, Tailwind v4 for styling,
              ESLint + Prettier + Husky to keep the codebase honest, and a four-branch Git strategy
              that scales past one developer.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#quick-start"
                className="rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-lg
                  shadow-brand-600/25 transition hover:-translate-y-0.5 hover:bg-brand-700"
              >
                Get started
              </a>
              <a
                href={`${REPO_URL}/generate`}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-ink-200 px-5 py-3 text-sm font-semibold transition
                  hover:-translate-y-0.5 hover:border-brand-400 hover:text-brand-600 dark:border-ink-800
                  dark:hover:border-brand-600 dark:hover:text-brand-400"
              >
                Use this template →
              </a>
            </div>

            <ul className="mt-10 flex flex-wrap gap-2">
              {stack.map((item) => (
                <li key={item} className="pill">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-fade-up [animation-delay:120ms]">
            <CodeBlock
              label="bash"
              code={`npx degit igor-vuta/react-starter-pro my-app
cd my-app && npm install
npm run dev

  VITE v6  ready in 214 ms
  ➜  Local:   http://localhost:5173/`}
            />
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              {[
                { value: '0', label: 'config files to touch' },
                { value: '4', label: 'branch promotion stages' },
                { value: '3', label: 'automated quality gates' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-ink-200/70 bg-white/60 p-4 dark:border-ink-800 dark:bg-ink-900/50"
                >
                  <div className="text-2xl font-bold text-ink-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs leading-snug text-ink-500 dark:text-ink-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
