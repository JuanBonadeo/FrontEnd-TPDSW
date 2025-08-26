// app/(home)/movies/[id]/page.tsx
import MovieDetailClient from "./MovieDetailClient";
import ReviewSectionClient from "./ReviewSectionClient";

type PageProps = { params: { id: string } };

export default async function MovieDetailPage({ params }: PageProps) {
  const { id } = await  params;
  return (
    <>
      <MovieDetailClient id={id} />
      <ReviewSectionClient id={id} />
    </>
  );
}
