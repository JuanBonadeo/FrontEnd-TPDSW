"use client";

import {  useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Heart, Check } from "lucide-react";
import { UserStats } from "@/lib/types";
import { getImageUrl } from "@/utils/getImageUrl";
import { MovieFavouriteCard } from "../movies/Card/MovieFavouriteCard";
import { MovieWatchListCard } from "../movies/Card/MovieWatchListCard";



interface Props {
  userStats: UserStats;
}
export function ProfileTabs({userStats}: Props) {
  const [activeTab, setActiveTab] = useState("favorites");
   // favourites | vistas | resenias
  console.log(userStats);
  return (
    <div className="space-y-4">
      <div className="flex gap-6 pt-2">
        <div className="text-center">
          <p className="text-lg font-bold">{userStats._count.Review}</p>
          <p className="text-xs text-muted-foreground">Favoritos</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold">21</p>
          <p className="text-xs text-muted-foreground">Watchlist</p>
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
          Watchlist
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

      {activeTab === "watched" && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {userStats.ToWatch.map((toWatch) => (
            <MovieWatchListCard key={toWatch.created_at} toWatch={toWatch} />
          ))}
        </div>
      )}

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
