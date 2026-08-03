export default function Subsection({ id, number, title, children }) {
  return (
    <section id={id} className="mt-10">
      <h3 className="!mt-0 flex items-baseline gap-3 font-sans text-[1.05rem] font-semibold tracking-tight text-ink dark:text-white">
        <span className="font-mono text-[0.8rem] font-normal text-muted dark:text-parchment-muted">
          {number}
        </span>
        {title}
      </h3>
      {children}
    </section>
  )
}
