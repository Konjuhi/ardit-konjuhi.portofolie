import { useEffect, useRef, useState } from 'react'
import { askAi, fetchServerQuota, isDailyLimitError, MAX_CHAT_CHARS } from '../lib/askAi'
import { consume, exhaust, getRemaining, MAX_DAILY_CHAT, syncRemaining } from '../lib/aiQuota'
import { LinkedText } from '../lib/linkify'
import { isSupabaseConfigured } from '../lib/supabaseClient'

type ChatMessage = {
  role: 'user' | 'ai'
  text: string
}

const suggestionPool = [
  'What is his strongest mobile experience?',
  'Has he shipped payment features?',
  'What are his honest gaps?',
  'What domains has he worked in?',
  'Has he worked with design systems?',
  'What did he build at PayByPhone?',
  'Has he built food ordering apps?',
  'How does he structure his apps?',
  'Has he shipped to both app stores?',
  'How many years of experience does he have?',
  'Which state management does he use?',
  'Has he done Flutter web development?',
  'What CI/CD tools does he use?',
  'Is he available for freelance work?',
  'Has he worked with BLoC or Riverpod?',
  'What backend tech has he used?',
  'Has he built apps for the EU market?',
  'What is his biggest project so far?',
  'How many apps has he shipped?',
  'What did Ardit study?',
]

function pickRandomSuggestions(): string[] {
  const shuffled = [...suggestionPool].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, 4)
}

function AskAiChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [suggestions] = useState<string[]>(pickRandomSuggestions)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [remaining, setRemaining] = useState(() => getRemaining('chat'))
  const logRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const resizeInput = () => {
    const el = inputRef.current
    if (!el) {
      return
    }
    el.style.height = 'auto'
    // Grow with content up to ~3 lines, then scroll inside.
    el.style.height = `${Math.min(el.scrollHeight, 96)}px`
  }

  const quotaExhausted = remaining <= 0
  const inputLocked = !isSupabaseConfigured || quotaExhausted
  const submitLocked = inputLocked || loading

  const focusInput = () => {
    requestAnimationFrame(() => {
      inputRef.current?.focus()
    })
  }

  const scrollLogToBottom = () => {
    requestAnimationFrame(() => {
      const el = logRef.current
      if (!el) {
        return
      }
      el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
      const drawer = el.closest('.chat-drawer-body')
      if (drawer instanceof HTMLElement) {
        drawer.scrollTo({ top: drawer.scrollHeight, behavior: 'smooth' })
      }
    })
  }

  useEffect(() => {
    let active = true
    void fetchServerQuota().then((server) => {
      if (active && server) {
        setRemaining(syncRemaining('chat', server.chat))
      }
    })
    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    scrollLogToBottom()
    const timeoutId = window.setTimeout(scrollLogToBottom, 50)
    return () => window.clearTimeout(timeoutId)
  }, [messages, loading, error])

  const submitQuestion = async (question: string) => {
    const trimmed = question.trim()
    if (trimmed.length === 0 || submitLocked) {
      return
    }

    setMessages((prev) => [...prev, { role: 'user', text: trimmed }])
    setInput('')
    if (inputRef.current) {
      inputRef.current.style.height = 'auto'
    }
    setError(null)
    setLoading(true)
    scrollLogToBottom()
    focusInput()

    try {
      const { answer, remaining: server } = await askAi(trimmed, 'chat')
      const local = consume('chat') ?? 0
      setRemaining(server ? syncRemaining('chat', server.chat) : local)
      setMessages((prev) => [...prev, { role: 'ai', text: answer }])
    } catch (err) {
      if (isDailyLimitError(err)) {
        setRemaining(exhaust('chat'))
      } else {
        setRemaining(getRemaining('chat'))
      }
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
      scrollLogToBottom()
      focusInput()
    }
  }

  return (
    <article className="ai-card">
      <div className="ai-card-head">
        <h3>Ask AI about Ardit</h3>
        <p className="quota-line">
          {quotaExhausted
            ? 'Daily question limit reached — come back tomorrow.'
            : `${remaining}/${MAX_DAILY_CHAT} questions remaining today · job-fit is separate (1/day)`}
        </p>
      </div>

      {!isSupabaseConfigured ? (
        <p className="ai-notice">The AI assistant is not configured yet. Check back soon.</p>
      ) : (
        <>
          <div className="chat-log" ref={logRef} aria-live="polite">
            {messages.length === 0 ? (
              <div className="chip-row">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    className="chip"
                    disabled={submitLocked}
                    onClick={() => submitQuestion(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            ) : (
              messages.map((message, index) => (
                <p key={`${message.role}-${index}`} className={`chat-msg ${message.role}`}>
                  {message.role === 'ai' ? <LinkedText text={message.text} /> : message.text}
                </p>
              ))
            )}
            {loading ? <p className="chat-msg ai pending">Thinking…</p> : null}
          </div>

          {error ? <p className="ai-error">{error}</p> : null}

          <form
            className="chat-input-row"
            onSubmit={(event) => {
              event.preventDefault()
              submitQuestion(input)
            }}
          >
            <textarea
              ref={inputRef}
              value={input}
              rows={1}
              maxLength={MAX_CHAT_CHARS}
              placeholder={quotaExhausted ? 'Daily limit reached' : 'Ask about Ardit…'}
              aria-label="Ask a question about Ardit"
              disabled={inputLocked}
              onChange={(event) => {
                setInput(event.target.value)
                resizeInput()
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  event.preventDefault()
                  submitQuestion(input)
                }
              }}
            />
            <button className="btn btn-primary btn-compact" type="submit" disabled={submitLocked || input.trim().length === 0}>
              {loading ? 'Asking…' : 'Ask'}
            </button>
          </form>
          <p className="ai-region-note">Questions may be reviewed by Ardit to help improve the assistant.</p>
        </>
      )}
    </article>
  )
}

export default AskAiChat
