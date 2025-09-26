// app/movies/page.tsx
import { Suspense } from "react";
import { Banner } from "@/components/ui/Banner/Banner";
import MoviesGridSkeleton from "@/components/movies/Grid/MoviesGridSkeleton";
import { MoviesGrid } from "@/components/movies/Grid/MoviesGrid";
import { Pagination } from "@/components/ui/pagination/Pagintation";
import MoviesGridServer from "./MoviesGridServer";
import CarrouselServer from "./CarrouselServer";
import { CarruselSkeleton } from "@/components/ui/Carrusel/CarruselSkeleton";

export default function Page({ searchParams }: { searchParams?: { page?: string } }) {
  const page = Number(searchParams?.page ?? "1") || 1;

  return (
    <>
      <Banner />
      <Suspense fallback={<CarruselSkeleton />}>
        <CarrouselServer
          ids={[189, 303, 255, 21, 68]}
          title="Películas en Tendencia"
          autoPlayMs={5000}
        />
      </Suspense>
      
      <Suspense fallback={<MoviesGridSkeleton />}>
        <MoviesGridWithPagination page={page} limit={30} />
      </Suspense>
    </>
  );
}

async function MoviesGridWithPagination({ page, limit }: { page: number; limit: number }) {
  const { movies, totalPages } = await MoviesGridServer({ page, limit });
  return (
    <>
      <MoviesGrid movies={movies} title="Todas las películas" />
      <Pagination totalPages={totalPages} /> {/* client, pero datos ya resueltos */}
    </>
  );
}
