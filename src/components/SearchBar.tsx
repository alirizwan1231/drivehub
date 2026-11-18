"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { CATEGORIES, LOCATIONS } from "@/data/cars";
import { IconCalendar, IconChevronDown, IconMapPin, IconSearch } from "./icons";

const fieldLabel = "mb-2 flex items-center gap-1.5 text-[11px] font-bold tracking-[0.16em] text-muted";
const fieldInput =
  "w-full appearance-none rounded-xl border border-line bg-carbon-2 px-3.5 py-3 text-sm font-medium text-cream outline-none transition-colors focus:border-gold/60";

export default function SearchBar() {
  const router = useRouter();
  const [location, setLocation] = useState(LOCATIONS[0]);
  const [pickup, setPickup] = useState("2026-11-21");
  const [ret, setRet] = useState("2026-11-24");
  const [cat, setCat] = useState("All");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = new URLSearchParams();
    if (cat !== "All") q.set("cat", cat);
    q.set("loc", location);
    q.set("from", pickup);
    q.set("to", ret);
    router.push(`/fleet?${q.toString()}`);
  };

  return (
    <form
      onSubmit={submit}
      className="grid gap-3 rounded-3xl border border-line bg-coal/90 p-4 shadow-[0_35px_80px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr_auto] lg:items-end"
    >
      <div>
        <label className={fieldLabel}><IconMapPin className="h-3.5 w-3.5 text-gold" /> PICKUP LOCATION</label>
        <div className="relative">
          <select value={location} onChange={(e) => setLocation(e.target.value)} className={fieldInput}>
            {LOCATIONS.map((l) => (
              <option key={l} value={l} className="bg-carbon">{l}</option>
            ))}
          </select>
          <IconChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        </div>
      </div>

      <div>
        <label className={fieldLabel}><IconCalendar className="h-3.5 w-3.5 text-gold" /> PICKUP DATE</label>
        <input type="date" value={pickup} onChange={(e) => setPickup(e.target.value)} className={fieldInput} />
      </div>

      <div>
        <label className={fieldLabel}><IconCalendar className="h-3.5 w-3.5 text-gold" /> RETURN DATE</label>
        <input type="date" value={ret} onChange={(e) => setRet(e.target.value)} className={fieldInput} />
      </div>

      <div>
        <label className={fieldLabel}><IconSearch className="h-3.5 w-3.5 text-gold" /> CAR CLASS</label>
        <div className="relative">
          <select value={cat} onChange={(e) => setCat(e.target.value)} className={fieldInput}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c} className="bg-carbon">{c === "All" ? "All classes" : c}</option>
            ))}
          </select>
          <IconChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        </div>
      </div>

      <button
        type="submit"
        className="flex items-center justify-center gap-2 rounded-xl bg-gold px-7 py-3 text-sm font-bold text-ink transition-all hover:bg-gold-2 hover:shadow-[0_10px_35px_rgba(245,179,1,0.4)] sm:col-span-2 lg:col-span-1"
      >
        <IconSearch className="h-4 w-4" /> Search cars
      </button>
    </form>
  );
}
