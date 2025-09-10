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
      <Link href="/auth/login" className={"flex items-center justify-center rounded-md py-2 w-xl transition-colors cursor-pointer bg-red-600 hover:bg-red-700"}>
        <Heart className={"w-4 h-4 mr-2"} />
        Agregar a favoritos
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
        "flex items-center justify-center rounded-md py-2 w-xl transition-colors cursor-pointer",
        "bg-red-600 hover:bg-red-700",
        loading && "opacity-70 cursor-not-allowed"
      )}
      // TODO: acá podés hacer el toggle con POST/DELETE cuando tengas esos endpoints
      onClick={() => {
        handleToggle();
      }}
      title={
        error
          ? "No se pudieron cargar tus favoritos"
          : isFavouriteState
            ? "Quitar de favoritos"
            : "Agregar a favoritos"
      }
    >
      <Heart
        className={"w-4 h-4 mr-2"}
        fill={isFavouriteState ? "white" : "transparent"}
      />
      {loading
        ? "Cargando…"
        : isFavouriteState
          ? "En favoritos"
          : "Agregar a Favoritos"}
    </button>
  );
}
