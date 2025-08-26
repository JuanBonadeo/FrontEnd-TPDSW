"use client";
import { useEffect, useState } from "react";
import type { ApiResponse, Actor } from "@/lib/types"; // asegurate de definir Actor en tus types

export function useActor(id: string | number) {
  const [actor, setActor] = useState<Actor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    let cancel = false;

    async function run() {
      try {
        setLoading(true);
        setError(null);

        const url = `http://localhost:3001/api/actors/${id}`;
        const res = await fetch(url, {
          headers: { Accept: "application/json" },
        });

        const text = await res.text();
        if (!res.ok) {
          setError(`Error ${res.status}: ${text}`);
        }

        const json = JSON.parse(text) as ApiResponse<Actor>;
        if (!json.success) {
          setError(json.message || "Error en API");
        }

        if (!cancel) setActor(json.data);
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

  return { actor, loading, error };
}
