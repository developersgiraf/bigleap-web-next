import ServiceImage from "../components/services-sect/servicesImage";
import GradientLights from "../components/gradient-lights/gradient";
import { GRADIENT_PRESETS } from "../components/gradient-lights/gradientConfig.js";
import TitleBanner from "../components/title-banner/titleBannerr";
import styles from "./blog.module.css";
import fs from 'fs';
import path from 'path';

// Function to transform blog data for ServiceImage component
function transformBlogData(blogs) {
  return blogs.map(blog => ({
    image: blog.image,
    caption: blog.caption || blog.title,
    link: blog.status === 'published' ? `/blog/${blog.slug}` : "#"
  }));
}

// Server-side function to read blogs
async function getPublishedBlogs() {
  try {
    const blogsDir = path.join(process.cwd(), 'data', 'blogs');
    const indexFile = path.join(blogsDir, 'index.json');
    
    if (!fs.existsSync(indexFile)) {
      return [];
    }
    
    const data = fs.readFileSync(indexFile, 'utf8');
    const blogs = JSON.parse(data);
    
    // Filter published blogs and sort by index
    return blogs
      .filter(blog => blog.status === 'published')
      .sort((a, b) => (a.index || 0) - (b.index || 0));
  } catch (error) {
    console.error('Error reading blogs:', error);
    return [];
  }
}

export default async function BlogPage() {
  let blogData = [];
  
  try {
    // Fetch published blogs from server
    const publishedBlogs = await getPublishedBlogs();
    blogData = transformBlogData(publishedBlogs);
  } catch (error) {
    console.error('Error loading blogs:', error);
    // Fallback to empty array
  }
  return (
    <>
      <TitleBanner title="Where Imagination Takes Flight: The Art of Animation" sub=""/>

      <div className={styles.blogPageWrapper}>
        <ServiceImage
          head="Our Blogs"
          data={blogData}
          anim="x"
          showSelect={false}
        />
      </div>
      <GradientLights customCounts={{
        xl: 4,  // Rich visual experience for extra large screens
        lg: 4,  // Substantial gradients for large screens
        md: 6,  // Balanced for medium screens
        sm: 8,  // Moderate for tablets
        xs: 8   // Minimal but visible on mobile
      }} />
    </>
  );
}
