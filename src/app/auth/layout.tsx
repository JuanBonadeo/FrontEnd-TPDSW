
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication - Movie App",
  description: "Login and register for the movie app",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen text-white p-4">
      <div className="max-w-md mx-auto">

        {children}
      
      </div>  
    </div>
  );
}
