// hooks/useMovies.ts (CLIENT)
"use client";
import { useEffect, useState } from "react";
import type { ApiResponse, MovieApi } from "@/lib/types";

export function useMovies(page = 1, pageSize = 30) {
  const [movies, setMovies] = useState<MovieApi[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    let cancel = false;

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const url = `http://localhost:3001/api/movies/search?page=${page}&limit=${pageSize}`;
        const res = await fetch(url, { headers: { Accept: "application/json" } });
        const text = await res.text();

        if (!res.ok) {
          if (!cancel) setError(`HTTP ${res.status}: ${text.slice(0, 200)}`);
          return;
        }

        const json = JSON.parse(text) as ApiResponse<MovieApi[]>;
        if (!json.success) {
          if (!cancel) setError(json.message || "Error en API");
          return;
        }

        const tp =
          (json as any).pagination?.totalPages ??
          (JSON.parse(text) as any).totalPages ??
          0;

        if (!cancel) {
          setMovies(json.data);
          setTotalPages(tp);
        }
      } catch (e: any) {
        if (!cancel) setError(e.message ?? "Error desconocido");
      } finally {
        if (!cancel) setLoading(false);
      }
    })();

    return () => {
      cancel = true;
    };
  }, [page, pageSize]);

  return { movies, loading, error, totalPages };
}
