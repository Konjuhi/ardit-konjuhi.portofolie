declare const Deno: {
  env: { get(name: string): string | undefined }
}

export {}

const HASH_PREFIX = 'ask-ai-v1:'

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

async function sha256Hex(value: string): Promise<string> {
  const bytes = new TextEncoder().encode(value)
  const digest = await crypto.subtle.digest('SHA-256', bytes)
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('')
}

export async function quotaKey(request: Request): Promise<string | undefined> {
  const ip = clientIp(request)
  if (ip) {
    return sha256Hex(`${HASH_PREFIX}${ip}`)
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

export async function consumeDailyQuota(
  request: Request,
  kind: 'chat' | 'fit',
): Promise<'allowed' | 'blocked' | 'skipped'> {
  const ipHash = await quotaKey(request)
  if (!ipHash) {
    return 'skipped'
  }

  try {
    const result = await rpc('consume_ask_ai_quota', { p_ip_hash: ipHash, p_kind: kind })
    if (result === undefined) {
      return 'skipped'
    }
    if (result && typeof result === 'object' && (result as { allowed?: unknown }).allowed === true) {
      return 'allowed'
    }
    return 'blocked'
  } catch {
    console.error('ask-ai quota consume failed')
    return 'skipped'
  }
}

export async function refundDailyQuota(request: Request, kind: 'chat' | 'fit'): Promise<void> {
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
