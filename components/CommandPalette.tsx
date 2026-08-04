import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { PROJECTS } from '../data'

interface Command {
  id: string
  label: string
  description?: string
  category: string
  action: () => void
  icon: string
}

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

function buildCommands(): Command[] {
  const nav: Command[] = [
    { id: 'home', label: 'Go to Home', description: 'Hero section', category: 'Navigation', icon: '🏠', action: () => scrollTo('home') },
    { id: 'about', label: 'Go to About', description: 'Biography & journey', category: 'Navigation', icon: '👤', action: () => scrollTo('about') },
    { id: 'skills', label: 'Go to Skills', description: 'Tech stack overview', category: 'Navigation', icon: '⚡', action: () => scrollTo('skills') },
    { id: 'projects', label: 'Go to Projects', description: 'Portfolio & work', category: 'Navigation', icon: '🚀', action: () => scrollTo('projects') },
    { id: 'experience', label: 'Go to Experience', description: 'Work history', category: 'Navigation', icon: '💼', action: () => scrollTo('experience') },
    { id: 'contact', label: 'Go to Contact', description: 'Get in touch', category: 'Navigation', icon: '✉️', action: () => scrollTo('contact') },
  ]

  const links: Command[] = [
    { id: 'github', label: 'Open GitHub', description: 'github.com/abobakeryagoub', category: 'Links', icon: '🐙', action: () => window.open('https://github.com/abobakeryagoub', '_blank') },
    { id: 'linkedin', label: 'Open LinkedIn', description: 'linkedin.com/in/abobakeryagoub', category: 'Links', icon: '💼', action: () => window.open('https://linkedin.com/in/abobakeryagoub', '_blank') },
    { id: 'email', label: 'Copy Email', description: 'abobaker.yagoub@gmail.com', category: 'Links', icon: '📧', action: () => navigator.clipboard.writeText('abobaker.yagoub@gmail.com') },
    { id: 'cv', label: 'Download CV', description: 'Get resume PDF', category: 'Links', icon: '📄', action: () => { const a = document.createElement('a'); a.href = '/cv.pdf'; a.download = 'CV.pdf'; a.click() } },
  ]

  const projects: Command[] = PROJECTS.map((p) => ({
    id: `project-${p.id}`,
    label: p.title,
    description: p.category,
    category: 'Projects',
    icon: '📦',
    action: () => { scrollTo('projects') },
  }))

  return [...nav, ...links, ...projects]
}

interface CommandPaletteProps {
  isDark: boolean
  onThemeToggle: () => void
}

