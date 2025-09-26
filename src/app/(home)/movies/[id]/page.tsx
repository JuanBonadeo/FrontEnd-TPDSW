// app/(home)/movies/[id]/page.tsx
export const revalidate = 604800; // 7 días son 604800 segundos

import { MovieDetailSkeleton } from "@/components/movies/Detail/MovieDetailSkeleton";
import MovieDetailServer from "./MovieDetailServer";  
import ReviewSectionClient from "./ReviewSectionClient";
import { Suspense } from "react";

type PageProps = { 
  params: Promise<{ id: string }>;
};


export async function generateStaticParams() {
  return Array.from({ length: 200 }, (_, i) => ({
    id: String(i + 1),
  }));
}


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
