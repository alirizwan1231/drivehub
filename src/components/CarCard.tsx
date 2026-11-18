import Link from "next/link";
import { formatAED, type Car } from "@/data/cars";
import CarArt from "./CarArt";
import { IconArrowRight, IconCog, IconLuggage, IconStar, IconUsers } from "./icons";

const STATUS_STYLE: Record<Car["status"], string> = {
  available: "bg-mint/15 text-mint border-mint/30",
  rented: "bg-rose/15 text-rose border-rose/30",
  maintenance: "bg-gold/15 text-gold border-gold/30",
};

const STATUS_LABEL: Record<Car["status"], string> = {
  available: "Available",
  rented: "On rent",
  maintenance: "In service",
};

export default function CarCard({ car, wide = false }: { car: Car; wide?: boolean }) {
  return (
    <Link
      href={`/fleet/${car.id}`}
      className={`card-lift group flex flex-col overflow-hidden rounded-3xl border border-line bg-carbon ${
        wide ? "w-[340px] shrink-0 snap-start sm:w-[420px]" : ""
      }`}
    >
      <div className="relative">
        <CarArt body={car.body} gradient={car.gradient} accent={car.accent} uid={car.id} className="block h-auto w-full" />
        <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/45 px-3 py-1 text-[11px] font-bold tracking-widest text-cream backdrop-blur-md">
          {car.category.toUpperCase()}
        </span>
        <span className={`absolute right-4 top-4 rounded-full border px-3 py-1 text-[11px] font-bold backdrop-blur-md ${STATUS_STYLE[car.status]}`}>
          {STATUS_LABEL[car.status]}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-bold tracking-[0.18em] text-muted">{car.brand.toUpperCase()}</p>
            <h3 className="mt-1 font-display text-xl font-bold leading-tight text-cream">{car.name}</h3>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-carbon-2 px-2.5 py-1 text-xs font-bold text-gold">
            <IconStar className="h-3.5 w-3.5" />
            {car.rating.toFixed(1)}
          </span>
        </div>

        <div className="mt-4 flex items-center gap-5 text-[13px] text-muted">
          <span className="flex items-center gap-1.5"><IconUsers className="h-4 w-4 text-sand" />{car.seats} seats</span>
          <span className="flex items-center gap-1.5"><IconCog className="h-4 w-4 text-sand" />{car.transmission}</span>
          <span className="flex items-center gap-1.5"><IconLuggage className="h-4 w-4 text-sand" />{car.luggage} bags</span>
        </div>

        <div className="mt-5 flex items-end justify-between border-t border-line pt-4">
          <p>
            <span className="font-display text-2xl font-extrabold text-cream">{formatAED(car.pricePerDay)}</span>
            <span className="text-sm text-muted"> /day</span>
          </p>
          <span className="flex items-center gap-1.5 text-sm font-bold text-gold transition-transform duration-300 group-hover:translate-x-1">
            Book <IconArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
