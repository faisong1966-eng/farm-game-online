-- FARM GAME V206 ONLINE SETUP
-- Run this whole file once in Supabase SQL Editor.

-- 1) Profiles
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Add missing columns safely if the table already existed.
alter table public.profiles add column if not exists username text;
alter table public.profiles add column if not exists display_name text;
alter table public.profiles add column if not exists created_at timestamptz not null default now();
alter table public.profiles add column if not exists updated_at timestamptz not null default now();
create unique index if not exists profiles_username_unique on public.profiles (lower(username));
alter table public.profiles enable row level security;

drop policy if exists "Players read own profile" on public.profiles;
create policy "Players read own profile" on public.profiles for select to authenticated using (auth.uid() = id);
drop policy if exists "Players insert own profile" on public.profiles;
create policy "Players insert own profile" on public.profiles for insert to authenticated with check (auth.uid() = id);
drop policy if exists "Players update own profile" on public.profiles;
create policy "Players update own profile" on public.profiles for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);

-- 2) One online save per authenticated player
create table if not exists public.game_saves (
  user_id uuid primary key references auth.users(id) on delete cascade,
  game_state jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
alter table public.game_saves enable row level security;
drop policy if exists "Players can read own save" on public.game_saves;
create policy "Players can read own save" on public.game_saves for select to authenticated using (auth.uid() = user_id);
drop policy if exists "Players can insert own save" on public.game_saves;
create policy "Players can insert own save" on public.game_saves for insert to authenticated with check (auth.uid() = user_id);
drop policy if exists "Players can update own save" on public.game_saves;
create policy "Players can update own save" on public.game_saves for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- 3) Admin table: the browser may only check whether the logged-in user owns an admin row.
-- Never store a plain password here. Supabase Auth owns passwords.
create table if not exists public.game_admins (
  username text primary key,
  password_hash text,
  created_at timestamptz not null default now(),
  auth_user_id uuid references auth.users(id) on delete cascade
);
alter table public.game_admins add column if not exists auth_user_id uuid references auth.users(id) on delete cascade;
alter table public.game_admins enable row level security;
drop policy if exists "Admin can read own role" on public.game_admins;
create policy "Admin can read own role" on public.game_admins for select to authenticated using (auth.uid() = auth_user_id);

-- 4) Shared admin config stays locked down from ordinary players.
-- Do NOT add public write policies to this table.
alter table public.game_admin_config enable row level security;

-- 5) After you create and log into the real admin account, run this manually with that user's UUID:
-- update public.game_admins set auth_user_id = 'PASTE-ADMIN-USER-UUID-HERE' where username = 'opchan';

-- Optional verification queries:
-- select * from public.profiles;
-- select user_id, updated_at from public.game_saves;
-- select username, auth_user_id from public.game_admins;
