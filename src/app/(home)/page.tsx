// app/movies/page.tsx
import Carrusel from "@/components/ui/Carrusel/Carrusel";
import { metadata } from "./layout.jsx";
import MoviesClient from "./MoviesClient";
// import Carousel from '../../components/ui/Carrusel/Carrusel';


export default function Page({ searchParams }: { searchParams?: { page?: string } }) {
  const page = Number(searchParams?.page ?? "1") || 1;

  return (
    <>
      <Carrusel ids={[10, 2, 8, 7, 5]} autoPlayMs={10000} />

      <MoviesClient page={page} limit={30} />
    </>
  );
}
