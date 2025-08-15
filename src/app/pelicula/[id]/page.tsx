"use client";
import { useParams } from "next/navigation";


interface Movie {
  id: number;
  title: string;
  rating: number;
  image: string;
  year: number;
  genre: string;
  duration: number;
  reviews: string[];
}

const movies: Movie[] = [
  {
    id: 1,
    title: "Frozen",
    rating: 4.8,
    image: "/images/frozen.jpg",
    year: 2024,
    genre: "Sci-Fi",
    duration: 102,
    reviews: [
      "Muy divertida y emocionante.",
      "Excelente animación y música.",
    ],
  },
  {
    id: 2,
    title: "Ralph el Demoledor",
    rating: 4.7,
    image: "/images/ralph.jpg",
    year: 2023,
    genre: "Drama",
    duration: 108,
    reviews: [
      "Gran mensaje sobre la amistad.",
      "Personajes entrañables.",
    ],
  },
  {
    id: 3,
    title: "Sonic",
    rating: 4.5,
    image: "/images/sonic.jpg",
    year: 2023,
    genre: "Comedy",
    duration: 99,
    reviews: [
      "Muy entretenida para toda la familia.",
      "Sonic es genial.",
    ],
  },
  {
    id: 4,
    title: "Como entrenar a tu dragón",
    rating: 4.5,
    image: "/images/dragons.jpeg",
    year: 2023,
    genre: "Adventure",
    duration: 102,
    reviews: [
      "Muy entretenida para toda la familia.",
      "Los dragones son increíbles.",
    ],
  },
];

export default function PeliculaPage() {
  const { id } = useParams();
  const movie = movies.find((m) => m.id === Number(id));

  if (!movie) {
    return <div className="text-center text-red-500">Película no encontrada</div>;
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-gray-800 rounded-lg p-6 text-white">
      <img src={movie.image} alt={movie.title} className="w-full h-64 object-cover rounded mb-4" />
      <h1 className="text-2xl font-bold mb-2">{movie.title}</h1>
      <p className="mb-2">Duración: {movie.duration} min</p>
      <p className="mb-2">Rating: <span className="text-yellow-400 font-semibold">⭐ {movie.rating}</span></p>
      <h2 className="text-lg font-semibold mt-4 mb-2">Reseñas</h2>
      <ul className="list-disc pl-5">
        {movie.reviews?.map((review: string, idx: number) => (
          <li key={idx} className="mb-1">{review}</li>
        ))}
      </ul>
    </div>
  );
}