"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AdminTabs() {
  const pathname = usePathname();

  return (
    <div className="space-y-4 mb-3">
      <div className="flex border-gray-700 border-b mt-5">
        <Link
          href="/admin/users"
          className={`cursor-pointer px-4 py-2 text-sm font-medium transition-all ${
            pathname === "/admin/users" ? "active-tab" : "text-muted-foreground"
          }`}
        >
          Usuarios
        </Link>
        <Link
          href="/admin/reviews"
          className={`cursor-pointer px-4 py-2 text-sm font-medium transition-all ${
            pathname === "/admin/reviews" ? "active-tab" : "text-muted-foreground"
          }`}
        >
          Reviews
        </Link>
        <Link
          href="/admin/movies"
          className={`cursor-pointer px-4 py-2 text-sm font-medium transition-all ${
            pathname === "/admin/movies" ? "active-tab" : "text-muted-foreground"
          }`}
        >
          Películas
        </Link>
      </div>
    </div>
  );
}