"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CARS, CATEGORIES, type CarCategory } from "@/data/cars";
import CarCard from "@/components/CarCard";
import Reveal from "@/components/Reveal";
import { IconCalendar, IconChevronDown, IconMapPin, IconSearch } from "@/components/icons";

type Sort = "featured" | "price-asc" | "price-desc" | "rating";

function FleetBrowser() {
  const params = useSearchParams();
  const initialCat = params.get("cat");
  const loc = params.get("loc");
  const from = params.get("from");
  const to = params.get("to");

  const [cat, setCat] = useState<"All" | CarCategory>(
    initialCat && CATEGORIES.includes(initialCat as CarCategory) ? (initialCat as CarCategory) : "All"
  );
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("featured");
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  const cars = useMemo(() => {
    let list = CARS.filter((c) => (cat === "All" ? true : c.category === cat));
    if (onlyAvailable) list = list.filter((c) => c.status === "available");
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((c) => `${c.brand} ${c.name}`.toLowerCase().includes(q));
    }
    switch (sort) {
      case "price-asc": list = [...list].sort((a, b) => a.pricePerDay - b.pricePerDay); break;
      case "price-desc": list = [...list].sort((a, b) => b.pricePerDay - a.pricePerDay); break;
      case "rating": list = [...list].sort((a, b) => b.rating - a.rating); break;
    }
    return list;
  }, [cat, query, sort, onlyAvailable]);

  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-32 lg:px-8">
      <p className="flex items-center gap-2 text-xs font-bold tracking-[0.28em] text-gold">
        <span className="h-px w-10 bg-gold" /> THE FLEET
      </p>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
        <h1 className="font-display text-5xl font-black tracking-tight sm:text-6xl">
          Choose your <span className="gold-grad">ride</span>
        </h1>
        <p className="max-w-sm text-sm leading-relaxed text-muted">
          Every price includes insurance, VAT and 250 km/day. Deposits are refundable and released within 14 days of return.
        </p>
      </div>

      {loc && (
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-2xl border border-gold/25 bg-gold/5 px-5 py-3.5 text-sm text-sand">
          <span className="flex items-center gap-2"><IconMapPin className="h-4 w-4 text-gold" /> {loc}</span>
          {from && to && (
            <span className="flex items-center gap-2"><IconCalendar className="h-4 w-4 text-gold" /> {from} → {to}</span>
          )}
          <span className="text-muted">Showing the full fleet — pick a car to set exact dates.</span>
        </div>
      )}

      {/* controls */}
      <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full px-5 py-2.5 text-sm font-bold transition-all ${
                cat === c
                  ? "bg-gold text-ink shadow-[0_8px_25px_rgba(245,179,1,0.35)]"
                  : "border border-line bg-carbon text-sand hover:border-gold/50 hover:text-gold"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <IconSearch className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search brand or model"
              className="w-56 rounded-full border border-line bg-carbon py-2.5 pl-10 pr-4 text-sm text-cream outline-none placeholder:text-muted focus:border-gold/60"
            />
          </div>
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="appearance-none rounded-full border border-line bg-carbon py-2.5 pl-4 pr-10 text-sm font-medium text-cream outline-none focus:border-gold/60"
            >
              <option value="featured" className="bg-carbon">Featured</option>
              <option value="price-asc" className="bg-carbon">Price: low to high</option>
              <option value="price-desc" className="bg-carbon">Price: high to low</option>
              <option value="rating" className="bg-carbon">Top rated</option>
            </select>
            <IconChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          </div>
          <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-sand">
            <input
              type="checkbox"
              checked={onlyAvailable}
              onChange={(e) => setOnlyAvailable(e.target.checked)}
              className="h-4 w-4 accent-[#f5b301]"
            />
            Available only
          </label>
        </div>
      </div>

      <p className="mt-8 text-sm text-muted">
        <span className="font-bold text-cream">{cars.length}</span> car{cars.length !== 1 ? "s" : ""} found
      </p>

      {cars.length > 0 ? (
        <div className="mt-5 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {cars.map((car, i) => (
            <Reveal key={car.id} delay={(i % 3) * 90}>
              <CarCard car={car} />
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-3xl border border-dashed border-line bg-coal px-6 py-20 text-center">
          <p className="font-display text-2xl font-bold text-cream">No cars match those filters</p>
          <p className="mt-2 text-sm text-muted">Try a different class or clear the search.</p>
          <button
            onClick={() => { setCat("All"); setQuery(""); setOnlyAvailable(false); }}
            className="mt-6 rounded-full bg-gold px-6 py-3 text-sm font-bold text-ink transition-colors hover:bg-gold-2"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}

export default function FleetPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-5 pb-24 pt-32 text-muted lg:px-8">Loading fleet…</div>}>
      <FleetBrowser />
    </Suspense>
  );
}
