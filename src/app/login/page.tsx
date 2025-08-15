"use client"
import { useState } from "react"

export default function LoginPage({
  onLoginSuccess,
  onSignup,
  registeredUser,
}: {
  onLoginSuccess: () => void,
  onSignup: () => void,
  registeredUser: { email: string, password: string } | null
}) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (
      (registeredUser && email === registeredUser.email && password === registeredUser.password) ||
      (email === "usuario@correo.com" && password === "123456")
    ) {
      setError("")
      onLoginSuccess()
    } else {
      setError("Email o contraseña incorrectos")
    }
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
        <button
            type="button"
            className="w-full bg-gray-700 text-white p-2 rounded"
            onClick={onSignup}
>
            ¿No tienes cuenta? Regístrate
            </button>
      </form>
    </div>
  )
}