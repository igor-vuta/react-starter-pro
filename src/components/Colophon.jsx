import { meta, REPO_URL } from '../data/document'

export default function Colophon() {
  return (
    <footer className="mt-20 border-t-2 rule pt-8 pb-16">
      <h2 className="label mb-4">Colophon</h2>
      <div className="article !text-[0.92rem]">
        <p className="!text-[0.92rem]">
          This document is the front page of the template it describes: it is built with the stack
          in §<a href="#architecture">2</a>, formatted and linted by the toolchain in §
          <a href="#toolchain">3</a>, and was promoted to production through the branching model in
          §<a href="#branching">4</a>. Set in Source Serif&nbsp;4, with Inter for structural text
          and IBM Plex Mono for code.
        </p>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-sans text-[0.8rem] text-muted dark:text-parchment-muted">
        <span>
          {meta.title} v{meta.version}
        </span>
        <span>Revised {meta.revised}</span>
        <a
          href={`${REPO_URL}/blob/main/LICENSE`}
          target="_blank"
          rel="noreferrer"
          className="underline-offset-4 hover:underline"
        >
          {meta.license} licence
        </a>
        <a
          href={REPO_URL}
          target="_blank"
          rel="noreferrer"
          className="underline-offset-4 hover:underline"
        >
          Repository ↗
        </a>
        <a
          href={`${REPO_URL}/blob/main/docs/DEVELOPMENT.md`}
          target="_blank"
          rel="noreferrer"
          className="underline-offset-4 hover:underline"
        >
          docs/ ↗
        </a>
        <a href="#top" className="no-print underline-offset-4 hover:underline">
          Return to top ↑
        </a>
      </div>
    </footer>
  )
}
