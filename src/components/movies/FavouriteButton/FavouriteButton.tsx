"use client";

import { Heart } from "lucide-react";
import { useApi } from "@/hooks/useApi";
import type { Favourite } from "@/lib/types";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import Link from "next/link.js";

interface Props {
  idMovie: number;
}
interface IsFavourite {

  isFavourite: boolean;
}

export function FavouriteButton({ idMovie }: Props) {
  const [isFavouriteState, setIsFavourite] = useState(false);
  const { isAuthenticated } = useAuthContext();

  const { data, error, loading } = useApi<IsFavourite>(
    `/favourites/isFavourite/${idMovie}`,
    { requireAuth: true }
  );

  useEffect(() => {
    if (data) {
      setIsFavourite(data.isFavourite);
    }
  }, [data]);

  const { execute } = useApi<Favourite>("/favourites/toggle", {
    method: "PUT",
    requireAuth: true,
    body: { id_movie: idMovie },

  });

  if (!isAuthenticated) return (
    <Link href="/auth/login" className={"flex items-center justify-center group relative overflow-hidden bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800  py-2 px-1 md:px-6 md:py-3 rounded-md font-medium transition-all duration-300 transform hover:scale-102 hover:shadow-lg active:scale-95"}>
      <Heart className={"w-4 h-4 md:w-5 md:h-5 mr-2  group-hover:rotate-360 transition-transform duration-600"} />
      <span className="text-xs">A Favoritos</span>
      <div className="absolute inset-0 bg-white/30 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-600"></div>
    </Link>
  );

  const handleToggle = () => {
    setIsFavourite(!isFavouriteState);
    execute();
  };

  if (error) return <div>Error loading favourite status: {error}</div>;

  return (
    <button
      type="button"
      disabled={loading}
      className={clsx(
        "flex items-center justify-center group relative overflow-hidden bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 py-2 px-1 md:px-6 md:py-3 rounded-md font-medium transition-all duration-300 transform hover:scale-102 hover:shadow-lg active:scale-95",
        loading && "opacity-70 cursor-not-allowed"
      )}
      
      onClick={() => {
        handleToggle();
      }}
    >
      <Heart
        className={"w-4 h-4 md:w-5 md:h-5 mr-2  group-hover:rotate-360 transition-transform duration-600"}
        fill={isFavouriteState ? "white" : "transparent"}
      />
      <span className="text-xs">{loading ? "Cargando…" : isFavouriteState ? "En Favoritos" : "A Favoritos"}</span>
      <div className="absolute inset-0 bg-white/30 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-600"></div>
    </button>
  );
}
