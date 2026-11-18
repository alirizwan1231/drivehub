import Link from "next/link";
import { CARS } from "@/data/cars";
import CarArt from "@/components/CarArt";
import FleetRail from "@/components/FleetRail";
import Reveal from "@/components/Reveal";
import SearchBar from "@/components/SearchBar";
import {
  IconArrowRight,
  IconCard,
  IconCheck,
  IconClock,
  IconFileCheck,
  IconKey,
  IconMapPin,
  IconSearch,
  IconShield,
  IconStar,
} from "@/components/icons";

const BRANDS = ["LAMBORGHINI", "PORSCHE", "MERCEDES-BENZ", "RANGE ROVER", "BMW", "AUDI", "FORD", "NISSAN", "TESLA", "TOYOTA"];

const STATS = [
  { value: "140+", label: "Cars in the fleet" },
  { value: "15,400", label: "Completed rentals" },
  { value: "4.9 / 5", label: "Average rating" },
  { value: "24 / 7", label: "Support & delivery" },
];

const STEPS = [
  {
    n: "01",
    icon: IconSearch,
    title: "Choose your car",
    text: "Browse the live fleet, compare real specs and transparent daily prices in AED. No surprises at checkout.",
  },
  {
    n: "02",
    icon: IconFileCheck,
    title: "Verify in minutes",
    text: "Upload your driving licence and ID once. Our team verifies documents before your pickup time.",
  },
  {
    n: "03",
    icon: IconKey,
    title: "We deliver, you drive",
    text: "Free delivery anywhere in Dubai — hotel, home or airport. The car arrives fuelled, cleaned and inspected.",
  },
];

const WHY = [
  {
    icon: IconCard,
    title: "No hidden fees",
    text: "The price you see includes insurance, VAT and 250 km per day. Salik is billed at cost, never marked up.",
  },
  {
    icon: IconClock,
    title: "Free cancellation",
    text: "Plans change. Cancel free of charge up to 24 hours before pickup and get a full refund of your payment.",
  },
  {
    icon: IconShield,
    title: "Fully insured fleet",
    text: "Every car carries comprehensive UAE insurance and is dealer-maintained on schedule. Safety first, always.",
  },
  {
    icon: IconMapPin,
    title: "Delivery anywhere",
    text: "Marina to Palm Jumeirah, DXB arrivals to Business Bay — we bring the car to you, on time, day or night.",
  },
];

const TESTIMONIALS = [
  {
    quote: "Booked the Huracán at midnight, it was at my hotel by 9am. Cleanest rental process I have used anywhere in the world.",
    name: "Daniel Reeves",
    meta: "London — Lamborghini Huracán EVO",
  },
  {
    quote: "The Patrol swallowed seven of us plus luggage for a Hatta trip. Transparent pricing, zero deposit drama on return.",
    name: "Mariam Al Suwaidi",
    meta: "Abu Dhabi — Nissan Patrol Platinum",
  },
  {
    quote: "Third time renting the S-Class for client meetings. Cars are always spotless and the team is one WhatsApp message away.",
    name: "Viktor Petrov",
    meta: "Dubai — Mercedes-Benz S 500",
  },
];

const CATEGORY_TILES = [
  { cat: "Sports", blurb: "Huracán, 911, Corvette", count: CARS.filter((c) => c.category === "Sports").length },
  { cat: "Luxury", blurb: "S-Class, G63, Range Rover", count: CARS.filter((c) => c.category === "Luxury").length },
  { cat: "SUV", blurb: "Patrol, Land Cruiser, RS Q8", count: CARS.filter((c) => c.category === "SUV").length },
  { cat: "Economy", blurb: "Elantra, K5 — from AED 140", count: CARS.filter((c) => c.category === "Economy").length },
];

