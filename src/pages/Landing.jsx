
import { useEffect, useState } from 'react'
import './Landing.css'

export default function Landing({ onGetStarted }) {
  const [lightMode, setLightMode] = useState(false)

  const phrases = [
    'a team in orbit.',
    'ideas into reality.',
    'work better together.'
  ]

  const [phraseIndex, setPhraseIndex] = useState(0)
  const [typedText, setTypedText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex]

    const timer = setTimeout(() => {
      if (!deleting) {
        const nextText = currentPhrase.slice(0, typedText.length + 1)
        setTypedText(nextText)

        if (nextText === currentPhrase) {
          setDeleting(true)
        }
      } else {
        const nextText = currentPhrase.slice(0, typedText.length - 1)
        setTypedText(nextText)

        if (nextText === '') {
          setDeleting(false)
          setPhraseIndex(prev => (prev + 1) % phrases.length)
        }
      }
    }, deleting ? 45 : typedText === currentPhrase ? 1400 : 90)

    return () => clearTimeout(timer)
  }, [typedText, deleting, phraseIndex])

  return (
    <main className={`landing ${lightMode ? 'light-mode' : ''}`}>
      <nav className="landing-nav">
        <a className="landing-brand" href="#home">
          ◉ orbit
        </a>

        <div className="landing-links">
          <a href="#features">Features</a>
          <a href="#about">About Orbit</a>
        </div>

        <div className="landing-nav-actions">
          <button
            className="theme-toggle"
            onClick={() => setLightMode(prev => !prev)}
            aria-label={
              lightMode ? 'Switch to dark mode' : 'Switch to light mode'
            }
            title={lightMode ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {lightMode ? '🌙' : '☀️'}
          </button>

          <button onClick={onGetStarted}>
            Get started ↗
          </button>
        </div>
      </nav>

      <section className="landing-hero" id="home">
        <span className="landing-eyebrow">
          A BETTER WAY TO BUILD TOGETHER
        </span>

        <h1>
          Big ideas deserve
          <br />
          <span className="typing-text">
            {typedText}
            <span className="typing-cursor">|</span>
          </span>
        </h1>

        <p>
          Projects, conversations and ideas — all moving
          in the same direction. Bring your team together
          and turn your next big idea into progress.
        </p>

        <div className="landing-actions">
          <button onClick={onGetStarted}>
            Get started for free ↗
          </button>

          <a href="#features">Explore Orbit ↓</a>
        </div>

        <div className="landing-orbit-art" aria-hidden="true">
          <span className="orbit-ring ring-one" />
          <span className="orbit-ring ring-two" />
          <span className="orbit-ring ring-three" />
          <span className="orbit-core">O</span>
        </div>
      </section>

      <section className="landing-quote" id="about">
        <span>THE ORBIT IDEA</span>

        <h2>
          “Great work happens when every idea,
          every person and every next step connect.”
        </h2>

        <p>
          Less switching between tools. More time creating
          something meaningful together.
        </p>
      </section>

      <section className="landing-features" id="features">
        <span className="landing-eyebrow">
          YOUR TEAM, IN ONE PLACE
        </span>

        <h2>
          Everything connected.
          <br />
          Nothing scattered.
        </h2>

        <div className="landing-feature-grid">
          <article>
            <span>01 / PLAN</span>
            <h3>Projects that move forward.</h3>
            <p>
              Organise tasks, track progress and clarify the next step.
            </p>
          </article>

          <article>
            <span>02 / CONNECT</span>
            <h3>Conversations with purpose.</h3>
            <p>
              Keep team discussions and project updates connected.
            </p>
          </article>

          <article>
            <span>03 / CREATE</span>
            <h3>Different minds. One mission.</h3>
            <p>
              Give every role the space to do their best work.
            </p>
          </article>
        </div>
      </section>

      <section className="landing-cta">
        <h2>Ready to bring your team into orbit?</h2>

        <button onClick={onGetStarted}>
          Let's get started ↗
        </button>
      </section>

      <footer className="landing-footer">
        <a className="landing-brand" href="#home">
          ◉ orbit
        </a>

        <span>Built for teams that think bigger.</span>
      </footer>
    </main>
  )
}
