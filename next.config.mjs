/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "simplehearingandspeechcare.in", pathname: "/assets/images/**" },
    ],
  },
};

export default nextConfig;
