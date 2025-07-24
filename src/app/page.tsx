"use client"

import Carrusel from "@/components/Carrusel";
import Navbar from "@/components/Navbar";
import { ChevronLeft, ChevronRight } from "lucide-react";   
import React from "react";
export default function Page() {
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
  ];


  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-4xl mx-auto">
        <Navbar />
        <h1 className="text-3xl font-bold mb-8 text-center">
          <span className="text-red-500">Cine</span>PelisDeJuan
        </h1>
        <Carrusel movies={movies} />
        <section className="text-center text-gray-400">
          <p>Usa las flechas o los puntos para navegar entre películas</p>
          <p className="mt-2">
            Película actual: <span className="text-white font-semibold">{movies[0].title}</span>
          </p>
        </section>
        
      </div>
    </div>
  );
}