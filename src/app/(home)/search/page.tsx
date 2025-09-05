// app/search/page.tsx
import { Suspense } from "react";
import { SearchClient } from "./SearchClient";
import MoviesGridSkeleton from "@/components/movies/Grid/MoviesGridSkeleton";

interface SearchParams {
  categoryId?: string;
  page?: string;
  limit?: string;
  q?: string; // término de búsqueda
}

interface Props {
  searchParams: SearchParams;
}

export default async function SearchPage({ searchParams }: Props) {
  const { page, limit, categoryId, q } = await searchParams;
  const pageInt = parseInt(page || "1", 10);
  const limitInt = parseInt(limit || "30", 10);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Buscar Películas</h1>
          <p className="text-muted-foreground">
            Explora películas por categoría o busca por término específico
          </p>
        </div>

        <Suspense fallback={<MoviesGridSkeleton />}>
          <SearchClient
            categoryId={categoryId}
            page={pageInt}
            limit={limitInt}
            searchTerm={q}
          />
        </Suspense>
      </div>
    </div>
  );
}
