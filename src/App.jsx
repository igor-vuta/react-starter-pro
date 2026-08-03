import Branching from './components/Branching'
import Features from './components/Features'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import QuickStart from './components/QuickStart'
import Resources from './components/Resources'
import Workflow from './components/Workflow'
import { useTheme } from './hooks/useTheme'

export default function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen font-sans">
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero />
        <Features />
        <QuickStart />
        <Workflow />
        <Branching />
        <Resources />
      </main>
      <Footer />
    </div>
  )
}
