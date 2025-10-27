"use server";

import { revalidatePath, revalidateTag } from "next/cache";

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

  // Attempt to revalidate the cached movie page and review-related cache tags
  // We revalidate by tag to force Next to refresh any cached fetches that used the same tag.
  try {
    // Tag names must match those used when fetching the movie page.
    revalidateTag(`movie-${id_movie}`);
    // If you use a tag for reviews lists, revalidate it too (common pattern)
    revalidateTag(`reviews-movie-${id_movie}`);
  } catch (e) {
    // Log non-fatal revalidation errors server-side for diagnostics
    console.error('revalidateTag failed after creating review for', id_movie, e);
  }

  return data;
}
