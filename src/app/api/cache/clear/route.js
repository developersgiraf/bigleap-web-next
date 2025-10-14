import { NextResponse } from 'next/server';

// In-memory cache store (you might want to use Redis or another cache store in production)
const cache = new Map();

export async function POST(request) {
  try {
    const { pattern } = await request.json();
    
    if (!pattern) {
      return NextResponse.json(
        { error: 'Pattern is required' },
        { status: 400 }
      );
    }

    let clearedCount = 0;

    if (pattern === '*') {
      // Clear all cache
      clearedCount = cache.size;
      cache.clear();
    } else {
      // Clear cache entries matching the pattern
      const keysToDelete = [];
      
      for (const key of cache.keys()) {
        // Simple pattern matching (supports * wildcard)
        const regex = new RegExp(pattern.replace(/\*/g, '.*'));
        if (regex.test(key)) {
          keysToDelete.push(key);
        }
      }
      
      keysToDelete.forEach(key => {
        cache.delete(key);
        clearedCount++;
      });
    }

    return NextResponse.json({
      success: true,
      message: `Cache cleared successfully`,
      clearedCount,
      pattern
    });

  } catch (error) {
    console.error('Error clearing cache:', error);
    return NextResponse.json(
      { error: 'Failed to clear cache' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    cacheSize: cache.size,
    keys: Array.from(cache.keys())
  });
}