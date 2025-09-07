"use client";

import { useMemo } from "react";
import { useApiPaginated } from "@/hooks/useApi";
import { MovieApi } from "@/lib/types";
import { MoviesGrid } from "@/components/movies/Grid/MoviesGrid";
import MoviesGridSkeleton from "@/components/movies/Grid/MoviesGridSkeleton";
import { CategoriesNav } from "@/components/ui/Search/CategoriesNav";
import { SearchInput } from "@/components/ui/Search/SearchInput";
import { Pagination } from "@/components/ui/pagination/Pagintation";

interface Props {
  categoryId?: string;
  page: number;
  limit: number;
  searchTerm?: string;
}

export const SearchClient = ({ categoryId, page = 1, limit = 30, searchTerm }: Props) => {
  
  const endpoint = useMemo(() => {
    const params = new URLSearchParams();
    if (categoryId) params.set("categoryId", categoryId);
    if (searchTerm) params.set("title", searchTerm);

    const queryString = params.toString();
    return queryString ? `/movies/search?${queryString}` : '/movies/search';
  }, [categoryId, searchTerm]);

  const { data: movies, error, loading, pagination, execute } = useApiPaginated<MovieApi[]>(
    endpoint,
    page,         
    limit,
    {
      enabled: false, // manual
      method: "GET",
    }
  );

  const hasSearchCriteria = Boolean(categoryId || searchTerm);

  return (
    <div className="space-y-6">
      <SearchInput />
      <CategoriesNav currentCategoryId={categoryId} />

      <div className="flex items-center">
        <button
          className="rounded-md bg-primary px-4 py-2 text-sm text-white hover:bg-primary/90 disabled:opacity-50"
          onClick={() => execute?.()}
          disabled={loading || !hasSearchCriteria}
          title={!hasSearchCriteria ? "Selecciona una categoría o término de búsqueda" : "Buscar películas"}
        >
          {loading ? "Buscando..." : movies ? "Buscar de nuevo" : "Buscar"}
        </button>

        {error && <span className="ml-3 text-sm text-red-400">Error: {error}</span>}
      </div>

      {loading && <MoviesGridSkeleton />}

      {!loading && movies && movies.length > 0 && (
        <div className="space-y-4">
          <MoviesGrid movies={movies} title={`Películas encontradas (${movies.length})`} />
          {
            pagination && pagination.totalPages > 1 && (
              <Pagination totalPages={pagination.totalPages} />
            )
          }
        </div>
      )}

      {!loading && movies && movies.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No se encontraron películas</p>
          <p className="text-sm text-muted-foreground mt-1">Intenta con otros criterios de búsqueda</p>
        </div>
      )}

      {!loading && !movies && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {hasSearchCriteria ? "Presiona 'Buscar' para encontrar películas" : "Selecciona una categoría para comenzar"}
          </p>
        </div>
      )}
    </div>
  );
};