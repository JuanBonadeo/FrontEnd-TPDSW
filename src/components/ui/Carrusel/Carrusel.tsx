// components/ui/Carrusel/CarruselClient.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Title } from "../title/Title";
import type { Movie } from "@/lib/types";

const tmdb = (p: string | null, size: "w1280" | "w780" | "original" = "w1280") =>
  p ? `https://image.tmdb.org/t/p/${size}${p}` : "/placeholder.svg";

interface Props {
  movies: Movie[];
  title?: string;
  autoPlayMs?: number;
}

export function Carrusel({ movies, title = "Películas en Tendencia", autoPlayMs = 0 }: Props) {
  const [current, setCurrent] = useState(0);
  const len = movies.length;
  const wrap = useCallback((i: number) => (len ? (i + len) % len : 0), [len]);
  const next = useCallback(() => setCurrent((p) => wrap(p + 1)), [wrap]);
  const prev = useCallback(() => setCurrent((p) => wrap(p - 1)), [wrap]);

  useEffect(() => {
    if (!autoPlayMs || len <= 1) return;
    const id = setInterval(next, autoPlayMs);
    return () => clearInterval(id);
  }, [autoPlayMs, next, len]);

  if (len === 0) {
    return (
      <section className="mb-8">
        <Title title={title} size="2xl" />
        <div className="h-110 w-full animate-pulse rounded-lg bg" />
      </section>
    );
  }

  const m = movies[current];
  const img = tmdb(m.backdrop_path ?? m.poster_path, "w1280");
  const year = m.release_date ? String(m.release_date) : "";

  return (
    <section className="mb-8">
      <Title title={title} size="2xl" />

      <div className="relative overflow-hidden rounded-lg border-2 border-red-500 bg-gray-800">
        <div className="relative h-110">
          <Link href={`/movies/${m.id_movie}`} className="absolute inset-0 z-10">
            <Image src={img} alt={m.title} fill priority sizes="100vw" className="object-cover" />
          </Link>

          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/30 to-transparent pointer-events-none" />

          <button
            type="button"
            onClick={prev}
            aria-label="Película anterior"
            className="cursor-pointer absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm hover:bg-black/50 z-20"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Siguiente película"
            className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm hover:bg-black/50 z-20"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div className="absolute bottom-4 left-4 right-4 pointer-events-none z-20">
            <div className="flex items-end justify-between">
              <div>
                <h4 className="mb-2 line-clamp-2 text-xl font-bold text-white drop-shadow-lg">{m.title}</h4>
                <div className="mb-2 flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-red-600" fill="red" />
                    <span className="text-sm font-medium text-white">
                      {m.rating?.toFixed?.(1) ?? m.rating}
                    </span>
                  </div>
                  {year && <span className="text-sm text-gray-300">{year}</span>}
                </div>
              </div>
              <div className="rounded bg-black/30 px-2 py-1 text-xs text-gray-300 backdrop-blur-sm">
                {current + 1} / {len}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {movies.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Ir a película ${i + 1}`}
            className={
              "h-2 rounded-full transition-all duration-200 hover:scale-125 " +
              (i === current ? "w-6 bg-red-500" : "w-2 bg-gray-600 hover:bg-gray-500")
            }
          />
        ))}
      </div>
    </section>
  );
}
