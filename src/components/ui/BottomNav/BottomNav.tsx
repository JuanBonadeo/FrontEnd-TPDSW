"use client"

import Link from "next/link"
import { Home, Search, Heart, User, LogIn } from "lucide-react"
import { usePathname } from "next/navigation"
import React from "react";
import { useAuthContext } from "@/context/AuthContext";

export default function BottomNavbar() {
  const pathname = usePathname()
  const { user, isAuthenticated } = useAuthContext();
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around h-16 bg border-t-1 border-gray-700 ">
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
      {
        isAuthenticated && user ? (
          <Link
        href="/profile"
        className={`flex flex-col items-center justify-center w-full h-full btn-press ${pathname === "/profile" ? "text-primary" : "text-muted-foreground"}`}
      >
        <User className="w-5 h-5" />
        <span className="text-xs mt-1">Perfil</span>
      </Link>) : null
      }
      {
        !isAuthenticated ? (
          <Link
        href="/auth/login"
        className={`flex flex-col items-center justify-center w-full h-full btn-press ${pathname === "auth/login" ? "text-primary" : "text-muted-foreground"}`}
      >
        <LogIn className="w-5 h-5" />
        <span className="text-xs mt-1">Login</span>
      </Link>  ) : null
      }
    </nav>
  )
}