// hooks/useMovies.ts
import { useEffect, useState } from "react";
import type { ApiResponse, MovieApi } from "@/lib/types";

export function useMovies(page = 1, pageSize = 20) {
  const [movies, setMovies] = useState<MovieApi[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    let cancel = false;

    async function run() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `http://localhost:3001/api/movies/search?page=${page}&limit=${pageSize}`,
          { headers: { Accept: "application/json" } }
        );

        const text = await res.text();
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${text.slice(0,200)}`);
        const totalPages = JSON.parse(text).totalPages;
        const json = JSON.parse(text) as ApiResponse<MovieApi[]>;
        if (!json.success) throw new Error(json.message || "Error en API");

        if (!cancel) {
          setMovies(json.data);
          setTotalPages(totalPages);
        }
      } catch (e: any) {
        if (!cancel) setError(e.message ?? "Error desconocido");
      } finally {
        if (!cancel) setLoading(false);
      }
    }

    run();
    return () => {
      cancel = true;
    };
  }, [page, pageSize]);

  return { movies, loading, error, totalPages };
}
