/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimize for Netlify deployment
  output: 'standalone',
  
  // Optimize images
  images: {
    unoptimized: true, // Required for static export compatibility
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
