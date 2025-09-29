import FetchMoviesButton from "@/components/admin/FetchMoviesButton";
import { AdminMoviesClient } from "./AdminMoviesClient";

export default async function MoviesPage({ searchParams }: { searchParams?: { page?: string } }  ) {
  const params = await searchParams; 
  const page = Number(params?.page ?? "1") || 1;
  return (
    <>
      <AdminMoviesClient page={page} limit={10} />
      <FetchMoviesButton />
    </>
  );
}