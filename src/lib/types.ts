// lib/types.ts

export interface Movie {
  id_movie: number;
  title: string;
  description: string;
  duration: number;
  release_date: number;
  rating: number;
  poster_path: string | null;
  backdrop_path: string | null;
  Category?: { id_category: number; name: string };
  Director?: { first_name: string; last_name: string; profile_path?: string | null };
  Movie_Actor?: { character: string; Actor: { id_actor: number; first_name: string; last_name: string; profile_path?: string | null } }[];
}

// lib/types.ts
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  pagination?: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}

export interface MovieApi {
  id_movie: number;
  title: string;
  rating: number;
  poster_path: string | null;
  release_date: number;
  // ...otros campos que devuelve la API
}

export interface Actor {
  id_actor: number;
  first_name: string;
  last_name: string;
  birth_date: string;       // ISO
  tmdb_id: number;
  profile_path: string | null;
  biography: string;
  birth_place: string | null;
  gender: number | null;
  created_at: string;
}