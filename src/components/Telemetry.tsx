import type { CSSProperties } from "react";

/* ------------------------------------------------------------------ */
/*  GaugeDial — automotive dial with animated needle sweep + arc fill  */
/*  Sweep range: -120deg (min) to +120deg (max), 12 o'clock = 0.       */
/* ------------------------------------------------------------------ */

const CX = 100;
const CY = 100;
const R = 78;

function polar(r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: CX + r * Math.sin(rad), y: CY - r * Math.cos(rad) };
}

function arcPath(r: number, startDeg: number, endDeg: number) {
  const s = polar(r, startDeg);
  const e = polar(r, endDeg);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${s.x.toFixed(2)} ${s.y.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${e.x.toFixed(2)} ${e.y.toFixed(2)}`;
}

export function GaugeDial({
  pct,
  display,
  label,
  sub,
  accent = "#f5b301",
  delay = 150,
  className = "",
}: {
  pct: number; // 0..100
  display: string;
  label: string;
  sub?: string;
  accent?: string;
  delay?: number;
  className?: string;
}) {
  const clamped = Math.max(0, Math.min(100, pct));
  const angle = -120 + (clamped / 100) * 240;
  const ticks = Array.from({ length: 17 }, (_, i) => -120 + i * 15);

  return (
    <div className={className}>
      <div className="relative">
        <svg viewBox="0 0 200 168" className="block w-full">
          {/* track */}
          <path d={arcPath(R, -120, 120)} fill="none" stroke="#23252f" strokeWidth="10" strokeLinecap="round" />
          {/* progress arc */}
          <path
            d={arcPath(R, -120, 120)}
            fill="none"
            stroke={accent}
            strokeWidth="10"
            strokeLinecap="round"
            pathLength={100}
            className="gauge-arc"
            style={{ "--arc-to": 100 - clamped, "--gauge-delay": `${delay}ms`, filter: `drop-shadow(0 0 7px ${accent}66)` } as CSSProperties}
          />
          {/* ticks */}
          {ticks.map((t) => {
            const major = (t + 120) % 60 === 0;
            const a = polar(major ? 60 : 64, t);
            const b = polar(70, t);
            return (
              <line
                key={t}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke={major ? "#5b5f6e" : "#343744"}
                strokeWidth={major ? 2.4 : 1.4}
                strokeLinecap="round"
              />
            );
          })}
          {/* needle */}
          <g className="gauge-needle" style={{ "--needle-to": `${angle}deg`, "--gauge-delay": `${delay}ms` } as CSSProperties}>
            <polygon points="100,42 96.4,100 103.6,100" fill={accent} style={{ filter: `drop-shadow(0 0 5px ${accent}88)` }} />
            <polygon points="100,42 100,100 103.6,100" fill="#ffffff" opacity="0.28" />
          </g>
          <circle cx={CX} cy={CY} r="10" fill="#14161d" stroke="#3a3e4d" strokeWidth="2" />
          <circle cx={CX} cy={CY} r="3.5" fill={accent} />
          {/* min / max captions */}
          <text x="26" y="160" fontSize="9" fontWeight="700" fill="#5b5f6e" textAnchor="middle" fontFamily="var(--font-inter), sans-serif">
            0
          </text>
          <text x="174" y="160" fontSize="9" fontWeight="700" fill="#5b5f6e" textAnchor="middle" fontFamily="var(--font-inter), sans-serif">
            MAX
          </text>
        </svg>
        <div className="pointer-events-none absolute inset-x-0 top-[58%] text-center">
          <p className="font-display text-[26px] font-black leading-none text-cream">{display}</p>
        </div>
      </div>
      <p className="mt-1 text-center text-[11px] font-bold tracking-[0.18em] text-sand">{label}</p>
      {sub ? <p className="mt-0.5 text-center text-[11px] text-muted">{sub}</p> : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  TopViewCar — top-down vehicle with pulsing telemetry hotspots      */
/* ------------------------------------------------------------------ */

const HOTSPOTS: { x: number; y: number; label: string; anchor: "start" | "end"; delay: number }[] = [
  { x: 150, y: 58, label: "ENGINE", anchor: "start", delay: 0 },
  { x: 58, y: 118, label: "TYRE FL", anchor: "end", delay: 450 },
  { x: 150, y: 208, label: "GPS LIVE", anchor: "start", delay: 900 },
  { x: 242, y: 348, label: "TYRE RR", anchor: "start", delay: 1350 },
  { x: 150, y: 404, label: "BATTERY", anchor: "start", delay: 1800 },
];

export function TopViewCar({ accent = "#f5b301", className = "" }: { accent?: string; className?: string }) {
  return (
    <svg viewBox="0 0 300 460" className={className} role="img" aria-label="Top view of a car with telemetry hotspots">
      <defs>
        <linearGradient id="tv-body" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#262a35" />
          <stop offset="50%" stopColor="#171a21" />
          <stop offset="100%" stopColor="#232833" />
        </linearGradient>
        <linearGradient id="tv-scan" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#22e6d2" stopOpacity="0" />
          <stop offset="50%" stopColor="#22e6d2" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#22e6d2" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* wheels */}
      {[
        { x: 50, y: 88 },
        { x: 232, y: 88 },
        { x: 50, y: 318 },
        { x: 232, y: 318 },
      ].map((w, i) => (
        <rect key={i} x={w.x} y={w.y} width="18" height="66" rx="8" fill="#07080b" stroke="#2c2f3a" strokeWidth="1.5" />
      ))}

      {/* body */}
      <rect x="68" y="14" width="164" height="432" rx="74" fill="url(#tv-body)" stroke="#454a59" strokeWidth="1.5" />
      {/* bonnet + boot shading */}
      <path d="M84 118 C110 84 190 84 216 118 C190 104 110 104 84 118 Z" fill="#0d1017" opacity="0.85" />
      <path d="M84 348 C110 380 190 380 216 348 C190 362 110 362 84 348 Z" fill="#0d1017" opacity="0.85" />
      {/* windshield + cabin glass */}
      <path d="M88 150 C112 128 188 128 212 150 L206 168 C182 152 118 152 94 168 Z" fill="#0d1622" stroke={accent} strokeWidth="1.2" opacity="0.95" />
      <rect x="90" y="176" width="120" height="104" rx="26" fill="#10141d" stroke="#2c3140" strokeWidth="1.2" />
      <path d="M94 306 L206 306 L198 330 C176 318 124 318 102 330 Z" fill="#0d1622" stroke={accent} strokeWidth="1.2" opacity="0.8" />
      {/* centre spine accent */}
      <line x1="150" y1="30" x2="150" y2="430" stroke={accent} strokeWidth="1.4" opacity="0.35" strokeDasharray="3 7" />
      {/* mirrors */}
      <rect x="56" y="158" width="14" height="26" rx="6" fill="#1d202a" stroke="#3a3e4d" />
      <rect x="230" y="158" width="14" height="26" rx="6" fill="#1d202a" stroke="#3a3e4d" />
      {/* headlights / taillights */}
      <rect x="88" y="20" width="34" height="8" rx="4" fill={accent} opacity="0.9" />
      <rect x="178" y="20" width="34" height="8" rx="4" fill={accent} opacity="0.9" />
      <rect x="90" y="432" width="32" height="7" rx="3.5" fill="#fb5e7e" opacity="0.85" />
      <rect x="178" y="432" width="32" height="7" rx="3.5" fill="#fb5e7e" opacity="0.85" />

      {/* scanning light band */}
      <rect className="car-scan" x="72" y="0" width="156" height="26" fill="url(#tv-scan)" opacity="0" />

      {/* hotspots */}
      {HOTSPOTS.map((h) => (
        <g key={h.label}>
          <circle cx={h.x} cy={h.y} r="6" fill="none" stroke="#22e6d2" strokeWidth="1.6" className="hotspot-ring" style={{ "--hs-delay": `${h.delay}ms` } as CSSProperties} />
          <circle cx={h.x} cy={h.y} r="5" fill="#22e6d2" stroke="#0b2b28" strokeWidth="1.5" />
          <text
            x={h.anchor === "end" ? h.x - 12 : h.x + 12}
            y={h.y + 3}
            fontSize="9.5"
            fontWeight="700"
            letterSpacing="1.5"
            fill="#9ba0aa"
            textAnchor={h.anchor}
            fontFamily="var(--font-inter), sans-serif"
          >
            {h.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  RouteMap — stylised Dubai route with animated dashes + pulse dot   */
/* ------------------------------------------------------------------ */

export const ROUTE_PATH = "M 52 262 C 120 236 150 262 205 208 C 252 162 300 150 372 84";

export function RouteMap({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 420 320" className={className} role="img" aria-label="Stylised live route map from Dubai Marina to DXB airport">
      <defs>
        <linearGradient id="rm-sea" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#53b6ff" stopOpacity="0.13" />
          <stop offset="100%" stopColor="#53b6ff" stopOpacity="0.03" />
        </linearGradient>
      </defs>

      {/* sea */}
      <path d="M0 0 L118 0 C96 70 128 120 96 176 C70 222 92 272 70 320 L0 320 Z" fill="url(#rm-sea)" />
      <path d="M118 0 C96 70 128 120 96 176 C70 222 92 272 70 320" fill="none" stroke="#53b6ff" strokeWidth="1.4" opacity="0.35" />

      {/* road grid */}
      {[
        "M150 0 L170 320",
        "M250 0 L238 320",
        "M330 0 L348 320",
        "M96 70 L420 52",
        "M84 150 L420 138",
        "M78 236 L420 226",
        "M120 320 C170 250 210 260 268 300",
      ].map((d, i) => (
        <path key={i} d={d} fill="none" stroke="#23252f" strokeWidth={i % 3 === 0 ? 9 : 5} strokeLinecap="round" opacity="0.8" />
      ))}
      {/* Sheikh Zayed Road highlight */}
      <path d="M104 286 C190 240 250 210 420 168" fill="none" stroke="#f5b301" strokeWidth="2" opacity="0.22" strokeDasharray="2 8" />

      {/* route underlay + animated flow */}
      <path d={ROUTE_PATH} fill="none" stroke="#22e6d2" strokeWidth="7" opacity="0.12" strokeLinecap="round" />
      <path d={ROUTE_PATH} fill="none" stroke="#22e6d2" strokeWidth="2.6" strokeLinecap="round" className="route-flow" />

      {/* travelling pulse dot */}
      <circle r="9" fill="#22e6d2" opacity="0.18">
        <animateMotion dur="7s" repeatCount="indefinite" path={ROUTE_PATH} />
      </circle>
      <circle r="4.5" fill="#22e6d2" stroke="#08312d" strokeWidth="1.5">
        <animateMotion dur="7s" repeatCount="indefinite" path={ROUTE_PATH} />
      </circle>

      {/* origin pin — Dubai Marina */}
      <g>
        <circle cx="52" cy="262" r="11" fill="none" stroke="#f5b301" strokeWidth="1.6" className="hotspot-ring" />
        <circle cx="52" cy="262" r="6" fill="#f5b301" stroke="#2b1f00" strokeWidth="1.5" />
        <text x="52" y="292" fontSize="10.5" fontWeight="700" fill="#f4f1ea" textAnchor="middle" fontFamily="var(--font-inter), sans-serif">
          Dubai Marina
        </text>
        <text x="52" y="306" fontSize="9" fill="#9ba0aa" textAnchor="middle" fontFamily="var(--font-inter), sans-serif">
          Pickup · G63 on route
        </text>
      </g>

      {/* destination pin — DXB */}
      <g>
        <circle cx="372" cy="84" r="11" fill="none" stroke="#22e6d2" strokeWidth="1.6" className="hotspot-ring" style={{ "--hs-delay": "700ms" } as CSSProperties} />
        <circle cx="372" cy="84" r="6" fill="#22e6d2" stroke="#08312d" strokeWidth="1.5" />
        <text x="372" y="58" fontSize="10.5" fontWeight="700" fill="#f4f1ea" textAnchor="middle" fontFamily="var(--font-inter), sans-serif">
          DXB Airport
        </text>
        <text x="372" y="44" fontSize="9" fill="#9ba0aa" textAnchor="middle" fontFamily="var(--font-inter), sans-serif">
          Drop-off · Terminal 3
        </text>
      </g>

      {/* mid waypoint */}
      <circle cx="205" cy="208" r="3.5" fill="#f4f1ea" opacity="0.8" />
      <text x="205" y="192" fontSize="9" fill="#9ba0aa" textAnchor="middle" fontFamily="var(--font-inter), sans-serif">
        Business Bay
      </text>
    </svg>
  );
}
