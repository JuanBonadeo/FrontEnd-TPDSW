const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export default async function MoviesGridServer({ page, limit }: { page: number; limit: number }) {
  const res = await fetch(`${API_BASE}/movies/search?page=${page}&limit=${limit}`, {
    next: { revalidate: 60 * 60 * 24 * 7 }, // 7 days
  });
  if (!res.ok) throw new Error("Error al cargar películas");
  const json = await res.json();

  return { movies: json.data, totalPages: json.pagination.totalPages };
}