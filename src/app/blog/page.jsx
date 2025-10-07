import ServiceImage from "../components/services-sect/servicesImage";
import GradientLights from "../components/gradient-lights/gradient";
import { GRADIENT_PRESETS } from "../components/gradient-lights/gradientConfig.js";
import TitleBanner from "../components/title-banner/titleBannerr";
import styles from "./blog.module.css";
import CollapsibleTagCloud from "./components/CollapsibleTagCloud";
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

// Server-side function to get all tags
async function getAllTags() {
  try {
    const blogsDir = path.join(process.cwd(), 'data', 'blogs');
    const indexFile = path.join(blogsDir, 'index.json');
    
    if (!fs.existsSync(indexFile)) {
      return [];
    }
    
    const indexData = fs.readFileSync(indexFile, 'utf8');
    const blogsIndex = JSON.parse(indexData);
    
    // Get published blogs only
    const publishedBlogs = blogsIndex.filter(blog => blog.status === 'published');
    
    const allTags = new Set();
    const tagCounts = {};
    
    // Read each blog file and collect tags
    for (const blog of publishedBlogs) {
      try {
        const blogFile = path.join(blogsDir, `${blog.id}.json`);
        if (fs.existsSync(blogFile)) {
          const fileContent = fs.readFileSync(blogFile, 'utf8');
          const blogData = JSON.parse(fileContent);
          if (blogData.tags) {
            blogData.tags.forEach(tag => {
              allTags.add(tag);
              tagCounts[tag] = (tagCounts[tag] || 0) + 1;
            });
          }
        }
      } catch (error) {
        console.error(`Error reading blog file ${blog.id}:`, error.message);
        // Continue with next blog instead of crashing
      }
    }
    
    return Array.from(allTags).map(tag => ({
      name: tag,
      count: tagCounts[tag],
      displayName: tag.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    })).sort((a, b) => b.count - a.count);
  } catch (error) {
    console.error('Error reading tags:', error);
    return [];
  }
}

export default async function BlogPage() {
  let blogData = [];
  let allTags = [];
  
  try {
    // Fetch published blogs from server
    const publishedBlogs = await getPublishedBlogs();
    blogData = transformBlogData(publishedBlogs);
    
    // Get all available tags
    allTags = await getAllTags();
  } catch (error) {
    console.error('Error loading blogs:', error);
    // Fallback to empty array
  }

  return (
    <>

      <div className={styles.blogPageWrapper}>
        <ServiceImage
          head="Our Blogs"
          data={blogData}
          anim="x"
          showSelect={false}
        />

        {/* Tag Navigation */}
        {allTags.length > 0 && (
          <div className={styles.tagNavigation}>
            <div className="container">
              <div className={styles.tagHeader}>
                <h2>Browse by Tags</h2>
              </div>
              
              <CollapsibleTagCloud tags={allTags} />
            </div>
          </div>
        )}
      </div>
      <GradientLights customCounts={{
        xl: 2,  // Subtle gradients for extra large screens
        lg: 2,  // Minimal gradients for large screens
        md: 3,  // Light gradients for medium screens
        sm: 2,  // Very subtle for tablets
        xs: 1   // Minimal on mobile
      }} />
    </>
  );
}
