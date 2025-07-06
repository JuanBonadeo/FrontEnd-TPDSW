"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

export default function Page() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const movies = [
    {
      id: 1,
      title: "Frozen",
      rating: 4.8,
      image: "/images/frozen.jpg",
      year: 2024,
      genre: "Sci-Fi",
    },
    {
      id: 2,
      title: "Ralph el Demoledor",
      rating: 4.7,
      image: "/images/ralph.jpg",
      year: 2023,
      genre: "Drama",
    },
    {
      id: 3,
      title: "Sonic",
      rating: 4.5,
      image: "/images/sonic.jpg",
      year: 2023,
      genre: "Comedy",
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % movies.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + movies.length) % movies.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const currentMovie = movies[currentSlide]

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          <span className="text-red-500">Cine</span>PelisDeJuan
        </h1>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-300">Películas en Tendencia</h2>
          <div className="relative w-full">
            <div className="relative overflow-hidden bg-gray-800 border-red-500 border-2 rounded-lg">
              <div className="relative h-96 bg-gradient-to-t from-gray-900 to-transparent">
                <img
                  src={currentMovie.image || "/placeholder.svg"}
                  alt={currentMovie.title}
                  className="w-full h-full object-cover transition-opacity duration-500"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = "/placeholder.svg?height=400&width=600"
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent" />
                <button
                  type="button"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/30 rounded-full p-2 hover:bg-black/50 transition-all duration-200 backdrop-blur-sm"
                  onClick={prevSlide}
                  aria-label="Película anterior"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/30 rounded-full p-2 hover:bg-black/50 transition-all duration-200 backdrop-blur-sm"
                  onClick={nextSlide}
                  aria-label="Siguiente película"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-end justify-between">
                    <div>
                      <h4 className="text-xl font-bold mb-2 text-white drop-shadow-lg">{currentMovie.title}</h4>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-red-500 text-red-500" />
                          <span className="text-sm font-medium text-white">{currentMovie.rating}</span>
                        </div>
                        <span className="text-sm text-gray-300">{currentMovie.year}</span>
                        <span className="text-sm text-gray-300 bg-black/30 px-2 py-1 rounded">
                          {currentMovie.genre}
                        </span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-300 bg-black/30 px-2 py-1 rounded backdrop-blur-sm">
                      {currentSlide + 1} / {movies.length}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-2 mt-4">
              {movies.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-200 hover:scale-125 ${
                    index === currentSlide ? "bg-red-500 w-6" : "bg-gray-600 hover:bg-gray-500"
                  }`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Ir a película ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>
        <section className="text-center text-gray-400">
          <p>Usa las flechas o los puntos para navegar entre películas</p>
          <p className="mt-2">
            Película actual: <span className="text-white font-semibold">{currentMovie.title}</span>
          </p>
        </section>
      </div>
    </div>
  )
}