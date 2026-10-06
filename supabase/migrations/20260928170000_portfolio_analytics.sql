-- Additive migration for privacy-conscious portfolio analytics.
-- This does not modify or delete any existing table or data.

create extension if not exists pgcrypto;

create table if not exists public.portfolio_analytics_events (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null unique,
  occurred_at timestamptz not null default now(),
  event_type text not null check (event_type in ('session_start', 'page_view', 'click', 'engagement')),
  visitor_id uuid not null,
  session_id uuid not null,
  is_new_visitor boolean not null default false,
  path text not null check (char_length(path) between 1 and 512),
  referrer_host text check (referrer_host is null or char_length(referrer_host) <= 253),
  source text check (source is null or char_length(source) <= 100),
  browser text check (browser is null or char_length(browser) <= 80),
  device_type text check (device_type is null or device_type in ('desktop', 'mobile', 'tablet', 'unknown')),
  operating_system text check (operating_system is null or char_length(operating_system) <= 80),
  country_code text check (country_code is null or char_length(country_code) = 2),
  country_name text check (country_name is null or char_length(country_name) <= 100),
  region text check (region is null or char_length(region) <= 120),
  city text check (city is null or char_length(city) <= 120),
  target text check (target is null or char_length(target) <= 160),
  duration_seconds integer check (duration_seconds is null or duration_seconds between 0 and 86400)
);

alter table public.portfolio_analytics_events enable row level security;
alter table public.portfolio_analytics_events force row level security;

-- There is deliberately no anon/authenticated policy. Browsers can only call
-- the Edge Function; the service role performs validated inserts and reports.
revoke all on table public.portfolio_analytics_events from anon, authenticated;
grant select, insert, delete on table public.portfolio_analytics_events to service_role;

create index if not exists portfolio_analytics_events_occurred_at_idx
  on public.portfolio_analytics_events (occurred_at desc);
create index if not exists portfolio_analytics_events_type_time_idx
  on public.portfolio_analytics_events (event_type, occurred_at desc);
create index if not exists portfolio_analytics_events_path_time_idx
  on public.portfolio_analytics_events (path, occurred_at desc);
create index if not exists portfolio_analytics_events_session_idx
  on public.portfolio_analytics_events (session_id);
create unique index if not exists portfolio_analytics_one_session_start_idx
  on public.portfolio_analytics_events (session_id)
  where event_type = 'session_start';
create unique index if not exists portfolio_analytics_one_click_target_per_session_idx
  on public.portfolio_analytics_events (session_id, target)
  where event_type = 'click';

create or replace function public.portfolio_analytics_daily_summary(
  report_date date default (timezone('Europe/Ljubljana', now()))::date
)
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  with daily as (
    select *
    from public.portfolio_analytics_events
    where (occurred_at at time zone 'Europe/Ljubljana')::date = report_date
  ),
  top_country as (
    select country_name as value
    from daily
    where country_name is not null
    group by country_name
    order by count(*) desc, country_name
    limit 1
  ),
  top_referrer as (
    select coalesce(source, referrer_host) as value
    from daily
    where source is not null or referrer_host is not null
    group by coalesce(source, referrer_host)
    order by count(*) desc, coalesce(source, referrer_host)
    limit 1
  ),
  top_project as (
    select split_part(target, ':', 2) as value
    from daily
    where event_type = 'click' and target like 'project:%'
    group by split_part(target, ':', 2)
    order by count(*) desc, split_part(target, ':', 2)
    limit 1
  )
  select jsonb_build_object(
    'date', report_date,
    'uniqueVisitors', count(distinct visitor_id),
    'pageViews', count(*) filter (where event_type = 'page_view'),
    'topCountry', (select value from top_country),
    'topReferrer', (select value from top_referrer),
    'mostViewedProject', (select value from top_project),
    'githubClicks', count(*) filter (where event_type = 'click' and target = 'github'),
    'linkedinClicks', count(*) filter (where event_type = 'click' and target = 'linkedin'),
    'contactClicks', count(*) filter (where event_type = 'click' and target like 'contact:%')
  )
  from daily;
$$;

revoke all on function public.portfolio_analytics_daily_summary(date) from public, anon, authenticated;
grant execute on function public.portfolio_analytics_daily_summary(date) to service_role;

comment on table public.portfolio_analytics_events is
  'Anonymous portfolio analytics. Raw IP addresses are never stored.';
