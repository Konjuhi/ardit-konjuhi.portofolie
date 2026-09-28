# Portfolio analytics

This repository contains a privacy-conscious analytics implementation for the
portfolio. It is disabled unless `VITE_ANALYTICS_ENDPOINT` is present at build
time.

Tracking starts automatically for anonymous visits. The frontend does not
show a consent popup. Visitor/session IDs are random UUIDs stored locally
so repeat visits can be counted without collecting names or emails.

## Data collected

- Random anonymous visitor and browser-session UUIDs
- Page path, event timestamp, sanitized referrer hostname, and source
- Browser, coarse device type, and operating system derived server-side from
  the user agent
- Country, region, and city from a short-lived GeoIP lookup of the request IP.
  The IP itself is not stored.
- Labeled project, GitHub, LinkedIn, CV, and contact clicks
- Visible-page engagement duration in five-second-or-longer batches

Names, email addresses, precise GPS, full referrer URLs, and raw IP addresses
are not collected. The optional GeoIP provider receives the transient IP to
derive coarse location, but the function does not persist or log it.

## Architecture

```text
Portfolio browser
  -> portfolio-analytics Edge Function
  -> portfolio_analytics_events (RLS; no browser access)
  -> Telegram Bot API for session starts and high-value clicks only

Scheduled authenticated request
  -> portfolio-summary Edge Function
  -> portfolio_analytics_daily_summary RPC
  -> Telegram Bot API
```

The existing AI assistant and analytics both run on Supabase project
`orutyfitgyvjgmwqrnsd`. Analytics uses separate Edge Functions
(`portfolio-analytics`, `portfolio-summary`) so it does not change `ask-ai`.

## Review and deploy

The additive migration is:

`supabase/migrations/20260928170000_portfolio_analytics.sql`

It creates one new table, indexes, RLS restrictions, and one read-only summary
function. It does not alter or delete existing data.

After reviewing it, authenticate the Supabase CLI and always specify the target
project because this checkout is currently linked to a different project:

```bash
supabase link --project-ref orutyfitgyvjgmwqrnsd
supabase db push --dry-run
supabase db push
supabase functions deploy portfolio-analytics --project-ref orutyfitgyvjgmwqrnsd
supabase functions deploy portfolio-summary --project-ref orutyfitgyvjgmwqrnsd
```

Set secrets through the CLI or Supabase dashboard; never put values in Git:

```bash
supabase secrets set --project-ref orutyfitgyvjgmwqrnsd \
  TELEGRAM_BOT_TOKEN=... \
  TELEGRAM_CHAT_ID=... \
  SUMMARY_SECRET=... \
  ANALYTICS_ALLOWED_ORIGINS=https://konjuhi.github.io
```

`SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are provided to hosted Edge
Functions by Supabase. Do not add the service-role key to Vite or GitHub Pages.

### Optional region/city

Leave this unset for the strongest privacy. To enable coarse city/region,
choose a provider and set an HTTPS template containing `{ip}`, for example:

```bash
supabase secrets set --project-ref orutyfitgyvjgmwqrnsd \
  GEOIP_URL_TEMPLATE='https://ipapi.co/{ip}/json/'
```

Review the provider's retention policy and disclose it before enabling this.

## Verification checklist

1. Open the portfolio in a private browser window.
2. Confirm one `session_start` and one `page_view` row arrive.
3. Refresh: a second `page_view` may arrive, but `session_start` must remain one
   because the database has a unique session constraint.
4. Click GitHub, LinkedIn, Contact, and one project link. Repeated clicks on the
   same target in the same session are deduplicated.
5. Confirm browser/device/OS and referrer are plausible. Country/region/city can
   be unknown when edge headers or optional GeoIP are unavailable.
6. Keep the page visible for at least five seconds and leave it; confirm an
   `engagement` event with bounded `duration_seconds`.
7. Confirm Telegram receives session/high-value alerts but no refresh alerts.
8. Call the protected summary function with yesterday's or today's date:

```bash
curl -X POST \
  -H 'Authorization: Bearer <SUMMARY_SECRET>' \
  -H 'Content-Type: application/json' \
  -d '{"reportDate":"YYYY-MM-DD"}' \
  https://orutyfitgyvjgmwqrnsd.supabase.co/functions/v1/portfolio-summary
```

For a daily schedule, invoke that endpoint from Supabase Cron at the desired
Europe/Ljubljana time, storing the summary secret in Supabase Vault. OpenClaw
can also schedule the HTTP call, but that would require storing the summary
secret in OpenClaw; keeping it inside Supabase is the smaller trust boundary.

## Retention

A 90-day rolling retention is a reasonable default. Schedule this statement in
Supabase Cron after deployment:

```sql
delete from public.portfolio_analytics_events
where occurred_at < now() - interval '90 days';
```

## Disable or remove

Fastest reversible disable: remove `VITE_ANALYTICS_ENDPOINT` from the GitHub
Pages build and redeploy. The frontend tracker then performs no work.

To stop notifications only, unset `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`
from Supabase secrets. Events will continue to be recorded.

To remove the backend after exporting anything you want to keep:

```sql
drop function if exists public.portfolio_analytics_daily_summary(date);
drop table if exists public.portfolio_analytics_events;
```

Then delete the two Edge Functions in the Supabase dashboard. These removal
commands are destructive and are intentionally not part of the migration.
