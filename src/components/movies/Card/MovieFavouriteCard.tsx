import { getImageUrl } from "@/utils/getImageUrl";
import {  Heart, Star } from "lucide-react";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Favourite } from "@/lib/types";

interface Props {
    favourite: Favourite
}


export const MovieFavouriteCard = ({ favourite}: Props) => {
  return (
    <Link key={favourite.id_movie} href={`/movies/${favourite.id_movie}`}>
      <div className="relative group card-hover">
        <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg">
          <Image
            src={
              getImageUrl(favourite.Movie?.poster_path) || "/placeholder.svg"
            }
            alt={favourite.Movie.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute top-2 right-2">
            <Heart className="w-5 h-5 text-transparent" fill="red" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <h3 className="text-sm font-medium text-white line-clamp-2">
              {favourite.Movie.title}
            </h3>
            <div className="flex items-center mt-1">
              <Star className="w-3 h-3 mr-1 text-primary" fill="red" />
              <span className="text-xs text-white">
                {favourite.Movie.rating}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
