/** @type {import('next').NextConfig} */
const config = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "image.tmdb.org" }],
  },
  async rewrites() {
    const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";
    return [
      {
        source: "/api/:path*",
        // ensure destination starts with '/' or a protocol. Use a sensible default when env var is missing.
        destination: `${API_URL}/:path*`, // backend
      },
    ];
  },
};

export default config;
