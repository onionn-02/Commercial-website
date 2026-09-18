-- Run this whole file once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.
-- Then run supabase/seed.sql to load the sample products.

create table if not exists public.categories (
  slug text primary key,
  name text not null,
  sort_order int not null default 0
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  brand text not null,
  category_slug text not null references public.categories (slug) on update cascade,
  price integer not null check (price >= 0), -- INR per unit
  size text,
  description text not null default '',
  specs jsonb not null default '[]'::jsonb, -- [{ "label": "Grade", "value": "10W-30" }]
  compatible_with text[] not null default '{}',
  in_stock boolean not null default true,
  image_url text,
  created_at timestamptz not null default now()
);

create index if not exists products_category_idx on public.products (category_slug);

-- Simple log of every "Order on WhatsApp" click. Not a real order system: the shop confirms on WhatsApp.
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  items jsonb not null,
  total integer not null check (total >= 0),
  created_at timestamptz not null default now()
);

-- Row Level Security: the anon key ships to every browser, so lock things down.
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;

-- Anyone can read the catalog.
create policy "Public can read categories" on public.categories for select using (true);
create policy "Public can read products" on public.products for select using (true);

-- Anyone can log an order attempt, but nobody can read them back with the anon key.
create policy "Public can insert orders" on public.orders for insert with check (true);

-- Writes to categories/products come in Phase 4 (admin login) via authenticated policies.

-- Storage bucket for product photos (public read).
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

create policy "Public can view product images" on storage.objects
  for select using (bucket_id = 'product-images');
