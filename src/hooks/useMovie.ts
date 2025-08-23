// hooks/useMovie.ts
import { useEffect, useState } from "react";
import type { ApiResponse, Movie } from "@/lib/types";

export function useMovie(id: string | number) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    let cancel = false;

    async function run() {
      try {
        setLoading(true);
        setError(null);

        // ✅ Usamos el proxy de Next → evita CORS
        const url = `http://localhost:3001/api/movies/${id}`;
        const res = await fetch(url, {
          headers: { Accept: "application/json" },
        });


        const text = await res.text();
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${text.slice(0, 200)}`);

        const json = JSON.parse(text) as ApiResponse<Movie>;
        if (!json.success) throw new Error(json.message || "Error en API");

        if (!cancel) setMovie(json.data);
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
  }, [id]);

  return { movie, loading, error };
}
