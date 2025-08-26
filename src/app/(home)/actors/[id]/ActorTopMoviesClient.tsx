"use client"

import { MoviesGrid } from "@/components/movies/Grid/MoviesGrid"
import  MoviesGridSkeleton  from "@/components/movies/Grid/MoviesGridSkeleton";
import { useActorTopMovies } from "@/hooks/useActorTopMovies";



export const ActorTopMoviesClient = ({ id }: { id: string }) => {
    const { movies, loading, error } = useActorTopMovies(id);
    
    if (loading) return <MoviesGridSkeleton />;
    if (error) return <div>Error loading top movies</div>;
    return (
        <>
        <MoviesGrid movies={movies} title="Top Movies" />
        </>
    )
}