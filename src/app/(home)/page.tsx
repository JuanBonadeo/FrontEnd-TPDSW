"use client"

import Carrusel from "@/components/ui/Carrusel/Carrusel"
import BottomNavbar from "@/components/ui/BottomNav/BottomNav"
import { MoviesGrid } from '../../components/movies/Grid/MoviesGrid';


const movies = [
  {
    id: 1,
    title: "Frozen",
    rating: 4.8,
    image: "",
    year: 2024,
    genre: "Sci-Fi",
  },
  {
    id: 2,
    title: "Ralph el Demoledor",
    rating: 4.7,
    image: "",
    year: 2023,
    genre: "Drama",
  },
  {
    id: 3,
    title: "Sonic",
    rating: 4.5,
    image: "",
    year: 2023,
    genre: "Comedy",
  },
  {
    id: 4,
    title: "Como entrenar a tu dragón",
    rating: 4.5,
    image: "",
    year: 2023,
    genre: "Adventure",
  },
]
export default function Page() {

  return (

    <>
      <Carrusel movies={movies} />

      <MoviesGrid movies={movies} />
      <BottomNavbar />


    </>

  )
}