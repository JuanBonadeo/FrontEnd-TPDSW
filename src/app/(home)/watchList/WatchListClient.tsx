"use client";

import { useApi } from "@/hooks/useApi";
import { ToWatch } from "@/lib/types";
import React from "react";
import MoviesGridSkeleton from "@/components/movies/Grid/MoviesGridSkeleton";
import { Title } from "@/components/ui/title/Title";
import { MovieWatchListCard } from "@/components/movies/Card/MovieWatchListCard";


export const WatchListClient = () => {
    const {
        data: watchlist,
        error,
        loading,
      } = useApi<ToWatch[]>("/watchlist", { requireAuth: true });

      if (loading) return <MoviesGridSkeleton/>;
      if (error) return <div>Error loading watchlist: {error}</div>;    
      if (!watchlist || watchlist.length === 0)
        return <div>No watchlist data found</div>;
      
      return (
        <>
            <Title title={`Mostrando ${watchlist.length} peliculas`} size="md" className="text-gray-700"/>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {watchlist.map((watch) => (
              <MovieWatchListCard key={watch.id_movie} toWatch={watch} />
            ))}
          </div>
        </>
      );
    
    };
