/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimize for production builds
  swcMinify: true,
  compress: true,
  
  // Reduce function size for serverless deployments
  experimental: {
    outputFileTracingIncludes: {
      '/': ['./public/**/*'],
    },
  },
  
  // Optimize images
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000,
  },
  
  // Webpack optimizations
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Reduce bundle size
    if (!dev && isServer) {
      config.optimization.splitChunks = {
        cacheGroups: {
          default: false,
          vendors: false,
        },
      };
    }
    
    // Exclude source maps in production
    if (!dev) {
      config.devtool = false;
    }
    
    return config;
  },
  
  // Output optimization for serverless
  output: 'standalone',
  
  // Reduce JavaScript bundle size
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
