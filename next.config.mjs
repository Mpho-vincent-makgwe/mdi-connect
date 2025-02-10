/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone', // ✅ Helps for server deployment
  experimental: {
    appDir: true, // ✅ Ensure Next.js uses the latest features
  },
};

export default nextConfig;
