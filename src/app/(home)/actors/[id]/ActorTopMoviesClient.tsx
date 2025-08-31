"use client"

import { MoviesGrid } from "@/components/movies/Grid/MoviesGrid"
import  MoviesGridSkeleton  from "@/components/movies/Grid/MoviesGridSkeleton";
import { useApi } from "@/hooks/useApi";
import { Movie } from "@/lib/types";


export const ActorTopMoviesClient = ({ id }: { id: string }) => {
    const { data: movies, loading, error } = useApi<Movie[]>(id ? `/movie-actors/actor/${id}` : null);

    if (loading) return <MoviesGridSkeleton />;
    if (error) return <div>Error loading top movies</div>;
    if (!movies || movies.length === 0) return <div>No top movies found</div>;
    
    return (
        <>
        <MoviesGrid movies={movies} title="Top Movies" />
        </>
    )
}