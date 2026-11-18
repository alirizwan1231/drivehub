"use client";

import { useRef } from "react";
import type { Car } from "@/data/cars";
import CarCard from "./CarCard";
import { IconArrowLeft, IconArrowRight } from "./icons";

export default function FleetRail({ cars }: { cars: Car[] }) {
  const railRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: number) => {
    railRef.current?.scrollBy({ left: dir * 440, behavior: "smooth" });
  };

  return (
    <div>
      <div
        ref={railRef}
        className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 pt-2 lg:-mx-8 lg:px-8"
      >
        {cars.map((car) => (
          <CarCard key={car.id} car={car} wide />
        ))}
      </div>
      <div className="mt-5 flex items-center justify-end gap-2.5">
        <button
          onClick={() => scrollBy(-1)}
          aria-label="Scroll fleet left"
          className="grid h-11 w-11 place-items-center rounded-full border border-line text-sand transition-all hover:border-gold/60 hover:text-gold"
        >
          <IconArrowLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => scrollBy(1)}
          aria-label="Scroll fleet right"
          className="grid h-11 w-11 place-items-center rounded-full border border-line text-sand transition-all hover:border-gold/60 hover:text-gold"
        >
          <IconArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
