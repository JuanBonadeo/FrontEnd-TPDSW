"use client"

import Link from "next/link"
import { Home, Search, Heart, User } from "lucide-react"
import { usePathname } from "next/navigation"
import { useState } from "react";


export default function Navbar() {
  
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around h-16 bg-gray-900 border-t">
      <Link
        href="/"
        className={`flex flex-col items-center justify-center w-full h-full btn-press ${pathname === "/" ? "text-primary" : "text-muted-foreground"}`}
      >
        <Home className="w-5 h-5" />
        <span className="text-xs mt-1">Inicio</span>
      </Link>
      <Link
        href="/search"
        className={`flex flex-col items-center justify-center w-full h-full btn-press ${pathname === "/search" ? "text-primary" : "text-muted-foreground"}`}
      >
        <Search className="w-5 h-5" />
        <span className="text-xs mt-1">Buscar</span>
      </Link>
      <Link
        href="/favorites"
        className={`flex flex-col items-center justify-center w-full h-full btn-press ${pathname === "/favorites" ? "text-primary" : "text-muted-foreground"}`}
      >
        <Heart className="w-5 h-5" />
        <span className="text-xs mt-1">Favoritos</span>
      </Link>
      <Link
        href="/profile"
        className={`flex flex-col items-center justify-center w-full h-full btn-press ${pathname === "/profile" ? "text-primary" : "text-muted-foreground"}`}
      >
        <User className="w-5 h-5" />
        <span className="text-xs mt-1">Perfil</span>
      </Link>

    </nav>
  )
}