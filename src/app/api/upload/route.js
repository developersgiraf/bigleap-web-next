import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir, unlink } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

// POST - Upload image
export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const folder = formData.get('folder') || 'general';
    const customFileName = formData.get('fileName');

    if (!file) {
      return NextResponse.json({
        success: false,
        message: 'No file provided'
      }, { status: 400 });
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({
        success: false,
        message: 'Please upload only image files'
      }, { status: 400 });
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json({
        success: false,
        message: 'File size must be less than 10MB'
      }, { status: 400 });
    }

    // Create upload directory structure
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', folder);
    
    // Ensure directory exists
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const originalName = customFileName || file.name;
    const extension = originalName.split('.').pop().toLowerCase();
    
    // Sanitize filename
    const baseName = originalName.split('.')[0]
      .replace(/[^a-zA-Z0-9-_]/g, '-')
      .replace(/-+/g, '-')
      .toLowerCase();
    
    const finalFileName = `${baseName}_${timestamp}.${extension}`;
    const filePath = path.join(uploadDir, finalFileName);

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    await writeFile(filePath, buffer);

    // Generate public URL
    const publicUrl = `/uploads/${folder}/${finalFileName}`;

    console.log('File uploaded successfully:', publicUrl);

    return NextResponse.json({
      success: true,
      message: 'File uploaded successfully',
      url: publicUrl,
      fileName: finalFileName,
      size: file.size,
      type: file.type
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({
      success: false,
      message: 'Upload failed: ' + error.message
    }, { status: 500 });
  }
}

// DELETE - Delete image
export async function DELETE(request) {
  try {
    const { imageUrl } = await request.json();

    if (!imageUrl || !imageUrl.startsWith('/uploads/')) {
      return NextResponse.json({
        success: false,
        message: 'Invalid image URL'
      }, { status: 400 });
    }

    // Convert URL to file path
    const filePath = path.join(process.cwd(), 'public', imageUrl);

    // Check if file exists and delete
    if (existsSync(filePath)) {
      await unlink(filePath);
      console.log('File deleted successfully:', imageUrl);
      
      return NextResponse.json({
        success: true,
        message: 'File deleted successfully'
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'File not found'
      }, { status: 404 });
    }

  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({
      success: false,
      message: 'Delete failed: ' + error.message
    }, { status: 500 });
  }
}