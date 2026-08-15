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
