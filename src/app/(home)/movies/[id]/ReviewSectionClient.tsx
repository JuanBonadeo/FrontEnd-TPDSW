"use client";
import { ReviewSection } from "@/components/reviews/ReviewSection";
import { ReviewSectionSkeleton } from "@/components/reviews/ReviewSectionSkeleton";
import { useReviewsByMovieId } from "@/hooks/useReviewsByMovieId";


export default function ReviewSectionClient({ id }: { id: string }) {
 const { reviews, loading, error } = useReviewsByMovieId(id);

  if (loading) return <ReviewSectionSkeleton />;
  if (error) return <p>Error: {error} </p>;
  if (!reviews.length && !loading && !error) return <p>Sin reseñas todavía.</p>;
  return <ReviewSection  reviews={reviews} />;
}
