"use client";

import { useApi } from "@/hooks/useApi";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { Link, Plus, Minus } from "lucide-react";
import { clsx } from "clsx";

interface Props {
  idMovie: number;
}
interface toWatch {
  isToWatch: boolean;
}

export function ToWatchButton({ idMovie }: Props) {
  const [toWatchState, setToWatch] = useState(false);
  const { isAuthenticated } = useAuthContext();

  const { data, error, loading } = useApi<toWatch>(
    `/to-watch/isToWatch/${idMovie}`,
    { requireAuth: true }
  );

  useEffect(() => {
    if (data) {
      setToWatch(data.isToWatch);
    }
  }, [data]);


  const { execute } = useApi<toWatch>("/to-watch/toggle", {
    method: "PUT",
    requireAuth: true,
    body: { id_movie: idMovie },
  });

  if (!isAuthenticated) return (
    <Link href="/auth/login" className={"flex items-center justify-center rounded-md py-2  transition-colors cursor-pointer bg-red-600 hover:bg-red-700"}>
      <Plus className={"w-5 h-5 mr-2"} />
    </Link>
  );

  const handleToggle = () => {
    setToWatch(!toWatchState);
    execute();
  };

  if (error) return <div>Error loading toWatch status: {error}</div>;

  return (
    <button
      type="button"
      disabled={loading}
      className={clsx(
        "flex items-center justify-center group relative overflow-hidden bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white px-6 py-3 rounded-md font-medium transition-all duration-300 transform hover:scale-102 hover:shadow-lg active:scale-95",
        loading && "opacity-70 cursor-not-allowed"
      )}


      onClick={() => {
        handleToggle();
      }}
      title={
        error
          ? "No se pudo cargar la Watchlist"
          : toWatchState
            ? "Quitar de la Watchlist"
            : "Agregar a la Watchlist"
      }
    >
      <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-600"></div>

      {toWatchState ? (
        <Minus className="w-5 h-5 mr-2 group-hover:rotate-360 transition-transform duration-600" />
      ) : (
        <Plus className="w-5 h-5 mr-2 group-hover:rotate-360 transition-transform duration-600" />
      )}
      {loading
        ? "Cargando…"
        : toWatchState
          ? "Quitar de Watchlist"
          : "Agregar a Watchlist"}
    </button>
  );
}