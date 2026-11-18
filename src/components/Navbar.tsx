"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { IconMenu, IconPhone, IconX } from "./icons";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/fleet", label: "Fleet" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/admin", label: "Admin" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-ink/85 backdrop-blur-xl border-b border-line shadow-[0_10px_40px_rgba(0,0,0,0.45)]" : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-gold font-display text-lg font-black text-ink">D</span>
          <span className="font-display text-xl tracking-tight">
            <span className="font-extrabold">DRIVE</span>
            <span className="font-extrabold text-gold">HUB</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors hover:text-gold ${
                pathname === l.href ? "text-gold" : "text-sand"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <a href="tel:+97143008090" className="flex items-center gap-2 text-sm font-medium text-sand transition-colors hover:text-gold">
            <IconPhone className="h-4 w-4 text-gold" />
            +971 4 300 8090
          </a>
          <Link
            href="/fleet"
            className="rounded-full bg-gold px-5 py-2.5 text-sm font-bold text-ink transition-all hover:bg-gold-2 hover:shadow-[0_8px_30px_rgba(245,179,1,0.35)]"
          >
            Book now
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="grid h-10 w-10 place-items-center rounded-lg border border-line text-cream md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <IconX className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-ink/95 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col px-5 py-4">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-line/60 py-3 text-base font-medium text-sand last:border-0 hover:text-gold"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/fleet"
              onClick={() => setOpen(false)}
              className="mt-3 rounded-full bg-gold px-5 py-3 text-center text-sm font-bold text-ink"
            >
              Book now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
