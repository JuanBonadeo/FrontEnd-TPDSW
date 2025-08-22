
import { Settings } from "lucide-react"
import Image from "next/image.js"
import Link from "next/link.js"

export function ProfileHeader() {
  const user = {
    name: "María López",
    username: "@marialopez",
    avatar: "/placeholder.svg?height=100&width=100",
    initials: "ML",
    bio: "Cinéfila apasionada | Crítica de cine amateur | Amante del terror y la ciencia ficción",
    stats: {
      reviews: 127,
      favorites: 84,
      watched: 312,
    },
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="h-32 bg-gradient-to-r from-red-600 to-red-950 rounded-lg" />
        <div className="absolute -bottom-16 left-4 border-4 border-background rounded-full">
          <div className="w-32 h-32 relative flex shrink-0 overflow-hidden rounded-full">
            <Image height={100} width={100} className="aspect-square h-full w-full" src={user.avatar || "/placeholder.svg"} alt={user.name} />
            <div className="text-3xl flex h-full w-full items-center justify-center rounded-full bg-muted">{user.initials}</div>
          </div>
        </div>
        <div className="absolute top-4 right-4">
          <Link className="bg-black/20 hover:bg-black/40 text-white" href="profile/settings">
            <Settings className="w-5 h-5" />
          </Link>
        </div>
      </div>

      <div className="pt-16 space-y-3">
        <div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-sm text-muted-foreground">{user.username}</p>
        </div>

        <p className="text-sm">{user.bio}</p>

        <div className="flex gap-6 pt-2">
          <div className="text-center">
            <p className="text-lg font-bold">{user.stats.reviews}</p>
            <p className="text-xs text-muted-foreground">Reseñas</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold">{user.stats.favorites}</p>
            <p className="text-xs text-muted-foreground">Favoritos</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold">{user.stats.watched}</p>
            <p className="text-xs text-muted-foreground">Vistas</p>
          </div>
        </div>
      </div>
    </div>
  )
}
