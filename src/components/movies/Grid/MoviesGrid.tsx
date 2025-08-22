import React from "react";
import { MovieCard } from "../Card/MovieCard";
import { Title } from "@/components/ui/title/Title";


interface Movie {
  id: number;
  title: string;
  rating: number;
  image: string;
  year: number;
  genre: string;
}


interface Props {
  movies: Movie[];
}

export const MoviesGrid = ({ movies }: Props) => {
  

  
  // Render the movies in a grid layout
  return (
    <section className="my-15">
      <Title title="Top Rated" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} {...movie} />
      ))}
    </div>
  </section>
  )
}

