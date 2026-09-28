declare const Deno: {
  env: { get(name: string): string | undefined }
  serve(handler: (request: Request) => Response | Promise<Response>): void
}

type EventType = 'session_start' | 'page_view' | 'click' | 'engagement'

type AnalyticsRequest = {
  eventId?: unknown
  eventType?: unknown
  visitorId?: unknown
  sessionId?: unknown
  isNewVisitor?: unknown
  path?: unknown
  referrerHost?: unknown
  target?: unknown
  durationSeconds?: unknown
}

type Location = {
  countryCode?: string
  countryName?: string
  region?: string
  city?: string
}

const defaultOrigins = ['https://konjuhi.github.io', 'http://localhost:5173']
const validEventTypes = new Set<EventType>(['session_start', 'page_view', 'click', 'engagement'])
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

function allowedOrigins(): Set<string> {
  const configured = Deno.env.get('ANALYTICS_ALLOWED_ORIGINS')
  const origins = configured?.split(',').map((value) => value.trim()).filter(Boolean) ?? defaultOrigins
  return new Set(origins)
}

function corsHeaders(origin: string): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Headers': 'content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  }
}

function json(body: Record<string, unknown>, status: number, origin: string): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' },
  })
}

function boundedString(value: unknown, maxLength: number): string | undefined {
  if (typeof value !== 'string') {
    return undefined
  }
  const normalized = value.trim()
  return normalized.length > 0 && normalized.length <= maxLength ? normalized : undefined
}

function decodeHeader(value: string | null, maxLength: number): string | undefined {
  if (!value) {
    return undefined
  }
  try {
    return decodeURIComponent(value).slice(0, maxLength)
  } catch {
    return value.slice(0, maxLength)
  }
}

function sourceFrom(referrerHost?: string): string {
  if (!referrerHost) return 'Direct'
  const host = referrerHost.toLowerCase()
  if (host.includes('linkedin.com')) return 'LinkedIn'
  if (host.includes('github.com')) return 'GitHub'
  if (host.includes('google.')) return 'Google'
  if (host.includes('bing.com')) return 'Bing'
  return referrerHost.slice(0, 100)
}

function parseUserAgent(userAgent: string): { browser: string; deviceType: string; operatingSystem: string } {
  const browser = /Edg\//.test(userAgent)
    ? 'Edge'
    : /OPR\//.test(userAgent)
      ? 'Opera'
      : /CriOS\//.test(userAgent)
        ? 'Chrome iOS'
        : /Chrome\//.test(userAgent)
          ? 'Chrome'
          : /FxiOS\//.test(userAgent)
            ? 'Firefox iOS'
            : /Firefox\//.test(userAgent)
              ? 'Firefox'
              : /Safari\//.test(userAgent)
                ? 'Safari'
                : 'Unknown'

  const deviceType = /iPad|Tablet|PlayBook|Silk/i.test(userAgent)
    ? 'tablet'
    : /Mobi|Android|iPhone|iPod/i.test(userAgent)
      ? 'mobile'
      : userAgent
        ? 'desktop'
        : 'unknown'

  const operatingSystem = /iPhone|iPad|iPod/i.test(userAgent)
    ? 'iOS'
    : /Android/i.test(userAgent)
      ? 'Android'
      : /Windows NT/i.test(userAgent)
        ? 'Windows'
        : /Mac OS X|Macintosh/i.test(userAgent)
          ? 'macOS'
          : /Linux/i.test(userAgent)
            ? 'Linux'
            : 'Unknown'

  return { browser, deviceType, operatingSystem }
}

function countryName(countryCode?: string): string | undefined {
  if (!countryCode || countryCode.length !== 2) return undefined
  try {
    return new Intl.DisplayNames(['en'], { type: 'region' }).of(countryCode.toUpperCase())
  } catch {
    return undefined
  }
}

async function resolveLocation(request: Request): Promise<Location> {
  const headerCountry = decodeHeader(request.headers.get('cf-ipcountry') ?? request.headers.get('x-country-code'), 2)?.toUpperCase()
  const fromHeaders: Location = {
    countryCode: headerCountry,
    countryName: countryName(headerCountry),
    region: decodeHeader(request.headers.get('cf-region') ?? request.headers.get('x-region'), 120),
    city: decodeHeader(request.headers.get('cf-ipcity') ?? request.headers.get('x-city'), 120),
  }

  if (fromHeaders.region || fromHeaders.city) {
    return fromHeaders
  }

  // Optional and disabled by default. If enabled, the provider receives the
  // transient IP solely to derive coarse location; the IP is never persisted.
  const template = Deno.env.get('GEOIP_URL_TEMPLATE')
  const forwardedIp = request.headers.get('cf-connecting-ip')
    ?? request.headers.get('x-real-ip')
    ?? request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  if (!template?.startsWith('https://') || !template.includes('{ip}') || !forwardedIp) {
    return fromHeaders
  }

  try {
    const response = await fetch(template.replace('{ip}', encodeURIComponent(forwardedIp)), {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(1_500),
    })
    if (!response.ok) return fromHeaders
    const data = await response.json()
    const code = boundedString(data.country_code ?? data.countryCode, 2)?.toUpperCase()
    return {
      countryCode: code ?? fromHeaders.countryCode,
      countryName: boundedString(data.country_name ?? data.country, 100) ?? countryName(code) ?? fromHeaders.countryName,
      region: boundedString(data.region ?? data.region_name, 120),
      city: boundedString(data.city, 120),
    }
  } catch {
    return fromHeaders
  }
}

