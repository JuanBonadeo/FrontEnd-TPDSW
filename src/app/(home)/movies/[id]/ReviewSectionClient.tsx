"use client";
import { ReviewSection } from "@/components/reviews/ReviewSection";
import { ReviewSectionSkeleton } from "@/components/reviews/ReviewSectionSkeleton";
import { useApi } from "@/hooks/useApi";
import { Review } from "@/lib/types";
import { notFound } from "next/navigation.js";


export default function ReviewSectionClient({ id }: { id: string }) {
  const endpoint = id ? `/reviews/movie/${id}` : null;
  const { data: reviews, loading, error, errorCode} = useApi<Review[]>(endpoint);

  if ( errorCode === "NOT_FOUND") return notFound()
  if (loading) return <ReviewSectionSkeleton />;
  if (error) return <p>Error: {error} </p>;
  if (!reviews || reviews.length === 0) return <p>No reviews found.</p>;
  return <ReviewSection reviews={reviews} />;
}
