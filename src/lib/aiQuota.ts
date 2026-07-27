// Client-side daily quota for AI queries, shared by the chat and the job-fit
// tool. This is a cost guard for casual visitors, not a security boundary —
// the Edge Function enforces the hard input/output limits.

export const MAX_DAILY_QUERIES = 5

const STORAGE_KEY = 'ai-query-quota'

type QuotaRecord = {
  date: string
  used: number
}

function todayKey(): string {
  return new Date().toISOString().slice(0, 10)
}

function readQuota(): QuotaRecord {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as QuotaRecord
      if (parsed.date === todayKey() && typeof parsed.used === 'number') {
        return parsed
      }
    }
  } catch {
    // Corrupt storage: fall through to a fresh record.
  }
  return { date: todayKey(), used: 0 }
}

export function getRemainingQueries(): number {
  return Math.max(0, MAX_DAILY_QUERIES - readQuota().used)
}

export function consumeQuery(): number {
  const quota = readQuota()
  quota.used = Math.min(MAX_DAILY_QUERIES, quota.used + 1)
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(quota))
  } catch {
    // Storage unavailable (private mode): quota simply resets per load.
  }
  return Math.max(0, MAX_DAILY_QUERIES - quota.used)
}
