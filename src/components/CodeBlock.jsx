import { useState } from 'react'

export default function CodeBlock({ code, label }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      // Clipboard is unavailable (insecure origin or denied permission) —
      // the code is selectable, so silently leave the button alone.
    }
  }

  return (
    <div className="group relative overflow-hidden rounded-xl border border-ink-200 bg-ink-950 dark:border-ink-800">
      {label && (
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2">
          <span className="size-2.5 rounded-full bg-rose-400/80" />
          <span className="size-2.5 rounded-full bg-amber-400/80" />
          <span className="size-2.5 rounded-full bg-emerald-400/80" />
          <span className="ml-2 font-mono text-xs text-ink-400">{label}</span>
        </div>
      )}
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? 'Copied' : 'Copy to clipboard'}
        className="absolute right-2 top-2 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs
          font-medium text-ink-300 opacity-0 transition hover:bg-white/10 hover:text-white
          focus-visible:opacity-100 group-hover:opacity-100"
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
      <pre className="overflow-x-auto px-4 py-4 text-sm leading-relaxed">
        <code className="font-mono text-ink-200">{code}</code>
      </pre>
    </div>
  )
}
