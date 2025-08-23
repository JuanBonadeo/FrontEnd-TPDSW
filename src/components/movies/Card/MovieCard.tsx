import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import type { MovieApi } from "@/lib/types";

const getImageUrl = (path: string | null, size: "w500" | "w780" = "w500") =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : "/placeholder.svg";

export function MovieCard({ id_movie, title, rating, poster_path }: MovieApi) {
  return (
    <Link href={`/movies/${id_movie}`} className="block">
      <div
        className="group relative overflow-hidden rounded-md border border-gray-700
                   transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
      >
        {/* Imagen */}
        <div className="relative aspect-[2/3] w-full">
          <Image
            src={getImageUrl(poster_path, "w500")}
            alt={title}
            fill
            sizes="(max-width: 640px) 50vw,
                   (max-width: 1024px) 25vw,
                   16vw"
            className="object-cover"
          />

          {/* Rating arriba a la derecha */}
          <div className="absolute top-2 right-2 flex items-center rounded-md bg-red-500 px-2 py-1 text-xs font-bold text-white">
            <Star className="mr-1 h-3 w-3" fill="white" />
            {rating.toFixed(1)}
          </div>

          {/* Overlay con gradiente + título */}
          <div className="absolute inset-x-0 bottom-0">
            <div className="h-24 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 bg-black/60 px-3 py-2">
              <h3 className="line-clamp-2 text-sm font-medium">{title}</h3>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
