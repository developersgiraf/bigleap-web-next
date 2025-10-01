import { NextResponse } from 'next/server';
import { readdir, stat } from 'fs/promises';
import path from 'path';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const folder = searchParams.get('folder') || 'services';
    
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', folder);
    
    try {
      const files = await readdir(uploadsDir);
      const imageFiles = [];
      
      for (const file of files) {
        const filePath = path.join(uploadsDir, file);
        const stats = await stat(filePath);
        
        // Check if it's a file and has an image extension
        if (stats.isFile() && /\.(jpg|jpeg|png|gif|webp)$/i.test(file)) {
          imageFiles.push({
            name: file,
            url: `/uploads/${folder}/${file}`,
            size: stats.size,
            modified: stats.mtime
          });
        }
      }
      
      // Sort by modification date (newest first)
      imageFiles.sort((a, b) => new Date(b.modified) - new Date(a.modified));
      
      return NextResponse.json({
        success: true,
        data: imageFiles
      });
    } catch (dirError) {
      // Directory doesn't exist or is empty
      return NextResponse.json({
        success: true,
        data: []
      });
    }
  } catch (error) {
    console.error('Error fetching uploaded images:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch images'
    }, { status: 500 });
  }
}