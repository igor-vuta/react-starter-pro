export default function Section({ id, eyebrow, title, description, children }) {
  return (
    <section id={id} className="border-t border-ink-100 py-20 dark:border-ink-900 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <header className="max-w-2xl">
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600 dark:text-brand-400">
              {eyebrow}
            </p>
          )}
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink-900 dark:text-white sm:text-4xl">
            {title}
          </h2>
          {description && (
            <p className="mt-4 text-base leading-relaxed text-ink-600 dark:text-ink-400">
              {description}
            </p>
          )}
        </header>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  )
}
