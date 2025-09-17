"use client"
import { ReviewsGrid } from '@/components/admin/ReviewsGrid';
import { Pagination } from '@/components/ui/pagination/Pagintation';
import { useAuthContext } from '@/context/AuthContext';
import { useApiPaginated } from '@/hooks/useApi';
import { Review } from '@/lib/types.js';
import { stringify } from 'querystring';

export const AdminReviewClient = ({ page, limit = 10 }: { page: number; limit: number }) => {
  const { user } = useAuthContext();
  const { data: reviews, pagination, loading } = useApiPaginated<Review[]>('/reviews/list',
    page,
    limit,
    { requireAuth: true }
  );
  if (!user || user.role !== "ADMIN") {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">🚫</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Acceso Denegado</h2>
          <p className="text-gray-600">No tienes permisos para acceder a esta página</p>
        </div>
      </div>
    );
  }




  return (
    <>
      <ReviewsGrid reviews={reviews} />
      <Pagination totalPages={pagination?.totalPages} />
    </>

  );
}
{/*  */ }