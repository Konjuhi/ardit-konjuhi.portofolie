const TIP_STORAGE_KEY = 'portfolio-ai-tip-v1'

export function hasSeenAskAiTip(): boolean {
  try {
    return localStorage.getItem(TIP_STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

export function markAskAiTipSeen() {
  try {
    localStorage.setItem(TIP_STORAGE_KEY, '1')
  } catch {
    // Private mode may block storage; the tip can appear again next visit.
  }
}

type AskAiTipProps = {
  open: boolean
  onAsk: () => void
  onDismiss: () => void
}

function AskAiTip({ open, onAsk, onDismiss }: AskAiTipProps) {
  if (!open) {
    return null
  }

  return (
    <div className="tip-dialog-root" role="presentation">
      <div className="tip-dialog-backdrop" onClick={onDismiss} />
      <div
        className="tip-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ask-ai-tip-title"
        aria-describedby="ask-ai-tip-copy"
      >
        <p className="eyebrow">Did you know?</p>
        <h2 id="ask-ai-tip-title">You have an agent that can answer questions about Ardit.</h2>
        <p id="ask-ai-tip-copy">
          Ask about his experience, shipped apps, and how he works — up to 5 questions a day.
        </p>
        <div className="tip-dialog-actions">
          <button className="btn btn-primary" type="button" onClick={onAsk}>
            Ask the agent
          </button>
          <button className="btn btn-secondary" type="button" onClick={onDismiss}>
            Not now
          </button>
        </div>
      </div>
    </div>
  )
}

export default AskAiTip
