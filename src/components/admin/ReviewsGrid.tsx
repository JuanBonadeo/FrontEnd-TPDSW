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
    const [localReviews, setLocalReviews] = useState<Review[]>([]);
    const [deletingReviewId, setDeletingReviewId] = useState<string | null>(null);
    
    useEffect(() => {
        setLocalReviews(reviews || []);
    }, [reviews]);
    
    // Función para eliminar review usando fetch directamente
    const deleteReview = async (reviewId: string) => {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token de autenticación requerido');
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/reviews/${reviewId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        // Verificar si la respuesta está vacía (común en DELETE requests)
        const contentType = response.headers.get('content-type');
        let result = null;

        if (contentType && contentType.includes('application/json')) {
            const text = await response.text();
            if (text.trim()) {
                try {
                    result = JSON.parse(text);
                } catch (e) {
                    console.error('Error parsing JSON:', text);
                    throw new Error('Respuesta del servidor no es JSON válido');
                }
            }
        }

        // Para DELETE requests, un 204 (No Content) o 200 sin contenido es válido
        if (!response.ok) {
            const errorMessage = result?.message || `Error ${response.status}: ${response.statusText}`;
            throw new Error(errorMessage);
        }

        // Si hay contenido JSON, verificar el campo success
        if (result && result.success === false) {
            throw new Error(result.message || 'Error en el servidor');
        }

        return result || { success: true };
    };
    
    if (!reviews || reviews.length === 0) {
        return <p className="text-center text-gray-500">No reviews found.</p>;
    }
    
    const handleDeleteReview = async (reviewId: string) => {
        if (!window.confirm('¿Estás seguro de que quieres eliminar esta review?')) {
            return;
        }

        setDeletingReviewId(reviewId);
        
        try {
            // Ejecutar la eliminación
            await deleteReview(reviewId);
            
            // Actualizar el estado local para remover la review inmediatamente
            setLocalReviews(prev => prev.filter(review => review.id_review.toString() !== reviewId));
            alert('Review eliminada exitosamente');
            router.refresh();
        } catch (error) {
            console.error('Error deleting review:', error);
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
            alert(`Error al eliminar la review: ${errorMessage}`);
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