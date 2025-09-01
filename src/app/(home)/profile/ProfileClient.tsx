"use client";
import { ProfileHeader } from "@/components/Profile/ProfileHeader";
import { useAuthContext } from "@/context/AuthContext";
import React from "react";

export const ProfileClient = () => {
  const { user } = useAuthContext();
  if (!user) return null;
  return <ProfileHeader user={user} />;
};
