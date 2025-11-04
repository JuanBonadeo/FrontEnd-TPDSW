"use client";
import { useState, useEffect } from 'react';
import { Trash, Edit, X } from 'lucide-react';
import Link from 'next/link.js';
import { Movie } from '@/lib/types';
import { useRouter } from 'next/navigation.js';

interface updateMovieDTO {
  id_movie: number;
  title: string;
  description: string;
  duration: number;
  release_date: number;
}

interface Props {
  movies: Movie[];
}

export function MoviesAdminGrid({ movies: initialMovies }: Props) {
  const router = useRouter();
  const [movies, setMovies] = useState<Movie[]>(initialMovies || []);
  const [deletingMovieId, setDeletingMovieId] = useState<number | null>(null);
  const [editingMovie, setEditingMovie] = useState<updateMovieDTO | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Actualizar el estado local cuando cambien las props
  useEffect(() => {
    if (initialMovies) {
      setMovies(initialMovies);
    }
  }, [initialMovies]);

  const handleDeleteMovie = async (movieId: number) => {
  // Confirmar PRIMERO
  if (!confirm(`¿Estás seguro de que quieres eliminar esta película?`)) {
    return;
  }

  setDeletingMovieId(movieId);

  try {
    // Crear fetch manualmente o usar una instancia del hook específica
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
    
    const token = localStorage.getItem('token');

    await fetch(`${API_BASE}/movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    // Actualizar el estado local removiendo la película
    setMovies(movies.filter(movie => movie.id_movie !== movieId));
    alert('Película eliminada exitosamente');

  } catch (error) {
    console.error('Error deleting movie:', error);
    alert('Error al eliminar la película');
  } finally {
    setDeletingMovieId(null);
  }
};

  const handleEditMovie = (movie: Movie) => {
    const editMovie: updateMovieDTO = {
      id_movie: movie.id_movie,
      title: movie.title,
      description: movie.description,
      duration: movie.duration,
      release_date: movie.release_date
    };
    setEditingMovie(editMovie);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingMovie(null);
  };

  const handleSaveMovie = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!editingMovie) return;
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
      const token = localStorage.getItem('token');
      console.log('Updating movie:', editingMovie);
      const response = await fetch(`${API_BASE}/movies/${editingMovie.id_movie}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(editingMovie),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar la película');
      }

      // Actualizar el estado local
      setMovies(movies.map(movie => 
        movie.id_movie === editingMovie.id_movie
          ? { ...movie, ...editingMovie }
          : movie
      ));

      handleCloseModal();
      alert('Película actualizada exitosamente');
    } catch (error) {
      console.error('Error updating movie:', error);
      alert('Error al actualizar la película');
    }

  };

  if (!movies || movies.length === 0) {
    return <p className="text-center text-gray-500">No hay películas disponibles.</p>;
  }

  return (
    <>
      <div className="overflow-x-auto rounded-md">
        <table className="bg border-gray-200 min-w-full">
          <thead className="bg-stone-700">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium ">Título</th>
              <th className="px-4 py-2 text-left text-sm font-medium ">Duración</th>
              <th className="px-4 py-2 text-left text-sm font-medium ">Rating</th>
              <th className="px-4 py-2 text-left text-sm font-medium ">Año</th>
              <th className="px-4 py-2 text-right text-sm font-medium ">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {movies.map((movie) => (
              <tr key={movie.id_movie} className="hover:bg-gray-500/5">
                <td className="px-4 py-4">
                  <Link className="flex items-center gap-3" href={`/movies/${movie.id_movie}`}>
                    <div className="text-sm font-medium">{movie.title}</div>
                  </Link>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm">{movie.duration} min</div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm">⭐ {movie.rating.toFixed(1)}</div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm">{movie.release_date}</div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => handleEditMovie(movie)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      <Edit className="w-4 h-4" />
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteMovie(movie.id_movie)}
                      disabled={deletingMovieId === movie.id_movie}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Trash className="w-4 h-4" />
                      {deletingMovieId === movie.id_movie ? 'Eliminando...' : 'Eliminar'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de edición */}
      {isModalOpen && editingMovie && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold">Editar Película</h2>
              <button
                onClick={handleCloseModal}
                className=" hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSaveMovie} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium  mb-1">
                  Título
                </label>
                <input
                  type="text"
                  value={editingMovie.title}
                  onChange={(e) => setEditingMovie({ ...editingMovie, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium  mb-1">
                  Descripción
                </label>
                <textarea
                  value={editingMovie.description}
                  onChange={(e) => setEditingMovie({ ...editingMovie, description: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium  mb-1">
                    Duración (min)
                  </label>
                  <input
                    type="number"
                    value={editingMovie.duration}
                    onChange={(e) => setEditingMovie({ ...editingMovie, duration: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium  mb-1">
                    Año de estreno
                  </label>
                  <input
                    type="number"
                    value={editingMovie.release_date}
                    onChange={(e) => setEditingMovie({ ...editingMovie, release_date: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
                    required
                  />
                </div>
              </div>


              <div className="flex gap-3 justify-end pt-4 ">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}