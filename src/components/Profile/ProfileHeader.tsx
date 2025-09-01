
import { User } from "@/context/AuthContext"
import { Settings } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { calcAge } from "../actors/detail/ActorDetail"

 interface Props {
  user: User
  }

export function ProfileHeader({user}: Props) {
  const age = calcAge(user?.birth_date)

  return (
    <div className="space-y-4 mb-0">
      <div className="relative">
        <div className="h-32 bg-gradient-to-r from-red-600 to-red-950 rounded-lg" />
        <div className="absolute -bottom-16 left-4 border-4 border-background rounded-full">
          <div className="w-32 h-32 relative flex shrink-0 overflow-hidden rounded-full">
            <Image height={100} width={100} className="aspect-square h-full w-full" src={user?.image || "/avatar.svg"} alt={user.name} />
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
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
        <p className="font-bold">CineCritic de {age} años.</p>
      </div>
    </div>
  )
}
