"use client";
import { useEffect, useState } from "react";
import type { ApiResponse, Movie } from "@/lib/types";

export function useActorTopMovies(id: string) {
  const actorId = id;
  const [movies, setMovies] = useState<Movie[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!actorId) return;

    let cancel = false;

    async function run() {
      try {
        setLoading(true);
        setError(null);

        const url = `http://localhost:3001/api/movie-actors/actor/${actorId}`;
        const res = await fetch(url, {
          headers: { Accept: "application/json" },
        });

        const text = await res.text();
        if (!res.ok) {
          setError(`Error ${res.status}: ${text}`);
          return;
        }

        const json = JSON.parse(text) as ApiResponse<Movie[]>;
        if (!json.success) {
          setError(json.message || "Error en API");
          return;
        }

        if (!cancel) setMovies(json.data);
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
  }, [actorId]);

  return { movies, loading, error };
}
