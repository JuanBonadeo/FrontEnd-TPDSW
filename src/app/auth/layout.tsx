
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
    <div className="fixed inset-0 flex items-center justify-center ">
      {children}
    </div>
  );
}