function shouldNotify(eventType: EventType, target?: string): boolean {
  if (eventType === 'session_start') return true
  return eventType === 'click' && Boolean(
    target === 'github'
    || target === 'linkedin'
    || target?.startsWith('contact:')
    || target?.startsWith('project:'),
  )
}

async function notifyTelegram(event: Record<string, unknown>) {
  const token = Deno.env.get('TELEGRAM_BOT_TOKEN')
  const chatId = Deno.env.get('TELEGRAM_CHAT_ID')
  if (!token || !chatId) return

  const title = event.event_type === 'session_start' ? 'New portfolio visitor' : 'Portfolio interaction'
  const lines = [
    title,
    `Page: ${event.path}`,
    event.target ? `Action: ${event.target}` : undefined,
    `Country: ${event.country_name ?? 'Unknown'}`,
    event.region || event.city ? `Region/City: ${[event.region, event.city].filter(Boolean).join(' / ')}` : undefined,
    `Device: ${event.device_type ?? 'Unknown'}`,
    `Browser: ${event.browser ?? 'Unknown'}`,
    `Referrer: ${event.source ?? 'Direct'}`,
    `Time: ${new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Ljubljana', hour: '2-digit', minute: '2-digit' }).format(new Date())}`,
    `New visitor: ${event.is_new_visitor ? 'yes' : 'no'}`,
  ].filter(Boolean).join('\n')

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: lines, disable_web_page_preview: true }),
  })
}

async function handleRequest(request: Request): Promise<Response> {
  const origin = request.headers.get('origin') ?? ''
  if (!allowedOrigins().has(origin)) {
    return new Response('Origin not allowed', { status: 403 })
  }
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders(origin) })
  }
  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405, origin)
  }
  const contentLength = Number(request.headers.get('content-length') ?? 0)
  if (contentLength > 16_384) {
    return json({ error: 'Payload too large' }, 413, origin)
  }

  let body: AnalyticsRequest
  try {
    body = await request.json()
  } catch {
    return json({ error: 'Invalid JSON' }, 400, origin)
  }

  const eventId = boundedString(body.eventId, 36)
  const visitorId = boundedString(body.visitorId, 36)
  const sessionId = boundedString(body.sessionId, 36)
  const path = boundedString(body.path, 512)
  const eventType = body.eventType
  if (!eventId || !visitorId || !sessionId || !path
      || !uuidPattern.test(eventId) || !uuidPattern.test(visitorId) || !uuidPattern.test(sessionId)
      || typeof eventType !== 'string' || !validEventTypes.has(eventType as EventType)) {
    return json({ error: 'Invalid event' }, 400, origin)
  }

  const referrerHost = boundedString(body.referrerHost, 253)
  const target = boundedString(body.target, 160)
  const durationSeconds = Number.isInteger(body.durationSeconds)
    ? Math.max(0, Math.min(Number(body.durationSeconds), 86_400))
    : undefined
  const location = await resolveLocation(request)
  const userAgent = request.headers.get('user-agent') ?? ''
  const client = parseUserAgent(userAgent)
  const row = {
    event_id: eventId,
    event_type: eventType,
    visitor_id: visitorId,
    session_id: sessionId,
    is_new_visitor: body.isNewVisitor === true,
    path,
    referrer_host: referrerHost,
    source: sourceFrom(referrerHost),
    browser: client.browser,
    device_type: client.deviceType,
    operating_system: client.operatingSystem,
    country_code: location.countryCode,
    country_name: location.countryName,
    region: location.region,
    city: location.city,
    target,
    duration_seconds: durationSeconds,
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!supabaseUrl || !serviceRoleKey) {
    return json({ error: 'Server is not configured' }, 500, origin)
  }

  const insert = await fetch(`${supabaseUrl}/rest/v1/portfolio_analytics_events`, {
    method: 'POST',
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(row),
  })
  if (insert.status === 409) {
    return json({ accepted: false, duplicate: true }, 200, origin)
  }
  if (!insert.ok) {
    console.error('analytics insert failed', insert.status)
    return json({ error: 'Unable to record event' }, 502, origin)
  }

  if (shouldNotify(eventType as EventType, target)) {
    try {
      await notifyTelegram(row)
    } catch {
      console.error('telegram notification failed')
    }
  }
  return json({ accepted: true }, 202, origin)
}

Deno.serve(handleRequest)
