import { motion } from 'framer-motion'
import { TESTIMONIALS } from '../data'

export default function Testimonials() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-xs font-mono font-semibold tracking-widest uppercase mb-3 block" style={{ color: '#f59e0b' }}>
            Testimonials
          </span>
          <h2 className="font-display font-bold text-4xl mb-4" style={{ color: 'var(--foreground)' }}>
            What Clients Say
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6 flex flex-col gap-4"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, j) => (
                  <svg key={j} viewBox="0 0 24 24" fill="#f59e0b" width="14" height="14">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                ))}
              </div>

              <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--muted-foreground)' }}>
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-3" style={{ borderTop: '1px solid var(--border)' }}>
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-sm" style={{ color: 'var(--foreground)' }}>{t.name}</div>
                  <div className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
