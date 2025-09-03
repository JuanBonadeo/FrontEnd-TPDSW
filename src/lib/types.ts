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
  Director?: { id_director: number; first_name: string; last_name: string; profile_path?: string | null };
  Movie_Actor?: { character: string; Actor: { id_actor: number; first_name: string; last_name: string; profile_path?: string | null } }[];
}

// lib/types.ts
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  error?: string;    
  code?: string;
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

export interface Director {
  id_director: number;
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

export interface ReviewUser {
  id: string;
  name: string | null;
  image: string | null;
}

export interface Review {
  id_review: number;
  id_user: string;
  id_movie: number;
  score: number;                 // Normalizado a number
  comment: string;
  review_date: string;
  updated_at: string;
  User?: ReviewUser | null;
}


interface User {
  id: string;
  name: string;
  email: string;
  birth_date: string;
  role: string;
  isActive: boolean;
  emailVerified: boolean;
  image: string | null;
  created_at: string;
  updated_at: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  birth_date: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface UseAuthResult {
  loading: boolean;
  error: string | null;
  register: (data: RegisterData) => Promise<void>;
  login: (data: LoginData) => Promise<void>;
  logout: () => void;
}


export type MovieLite = {
  id_movie: number;
  title: string;
  poster_path?: string | null;
  release_date: number;
  averageScore?: number | null;
  rating?: number | null;
};

export type Favourite = {
  id_user: string;
  id_movie: number;
  created_at: string; // ISO
  Movie: MovieLite;
};