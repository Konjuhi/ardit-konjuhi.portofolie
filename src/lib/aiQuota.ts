// Per-device daily quotas. Chat (5) and job-fit (1) are tracked separately.
// Stored in localStorage and a cookie so a page refresh cannot reset them.
// They reset on the next local calendar day. This is a visitor cost guard,
// not a logged-in security boundary.

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
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function maxFor(kind: QuotaKind): number {
  return kind === 'fit' ? MAX_DAILY_FIT : MAX_DAILY_CHAT
}

function usedFor(quota: QuotaRecord, kind: QuotaKind): number {
  return kind === 'fit' ? quota.fit : quota.chat
}

function isValidRecord(value: unknown): value is QuotaRecord {
  if (!value || typeof value !== 'object') {
    return false
  }
  const record = value as QuotaRecord
  return (
    record.date === todayKey() &&
    typeof record.chat === 'number' &&
    typeof record.fit === 'number'
  )
}

function readCookie(): QuotaRecord | null {
  if (typeof document === 'undefined') {
    return null
  }
  const prefix = `${STORAGE_KEY}=`
  const match = document.cookie.split('; ').find((part) => part.startsWith(prefix))
  if (!match) {
    return null
  }
  try {
    const parsed: unknown = JSON.parse(decodeURIComponent(match.slice(prefix.length)))
    return isValidRecord(parsed) ? parsed : null
  } catch {
    return null
  }
}

function readStorage(): QuotaRecord | null {
  if (typeof localStorage === 'undefined') {
    return null
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return null
    }
    const parsed: unknown = JSON.parse(raw)
    return isValidRecord(parsed) ? parsed : null
  } catch {
    return null
  }
}

function emptyQuota(): QuotaRecord {
  return { date: todayKey(), chat: 0, fit: 0 }
}

function readQuota(): QuotaRecord {
  return readStorage() ?? readCookie() ?? emptyQuota()
}

function writeQuota(quota: QuotaRecord) {
  const payload = JSON.stringify(quota)
  try {
    localStorage.setItem(STORAGE_KEY, payload)
  } catch {
    // Private mode may block localStorage; cookie below is the fallback.
  }
  if (typeof document === 'undefined') {
    return
  }
  const twoDays = 60 * 60 * 48
  document.cookie = `${STORAGE_KEY}=${encodeURIComponent(payload)}; max-age=${twoDays}; path=/; SameSite=Lax`
}

export function getRemaining(kind: QuotaKind): number {
  return Math.max(0, maxFor(kind) - usedFor(readQuota(), kind))
}

// Spend one slot only after a successful answer. Failures do not count.
// Returns remaining after spending, or null if today's limit is already used.
export function exhaust(kind: QuotaKind): number {
  const quota = readQuota()
  if (kind === 'fit') {
    quota.fit = MAX_DAILY_FIT
  } else {
    quota.chat = MAX_DAILY_CHAT
  }
  writeQuota(quota)
  return 0
}

export function consume(kind: QuotaKind): number | null {
  const quota = readQuota()
  const max = maxFor(kind)
  if (usedFor(quota, kind) >= max) {
    return null
  }
  if (kind === 'fit') {
    quota.fit += 1
  } else {
    quota.chat += 1
  }
  writeQuota(quota)
  return Math.max(0, max - usedFor(quota, kind))
}
