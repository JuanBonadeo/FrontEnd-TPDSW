
import { Carrusel } from "@/components/ui/Carrusel/Carrusel";
import type { Movie } from "@/lib/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export default async function CarruselServer({
  ids,
  title = "Películas en Tendencia",
  autoPlayMs = 0,
}: {
  ids: (number | string)[];
  title?: string;
  autoPlayMs?: number;
}) {
  // 🔥 Fetch paralelo de las películas, cache 7 días
  const movies = await Promise.all(
    ids.map(async (id) => {
      const res = await fetch(`${API_BASE}/movies/${id}`, {
        next: { revalidate: 60 * 60 * 24 * 7 },
      });
      if (!res.ok) throw new Error(`Error cargando movie ${id}`);
      const json = await res.json();
      return json.data as Movie;
    })
  );

  return <Carrusel movies={movies} title={title} autoPlayMs={autoPlayMs} />;
}
