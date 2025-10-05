import TitleBanner from "@/app/components/title-banner/titleBannerr";
import GradientLights from "@/app/components/gradient-lights/gradient";
import { GRADIENT_PRESETS } from "@/app/components/gradient-lights/gradientConfig.js";
import styles from "../[blogdetail]/blog-details.module.css";
import Image from "next/image";
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';

// Server-side function to read blog data
async function getBlogData(blogId) {
  try {
    const blogsDir = path.join(process.cwd(), 'data', 'blogs');
    const indexFile = path.join(blogsDir, 'index.json');
    
    // First check if blog exists in index
    if (!fs.existsSync(indexFile)) {
      return null;
    }
    
    const indexData = fs.readFileSync(indexFile, 'utf8');
    const blogsIndex = JSON.parse(indexData);
    
    // Find blog by ID or slug
    const blogExists = blogsIndex.find(blog => blog.id === blogId || blog.slug === blogId);
    
    if (!blogExists) {
      return null;
    }
    
    // Read the full blog data
    const blogFile = path.join(blogsDir, `${blogExists.id}.json`);
    
    if (!fs.existsSync(blogFile)) {
      return null;
    }
    
    const blogData = fs.readFileSync(blogFile, 'utf8');
    return JSON.parse(blogData);
  } catch (error) {
    console.error('Error reading blog data:', error);
    return null;
  }
}

export default async function BlogDetailPage({ params }) {
  const { blogdetail } = params;
  
  let blogsData = null;
  
  try {
    // Fetch blog data by slug or ID
    blogsData = await getBlogData(blogdetail);
    
    // Check if blog exists and is published (don't show drafts on frontend)
    if (!blogsData || blogsData.status !== 'published') {
      notFound();
    }
  } catch (error) {
    console.error('Error loading blog:', error);
    notFound();
  }

  if (!blogsData) {
    notFound();
  }

  return (
    <>
      <TitleBanner title={blogsData.title} sub="" />
      <div className="container">
        <div className={styles.imageContainer}>
          <Image
            src={blogsData.image}
            width={500}
            height={400}
            alt={blogsData.title}
            className={styles.image}
          />
          <p className={styles.description}>{blogsData.description}</p>
        </div>
      </div>
      <GradientLights customCounts={{
        xl: 8,  // Rich visual experience for extra large screens
        lg: 2,  // Substantial gradients for large screens
        md: 3,  // Balanced for medium screens
        sm: 3,  // Moderate for tablets
        xs: 3   // Minimal but visible on mobile
      }} />
    </>
  );
}
