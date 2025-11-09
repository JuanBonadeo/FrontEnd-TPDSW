"use client";

import {  useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Heart, Check } from "lucide-react";
import { UserStats, ToWatch, Favourite } from "@/lib/types";
import { getImageUrl } from "@/utils/getImageUrl";
import { MovieFavouriteCard } from "../movies/Card/MovieFavouriteCard";
import { MovieWatchListCard } from "../movies/Card/MovieWatchListCard";



interface Props {
  userStats: UserStats;
}
export function ProfileTabs({userStats}: Props) {
  const [activeTab, setActiveTab] = useState("favorites");
  const [localFavorites, setLocalFavorites] = useState<Favourite[]>(userStats.Favorite);
  const [localWatchList, setLocalWatchList] = useState<ToWatch[]>(userStats.ToWatch);
  const [renderKey, setRenderKey] = useState(0); // Para forzar re-render
  
  // Actualizar estados locales cuando cambien las props
  useEffect(() => {
    setLocalFavorites(userStats.Favorite);
    setLocalWatchList(userStats.ToWatch);
  }, [userStats]);

  // Callbacks para manejar eliminaciones
  const handleRemoveFavorite = (movieId: number) => {
    setLocalFavorites(prev => prev.filter(fav => fav.id_movie !== movieId));
    setRenderKey(prev => prev + 1);
  };

  const handleRemoveFromWatchList = (movieId: number) => {
    setLocalWatchList(prev => prev.filter(watch => watch.id_movie !== movieId));
    setRenderKey(prev => prev + 1);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-6 pt-2">
        <div className="text-center">
          <p className="text-lg font-bold">{localFavorites.length}</p>
          <p className="text-xs text-muted-foreground">Favoritos</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold">{localWatchList.length}</p>
          <p className="text-xs text-muted-foreground">Watchlist</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold">{userStats._count.Review}</p>
          <p className="text-xs text-muted-foreground">Reseñas</p>
        </div>
      </div>
      <div className="flex border-gray-700 border-b mt-5">
        <button
          className={` cursor-pointer px-4 py-2 text-sm font-medium transition-all ${
            activeTab === "favorites" ? "active-tab" : "text-muted-foreground"
          }`}
          onClick={() => setActiveTab("favorites")}
        >
          Favoritos
        </button>
        <button
          className={` cursor-pointer px-4 py-2 text-sm font-medium transition-all ${
            activeTab === "watched" ? "active-tab" : "text-muted-foreground"
          }`}
          onClick={() => setActiveTab("watched")}
        >
          Watchlist
        </button>
        <button
          className={` cursor-pointer px-4 py-2 text-sm font-medium transition-all ${
            activeTab === "reviews" ? "active-tab" : "text-muted-foreground"
          }`}
          onClick={() => setActiveTab("reviews")}
        >
          Reseñas
        </button>
      </div>

      {activeTab === "favorites" && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {localFavorites.length > 0 ? (
            localFavorites.map((favourite) => (
              <MovieFavouriteCard 
                key={favourite.id_movie} 
                favourite={favourite} 
                onRemove={handleRemoveFavorite}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-muted-foreground py-8">
              No tienes películas favoritas
            </div>
          )}
        </div>
      )}

      {activeTab === "watched" && (
        <div key={`watchlist-${renderKey}`} className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {localWatchList.length > 0 ? (
            localWatchList.map((toWatch) => (
              <MovieWatchListCard 
                key={`${toWatch.id_movie}-${toWatch.created_at}-${renderKey}`} 
                toWatch={toWatch} 
                onRemove={handleRemoveFromWatchList}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-muted-foreground py-8">
              Tu watchlist está vacía
            </div>
          )}
        </div>
      )}

      {activeTab === "reviews" && (
        <div className="space-y-4">
          {userStats.Review.map((review) => (
            <Link key={review.id_review} href={`/movies/${review.id_movie}`}>
              <div className="flex gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="relative flex-shrink-0 w-16 h-24">
                  <Image
                    src={getImageUrl(review.Movie?.poster_path) || "/placeholder.svg"}
                    alt={review.Movie.title}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="font-medium">{review.Movie.title}</h3>
                    <div className="flex items-center mt-1 mb-2">
                     {[...Array(5)].map((_, i) => (
                            <div key={i} className="relative w-4 h-4 shrink-0">
                                {/* empty star (outline) */}
                                <Star
                                    className="w-4 h-4 text-muted"
                                    fill="none"
                                />
                                {/* colored overlay clipped to fraction */}
                                <div
                                    className="absolute left-0 top-0 h-full overflow-hidden"
                                    style={{ width: `${Math.round(Math.max(0, Math.min(1, Number(review.score) - i)) * 100)}%` }}
                                >
                                    <Star
                                        className="w-4 h-4 text-primary"
                                        fill="currentColor"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {review.comment}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
