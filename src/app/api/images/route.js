import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir, unlink, readdir, stat } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { servicesAPI } from '../../../lib/services-simple.js';

// GET - List images from a folder
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

// POST - Upload image or check usage
export async function POST(request) {
  try {
    const contentType = request.headers.get('content-type');
    
    // Check if it's a usage check request (JSON) or upload request (FormData)
    if (contentType?.includes('application/json')) {
      // Handle usage check
      const { imageUrl } = await request.json();
      
      if (!imageUrl) {
        return NextResponse.json({
          success: false,
          error: 'Image URL is required'
        }, { status: 400 });
      }

      // Check which services are using this image
      const servicesResponse = await servicesAPI.getAll();
      const usedByServices = [];
      
      if (!servicesResponse.success) {
        console.error('Failed to load services:', servicesResponse.error);
        return NextResponse.json({
          success: false,
          error: 'Failed to load services data'
        }, { status: 500 });
      }
      
      const allServices = servicesResponse.data || [];
      console.log(`Checking image usage for ${imageUrl} across ${allServices.length} services`);
      
      // Load full service data for each service to check images
      for (const serviceIndex of allServices) {
        try {
          const serviceResponse = await servicesAPI.getById(serviceIndex.id);
          if (serviceResponse.success) {
            const serviceData = serviceResponse.data;
            
            // Check all possible image fields in the service
            const imageFields = [
              serviceData.section01?.image,
              serviceData.section02?.image,
              serviceData.section03?.image,
              serviceData.section04?.image,
              serviceData.section05?.image,
              serviceData.bannerImage,
              serviceData.thumbnailImage,
              serviceData.thumbnail
            ];
            
            if (imageFields.some(field => field === imageUrl)) {
              usedByServices.push({
                id: serviceData.id,
                title: serviceData.bannerTitle || serviceData.title || serviceData.id,
                archived: serviceData.archived || false
              });
            }
          }
        } catch (error) {
          console.warn(`Error loading service ${serviceIndex.id}:`, error);
        }
      }

      // TODO: When portfolio and blog are migrated to JSON, add them here
      const usedByPortfolio = [];
      const usedByBlog = [];

      return NextResponse.json({
        success: true,
        data: {
          services: usedByServices,
          portfolio: usedByPortfolio,
          blog: usedByBlog,
          totalUsage: usedByServices.length + usedByPortfolio.length + usedByBlog.length
        }
      });
    } else {
      // Handle file upload
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
    }
  } catch (error) {
    console.error('Image operation error:', error);
    return NextResponse.json({
      success: false,
      message: 'Operation failed: ' + error.message
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

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return new NextResponse(null, { status: 200 });
}