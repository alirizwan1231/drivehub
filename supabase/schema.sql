-- ============================================================
-- DriveHub — Supabase schema (backend scaffolding, not yet live)
-- Run this in the Supabase SQL editor when enabling the backend.
-- See BACKEND-SETUP.md for the full wiring guide.
-- ============================================================

create extension if not exists "pgcrypto";

-- ---------- cars ----------
create table if not exists public.cars (
  id            text primary key,               -- slug, e.g. 'lamborghini-huracan-evo'
  name          text not null,
  brand         text not null,
  category      text not null check (category in ('Economy','SUV','Luxury','Sports')),
  body_style    text not null default 'sedan',
  price_per_day integer not null check (price_per_day > 0),   -- AED
  deposit       integer not null default 0,                    -- AED
  seats         integer not null default 5,
  transmission  text not null default 'Automatic',
  luggage       integer not null default 2,
  doors         integer not null default 4,
  fuel          text not null default 'Petrol',
  engine        text,
  horsepower    integer,
  zero_to_hundred numeric(3,1),
  top_speed     integer,
  rating        numeric(2,1) not null default 5.0,
  trips         integer not null default 0,
  plate         text unique,
  status        text not null default 'available'
                check (status in ('available','rented','maintenance')),
  tagline       text,
  features      text[] not null default '{}',
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- ---------- customers ----------
create table if not exists public.customers (
  id            uuid primary key default gen_random_uuid(),
  auth_user_id  uuid unique references auth.users (id) on delete set null,
  full_name     text not null,
  phone         text not null,
  email         text not null,
  nationality   text,
  licence_no    text,
  created_at    timestamptz not null default now()
);

-- ---------- bookings ----------
create table if not exists public.bookings (
  id            uuid primary key default gen_random_uuid(),
  reference     text unique not null,            -- e.g. 'DH-8241'
  car_id        text not null references public.cars (id),
  customer_id   uuid not null references public.customers (id),
  pickup_date   date not null,
  return_date   date not null,
  pickup_location text not null,
  days          integer not null check (days > 0),
  price_per_day integer not null,
  subtotal      integer not null,
  vat           integer not null default 0,
  service_fee   integer not null default 49,
  total         integer not null,
  deposit       integer not null default 0,
  status        text not null default 'upcoming'
                check (status in ('upcoming','active','completed','cancelled')),
  created_at    timestamptz not null default now(),
  check (return_date >= pickup_date)
);

create index if not exists bookings_car_dates_idx
  on public.bookings (car_id, pickup_date, return_date);
create index if not exists bookings_status_idx
  on public.bookings (status);

-- ---------- payments ----------
create table if not exists public.payments (
  id            uuid primary key default gen_random_uuid(),
  booking_id    uuid not null references public.bookings (id) on delete cascade,
  amount        integer not null,                -- AED, smallest display unit
  kind          text not null check (kind in ('rental','deposit','refund','extra_km','salik')),
  method        text not null default 'card' check (method in ('card','cash','transfer')),
  status        text not null default 'pending'
                check (status in ('pending','paid','refunded','failed')),
  provider_ref  text,                            -- gateway reference when a gateway is added
  created_at    timestamptz not null default now()
);

-- ---------- documents ----------
create table if not exists public.documents (
  id            uuid primary key default gen_random_uuid(),
  customer_id   uuid not null references public.customers (id) on delete cascade,
  booking_id    uuid references public.bookings (id) on delete set null,
  doc_type      text not null check (doc_type in ('driving_licence','passport','emirates_id')),
  storage_path  text not null,                   -- path inside the 'documents' storage bucket
  verified      boolean not null default false,
  verified_at   timestamptz,
  created_at    timestamptz not null default now()
);

-- ============================================================
-- Row Level Security (enable, then refine per launch policy)
-- ============================================================
alter table public.cars      enable row level security;
alter table public.customers enable row level security;
alter table public.bookings  enable row level security;
alter table public.payments  enable row level security;
alter table public.documents enable row level security;

-- Public can browse the fleet
create policy "cars are public" on public.cars
  for select using (true);

-- Customers see only their own records (service role bypasses RLS for admin ops)
create policy "customers read own" on public.customers
  for select using (auth.uid() = auth_user_id);
create policy "bookings read own" on public.bookings
  for select using (
    customer_id in (select id from public.customers where auth_user_id = auth.uid())
  );
create policy "documents read own" on public.documents
  for select using (
    customer_id in (select id from public.customers where auth_user_id = auth.uid())
  );

-- Storage: create a private bucket named 'documents' in the dashboard,
-- then add policies so users can upload/read only their own folder:
--   (storage.foldername(name))[1] = auth.uid()::text
