import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";

export type Movie = {
  id: string | number;
  title: string;
  image?: string | null;
  rating: number;
};

export function MovieCard({ id, title, image, rating }: Movie) {
  return (
    <Link href={`/movies/${id}`} className="block border-gray-700">
      <div
        className="group relative overflow-hidden rounded-md border-gray-700
                   transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
      >
        <div className="relative aspect-[2/3] w-full">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
            className="object-cover"
            priority={false}
          />

          <div className="absolute top-2 right-2 flex items-center rounded-md bg-red-500 px-2 py-1 text-xs font-bold text-white">
            <Star className="mr-1 h-3 w-3" fill="white" />
            {rating.toFixed(1)}
          </div>

          <div className=" absolute inset-x-0 bottom-0">
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
