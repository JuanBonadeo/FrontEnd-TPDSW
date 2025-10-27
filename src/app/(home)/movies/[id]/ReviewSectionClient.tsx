"use client";
import { ReviewSection } from "@/components/reviews/ReviewSection";
import { ReviewSectionSkeleton } from "@/components/reviews/ReviewSectionSkeleton";
import { useApi } from "@/hooks/useApi";
import { Review } from "@/lib/types";
import { notFound } from "next/navigation.js";
import { useEffect } from "react";


export default function ReviewSectionClient({ id }: { id: string }) {
  const endpoint = id ? `/reviews/movie/${id}` : null;
  const { data: reviews, loading, error, errorCode, execute } = useApi<Review[]>(endpoint);

  // Listen for client-side 'review-created' events so we can re-fetch reviews immediately
  useEffect(() => {
    const onReviewCreated = (e: Event) => {
      try {
        // only refresh if the event's id matches this section
        const detail = (e as CustomEvent)?.detail;
        if (!detail) return;
        if (String(detail.idMovie) === String(id)) {
          // call the hook's execute to re-fetch reviews
          void execute();
        }
      } catch (err) {}
    };

    window.addEventListener('review-created', onReviewCreated as EventListener);
    return () => window.removeEventListener('review-created', onReviewCreated as EventListener);
  }, [id]);

  if ( errorCode === "NOT_FOUND") return notFound()
  if (loading) return <ReviewSectionSkeleton />;
  if (error) return <p>Error: {error} </p>;
  if (!reviews || reviews.length === 0) return <p>No reviews found.</p>;
  return <ReviewSection reviews={reviews} />;
}
