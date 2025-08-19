"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, Heart, Check } from "lucide-react"

const favoriteMovies = [
  { id: 1, title: "Dune: Part Two", rating: 4.8, image: "/placeholder.svg?height=300&width=200" },
  { id: 2, title: "Oppenheimer", rating: 4.7, image: "/placeholder.svg?height=300&width=200" },
  { id: 3, title: "Poor Things", rating: 4.5, image: "/placeholder.svg?height=300&width=200" },
  { id: 4, title: "The Batman", rating: 4.6, image: "/placeholder.svg?height=300&width=200" },
  { id: 5, title: "Barbie", rating: 4.4, image: "/placeholder.svg?height=300&width=200" },
  { id: 6, title: "Killers of the Flower Moon", rating: 4.3, image: "/placeholder.svg?height=300&width=200" },
]

const watchedMovies = [
  { id: 7, title: "The Godfather", rating: 4.9, image: "/placeholder.svg?height=300&width=200" },
  { id: 8, title: "The Shawshank Redemption", rating: 4.9, image: "/placeholder.svg?height=300&width=200" },
  { id: 9, title: "The Dark Knight", rating: 4.8, image: "/placeholder.svg?height=300&width=200" },
  { id: 10, title: "Pulp Fiction", rating: 4.8, image: "/placeholder.svg?height=300&width=200" },
  { id: 11, title: "Fight Club", rating: 4.7, image: "/placeholder.svg?height=300&width=200" },
  { id: 12, title: "Inception", rating: 4.7, image: "/placeholder.svg?height=300&width=200" },
]

const reviewedMovies = [
  {
    id: 13,
    title: "Dune: Part Two",
    rating: 5,
    review: "Una secuela espectacular que supera a la primera parte.",
    image: "/placeholder.svg?height=300&width=200",
  },
  {
    id: 14,
    title: "Oppenheimer",
    rating: 4.5,
    review: "Una obra maestra técnica con actuaciones sobresalientes.",
    image: "/placeholder.svg?height=300&width=200",
  },
  {
    id: 15,
    title: "Poor Things",
    rating: 4,
    review: "Visualmente impresionante y con una narrativa única.",
    image: "/placeholder.svg?height=300&width=200",
  },
]

export function ProfileTabs() {
  const [activeTab, setActiveTab] = useState("favorites")

  return (
    <div className="space-y-4">
      <div className="flex border-gray-700 border-b">
        <button
          className={` cursor-pointer px-4 py-2 text-sm font-medium transition-all ${activeTab === "favorites" ? "active-tab" : "text-muted-foreground"}`}
          onClick={() => setActiveTab("favorites")}
        >
          Favoritos
        </button>
        <button
          className={` cursor-pointer px-4 py-2 text-sm font-medium transition-all ${activeTab === "watched" ? "active-tab" : "text-muted-foreground"}`}
          onClick={() => setActiveTab("watched")}
        >
          Vistas
        </button>
        <button
          className={` cursor-pointer px-4 py-2 text-sm font-medium transition-all ${activeTab === "reviews" ? "active-tab" : "text-muted-foreground"}`}
          onClick={() => setActiveTab("reviews")}
        >
          Reseñas
        </button>
      </div>

      {activeTab === "favorites" && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {favoriteMovies.map((movie) => (
            <Link key={movie.id} href={`/movies/${movie.id}`}>
              <div className="relative group card-hover">
                <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg">
                  <Image src={movie.image || "/placeholder.svg"} alt={movie.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-2 right-2">
                    <Heart className="w-5 h-5 text-primary" fill="red" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <h3 className="text-sm font-medium text-white line-clamp-2">{movie.title}</h3>
                    <div className="flex items-center mt-1">
                      <Star className="w-3 h-3 mr-1 text-primary" fill="red" />
                      <span className="text-xs text-white">{movie.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {activeTab === "watched" && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {watchedMovies.map((movie) => (
            <Link key={movie.id} href={`/movies/${movie.id}`}>
              <div className="relative group card-hover">
                <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg">
                  <Image src={movie.image || "/placeholder.svg"} alt={movie.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-2 right-2">
                    <Check className="w-5 h-5 text-primary" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <h3 className="text-sm font-medium text-white line-clamp-2">{movie.title}</h3>
                    <div className="flex items-center mt-1">
                      <Star className="w-3 h-3 mr-1 text-primary" fill="red" />
                      <span className="text-xs text-white">{movie.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {activeTab === "reviews" && (
        <div className="space-y-4">
          {reviewedMovies.map((movie) => (
            <Link key={movie.id} href={`/movies/${movie.id}`}>
              <div className="flex gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="relative flex-shrink-0 w-16 h-24">
                  <Image
                    src={movie.image || "/placeholder.svg"}
                    alt={movie.title}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="font-medium">{movie.title}</h3>
                    <div className="flex items-center mt-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(movie.rating) ? "text-primary" : "text-muted"}`}
                          fill={i < Math.floor(movie.rating) ? "red" : "none"}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">{movie.review}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
