"use server";

import { revalidatePath } from "next/cache";

type CreateReviewPayload = {
  id_movie: string;
  score: number;
  comment: string;
  token?: string | null;
};

export async function createReview({ id_movie, score, comment, token }: CreateReviewPayload) {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? process.env.API_URL ?? "http://localhost:3001/api";
  const res = await fetch(`${API_BASE}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ id_movie, score, comment }),
    // ensure we always hit the remote backend and not a cached response
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Error ${res.status}`);
  }

  const data = await res.json();

  // Revalidate server-side paths so the movie page and reviews list are up-to-date
  try {
    revalidatePath(`/movies/${id_movie}`);
    revalidatePath(`/reviews/movie/${id_movie}`);
  } catch (e) {
    // don't fail the request if revalidation throws
    console.error('revalidatePath failed', e);
  }

  return data;
}
