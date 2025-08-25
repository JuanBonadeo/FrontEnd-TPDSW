"use client";
import { ReviewSection } from "@/components/reviews/ReviewSection";
import { useReviewsByMovieId } from "@/hooks/useReviewsByMovieId";

export default function ReviewSectionClient({ id }: { id: string }) {
 const { reviews, loading, error } = useReviewsByMovieId(id);

  if (loading) return <p>Cargando reseñas...</p>;
  if (error) return <p>Error: {error} </p>;
  if (!reviews.length) return <p>Sin reseñas todavía.</p>;
  return <ReviewSection  reviews={reviews} />;
}
