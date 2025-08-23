"use client"
import Image from "next/image"
import { Star, Heart, Check, Clock, Calendar, Hand } from "lucide-react"
import { useMovie } from "../../../hooks/useMovie"

const getImageUrl = (
  path: string | null,
  size: "w185" | "w500" | "w780" | "original" = "w780"
) => {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : "/placeholder.svg"
}

interface MovieDetailProps {
  movie: {
    id_movie: number
    title: string
    description: string
    duration: number
    release_date: number
    rating: number
    poster_path: string | null
    backdrop_path: string | null
    Category?: {
      id_category: number
      name: string
    }
    Director?: {
      first_name: string
      last_name: string
      profile_path?: string | null
    }
    Movie_Actor?: {
      character: string
      Actor: {
        first_name: string
        last_name: string
        profile_path?: string | null
      }
    }[]
  }
}

interface Props {
  id: string
}
export function MovieDetail({ id }: Props) {
  // const movie = {
  //   id_movie: 13,
  //   title: "Man with No Past",
  //   description:
  //     "Waking up in an unfamiliar city, a man with no memory must confront the mysteries of his own identity. However, his desperate search to uncover the past pits him against a powerful enemy, leading to a showdown that ultimately reveals the truth.",
  //   duration: 103,
  //   release_date: 2025,
  //   averageScore: null,
  //   totalReviews: 0,
  //   tmdb_id: 1315986,
  //   rating: 6.595,
  //   poster_path: "/eWHvROuznSzcxBAAkzX1X0Rmzoe.jpg",
  //   backdrop_path: "/8or4S9BPhkeYK0vlKsPFee4JVWI.jpg",
  //   original_language: "en",
  //   vote_count: 42,
  //   popularity: 229.7432,
  //   adult: false,
  //   id_director: 13,
  //   id_category: 1,
  //   created_at: "2025-08-01T15:01:48.427Z",
  //   updated_at: "2025-08-01T15:01:48.427Z",
  //   Category: {
  //     id_category: 1,
  //     name: "Action",
  //     description: "Películas del género Action",
  //     tmdb_id: 28,
  //     created_at: "2025-08-01T15:01:12.215Z",
  //   },
  //   Director: {
  //     id_director: 13,
  //     first_name: "James",
  //     last_name: "Bamford",
  //     nationality: "Canadiense",
  //     tmdb_id: 113194,
  //     profile_path: "/nINKWQ3ej0aYNsP1kmybVASObAE.jpg",
  //     biography: "",
  //     birth_date: "1967-02-26T00:00:00.000Z",
  //     birth_place: "Victoria, British Columbia, Canada",
  //     created_at: "2025-08-01T15:01:48.381Z",
  //   },
  //   Movie_Actor: [
  //     {
  //       id_movie: 13,
  //       id_actor: 61,
  //       role: "Actor",
  //       character: "Sanborn",
  //       order: 0,
  //       created_at: "2025-08-01T15:01:49.972Z",
  //       Actor: {
  //         id_actor: 61,
  //         first_name: "Jon",
  //         last_name: "Voight",
  //         birth_date: "1938-12-29T00:00:00.000Z",
  //         tmdb_id: 10127,
  //         profile_path: "/g3jSSM8xqbRRJmvHM1GTZx8jmup.jpg",
  //         biography:
  //           'Jonathan Vincent "Jon" Voight is an American actor. He has received an Academy Award...',
  //         birth_place: "Yonkers, New York, USA",
  //         gender: 2,
  //         created_at: "2025-08-01T15:01:48.855Z",
  //       },
  //     },
  //     {
  //       id_movie: 13,
  //       id_actor: 62,
  //       role: "Actor",
  //       character: "Ryder",
  //       order: 1,
  //       created_at: "2025-08-01T15:01:50.017Z",
  //       Actor: {
  //         id_actor: 62,
  //         first_name: "Adam",
  //         last_name: "Woodward",
  //         birth_date: "1992-06-10T00:00:00.000Z",
  //         tmdb_id: 4161214,
  //         profile_path: "/vzVxcLEg4MkYc133fxEouhHZkM9.jpg",
  //         biography: "",
  //         birth_place: "Worcestershire, Angleterre, Royaume-Uni",
  //         gender: 2,
  //         created_at: "2025-08-01T15:01:49.127Z",
  //       },
  //     },
  //     {
  //       id_movie: 13,
  //       id_actor: 63,
  //       role: "Actor",
  //       character: "Soach",
  //       order: 2,
  //       created_at: "2025-08-01T15:01:50.061Z",
  //       Actor: {
  //         id_actor: 63,
  //         first_name: "Marton",
  //         last_name: "Csokas",
  //         birth_date: "1966-06-30T00:00:00.000Z",
  //         tmdb_id: 20982,
  //         profile_path: "/gmeUY7FR0bFLdu7Ma5kvpH3Gt6B.jpg",
  //         biography: "Marton Csokas (born 30 June 1966) is a New Zealand film and television actor...",
  //         birth_place: "Invercargill, New Zealand",
  //         gender: 2,
  //         created_at: "2025-08-01T15:01:49.392Z",
  //       },
  //     },
  //     {
  //       id_movie: 13,
  //       id_actor: 64,
  //       role: "Actor",
  //       character: "Morgan",
  //       order: 3,
  //       created_at: "2025-08-01T15:01:50.106Z",
  //       Actor: {
  //         id_actor: 64,
  //         first_name: "Charlotte",
  //         last_name: "Vega",
  //         birth_date: "1994-02-10T00:00:00.000Z",
  //         tmdb_id: 1262750,
  //         profile_path: "/legWa5GpB82M3KunyFjXPopkSc7.jpg",
  //         biography: "Charlotte Elizabeth Vega (born 10 February 1994 in Madrid) is a Spanish actress...",
  //         birth_place: "Madrid, Spain",
  //         gender: 1,
  //         created_at: "2025-08-01T15:01:49.669Z",
  //       },
  //     },
  //     {
  //       id_movie: 13,
  //       id_actor: 65,
  //       role: "Actor",
  //       character: "Jack",
  //       order: 4,
  //       created_at: "2025-08-01T15:01:50.152Z",
  //       Actor: {
  //         id_actor: 65,
  //         first_name: "Philip",
  //         last_name: "Winchester",
  //         birth_date: "1981-03-24T00:00:00.000Z",
  //         tmdb_id: 58428,
  //         profile_path: "/oc7lc2d98lM393blvmFfAGnXSMf.jpg",
  //         biography: "Philip C. Winchester (born March 24, 1981) is an American actor.",
  //         birth_place: "USA",
  //         gender: 2,
  //         created_at: "2025-08-01T15:01:49.924Z",
  //       },
  //     },
  //   ],
  // }
  const { movie, loading, error } = useMovie(id);
  if (loading) return <p>Cargando…</p>;
  if (error) return <p>Error: {error}</p>;
  if (!movie) return <p>No encontrado</p>;
  return (
    <div className="space-y-6">
      {/* Imagen de fondo */}
      <div className="relative w-full overflow-hidden rounded-lg aspect-video">
        <Image
          src={getImageUrl(movie.backdrop_path, "original")}
          alt={movie.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="space-y-4">
        {/* Título, rating, año y duración */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">{movie.title}</h1>
            <div className="flex items-center mt-1 space-x-2 text-muted-foreground">
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-1 text-primary" fill="red" />
                <span>{movie.rating?.toFixed(1)}</span>
              </div>
              <span>•</span>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <span>{movie.release_date}</span>
              </div>
              <span>•</span>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>{movie.duration} min</span>
              </div>
            </div>
          </div>
        </div>

        {/* Género */}
        <div className="flex flex-wrap gap-2">
          <div className="px-3 py-1 text-xs font-semibold bg rounded-md">
            {movie.Category.name}
          </div>
        </div>


        {/* Botones favoritos/vista */}
        <div className="flex space-x-3 w-full justify-center">
          <div className="flex items-center justify-center bg-red-600 rounded-md py-2 w-xl hover:bg-red-700 transition-colors cursor-pointer">
            <Heart className="w-4 h-4 mr-2" />
            Favorito
          </div>
          <div className="flex items-center justify-center bg-stone-900 rounded-md py-2 w-xl hover:bg-stone-800 transition-colors cursor-pointer">
            <Check className="w-4 h-4 mr-2" />
            Vista
          </div>
          {/* Nuevo botón reseñar */}
          <div className="flex items-center justify-center bg-blue-600 rounded-md py-2 w-xl hover:bg-blue-700 transition-colors cursor-pointer">
            <Hand className="w-4 h-4 mr-2" />
             Reseñar
          </div>
        </div>


        {/* Sinopsis */}
        <div>
          <h2 className="mb-2 text-lg font-semibold">Sinopsis</h2>
          <p className="text-sm text-muted-foreground">{movie.description}</p>
        </div>

        {/* Actores */}
        <div className="my-10">
          <h2 className="mb-2 text-xl font-semibold text-center">Reparto</h2>
          <div className="grid gap-2 md:grid-cols-5 md:gap-4">
            {movie.Movie_Actor.map(({ Actor, character }, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <Image
                  src={getImageUrl(Actor.profile_path, "w185")}
                  alt={`${Actor.first_name} ${Actor.last_name}`}
                  width={60}
                  height={60}
                  className="rounded-full object-cover"
                />
                <p className="text-sm font-medium mt-2">
                  {Actor.first_name} {Actor.last_name}
                </p>
                <p className="text-xs text-muted-foreground">{character}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Director */}
        <div className="my-10">
          <h2 className="mb-2 text-xl font-semibold text-center">Director</h2>
          <div className="flex items-center justify-center gap-3">
            <Image
              src={getImageUrl(movie.Director.profile_path, "w185")}
              alt={movie.Director.first_name}
              width={60}
              height={60}
              className="rounded-full object-cover"
            />
            <p className="text-sm font-bold">
              {movie.Director.first_name} {movie.Director.last_name}
            </p>
          </div>
        </div>



      </div>
    </div>
  )
}
