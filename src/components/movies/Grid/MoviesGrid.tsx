

import { MovieCard } from "../Card/MovieCard";
import { Title } from "@/components/ui/title/Title";
import type { MovieApi } from "@/lib/types";

interface Props {
  movies: MovieApi[];
  title: string;
}

export const MoviesGrid = ({ movies, title }: Props) => (
  
  <section className="my-15">
    <Title title={title} />
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {movies.map((movie) => (
        <MovieCard key={movie.title} id_movie={movie.id_movie} title={movie.title} rating={movie.rating} poster_path={movie.poster_path} release_date={movie.release_date} />
      ))}
    </div>
  </section>
);


