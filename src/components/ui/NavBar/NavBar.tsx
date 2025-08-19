import Link from "next/link"
import { Search } from "lucide-react"

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-primary">CineCritic</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/search">
            <div className="text-muted-foreground ">
              <Search className="w-5 h-5" />
              <span className="sr-only">Buscar</span>
            </div>
          </Link>
          
        </div>
      </div>
    </header>
  )
}
