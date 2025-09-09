
"use client";

import { MoviesGrid } from "@/components/movies/Grid/MoviesGrid";
import MoviesGridSkeleton from "@/components/movies/Grid/MoviesGridSkeleton";
import { Pagination } from "@/components/ui/pagination/Pagintation";
import { useApiPaginated } from "@/hooks/useApi";
import { Movie } from "@/lib/types";
import { notFound } from "next/navigation.js";



export default function MoviesClient({ page, limit = 30  }: { page: number; limit: number }) {
  const { data: movies, pagination, loading, error } = useApiPaginated<Movie[]>(
  '/movies/search',
  page,
  limit
);
  if (error === "NOT_FOUND") return notFound();
  if (loading) return <MoviesGridSkeleton />;
  if (error) return <p>Error: {error}</p>;
  if (!movies) return <p>No movies found.</p>;


  return (    
    <>
      <MoviesGrid movies={movies} title="Todas las peliculas" />
      <Pagination totalPages={pagination.totalPages} />
    </>
  );
}
