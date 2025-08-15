"use client"
import { useState } from "react"

export default function SignupPage({
  onSignupSuccess,
  onLogin,
}: {
  onSignupSuccess: (email: string, password: string) => void,
  onLogin: () => void
}) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.length < 5 || password.length < 6) {
      setError("Email o contraseña demasiado cortos")
      return
    }
    setError("")
    onSignupSuccess(email, password)
    onLogin() // Redirige al login después de crear la cuenta
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded shadow-md w-80">
        <h2 className="text-2xl mb-6 text-white">Registrarse</h2>
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
        <button type="submit" className="w-full bg-primary text-white p-2 rounded mb-2">Crear cuenta</button>
        <button
          type="button"
          className="w-full bg-gray-700 text-white p-2 rounded"
          onClick={onLogin}
        >
          ¿Ya tienes cuenta? Inicia sesión
        </button>
      </form>
    </div>
  )
}