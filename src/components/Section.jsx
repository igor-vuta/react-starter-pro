/**
 * A numbered top-level section (§1, §2, …). Sub-sections use `Subsection`.
 *
 * The gap between sections is a margin rather than padding so that an anchor
 * jump lands on the heading instead of 4rem of empty space above it.
 */
export default function Section({ id, number, title, lead, children }) {
  return (
    <section id={id} className="mt-16 first:mt-4">
      <header className="mb-6 border-b rule pb-4">
        <div className="label mb-2">Section {number}</div>
        <h2 className="font-sans text-[1.6rem] font-bold leading-tight tracking-tight text-ink dark:text-white">
          {title}
        </h2>
        {lead && (
          <p className="mt-3 max-w-[64ch] text-[1.02rem] italic leading-relaxed text-muted dark:text-parchment-muted">
            {lead}
          </p>
        )}
      </header>
      <div className="article">{children}</div>
    </section>
  )
}
