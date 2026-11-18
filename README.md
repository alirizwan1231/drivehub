# DriveHub — Premium Car Rental Platform (Dubai / UAE)

A complete, Dribbble-inspired car rental web app: a full-page-scroll landing
experience, a filterable fleet, rich car detail pages with a working booking
flow (availability calendar, documents step, price breakdown, confirmation),
and an operations dashboard for the rental company.

**Frontend-only demo** — everything runs on local demo data, no API keys and
no environment variables required. Backend scaffolding for Supabase is
included for later setup (see `BACKEND-SETUP.md`).

## Design direction

Researched against current Dribbble car-rental / automotive UI (premium dark
themes won over light ones): deep charcoal surfaces, a single vivid gold
accent, huge Archivo display typography, spec-forward car cards, smooth
scroll-reveal animations, a horizontal-scroll featured fleet rail and a brand
marquee. Cars are rendered as stylised SVG silhouette panels with per-car
gradient art — no external photos, no emojis, Lucide-style inline SVG icons
throughout.

## Features

- **Landing (`/`)** — hero with booking search bar, featured fleet
  horizontal rail, category tiles, how-it-works, why-us, testimonials, CTA
- **Fleet (`/fleet`)** — 14 demo cars (Economy, SUV, Luxury, Sports),
  category filters, search, sorting, availability toggle, AED pricing
- **Car detail (`/fleet/[id]`)** — full spec grid, features, included items,
  deposit/mileage/age notes, similar cars
- **Booking flow** — visual two-month availability calendar with booked-out
  days, delivery location, live price breakdown (days × rate + 5% VAT +
  service fee, refundable deposit shown separately), renter details,
  driving-licence & ID upload step, confirmation screen with booking reference
- **Admin dashboard (`/admin`)** — revenue stat cards, 7-day revenue chart,
  bookings table, upcoming returns, live fleet status grid

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Tech

- Next.js (App Router) + TypeScript
- Tailwind CSS v4
- Demo data in `src/data/` — swap for Supabase queries later
- Backend scaffolding: `supabase/schema.sql`, `src/lib/supabase.ts`,
  `BACKEND-SETUP.md` (cars, bookings, customers, payments, documents)

## Notes

All cars, prices, people and bookings are fictional demo data. Prices are in
UAE dirhams (AED). Part of Ali Rizwan's portfolio project series.
