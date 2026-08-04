import { motion } from 'framer-motion'
import { useState } from 'react'

type FormState = { name: string; email: string; subject: string; message: string }
type Status = 'idle' | 'loading' | 'success' | 'error'

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')
  const [copied, setCopied] = useState(false)

  const EMAIL = 'abobaker.yagoub@gmail.com'

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setStatus('loading')
    setTimeout(() => {
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setStatus('idle'), 5000)
    }, 1500)
  }

  return (
    <section id="contact" className="relative py-32 px-4">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 opacity-20"
        style={{ background: 'linear-gradient(to bottom, transparent, #6366f1)' }} />

      {/* Background accent */}
      <div className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center bottom, rgba(99,102,241,0.06) 0%, transparent 70%)' }} />

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono font-semibold tracking-widest uppercase mb-3 block" style={{ color: '#6366f1' }}>
            Get In Touch
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl mb-4" style={{ color: 'var(--foreground)' }}>
            Let&apos;s Work Together
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--muted-foreground)' }}>
            Have a project in mind? I&apos;m open to freelance projects, full-time roles, and interesting collaborations.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-4"
          >
            {/* Email card */}
            <div className="glass rounded-2xl p-5">
              <div className="text-xs font-mono font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--muted-foreground)' }}>
                Email
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm truncate" style={{ color: 'var(--foreground)' }}>{EMAIL}</span>
                <button
                  onClick={copyEmail}
                  className="flex-shrink-0 p-2 rounded-lg transition-all hover:scale-105"
                  style={{ background: copied ? 'rgba(16,185,129,0.1)' : 'var(--secondary)', color: copied ? '#10b981' : 'var(--muted-foreground)' }}
                  title="Copy email"
                >
                  {copied ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                      <rect x="9" y="9" width="13" height="13" rx="2"/>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Location */}
            <div className="glass rounded-2xl p-5">
              <div className="text-xs font-mono font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--muted-foreground)' }}>
                Location
              </div>
              <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--foreground)' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" width="14" height="14">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                Khartoum, Sudan · Open to Remote
              </div>
            </div>

            {/* Social links */}
            <div className="glass rounded-2xl p-5">
              <div className="text-xs font-mono font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--muted-foreground)' }}>
                Social
              </div>
              <div className="space-y-3">
                {[
                  { label: 'GitHub', href: 'https://github.com/abobakeryagoub', color: '#6366f1', sub: '@abobakeryagoub' },
                  { label: 'LinkedIn', href: 'https://linkedin.com/in/abobakeryagoub', color: '#0ea5e9', sub: '/in/abobakeryagoub' },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between group p-2 rounded-xl transition-all hover:bg-white/5"
                  >
                    <span className="font-semibold text-sm" style={{ color: 'var(--foreground)' }}>{s.label}</span>
                    <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{s.sub}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability badge */}
            <div className="glass rounded-2xl p-5 flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
              <div>
                <div className="font-semibold text-sm" style={{ color: 'var(--foreground)' }}>Available for hire</div>
                <div className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Response time: within 24h</div>
              </div>
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="glass rounded-3xl p-7 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--muted-foreground)' }}>
                    Name *
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Abobaker"
                    required
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                    style={{
                      background: 'var(--secondary)',
                      border: '1px solid var(--border)',
                      color: 'var(--foreground)',
                    }}
                    onFocus={(e) => { e.target.style.borderColor = '#6366f1'; e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.1)' }}
                    onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none' }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--muted-foreground)' }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                    required
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                    style={{ background: 'var(--secondary)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
                    onFocus={(e) => { e.target.style.borderColor = '#6366f1'; e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.1)' }}
                    onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none' }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--muted-foreground)' }}>
                  Subject
                </label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="Project collaboration"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                  style={{ background: 'var(--secondary)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
                  onFocus={(e) => { e.target.style.borderColor = '#6366f1'; e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.1)' }}
                  onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none' }}
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--muted-foreground)' }}>
                  Message *
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell me about your project..."
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 resize-none"
                  style={{ background: 'var(--secondary)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
                  onFocus={(e) => { e.target.style.borderColor = '#6366f1'; e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.1)' }}
                  onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none' }}
                />
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full py-3.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60"
                style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)', boxShadow: '0 0 30px rgba(99,102,241,0.25)' }}
              >
                {status === 'loading' ? (
                  <>
                    <svg className="animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                      <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                    </svg>
                    Sending...
                  </>
                ) : status === 'success' ? (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    Message Sent!
                  </>
                ) : (
                  <>
                    Send Message
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                      <line x1="22" y1="2" x2="11" y2="13"/>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                  </>
                )}
              </motion.button>

              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-sm py-2 rounded-xl"
                  style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981' }}
                >
                  Thanks! I&apos;ll get back to you within 24 hours.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
