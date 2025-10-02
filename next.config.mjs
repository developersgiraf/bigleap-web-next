/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove standalone output for Netlify - this was causing the 250MB issue
  // output: 'standalone', // This creates large function bundles
  
  // Optimize images
  images: {
    unoptimized: true,
    domains: [], // Add any external image domains here
  },
  
  // Experimental features for optimization
  experimental: {
    optimizePackageImports: ['react', 'react-dom', 'swiper', 'bootstrap'],
  },
  
  // Turbopack configuration (moved from experimental.turbo)
  turbopack: {
    rules: {
      '*.css': {
        loaders: ['css-loader'],
        as: '*.css',
      },
    },
  },
  
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

export default nextConfig;
