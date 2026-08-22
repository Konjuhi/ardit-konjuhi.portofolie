import { useState } from 'react'
import { askAi, MAX_FIT_CHARS } from '../lib/askAi'
import { getRemaining, tryConsume, MAX_DAILY_FIT } from '../lib/aiQuota'
import { LinkedText } from '../lib/linkify'
import { isSupabaseConfigured } from '../lib/supabaseClient'

function JobFitAssessment() {
  const [jobDescription, setJobDescription] = useState('')
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [remaining, setRemaining] = useState(() => getRemaining('fit'))

  const quotaExhausted = remaining <= 0
  const disabled = !isSupabaseConfigured || loading || quotaExhausted

  const analyzeFit = async () => {
    const trimmed = jobDescription.trim()
    if (trimmed.length === 0 || disabled) {
      return
    }

    const leftover = tryConsume('fit')
    if (leftover === null) {
      setRemaining(0)
      return
    }
    setRemaining(leftover)

    setError(null)
    setResult(null)
    setLoading(true)

    try {
      const answer = await askAi(trimmed, 'fit-assessment')
      setResult(answer)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <article className="ai-card">
      <div className="ai-card-head">
        <h3>Analyze Job Fit</h3>
        <p className="quota-line">
          {quotaExhausted
            ? 'Daily job analysis used — you can still ask up to 5 chat questions today.'
            : `${remaining}/${MAX_DAILY_FIT} job analysis remaining today · chat questions are separate (5/day)`}
        </p>
      </div>

      {!isSupabaseConfigured ? (
        <p className="ai-notice">The job fit tool is not configured yet. Check back soon.</p>
      ) : (
        <>
          <p className="ai-hint">
            Paste a job description or freelance project brief below and get an honest breakdown of where Ardit
            matches and where he does not.
          </p>
          <textarea
            className="fit-textarea"
            value={jobDescription}
            maxLength={MAX_FIT_CHARS}
            rows={7}
            placeholder="Paste the job description here…"
            aria-label="Job description"
            disabled={disabled}
            onChange={(event) => setJobDescription(event.target.value)}
          />
          <div className="fit-footer">
            <span className="char-count">
              {jobDescription.length}/{MAX_FIT_CHARS}
            </span>
            <button
              className="btn btn-primary btn-compact"
              type="button"
              disabled={disabled || jobDescription.trim().length === 0}
              onClick={analyzeFit}
            >
              {loading ? 'Analyzing…' : 'Analyze Compatibility'}
            </button>
          </div>

          {error ? <p className="ai-error">{error}</p> : null}
          {result ? (
            <div className="fit-result">
              <LinkedText text={result} />
            </div>
          ) : null}
          <p className="ai-region-note">
            AI-generated. May be unavailable in a few regions where the underlying model is not supported.
          </p>
        </>
      )}
    </article>
  )
}

export default JobFitAssessment
