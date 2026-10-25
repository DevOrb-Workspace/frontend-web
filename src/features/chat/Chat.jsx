import { useRef, useState } from 'react'
import { apiRequest } from '../../services/api'

export default function Chat() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const messagesEndRef = useRef(null)

  async function sendMessage(event) {
    event?.preventDefault()

    const message = input.trim()
    if (!message || loading) return

    const history = messages.map(({ role, text }) => ({ role, text }))

    setMessages(previous => [
      ...previous,
      { role: 'user', text: message },
    ])
    setInput('')
    setError('')
    setLoading(true)

    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 90000)

      let data
      try {
        data = await apiRequest('/api/chatbot/chat', {
          method: 'POST',
          body: JSON.stringify({ message, history }),
          signal: controller.signal,
        })
      } finally {
        clearTimeout(timeout)
      }

      if (!data.success || !data.reply) {
        throw new Error(data.message || 'Orbit AI could not generate a reply.')
      }

      setMessages(previous => [
        ...previous,
        { role: 'ai', text: data.reply },
      ])
    } catch (err) {
      setError(
        err.name === 'AbortError'
          ? 'Orbit AI is taking longer than expected. Please try again.'
          : err.status === 503 || err.message?.includes('503')
            ? 'Orbit AI is waking up. Please try again in a minute.'
            : err.message || 'Unable to connect to Orbit AI.'
      )
    } finally {
      setLoading(false)
      setTimeout(() => messagesEndRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      }), 50)
    }
  }

  return (
    <section className="panel orbit-ai-panel" id="orbit-ai">
      <div className="panel-heading">
        <div>
          <h2>Orbit AI</h2>
          <p>Your AI assistant for project and developer workflows.</p>
        </div>
        <span className="chat-live"><i /> AI Assistant</span>
      </div>

      <div className="orbit-ai-messages" aria-live="polite">
        {messages.length === 0 && (
          <div className="orbit-ai-welcome">
            <span className="orbit-ai-sparkle">✦</span>
            <h3>What can I help you with?</h3>
            <p>Ask about GitHub, project workflows, debugging, or teamwork.</p>
          </div>
        )}

        {messages.map((item, index) => (
          <article
            key={`${item.role}-${index}`}
            className={`orbit-ai-message ${item.role}`}
          >
            <strong>{item.role === 'user' ? 'You' : 'Orbit AI'}</strong>
            <p>{item.text}</p>
          </article>
        ))}

        {loading && (
          <div className="orbit-ai-thinking" role="status">
            Orbit AI is thinking…
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {error && (
        <div className="orbit-ai-error" role="alert">
          <span>{error}</span>
          <button
            type="button"
            onClick={() => {
              const lastUserMessage = [...messages]
                .reverse()
                .find(item => item.role === 'user')
              if (lastUserMessage) {
                setInput(lastUserMessage.text)
                setError('')
              }
            }}
          >
            Retry
          </button>
        </div>
      )}

      <form className="orbit-ai-form" onSubmit={sendMessage}>
        <input
          value={input}
          onChange={event => setInput(event.target.value)}
          placeholder="Ask Orbit AI anything…"
          aria-label="Message Orbit AI"
          disabled={loading}
        />
        <button type="submit" disabled={loading || !input.trim()}>
          {loading ? '…' : 'Send ↗'}
        </button>
      </form>
      <p className="orbit-ai-note">
        The first response can take up to 90 seconds while the AI service wakes up.
      </p>
    </section>
  )
}