export default function CommandPalette({ isDark, onThemeToggle }: CommandPaletteProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const commands = buildCommands()
  commands.push({
    id: 'theme',
    label: isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode',
    description: 'Toggle color theme',
    category: 'Settings',
    icon: isDark ? '☀️' : '🌙',
    action: onThemeToggle,
  })

  const filtered = query.trim()
    ? commands.filter(
        (c) =>
          c.label.toLowerCase().includes(query.toLowerCase()) ||
          (c.description && c.description.toLowerCase().includes(query.toLowerCase())) ||
          c.category.toLowerCase().includes(query.toLowerCase())
      )
    : commands

  const grouped = filtered.reduce<Record<string, Command[]>>((acc, cmd) => {
    acc[cmd.category] = acc[cmd.category] || []
    acc[cmd.category].push(cmd)
    return acc
  }, {})

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
        setQuery('')
        setSelected(0)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50)
  }, [open])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!open) return
      if (e.key === 'ArrowDown') { e.preventDefault(); setSelected((s) => Math.min(s + 1, filtered.length - 1)) }
      if (e.key === 'ArrowUp') { e.preventDefault(); setSelected((s) => Math.max(s - 1, 0)) }
      if (e.key === 'Enter') {
        const cmd = filtered[selected]
        if (cmd) { cmd.action(); setOpen(false); setQuery('') }
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, filtered, selected])

  const run = (cmd: Command) => {
    cmd.action()
    setOpen(false)
    setQuery('')
  }

  let flatIndex = 0

  return (
    <>
      {/* Trigger hint */}
      <button
        onClick={() => { setOpen(true); setQuery('') }}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-mono glass shadow-lg transition-all hover:scale-[1.03]"
        style={{ color: 'var(--muted-foreground)', border: '1px solid var(--border)' }}
        aria-label="Open command palette"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <span className="hidden sm:inline">Search</span>
        <kbd className="px-1.5 py-0.5 rounded text-[10px]" style={{ background: 'var(--secondary)', color: 'var(--muted-foreground)' }}>
          ⌘K
        </kbd>
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-[200]"
              style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
              onClick={() => setOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="fixed top-[15%] left-1/2 -translate-x-1/2 z-[201] w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl"
              style={{ border: '1px solid var(--border)' }}
            >
              {/* Search input */}
              <div
                className="flex items-center gap-3 px-4 py-3.5"
                style={{ background: 'rgba(10,10,20,0.96)', borderBottom: '1px solid var(--border)' }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" width="16" height="16" className="flex-shrink-0">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setSelected(0) }}
                  placeholder="Search commands, projects, sections…"
                  className="flex-1 text-sm bg-transparent outline-none font-body"
                  style={{ color: 'var(--foreground)' }}
                />
                {query && (
                  <button onClick={() => setQuery('')} style={{ color: 'var(--muted-foreground)' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                      <line x1="18" y1="6" x2="6" y2="18"/>
                      <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                )}
                <kbd
                  className="px-2 py-1 rounded text-xs font-mono"
                  style={{ background: 'var(--secondary)', color: 'var(--muted-foreground)' }}
                >
                  Esc
                </kbd>
              </div>

              {/* Results */}
              <div
                ref={listRef}
                className="max-h-72 overflow-y-auto py-2"
                style={{ background: 'rgba(8,8,16,0.98)' }}
              >
                {Object.keys(grouped).length === 0 ? (
                  <div className="px-4 py-8 text-center text-sm" style={{ color: 'var(--muted-foreground)' }}>
                    No results for &ldquo;{query}&rdquo;
                  </div>
                ) : (
                  Object.entries(grouped).map(([category, cmds]) => (
                    <div key={category}>
                      <div
                        className="px-4 py-1.5 text-[10px] font-mono font-semibold uppercase tracking-widest"
                        style={{ color: 'var(--muted-foreground)' }}
                      >
                        {category}
                      </div>
                      {cmds.map((cmd) => {
                        const idx = flatIndex++
                        const isActive = idx === selected
                        return (
                          <button
                            key={cmd.id}
                            onClick={() => run(cmd)}
                            onMouseEnter={() => setSelected(idx)}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors duration-100"
                            style={{
                              background: isActive ? 'rgba(99,102,241,0.1)' : 'transparent',
                              borderLeft: isActive ? '2px solid #6366f1' : '2px solid transparent',
                            }}
                          >
                            <span className="text-base w-5 text-center flex-shrink-0">{cmd.icon}</span>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium truncate" style={{ color: isActive ? '#e2e8f0' : 'var(--muted-foreground)' }}>
                                {cmd.label}
                              </div>
                              {cmd.description && (
                                <div className="text-xs truncate" style={{ color: '#475569' }}>
                                  {cmd.description}
                                </div>
                              )}
                            </div>
                            {isActive && (
                              <kbd className="text-[10px] px-1.5 py-0.5 rounded font-mono flex-shrink-0"
                                style={{ background: 'rgba(99,102,241,0.15)', color: '#818cf8' }}>
                                ↵
                              </kbd>
                            )}
                          </button>
                        )
                      })}
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div
                className="px-4 py-2 flex items-center gap-4 text-[10px] font-mono"
                style={{ background: 'rgba(5,5,8,0.98)', borderTop: '1px solid var(--border)', color: '#475569' }}
              >
                <span><kbd className="mr-1">↑↓</kbd>navigate</span>
                <span><kbd className="mr-1">↵</kbd>select</span>
                <span><kbd className="mr-1">Esc</kbd>close</span>
                <span className="ml-auto">{filtered.length} results</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
