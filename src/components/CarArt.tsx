import type { BodyStyle } from "@/data/cars";

interface ArtDef {
  body: string;
  glass: string;
  rearWheel: number;
  frontWheel: number;
  wheelR: number;
}

const ART: Record<BodyStyle, ArtDef> = {
  sports: {
    body: "M28 182 C44 158 96 146 158 140 C196 104 262 78 344 76 C438 74 520 96 576 122 C636 130 682 148 690 168 C694 180 686 190 668 191 L612 191 A40 40 0 1 0 532 191 L252 191 A40 40 0 1 0 172 191 L58 190 C36 189 22 192 28 182 Z",
    glass: "M238 134 C272 98 322 84 372 85 C436 86 492 102 528 126 C470 116 420 112 372 113 C322 114 274 122 238 134 Z",
    rearWheel: 212, frontWheel: 572, wheelR: 33,
  },
  gt: {
    body: "M26 184 C40 156 100 144 176 140 C214 108 268 84 330 78 C420 70 520 88 584 118 C644 128 684 148 690 168 C694 181 684 190 666 191 L614 191 A40 40 0 1 0 534 191 L246 191 A40 40 0 1 0 166 191 L56 190 C36 189 20 193 26 184 Z",
    glass: "M262 132 C292 100 336 86 384 86 C444 86 496 100 534 124 C474 115 424 111 380 112 C332 113 292 120 262 132 Z",
    rearWheel: 206, frontWheel: 574, wheelR: 33,
  },
  suv: {
    body: "M36 186 C40 160 52 132 66 108 C76 90 92 82 118 80 L470 74 C520 74 560 84 596 104 C640 116 676 140 684 164 C688 178 680 188 662 189 L614 189 A40 40 0 1 0 534 189 L254 189 A40 40 0 1 0 174 189 L60 188 C44 187 33 194 36 186 Z",
    glass: "M98 110 C106 95 118 91 136 90 L248 88 L248 130 L112 132 C102 124 95 118 98 110 Z M266 88 L450 85 C490 85 522 93 550 107 C555 115 550 126 538 129 L266 130 Z",
    rearWheel: 214, frontWheel: 574, wheelR: 33,
  },
  sedan: {
    body: "M34 184 C52 158 104 146 168 140 C214 100 276 78 356 78 C442 78 512 100 560 126 C622 132 672 148 684 166 C690 178 682 189 664 190 L610 190 A39 39 0 1 0 532 190 L254 190 A39 39 0 1 0 176 190 L62 189 C42 188 28 193 34 184 Z",
    glass: "M252 132 C286 98 330 86 380 87 C438 88 488 102 522 124 C466 115 420 111 378 112 C328 113 284 120 252 132 Z",
    rearWheel: 215, frontWheel: 571, wheelR: 32,
  },
  convertible: {
    body: "M30 184 C48 160 104 148 176 142 L520 138 C596 138 660 148 682 166 C690 178 682 189 664 190 L610 190 A39 39 0 1 0 532 190 L254 190 A39 39 0 1 0 176 190 L60 189 C40 188 24 193 30 184 Z",
    glass: "M298 141 L350 103 C356 99 365 99 371 103 L404 139 Z",
    rearWheel: 215, frontWheel: 571, wheelR: 32,
  },
};

function Wheel({ cx, r, accent }: { cx: number; r: number; accent: string }) {
  const cy = 191;
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="#0a0b0e" stroke="#2c2f3a" strokeWidth="2" />
      <circle cx={cx} cy={cy} r={r * 0.58} fill="none" stroke={accent} strokeWidth="2" opacity="0.85" />
      {[0, 60, 120, 180, 240, 300].map((a) => {
        const rad = (a * Math.PI) / 180;
        return (
          <line
            key={a}
            x1={cx}
            y1={cy}
            x2={cx + Math.cos(rad) * r * 0.55}
            y2={cy + Math.sin(rad) * r * 0.55}
            stroke="#4a4e5c"
            strokeWidth="3"
          />
        );
      })}
      <circle cx={cx} cy={cy} r="4.5" fill={accent} />
    </g>
  );
}

export default function CarArt({
  body,
  gradient,
  accent,
  uid,
  className = "",
}: {
  body: BodyStyle;
  gradient: [string, string];
  accent: string;
  uid: string;
  className?: string;
}) {
  const art = ART[body];
  const gid = `cg-${uid}`;
  return (
    <svg viewBox="0 0 720 240" className={className} role="img" aria-label="Car illustration">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={gradient[0]} />
          <stop offset="100%" stopColor={gradient[1]} />
        </linearGradient>
        <linearGradient id={`${gid}-body`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a3e4c" />
          <stop offset="55%" stopColor="#1d1f27" />
          <stop offset="100%" stopColor="#101116" />
        </linearGradient>
      </defs>

      {/* backdrop glow panel */}
      <rect x="6" y="10" width="708" height="220" rx="26" fill={`url(#${gid})`} />
      <circle cx="560" cy="52" r="120" fill={accent} opacity="0.13" />
      <circle cx="130" cy="200" r="90" fill={accent} opacity="0.08" />

      {/* ground */}
      <ellipse cx="360" cy="205" rx="315" ry="11" fill="#000" opacity="0.55" />
      <line x1="52" y1="203" x2="668" y2="203" stroke={accent} strokeWidth="2" opacity="0.5" />

      {/* body */}
      <path d={art.body} fill={`url(#${gid}-body)`} stroke="#454a59" strokeWidth="1.5" />
      {/* glass */}
      <path d={art.glass} fill="#0d1622" stroke={accent} strokeWidth="1.4" opacity="0.95" />
      {/* accent character line */}
      <path d="M70 168 C220 156 480 152 660 166" fill="none" stroke={accent} strokeWidth="2" opacity="0.55" />
      {/* lights */}
      <rect x="652" y="156" width="30" height="7" rx="3.5" fill={accent} />
      <rect x="34" y="158" width="24" height="7" rx="3.5" fill="#fb5e7e" opacity="0.9" />

      <Wheel cx={art.rearWheel} r={art.wheelR} accent={accent} />
      <Wheel cx={art.frontWheel} r={art.wheelR} accent={accent} />
    </svg>
  );
}
