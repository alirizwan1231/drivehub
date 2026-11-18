import { CARS, formatAED } from "@/data/cars";
import { BOOKINGS, UPCOMING_RETURNS, WEEKLY_REVENUE, type BookingStatus } from "@/data/bookings";
import CarArt from "@/components/CarArt";
import StudioConsole from "@/components/StudioConsole";
import { IconCheck, IconClock, IconTrending, IconWrench } from "@/components/icons";

const BOOKING_STYLE: Record<BookingStatus, string> = {
  active: "bg-pale/12 text-pale",
  upcoming: "bg-studio-2 text-pale",
  completed: "bg-mint/15 text-mint",
  cancelled: "bg-[#fb5e7e]/15 text-[#fb5e7e]",
};

const CAR_STATUS: Record<string, { label: string; cls: string; dot: string }> = {
  available: { label: "Available", cls: "text-mint", dot: "bg-mint" },
  rented: { label: "On rent", cls: "text-[#fb5e7e]", dot: "bg-[#fb5e7e]" },
  maintenance: { label: "In service", cls: "text-pale", dot: "bg-pale" },
};

export default function AdminPage() {
  const available = CARS.filter((c) => c.status === "available").length;
  const rented = CARS.filter((c) => c.status === "rented").length;
  const maintenance = CARS.filter((c) => c.status === "maintenance").length;
  const utilisation = Math.round((rented / CARS.length) * 100 + 57); // demo blend incl. advance bookings
  const activeRentals = BOOKINGS.filter((b) => b.status === "active").length + 7;
  const spotlight = CARS.find((c) => c.id === "mercedes-g63-amg") ?? CARS[0];
  const maxRev = Math.max(...WEEKLY_REVENUE.map((d) => d.value));

  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-28 lg:px-8">
      {/* ---------- header ---------- */}
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="flex items-center gap-2.5 text-xs font-bold tracking-[0.28em] text-fog">
            <span className="live-dot h-2 w-2 rounded-full bg-pale" /> CARWHISPERER STUDIO — FLEET CONSOLE
          </p>
          <h1 className="mt-4 font-display text-5xl font-black tracking-tight text-pale">
            Fleet command <span className="font-light text-fog">console</span>
          </h1>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-fog">
            Tuesday 18 November 2026 — Marina Plaza branch. Inspect any car in the studio,
            track returns and watch the whole fleet below. Demo data; this console wires to
            Supabase when the backend is enabled.
          </p>
        </div>
        <div className="flex gap-2.5">
          <span className="flex items-center gap-2 rounded-full border border-white/9 bg-studio px-4 py-2 text-sm font-semibold text-pale">
            <span className="h-2 w-2 rounded-full bg-mint" /> {available} available
          </span>
          <span className="flex items-center gap-2 rounded-full border border-white/9 bg-studio px-4 py-2 text-sm font-semibold text-pale">
            <span className="h-2 w-2 rounded-full bg-[#fb5e7e]" /> {rented} on rent
          </span>
          <span className="flex items-center gap-2 rounded-full border border-white/9 bg-studio px-4 py-2 text-sm font-semibold text-pale">
            <IconWrench className="h-3.5 w-3.5 text-fog" /> {maintenance} in service
          </span>
        </div>
      </div>

      {/* ---------- CarWhisperer studio console ---------- */}
      <div className="mt-10">
        <StudioConsole
          car={spotlight}
          stats={{ utilisation, activeRentals, fleetSize: CARS.length, rented, available }}
        />
      </div>

      {/* ---------- bookings + side column ---------- */}
      <div className="mt-6 grid items-start gap-6 xl:grid-cols-[1.65fr_1fr]">
        <div className="studio-panel overflow-hidden rounded-[28px]">
          <div className="flex items-center justify-between border-b border-white/8 px-6 py-5">
            <h2 className="font-display text-lg font-extrabold text-pale">Recent bookings</h2>
            <span className="rounded-full bg-white/6 px-3 py-1 text-xs font-bold text-fog">{BOOKINGS.length} shown</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/8 text-[11px] tracking-[0.14em] text-fog">
                  <th className="px-6 py-3.5 font-bold">CUSTOMER</th>
                  <th className="px-4 py-3.5 font-bold">CAR</th>
                  <th className="px-4 py-3.5 font-bold">PICKUP → RETURN</th>
                  <th className="px-4 py-3.5 font-bold">TOTAL</th>
                  <th className="px-6 py-3.5 font-bold">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {BOOKINGS.map((b) => (
                  <tr key={b.ref} className="border-b border-white/5 transition-colors last:border-0 hover:bg-white/[0.04]">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-pale">{b.customer}</p>
                      <p className="mt-0.5 text-xs text-fog">{b.ref} · {b.phone}</p>
                    </td>
                    <td className="px-4 py-4 text-pale/80">{b.carName}</td>
                    <td className="px-4 py-4 text-pale/80">
                      {b.pickup} <span className="text-fog">→</span> {b.returnDate}
                      <p className="mt-0.5 text-xs text-fog">{b.location}</p>
                    </td>
                    <td className="px-4 py-4 font-display font-bold text-pale">{formatAED(b.total)}</td>
                    <td className="px-6 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${BOOKING_STYLE[b.status]}`}>{b.status}</span>
                      <p className="mt-1 text-[11px] text-fog">{b.payment}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="studio-panel rounded-[28px] p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-extrabold text-pale">Revenue — last 7 days</h2>
              <span className="flex items-center gap-1 text-xs font-bold text-mint"><IconTrending className="h-3.5 w-3.5" /> +12.4%</span>
            </div>
            <div className="mt-6 flex h-36 items-end gap-3">
              {WEEKLY_REVENUE.map((d, i) => (
                <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
                  <span className="text-[10px] font-semibold text-fog">{(d.value / 1000).toFixed(1)}k</span>
                  <div
                    className="bar-grow w-full rounded-t-lg bg-gradient-to-t from-studio-2 to-pale/80"
                    style={{ height: `${(d.value / maxRev) * 100}%`, "--bar-delay": `${i * 90}ms` } as React.CSSProperties}
                  />
                  <span className="text-[11px] font-bold text-fog">{d.day}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="studio-panel rounded-[28px] p-6">
            <h2 className="flex items-center gap-2 font-display text-lg font-extrabold text-pale">
              <IconClock className="h-5 w-5 text-fog" /> Upcoming returns
            </h2>
            <ul className="mt-5 space-y-4">
              {UPCOMING_RETURNS.map((r) => (
                <li key={r.ref} className="flex items-start justify-between gap-3 border-b border-white/6 pb-4 last:border-0 last:pb-0">
                  <div>
                    <p className="text-sm font-semibold text-pale">{r.carName}</p>
                    <p className="mt-0.5 text-xs text-fog">{r.customer} · {r.location}</p>
                  </div>
                  <span className="rounded-full bg-white/6 px-3 py-1 text-xs font-bold text-pale">{r.when}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ---------- fleet status ---------- */}
      <div className="studio-panel mt-6 rounded-[28px] p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-extrabold text-pale">Fleet status</h2>
          <span className="flex items-center gap-1.5 text-xs font-semibold text-fog">
            <IconCheck className="h-3.5 w-3.5 text-mint" /> Telemetry synced just now (demo)
          </span>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {CARS.map((car) => {
            const st = CAR_STATUS[car.status];
            return (
              <div key={car.id} className="flex items-center gap-4 rounded-2xl border border-white/7 bg-abyss/50 p-3.5">
                <div className="w-28 shrink-0 overflow-hidden rounded-xl">
                  <CarArt body={car.body} gradient={car.gradient} accent={car.accent} uid={`adm-${car.id}`} className="block h-auto w-full" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-pale">{car.name}</p>
                  <p className="mt-0.5 font-mono text-[11px] tracking-wider text-fog">{car.plate}</p>
                  <p className={`mt-1.5 flex items-center gap-1.5 text-xs font-bold ${st.cls}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${st.dot}`} /> {st.label}
                  </p>
                </div>
                <p className="ml-auto text-right font-display text-sm font-extrabold text-pale">
                  {formatAED(car.pricePerDay)}
                  <span className="block text-[11px] font-medium text-fog">per day</span>
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
