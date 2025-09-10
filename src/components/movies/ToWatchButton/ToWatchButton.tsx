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
      <Link href="/auth/login" className={"flex items-center justify-center rounded-md py-2 w-xl transition-colors cursor-pointer bg-red-600 hover:bg-red-700"}>
        <Plus className={"w-4 h-4 mr-2"} />
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
        "flex items-center justify-center rounded-md py-2 px-4 w-full transition-colors cursor-pointer",
        " bg-stone-900 hover:bg-stone-800",
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
      {toWatchState ? (
        <Minus className="w-4 h-4 mr-2" />
      ) : (
        <Plus className="w-4 h-4 mr-2" />
      )}
      {loading
        ? "Cargando…"
        : toWatchState
          ? "Quitar de Watchlist"
          : "Agregar a Watchlist"}
    </button>
  );
}