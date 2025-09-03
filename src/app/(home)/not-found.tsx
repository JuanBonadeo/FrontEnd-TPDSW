import Link from 'next/link';
import { FilmIcon, HomeIcon, SearchIcon } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen  flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Icono animado */}
        <div className="relative mb-8">
          <div className="absolute inset-0 animate-ping">
            <FilmIcon className="w-24 h-24 mx-auto text-red-500/20" />
          </div>
          <FilmIcon className="w-24 h-24 mx-auto text-red-500" />
        </div>
        
        {/* Error 404 */}
        <h1 className="text-8xl font-bold text-white mb-4 tracking-tight">
          4<span className="text-red-500">0</span>4
        </h1>
        
        {/* Mensaje principal */}
        <h2 className="text-3xl font-semibold text-white mb-6">
          Content Not Found
        </h2>
        
        <p className="text-xl text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
          The movie, actor, or page you are looking for seems to have vanished into the void. 
          Maybe it was never meant to be found.
        </p>
        
        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            href="/" 
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            <HomeIcon className="w-5 h-5" />
            Back to Home
          </Link>
          
          <Link 
            href="/search" 
            className="flex items-center gap-2 border-2 border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200"
          >
            <SearchIcon className="w-5 h-5" />
            Search Movies
          </Link>
        </div>
        
        {/* Sugerencias */}
        <div className="mt-12 p-6 bg-gray-800/50 rounded-xl border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Popular Sections</h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { href: '/movies', label: 'Popular Movies' },
              { href: '/actors', label: 'Top Actors' },
              { href: '/reviews', label: 'Recent Reviews' },
              { href: '/genres', label: 'Browse Genres' }
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white rounded-md transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}