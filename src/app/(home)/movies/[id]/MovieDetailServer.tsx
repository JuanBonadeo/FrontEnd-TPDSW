import { notFound } from "next/navigation";
import { MovieDetail } from "@/components/movies/Detail/MovieDetail";
import type { Movie } from "@/lib/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

async function fetchMovieById(id: string): Promise<Movie> {
  const res = await fetch(`${API_BASE}/movies/${id}`, {
    // Use cache tags so we can trigger targeted revalidation from server actions
    next: {
      revalidate: 60 * 60 * 24 * 7, // cache 7 días
      // tag the movie page by id so revalidateTag(`movie-${id}`) will invalidate it
      tags: [`movie-${id}`],
    },
  });
  if (!res.ok) {
    if (res.status === 404) throw new Error("NOT_FOUND");
    throw new Error(`Error ${res.status}`);
  }
  const json = await res.json();
  return json.data as Movie;
}

export default async function MovieDetailServer({ id }: { id: string }) {
  try {
    const movie = await fetchMovieById(id);
    return <MovieDetail movie={movie} />;
  } catch (err) {
    if (err.message === "NOT_FOUND") notFound();
    throw err;
  }
}

