"use client";

import React from "react";
import { useApi } from "@/hooks/useApi";
import { Favourite } from "@/lib/types";
import { MovieFavouriteCard } from "@/components/movies/Card/MovieFavouriteCard";
import MoviesGridSkeleton from "@/components/movies/Grid/MoviesGridSkeleton";
import { Title } from "@/components/ui/title/Title";

export const FavouritesClient = () => {
  const {
    data: favourites,
    error,
    loading,
  } = useApi<Favourite[]>("/favourites", { requireAuth: true });

  if (loading) return <MoviesGridSkeleton />;
  if (error) return <div>Error loading favourites detail: {error}</div>;
  if (!favourites || favourites.length === 0)
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-8">
      <div>Comienza marcando algunas peliculas como favoritas!</div>
      <a
        href="/"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Home
      </a>
      </div>
    );

  return (
    <>
        <Title title={`Mostrando ${favourites.length} peliculas`} size="md" className="text-gray-700"/>
      
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {favourites.map((fav) => (
          <MovieFavouriteCard key={fav.id_movie} favourite={fav} />
        ))}
      </div>
    </>
  );
};
