"use client";
import { useEffect, useState } from 'react';
import { MoviesGrid } from '@/components/movies/Grid/MoviesGrid';
import { Pagination } from '@/components/ui/pagination/Pagintation';
import { useSearchParams } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const LIMIT = 30;

export default function MoviesPage() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/movies/search?page=${page}&limit=${LIMIT}`)
      .then(res => res.json())
      .then(data => {
        setMovies(data.data || []);
        setTotalPages(data.pagination?.totalPages || 1);
      })
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <section className="max-w-4xl mx-auto py-8">
      {loading ? (
        <div className="text-center py-10">Cargando películas...</div>
      ) : (
        <MoviesGrid movies={movies} title="Películas" />
      )}
      <div className="mt-8 flex justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </section>
  );
}
