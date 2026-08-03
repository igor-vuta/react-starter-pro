import { outline } from '../data/document'
import { useActiveSection } from '../hooks/useActiveSection'

// Every id in the document, parents and children, in reading order.
const allIds = outline.flatMap((entry) => [entry.id, ...(entry.children ?? []).map((c) => c.id)])

export default function Contents() {
  const activeId = useActiveSection(allIds)

  return (
    <nav aria-label="Table of contents" className="text-[0.82rem]">
      <h2 className="label mb-4 border-b rule pb-2">Contents</h2>
      <ol className="space-y-3 font-sans">
        {outline.map((entry) => {
          const childActive = (entry.children ?? []).some((child) => child.id === activeId)
          const isActive = activeId === entry.id || childActive

          return (
            <li key={entry.id}>
              <a
                href={`#${entry.id}`}
                aria-current={activeId === entry.id ? 'true' : undefined}
                className={`flex gap-2.5 leading-snug transition-colors ${
                  isActive
                    ? 'font-semibold text-accent dark:text-clay'
                    : 'text-muted hover:text-ink dark:text-parchment-muted dark:hover:text-parchment'
                }`}
              >
                <span className="w-4 shrink-0 font-mono text-[0.75rem] opacity-70">
                  {entry.number}
                </span>
                <span>{entry.title}</span>
              </a>

              {entry.children && isActive && (
                <ol className="mt-2 mb-1 space-y-1.5 border-l rule pl-3 ml-1.5">
                  {entry.children.map((child) => (
                    <li key={child.id}>
                      <a
                        href={`#${child.id}`}
                        aria-current={activeId === child.id ? 'true' : undefined}
                        className={`flex gap-2 text-[0.78rem] leading-snug transition-colors ${
                          activeId === child.id
                            ? 'text-accent dark:text-clay'
                            : 'text-muted hover:text-ink dark:text-parchment-muted dark:hover:text-parchment'
                        }`}
                      >
                        <span className="shrink-0 font-mono text-[0.7rem] opacity-60">
                          {child.number}
                        </span>
                        <span>{child.title}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
