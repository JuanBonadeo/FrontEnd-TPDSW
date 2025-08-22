// Respuesta genérica del backend
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// Entidades anidadas
export interface Category {
  id_category: number;
  name: string;
  description: string;
  tmdb_id: number;
  created_at: string; // ISO
}

export interface Director {
  id_director: number;
  first_name: string;
  last_name: string;
  nationality: string;
  tmdb_id: number;
  profile_path: string | null;
  biography: string;
  birth_date: string;  // ISO
  birth_place: string;
  created_at: string;  // ISO
}

// Movie completa según tu payload
export interface Movie {
  id_movie: number;
  title: string;
  description: string;
  duration: number;
  release_date: number;
  averageScore: number | null;
  totalReviews: number;
  tmdb_id: number | null;
  rating: number;
  poster_path: string | null;
  backdrop_path: string | null;
  original_language: string | null;
  vote_count: number;
  popularity: number;
  adult: boolean;
  id_director: number;
  id_category: number;
  created_at: string; // ISO
  updated_at: string; // ISO
  Category: Category;
  Director: Director;
}
