/**
 * A set-off remark: an aside, caveat, or worked rationale that would
 * interrupt the argument if left inline.
 */
export default function Note({ label = 'Note', children }) {
  return (
    <aside className="my-7 max-w-[68ch] border-l-2 border-accent/40 bg-paper-tint/50 py-3 pl-5 pr-4 dark:border-clay/40 dark:bg-night-tint/50">
      <div className="label mb-1.5 !text-accent dark:!text-clay">{label}</div>
      <div className="text-[0.97rem] leading-relaxed [&>p]:my-2 [&>p:first-child]:mt-0 [&>p:last-child]:mb-0">
        {children}
      </div>
    </aside>
  )
}
