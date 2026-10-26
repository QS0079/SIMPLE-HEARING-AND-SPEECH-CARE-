/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "simplehearingandspeechcare.in", pathname: "/assets/images/**" },
    ],
  },
  async redirects() {
    return [
      { source: "/privacy", destination: "/privacy-policy", permanent: true },
      { source: "/terms", destination: "/terms-and-conditions", permanent: true },
      { source: "/terms-condition", destination: "/terms-and-conditions", permanent: true },
      { source: "/terms-and-condition", destination: "/terms-and-conditions", permanent: true },
    ];
  },
};

export default nextConfig;
