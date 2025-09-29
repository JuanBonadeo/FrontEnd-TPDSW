"use client"
import { MoviesAdminGrid } from '@/components/admin/MoviesAdminGrid';
import { Pagination } from '@/components/ui/pagination/Pagintation';
import { useAuthContext } from '@/context/AuthContext';
import { useApiPaginated } from '@/hooks/useApi';
import { Movie } from '@/lib/types.js';

export const AdminMoviesClient = ({ page, limit = 10 }: { page: number; limit: number }) => {
    const { user } = useAuthContext();
    const { data: movies, pagination, loading } = useApiPaginated<Movie[]>('/movies/search',
        page,
        limit,
        { requireAuth: true }
    );
    if (!user || user.role !== "ADMIN") {
        return (
            <div className="flex items-center justify-center min-h-64">
                <div className="text-center">
                    <div className="text-red-500 text-6xl mb-4">🚫</div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Acceso Denegado</h2>
                    <p className="text-gray-600">No tienes permisos para acceder a esta página</p>
                </div>
            </div>
        );
    }
    if (!movies || movies.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-64">
                <div className="text-center">
                    <div className="text-6xl mb-4">🎬</div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">No hay películas disponibles</h2>
                    <p className="text-gray-600">No se encontraron películas en la base de datos</p>
                </div>
            </div>
        );
    }




  return (
            <>
                <MoviesAdminGrid movies={movies} />
                <Pagination totalPages={pagination?.totalPages} />
            </>

        );
    }
    {/*  */ }