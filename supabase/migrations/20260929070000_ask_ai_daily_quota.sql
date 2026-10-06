-- Server-side Ask AI daily limits keyed by a hashed IP.
-- The raw IP is never stored. Browsers cannot read or write this table.

create table if not exists public.ask_ai_daily_quota (
  ip_hash text not null check (char_length(ip_hash) between 16 and 128),
  quota_date date not null,
  chat_count integer not null default 0 check (chat_count >= 0),
  fit_count integer not null default 0 check (fit_count >= 0),
  primary key (ip_hash, quota_date)
);

alter table public.ask_ai_daily_quota enable row level security;
alter table public.ask_ai_daily_quota force row level security;

revoke all on table public.ask_ai_daily_quota from anon, authenticated;
grant select, insert, update on table public.ask_ai_daily_quota to service_role;

create or replace function public.consume_ask_ai_quota(
  p_ip_hash text,
  p_kind text
) returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  today date := (timezone('Europe/Ljubljana', now()))::date;
  chat_limit constant integer := 5;
  fit_limit constant integer := 1;
  rec public.ask_ai_daily_quota%rowtype;
  allowed boolean := false;
begin
  if p_ip_hash is null or char_length(p_ip_hash) < 16 or p_kind not in ('chat', 'fit') then
    return jsonb_build_object('allowed', false, 'reason', 'invalid');
  end if;

  insert into public.ask_ai_daily_quota (ip_hash, quota_date)
  values (p_ip_hash, today)
  on conflict (ip_hash, quota_date) do nothing;

  if p_kind = 'fit' then
    update public.ask_ai_daily_quota
    set fit_count = fit_count + 1
    where ip_hash = p_ip_hash and quota_date = today and fit_count < fit_limit
    returning * into rec;
  else
    update public.ask_ai_daily_quota
    set chat_count = chat_count + 1
    where ip_hash = p_ip_hash and quota_date = today and chat_count < chat_limit
    returning * into rec;
  end if;

  if rec.ip_hash is not null then
    allowed := true;
  else
    select * into rec
    from public.ask_ai_daily_quota
    where ip_hash = p_ip_hash and quota_date = today;
  end if;

  return jsonb_build_object(
    'allowed', allowed,
    'chat_count', coalesce(rec.chat_count, 0),
    'fit_count', coalesce(rec.fit_count, 0)
  );
end;
$$;

create or replace function public.refund_ask_ai_quota(
  p_ip_hash text,
  p_kind text
) returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  today date := (timezone('Europe/Ljubljana', now()))::date;
begin
  if p_ip_hash is null or p_kind not in ('chat', 'fit') then
    return;
  end if;

  if p_kind = 'fit' then
    update public.ask_ai_daily_quota
    set fit_count = greatest(fit_count - 1, 0)
    where ip_hash = p_ip_hash and quota_date = today;
  else
    update public.ask_ai_daily_quota
    set chat_count = greatest(chat_count - 1, 0)
    where ip_hash = p_ip_hash and quota_date = today;
  end if;
end;
$$;

revoke all on function public.consume_ask_ai_quota(text, text) from public, anon, authenticated;
revoke all on function public.refund_ask_ai_quota(text, text) from public, anon, authenticated;
grant execute on function public.consume_ask_ai_quota(text, text) to service_role;
grant execute on function public.refund_ask_ai_quota(text, text) to service_role;
