// app/movies/page.tsx
import Carrusel from "@/components/ui/Carrusel/Carrusel";
import MoviesClient from "./MoviesClient";
import { Banner } from "@/components/ui/Banner/Banner";




export default async function Page({ searchParams }: { searchParams?: { page?: string } }) {
  const params = await searchParams; 
  const page = Number(params?.page ?? "1") || 1;

  return (
    <>
      <Banner />
      <Carrusel ids={[189, 303, 255, 21, 68]} autoPlayMs={10000} />

      <MoviesClient page={page} limit={30} />
    </>
  );
}
