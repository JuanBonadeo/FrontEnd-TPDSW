
import { metadata } from "@/app/layout.jsx";
import { MovieDetail } from "@/components/movies/Detail/MovieDetail";
import { ReviewSection } from "@/components/reviews/ReviewSection";



type PageProps = {
  params: { id: string };
};

export default async function MovieDetailPage({ params }: PageProps) {
  const id = params.id; 

  return (
    <div className="mx-auto">
      <MovieDetail id={id} />
      <ReviewSection id={id} />
    </div>
  );
}


