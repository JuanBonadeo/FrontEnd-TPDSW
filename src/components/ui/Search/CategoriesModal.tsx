"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useApi } from "@/hooks/useApi";
import { Category } from "@/lib/types";
import clsx from "clsx";
import { Filter, X } from "lucide-react";

interface Props {
  currentCategoryId?: string;
}

export const CategoriesModal = ({ currentCategoryId }: Props) => {
  const [open, setOpen] = useState(false);
  const { data: categories, loading, error } = useApi<Category[]>("/categories");
  const searchParams = useSearchParams();

  const createCategoryUrl = (categoryId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("categoryId", categoryId);
    params.delete("page");
    return `/search?${params.toString()}`;
  };

  const createAllUrl = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("categoryId");
    params.delete("page");
    return `/search?${params.toString()}`;
  };

  return (
    <>
      {/* Botón para abrir */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center justify-center  group relative overflow-hidden bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-2 px-1 md:px-6 md:py-3 rounded-md font-medium transition-all duration-300 transform hover:scale-102 hover:shadow-lg active:scale-95"
      >
        <Filter className="w-4 h-4 md:w-5 md:h-5 mr-2  group-hover:rotate-360 transition-transform duration-600" />
        <span className="text-xs">Categorias</span>
        <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-600"></div>
      </button>

      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          {/* Modal */}
          <div className="relative bg-background rounded-xl shadow-lg w-[90%] max-w-3xl p-6 animate-in fade-in zoom-in-95">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Selecciona una categoría</h2>
              <button
                onClick={() => setOpen(false)}
                className="text-muted-foreground hover:text-foreground transition cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Loading */}
            {loading && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-20 animate-pulse rounded-lg bg-muted"
                  />
                ))}
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="text-center text-sm text-red-500 mt-4">
                Error al cargar categorías
              </div>
            )}

            {/* Categorías */}
            {categories && categories.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {/* Todas */}
                <Link
                  href={createAllUrl()}
                  onClick={() => setOpen(false)}
                  className={clsx(
                    "flex flex-col items-center justify-center rounded-lg border p-4 text-center font-medium transition hover:scale-105",
                    !currentCategoryId
                      ? "bg-red-600 from-primary to-primary/90 text-primary-foreground shadow-md"
                      : "bg-muted/30 text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  Todas
                </Link>

                {/* Cada categoría */}
                {categories.map((category) => (
                  <Link
                    key={category.id_category}
                    href={createCategoryUrl(category.id_category.toString())}
                    onClick={() => setOpen(false)}
                    className={clsx(
                      "flex flex-col items-center justify-center rounded-lg border p-4 text-center font-medium transition",
                      currentCategoryId === category.id_category.toString()
                        ? "bg-red-600 to-primary/90 text-primary-foreground shadow-md"
                        : "bg-muted/30 text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            )}

            {/* Empty */}
            {categories && categories.length === 0 && !loading && (
              <div className="text-center text-muted-foreground mt-4">
                No hay categorías disponibles
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
