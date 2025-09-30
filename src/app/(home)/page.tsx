// app/movies/page.tsx
import { Suspense } from "react";
import { Banner } from "@/components/ui/Banner/Banner";
import MoviesGridSkeleton from "@/components/movies/Grid/MoviesGridSkeleton";
import { MoviesGrid } from "@/components/movies/Grid/MoviesGrid";
import { Pagination } from "@/components/ui/pagination/Pagintation";
import MoviesGridServer from "./MoviesGridServer";
import CarrouselServer from "./CarrouselServer";
import { CarruselSkeleton } from "@/components/ui/Carrusel/CarruselSkeleton";

interface SearchParams {
  page?: string;
}
interface Props {
  searchParams: Promise<SearchParams>;
}
export default async function Page({ searchParams }: Props) {
  const { page } = await searchParams;
  const pageInt = Number(page ?? "1") || 1;

  return (
    <>
      <Banner />
      <Suspense fallback={<CarruselSkeleton />}>
        <CarrouselServer
          ids={[178, 293, 244, 67, 34]}
          title="Películas en Tendencia"
          autoPlayMs={5000}
        />
      </Suspense>
      
      <Suspense fallback={<MoviesGridSkeleton />}>
        <MoviesGridWithPagination page={pageInt} limit={30} />
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
