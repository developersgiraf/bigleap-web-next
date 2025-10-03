/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimize for Netlify deployment
  output: 'standalone',
  
  // Optimize images
  images: {
    unoptimized: false, // Enable optimization for better performance
    formats: ['image/webp', 'image/avif'], // Use modern image formats
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Minimize function size
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Reduce server bundle size
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          // Create smaller chunks for server-side code
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /node_modules/,
          },
        },
      };
    }
    return config;
  },
  
  // Reduce build cache size
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
};

export default nextConfig;
