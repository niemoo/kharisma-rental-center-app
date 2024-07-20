/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.kharisma-rental-center.my.id',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
