"use client"
import { useAuthContext } from "@/context/AuthContext";
import { UsersGrid } from '@/components/admin/UsersGrid';
import { Pagination } from '@/components/ui/pagination/Pagintation';
import { useApiPaginated } from '@/hooks/useApi';
import { User } from '@/lib/types.js';
import { stringify } from "querystring";


// Componente principal del Admin Panel
export const AdminUserClient = ({ page, limit = 10 }: { page: number; limit: number }) => {
  const { user } = useAuthContext();
  const { data: users, pagination, loading } = useApiPaginated<User[]>('/users',
    page,
    limit,
    { requireAuth: true }
  );
  if (!user || user.role !== "ADMIN") {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">🚫</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Acceso Denegado</h2>
          <p className="text-gray-600">No tienes permisos para acceder a esta página</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <UsersGrid users={users} />
      <Pagination totalPages={pagination?.totalPages} />
    </>

  );
};