"use client";

import { Heart } from "lucide-react";
import { useApi } from "@/hooks/useApi";
import type { Favourite } from "@/lib/types";
import clsx from "clsx";
import { useEffect, useState } from "react";


interface Props {
  idMovie: number;
}

export function FavouriteButton({ idMovie }: Props) {

  const { data: isFavourite, error, loading } = useApi<Boolean>("/favourites/isFavourite/" + idMovie,
    { requireAuth: true }
  )

  const [isFavouriteState, setIsFavourite] = useState(isFavourite);



  const { execute, loading: Loading2, error: error2 } = useApi<Favourite>(
    "/favourites/toggle",
    { method: "PUT", requireAuth: true, body: { id_movie: idMovie } }
  );

  const handleToggle = () => {
    setIsFavourite(!isFavouriteState)
    execute()
  }

  if (error) return <div>Error loading favourite status: {error}</div>;
  if (loading) return <div>Loading favourite status...</div>;
  if (!isFavourite) return <div>No favourite data found</div>;

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
      onClick={() => { handleToggle() }}
      title={error ? "No se pudieron cargar tus favoritos" : isFavouriteState ? "Quitar de favoritos" : "Agregar a favoritos"}
    >
      <Heart
        className={"w-4 h-4 mr-2"}
        fill={isFavouriteState ? "white" : "transparent"}
      />
      {loading ? "Cargando…" : isFavouriteState ? "En favoritos" : "Agregar a Favoritos"}
    </button>
  );
};
