import {  AdminUserClient } from "./AdminUserClient";


export default async function AdminPage({ searchParams }: { searchParams?: { page?: string } }) {
   const params = await searchParams; 
  const page = Number(params?.page ?? "1") || 1;
  
    
  return (
   
      <AdminUserClient page={page} limit={10} />

  );
}