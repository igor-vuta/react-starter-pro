/**
 * An inline citation marker linking to the numbered entry in §8.
 * Usage: <Cite n={4} /> or <Cite n={[9, 10]} />
 */
export default function Cite({ n }) {
  const ids = Array.isArray(n) ? n : [n]

  return (
    <sup className="ml-px whitespace-nowrap font-sans text-[0.68em]">
      [
      {ids.map((id, index) => (
        <span key={id}>
          {index > 0 && ', '}
          <a href={`#ref-${id}`} className="no-underline hover:underline">
            {id}
          </a>
        </span>
      ))}
      ]
    </sup>
  )
}
