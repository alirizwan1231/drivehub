"use client";

import { useState, type CSSProperties } from "react";
import type { Car } from "@/data/cars";
import CarArt from "@/components/CarArt";
import CountUp from "@/components/CountUp";
import {
  IconArrowLeft,
  IconArrowRight,
  IconCalendar,
  IconCog,
  IconGauge,
  IconKey,
  IconShield,
  IconUsers,
  IconWrench,
  IconZap,
} from "@/components/icons";

function BellIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

type CatId = "engine" | "exterior" | "interior" | "underbody";

interface Hotspot {
  x: number;
  y: number;
  label: string;
}
interface Readout {
  label: string;
  value: string;
  note: string;
}

const CATEGORIES: { id: CatId; label: string; icon: typeof IconZap }[] = [
  { id: "engine", label: "Engine", icon: IconZap },
  { id: "exterior", label: "Exterior", icon: IconShield },
  { id: "interior", label: "Interior", icon: IconUsers },
  { id: "underbody", label: "Underbody", icon: IconWrench },
];

const CATEGORY_DATA: Record<CatId, { hotspots: Hotspot[]; readouts: Readout[] }> = {
  engine: {
    hotspots: [
      { x: 81, y: 50, label: "V8 biturbo" },
      { x: 68, y: 63, label: "Turbo" },
      { x: 91, y: 60, label: "Cooling" },
    ],
    readouts: [
      { label: "Oil life", value: "82%", note: "Changed 1,790 km ago" },
      { label: "Coolant temp", value: "96°C", note: "Normal operating range" },
      { label: "Air filter", value: "Good", note: "Replace in 4,000 km" },
      { label: "Battery", value: "13.9 V", note: "Charging healthy" },
    ],
  },
  exterior: {
    hotspots: [
      { x: 50, y: 36, label: "Paint" },
      { x: 21, y: 79, label: "Wheel" },
      { x: 93, y: 54, label: "LED light" },
    ],
    readouts: [
      { label: "Paint condition", value: "Perfect", note: "Zero marks on inspection" },
      { label: "Tyre tread", value: "7.2 mm", note: "All four corners even" },
      { label: "Ceramic coat", value: "Active", note: "Applied Mar 2026" },
      { label: "Glass", value: "Clear", note: "No chips or cracks" },
    ],
  },
  interior: {
    hotspots: [
      { x: 44, y: 40, label: "Seats" },
      { x: 58, y: 37, label: "Display" },
      { x: 51, y: 54, label: "Climate" },
    ],
    readouts: [
      { label: "Leather condition", value: "98%", note: "Conditioned weekly" },
      { label: "Cabin filter", value: "New", note: "Fitted at last service" },
      { label: "Climate", value: "Dual-zone OK", note: "Both zones responsive" },
      { label: "Detail status", value: "Showroom", note: "Deep-cleaned 16 Nov" },
    ],
  },
  underbody: {
    hotspots: [
      { x: 24, y: 83, label: "Brakes" },
      { x: 62, y: 88, label: "Exhaust" },
      { x: 79, y: 80, label: "Suspension" },
    ],
    readouts: [
      { label: "Brake pads", value: "74%", note: "Front axle, even wear" },
      { label: "Suspension", value: "Auto level", note: "Air system sealed" },
      { label: "Undertray", value: "Intact", note: "No scrapes recorded" },
      { label: "Exhaust", value: "Clear", note: "Sport system, no leaks" },
    ],
  },
};

const VIEW_NAMES = [
  "Front three-quarter",
  "Side profile",
  "Rear three-quarter",
  "Rear profile",
  "Rear three-quarter · L",
  "Side profile · L",
  "Front three-quarter · L",
  "Front profile",
];
const VIEW_TILT = [-14, -7, 0, 7, 14, 7, 0, -7];

const MONTHLY_COSTS = [
  { m: "Jan", v: 18200 },
  { m: "Feb", v: 16400 },
  { m: "Mar", v: 21900 },
  { m: "Apr", v: 19600 },
  { m: "May", v: 23400 },
  { m: "Jun", v: 20800 },
];

