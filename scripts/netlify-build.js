#!/usr/bin/env node

/**
 * Netlify-specific build script to optimize function size
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Netlify-optimized build...');

// Clean up before build
const cleanPaths = [
  '.next',
  'node_modules/.cache',
  '.netlify'
];

cleanPaths.forEach(dir => {
  const fullPath = path.join(process.cwd(), dir);
  if (fs.existsSync(fullPath)) {
    console.log(`🧹 Cleaning ${dir}`);
    try {
      fs.rmSync(fullPath, { recursive: true, force: true });
    } catch (error) {
      console.warn(`⚠️  Could not clean ${dir}:`, error.message);
    }
  }
});

// Set environment variables for optimized build
process.env.NODE_ENV = 'production';
process.env.NEXT_TELEMETRY_DISABLED = '1';
process.env.NEXT_PRIVATE_STANDALONE = 'false';

console.log('✅ Pre-build cleanup completed');
console.log('📦 Starting Next.js build...');

// Run the actual build
const { spawn } = require('child_process');
const buildProcess = spawn('npm', ['run', 'build'], {
  stdio: 'inherit',
  shell: true
});

buildProcess.on('close', (code) => {
  if (code !== 0) {
    console.error('❌ Build failed with code:', code);
    process.exit(code);
  }
  
  console.log('✅ Build completed successfully');
  
  // Post-build cleanup for function size optimization
  console.log('🔧 Post-build optimization...');
  
  const postCleanPaths = [
    '.next/cache',
    '.next/static/chunks/**/*.map',
    '.next/server/**/*.map',
  ];
  
  postCleanPaths.forEach(pattern => {
    const fullPath = path.join(process.cwd(), pattern);
    if (fs.existsSync(fullPath)) {
      console.log(`🧹 Removing ${pattern} to reduce function size`);
      try {
        fs.rmSync(fullPath, { recursive: true, force: true });
      } catch (error) {
        console.warn(`⚠️  Could not remove ${pattern}:`, error.message);
      }
    }
  });
  
  // Create a size report
  try {
    const nextDir = path.join(process.cwd(), '.next');
    if (fs.existsSync(nextDir)) {
      const stats = getDirectorySize(nextDir);
      console.log(`📊 Build size: ${(stats / 1024 / 1024).toFixed(2)} MB`);
      
      if (stats > 200 * 1024 * 1024) { // 200MB
        console.warn('⚠️  Build size is large, may cause deployment issues');
      }
    }
  } catch (error) {
    console.warn('⚠️  Could not calculate build size:', error.message);
  }
  
  console.log('✅ Optimization completed');
});

buildProcess.on('error', (error) => {
  console.error('❌ Build process error:', error);
  process.exit(1);
});

function getDirectorySize(dirPath) {
  let totalSize = 0;
  const files = fs.readdirSync(dirPath);
  
  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    const stats = fs.statSync(filePath);
    
    if (stats.isDirectory()) {
      totalSize += getDirectorySize(filePath);
    } else {
      totalSize += stats.size;
    }
  });
  
  return totalSize;
}