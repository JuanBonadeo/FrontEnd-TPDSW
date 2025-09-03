"use client"
import { useApi } from "@/hooks/useApi"
import { Director } from "@/lib/types"
import { DirectorDetail } from "@/components/directors/detail/DirectorDetail" 


export const DirectorDetailClient = ({ id }: { id: string }) => {
    const {data: director, loading, error} =useApi<Director>(
        id ? `/directors/${id}` : null
    );

  if (loading) return <><p>Loading...</p></>
  if (error) return <div>Error loading director details: {error}</div>;
  if (!director) return <div>No director data found</div>;

  return (
    <>
      <DirectorDetail director={director}/>
    </>
  )
}
