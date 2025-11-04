import { getImageUrl } from "@/utils/getImageUrl";
import {  Heart, Star, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { Favourite } from "@/lib/types";

interface Props {
    favourite: Favourite;
    onRemove?: (movieId: number) => void;
}


export const MovieFavouriteCard = ({ favourite, onRemove }: Props) => {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isRemoving) return;
    
    setIsRemoving(true);
    
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/favourites/toggle`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ id_movie: favourite.id_movie }),
        }
      );

      if (!response.ok) throw new Error('Error removing from favorites');

      // Llamar al callback para actualizar la UI
      if (onRemove) {
        onRemove(favourite.id_movie);
      }
    } catch (error) {
      console.error('Error removing from favorites:', error);
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <div className="relative group card-hover">
      <Link href={`/movies/${favourite.id_movie}`}>
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
      </Link>
      
      {/* Botón de eliminar */}
      {onRemove && (
        <button
          onClick={handleRemove}
          disabled={isRemoving}
          className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
          title="Eliminar de favoritos"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
