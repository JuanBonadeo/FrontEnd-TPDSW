import React from "react";
import Link from "next/link";


interface Movie {
  id: number;
  title: string;
  rating: number;
  image: string;
  year: number;
  genre: string;
}

interface CarteleraProps {
  movies: Movie[];
}

const Cartelera: React.FC<CarteleraProps> = ({ movies }) => (
  <section className="mt-10">
    <h2 className="text-xl font-semibold mb-4 text-gray-300 text-center">Cartelera</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {movies.map((movie) => (
        <Link href={`/pelicula/${movie.id}`} key={movie.id}>
          <div className="bg-gray-800 rounded-lg p-4 flex flex-col items-center shadow cursor-pointer hover:bg-gray-700 transition">
            <img
              src={movie.image}
              alt={movie.title}
              className="w-full h-48 object-cover rounded mb-3"
            />
            <h3 className="text-lg font-bold text-white mb-1">{movie.title}</h3>
            <p className="text-gray-400 text-sm mb-1">{movie.genre} • {movie.year}</p>
            <span className="text-yellow-400 font-semibold">⭐ {movie.rating}</span>
          </div>
        </Link>
      ))}
    </div>
  </section>
);
export default Cartelera;