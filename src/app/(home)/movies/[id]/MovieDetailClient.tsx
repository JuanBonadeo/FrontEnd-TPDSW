"use client";

import { MovieDetail } from "@/components/movies/Detail/MovieDetail";
import { MovieDetailSkeleton } from "@/components/movies/Detail/MovieDetailSkeleton";
import { useMovie } from "@/hooks/useMovie";

export default function MovieDetailClient({ id }: { id: string }) {
  const { movie, loading, error } = useMovie(id);

  if (loading) return <MovieDetailSkeleton />;
  if (error) return <div className="text-sm text-red-400">{error}</div>;
  return (
    <MovieDetail movie={movie} />
  );
}
