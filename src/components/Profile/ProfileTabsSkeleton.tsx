"use client";

export function ProfileTabsSkeleton() {
  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="flex gap-6 pt-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="text-center space-y-1">
            <div className="h-6 w-10 mx-auto rounded bg-muted/40 animate-pulse" />
            <div className="h-4 w-16 mx-auto rounded bg-muted/30 animate-pulse" />
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-700/60 bg-background/50 rounded-t">
        {["Favoritos", "Vistas", "Reseñas"].map((tab, i) => (
          <div
            key={i}
            className="px-4 py-2 text-sm font-medium text-muted-foreground"
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Grid de favoritos */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-muted/30 animate-pulse" />
            <div className="h-4 w-full rounded bg-muted/40 animate-pulse" />
            <div className="h-4 w-2/3 rounded bg-muted/30 animate-pulse" />
          </div>
        ))}
      </div>

      {/* Lista de reseñas */}
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="flex gap-4 p-3 rounded-lg bg-background/40 border border-border/40 animate-pulse"
          >
            <div className="w-16 h-24 rounded-md bg-muted/30" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-1/2 rounded bg-muted/40" />
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, j) => (
                  <div key={j} className="h-4 w-4 rounded bg-muted/30" />
                ))}
              </div>
              <div className="h-4 w-full rounded bg-muted/40" />
              <div className="h-4 w-5/6 rounded bg-muted/30" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
