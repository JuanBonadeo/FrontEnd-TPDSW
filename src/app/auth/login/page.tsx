"use client"
import Link from "next/link.js"
import { redirect } from "next/navigation.js"
import { useState } from "react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Email:", email)
    console.log("Password:", password)
    window.location.replace('/');

  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded shadow-md w-80">
        <h2 className="text-2xl mb-6 text-white">Iniciar sesión</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 rounded"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="w-full p-2 mb-4 rounded"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <button type="submit" className="w-full bg-primary text-white p-2 rounded mb-2">Entrar</button>
        <Link
          href="/auth/new-account"
          className="w-full bg-gray-700 text-white p-2 rounded"
        >
          ¿No tienes cuenta? Regístrate
        </Link>
      </form>
    </div>
  )
}