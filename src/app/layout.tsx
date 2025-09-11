import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";


const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
});




export const metadata: Metadata = {
  title: "Movie App",
  description: "Discover and explore your favorite movies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lexend.variable} antialiased bg2`}
      >  <div className="min-h-screen  text-white p-2 md:p-4">
            <div className="max-w-4xl mx-auto pb-25">
              <AuthProvider>
                {children}
                
              </AuthProvider>
            </div>  
          </div>
      </body>
    </html>
  );
}


