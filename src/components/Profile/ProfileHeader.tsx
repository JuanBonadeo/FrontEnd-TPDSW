"use client";


import { Settings, UserCog, LogOut, Waypoints } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useRef, useEffect, useMemo } from 'react';
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
              {user?.role === "ADMIN" && (
                <>
                  <div className="border-t border-border mx-2 my-1"></div>
                  <Link
                    href="/admin/users"
                    className="flex items-center gap-3 px-4 py-3 hover:opacity-70 transition-colors text-sm"
                    onClick={() => setShowSettingsMenu(false)}
              >
                <Waypoints className="w-4 h-4" />
                <span>Admin Panel</span>
              </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="pt-16 space-y-3">
        <div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <div className="flex gap-1 justify-start items-center ">
            <p className="text-sm text-muted-foreground">{user.email} -  {age} años</p>
           
          </div>
        </div>
        {user.bio && <p className="text-sm text-muted-foreground"><b className="text-white">Bio:</b> {user.bio}</p>}
      </div>
    </div>
  )
}