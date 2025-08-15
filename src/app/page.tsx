"use client"

import { useState } from "react"
import Carrusel from "@/components/Carrusel"
import Cartelera from "@/components/Cartelera"
import Navbar from "@/components/Navbar"

import LoginPage from "./login/page"
import SignupPage from "./signup/page"

export default function Page() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [hasAccount, setHasAccount] = useState(true)
  const [registeredUser, setRegisteredUser] = useState<{ email: string, password: string } | null>(null)

  if (!isAuthenticated) {
    if (hasAccount) {
      return (
        <LoginPage
          onLoginSuccess={() => setIsAuthenticated(true)}
          onSignup={() => setHasAccount(false)}
          registeredUser={registeredUser}
        />
      )
    } else {
      return (
        <SignupPage
          onSignupSuccess={(email, password) => {
            setRegisteredUser({ email, password })
            setHasAccount(true)
          }}
          onLogin={() => setHasAccount(true)}
        />
      )
    }
  }

  const movies = [
    {
      id: 1,
      title: "Frozen",
      rating: 4.8,
      image: "/images/frozen.jpeg",
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
    {
      id: 4,
      title: "Como entrenar a tu dragón",
      rating: 4.5,
      image: "/images/dragons.jpeg",
      year: 2023,
      genre: "Adventure",
    },
  ]

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
        <Cartelera movies={movies} />
      </div>
    </div>
  )
}