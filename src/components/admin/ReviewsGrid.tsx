"use client";
import { useApi } from '@/hooks/useApi';
import { Review } from '@/lib/types.js';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation.js';
import { useState, useEffect } from 'react';

interface Props {
    reviews: Review[] | null;
}

export const ReviewsGrid = ({ reviews }: Props) => {
    const router = useRouter();
    const [localReviews, setLocalReviews] = useState<Review[]>();
    const [deletingReviewId, setDeletingReviewId] = useState<string | null>(null);
    
    useEffect(() => {
        setLocalReviews(reviews || []);
    }, [reviews]);
    
    // Hook para eliminar reviews - se ejecutará manualmente
    const { execute, loading: deleteLoading } = useApi(
        deletingReviewId ? `reviews/${deletingReviewId}` : null,
        {
            method: 'DELETE',
            requireAuth: true,
            manual: true,
        }
    );
    
    if (!reviews || reviews.length === 0) {
        return <p className="text-center text-gray-500">No reviews found.</p>;
    }
    
    const handleDeleteReview = async (reviewId: string) => {
        setDeletingReviewId(reviewId);
        
        try {
            // Crear una instancia temporal del hook para esta eliminación específica
            await execute();
            
            // Actualizar el estado local para remover la review inmediatamente
            setLocalReviews(prev => prev.filter(review => review.id_review.toString() !== reviewId));
            
            alert('Review deleted successfully');
            router.refresh(); 

        } catch (error) {
            console.error('Error deleting review:', error);
            alert('Error deleting review');
        } finally {
            setDeletingReviewId(null);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="overflow-x-auto rounded-md">
            <table className="bg border-gray-200 ">
                <thead className="bg-stone-700">
                    <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium">Usuario</th>
                        <th className="px-4 py-2 text-left text-sm font-medium">Película</th>
                        <th className="px-4 py-2 text-left text-sm font-medium">Puntaje</th>
                        <th className="px-4 py-2 text-left text-sm font-medium">Comentario</th>
                        <th className="px-4 py-2 text-left text-sm font-medium">Fecha</th>
                        <th className="px-4 py-2 text-right text-sm font-medium">Acciones</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {localReviews.map((review) => (
                        <tr key={review.id_review} className="">
                            <td className="px-6 py-4">
                                {review.User.name}
                            </td>
                            <td className="px-6 py-4">
                                <div className="text-sm">
                                    {review.Movie?.title || 'Película eliminada'}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm">{review.score} </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="text-sm max-w-md">
                                    <p className="line-clamp-2 overflow-hidden">
                                        {review.comment}
                                    </p>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {formatDate(review.review_date)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button
                                    onClick={() => handleDeleteReview(review.id_review.toString())}
                                    disabled={deletingReviewId === review.id_review.toString()}
                                    className="cursor-pointer inline-flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Trash className="w-4 h-4" />
                                    {deletingReviewId === review.id_review.toString() ? 'Eliminando...' : 'Eliminar'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};