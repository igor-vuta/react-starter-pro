/**
 * A numbered figure with a caption below it, as in a printed paper.
 * `mono` renders the body as a preformatted diagram or listing.
 */
export default function Figure({ number, caption, mono = false, children }) {
  return (
    <figure className="my-8">
      <div className="overflow-x-auto rounded-sm border rule bg-paper-tint/60 p-5 dark:bg-night-tint/70">
        {mono ? (
          <pre className="font-mono text-[0.78rem] leading-[1.65] text-ink/85 dark:text-parchment/80">
            {children}
          </pre>
        ) : (
          children
        )}
      </div>
      <figcaption className="mt-3 max-w-[64ch] font-sans text-[0.8rem] leading-relaxed text-muted dark:text-parchment-muted">
        <span className="font-semibold text-ink dark:text-parchment">Figure {number}.</span>{' '}
        {caption}
      </figcaption>
    </figure>
  )
}
