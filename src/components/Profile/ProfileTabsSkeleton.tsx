"use client";

export function ProfileTabsSkeleton() {
  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="flex gap-6 pt-2" >
        {
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="text-center space-y-1">
              <div className="h-6 w-10 mx-auto rounded bg-muted/40 animate-pulse bg" />
              <div className="h-4 w-16 mx-auto rounded bg-muted/30 animate-pulse bg" />
            </div>
          ))
        }
      </div>

      <div className="space-y-4">

        <div className="flex border-gray-700 border-b">
          {["Favoritos", "Vistas", "Reseñas"].map((label, i) => (
            <div
              key={label}
              className="cursor-pointer px-4 py-2 text-sm font-medium transition-all"
            >
              {label}
            </div>
          ))}
        </div>
      </div>


      {/* Grid de favoritos */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg bg animate-pulse" />
            <div className="h-4 w-full rounded bg animate-pulse" />
            <div className="h-4 w-2/3 rounded bg animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  )
}

