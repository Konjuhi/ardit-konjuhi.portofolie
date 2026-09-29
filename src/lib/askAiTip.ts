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
