import { getImageUrl } from "@/utils/getImageUrl";
import {   Play, Star } from "lucide-react";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { ToWatch } from "@/lib/types";
import { CheckCheck, Hourglass } from "lucide-react";

interface Props {
    toWatch: ToWatch
}


export const MovieWatchListCard = ({ toWatch }: Props) => {
  return (
    <Link key={toWatch.id_movie} href={`/movies/${toWatch.id_movie}`}>
      <div className="relative group card-hover">
        <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg">
          <Image
            src={
              getImageUrl(toWatch.Movie?.poster_path) || "/placeholder.svg"
            }
            alt={toWatch.Movie.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div className="absolute bottom-0 left-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <h3 className="text-sm font-medium text-white line-clamp-2">
              {toWatch.Movie.title}
            </h3>
            <div className="flex items-center mt-1">
              <Star className="w-3 h-3 mr-1 text-primary" fill="red" />
              <span className="text-xs text-white">
                {toWatch.Movie.rating}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
