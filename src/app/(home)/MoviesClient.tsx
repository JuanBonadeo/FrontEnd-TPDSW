
"use client";

import { useMovies } from "@/hooks/useMovies";
import { MoviesGrid } from "@/components/movies/Grid/MoviesGrid";
import MoviesGridSkeleton from "@/components/movies/Grid/MoviesGridSkeleton";
import { Pagination } from "@/components/ui/pagination/Pagintation";

export default function MoviesClient({ page, limit }: { page: number; limit: number }) {
  const { movies, loading, error, totalPages } = useMovies(page, limit);

  if (loading) return <MoviesGridSkeleton />;
  if (error) return <p>Error: {error}</p>;
  if (!movies.length) return <p>No se encontraron películas.</p>;

  return (
    <>
      <MoviesGrid movies={movies} />
      <Pagination totalPages={totalPages} /> 
    </>
  );
}
