"use client";

export function MovieDetailSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Imagen de fondo */}
      <div className="relative w-full overflow-hidden rounded-lg aspect-video bg" />

      <div className="space-y-4">
        {/* Título, rating, año y duración */}
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="h-6 w-48 rounded bg" />
            <div className="flex items-center mt-1 space-x-3">
              <div className="h-4 w-16 rounded bg" />
              <div className="h-4 w-12 rounded bg" />
              <div className="h-4 w-20 rounded bg" />
            </div>
          </div>
        </div>

        {/* Género */}
        <div className="flex flex-wrap gap-2">
          <div className="h-5 w-16 rounded bg" />
          <div className="h-5 w-20 rounded bg" />
        </div>

        {/* Botones */}
        <div className="flex space-x-3 justify-center w-full">
          <div className="h-10 w-xl rounded-md bg" />
          <div className="h-10 w-xl rounded-md bg" />
          <div className="h-10 w-xl rounded-md bg" />
        </div>

        {/* Sinopsis */}
        <div className="space-y-2">
          <div className="h-5 w-24 rounded bg" />
          <div className="h-4 w-full rounded bg" />
          <div className="h-4 w-11/12 rounded bg" />
          <div className="h-4 w-9/12 rounded bg" />
        </div>

        {/* Actores */}
        <div className="my-10">
          <div className="h-6 w-28 mx-auto mb-4 rounded bg" />
          <div className="grid gap-2 md:grid-cols-5 md:gap-4">
            {Array.from({ length: 5 }).map((_, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center space-y-2"
              >
                <div className="h-16 w-16 rounded-full bg" />
                <div className="h-4 w-20 rounded bg" />
                <div className="h-3 w-12 rounded bg" />
              </div>
            ))}
          </div>
        </div>

        {/* Director */}
        <div className="my-10">
          <div className="h-6 w-28 mx-auto mb-4 rounded bg" />
          <div className="flex items-center justify-center gap-3">
            <div className="h-16 w-16 rounded-full bg" />
            <div className="h-4 w-32 rounded bg" />
          </div>
        </div>
      </div>
    </div>
  );
}
