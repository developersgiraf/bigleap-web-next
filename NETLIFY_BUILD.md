# Netlify Build Configuration

## Environment Variables Required:
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET  
- NEXTAUTH_SECRET
- NEXTAUTH_URL
- NEXT_PUBLIC_ADMIN_EMAILS
- NODE_VERSION

## Build Optimizations Applied:
1. Removed standalone output to reduce function size
2. External node modules configuration
3. Aggressive cache exclusion
4. Enhanced webpack optimizations
5. Static asset optimization

## Function Size Optimizations:
- External modules: sharp, canvas, bcryptjs, next-auth, swiper, bootstrap
- Excluded files: cache, standalone, static files, node_modules
- Source maps disabled in production
- Compression enabled

## Expected Build Size:
- Target: < 200MB function bundle
- Static assets: Cached with immutable headers
- Images: Optimized via Netlify Image CDN

## Troubleshooting:
If deployment still fails with size issues:
1. Check for large dependencies in package.json
2. Verify .next/cache is being cleaned
3. Consider code splitting for large components
4. Use dynamic imports for heavy libraries