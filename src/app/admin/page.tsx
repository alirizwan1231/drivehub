import { CARS, formatAED } from "@/data/cars";
import { BOOKINGS, UPCOMING_RETURNS, WEEKLY_REVENUE, type BookingStatus } from "@/data/bookings";
import CarArt from "@/components/CarArt";
import {
  IconBanknote,
  IconCalendar,
  IconCheck,
  IconClock,
  IconKey,
  IconTrending,
  IconWrench,
} from "@/components/icons";

const BOOKING_STYLE: Record<BookingStatus, string> = {
  active: "bg-sky/15 text-sky",
  upcoming: "bg-gold/15 text-gold",
  completed: "bg-mint/15 text-mint",
  cancelled: "bg-rose/15 text-rose",
};

const CAR_STATUS: Record<string, { label: string; cls: string; dot: string }> = {
  available: { label: "Available", cls: "text-mint", dot: "bg-mint" },
  rented: { label: "On rent", cls: "text-rose", dot: "bg-rose" },
  maintenance: { label: "In service", cls: "text-gold", dot: "bg-gold" },
};

export default function AdminPage() {
  const available = CARS.filter((c) => c.status === "available").length;
  const rented = CARS.filter((c) => c.status === "rented").length;
  const maintenance = CARS.filter((c) => c.status === "maintenance").length;
  const utilisation = Math.round((rented / CARS.length) * 100 + 57); // demo blend incl. advance bookings
  const maxRev = Math.max(...WEEKLY_REVENUE.map((d) => d.value));

  const stats = [
    { icon: IconBanknote, label: "Revenue — November", value: "AED 148,250", sub: "+18.2% vs October", accent: "text-gold bg-gold/12" },
    { icon: IconKey, label: "Active rentals", value: String(BOOKINGS.filter((b) => b.status === "active").length + 7), sub: `${UPCOMING_RETURNS.length} returns due this week`, accent: "text-sky bg-sky/12" },
    { icon: IconTrending, label: "Fleet utilisation", value: `${utilisation}%`, sub: `${rented} out now · ${available} ready`, accent: "text-mint bg-mint/12" },
    { icon: IconCalendar, label: "Bookings this month", value: "132", sub: "9 pending document checks", accent: "text-rose bg-rose/12" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-28 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="flex items-center gap-2 text-xs font-bold tracking-[0.28em] text-gold">
            <span className="h-px w-10 bg-gold" /> OPERATIONS
          </p>
          <h1 className="mt-4 font-display text-5xl font-black tracking-tight">
            Fleet <span className="gold-grad">dashboard</span>
          </h1>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted">
            Tuesday 18 November 2026 — Marina Plaza branch. Demo data; this panel wires to Supabase when the backend is enabled.
          </p>
        </div>
        <div className="flex gap-2.5">
          <span className="flex items-center gap-2 rounded-full border border-line bg-carbon px-4 py-2 text-sm font-semibold text-sand">
            <span className="h-2 w-2 rounded-full bg-mint" /> {available} available
          </span>
          <span className="flex items-center gap-2 rounded-full border border-line bg-carbon px-4 py-2 text-sm font-semibold text-sand">
            <span className="h-2 w-2 rounded-full bg-rose" /> {rented} on rent
          </span>
          <span className="flex items-center gap-2 rounded-full border border-line bg-carbon px-4 py-2 text-sm font-semibold text-sand">
            <IconWrench className="h-3.5 w-3.5 text-gold" /> {maintenance} in service
          </span>
        </div>
      </div>

      {/* stat cards */}
      <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="card-lift rounded-3xl border border-line bg-carbon p-6">
            <span className={`grid h-11 w-11 place-items-center rounded-xl ${s.accent}`}>
              <s.icon className="h-6 w-6" />
            </span>
            <p className="mt-5 font-display text-[28px] font-extrabold leading-none text-cream">{s.value}</p>
            <p className="mt-2 text-sm font-medium text-sand">{s.label}</p>
            <p className="mt-1 text-xs text-muted">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid items-start gap-6 xl:grid-cols-[1.65fr_1fr]">
        {/* bookings table */}
        <div className="overflow-hidden rounded-3xl border border-line bg-carbon">
          <div className="flex items-center justify-between border-b border-line px-6 py-5">
            <h2 className="font-display text-lg font-extrabold">Recent bookings</h2>
            <span className="rounded-full bg-carbon-2 px-3 py-1 text-xs font-bold text-muted">{BOOKINGS.length} shown</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-line text-[11px] tracking-[0.14em] text-muted">
                  <th className="px-6 py-3.5 font-bold">CUSTOMER</th>
                  <th className="px-4 py-3.5 font-bold">CAR</th>
                  <th className="px-4 py-3.5 font-bold">PICKUP → RETURN</th>
                  <th className="px-4 py-3.5 font-bold">TOTAL</th>
                  <th className="px-6 py-3.5 font-bold">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {BOOKINGS.map((b) => (
                  <tr key={b.ref} className="border-b border-line/60 transition-colors last:border-0 hover:bg-carbon-2/60">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-cream">{b.customer}</p>
                      <p className="mt-0.5 text-xs text-muted">{b.ref} · {b.phone}</p>
                    </td>
                    <td className="px-4 py-4 text-sand">{b.carName}</td>
                    <td className="px-4 py-4 text-sand">
                      {b.pickup} <span className="text-muted">→</span> {b.returnDate}
                      <p className="mt-0.5 text-xs text-muted">{b.location}</p>
                    </td>
                    <td className="px-4 py-4 font-display font-bold text-cream">{formatAED(b.total)}</td>
                    <td className="px-6 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${BOOKING_STYLE[b.status]}`}>{b.status}</span>
                      <p className="mt-1 text-[11px] text-muted">{b.payment}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* right column */}
        <div className="space-y-6">
          {/* revenue chart */}
          <div className="rounded-3xl border border-line bg-carbon p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-extrabold">Revenue — last 7 days</h2>
              <span className="flex items-center gap-1 text-xs font-bold text-mint"><IconTrending className="h-3.5 w-3.5" /> +12.4%</span>
            </div>
            <div className="mt-6 flex h-36 items-end gap-3">
              {WEEKLY_REVENUE.map((d, i) => (
                <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
                  <span className="text-[10px] font-semibold text-muted">{(d.value / 1000).toFixed(1)}k</span>
                  <div
                    className="bar-grow w-full rounded-t-lg bg-gradient-to-t from-gold-deep/70 to-gold"
                    style={{ height: `${(d.value / maxRev) * 100}%`, "--bar-delay": `${i * 90}ms` } as React.CSSProperties}
                  />
                  <span className="text-[11px] font-bold text-muted">{d.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* upcoming returns */}
          <div className="rounded-3xl border border-line bg-carbon p-6">
            <h2 className="flex items-center gap-2 font-display text-lg font-extrabold">
              <IconClock className="h-5 w-5 text-gold" /> Upcoming returns
            </h2>
            <ul className="mt-5 space-y-4">
              {UPCOMING_RETURNS.map((r) => (
                <li key={r.ref} className="flex items-start justify-between gap-3 border-b border-line/60 pb-4 last:border-0 last:pb-0">
                  <div>
                    <p className="text-sm font-semibold text-cream">{r.carName}</p>
                    <p className="mt-0.5 text-xs text-muted">{r.customer} · {r.location}</p>
                  </div>
                  <span className="rounded-full bg-carbon-2 px-3 py-1 text-xs font-bold text-gold">{r.when}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* fleet status */}
      <div className="mt-6 rounded-3xl border border-line bg-carbon p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-extrabold">Fleet status</h2>
          <span className="flex items-center gap-1.5 text-xs font-semibold text-muted">
            <IconCheck className="h-3.5 w-3.5 text-mint" /> Synced just now (demo)
          </span>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {CARS.map((car) => {
            const st = CAR_STATUS[car.status];
            return (
              <div key={car.id} className="flex items-center gap-4 rounded-2xl border border-line bg-coal p-3.5">
                <div className="w-28 shrink-0 overflow-hidden rounded-xl">
                  <CarArt body={car.body} gradient={car.gradient} accent={car.accent} uid={`adm-${car.id}`} className="block h-auto w-full" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-cream">{car.name}</p>
                  <p className="mt-0.5 font-mono text-[11px] tracking-wider text-muted">{car.plate}</p>
                  <p className={`mt-1.5 flex items-center gap-1.5 text-xs font-bold ${st.cls}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${st.dot}`} /> {st.label}
                  </p>
                </div>
                <p className="ml-auto text-right font-display text-sm font-extrabold text-cream">
                  {formatAED(car.pricePerDay)}
                  <span className="block text-[11px] font-medium text-muted">per day</span>
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
