/**
 * A numbered table with a caption above it, as in a printed paper.
 * `columns` is an array of header strings; `rows` an array of cell arrays.
 * Cells may contain JSX.
 */
export default function Table({ number, caption, columns, rows, align = [] }) {
  return (
    <figure className="my-8">
      <figcaption className="mb-3 max-w-[68ch] font-sans text-[0.8rem] leading-relaxed text-muted dark:text-parchment-muted">
        <span className="font-semibold text-ink dark:text-parchment">Table {number}.</span>{' '}
        {caption}
      </figcaption>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left font-sans text-[0.85rem]">
          <thead>
            <tr className="border-y-2 rule">
              {columns.map((column, index) => (
                <th
                  key={column}
                  scope="col"
                  className={`py-2.5 pr-5 align-bottom font-semibold text-ink dark:text-white ${
                    align[index] === 'right' ? 'text-right' : ''
                  }`}
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y rule">
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="align-top">
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={`py-2.5 pr-5 leading-relaxed text-muted dark:text-parchment-muted ${
                      align[cellIndex] === 'right' ? 'text-right' : ''
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  )
}
