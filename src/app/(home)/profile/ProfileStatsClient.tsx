"use client";
import { ProfileTabs } from "@/components/Profile/ProfileTabs";
import { ProfileTabsSkeleton } from "@/components/Profile/ProfileTabsSkeleton";
import { useAuthContext } from "@/context/AuthContext";
import { UserStats, User } from "@/lib/types";
import { useApi } from "@/hooks/useApi";
import React from "react";

export const ProfileStatsClient = () => {
  const endpoint = `/auth/profile`;
  const { data: userStats, loading, error, errorCode } = useApi<UserStats>(endpoint, {
    requireAuth: true,
  });
  
  if (loading ) return <ProfileTabsSkeleton />;
  if (error) return <p>Error: {error} (code: {errorCode})</p>;
  if (!userStats) return <p>No user data</p>;
  
  return <ProfileTabs userStats={userStats} />;
};
