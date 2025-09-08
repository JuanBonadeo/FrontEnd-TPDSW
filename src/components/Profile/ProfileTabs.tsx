"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Heart, Check } from "lucide-react";
import { Movie } from "@/lib/types";
import { getImageUrl } from "@/utils/getImageUrl";
import { MovieFavouriteCard } from "../movies/Card/MovieFavouriteCard";

export interface UserStats {
  id: string;
  name: string;
  email: string;
  password: string; // hash
  birth_date: string; // ISO string
  role: "USER" | "ADMIN"; // ampliar si tenés más roles
  isActive: boolean;
  emailVerified: boolean;
  image: string | null;
  created_at: string;
  updated_at: string;
  Favorite: Favorite[];
  Review: Review[];
  _count: UserCount;
}

export interface Favorite {
  id_user: string;
  id_movie: number;
  created_at: string;
  Movie: Movie
}

export interface Review {
  id_review: number;
  id_user: string;
  id_movie: number;
  score: string;
  comment: string;
  review_date: string;
  updated_at: string;
  Movie: Movie
}

export interface UserCount {
  Favorite: number;
  Review: number;
}

interface Props {
  userStats: UserStats;
}
export function ProfileTabs({userStats}: Props) {
  const [activeTab, setActiveTab] = useState("favorites"); // favourites | vistas | resenias

  return (
    <div className="space-y-4">
      <div className="flex gap-6 pt-2">
        <div className="text-center">
          <p className="text-lg font-bold">{userStats._count.Review}</p>
          <p className="text-xs text-muted-foreground">Favoritos</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold">21</p>
          <p className="text-xs text-muted-foreground">Vistas</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold">{userStats._count.Review}</p>
          <p className="text-xs text-muted-foreground">Reseñas</p>
        </div>
      </div>
      <div className="flex border-gray-700 border-b">
        <button
          className={` cursor-pointer px-4 py-2 text-sm font-medium transition-all ${
            activeTab === "favorites" ? "active-tab" : "text-muted-foreground"
          }`}
          onClick={() => setActiveTab("favorites")}
        >
          Favoritos
        </button>
        <button
          className={` cursor-pointer px-4 py-2 text-sm font-medium transition-all ${
            activeTab === "watched" ? "active-tab" : "text-muted-foreground"
          }`}
          onClick={() => setActiveTab("watched")}
        >
          Vistas
        </button>
        <button
          className={` cursor-pointer px-4 py-2 text-sm font-medium transition-all ${
            activeTab === "reviews" ? "active-tab" : "text-muted-foreground"
          }`}
          onClick={() => setActiveTab("reviews")}
        >
          Reseñas
        </button>
      </div>

      {activeTab === "favorites" && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {userStats.Favorite.map((favourite) => (
            <MovieFavouriteCard key={favourite.id_movie} favourite={favourite} />
          ))}
        </div>
      )}

      {/* {activeTab === "watched" && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {watchedMovies.map((Movie) => (
            <Link key={Movie.id} href={`/Movies/${Movie.id}`}>
              <div className="relative group card-hover">
                <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg">
                  <Image
                    src={Movie.image || "/placeholder.svg"}
                    alt={Movie.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-2 right-2">
                    <Check className="w-5 h-5 text-primary" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <h3 className="text-sm font-medium text-white line-clamp-2">
                      {Movie.title}
                    </h3>
                    <div className="flex items-center mt-1">
                      <Star className="w-3 h-3 mr-1 text-primary" fill="red" />
                      <span className="text-xs text-white">{Movie.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )} */}

      {activeTab === "reviews" && (
        <div className="space-y-4">
          {userStats.Review.map((review) => (
            <Link key={review.id_review} href={`/movies/${review.id_movie}`}>
              <div className="flex gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="relative flex-shrink-0 w-16 h-24">
                  <Image
                    src={getImageUrl(review.Movie?.poster_path) || "/placeholder.svg"}
                    alt={review.Movie.title}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="font-medium">{review.Movie.title}</h3>
                    <div className="flex items-center mt-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(review.Movie.rating)
                              ? "text-primary"
                              : "text-muted"
                          }`}
                          fill={i < Math.floor(review.Movie.rating) ? "red" : "none"}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {review.comment}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
