import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const folder = formData.get('folder') || 'general';
    const customFileName = formData.get('fileName');

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'Please upload a valid image file' },
        { status: 400 }
      );
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size must be less than 10MB' },
        { status: 400 }
      );
    }

    // Generate safe filename
    const timestamp = Date.now();
    const originalName = customFileName || file.name;
    const extension = originalName.split('.').pop().toLowerCase();
    
    // Clean filename - remove special characters and spaces
    const baseName = originalName
      .split('.')[0]
      .replace(/[^a-zA-Z0-9-_]/g, '-')
      .replace(/-+/g, '-')
      .toLowerCase();
    
    const finalFileName = `${baseName}_${timestamp}.${extension}`;

    // Create upload directory structure
    const uploadDir = join(process.cwd(), 'public', 'uploads', folder);
    
    // Ensure directory exists
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Convert file to buffer and write to disk
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const filePath = join(uploadDir, finalFileName);
    await writeFile(filePath, buffer);

    // Return the public URL
    const publicUrl = `/uploads/${folder}/${finalFileName}`;

    console.log('Image uploaded successfully:', publicUrl);

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName: finalFileName,
      size: file.size,
      type: file.type,
      message: 'Image uploaded successfully'
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return new NextResponse(null, { status: 200 });
}