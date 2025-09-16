"use client";

import { useMemo } from "react";
import { useApiPaginated } from "@/hooks/useApi";
import { MovieApi } from "@/lib/types";
import { MoviesGrid } from "@/components/movies/Grid/MoviesGrid";
import MoviesGridSkeleton from "@/components/movies/Grid/MoviesGridSkeleton";
import { SearchInput } from "@/components/ui/Search/SearchInput";
import { Pagination } from "@/components/ui/pagination/Pagintation";
import { CategoriesModal } from "@/components/ui/Search/CategoriesModal";
import { Search } from "lucide-react";

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
      <div className="grid gap-2  items-center md:grid-cols-4 md:gap-4">
        <SearchInput />
        <CategoriesModal currentCategoryId={categoryId} />
        
        <button
          className="xs:w-xs flex items-center justify-center  group relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2 px-1 md:px-6 md:py-3 rounded-md font-medium transition-all duration-300 transform hover:scale-102 hover:shadow-lg active:scale-95"
          onClick={() => execute?.()}
          disabled={loading || !hasSearchCriteria}
          title={!hasSearchCriteria ? "Selecciona una categoría o término de búsqueda" : "Buscar películas"}
        >
          <Search className="w-4 h-4 md:w-5 md:h-5 mr-2  group-hover:rotate-360 transition-transform duration-600" />
          <span className="text-xs">{loading ? "Buscando..." : movies ? "Buscar de nuevo" : "Buscar"}</span>
          <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-600"></div>
          
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