# DriveHub — Backend Setup Guide

The DriveHub frontend is complete and runs entirely on demo data
(`src/data/cars.ts`, `src/data/bookings.ts`). No environment variables
are needed for the demo. This guide describes how to connect the real
backend later. Everything below uses free tiers only — no paid APIs.

## Stack when live

- **Database / Auth / Storage:** Supabase (free tier)
- **Hosting:** Vercel (free tier), GitHub-connected
- **Payments:** manual records first (card at delivery / bank transfer).
  A payment gateway can be added later behind the `payments` table —
  the schema already has a `provider_ref` column for it.

## Step 1 — Create the Supabase project

1. Go to supabase.com → New project (free).
2. Open **SQL Editor**, paste the contents of `supabase/schema.sql`, run it.
   This creates `cars`, `customers`, `bookings`, `payments`, `documents`
   plus RLS policies.
3. Open **Storage** → create a **private** bucket named `documents`
   (for licence / passport uploads).

## Step 2 — Environment variables

Create `.env.local` in the project root (never commit it):

```
NEXT_PUBLIC_SUPABASE_URL=https://<your-project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon public key>
```

Add the same two variables in the Vercel project settings before deploying.

## Step 3 — Client is already scaffolded

`src/lib/supabase.ts` exports a ready Supabase client. It returns `null`
while the env vars are missing, so the demo never breaks. It also exports
`isBackendEnabled` for feature-flagging pages during migration.

## Step 4 — Migrate pages from demo data to queries

Suggested order:

1. **Fleet pages** — replace `CARS` import with
   `supabase.from('cars').select('*')`. Column names in the schema match
   the `Car` type (snake_case → map to camelCase in one helper).
2. **Booking widget** — on confirm: insert into `customers`, then
   `bookings` (status `upcoming`), then upload files to the `documents`
   bucket and insert rows into `documents`.
   Availability calendar: query overlapping bookings for the car and mark
   those days unavailable instead of the demo pattern.
3. **Admin dashboard** — read `bookings` joined with `cars`/`customers`;
   revenue stats from `payments` where `status = 'paid'`.
   Protect `/admin` with Supabase Auth + an `admin` role check
   (middleware or a server component guard).

## Step 5 — Seed the fleet

Convert `src/data/cars.ts` into seed rows (one `insert` per car) or use
the Supabase table editor. Keep the same `id` slugs so URLs don't change.

## Notes

- RLS is enabled in the schema: the fleet is public-read; customers can
  only read their own bookings/documents. Admin operations should use a
  server-side route with the service-role key (never expose it client-side).
- Salik / extra-km charges are modelled as `payments.kind` values
  (`salik`, `extra_km`) so end-of-rental adjustments need no schema change.
