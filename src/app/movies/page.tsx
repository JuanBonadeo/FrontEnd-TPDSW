import { Suspense } from 'react';
import MoviesPageClient from './MoviesPageClient';

export default function MoviesPage() {
  return (
    <Suspense fallback={<div className="text-center py-10">Cargando películas...</div>}>
      <MoviesPageClient />
    </Suspense>
  );
}
