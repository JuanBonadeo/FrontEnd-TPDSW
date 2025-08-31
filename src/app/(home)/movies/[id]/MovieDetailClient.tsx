"use client";

import { MovieDetail } from "@/components/movies/Detail/MovieDetail";
import { MovieDetailSkeleton } from "@/components/movies/Detail/MovieDetailSkeleton";
import { useApi } from "@/hooks/useApi";
import { Movie } from "@/lib/types";
import { notFound } from "next/navigation.js";

export default function MovieDetailClient({ id }: { id: string }) {
  const { data: movie, loading, error, errorCode } = useApi<Movie>(
    id ? `/movies/${id}` : null
  );
  if( errorCode === "NOT_FOUND") return notFound();
  if (loading) return <MovieDetailSkeleton />;
  if (error) return <div>Error loading movie details: {error}</div>;
  if (!movie) return <div>No movie data found</div>;
  return (
    <MovieDetail movie={movie} />
  );
}
