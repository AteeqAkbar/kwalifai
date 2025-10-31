/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // ✅ allow all HTTPS domains
      },
      {
        protocol: "http",
        hostname: "**", // ✅ allow all HTTP domains (optional)
      },
    ],
    unoptimized: false, // keep Next.js optimization
  },
};

export default nextConfig;
