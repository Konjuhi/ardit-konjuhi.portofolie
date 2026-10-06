declare const Deno: {
  env: { get(name: string): string | undefined }
}

export {}

const MAX_QUESTION_CHARS = 300

type Location = {
  country?: string
  city?: string
}

function clientIp(request: Request): string | undefined {
  const candidates = [
    request.headers.get('cf-connecting-ip'),
    request.headers.get('true-client-ip'),
    request.headers.get('x-real-ip'),
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim(),
    request.headers.get('fly-client-ip'),
  ]
  return candidates.find((value) => Boolean(value && value !== '127.0.0.1' && value !== '::1'))
}

function deviceLabel(userAgent: string): string {
  if (/iPad|Tablet|PlayBook|Silk/i.test(userAgent)) return 'tablet'
  if (/Mobi|Android|iPhone|iPod/i.test(userAgent)) return 'mobile'
  return 'computer'
}

function shortText(value: unknown, maxLength: number): string | undefined {
  if (typeof value !== 'string') return undefined
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed.slice(0, maxLength) : undefined
}

async function lookupLocation(request: Request): Promise<Location> {
  const ip = clientIp(request)
  const template = Deno.env.get('GEOIP_URL_TEMPLATE') ?? 'https://ipwho.is/{ip}'
  if (!ip || !template.startsWith('https://') || !template.includes('{ip}')) {
    return {}
  }
  try {
    const response = await fetch(template.replace('{ip}', encodeURIComponent(ip)), {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(1_500),
    })
    if (!response.ok) return {}
    const data = await response.json()
    if (data?.success === false) return {}
    return {
      country: shortText(data.country_name ?? data.country, 100),
      city: shortText(data.city, 120),
    }
  } catch {
    return {}
  }
}

function truncateQuestion(question: string): string {
  const oneLine = question.replace(/\s+/g, ' ').trim()
  if (oneLine.length <= MAX_QUESTION_CHARS) return oneLine
  return `${oneLine.slice(0, MAX_QUESTION_CHARS).trimEnd()}…`
}

export async function notifyAskAi(
  request: Request,
  kind: 'chat' | 'fit',
  question: string,
  chatRemaining?: number,
): Promise<void> {
  const token = Deno.env.get('TELEGRAM_BOT_TOKEN')
  const chatId = Deno.env.get('TELEGRAM_CHAT_ID')
  if (!token || !chatId) return

  const location = await lookupLocation(request)
  const place = [location.country ?? 'Unknown country', location.city].filter(Boolean).join(' · ')
  const device = deviceLabel(request.headers.get('user-agent') ?? '')

  const lines = kind === 'fit'
    ? ['📋 Job fit analysis used', `${place} · ${device}`]
    : [
      '💬 Ask AI question',
      `"${truncateQuestion(question)}"`,
      `${place} · ${device}`,
      typeof chatRemaining === 'number' ? `${chatRemaining}/5 left today` : undefined,
    ]

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: lines.filter(Boolean).join('\n'),
        disable_web_page_preview: true,
      }),
      signal: AbortSignal.timeout(3_000),
    })
  } catch {
    console.error('ask-ai telegram notification failed')
  }
}
