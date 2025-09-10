// lib/server/movies.ts
import type { ApiResponse, MovieApi } from "@/lib/types";

export async function fetchMovies(page = 1, limit = 30) {
  const url = `http://localhost:3001/api/movies/search?page=${page}&limit=${limit}`;

  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    cache: "no-store", // datos frescos en dev
  });

  const text = await res.text();
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${text.slice(0, 200)}`);
  }

  const json = JSON.parse(text) as ApiResponse<MovieApi[]>;
  if (!json.success) {
    throw new Error(json.message || "API respondió success=false");
  }

  const totalPages =
    // según tu ejemplo anterior, viene así:
    (json).pagination?.totalPages ??
    // fallback por si tu endpoint devuelve otra forma
    (JSON.parse(text).totalPages ?? 0);

  return { movies: json.data, totalPages };
}
