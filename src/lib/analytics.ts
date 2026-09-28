type AnalyticsEventType = 'session_start' | 'page_view' | 'click' | 'engagement'

type AnalyticsPayload = {
  eventId: string
  eventType: AnalyticsEventType
  visitorId: string
  sessionId: string
  isNewVisitor: boolean
  path: string
  referrerHost?: string
  target?: string
  durationSeconds?: number
}

const endpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT as string | undefined
const consentKey = 'portfolio_analytics_consent_v1'
const visitorKey = 'portfolio_visitor_id_v1'
const sessionKey = 'portfolio_session_id_v1'
const sessionStartedKey = 'portfolio_session_started_v1'

function randomId(): string {
  if (typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  const bytes = crypto.getRandomValues(new Uint8Array(16))
  bytes[6] = (bytes[6] & 0x0f) | 0x40
  bytes[8] = (bytes[8] & 0x3f) | 0x80
  const hex = [...bytes].map((value) => value.toString(16).padStart(2, '0')).join('')
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
}

function storageValue(storage: Storage, key: string): string | null {
  try {
    return storage.getItem(key)
  } catch {
    return null
  }
}

function saveStorageValue(storage: Storage, key: string, value: string): boolean {
  try {
    storage.setItem(key, value)
    return storage.getItem(key) === value
  } catch {
    return false
  }
}

function referrerHost(): string | undefined {
  if (!document.referrer) {
    return undefined
  }

  try {
    return new URL(document.referrer).hostname.slice(0, 253)
  } catch {
    return undefined
  }
}

function currentPath(): string {
  return `${window.location.pathname}${window.location.hash}`.slice(0, 512)
}

function postEvent(payload: AnalyticsPayload) {
  if (!endpoint) {
    return
  }

  void fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => {
    // Analytics must never interrupt the portfolio experience.
  })
}

let initialized = false

export function analyticsConsentStatus(): 'accepted' | 'declined' | 'unset' {
  if (!endpoint || typeof window === 'undefined' || navigator.doNotTrack === '1') {
    return 'declined'
  }
  const value = storageValue(window.localStorage, consentKey)
  return value === 'accepted' || value === 'declined' ? value : 'unset'
}

export function analyticsNeedsConsent(): boolean {
  return Boolean(endpoint) && analyticsConsentStatus() === 'unset'
}

export function setAnalyticsConsent(accepted: boolean) {
  if (!endpoint || typeof window === 'undefined') {
    return
  }
  saveStorageValue(window.localStorage, consentKey, accepted ? 'accepted' : 'declined')
  if (accepted) {
    initializeAnalytics()
  }
}

export function initializeAnalytics() {
  if (!endpoint || typeof window === 'undefined' || initialized || analyticsConsentStatus() !== 'accepted') {
    return
  }
  initialized = true

  const existingVisitorId = storageValue(window.localStorage, visitorKey)
  const visitorId = existingVisitorId ?? randomId()
  const visitorPersistenceAvailable = existingVisitorId !== null || saveStorageValue(window.localStorage, visitorKey, visitorId)

  const existingSessionId = storageValue(window.sessionStorage, sessionKey)
  const sessionId = existingSessionId ?? randomId()
  const sessionPersistenceAvailable = existingSessionId !== null || saveStorageValue(window.sessionStorage, sessionKey, sessionId)
  const isNewVisitor = existingVisitorId === null
  const common = { visitorId, sessionId, isNewVisitor }

  const send = (eventType: AnalyticsEventType, target?: string, durationSeconds?: number) => {
    postEvent({
      ...common,
      eventId: randomId(),
      eventType,
      path: currentPath(),
      referrerHost: referrerHost(),
      target: target?.slice(0, 160),
      durationSeconds,
    })
  }

  const sessionAlreadyStarted = storageValue(window.sessionStorage, sessionStartedKey) === sessionId
  if (visitorPersistenceAvailable && sessionPersistenceAvailable && !sessionAlreadyStarted) {
    send('session_start')
    saveStorageValue(window.sessionStorage, sessionStartedKey, sessionId)
  }
  send('page_view')

  const onClick = (event: MouseEvent) => {
    const target = event.target
    if (!(target instanceof Element)) {
      return
    }
    const tracked = target.closest<HTMLElement>('[data-analytics]')
    const label = tracked?.dataset.analytics?.trim()
    if (label) {
      send('click', label)
    }
  }
  document.addEventListener('click', onClick, { capture: true })

  let visibleSince = document.visibilityState === 'visible' ? Date.now() : 0
  let unsentVisibleMs = 0

  const flushDuration = () => {
    if (visibleSince > 0) {
      unsentVisibleMs += Date.now() - visibleSince
      visibleSince = 0
    }
    const durationSeconds = Math.floor(unsentVisibleMs / 1000)
    if (durationSeconds >= 5) {
      send('engagement', 'time_on_page', Math.min(durationSeconds, 86_400))
      unsentVisibleMs = 0
    }
  }

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      flushDuration()
    } else {
      visibleSince = Date.now()
    }
  })
  window.addEventListener('pagehide', flushDuration)
}
