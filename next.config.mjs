import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove standalone output for Netlify - this was causing the 250MB issue
  // output: 'standalone', // This creates large function bundles
  
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
  
  // Experimental features for optimization
  experimental: {
    optimizePackageImports: ['react', 'react-dom', 'swiper', 'bootstrap'],
  },
  
  // Turbopack configuration - using built-in CSS handling
  // No custom CSS loader needed as Next.js handles CSS natively
  
  // Webpack optimizations for smaller bundles
  webpack: (config, { dev, isServer }) => {
    // Optimize for production builds
    if (!dev) {
      config.resolve.alias = {
        ...config.resolve.alias,
        // Reduce bundle size by aliasing heavy modules
        'react/jsx-runtime': 'react/jsx-runtime',
        'react/jsx-dev-runtime': 'react/jsx-dev-runtime',
      };
      
      // Split large libraries into separate chunks
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          // Separate Bootstrap and Swiper into their own chunks
          vendor: {
            test: /[\\/]node_modules[\\/](swiper|bootstrap)[\\/]/,
            name: 'vendor-ui',
            chunks: 'all',
          },
          // Motion library
          motion: {
            test: /[\\/]node_modules[\\/](motion)[\\/]/,
            name: 'vendor-motion',
            chunks: 'all',
          },
          // React/Next.js core
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom|next)[\\/]/,
            name: 'vendor-react',
            chunks: 'all',
          },
        },
      };
      
      // Additional optimizations
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
    }
    
    // Reduce bundle size for server
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        'sharp': 'commonjs sharp',
        'canvas': 'commonjs canvas',
      });
    }
    
    return config;
  },
  
  // Compress responses
  compress: true,
  
  // Disable source maps in production to reduce size
  productionBrowserSourceMaps: false,
  
  // Reduce the number of pages that can be open simultaneously
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
};

export default withBundleAnalyzer(nextConfig);
