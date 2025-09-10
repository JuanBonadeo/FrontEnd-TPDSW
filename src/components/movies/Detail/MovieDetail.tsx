"use client"
import Image from "next/image"
import { Star, Clock, Calendar } from "lucide-react"
import { getImageUrl } from "@/utils/getImageUrl"
import Link from "next/link"
import { Movie } from "@/lib/types.js"
import { FavouriteButton } from '../FavouriteButton/FavouriteButton';
import { ToWatchButton } from "../ToWatchButton/ToWatchButton"
import { useAuthContext } from "@/context/AuthContext"
import ReviewModal from "@/components/reviews/ReviewModal"

interface Props {
  movie: Movie
}

export function MovieDetail({ movie }: Props) {
  const { user } = useAuthContext();
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
        <div className="grid grid-cols-3 gap-2">

          <FavouriteButton idMovie={movie.id_movie} />


          
          <ToWatchButton idMovie={movie.id_movie}/>

         
          
          <ReviewModal idMovie={movie.id_movie.toString()}/>
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
                <Link className="text-sm font-medium mt-2" href={`/actors/${Actor.id_actor}`}>
                  {Actor.first_name} {Actor.last_name}
                </Link>
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
            <Link className="text-sm font-bold mt-2" href={`/directors/${movie.Director.id_director}`}>
              {movie.Director.first_name} {movie.Director.last_name}
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
