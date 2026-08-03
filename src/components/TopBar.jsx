import { useState } from 'react'
import { meta, REPO_URL } from '../data/document'
import { useOnScroll } from '../hooks/useOnScroll'

export default function TopBar({ theme, onToggleTheme }) {
  const [progress, setProgress] = useState(0)

  useOnScroll(() => {
    const scrollable = document.body.scrollHeight - window.innerHeight
    setProgress(scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0)
  })

  return (
    <div className="no-print fixed inset-x-0 top-0 z-50 border-b rule bg-paper/90 backdrop-blur-sm dark:bg-night/90">
      <div className="mx-auto flex h-14 max-w-[92rem] items-center justify-between px-6 lg:px-10">
        <a
          href="#top"
          className="font-sans text-[0.85rem] font-semibold tracking-tight text-ink dark:text-white"
        >
          {meta.title}
          <span className="ml-2 font-normal text-muted dark:text-parchment-muted">
            v{meta.version}
          </span>
        </a>

        <div className="flex items-center gap-4 font-sans text-[0.8rem]">
          <a
            href={`${REPO_URL}/blob/main/docs/DEVELOPMENT.md`}
            target="_blank"
            rel="noreferrer"
            className="hidden text-muted transition-colors hover:text-accent dark:text-parchment-muted dark:hover:text-clay sm:inline"
          >
            Docs ↗
          </a>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="hidden text-muted transition-colors hover:text-accent dark:text-parchment-muted dark:hover:text-clay sm:inline"
          >
            Source ↗
          </a>
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            className="rounded-xs border rule px-2 py-1 text-[0.75rem] text-muted transition
              hover:border-accent hover:text-accent dark:text-parchment-muted
              dark:hover:border-clay dark:hover:text-clay"
          >
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
        </div>
      </div>

      {/* Reading progress */}
      <div
        aria-hidden="true"
        className="h-px origin-left bg-accent transition-transform duration-150 dark:bg-clay"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  )
}
