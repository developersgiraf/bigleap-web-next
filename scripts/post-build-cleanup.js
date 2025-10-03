#!/usr/bin/env node

/**
 * Post-build cleanup for Netlify deployment
 * This script removes cache and other unnecessary files after build
 */

const fs = require('fs');
const path = require('path');

console.log('🧹 Starting post-build cleanup for Netlify...');

// Paths to clean up after build
const cleanupPaths = [
  '.next/cache',
  '.next/static/**/*.map',
  '.next/server/**/*.map',
];

function removeDirectory(dirPath) {
  if (fs.existsSync(dirPath)) {
    const stats = fs.statSync(dirPath);
    const sizeMB = (stats.isDirectory() ? getDirSize(dirPath) : stats.size) / 1024 / 1024;
    
    console.log(`  Removing ${path.relative(process.cwd(), dirPath)} (${sizeMB.toFixed(2)} MB)`);
    fs.rmSync(dirPath, { recursive: true, force: true });
    return sizeMB;
  }
  return 0;
}

function getDirSize(dirPath) {
  let totalSize = 0;
  const files = fs.readdirSync(dirPath);
  
  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    const stats = fs.statSync(filePath);
    
    if (stats.isDirectory()) {
      totalSize += getDirSize(filePath);
    } else {
      totalSize += stats.size;
    }
  });
  
  return totalSize;
}

let totalSaved = 0;

cleanupPaths.forEach(pattern => {
  const fullPath = path.join(process.cwd(), pattern);
  totalSaved += removeDirectory(fullPath);
});

// Calculate final size
const nextDir = path.join(process.cwd(), '.next');
if (fs.existsSync(nextDir)) {
  const finalSize = getDirSize(nextDir) / 1024 / 1024;
  console.log(`📊 Final build size: ${finalSize.toFixed(2)} MB`);
  console.log(`💾 Space saved: ${totalSaved.toFixed(2)} MB`);
  
  if (finalSize > 200) {
    console.warn('⚠️  Build size is still large, may approach Netlify limits');
  } else {
    console.log('✅ Build size optimized for Netlify deployment');
  }
} else {
  console.log('❌ .next directory not found');
}

console.log('🎉 Post-build cleanup completed!');