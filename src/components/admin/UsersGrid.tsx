"use client"
import { User } from "@/lib/types.js";
interface Props {
  users: User[] | null;
}
// Componente para gestión de usuarios
export const UsersGrid = ({ users }: Props) => {

  const handleRoleChange = async (userId, newRole) => {
    alert(`Cambiando rol del usuario ${userId} a ${newRole}`);
  }
  if (!users || users.length === 0) {
    return <p className="text-center text-gray-500">No users found.</p>;
  }


  return (
    <div className="overflow-x-auto rounded-md">
      <table className="min-w-full bg border-gray-300">
        <thead className="bg-stone-700 ">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium ">ID</th>
            <th className="px-4 py-2 text-left text-sm font-medium ">CreatedAt</th>
            <th className="px-4 py-2 text-left text-sm font-medium ">Nombre</th>
            <th className="px-4 py-2 text-left text-sm font-medium ">Email</th>
            <th className="px-4 py-2 text-left text-sm font-medium ">Rol</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id} className="">
              <td className="px-4 py-2 text-sm">{user.id}</td>
              <td className="px-4 py-2 text-sm">{new Date(user.created_at).toLocaleDateString()}</td>
              <td className="px-4 py-2 text-sm font-medium">{user.name}</td>
              <td className="px-4 py-2 text-sm text-gray-500">{user.email}</td>

              <td className="px-4 py-2">
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  className="bg text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="USER">USER</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
};