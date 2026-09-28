declare const Deno: {
  env: { get(name: string): string | undefined }
  serve(handler: (request: Request) => Response | Promise<Response>): void
}

export {}

type Summary = {
  date?: string
  uniqueVisitors?: number
  pageViews?: number
  topCountry?: string | null
  topReferrer?: string | null
  mostViewedProject?: string | null
  githubClicks?: number
  linkedinClicks?: number
  contactClicks?: number
}

function response(body: Record<string, unknown>, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  })
}

function authorized(request: Request): boolean {
  const secret = Deno.env.get('SUMMARY_SECRET')
  return Boolean(secret && request.headers.get('authorization') === `Bearer ${secret}`)
}

async function sendTelegram(summary: Summary) {
  const token = Deno.env.get('TELEGRAM_BOT_TOKEN')
  const chatId = Deno.env.get('TELEGRAM_CHAT_ID')
  if (!token || !chatId) throw new Error('Telegram is not configured')

  const text = [
    `Portfolio summary ${summary.date ?? 'today'}`,
    `Unique visitors: ${summary.uniqueVisitors ?? 0}`,
    `Page views: ${summary.pageViews ?? 0}`,
    `Top country: ${summary.topCountry ?? 'Unknown'}`,
    `Most viewed project: ${summary.mostViewedProject ?? 'None'}`,
    `GitHub clicks: ${summary.githubClicks ?? 0}`,
    `LinkedIn clicks: ${summary.linkedinClicks ?? 0}`,
    `Contact clicks: ${summary.contactClicks ?? 0}`,
  ].join('\n')

  const result = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
  })
  if (!result.ok) throw new Error('Telegram request failed')
}

async function handleRequest(request: Request): Promise<Response> {
  if (request.method !== 'POST') return response({ error: 'Method not allowed' }, 405)
  if (!authorized(request)) return response({ error: 'Unauthorized' }, 401)

  let reportDate: string | undefined
  try {
    const body = await request.json().catch(() => ({}))
    if (body.reportDate !== undefined) {
      if (typeof body.reportDate !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(body.reportDate)) {
        return response({ error: 'Invalid reportDate' }, 400)
      }
      reportDate = body.reportDate
    }
  } catch {
    return response({ error: 'Invalid JSON' }, 400)
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!supabaseUrl || !serviceRoleKey) return response({ error: 'Server is not configured' }, 500)

  const result = await fetch(`${supabaseUrl}/rest/v1/rpc/portfolio_analytics_daily_summary`, {
    method: 'POST',
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reportDate ? { report_date: reportDate } : {}),
  })
  if (!result.ok) {
    console.error('daily summary query failed', result.status)
    return response({ error: 'Unable to build summary' }, 502)
  }

  const summary = await result.json() as Summary
  try {
    await sendTelegram(summary)
  } catch {
    console.error('daily summary Telegram delivery failed')
    return response({ error: 'Unable to deliver summary' }, 502)
  }
  return response({ sent: true, summary }, 200)
}

Deno.serve(handleRequest)
