import { REPO_URL } from '../data/content'

export default function Footer() {
  return (
    <footer className="border-t border-ink-100 py-10 dark:border-ink-900">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-ink-500 dark:text-ink-400 sm:flex-row">
        <p>
          Built with React 19, Vite and Tailwind CSS. Released under the{' '}
          <a
            href={`${REPO_URL}/blob/main/LICENSE`}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-ink-700 underline-offset-4 hover:underline dark:text-ink-200"
          >
            MIT licence
          </a>
          .
        </p>
        <div className="flex items-center gap-5">
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-brand-600 dark:hover:text-brand-400"
          >
            Repository
          </a>
          <a
            href={`${REPO_URL}/issues`}
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-brand-600 dark:hover:text-brand-400"
          >
            Issues
          </a>
          <a
            href={`${REPO_URL}/blob/main/docs/DEVELOPMENT.md`}
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-brand-600 dark:hover:text-brand-400"
          >
            Docs
          </a>
        </div>
      </div>
    </footer>
  )
}
