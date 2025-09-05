"use client";

import { useMemo } from "react";
import { useApiPaginated } from "@/hooks/useApi";
import { MovieApi } from "@/lib/types";
import { MoviesGrid } from "@/components/movies/Grid/MoviesGrid";
import MoviesGridSkeleton from "@/components/movies/Grid/MoviesGridSkeleton";
import { CategoriesNav } from "@/components/ui/Search/CategoriesNav";
import { useApi } from "@/hooks/useApi";

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
    if (searchTerm) params.set("q", searchTerm);
    return `/movies/search?${params.toString()}`;
  }, [categoryId, searchTerm]);

  const { 
    data: movies, 
    error, 
    loading, 
    currentPage, 
    pageSize, 
    totalPages,
    execute
  } = useApiPaginated<MovieApi[]>(
    endpoint,
    page,
    limit,
    { 
      enabled: false, // No buscar automáticamente al cargar
      method: "GET"
    }
  );


  const handleSearch = () => {
    if (execute) {
      execute();
    }
  };

  const hasSearchCriteria = categoryId || searchTerm;

  return (
    <div className="space-y-6">
      {/* Navegación de categorías */}
      <CategoriesNav currentCategoryId={categoryId} />

      {/* Botón de búsqueda y controles */}
      <div className="flex items-center ">
        <button
          className="rounded-md bg-primary px-4 py-2 text-sm text-white hover:bg-primary/90 disabled:opacity-50"
          onClick={handleSearch}
          disabled={loading || !hasSearchCriteria}
          title={!hasSearchCriteria ? "Selecciona una categoría o término de búsqueda" : "Buscar películas"}
        >
          {loading ? "Buscando..." : movies ? "Buscar de nuevo" : "Buscar"}
        </button>

        

        {/* Feedback de error */}
        {error && (
          <span className="text-sm text-red-400">
            Error: {error}
          </span>
        )}
      </div>

      {/* Estados de carga */}
      {loading && <MoviesGridSkeleton />}

      {/* Resultados */}
      {!loading && movies && movies.length > 0 && (
        <div className="space-y-4">
          <MoviesGrid 
            movies={movies} 
            title={`Películas encontradas (${movies.length})`}
          />
          
          {/* Info de paginación */}
          {totalPages > 1 && (
            <div className="text-sm text-muted-foreground text-center">
              Página {currentPage} de {totalPages}
            </div>
          )}
        </div>
      )}

      {/* Sin resultados */}
      {!loading && movies && movies.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No se encontraron películas</p>
          <p className="text-sm text-muted-foreground mt-1">
            Intenta con otros criterios de búsqueda
          </p>
        </div>
      )}

      {/* Estado inicial - sin búsqueda realizada */}
      {!loading && !movies && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {hasSearchCriteria 
              ? "Presiona 'Buscar' para encontrar películas" 
              : "Selecciona una categoría para comenzar"
            }
          </p>
        </div>
      )}
    </div>
  );
};