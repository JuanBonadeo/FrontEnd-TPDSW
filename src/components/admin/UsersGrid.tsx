"use client";
import { useApi } from "@/hooks/useApi";
import { updateUserRoleWithToken } from "@/lib/actions/updateUserRoleWithToken";
import { User } from "@/lib/types";
import { useEffect, useState } from "react";

interface Props {
  users: User[] | null;
}

export const UsersGrid = ({ users }: Props) => {
  const token = localStorage.getItem('token');

  const handleRoleChange = async (userId: string, role: string) => {
    console.log(`Updating user ${userId} to role ${role}`);
    try {
      // Dispara el PUT
      await updateUserRoleWithToken(userId , token, role);

      alert("User role updated successfully");
    } catch (err) {
      console.error("Error updating user role:", err);
      alert("Error updating user role");
    } finally {
      window.location.reload(); 
    }
  };

  if (!users || users.length === 0) {
    return <p className="text-center text-gray-500">No users found.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-md">
      <table className="min-w-full bg border-gray-300">
        <thead className="bg-stone-700">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-white">ID</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-white">CreatedAt</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-white">Nombre</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-white">Email</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-white">Rol</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-4 py-2 text-sm">{user.id}</td>
              <td className="px-4 py-2 text-sm">
                {new Date(user.created_at).toLocaleDateString()}
              </td>
              <td className="px-4 py-2 text-sm font-medium">{user.name}</td>
              <td className="px-4 py-2 text-sm text-gray-500">{user.email}</td>
              <td className="px-4 py-2">
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  // disabled={updatingUserId === user.id && loading}
                  className="bg text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="USER">USER</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
                {/* {updatingUserId === user.id && loading && (
                  <span className="ml-2 text-xs text-gray-500">Actualizando...</span>
                )} */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
