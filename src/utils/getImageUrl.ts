export const getImageUrl = (
  path: string | null,
  size: "w185" | "w500" | "w780" | "original" = "w780"
) => {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : "/placeholder.svg"
}