export default function Home() {
  const heroCar = CARS[0];
  const featured = CARS.filter((c) => c.status === "available").slice(0, 8);

  return (
    <div>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden pt-[72px]">
        <div className="pointer-events-none absolute inset-0">
          <div className="glow-pulse absolute -top-40 right-[-10%] h-[560px] w-[560px] rounded-full bg-gold/15 blur-[140px]" />
          <div className="absolute bottom-0 left-[-12%] h-[420px] w-[420px] rounded-full bg-sky/10 blur-[130px]" />
          <p className="text-stroke absolute -right-6 top-24 select-none font-display text-[19vw] font-black leading-none tracking-tighter opacity-60 lg:text-[240px]">
            DUBAI
          </p>
        </div>

        <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-14 lg:px-8 lg:pt-20">
          <div className="max-w-3xl">
            <p className="rise flex items-center gap-2 text-xs font-bold tracking-[0.28em] text-gold" style={{ "--rise-delay": "0ms" } as React.CSSProperties}>
              <span className="h-px w-10 bg-gold" /> PREMIUM CAR RENTAL — DUBAI, UAE
            </p>
            <h1 className="rise mt-6 font-display text-[13.5vw] font-black leading-[0.95] tracking-tight sm:text-7xl lg:text-[104px]" style={{ "--rise-delay": "120ms" } as React.CSSProperties}>
              DRIVE THE
              <br />
              CITY OF <span className="gold-grad">GOLD.</span>
            </h1>
            <p className="rise mt-6 max-w-xl text-lg leading-relaxed text-sand" style={{ "--rise-delay": "240ms" } as React.CSSProperties}>
              From a Huracán for the night to a Patrol for the family — 140+ new-model cars,
              transparent AED pricing and free delivery anywhere in Dubai.
            </p>
          </div>

          <div className="rise relative mt-10" style={{ "--rise-delay": "360ms" } as React.CSSProperties}>
            <div className="car-drift">
              <CarArt body={heroCar.body} gradient={heroCar.gradient} accent={heroCar.accent} uid="hero" className="block h-auto w-full" />
            </div>
            <div className="absolute bottom-5 left-5 hidden items-center gap-4 rounded-2xl border border-white/10 bg-black/50 px-5 py-3.5 backdrop-blur-md sm:flex">
              <div>
                <p className="text-[11px] font-bold tracking-widest text-muted">FEATURED</p>
                <p className="font-display text-base font-bold text-cream">{heroCar.name}</p>
              </div>
              <span className="h-8 w-px bg-white/15" />
              <p className="text-sm text-sand">
                <span className="font-display text-lg font-extrabold text-gold">AED {heroCar.pricePerDay.toLocaleString()}</span> /day
              </p>
            </div>
          </div>

          <div className="rise mt-8" style={{ "--rise-delay": "480ms" } as React.CSSProperties}>
            <SearchBar />
          </div>

          <div className="mt-12 grid grid-cols-2 gap-6 border-t border-line pt-8 lg:grid-cols-4">
            {STATS.map((s, i) => (
              <div key={s.label} className="rise" style={{ "--rise-delay": `${560 + i * 90}ms` } as React.CSSProperties}>
                <p className="font-display text-3xl font-extrabold text-cream lg:text-4xl">{s.value}</p>
                <p className="mt-1 text-sm text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BRAND MARQUEE ================= */}
      <section className="overflow-hidden border-y border-line bg-coal py-5">
        <div className="marquee-track flex w-max items-center gap-14">
          {[...BRANDS, ...BRANDS].map((b, i) => (
            <span key={i} className="flex items-center gap-14 whitespace-nowrap font-display text-lg font-bold tracking-[0.3em] text-muted">
              {b} <span className="h-1.5 w-1.5 rounded-full bg-gold/70" />
            </span>
          ))}
        </div>
      </section>

      {/* ================= FEATURED FLEET RAIL ================= */}
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="flex items-center gap-2 text-xs font-bold tracking-[0.28em] text-gold">
                <span className="h-px w-10 bg-gold" /> THE FLEET
              </p>
              <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
                Featured cars, <span className="gold-grad">ready today</span>
              </h2>
            </div>
            <Link href="/fleet" className="group flex items-center gap-2 font-bold text-gold">
              View full fleet
              <IconArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="mt-10">
            <FleetRail cars={featured} />
          </div>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORY_TILES.map((t, i) => (
            <Reveal key={t.cat} delay={i * 90}>
              <Link
                href={`/fleet?cat=${t.cat}`}
                className="card-lift group block rounded-3xl border border-line bg-carbon p-6"
              >
                <p className="font-display text-2xl font-extrabold text-cream">{t.cat}</p>
                <p className="mt-1.5 text-sm text-muted">{t.blurb}</p>
                <p className="mt-5 flex items-center justify-between text-sm font-bold text-gold">
                  {t.count} cars
                  <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section id="how-it-works" className="border-y border-line bg-coal">
        <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
          <Reveal>
            <p className="flex items-center gap-2 text-xs font-bold tracking-[0.28em] text-gold">
              <span className="h-px w-10 bg-gold" /> HOW IT WORKS
            </p>
            <h2 className="mt-4 max-w-2xl font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
              On the road in <span className="gold-grad">three steps</span>
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 120}>
                <div className="card-lift relative h-full overflow-hidden rounded-3xl border border-line bg-carbon p-8">
                  <span className="text-stroke pointer-events-none absolute -right-2 -top-4 select-none font-display text-[110px] font-black leading-none">
                    {s.n}
                  </span>
                  <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-gold/12 text-gold">
                    <s.icon className="h-7 w-7" />
                  </span>
                  <h3 className="relative mt-6 font-display text-2xl font-bold">{s.title}</h3>
                  <p className="relative mt-3 leading-relaxed text-muted">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY US ================= */}
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="grid items-start gap-14 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <div>
              <p className="flex items-center gap-2 text-xs font-bold tracking-[0.28em] text-gold">
                <span className="h-px w-10 bg-gold" /> WHY DRIVEHUB
              </p>
              <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                Rental, minus the <span className="gold-grad">rental games</span>
              </h2>
              <p className="mt-5 max-w-md leading-relaxed text-muted">
                No deposit traps, no surprise Salik markups, no tired cars. Just a well-kept fleet,
                honest pricing and people who pick up the phone.
              </p>
              <div className="mt-8 flex items-center gap-3">
                <span className="flex items-center gap-1.5 rounded-full bg-carbon px-4 py-2 text-sm font-bold text-gold">
                  <IconStar className="h-4 w-4" /> 4.9
                </span>
                <span className="text-sm text-muted">from 3,100+ verified reviews</span>
              </div>
            </div>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            {WHY.map((w, i) => (
              <Reveal key={w.title} delay={i * 100}>
                <div className="card-lift h-full rounded-3xl border border-line bg-carbon p-7">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-gold/12 text-gold">
                    <w.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-bold">{w.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">{w.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="border-y border-line bg-coal">
        <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
          <Reveal>
            <p className="flex items-center gap-2 text-xs font-bold tracking-[0.28em] text-gold">
              <span className="h-px w-10 bg-gold" /> DRIVERS SAY
            </p>
            <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
              Trusted on <span className="gold-grad">Sheikh Zayed Road</span>
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 110}>
                <figure className="card-lift flex h-full flex-col rounded-3xl border border-line bg-carbon p-8">
                  <span className="flex gap-1 text-gold">
                    {[...Array(5)].map((_, s) => (
                      <IconStar key={s} className="h-4 w-4" />
                    ))}
                  </span>
                  <blockquote className="mt-5 flex-1 leading-relaxed text-sand">“{t.quote}”</blockquote>
                  <figcaption className="mt-6 border-t border-line pt-5">
                    <p className="font-display font-bold text-cream">{t.name}</p>
                    <p className="mt-0.5 text-sm text-muted">{t.meta}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[380px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/12 blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-5 py-28 text-center lg:px-8">
          <Reveal>
            <h2 className="mx-auto max-w-3xl font-display text-5xl font-black leading-[1.02] tracking-tight sm:text-6xl">
              YOUR KEYS ARE <span className="gold-grad">WAITING.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-sand">
              Book in under three minutes. The car comes to you — anywhere in Dubai, any hour.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/fleet"
                className="group flex items-center gap-2 rounded-full bg-gold px-8 py-4 font-bold text-ink transition-all hover:bg-gold-2 hover:shadow-[0_14px_45px_rgba(245,179,1,0.4)]"
              >
                Browse the fleet
                <IconArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <span className="flex items-center gap-2 text-sm font-medium text-muted">
                <IconCheck className="h-4 w-4 text-mint" /> No prepayment needed for most cars
              </span>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
