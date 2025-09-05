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
  const { data: categories, loading, error} = useApi<Category[]>("/categories");
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
  if (loading) return <div>Cargando categorías...</div>;
  if (error) return <div>Error al cargar categorías</div>;
  if (!categories || categories.length === 0) return null;
  
  return (
    <div className="border-b">
      <div className="grid grid-cols-7 items-center max-w-4xl  pb-2">
        {/* Opción "Todas" */}
        <Link
          href={createAllUrl()}
          className={clsx(
            "flex-shrink-0 text-center rounded-full px-4 py-2 text-sm font-medium transition-colors",
            !currentCategoryId
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          )}
        >
          Todas
        </Link>

        {/* Categorías */}
        {categories.map((category) => (
          <Link
            key={category.id_category}
            href={createCategoryUrl(category.id_category.toString())}
            className={clsx(
              "flex-shrink-0 text-center rounded-full px-2 py-2 text-sm font-medium transition-colors",
              currentCategoryId === category.id_category.toString()
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
};