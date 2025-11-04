import { getImageUrl } from "@/utils/getImageUrl";
import {   Play, Star, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { ToWatch } from "@/lib/types";
import { CheckCheck, Hourglass } from "lucide-react";

interface Props {
    toWatch: ToWatch;
    onRemove?: (movieId: number) => void;
}


export const MovieWatchListCard = ({ toWatch, onRemove }: Props) => {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isRemoving) return;
    
    setIsRemoving(true);
    
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';
      
      // Primero verificar el estado actual antes de hacer toggle
      const checkResponse = await fetch(`${API_BASE}/to-watch/isToWatch/${toWatch.id_movie}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      let isCurrentlyInWatchlist = false;
      if (checkResponse.ok) {
        const checkData = await checkResponse.json();
        isCurrentlyInWatchlist = checkData.data?.isToWatch || false;
      }

      // Si NO está en la watchlist, solo actualizar la UI
      if (!isCurrentlyInWatchlist) {
        if (onRemove) {
          onRemove(toWatch.id_movie);
        }
        return;
      }

      // Hacer el toggle para eliminar
      const response = await fetch(`${API_BASE}/to-watch/toggle`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ id_movie: toWatch.id_movie }),
      });

      let responseData;
      try {
        const text = await response.text();
        if (text.trim()) {
          responseData = JSON.parse(text);
        }
      } catch (parseError) {
        console.error('Error parsing response:', parseError);
      }

      if (!response.ok || !responseData?.success) {
        const errorMessage = responseData?.error || responseData?.message || `HTTP ${response.status}`;
        throw new Error(errorMessage);
      }

      // Actualizar la UI
      if (onRemove) {
        onRemove(toWatch.id_movie);
      }
    } catch (error) {
      console.error('Error removing from watchlist:', error);
      alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <div className="relative group card-hover">
      <Link href={`/movies/${toWatch.id_movie}`}>
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
      </Link>
      
      {/* Botón de eliminar */}
      {onRemove && (
        <button
          onClick={handleRemove}
          disabled={isRemoving}
          className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50 z-10"
          title="Eliminar de watchlist"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
