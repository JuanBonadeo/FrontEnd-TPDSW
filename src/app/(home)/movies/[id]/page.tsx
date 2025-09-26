// app/(home)/movies/[id]/page.tsx
import { MovieDetailSkeleton } from "@/components/movies/Detail/MovieDetailSkeleton";
import MovieDetailServer from "./MovieDetailServer";
import MovieDetailClient from "./MovieDetailServer";
import ReviewSectionClient from "./ReviewSectionClient";
import { Suspense } from "react";

type PageProps = { 
  params: Promise<{ id: string }>;
};

export const revalidate = 60 * 60 * 24 * 7; // 7 días

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
