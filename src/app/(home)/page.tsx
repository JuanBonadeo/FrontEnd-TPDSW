// app/movies/page.tsx
import Carrusel from "@/components/ui/Carrusel/Carrusel";
import MoviesClient from "./MoviesClient";




export default async function Page({ searchParams }: { searchParams?: { page?: string } }) {
  const params = await searchParams; 
  const page = Number(params?.page ?? "1") || 1;

  return (
    <>
      <Carrusel ids={[10, 2, 8, 7, 5]} autoPlayMs={10000} />

      <MoviesClient page={page} limit={30} />
    </>
  );
}
