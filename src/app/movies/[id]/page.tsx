"use client";
import { MovieDetail } from "@/components/movies/Detail/MovieDetail";
import { ReviewSection } from "@/components/reviews/ReviewSection";
import { useParams } from "next/navigation";

export default function MovieDetailPage() {
  const params = useParams();

  const id =
    typeof params.id === "string"
      ? params.id
      : Array.isArray(params.id)
      ? params.id[0]
      : undefined;

  return (
    <div className=" mx-auto ">
      <MovieDetail id={id} />
       <ReviewSection id={id} />
      {/* <SimilarMovies id={id} />  */}
    </div>
  );
}