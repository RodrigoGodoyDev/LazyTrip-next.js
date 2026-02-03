/** @type {import('next').NextConfig} */
const nextConfig = {
  // Aseguramos que no haya rewrites antiguos que confundan al detector de middleware
  reactStrictMode: true,
};

export default nextConfig;
