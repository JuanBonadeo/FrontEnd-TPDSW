// hooks/useReviewsByMovieId.ts
"use client";

import { useEffect, useState, useCallback } from "react";
import type { ApiResponse } from "@/lib/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export interface ReviewUser {
  id: string;
  name: string | null;
  image: string | null;
}

export interface Review {
  id_review: number;
  id_user: string;
  id_movie: number;
  score: number;                 // Normalizado a number
  comment: string;
  review_date: string;
  updated_at: string;
  User?: ReviewUser | null;
}

export function useReviewsByMovieId(movieId: string | number | undefined) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError]     = useState<string | null>(null);

  const fetchReviews = useCallback(async (signal?: AbortSignal) => {
    if (!movieId) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const url = `${API_BASE}/reviews/movie/${movieId}`;
      const res = await fetch(url, {
        headers: { Accept: "application/json" },
        cache: "no-store",
        signal,
      });

      const text = await res.text();

      if (!res.ok) {
        setError(`Error ${res.status}: ${text}`);
        setReviews([]);
        return;
      }

      const json = JSON.parse(text) as ApiResponse<any[]>;

      if (!json.success) {
        setError(json.message || "Error en API");
        setReviews([]);
        return;
      }

      setReviews(json.data);
    } catch (e: any) {
      if (e?.name === "AbortError") return;
      setError(e?.message ?? "Error desconocido");
      setReviews([]);
    } finally {
      setLoading(false);
    }
  }, [movieId]);

  useEffect(() => {
    const ac = new AbortController();
    fetchReviews(ac.signal);
    return () => ac.abort();
  }, [fetchReviews]);

  return { reviews, loading, error, refetch: fetchReviews };
}
