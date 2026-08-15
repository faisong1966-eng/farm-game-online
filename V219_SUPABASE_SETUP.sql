-- =========================================================
-- V219 ONLINE PLAYER + ADMIN SYNC SETUP
-- Run this in Supabase Dashboard > SQL Editor > New query
-- Then click Run.
-- =========================================================

create table if not exists public.game_player_accounts (
  username text primary key,
  password text not null,
  gender text,
  created_at timestamptz not null default now()
);

create table if not exists public.game_player_states (
  username text primary key references public.game_player_accounts(username) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.game_player_accounts enable row level security;
alter table public.game_player_states enable row level security;

drop policy if exists "v219 accounts select" on public.game_player_accounts;
drop policy if exists "v219 accounts insert" on public.game_player_accounts;
drop policy if exists "v219 accounts update" on public.game_player_accounts;
drop policy if exists "v219 states select" on public.game_player_states;
drop policy if exists "v219 states insert" on public.game_player_states;
drop policy if exists "v219 states update" on public.game_player_states;

create policy "v219 accounts select"
on public.game_player_accounts
for select to anon, authenticated
using (true);

create policy "v219 accounts insert"
on public.game_player_accounts
for insert to anon, authenticated
with check (true);

create policy "v219 accounts update"
on public.game_player_accounts
for update to anon, authenticated
using (true)
with check (true);

create policy "v219 states select"
on public.game_player_states
for select to anon, authenticated
using (true);

create policy "v219 states insert"
on public.game_player_states
for insert to anon, authenticated
with check (true);

create policy "v219 states update"
on public.game_player_states
for update to anon, authenticated
using (true)
with check (true);

-- Make sure the single shared admin configuration row exists.
insert into public.game_admin_config (id, config, updated_at)
values (1, '{}'::jsonb, now())
on conflict (id) do nothing;

-- Ensure Realtime can publish shared admin changes.
do $$
begin
  begin
    alter publication supabase_realtime add table public.game_admin_config;
  exception when duplicate_object then null;
  end;
  begin
    alter publication supabase_realtime add table public.game_server_mail;
  exception when duplicate_object then null;
  end;
end $$;

-- V219 complete.
