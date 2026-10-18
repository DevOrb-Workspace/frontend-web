import { useEffect, useState } from 'react'
import './hero.css'

// Har word ka color uske module ka accent hai: Board = orange, Code = cyan, Chat = lime
const WORDS = [
  { text: 'plan',    color: 'var(--board)' },
  { text: 'build',   color: 'var(--code)' },
  { text: 'discuss', color: 'var(--chat)' },
]

const MODULES = [
  { label: 'Code',  hint: 'Repos & pull requests', color: 'var(--code)' },
  { label: 'Board', hint: 'Issues & sprints',      color: 'var(--board)' },
  { label: 'Chat',  hint: 'Channels & threads',    color: 'var(--chat)' },
]

export default function Hero() {
  const [i, setI] = useState(0)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const id = setInterval(() => setI((n) => (n + 1) % WORDS.length), 2600)
    return () => clearInterval(id)
  }, [])

  const word = WORDS[i]

  return (
    <section className="hero">
      <div className="hero-status">
        <span className="hero-pulse" />
        All systems operational
      </div>

      <h1 className="hero-title">
        One workspace to{' '}
        <span className="hero-word-wrap">
          <span key={word.text} className="hero-word" style={{ color: word.color }}>
            {word.text}
          </span>
          <span key={'u' + word.text} className="hero-underline" style={{ background: word.color }} />
        </span>
        .
      </h1>

      <p className="hero-sub">
        Issues, pull requests and conversations, linked together in one place.
      </p>

      <div className="hero-modules">
        {MODULES.map((m, idx) => (
          <div key={m.label} className="hero-chip" style={{ '--c': m.color, animationDelay: `${0.25 + idx * 0.1}s` }}>
            <span className="hero-dot" />
            <strong>{m.label}</strong>
            <span>{m.hint}</span>
          </div>
        ))}
      </div>
    </section>
  )
}