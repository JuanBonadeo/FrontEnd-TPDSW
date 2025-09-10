// app/search/page.tsx
import { Suspense } from "react";
import { SearchClient } from "./SearchClient";
import MoviesGridSkeleton from "@/components/movies/Grid/MoviesGridSkeleton";

interface SearchParams {
  categoryId?: string;
  page?: string;
  limit?: string;
  title?: string;
}
interface Props {
  searchParams: Promise<SearchParams>;
}

export default async function SearchPage({ searchParams }: Props) {
  const { page, limit, categoryId, title } = await searchParams;
  const pageInt = Number.isFinite(Number(page)) ? parseInt(page as string, 10) : 1;
  const limitInt = Number.isFinite(Number(limit)) ? parseInt(limit as string, 10) : 30;

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
            searchTerm={title}
          />
        </Suspense>
      </div>
    </div>
  );
}
