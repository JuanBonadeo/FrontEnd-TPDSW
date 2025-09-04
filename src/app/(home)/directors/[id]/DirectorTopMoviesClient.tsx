"use client"

import { useApi } from "@/hooks/useApi";
import { Movie } from "@/lib/types"
import { MoviesGrid } from "@/components/movies/Grid/MoviesGrid";
import MoviesGridSkeleton from "@/components/movies/Grid/MoviesGridSkeleton";

export const DirectorTopMoviesClient = ({ id }: { id: string }) => {
    const { data: director, loading, error } = useApi<{movies: Movie[]}>(id ? `/directors/${id}` : null);

    if (loading) return <MoviesGridSkeleton  />;
    if (error) return <div>Error loading movies: {error}</div>;
    if (!director?.movies || director.movies.length === 0) return <div>No movies found</div>;

    return (
        <>
        <MoviesGrid movies={director.movies} title="Top Movies" />
        </>
    );
}