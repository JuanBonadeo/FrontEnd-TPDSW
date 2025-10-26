"use server";

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

  return res.json();
}
