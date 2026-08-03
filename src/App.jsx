import Colophon from './components/Colophon'
import Contents from './components/Contents'
import Masthead from './components/Masthead'
import TopBar from './components/TopBar'
import Architecture from './sections/Architecture'
import Branching from './sections/Branching'
import Decisions from './sections/Decisions'
import Introduction from './sections/Introduction'
import Limitations from './sections/Limitations'
import References from './sections/References'
import Toolchain from './sections/Toolchain'
import Usage from './sections/Usage'
import { useHashTarget } from './hooks/useHashTarget'
import { useTheme } from './hooks/useTheme'

export default function App() {
  const { theme, toggleTheme } = useTheme()
  useHashTarget()

  return (
    <div className="min-h-screen">
      <TopBar theme={theme} onToggleTheme={toggleTheme} />

      <div className="mx-auto max-w-[92rem] px-6 pt-24 lg:px-10">
        <div className="lg:grid lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-14 xl:grid-cols-[18rem_minmax(0,1fr)]">
          {/* The table of contents tracks reading position on wide viewports;
              on narrow ones it is placed inline, before the document. */}
          <aside className="no-print mb-12 lg:sticky lg:top-24 lg:mb-0 lg:h-[calc(100vh-8rem)] lg:overflow-y-auto lg:pb-10">
            <Contents />
          </aside>

          <main className="min-w-0 max-w-[46rem]">
            <Masthead />
            <Introduction />
            <Architecture />
            <Toolchain />
            <Branching />
            <Usage />
            <Decisions />
            <Limitations />
            <References />
            <Colophon />
          </main>
        </div>
      </div>
    </div>
  )
}
