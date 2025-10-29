"use client";

import { Heart } from "lucide-react";
import { useApi } from "@/hooks/useApi";
import type { Favourite } from "@/lib/types";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface Props {
  idMovie: number;
}

interface IsFavourite {
  isFavourite: boolean;
}

export function FavouriteButton({ idMovie }: Props) {
  const router = useRouter();
  const { isAuthenticated } = useAuthContext();
  const [mounted, setMounted] = useState(false);
  const [isFavouriteState, setIsFavourite] = useState(false);

  const { data, error, loading } = useApi<IsFavourite>(
    `/favourites/isFavourite/${idMovie}`,
    { requireAuth: true }
  );

  const { execute } = useApi<Favourite>("/favourites/toggle", {
    method: "PUT",
    requireAuth: true,
    body: { id_movie: idMovie },
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (data) {
      setIsFavourite(data.isFavourite);
    }
  }, [data]);

  const handleToggle = () => {
    setIsFavourite(!isFavouriteState);
    execute();
  };

  // Ensure the first render matches on server and client
  if (!mounted) {
    return (
      <button
        id="add-favourite"
        type="button"
        disabled
        className="flex items-center justify-center group relative overflow-hidden bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 py-2 px-1 md:px-6 md:py-3 rounded-md font-medium transition-all duration-300 transform hover:scale-102 hover:shadow-lg active:scale-95 opacity-70 cursor-not-allowed"
      >
        <Heart 
          className="w-4 h-4 md:w-5 md:h-5 mr-2 group-hover:rotate-360 transition-transform duration-600" 
          fill="none" 
        />
        <span className="text-xs">Cargando…</span>
        <div className="absolute inset-0 bg-white/30 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-600"></div>
      </button>
    );
  }

  if (!isAuthenticated) {
    return (
      <button
        id="add-favourite"
        type="button"
        onClick={() => router.push("/auth/login")}
        className="flex items-center justify-center group relative overflow-hidden bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 py-2 px-1 md:px-6 md:py-3 rounded-md font-medium transition-all duration-300 transform hover:scale-102 hover:shadow-lg active:scale-95"
      >
        <Heart 
          className="w-4 h-4 md:w-5 md:h-5 mr-2 group-hover:rotate-360 transition-transform duration-600" 
          fill="none" 
        />
        <span className="text-xs">A Favoritos</span>
        <div className="absolute inset-0 bg-white/30 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-600"></div>
      </button>
    );
  }

  if (error) return <div>Error loading favourite status: {error}  </div>;

  return (
    <button
      id="add-favourite"
      type="button"
      disabled={loading}
      className={clsx(
        "flex items-center justify-center group relative overflow-hidden bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 py-2 px-1 md:px-6 md:py-3 rounded-md font-medium transition-all duration-300 transform hover:scale-102 hover:shadow-lg active:scale-95",
        loading && "opacity-70 cursor-not-allowed"
      )}
      onClick={handleToggle}
    >
      <Heart
        className="w-4 h-4 md:w-5 md:h-5 mr-2 group-hover:rotate-360 transition-transform duration-600"
        fill={isFavouriteState ? "white" : "none"}
      />
      <span className="text-xs">
        {loading ? "Cargando…" : isFavouriteState ? "En Favoritos" : "A Favoritos"}
      </span>
      <div className="absolute inset-0 bg-white/30 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-600"></div>
    </button>
  );
}