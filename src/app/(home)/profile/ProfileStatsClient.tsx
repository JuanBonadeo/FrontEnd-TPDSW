"use client";
import { ProfileTabs, UserStats } from "@/components/Profile/ProfileTabs";
import { ProfileTabsSkeleton } from "@/components/Profile/ProfileTabsSkeleton";
import { useAuthContext, User } from "@/context/AuthContext";
import { useApi } from "@/hooks/useApi";
import React from "react";

export const ProfileStatsClient = () => {
  const endpoint = `/auth/profile`;
  const { data: userStats, loading, error, errorCode } = useApi<UserStats>(endpoint, {
    requireAuth: true,
  });
  if (loading) return <ProfileTabsSkeleton />;
  if (error) return <p>Error: {error} (code: {errorCode})</p>;
  if (!userStats) return <p>No user data</p>;
  
  return <ProfileTabs userStats={userStats} />;
};
