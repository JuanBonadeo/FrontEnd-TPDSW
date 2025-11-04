// app/(home)/movies/[id]/page.tsx


import { MovieDetailSkeleton } from "@/components/movies/Detail/MovieDetailSkeleton";
import MovieDetailServer from "./MovieDetailServer";  
import ReviewSectionClient from "./ReviewSectionClient";
import { Suspense } from "react";

type PageProps = { 
  params: Promise<{ id: string }>;
};



export default async function MovieDetailPage({ params }: PageProps) {
  const { id } = await  params;
  return (
    <>
      <Suspense fallback={<MovieDetailSkeleton />}>
        <MovieDetailServer id={id} />
      </Suspense>
      <ReviewSectionClient id={id} />
    </>
  );
}
