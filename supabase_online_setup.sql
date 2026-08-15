create table if not exists public.game_saves (
  user_id uuid primary key references auth.users(id) on delete cascade,
  game_state jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.game_saves enable row level security;

drop policy if exists "Players can read own save" on public.game_saves;
create policy "Players can read own save"
on public.game_saves for select to authenticated
using (auth.uid() = user_id);

drop policy if exists "Players can insert own save" on public.game_saves;
create policy "Players can insert own save"
on public.game_saves for insert to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Players can update own save" on public.game_saves;
create policy "Players can update own save"
on public.game_saves for update to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- V209 ONLINE ADMIN GIFT FIX
-- Shared server mailbox: gifts created by an admin are visible to every browser/player.
create table if not exists public.game_server_mail (
  id text primary key,
  created_at timestamptz not null default now(),
  expires_at timestamptz null,
  item jsonb not null default '{}'::jsonb,
  qty integer not null default 1 check (qty >= 1)
);

create table if not exists public.game_server_mail_claims (
  mail_id text not null references public.game_server_mail(id) on delete cascade,
  username text not null,
  claimed_at timestamptz not null default now(),
  primary key (mail_id, username)
);

alter table public.game_server_mail enable row level security;
alter table public.game_server_mail_claims enable row level security;

-- The current game uses its own username/password system, not Supabase Auth.
-- These policies allow the browser client to read shared gifts, create gifts,
-- and record one claim per username. Replace with stricter authenticated
-- policies later when the game login is migrated to Supabase Auth.
drop policy if exists "game mail read" on public.game_server_mail;
create policy "game mail read" on public.game_server_mail
for select to anon, authenticated using (true);

drop policy if exists "game mail insert" on public.game_server_mail;
create policy "game mail insert" on public.game_server_mail
for insert to anon, authenticated with check (true);

drop policy if exists "game mail claims read" on public.game_server_mail_claims;
create policy "game mail claims read" on public.game_server_mail_claims
for select to anon, authenticated using (true);

drop policy if exists "game mail claims insert" on public.game_server_mail_claims;
create policy "game mail claims insert" on public.game_server_mail_claims
for insert to anon, authenticated with check (true);


-- V209 ONLINE SHARED ADMIN CONFIG
-- One authoritative config row for every main-admin setting: monsters, farm, shops,
-- gacha, item settings, icons, login rewards and future values inside adminConfig.
create table if not exists public.game_admin_config (
  id integer primary key check (id = 1),
  config jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.game_shared_configs (
  key text primary key,
  config jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.game_admin_config enable row level security;
alter table public.game_shared_configs enable row level security;

drop policy if exists "shared admin config read" on public.game_admin_config;
create policy "shared admin config read" on public.game_admin_config
for select to anon, authenticated using (true);

drop policy if exists "shared admin config insert" on public.game_admin_config;
create policy "shared admin config insert" on public.game_admin_config
for insert to anon, authenticated with check (true);

drop policy if exists "shared admin config update" on public.game_admin_config;
create policy "shared admin config update" on public.game_admin_config
for update to anon, authenticated using (true) with check (true);

drop policy if exists "shared config read" on public.game_shared_configs;
create policy "shared config read" on public.game_shared_configs
for select to anon, authenticated using (true);

drop policy if exists "shared config insert" on public.game_shared_configs;
create policy "shared config insert" on public.game_shared_configs
for insert to anon, authenticated with check (true);

drop policy if exists "shared config update" on public.game_shared_configs;
create policy "shared config update" on public.game_shared_configs
for update to anon, authenticated using (true) with check (true);

-- V210 SERVER-WIDE ADMIN SYNC HARDENING
insert into public.game_admin_config (id, config)
values (1, '{}'::jsonb)
on conflict (id) do nothing;

do $$
begin
  begin alter publication supabase_realtime add table public.game_admin_config;
  exception when duplicate_object then null; end;
  begin alter publication supabase_realtime add table public.game_shared_configs;
  exception when duplicate_object then null; end;
  begin alter publication supabase_realtime add table public.game_server_mail;
  exception when duplicate_object then null; end;
end $$;


-- V210 TRUE ONLINE PLAYER DATA
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
drop policy if exists "v210 accounts select" on public.game_player_accounts;
drop policy if exists "v210 accounts insert" on public.game_player_accounts;
drop policy if exists "v210 accounts update" on public.game_player_accounts;
drop policy if exists "v210 states select" on public.game_player_states;
drop policy if exists "v210 states insert" on public.game_player_states;
drop policy if exists "v210 states update" on public.game_player_states;
create policy "v210 accounts select" on public.game_player_accounts for select using (true);
create policy "v210 accounts insert" on public.game_player_accounts for insert with check (true);
create policy "v210 accounts update" on public.game_player_accounts for update using (true) with check (true);
create policy "v210 states select" on public.game_player_states for select using (true);
create policy "v210 states insert" on public.game_player_states for insert with check (true);
create policy "v210 states update" on public.game_player_states for update using (true) with check (true);

-- V212 AUTHORITATIVE SERVER-WIDE ADMIN FIX
-- Ensure one real shared row exists. All browsers read this row.
insert into public.game_admin_config (id, config, updated_at)
values (1, '{}'::jsonb, now())
on conflict (id) do nothing;

-- Recreate permissive browser policies for the current username-based game.
-- These are functional policies for the existing architecture; move admin writes
-- behind authenticated server functions before exposing the game publicly.
drop policy if exists "v212 admin config select" on public.game_admin_config;
drop policy if exists "v212 admin config insert" on public.game_admin_config;
drop policy if exists "v212 admin config update" on public.game_admin_config;
create policy "v212 admin config select" on public.game_admin_config
for select to anon, authenticated using (true);
create policy "v212 admin config insert" on public.game_admin_config
for insert to anon, authenticated with check (true);
create policy "v212 admin config update" on public.game_admin_config
for update to anon, authenticated using (true) with check (true);

do $$
begin
  begin alter publication supabase_realtime add table public.game_admin_config;
  exception when duplicate_object then null; end;
end $$;


-- =========================================================
-- V213 FINAL SERVER-AUTHORITATIVE ADMIN SYNC
-- Run this whole SQL file in Supabase SQL Editor, then reload every browser.
-- =========================================================

create table if not exists public.game_admin_config (
  id integer primary key check (id = 1),
  config jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.game_admin_config enable row level security;

drop policy if exists "v213 admin config select" on public.game_admin_config;
drop policy if exists "v213 admin config insert" on public.game_admin_config;
drop policy if exists "v213 admin config update" on public.game_admin_config;

create policy "v213 admin config select"
on public.game_admin_config for select to anon, authenticated
using (true);

create policy "v213 admin config insert"
on public.game_admin_config for insert to anon, authenticated
with check (true);

create policy "v213 admin config update"
on public.game_admin_config for update to anon, authenticated
using (true) with check (true);

insert into public.game_admin_config (id, config, updated_at)
values (1, '{}'::jsonb, now())
on conflict (id) do nothing;

-- Keep Realtime enabled when the project supports it.
do $$
begin
  begin
    alter publication supabase_realtime add table public.game_admin_config;
  exception
    when duplicate_object then null;
  end;
end $$;

-- =========================================================
-- V214 CLEAN SERVER-WIDE ADMIN SYNC REPAIR
-- Run the complete file once in Supabase SQL Editor.
-- =========================================================
create table if not exists public.game_admin_config (
  id integer primary key check (id = 1),
  config jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
alter table public.game_admin_config enable row level security;

drop policy if exists "v214 admin config select" on public.game_admin_config;
drop policy if exists "v214 admin config insert" on public.game_admin_config;
drop policy if exists "v214 admin config update" on public.game_admin_config;
create policy "v214 admin config select" on public.game_admin_config
for select to anon, authenticated using (true);
create policy "v214 admin config insert" on public.game_admin_config
for insert to anon, authenticated with check (true);
create policy "v214 admin config update" on public.game_admin_config
for update to anon, authenticated using (true) with check (true);

insert into public.game_admin_config (id, config, updated_at)
values (1, '{}'::jsonb, now())
on conflict (id) do nothing;

do $$
begin
  begin alter publication supabase_realtime add table public.game_admin_config;
  exception when duplicate_object then null; end;
end $$;


-- =========================================================
-- V217 CLEANUP: ONE SHARED ADMIN CONFIG ROW
-- Run this once after uploading V217. It removes ALL old policies
-- on this table, then recreates one read/insert/update set.
-- =========================================================
alter table public.game_admin_config enable row level security;

-- Drop every old policy created by V209-V216.
drop policy if exists "shared admin config read" on public.game_admin_config;
drop policy if exists "shared admin config insert" on public.game_admin_config;
drop policy if exists "shared admin config update" on public.game_admin_config;
drop policy if exists "v212 admin config select" on public.game_admin_config;
drop policy if exists "v212 admin config insert" on public.game_admin_config;
drop policy if exists "v212 admin config update" on public.game_admin_config;
drop policy if exists "v213 admin config select" on public.game_admin_config;
drop policy if exists "v213 admin config insert" on public.game_admin_config;
drop policy if exists "v213 admin config update" on public.game_admin_config;
drop policy if exists "v214 admin config select" on public.game_admin_config;
drop policy if exists "v214 admin config insert" on public.game_admin_config;
drop policy if exists "v214 admin config update" on public.game_admin_config;

create policy "v217 admin config read" on public.game_admin_config
for select to anon, authenticated using (true);
create policy "v217 admin config insert" on public.game_admin_config
for insert to anon, authenticated with check (true);
create policy "v217 admin config update" on public.game_admin_config
for update to anon, authenticated using (true) with check (true);

insert into public.game_admin_config(id,config,updated_at)
values(1,'{}'::jsonb,now()) on conflict(id) do nothing;

do $$ begin
  begin alter publication supabase_realtime add table public.game_admin_config;
  exception when duplicate_object then null; end;
end $$;


-- V218 CLEANUP: remove all existing policies on shared config, then recreate clean rules.
DO $$ DECLARE r record; BEGIN FOR r IN SELECT policyname FROM pg_policies WHERE schemaname='public' AND tablename='game_admin_config' LOOP EXECUTE format('DROP POLICY IF EXISTS %I ON public.game_admin_config', r.policyname); END LOOP; END $$;
ALTER TABLE public.game_admin_config ENABLE ROW LEVEL SECURITY;
CREATE POLICY "v218 shared config read" ON public.game_admin_config FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "v218 config insert authenticated" ON public.game_admin_config FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "v218 config update authenticated" ON public.game_admin_config FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
