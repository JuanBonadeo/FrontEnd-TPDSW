// app/(home)/movies/[id]/page.tsx
import MovieDetailClient from "./MovieDetailClient";
import ReviewSectionClient from "./ReviewSectionClient";

type PageProps = { params: { id: string } };

export default function MovieDetailPage({ params }: PageProps) {
  const id = params.id;
  return (
    <>
      <MovieDetailClient id={id} />
      <ReviewSectionClient id={id} />
    </>
  );
}
