// Client-side daily quotas. Chat and job-fit are tracked separately so using
// one does not spend the other. This is a cost guard for casual visitors, not
// a security boundary — the Edge Function still enforces input/output limits.

export const MAX_DAILY_CHAT = 5
export const MAX_DAILY_FIT = 1

export type QuotaKind = 'chat' | 'fit'

const STORAGE_KEY = 'ai-query-quota-v2'

type QuotaRecord = {
  date: string
  chat: number
  fit: number
}

function todayKey(): string {
  return new Date().toISOString().slice(0, 10)
}

function maxFor(kind: QuotaKind): number {
  return kind === 'fit' ? MAX_DAILY_FIT : MAX_DAILY_CHAT
}

function readQuota(): QuotaRecord {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as QuotaRecord
      if (
        parsed.date === todayKey() &&
        typeof parsed.chat === 'number' &&
        typeof parsed.fit === 'number'
      ) {
        return parsed
      }
    }
  } catch {
    // Corrupt storage: fall through to a fresh record.
  }
  return { date: todayKey(), chat: 0, fit: 0 }
}

function writeQuota(quota: QuotaRecord) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(quota))
  } catch {
    // Storage unavailable (private mode): quota simply resets per load.
  }
}

export function getRemaining(kind: QuotaKind): number {
  const used = kind === 'fit' ? readQuota().fit : readQuota().chat
  return Math.max(0, maxFor(kind) - used)
}

export function consume(kind: QuotaKind): number {
  const quota = readQuota()
  const max = maxFor(kind)
  if (kind === 'fit') {
    quota.fit = Math.min(max, quota.fit + 1)
  } else {
    quota.chat = Math.min(max, quota.chat + 1)
  }
  writeQuota(quota)
  return Math.max(0, max - (kind === 'fit' ? quota.fit : quota.chat))
}
