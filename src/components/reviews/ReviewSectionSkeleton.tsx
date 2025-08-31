// components/reviews/ReviewSectionSkeleton.tsx
"use client";

import { Title } from "../ui/title/Title";

export function ReviewSectionSkeleton() {
  return (
    <div className="rounded-lg bg shadow-sm space-y-4 pt-10 animate-pulse">
      <Title title="Reviews" size="2xl" />

      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="rounded-md border border-border bg p-4 space-y-3"
          >
            {/* Usuario + fecha */}
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-32 rounded bg" />
                <div className="h-3 w-20 rounded bg" />
              </div>
            </div>

            {/* Estrellas */}
            <div className="h-4 w-24 rounded bg" />

            {/* Comentario */}
            <div className="space-y-2">
              <div className="h-3 w-full rounded bg" />
              <div className="h-3 w-5/6 rounded bg" />
              <div className="h-3 w-2/3 rounded bg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