export default function StudioConsole({
  car,
  stats,
}: {
  car: Car;
  stats: { utilisation: number; activeRentals: number; fleetSize: number; rented: number; available: number };
}) {
  const [cat, setCat] = useState<CatId>("exterior");
  const [view, setView] = useState(1); // start at side profile
  const data = CATEGORY_DATA[cat];
  const avgCost = Math.round(MONTHLY_COSTS.reduce((s, c) => s + c.v, 0) / MONTHLY_COSTS.length);
  const maxCost = Math.max(...MONTHLY_COSTS.map((c) => c.v));

  const step = (dir: 1 | -1) => setView((v) => (v + dir + 8) % 8);

  return (
    <div className="studio-panel overflow-hidden rounded-[32px]">
      {/* ---------- slim console header ---------- */}
      <div className="flex items-center justify-between gap-4 border-b border-white/8 px-5 py-3.5 sm:px-7">
        <div className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gold font-display text-sm font-black text-ink">D</span>
          <p className="font-display text-sm font-extrabold tracking-[0.22em] text-pale">
            DRIVEHUB <span className="font-medium text-fog">CONSOLE</span>
          </p>
        </div>
        <nav className="hidden items-center gap-1 rounded-full border border-white/8 bg-black/30 p-1 md:flex" aria-label="Console">
          {[
            { icon: IconGauge, label: "Overview", active: true },
            { icon: IconKey, label: "Rentals", active: false },
            { icon: IconCalendar, label: "Bookings", active: false },
            { icon: IconCog, label: "Settings", active: false },
          ].map((n) => (
            <span
              key={n.label}
              title={n.label}
              className={`grid h-9 w-11 place-items-center rounded-full ${n.active ? "bg-studio-2 text-pale" : "text-fog transition hover:text-pale"}`}
            >
              <n.icon className="h-[18px] w-[18px]" />
            </span>
          ))}
        </nav>
        <div className="flex items-center gap-3.5">
          <span className="relative text-fog transition hover:text-pale">
            <BellIcon className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-[#fb5e7e]" />
          </span>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-studio-2 font-display text-xs font-extrabold text-pale ring-1 ring-white/15">
            AR
          </span>
        </div>
      </div>

      {/* ---------- rail + stage ---------- */}
      <div className="grid lg:grid-cols-[190px_1fr]">
        {/* category rail */}
        <div className="flex gap-2 overflow-x-auto border-b border-white/8 px-5 py-4 no-scrollbar lg:flex-col lg:border-b-0 lg:border-r lg:px-4 lg:py-6">
          <p className="hidden px-2 pb-1 text-[10px] font-bold tracking-[0.24em] text-fog lg:block">INSPECT</p>
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              className={`flex shrink-0 items-center gap-2.5 rounded-full px-4 py-2.5 text-sm font-semibold transition-all lg:rounded-2xl ${
                cat === c.id
                  ? "bg-pale text-abyss shadow-[0_10px_30px_-10px_rgba(220,225,230,0.5)]"
                  : "text-fog hover:bg-white/5 hover:text-pale"
              }`}
            >
              <c.icon className="h-4.5 w-4.5" />
              {c.label}
              {cat === c.id && <span className="ml-auto hidden h-1.5 w-1.5 rounded-full bg-abyss lg:block" />}
            </button>
          ))}
          <div className="mt-auto hidden px-2 pt-6 lg:block">
            <p className="text-[10px] font-bold tracking-[0.24em] text-fog">SPOTLIGHT UNIT</p>
            <p className="mt-2 font-display text-sm font-bold leading-snug text-pale">{car.name}</p>
            <p className="mt-0.5 font-mono text-[11px] tracking-wider text-fog">{car.plate}</p>
            <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#fb5e7e]/12 px-2.5 py-1 text-[10.5px] font-bold text-[#fb5e7e]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#fb5e7e]" /> ON RENT
            </p>
          </div>
        </div>

        {/* stage */}
        <div className="studio-stage relative overflow-hidden px-4 pb-5 pt-8 sm:px-8">
          {/* spotlight beams */}
          <div
            className="pointer-events-none absolute -top-10 h-72 w-40 bg-gradient-to-b from-white/14 to-transparent blur-md transition-all duration-700"
            style={{ right: `${10 + view * 6}%`, transform: "rotate(24deg)" }}
          />
          <div
            className="pointer-events-none absolute -top-10 h-64 w-24 bg-gradient-to-b from-white/8 to-transparent blur-md transition-all duration-700"
            style={{ right: `${26 + view * 5}%`, transform: "rotate(24deg)" }}
          />
          <p className="absolute left-5 top-4 text-[10px] font-bold tracking-[0.24em] text-fog sm:left-7">
            STUDIO BAY 01 · {VIEW_NAMES[view].toUpperCase()}
          </p>
          <p className="absolute right-5 top-4 flex items-center gap-1.5 text-[10px] font-bold tracking-[0.24em] text-fog sm:right-7">
            <span className="live-dot h-1.5 w-1.5 rounded-full bg-pale" /> LIVE FEED
          </p>

          {/* car + hotspots */}
          <div className="relative mx-auto mt-4 max-w-3xl">
            <div
              className="relative transition-transform duration-700 ease-out"
              style={{ transform: `perspective(1100px) rotateY(${VIEW_TILT[view]}deg)` }}
            >
              <CarArt body={car.body} gradient={car.gradient} accent={car.accent} uid="studio" bare className="block h-auto w-full" />
              {data.hotspots.map((h, i) => (
                <span key={`${cat}-${h.label}`} className="absolute" style={{ left: `${h.x}%`, top: `${h.y}%` }}>
                  <span
                    className="block h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full border border-pale"
                    style={{ animationDelay: `${i * 420}ms`, animationDuration: "2.4s" } as CSSProperties}
                  />
                  <span className="absolute left-1/2 top-1/2 h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pale shadow-[0_0_10px_rgba(220,225,230,0.9)]" />
                  <span className="absolute left-1/2 top-3 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/45 px-2 py-0.5 text-[9.5px] font-bold tracking-wider text-pale backdrop-blur-sm">
                    {h.label}
                  </span>
                </span>
              ))}
            </div>

            {/* floor reflection */}
            <div className="pointer-events-none h-12 overflow-hidden opacity-25 [mask-image:linear-gradient(to_bottom,black,transparent)] sm:h-16" aria-hidden>
              <div className="origin-top -scale-y-100">
                <CarArt body={car.body} gradient={car.gradient} accent={car.accent} uid="studio-refl" bare className="block h-auto w-full" />
              </div>
            </div>

            {/* turntable orbit */}
            <svg viewBox="0 0 600 110" className="pointer-events-none absolute -bottom-3 left-1/2 w-[108%] -translate-x-1/2" aria-hidden>
              <ellipse cx="300" cy="55" rx="292" ry="46" fill="none" stroke="rgba(220,225,230,0.14)" strokeWidth="1" />
              <ellipse cx="300" cy="55" rx="292" ry="46" fill="none" stroke="rgba(220,225,230,0.65)" strokeWidth="1.4" className="orbit-spin" />
              <circle cx="592" cy="55" r="3" fill="#dce1e6" />
            </svg>
          </div>

          {/* turntable controls */}
          <div className="relative mt-3 flex items-center justify-center gap-4">
            <button
              onClick={() => step(-1)}
              aria-label="Rotate view left"
              className="grid h-10 w-10 place-items-center rounded-full border border-pale/30 text-pale transition hover:border-pale hover:bg-white/5"
            >
              <IconArrowLeft className="h-4 w-4" />
            </button>
            <div className="text-center">
              <p className="font-display text-lg font-light tracking-[0.3em] text-pale">
                360<span className="align-top text-[10px]">°</span>
              </p>
              <p className="text-[10px] font-bold tracking-[0.22em] text-fog">{view * 45}° · TURNTABLE</p>
            </div>
            <button
              onClick={() => step(1)}
              aria-label="Rotate view right"
              className="grid h-10 w-10 place-items-center rounded-full border border-pale/30 text-pale transition hover:border-pale hover:bg-white/5"
            >
              <IconArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ---------- active category readouts ---------- */}
      <div className="grid grid-cols-2 gap-px border-t border-white/8 bg-white/5 lg:grid-cols-4">
        {data.readouts.map((r) => (
          <div key={r.label} className="bg-abyss/60 px-5 py-4">
            <p className="text-[10px] font-bold tracking-[0.22em] text-fog">{r.label.toUpperCase()}</p>
            <p className="mt-1.5 font-display text-lg font-bold text-pale">{r.value}</p>
            <p className="mt-0.5 text-[11px] text-fog">{r.note}</p>
          </div>
        ))}
      </div>

      {/* ---------- bottom cards ---------- */}
      <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-3">
        {/* vehicle details */}
        <article className="card-up rounded-3xl border border-white/9 bg-white/[0.04] p-6" style={{ "--up-delay": "0ms" } as CSSProperties}>
          <div className="flex items-start justify-between">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/7 text-pale">
              <IconShield className="h-5 w-5" />
            </span>
            <span className="grid h-8 w-8 place-items-center rounded-full border border-white/12 text-fog">
              <IconArrowRight className="h-3.5 w-3.5 -rotate-45" />
            </span>
          </div>
          <h3 className="mt-4 font-display text-[15px] font-bold text-pale">Vehicle Details</h3>
          <p className="text-xs text-fog">Condition report · fleet-wide average</p>
          <p className="mt-4 font-display text-[44px] font-extralight leading-none tracking-tight text-pale">Perfect</p>
          <svg viewBox="0 0 220 44" className="mt-4 w-full">
            <polyline
              points="2,36 34,32 62,34 92,24 122,27 152,15 184,18 218,5"
              fill="none"
              stroke="#dce1e6"
              strokeWidth="1.6"
              strokeLinecap="round"
              className="spark-draw"
            />
            <circle cx="218" cy="5" r="3" fill="#dce1e6" />
          </svg>
          <div className="mt-4 flex gap-5 border-t border-white/8 pt-4">
            <div>
              <p className="font-display text-lg font-bold text-pale">{car.zeroToHundred}s</p>
              <p className="text-[10.5px] text-fog">0–100 km/h</p>
            </div>
            <div>
              <p className="font-display text-lg font-bold text-pale">{car.horsepower}</p>
              <p className="text-[10.5px] text-fog">Horsepower</p>
            </div>
            <div>
              <p className="font-display text-lg font-bold text-pale">{car.topSpeed}</p>
              <p className="text-[10.5px] text-fog">Top speed km/h</p>
            </div>
          </div>
        </article>

        {/* reminders */}
        <article className="card-up rounded-3xl border border-white/9 bg-white/[0.04] p-6" style={{ "--up-delay": "130ms" } as CSSProperties}>
          <div className="flex items-start justify-between">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/7 text-pale">
              <IconCalendar className="h-5 w-5" />
            </span>
            <span className="grid h-8 w-8 place-items-center rounded-full border border-white/12 text-fog">
              <IconArrowRight className="h-3.5 w-3.5 -rotate-45" />
            </span>
          </div>
          <h3 className="mt-4 font-display text-[15px] font-bold text-pale">Reminders</h3>
          <p className="text-xs text-fog">Closest return & service deadlines</p>
          <div className="mt-4 flex items-center justify-between gap-4">
            <div>
              <p className="font-display text-[44px] font-extralight leading-none tracking-tight text-pale">
                <CountUp end={2} /> Days
              </p>
              <p className="mt-2.5 text-xs leading-relaxed text-fog">
                G63 return — Thu 20 Nov, 11:00
                <br />
                Dubai Marina · Omar Al Farsi
              </p>
            </div>
            <div className="relative shrink-0">
              <svg width="76" height="76" viewBox="0 0 76 76">
                <circle cx="38" cy="38" r="32" fill="none" stroke="rgba(220,225,230,0.12)" strokeWidth="5" />
                <circle
                  cx="38"
                  cy="38"
                  r="32"
                  fill="none"
                  stroke="#dce1e6"
                  strokeWidth="5"
                  strokeLinecap="round"
                  pathLength={100}
                  className="gauge-arc"
                  style={{ "--arc-to": 32, transform: "rotate(-90deg)", transformOrigin: "38px 38px" } as CSSProperties}
                />
              </svg>
              <span className="absolute inset-0 grid place-items-center font-display text-sm font-bold text-pale">68%</span>
            </div>
          </div>
          <div className="mt-5 flex h-2.5 gap-1.5" aria-hidden>
            <span className="bar-slide w-[42%] rounded-full bg-pale" style={{ "--bar-delay": "200ms" } as CSSProperties} />
            <span className="seg-hatch bar-slide w-[26%] rounded-full" style={{ "--bar-delay": "330ms" } as CSSProperties} />
            <span className="w-[32%] rounded-full bg-white/10" />
          </div>
          <p className="mt-2.5 text-[11px] text-fog">Service interval — 68% used · next service in 1,790 km</p>
        </article>

        {/* running costs */}
        <article className="card-up rounded-3xl border border-white/9 bg-white/[0.04] p-6" style={{ "--up-delay": "260ms" } as CSSProperties}>
          <div className="flex items-start justify-between">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/7 text-pale">
              <IconGauge className="h-5 w-5" />
            </span>
            <span className="grid h-8 w-8 place-items-center rounded-full border border-white/12 text-fog">
              <IconArrowRight className="h-3.5 w-3.5 -rotate-45" />
            </span>
          </div>
          <h3 className="mt-4 font-display text-[15px] font-bold text-pale">Running Costs</h3>
          <p className="text-xs text-fog">Fleet average · per month, Jan–Jun</p>
          <p className="mt-4 font-display text-[40px] font-extralight leading-none tracking-tight text-pale">
            <CountUp end={avgCost} prefix="AED " />
          </p>
          <div className="mt-5 flex h-24 items-end gap-2.5">
            {MONTHLY_COSTS.map((c, i) => (
              <div key={c.m} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className={`bar-grow w-full rounded-t-md ${i === 4 ? "bg-pale" : "bg-pale/35"}`}
                  style={{ height: `${(c.v / maxCost) * 100}%`, "--bar-delay": `${i * 90}ms` } as CSSProperties}
                />
                <span className="text-[10px] font-bold text-fog">{c.m}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 border-t border-white/8 pt-3.5 text-[11px] text-fog">
            Fuel, Salik, cleaning & maintenance — <span className="font-bold text-pale">+6.1%</span> vs prior half (demo)
          </p>
        </article>
      </div>
    </div>
  );
}
