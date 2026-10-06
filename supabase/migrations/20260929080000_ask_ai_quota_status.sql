-- Read-only Ask AI quota lookup so every browser on the same network sees
-- the same remaining count.

create or replace function public.get_ask_ai_quota(
  p_ip_hash text
) returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  select jsonb_build_object(
    'chat_count', coalesce(max(chat_count), 0),
    'fit_count', coalesce(max(fit_count), 0)
  )
  from public.ask_ai_daily_quota
  where ip_hash = p_ip_hash
    and quota_date = (timezone('Europe/Ljubljana', now()))::date;
$$;

revoke all on function public.get_ask_ai_quota(text) from public, anon, authenticated;
grant execute on function public.get_ask_ai_quota(text) to service_role;
