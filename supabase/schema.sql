-- ============================================================
-- Folio.AI — Supabase Database Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- ─── Profiles table ───────────────────────────────────────────────────────────
-- Each row is owned by one auth.users row (1-to-1)

CREATE TABLE IF NOT EXISTS public.profiles (
  id            UUID        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username      TEXT        NOT NULL UNIQUE,
  name          TEXT,
  title         TEXT,
  bio           TEXT,
  email         TEXT,
  location      TEXT,
  avatar_url    TEXT,
  resume_url    TEXT,
  social        JSONB       NOT NULL DEFAULT '{}',
  skills        JSONB       NOT NULL DEFAULT '[]',
  projects      JSONB       NOT NULL DEFAULT '[]',
  experience    JSONB       NOT NULL DEFAULT '[]',
  education     JSONB       NOT NULL DEFAULT '[]',
  template      TEXT        NOT NULL DEFAULT 'developer',
  primary_color TEXT        NOT NULL DEFAULT '#6366f1',
  accent_color  TEXT        NOT NULL DEFAULT '#8b5cf6',
  font          TEXT        NOT NULL DEFAULT 'inter',
  dark_mode     BOOLEAN     NOT NULL DEFAULT true,
  published     BOOLEAN     NOT NULL DEFAULT false,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ─── Updated-at trigger ───────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER on_profiles_updated
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ─── Auto-create profile on sign-up ──────────────────────────────────────────
-- Fires when a new row is inserted into auth.users (OAuth or email sign-up)

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  base_username TEXT;
  final_username TEXT;
  counter       INT := 0;
BEGIN
  -- Derive a username from email or provider metadata
  base_username := COALESCE(
    NEW.raw_user_meta_data->>'user_name',   -- GitHub login
    split_part(NEW.email, '@', 1),           -- email prefix
    'user'
  );

  -- Sanitise: lowercase, only alphanumeric + hyphens, max 30 chars
  base_username := lower(regexp_replace(base_username, '[^a-z0-9\-]', '-', 'g'));
  base_username := substr(base_username, 1, 30);
  final_username := base_username;

  -- Ensure uniqueness with a numeric suffix
  LOOP
    EXIT WHEN NOT EXISTS (
      SELECT 1 FROM public.profiles WHERE username = final_username
    );
    counter := counter + 1;
    final_username := base_username || '-' || counter;
  END LOOP;

  INSERT INTO public.profiles (id, username, name, email, avatar_url)
  VALUES (
    NEW.id,
    final_username,
    COALESCE(
      NEW.raw_user_meta_data->>'full_name',
      NEW.raw_user_meta_data->>'name',
      split_part(NEW.email, '@', 1)
    ),
    NEW.email,
    COALESCE(
      NEW.raw_user_meta_data->>'avatar_url',
      NEW.raw_user_meta_data->>'picture'
    )
  );

  RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ─── Row Level Security ───────────────────────────────────────────────────────

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Anyone can read a published portfolio (for public /p/[username] pages)
CREATE POLICY "Public portfolios are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (published = true);

-- Authenticated users can always read their own profile (published or not)
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

-- Users can only update their own row
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Prevent direct inserts (handled by trigger)
-- If you need manual inserts for testing, comment this out temporarily
CREATE POLICY "Disallow direct inserts"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- ─── Indexes ──────────────────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS profiles_username_idx ON public.profiles (username);
CREATE INDEX IF NOT EXISTS profiles_published_idx ON public.profiles (published) WHERE published = true;

-- ─── Done ─────────────────────────────────────────────────────────────────────
-- After running this, go to:
--   Authentication → Providers → GitHub  → enable, add Client ID + Secret
--   Authentication → Providers → Google  → enable, add Client ID + Secret
--   Authentication → URL Configuration   → set Site URL and Redirect URLs
