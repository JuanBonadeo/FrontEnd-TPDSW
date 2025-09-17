import { AdminReviewClient } from "./AdminReviewClient";

export default async function ReviewsPage({ searchParams }: { searchParams?: { page?: string } }  ) {
  const params = await searchParams; 
  const page = Number(params?.page ?? "1") || 1;
  return (
    <AdminReviewClient page={page} limit={10} />
  );
}
