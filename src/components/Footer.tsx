import Link from "next/link";
import { IconClock, IconMail, IconMapPin, IconPhone } from "./icons";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-coal">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-gold font-display text-lg font-black text-ink">D</span>
              <span className="font-display text-xl">
                <span className="font-extrabold">DRIVE</span>
                <span className="font-extrabold text-gold">HUB</span>
              </span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
              Premium car rental across Dubai and the UAE. Transparent AED pricing, new-model cars,
              free delivery and a support team that actually answers.
            </p>
            <div className="mt-6 flex items-center gap-2 text-sm text-sand">
              <IconClock className="h-4 w-4 text-gold" /> Open 24 hours, 7 days a week
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold tracking-widest text-cream">EXPLORE</h4>
            <ul className="mt-5 space-y-3 text-sm text-muted">
              <li><Link href="/fleet" className="transition-colors hover:text-gold">Full fleet</Link></li>
              <li><Link href="/fleet?cat=Sports" className="transition-colors hover:text-gold">Sports cars</Link></li>
              <li><Link href="/fleet?cat=Luxury" className="transition-colors hover:text-gold">Luxury cars</Link></li>
              <li><Link href="/fleet?cat=SUV" className="transition-colors hover:text-gold">SUVs</Link></li>
              <li><Link href="/admin" className="transition-colors hover:text-gold">Fleet dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold tracking-widest text-cream">LOCATIONS</h4>
            <ul className="mt-5 space-y-3 text-sm text-muted">
              <li>Dubai Marina</li>
              <li>Downtown Dubai</li>
              <li>Dubai Intl Airport (DXB)</li>
              <li>Palm Jumeirah</li>
              <li>Abu Dhabi Corniche</li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold tracking-widest text-cream">CONTACT</h4>
            <ul className="mt-5 space-y-3 text-sm text-muted">
              <li className="flex items-start gap-2.5">
                <IconMapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                Marina Plaza, Level 14, Dubai Marina, Dubai, UAE
              </li>
              <li className="flex items-center gap-2.5">
                <IconPhone className="h-4 w-4 shrink-0 text-gold" /> +971 4 300 8090
              </li>
              <li className="flex items-center gap-2.5">
                <IconMail className="h-4 w-4 shrink-0 text-gold" /> bookings@drivehub.ae
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-line pt-7 text-xs text-muted md:flex-row">
          <p>© 2026 DriveHub Car Rental LLC. Demo portfolio project — all cars, prices and bookings are sample data.</p>
          <p className="flex gap-6">
            <span className="cursor-pointer transition-colors hover:text-gold">Terms</span>
            <span className="cursor-pointer transition-colors hover:text-gold">Privacy</span>
            <span className="cursor-pointer transition-colors hover:text-gold">Rental policy</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
