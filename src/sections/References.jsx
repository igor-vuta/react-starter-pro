import Section from '../components/Section'
import { glossary, references } from '../data/document'

export default function References() {
  return (
    <>
      <Section
        id="references"
        number="8"
        title="References"
        lead="Primary sources for every tool and model discussed. Where a claim in this document is contestable, the source is the better authority."
      >
        <ol className="!max-w-none !space-y-3 !pl-0 !list-none">
          {references.map((reference) => (
            <li
              key={reference.id}
              id={`ref-${reference.id}`}
              className="flex gap-4 target:bg-accent/5 dark:target:bg-clay/10"
            >
              <span className="w-8 shrink-0 font-mono text-[0.8rem] text-muted dark:text-parchment-muted">
                [{reference.id}]
              </span>
              <span className="text-[0.97rem]">
                {reference.text}{' '}
                <a href={reference.href} target="_blank" rel="noreferrer" className="break-words">
                  {reference.href.replace(/^https?:\/\//, '')}
                </a>
              </span>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        id="appendix-glossary"
        number="A"
        title="Appendix A. Glossary"
        lead="Terms used in this document with a specific meaning that differs from, or is narrower than, general usage."
      >
        <dl className="!max-w-none sm:grid sm:grid-cols-[14rem_1fr] sm:gap-x-8">
          {glossary.map((entry) => (
            <div key={entry.term} className="contents">
              <dt className="!mt-4 sm:!mt-3">{entry.term}</dt>
              <dd className="!mt-1 !text-[0.97rem] sm:!mt-3">{entry.definition}</dd>
            </div>
          ))}
        </dl>
      </Section>
    </>
  )
}
