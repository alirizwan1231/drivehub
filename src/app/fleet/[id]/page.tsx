import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { CARS, INCLUDED, formatAED, getCar } from "@/data/cars";
import BookingWidget from "@/components/BookingWidget";
import CarArt from "@/components/CarArt";
import CarCard from "@/components/CarCard";
import Reveal from "@/components/Reveal";
import {
  IconArrowLeft,
  IconCheck,
  IconCog,
  IconDoor,
  IconFuel,
  IconGauge,
  IconLuggage,
  IconStar,
  IconTimer,
  IconUsers,
  IconZap,
} from "@/components/icons";

export function generateStaticParams() {
  return CARS.map((c) => ({ id: c.id }));
}

export default async function CarDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const car = getCar(id);
  if (!car) notFound();

  const similar = CARS.filter((c) => c.category === car.category && c.id !== car.id).slice(0, 3);

  const specs = [
    { icon: IconZap, label: "Power", value: `${car.horsepower} HP` },
    { icon: IconTimer, label: "0–100 km/h", value: `${car.zeroToHundred}s` },
    { icon: IconGauge, label: "Top speed", value: `${car.topSpeed} km/h` },
    { icon: IconUsers, label: "Seats", value: `${car.seats}` },
    { icon: IconCog, label: "Transmission", value: car.transmission },
    { icon: IconLuggage, label: "Luggage", value: `${car.luggage} bags` },
    { icon: IconFuel, label: "Fuel", value: car.fuel },
    { icon: IconDoor, label: "Engine", value: car.engine },
  ];

  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-28 lg:px-8">
      <Link href="/fleet" className="group inline-flex items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-gold">
        <IconArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to fleet
      </Link>

      <div className="mt-6 flex flex-wrap items-start justify-between gap-5">
        <div>
          <p className="text-xs font-bold tracking-[0.28em] text-gold">{car.brand.toUpperCase()} — {car.category.toUpperCase()}</p>
          <h1 className="mt-3 font-display text-4xl font-black leading-[1.02] tracking-tight sm:text-6xl">{car.name}</h1>
          <p className="mt-4 max-w-xl text-lg text-sand">{car.tagline}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 rounded-full bg-carbon px-4 py-2 text-sm font-bold text-gold">
            <IconStar className="h-4 w-4" /> {car.rating.toFixed(1)}
          </span>
          <span className="rounded-full bg-carbon px-4 py-2 text-sm font-medium text-muted">{car.trips} trips</span>
          <span className={`rounded-full px-4 py-2 text-sm font-bold ${
            car.status === "available" ? "bg-mint/15 text-mint" : car.status === "rented" ? "bg-rose/15 text-rose" : "bg-gold/15 text-gold"
          }`}>
            {car.status === "available" ? "Available now" : car.status === "rented" ? "Currently on rent" : "In service — back soon"}
          </span>
        </div>
      </div>

      <div className="mt-10 grid items-start gap-8 lg:grid-cols-[1.55fr_1fr]">
        <div>
          <Reveal>
            <div className="relative overflow-hidden rounded-[28px]">
              <CarArt body={car.body} gradient={car.gradient} accent={car.accent} uid={car.id} className="block h-auto w-full" />
              <span className="absolute bottom-4 right-5 rounded-full bg-black/50 px-3.5 py-1.5 font-mono text-xs tracking-widest text-cream backdrop-blur-md">
                {car.plate}
              </span>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="mt-12 font-display text-2xl font-extrabold">Specifications</h2>
            <div className="mt-5 grid grid-cols-2 gap-3.5 sm:grid-cols-4">
              {specs.map((s) => (
                <div key={s.label} className="rounded-2xl border border-line bg-carbon p-5">
                  <s.icon className="h-5 w-5 text-gold" />
                  <p className="mt-3 font-display text-[15px] font-bold leading-snug text-cream">{s.value}</p>
                  <p className="mt-0.5 text-xs text-muted">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="mt-12 grid gap-10 sm:grid-cols-2">
            <Reveal>
              <h2 className="font-display text-2xl font-extrabold">Features</h2>
              <ul className="mt-5 space-y-3">
                {car.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[15px] text-sand">
                    <IconCheck className="mt-0.5 h-5 w-5 shrink-0 text-gold" /> {f}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={110}>
              <h2 className="font-display text-2xl font-extrabold">Included in every rental</h2>
              <ul className="mt-5 space-y-3">
                {INCLUDED.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[15px] text-sand">
                    <IconCheck className="mt-0.5 h-5 w-5 shrink-0 text-mint" /> {f}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal>
            <div className="mt-12 rounded-3xl border border-line bg-coal p-7">
              <h2 className="font-display text-xl font-extrabold">Good to know</h2>
              <div className="mt-4 grid gap-4 text-sm leading-relaxed text-muted sm:grid-cols-3">
                <p><span className="font-bold text-cream">Deposit.</span> A refundable hold of {formatAED(car.deposit)} is placed on your card at pickup and released within 14 days.</p>
                <p><span className="font-bold text-cream">Mileage.</span> 250 km per day included. Extra kilometres are charged at AED 2 per km — no surprises, tracked by the car.</p>
                <p><span className="font-bold text-cream">Age.</span> Drivers must be 21+ for Economy and SUV, 25+ for Sports and Luxury, with a licence held for at least one year.</p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="lg:sticky lg:top-24">
          <Suspense
            fallback={
              <div className="rounded-3xl border border-line bg-carbon p-7 text-sm text-muted">
                Loading booking panel…
              </div>
            }
          >
            <BookingWidget car={car} />
          </Suspense>
        </div>
      </div>

      {similar.length > 0 && (
        <section className="mt-24">
          <Reveal>
            <div className="flex items-end justify-between">
              <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                More {car.category.toLowerCase()} cars
              </h2>
              <Link href={`/fleet?cat=${car.category}`} className="hidden font-bold text-gold sm:block">
                View all
              </Link>
            </div>
          </Reveal>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {similar.map((c, i) => (
              <Reveal key={c.id} delay={i * 90}>
                <CarCard car={c} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
