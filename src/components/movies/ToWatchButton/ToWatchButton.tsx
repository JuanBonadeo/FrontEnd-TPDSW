"use client";

import { useApi } from "@/hooks/useApi";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import {  Plus, Minus } from "lucide-react";
import clsx from "clsx";
import { useRouter } from "next/navigation";

interface Props {
  idMovie: number;
}
interface toWatch {
  isToWatch: boolean;
}

export function ToWatchButton({ idMovie }: Props) {
  const [toWatchState, setToWatch] = useState(false);
  const { isAuthenticated } = useAuthContext();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  const { data, error, loading } = useApi<toWatch>(
    `/to-watch/isToWatch/${idMovie}`,
    { requireAuth: true }
  );

  useEffect(() => {
    if (data) {
      setToWatch(data.isToWatch);
    }
  }, [data]);

  useEffect(() => {
    setMounted(true);
  }, []);


  const { execute } = useApi<toWatch>("/to-watch/toggle", {
    method: "PUT",
    requireAuth: true,
    body: { id_movie: idMovie },
  });

  // Ensure the first render matches on server and client
  if (!mounted) {
    return (
      <button
        type="button"
        disabled
        className={"flex items-center justify-center group relative overflow-hidden bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 py-2 px-1 md:px-6 md:py-3 rounded-md font-medium transition-all duration-300 transform hover:scale-102 hover:shadow-lg active:scale-95 opacity-70 cursor-not-allowed"}
      >
        <Plus className={"w-4 h-4 md:w-5 md:h-5 mr-2 group-hover:rotate-360 transition-transform duration-600"} />
        <span className="text-xs">Cargando…</span>
        <div className="absolute inset-0 bg-white/30 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-600"></div>
      </button>
    );
  }

  if (!isAuthenticated)
    return (
      <button
        type="button"
        onClick={() => router.push("/auth/login")}
        className={"flex items-center justify-center group relative overflow-hidden bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 py-2 px-1 md:px-6 md:py-3 rounded-md font-medium transition-all duration-300 transform hover:scale-102 hover:shadow-lg active:scale-95"}
      >
        <Plus className={"w-4 h-4 md:w-5 md:h-5 mr-2 group-hover:rotate-360 transition-transform duration-600"} />
        <span className="text-xs">Watchlist</span>
        <div className="absolute inset-0 bg-white/30 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-600"></div>
      </button>
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