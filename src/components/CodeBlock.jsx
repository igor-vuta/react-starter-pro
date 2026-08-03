import { useState } from 'react'

export default function CodeBlock({ code, label, caption }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      // Clipboard is unavailable on insecure origins or when permission is
      // denied. The listing is selectable, so leave the button unchanged.
    }
  }

  return (
    <div className="my-6 max-w-[72ch]">
      <div className="group relative overflow-hidden rounded-sm border rule bg-paper-tint/70 dark:bg-night-tint">
        {label && (
          <div className="flex items-center justify-between border-b rule px-4 py-1.5">
            <span className="label !text-[0.65rem]">{label}</span>
          </div>
        )}
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? 'Copied to clipboard' : 'Copy listing to clipboard'}
          className="no-print absolute right-2 top-1.5 rounded-xs border rule bg-paper px-2 py-0.5
            font-sans text-[0.65rem] font-medium text-muted opacity-0 transition
            hover:text-ink focus-visible:opacity-100 group-hover:opacity-100
            dark:bg-night dark:text-parchment-muted dark:hover:text-white"
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
        <pre className="overflow-x-auto px-4 py-3.5">
          <code className="font-mono text-[0.8rem] leading-[1.7] text-ink/90 dark:text-parchment/85">
            {code}
          </code>
        </pre>
      </div>
      {caption && (
        <p className="!mt-2 !max-w-[68ch] font-sans !text-[0.78rem] leading-relaxed text-muted dark:text-parchment-muted">
          {caption}
        </p>
      )}
    </div>
  )
}
