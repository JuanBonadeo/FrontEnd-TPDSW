

export default function MoviesGridSkeleton() {
  // Skeleton del grid
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {Array.from({ length: 30 }).map((_, i) => (
        <div key={i} className="aspect-[2/3] animate-pulse rounded-md bg" />
      ))}
    </div>
  );
}
