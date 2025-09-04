"use client"

export function DirectorDetailSkeleton () {
  return (
    <div className="max-w-3xl mx-auto animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:justify-center md:items-center my-15">
        
        {/* Imagen skeleton */}
        <div className="rounded-xl relative h-[420px] w-[280px] overflow-hidden bg" />

        {/* Info skeleton */}
        <div className="space-y-4 mt-6 md:mt-0 px-2">
          {/* Nombre */}
          <div className="h-6 w-48 bg rounded-md" />

          {/* Fecha y lugar */}
          <div className="space-y-2 mt-4">
            <div className="h-4 w-40 bg rounded-md" />
            <div className="h-4 w-56 bg rounded-md" />
          </div>

          {/* Botón TMDB */}
          <div className="h-10 w-28 bg rounded-md mt-6" />

          {/* Biografía */}
          <div className="mt-6 space-y-2">
            <div className="h-4 w-32 bg rounded-md" />
            <div className="h-4 w-full bg rounded-md" />
            <div className="h-4 w-5/6 bg rounded-md" />
            <div className="h-4 w-3/4 bg rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}