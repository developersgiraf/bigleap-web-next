# Uploads Directory

This directory stores uploaded images from the admin interface.

## Structure:
- `/services/` - Service-related images
- `/portfolio/` - Portfolio images  
- `/blog/` - Blog images
- `/general/` - General uploads

Images are automatically organized into subdirectories and named with timestamps to prevent conflicts.

## File Naming Convention:
`original-name_timestamp.extension`

Example: `animation-service_1696204800000.jpg`

## Security:
- Only image files are accepted
- 10MB file size limit
- Automatic filename sanitization
- Safe directory traversal prevention
