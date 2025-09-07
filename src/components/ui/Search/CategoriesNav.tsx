"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import clsx from "clsx";
import { useApi } from "@/hooks/useApi";
import { Category } from "@/lib/types";

interface Props {
  currentCategoryId?: string;
}

export const CategoriesNav = ({ currentCategoryId }: Props) => {
  const { data: categories, loading, error } = useApi<Category[]>("/categories");
  const searchParams = useSearchParams();

  const createCategoryUrl = (categoryId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("categoryId", categoryId);
    params.delete("page"); // Reset page when changing category
    return `/search?${params.toString()}`;
  };

  const createAllUrl = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("categoryId");
    params.delete("page");
    return `/search?${params.toString()}`;
  };

  if (loading) {
    return (
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-16 animate-pulse rounded-full bg-muted"></div>
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-8 w-20 animate-pulse rounded-full bg-muted"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center text-sm text-muted-foreground">
            Error al cargar categorías
          </div>
        </div>
      </div>
    );
  }

  if (!categories || categories.length === 0) return null;

  return (
    <div className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide p-2">
          {/* Opción "Todas" */}
          <Link
            href={createAllUrl()}
            className={clsx(
              "flex-shrink-0 inline-flex items-center justify-center rounded-full px-2 py-1 text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95",
              !currentCategoryId
                ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-md shadow-primary/25 ring-2 ring-primary/20"
                : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground border border-muted-foreground/20"
            )}
          >
            <span className="flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
              Todas
            </span>
          </Link>

          {/* Separador visual */}
          <div className="h-6 w-px bg-border flex-shrink-0 mx-2 " />

          {/* Categorías */}
          {categories.map((category) => (
            <Link
              key={category.id_category}
              href={createCategoryUrl(category.id_category.toString())}
              className={clsx(
                "flex-shrink-0 inline-flex items-center justify-center rounded-full px-2 py-1 text-sm font-medium transition-all duration-200 hover:scale-101 active:scale-95 relative overflow-hidden",
                currentCategoryId === category.id_category.toString()
                  ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-md shadow-primary/25 ring-2 ring-primary/20"
                  : "bg-muted/30 text-muted-foreground hover:bg-muted hover:text-foreground border border-muted-foreground/20 hover:border-muted-foreground/40"
              )}
            >
              <span className="relative z-10 truncate max-w-[120px]">
                {category.name}
              </span>
              
              {/* Efecto hover */}
              {currentCategoryId !== category.id_category.toString() && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
              )}
            </Link>
          ))}
        </div>

        {/* Indicador de scroll horizontal en móviles */}
        <div className="flex justify-center mt-3 md:hidden">
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-muted-foreground/30"></div>
            <div className="w-2 h-2 rounded-full bg-muted-foreground/30"></div>
            <div className="w-2 h-2 rounded-full bg-muted-foreground/30"></div>
          </div>
        </div>
      </div>

      {/* Gradiente de fade en los bordes para indicar scroll */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
    </div>
  );
};