"use client";


import { Settings, UserCog, LogOut } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { calcAge } from "../actors/detail/ActorDetail"
import { useAuth } from "@/hooks/useAuth"; // Asegúrate de que esta sea la ruta correcta
import { User } from "@/lib/types";
import { getAvatarUrl } from "@/app/(home)/profile/edit/EditProfileClient";

interface Props {
  user: User
}

export function ProfileHeader({ user }: Props) {
  const age = calcAge(user?.birth_date)
  const { logout } = useAuth();
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);


  // Cerrar menú cuando se hace click fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowSettingsMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setShowSettingsMenu(false);
  };

  return (
    <div className="space-y-4 mb-0">
      <div className="relative">
        <div className="h-32 bg-gradient-to-r from-red-600 to-red-950 rounded-lg" />
        <div className="absolute -bottom-16 left-4 border-4 border-background rounded-full">
          <div className="w-32 h-32 relative flex shrink-0 overflow-hidden rounded-full">
            <Image
              height={100}
              width={100}
              className="aspect-square h-full w-full"
              src={getAvatarUrl(user.image || "avatar")}
              alt={user.name}
            />
          </div>
        </div>

        {/* Botón de Settings con menú desplegable */}
        <div className="absolute top-4 right-4" ref={menuRef}>
          <button
            onClick={() => setShowSettingsMenu(!showSettingsMenu)}
            className="p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors"
          >
            <Settings className="w-5 h-5" />
          </button>

          {/* Menú desplegable */}
          {showSettingsMenu && (
            <div className="absolute top-full right-0 mt-2 bg border border-border rounded-lg shadow-lg py-2 min-w-[180px] z-50">
              {/* Flecha hacia arriba */}
              <div className="absolute bottom-full right-4 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-border"></div>
              <div className="absolute bottom-full right-4 translate-y-[1px] w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-background"></div>

              <Link
                href="/profile/edit"
                className="flex items-center gap-3 px-4 py-3 hover:opacity-70 transition-colors text-sm"
                onClick={() => setShowSettingsMenu(false)}
              >
                <UserCog className="w-4 h-4" />
                <span>Editar Perfil</span>
              </Link>

              <div className="border-t border-border mx-2 my-1"></div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 hover:opacity-70 transition-colors w-full text-left text-sm text-destructive hover:text-destructive cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="pt-16 space-y-3">
        <div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <div className="flex gap-1 justify-start items-center ">
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <span> -  {age} años</span>
          </div>
        </div>
        {user.bio && <p className="text-sm text-muted-foreground"><b>Bio:</b> {user.bio}</p>}
      </div>
    </div>
  )
}