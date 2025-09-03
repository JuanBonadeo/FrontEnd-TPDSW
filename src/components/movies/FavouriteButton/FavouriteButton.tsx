// components/FavouriteButton.tsx
// "use client";

// import { useMemo } from "react";
// import { Heart } from "lucide-react";
// import { useApi } from "@/hooks/useApi";
// import type { ApiResponse, Favourite } from "@/lib/types";
// import clsx from "clsx";
// import { notFound } from "next/navigation";

// interface Props {
//   idMovie: number;
// }

// export const FavouriteButton = ({ idMovie }: Props) => {
//   // Tu hook siempre devuelve { success, message, data }
//   const { data: favourites, error, loading } = useApi<ApiResponse<Favourite[]>>("/favourites");

//     if (favourites === null) {
//     return notFound() // o un spinner, o un mensaje de error, lo que prefieras
//   }

//   // ¿Esta peli está en favoritos?
//   const isFavourite = useMemo(
//     () => favourites.some((f) => f.id_movie === idMovie),
//     [favourites, idMovie]
//   );

//   return (
//     <button
//       type="button"
//       disabled={loading}
//       aria-pressed={isFavourite}
//       className={clsx(
//         "flex items-center justify-center rounded-md py-2 px-3 transition-colors cursor-pointer",
//         isFavourite ? "bg-red-700" : "bg-red-600 hover:bg-red-700",
//         loading && "opacity-70 cursor-not-allowed"
//       )}
//       // TODO: acá podés hacer el toggle con POST/DELETE cuando tengas esos endpoints
//       onClick={() => {
//         if (loading) return;
//         // implementar toggle cuando tengas /favourites (POST) y /favourites/:id (DELETE)
//       }}
//       title={error ? "No se pudieron cargar tus favoritos" : isFavourite ? "Quitar de favoritos" : "Agregar a favoritos"}
//     >
//       <Heart
//         className={clsx("w-4 h-4 mr-2", isFavourite ? "fill-current" : "fill-transparent")}
//       />
//       {loading ? "Cargando…" : isFavourite ? "En favoritos" : "Favorito"}
//     </button>
//   );
// };
