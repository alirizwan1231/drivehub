"use client";

import { useMemo, useState } from "react";
import { formatAED, LOCATIONS, type Car } from "@/data/cars";
import {
  IconArrowLeft,
  IconArrowRight,
  IconCalendar,
  IconCheck,
  IconChevronDown,
  IconFileCheck,
  IconMapPin,
  IconShield,
  IconUpload,
} from "./icons";

const SERVICE_FEE = 49;
const VAT_RATE = 0.05;

const key = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth()).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const fmtDay = (d: Date) => d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

function seedFrom(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) % 997;
  return h;
}

function MonthCalendar({
  year,
  month,
  seed,
  start,
  end,
  onPick,
}: {
  year: number;
  month: number;
  seed: number;
  start: string | null;
  end: string | null;
  onPick: (d: Date) => void;
}) {
  const first = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startOffset = (first.getDay() + 6) % 7; // Monday first
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const cells: (Date | null)[] = [
    ...Array.from({ length: startOffset }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1)),
  ];

  const isUnavailable = (d: Date) => (d.getDate() * 7 + seed) % 5 === 0 || (d.getDate() + seed) % 11 === 0;

  return (
    <div className="rounded-2xl border border-line bg-carbon p-4">
      <p className="mb-3 text-center font-display text-sm font-bold tracking-wide text-cream">
        {first.toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
      </p>
      <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold tracking-wider text-muted">
        {["MO", "TU", "WE", "TH", "FR", "SA", "SU"].map((d) => (
          <span key={d} className="py-1">{d}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((d, i) => {
          if (!d) return <span key={`e-${i}`} />;
          const k = key(d);
          const past = d < today;
          const unavail = isUnavailable(d);
          const disabled = past || unavail;
          const isStart = start === k;
          const isEnd = end === k;
          const inRange = start && end && k > start && k < end;
          return (
            <button
              key={k}
              disabled={disabled}
              onClick={() => onPick(d)}
              className={`aspect-square rounded-lg text-[13px] font-medium transition-all ${
                isStart || isEnd
                  ? "bg-gold font-bold text-ink shadow-[0_4px_16px_rgba(245,179,1,0.45)]"
                  : inRange
                    ? "bg-gold/20 text-gold-2"
                    : disabled
                      ? "cursor-not-allowed text-muted/35 line-through decoration-rose/50"
                      : "text-sand hover:bg-carbon-2 hover:text-gold"
              }`}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function BookingWidget({ car }: { car: Car }) {
  const seed = useMemo(() => seedFrom(car.id), [car.id]);
  const [step, setStep] = useState(1);
  const [start, setStart] = useState<string | null>(null);
  const [end, setEnd] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [location, setLocation] = useState(LOCATIONS[0]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [licence, setLicence] = useState<string | null>(null);
  const [idDoc, setIdDoc] = useState<string | null>(null);
  const [presentAtPickup, setPresentAtPickup] = useState(false);
  const [reference, setReference] = useState("");

  const now = new Date();
  const m1 = { y: now.getFullYear(), m: now.getMonth() };
  const m2raw = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const m2 = { y: m2raw.getFullYear(), m: m2raw.getMonth() };

  const days = startDate && endDate ? Math.round((endDate.getTime() - startDate.getTime()) / 86400000) + 1 : 0;
  const subtotal = days * car.pricePerDay;
  const vat = Math.round(subtotal * VAT_RATE);
  const total = subtotal + vat + (days > 0 ? SERVICE_FEE : 0);

  const pick = (d: Date) => {
    const k = key(d);
    if (!start || (start && end)) {
      setStart(k); setStartDate(d); setEnd(null); setEndDate(null);
    } else if (k > start) {
      setEnd(k); setEndDate(d);
    } else {
      setStart(k); setStartDate(d);
    }
  };

  const canContinueDetails = name.trim().length >= 2 && phone.trim().length >= 6;

  /* ---------- SUCCESS ---------- */
  if (step === 3) {
    return (
      <div className="rounded-3xl border border-mint/30 bg-carbon p-7">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-mint/15 text-mint">
          <IconCheck className="h-7 w-7" />
        </span>
        <h3 className="mt-5 font-display text-2xl font-extrabold">Booking confirmed</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Reference <span className="font-bold text-gold">{reference}</span>. Our team will call
          <span className="text-sand"> {phone || "you"}</span> within 30 minutes to confirm delivery.
          A summary was sent to {email || "your email"}.
        </p>
        <dl className="mt-6 space-y-2.5 rounded-2xl border border-line bg-coal p-5 text-sm">
          <div className="flex justify-between"><dt className="text-muted">Car</dt><dd className="font-semibold text-cream">{car.name}</dd></div>
          <div className="flex justify-between"><dt className="text-muted">Pickup</dt><dd className="font-semibold text-cream">{startDate ? fmtDay(startDate) : "—"}</dd></div>
          <div className="flex justify-between"><dt className="text-muted">Return</dt><dd className="font-semibold text-cream">{endDate ? fmtDay(endDate) : "—"}</dd></div>
          <div className="flex justify-between"><dt className="text-muted">Location</dt><dd className="font-semibold text-cream">{location}</dd></div>
          <div className="flex justify-between border-t border-line pt-2.5"><dt className="text-muted">Total ({days} days)</dt><dd className="font-display font-extrabold text-gold">{formatAED(total)}</dd></div>
          <div className="flex justify-between"><dt className="text-muted">Refundable deposit</dt><dd className="font-semibold text-cream">{formatAED(car.deposit)}</dd></div>
        </dl>
        <button
          onClick={() => { setStep(1); setStart(null); setEnd(null); setStartDate(null); setEndDate(null); }}
          className="mt-6 w-full rounded-xl border border-line py-3 text-sm font-bold text-sand transition-colors hover:border-gold/50 hover:text-gold"
        >
          Make another booking
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-line bg-carbon p-6 sm:p-7">
      {/* price header */}
      <div className="flex items-end justify-between">
        <p>
          <span className="font-display text-[34px] font-black leading-none text-cream">{formatAED(car.pricePerDay)}</span>
          <span className="text-muted"> /day</span>
        </p>
        <span className="rounded-full bg-gold/12 px-3 py-1.5 text-xs font-bold text-gold">Free cancellation</span>
      </div>

      {/* stepper */}
      <div className="mt-6 flex items-center gap-2">
        {["Dates", "Details & documents", "Done"].map((label, i) => {
          const n = i + 1;
          const active = step === n;
          const done = step > n;
          return (
            <div key={label} className="flex flex-1 items-center gap-2">
              <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold ${
                done ? "bg-mint text-ink" : active ? "bg-gold text-ink" : "bg-carbon-2 text-muted"
              }`}>
                {done ? <IconCheck className="h-3.5 w-3.5" /> : n}
              </span>
              <span className={`hidden text-xs font-semibold xl:block ${active ? "text-cream" : "text-muted"}`}>{label}</span>
              {n < 3 && <span className={`h-px flex-1 ${done ? "bg-mint/60" : "bg-line"}`} />}
            </div>
          );
        })}
      </div>

      {step === 1 && (
        <div className="mt-6">
          <p className="flex items-center gap-2 text-sm font-semibold text-sand">
            <IconCalendar className="h-4 w-4 text-gold" /> Select pickup and return dates
          </p>
          <p className="mt-1.5 text-xs text-muted">Struck-through days are already booked for this car (demo availability).</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <MonthCalendar year={m1.y} month={m1.m} seed={seed} start={start} end={end} onPick={pick} />
            <MonthCalendar year={m2.y} month={m2.m} seed={seed} start={start} end={end} onPick={pick} />
          </div>

          <div>
            <label className="mb-2 mt-5 flex items-center gap-1.5 text-[11px] font-bold tracking-[0.16em] text-muted">
              <IconMapPin className="h-3.5 w-3.5 text-gold" /> PICKUP / DELIVERY LOCATION
            </label>
            <div className="relative">
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full appearance-none rounded-xl border border-line bg-carbon-2 px-3.5 py-3 text-sm font-medium text-cream outline-none focus:border-gold/60"
              >
                {LOCATIONS.map((l) => (
                  <option key={l} value={l} className="bg-carbon">{l}</option>
                ))}
              </select>
              <IconChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            </div>
          </div>

          {days > 0 ? (
            <dl className="mt-6 space-y-2 rounded-2xl border border-line bg-coal p-5 text-sm">
              <div className="flex justify-between"><dt className="text-muted">{formatAED(car.pricePerDay)} × {days} day{days > 1 ? "s" : ""}</dt><dd className="font-semibold">{formatAED(subtotal)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted">VAT (5%)</dt><dd className="font-semibold">{formatAED(vat)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted">Service fee</dt><dd className="font-semibold">{formatAED(SERVICE_FEE)}</dd></div>
              <div className="flex justify-between border-t border-line pt-2.5"><dt className="font-semibold text-cream">Total</dt><dd className="font-display text-lg font-extrabold text-gold">{formatAED(total)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted">Refundable deposit (at pickup)</dt><dd className="font-semibold">{formatAED(car.deposit)}</dd></div>
            </dl>
          ) : (
            <p className="mt-6 rounded-2xl border border-dashed border-line bg-coal p-4 text-center text-sm text-muted">
              Pick a pickup day, then a return day to see the full price breakdown.
            </p>
          )}

          <button
            disabled={days === 0}
            onClick={() => setStep(2)}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gold py-3.5 font-bold text-ink transition-all enabled:hover:bg-gold-2 enabled:hover:shadow-[0_10px_35px_rgba(245,179,1,0.35)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Continue <IconArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="mt-6">
          <div className="grid gap-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              className="w-full rounded-xl border border-line bg-carbon-2 px-3.5 py-3 text-sm text-cream outline-none placeholder:text-muted focus:border-gold/60"
            />
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone / WhatsApp (+971 ...)"
              className="w-full rounded-xl border border-line bg-carbon-2 px-3.5 py-3 text-sm text-cream outline-none placeholder:text-muted focus:border-gold/60"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              type="email"
              className="w-full rounded-xl border border-line bg-carbon-2 px-3.5 py-3 text-sm text-cream outline-none placeholder:text-muted focus:border-gold/60"
            />
          </div>

          <p className="mt-6 flex items-center gap-2 text-sm font-semibold text-sand">
            <IconFileCheck className="h-4 w-4 text-gold" /> Documents
          </p>
          <p className="mt-1.5 text-xs leading-relaxed text-muted">
            Tourists: passport + home-country licence. UAE residents: Emirates ID + UAE licence.
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              { label: "Driving licence", file: licence, set: setLicence },
              { label: "Passport / Emirates ID", file: idDoc, set: setIdDoc },
            ].map((doc) => (
              <label
                key={doc.label}
                className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed px-4 py-6 text-center transition-colors ${
                  doc.file ? "border-mint/50 bg-mint/5" : "border-line bg-coal hover:border-gold/50"
                }`}
              >
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => doc.set(e.target.files?.[0]?.name ?? null)}
                />
                {doc.file ? (
                  <>
                    <IconFileCheck className="h-7 w-7 text-mint" />
                    <span className="mt-2.5 w-full truncate text-xs font-semibold text-cream">{doc.file}</span>
                    <span className="mt-1 text-[11px] font-bold text-mint">Uploaded — tap to replace</span>
                  </>
                ) : (
                  <>
                    <IconUpload className="h-7 w-7 text-gold" />
                    <span className="mt-2.5 text-xs font-semibold text-cream">{doc.label}</span>
                    <span className="mt-1 text-[11px] text-muted">Tap to upload (demo)</span>
                  </>
                )}
              </label>
            ))}
          </div>

          <label className="mt-4 flex cursor-pointer items-center gap-2.5 text-sm text-sand">
            <input
              type="checkbox"
              checked={presentAtPickup}
              onChange={(e) => setPresentAtPickup(e.target.checked)}
              className="h-4 w-4 accent-[#f5b301]"
            />
            I will present my documents at pickup instead
          </label>

          <div className="mt-6 flex gap-3">
            <button
              onClick={() => setStep(1)}
              className="flex items-center gap-1.5 rounded-xl border border-line px-5 py-3.5 text-sm font-bold text-sand transition-colors hover:border-gold/50 hover:text-gold"
            >
              <IconArrowLeft className="h-4 w-4" /> Back
            </button>
            <button
              disabled={!canContinueDetails}
              onClick={() => {
                setReference(`DH-${1000 + (seedFrom(car.id + name + phone) % 9000)}`);
                setStep(3);
              }}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gold py-3.5 font-bold text-ink transition-all enabled:hover:bg-gold-2 enabled:hover:shadow-[0_10px_35px_rgba(245,179,1,0.35)] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Confirm booking — {formatAED(total)}
            </button>
          </div>
          <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted">
            <IconShield className="h-3.5 w-3.5 text-mint" /> No payment taken now — pay at delivery. Demo checkout.
          </p>
        </div>
      )}
    </div>
  );
}
