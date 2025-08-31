"use client"
import {ActorDetail} from "@/components/actors/detail/ActorDetail"
import { ActorDetailSkeleton } from "@/components/actors/detail/ActorDetailSkeleton";
import { useApi } from "@/hooks/useApi";
import { Actor } from "@/lib/types";


export const ActorDetailClient = ({ id }: { id: string }) => {
     const { data: actor, loading, error } = useApi<Actor>(
    id ? `/actors/${id}` : null
  );
  
  if (loading) return <ActorDetailSkeleton />;
  if (error) return <div>Error loading actor details: {error}</div>;
  if (!actor) return <div>No actor data found</div>;
    return (
        <>
        <ActorDetail actor={actor} />
        </>
    )
}
