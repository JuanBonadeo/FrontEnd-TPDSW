"use client"

import { useApi } from "@/hooks/useApi";
import { Movie, Director } from '@/lib/types';
import { MoviesGrid } from "@/components/movies/Grid/MoviesGrid";
import MoviesGridSkeleton from "@/components/movies/Grid/MoviesGridSkeleton";

export const DirectorTopMoviesClient = ({ id }: { id: string }) => {
    const { data: director, loading, error } = useApi<Director>(id ? `/directors/${id}` : null);

    if (loading) return <MoviesGridSkeleton  />;
    if (error) return <div>Error loading movies: {error}</div>;
    if (!director?.Movie || director.Movie.length === 0) return <div>No movies found</div>;

    return (
        <>
        <MoviesGrid movies={director.Movie} title="Top Movies" />
        </>
    );
}