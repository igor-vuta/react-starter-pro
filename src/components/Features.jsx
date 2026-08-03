import Section from './Section'
import { features } from '../data/content'

export default function Features() {
  return (
    <Section
      id="features"
      eyebrow="What's inside"
      title="Everything wired up, nothing to unpick"
      description="Each piece is configured to work with the others — the linter does not fight the formatter, and the hooks run the same checks CI does."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <article key={feature.title} className="card">
            <div className="grid size-10 place-items-center rounded-xl bg-brand-50 text-xl dark:bg-brand-500/10">
              {feature.icon}
            </div>
            <h3 className="mt-4 font-semibold text-ink-900 dark:text-white">{feature.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-600 dark:text-ink-400">
              {feature.body}
            </p>
          </article>
        ))}
      </div>
    </Section>
  )
}
