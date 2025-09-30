"use client"
import React, { useState } from 'react';
import { Download, Loader2, Check, AlertCircle } from 'lucide-react';
import Link from 'next/link.js';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";


export default function FetchMoviesButton() {
    const [loading, setLoading] = useState(false);
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [token, setToken] = useState<string | null>(null);

    React.useEffect(() => {
        if (typeof window !== "undefined") {
            setToken(localStorage.getItem('token'));
        }
    }, []);
    
    const handleFetchMovies = async () => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        setMovies([]);
        try {
            const response = await fetch(`${API_BASE_URL}/movies/seed/latest`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Error al cargar las películas');
            }

            const data = await response.json();

            if (data.success) {
                setMovies(data.data);
                setSuccess(true);
            } else {
                throw new Error(data.error || 'Error desconocido');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="w-full max-w-2xl mx-auto p-6">
            <div className="bg rounded-lg shadow-lg p-6">
                <div className="flex flex-col items-center justify-between mb-6 gap-4">
                    <div>
                        <h2 className="text-2xl font-bold ">Cargar Películas desde TMDB</h2>
                        <p className="text-gray-600 mt-1">Importa las últimas 20 películas más populares</p>
                    </div>
                    <button
                        onClick={handleFetchMovies}
                        disabled={loading}
                        className={`
              flex items-center gap-2 px-6 py-3 rounded-lg font-semibold
              transition-all duration-200 transform hover:scale-105
              ${loading
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
                            }
              text-white shadow-md
            `}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                <span>Cargando...</span>
                            </>
                        ) : (
                            <>
                                <Download className="w-5 h-5" />
                                <span>Cargar Películas</span>
                            </>
                        )}
                    </button>
                </div>

                {/* Mensaje de éxito */}
                {success && movies.length > 0 && (
                    <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="font-semibold text-green-800">
                                ¡{movies.length} películas cargadas exitosamente!
                            </p>
                            <p className="text-sm text-green-700 mt-1">
                                Las películas han sido agregadas a la base de datos
                            </p>
                        </div>
                    </div>
                )}

                {/* Mensaje de error */}
                {error && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="font-semibold text-red-800">Error al cargar películas</p>
                            <p className="text-sm text-red-700 mt-1">{error}</p>
                        </div>
                    </div>
                )}

                {/* Lista de películas cargadas */}
                {movies.length > 0 && (
                    <div className="space-y-2">
                        <h3 className="font-semibold  mb-3">Películas agregadas:</h3>
                        <div className="max-h-96 overflow-y-auto space-y-2 pr-2">
                            {movies.map((movie, index) => (
                                <div
                                    key={movie.id || index}
                                    className="flex items-center gap-3 p-3 bg-black/50 rounded-lg hover:bg-black/90 transition-colors"
                                >
                                    <div className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                                        {index + 1}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <Link className="font-medium text-gray-300 truncate" href={`/movies/${movie.id_movie}`}>
                                            {movie.title}
                                        </Link>
                                        {movie.release_date && (
                                            <p className="text-sm text-gray-500">
                                                Año: {movie.release_date}
                                            </p>
                                        )}
                                    </div>
                                    {movie.rating && (
                                        <div className="flex-shrink-0 px-2 py-1 bg-yellow-100 text-yellow-800 rounded-md text-sm font-semibold">
                                            ⭐ {movie.rating.toFixed(1)}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Estado vacío cuando no se ha cargado nada */}
                {!loading && !success && !error && (
                    <div className="text-center py-12 text-gray-500">
                        <Download className="w-16 h-16 mx-auto mb-4 opacity-20" />
                        <p>Haz clic en Cargar Películas para importar desde TMDB</p>
                    </div>
                )}
            </div>
        </div>
    );
}