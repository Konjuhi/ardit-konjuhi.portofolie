declare const Deno: {
  env: { get(name: string): string | undefined }
}

export {}

const HASH_PREFIX = 'ask-ai-v1:'
export const MAX_DAILY_CHAT = 5
export const MAX_DAILY_FIT = 1

export type QuotaKind = 'chat' | 'fit'

export type QuotaRemaining = {
  chat: number
  fit: number
}

type QuotaCounts = {
  chat_count?: unknown
  fit_count?: unknown
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

// IPv6 privacy addresses rotate inside the same /64, and browsers on one
// computer can pick different ones, so the limit keys on the /64 network.
function networkKey(ip: string): string {
  if (!ip.includes(':')) {
    return ip
  }
  const [head, tail = ''] = ip.toLowerCase().split('::')
  const headParts = head ? head.split(':') : []
  const tailParts = tail ? tail.split(':') : []
  const missing = Math.max(0, 8 - headParts.length - tailParts.length)
  const groups = [...headParts, ...Array<string>(missing).fill('0'), ...tailParts]
  return `${groups.slice(0, 4).map((group) => group.padStart(4, '0')).join(':')}::/64`
}

async function sha256Hex(value: string): Promise<string> {
  const bytes = new TextEncoder().encode(value)
  const digest = await crypto.subtle.digest('SHA-256', bytes)
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('')
}

async function quotaKey(request: Request): Promise<string | undefined> {
  const ip = clientIp(request)
  if (ip) {
    return sha256Hex(`${HASH_PREFIX}${networkKey(ip)}`)
  }
  const userAgent = request.headers.get('user-agent')?.slice(0, 200)
  if (!userAgent) {
    return undefined
  }
  return sha256Hex(`${HASH_PREFIX}ua:${userAgent}`)
}

async function rpc(name: string, body: Record<string, string>): Promise<unknown> {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!supabaseUrl || !serviceRoleKey) {
    return undefined
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/rpc/${name}`, {
    method: 'POST',
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  if (!response.ok) {
    throw new Error(`quota rpc ${name} failed ${response.status}`)
  }
  const text = await response.text()
  return text ? JSON.parse(text) : null
}

function remainingFrom(result: unknown): QuotaRemaining | undefined {
  if (!result || typeof result !== 'object') {
    return undefined
  }
  const counts = result as QuotaCounts
  const chatUsed = typeof counts.chat_count === 'number' ? counts.chat_count : 0
  const fitUsed = typeof counts.fit_count === 'number' ? counts.fit_count : 0
  return {
    chat: Math.max(0, MAX_DAILY_CHAT - chatUsed),
    fit: Math.max(0, MAX_DAILY_FIT - fitUsed),
  }
}

export async function readDailyQuota(request: Request): Promise<QuotaRemaining | undefined> {
  const ipHash = await quotaKey(request)
  if (!ipHash) {
    return undefined
  }
  try {
    return remainingFrom(await rpc('get_ask_ai_quota', { p_ip_hash: ipHash }))
  } catch {
    console.error('ask-ai quota read failed')
    return undefined
  }
}

export async function consumeDailyQuota(
  request: Request,
  kind: QuotaKind,
): Promise<{ status: 'allowed' | 'blocked' | 'skipped'; remaining?: QuotaRemaining }> {
  const ipHash = await quotaKey(request)
  if (!ipHash) {
    return { status: 'skipped' }
  }

  try {
    const result = await rpc('consume_ask_ai_quota', { p_ip_hash: ipHash, p_kind: kind })
    if (result === undefined) {
      return { status: 'skipped' }
    }
    const allowed = Boolean(result && typeof result === 'object' && (result as { allowed?: unknown }).allowed === true)
    return { status: allowed ? 'allowed' : 'blocked', remaining: remainingFrom(result) }
  } catch {
    console.error('ask-ai quota consume failed')
    return { status: 'skipped' }
  }
}

export async function refundDailyQuota(request: Request, kind: QuotaKind): Promise<void> {
  const ipHash = await quotaKey(request)
  if (!ipHash) {
    return
  }
  try {
    await rpc('refund_ask_ai_quota', { p_ip_hash: ipHash, p_kind: kind })
  } catch {
    console.error('ask-ai quota refund failed')
  }
}
