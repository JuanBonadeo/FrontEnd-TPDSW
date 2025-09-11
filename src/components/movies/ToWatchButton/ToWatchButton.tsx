"use client";

import { useApi } from "@/hooks/useApi";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import {  Plus, Minus } from "lucide-react";
import { clsx } from "clsx";
import Link from "next/link.js";

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
    <Link href="/auth/login" className={"flex items-center justify-center group relative overflow-hidden bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 py-2 px-1 md:px-6 md:py-3 rounded-md font-medium transition-all duration-300 transform hover:scale-102 hover:shadow-lg active:scale-95"}>
      <Plus className={"w-4 h-4 md:w-5 md:h-5 mr-2 group-hover:rotate-360 transition-transform duration-600"} />
      <span className="text-xs">No Favorita</span>
      <div className="absolute inset-0 bg-white/30 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-600"></div>
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
        "flex items-center justify-center group relative overflow-hidden bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 py-2 px-1 md:px-6 md:py-3 rounded-md font-medium transition-all duration-300 transform hover:scale-102 hover:shadow-lg active:scale-95",
        loading && "opacity-70 cursor-not-allowed"
      )}
      onClick={() => {
        handleToggle();
      }}
    >

      {toWatchState ? (
        <Minus className="w-4 h-4 md:w-5 md:h-5 mr-2 group-hover:rotate-360 transition-transform duration-600" />
      ) : (
        <Plus className="w-4 h-4 md:w-5 md:h-5 mr-2 group-hover:rotate-360 transition-transform duration-600" />
      )}
      <span className="text-xs">{loading ? "Cargando…" : "Watchlist"}</span>
      <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-600"></div>
    </button>
  );
}