"use client"
import {ActorDetail} from "@/components/actors/detail/ActorDetail"
import { ActorDetailSkeleton } from "@/components/actors/detail/ActorDetailSkeleton";
import { useActor } from "@/hooks/useactor";


export const ActorDetailClient = ({ id }: { id: string }) => {
    const { actor, loading, error } = useActor(id);
    if (loading) return <ActorDetailSkeleton />;
    if (error) return <div>Error loading actor details</div>;
    return (
        <>
        <ActorDetail actor={actor} />
        </>
    )
}
