import { useEffect, useState } from 'react'
import { REPO_URL } from '../data/content'

const links = [
  { href: '#features', label: 'Features' },
  { href: '#quick-start', label: 'Quick start' },
  { href: '#workflow', label: 'Workflow' },
  { href: '#branching', label: 'Branching' },
  { href: '#resources', label: 'Resources' },
]

export default function Navbar({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition duration-300 ${
        scrolled
          ? 'border-b border-ink-200/70 bg-white/80 backdrop-blur-md dark:border-ink-800 dark:bg-ink-950/80'
          : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-sm">
            ⚛
          </span>
          <span className="text-ink-900 dark:text-white">React Starter Pro</span>
        </a>

        <ul className="hidden items-center gap-7 text-sm text-ink-600 dark:text-ink-400 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="transition hover:text-brand-600 dark:hover:text-brand-400"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            className="grid size-9 place-items-center rounded-lg border border-ink-200 text-base
              transition hover:border-brand-400 hover:text-brand-600 dark:border-ink-800
              dark:hover:border-brand-600 dark:hover:text-brand-400"
          >
            {theme === 'dark' ? '☀' : '☾'}
          </button>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg bg-ink-900 px-3.5 py-2 text-sm font-medium text-white transition
              hover:bg-ink-800 dark:bg-white dark:text-ink-900 dark:hover:bg-ink-100"
          >
            GitHub
          </a>
        </div>
      </nav>
    </header>
  )
}
