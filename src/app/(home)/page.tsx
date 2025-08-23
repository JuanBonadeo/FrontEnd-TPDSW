"use client"

// import Carrusel from "@/components/ui/Carrusel/Carrusel"
import BottomNavbar from "@/components/ui/BottomNav/BottomNav"
import { MoviesGrid } from '../../components/movies/Grid/MoviesGrid';

import { useMovies } from "@/hooks/useMovies";


interface Props {
  searchParams: {
    page?: string,
    limit?: string
  }
}

export default function Page({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1
  const limit = searchParams.limit ? parseInt(searchParams.limit) : 10
  const { movies, loading, error, totalPages } = useMovies(page, limit);
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;
  
  // Si no hay películas, mostrar mensaje
  if (movies.length === 0) return <p>No se encontraron películas.</p>;
  return (

    <>
      {/* <Carrusel movies={movies} /> */}

      <MoviesGrid movies={movies} />
      {/* <Pagintation totalPages={totalPages} /> */}
      <BottomNavbar />


    </>

  )
}