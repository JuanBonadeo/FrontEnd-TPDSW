"use client";

import { useApi } from "@/hooks/useApi.js";
import { useState } from "react";

interface Props {
  idMovie: number;
}
interface watched {

    watched: boolean;
}

export function WatchButton({ idMovie }: Props) {
  const [watchedState, setWatched] = useState(false);

    const { data, error, loading } = useApi<watched>(
    `/watched/isWatched/${idMovie}`,
    { requireAuth: true }
  );

//Crear el endpoint, me voy a dormir. Buenas noches

}