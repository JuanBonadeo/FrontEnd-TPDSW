
"use client";

import { MoviesGrid } from "@/components/movies/Grid/MoviesGrid";
import MoviesGridSkeleton from "@/components/movies/Grid/MoviesGridSkeleton";
import { Pagination } from "@/components/ui/pagination/Pagintation";
import { useApiPaginated } from "@/hooks/useApi";
import { Movie } from "@/lib/types";
import { notFound } from "next/navigation.js";


export default function MoviesClient({ page, limit }: { page: number; limit: number }) {
  const { data: movies, loading, error, errorCode, totalPages } = useApiPaginated<Movie[]>("/movies", page, limit);
  if(errorCode === "NOT_FOUND") return notFound();
  if (loading) return <MoviesGridSkeleton />;
  if (error) return <p>Error: {error}</p>;
  if (!movies && !loading) return <p>No movies found.</p>;

  return (    
    <>
      <MoviesGrid movies={movies} title="Movies" />
      <Pagination totalPages={totalPages} />
    </>
  );
}
