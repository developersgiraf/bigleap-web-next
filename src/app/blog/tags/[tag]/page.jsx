import ServiceImage from "../../../components/services-sect/servicesImage";
import GradientLights from "../../../components/gradient-lights/gradient";
import TitleBanner from "../../../components/title-banner/titleBannerr";
import styles from "../../blog.module.css";
import CollapsibleTagCloud from "../../components/CollapsibleTagCloud";
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Function to transform blog data for ServiceImage component
function transformBlogData(blogs) {
  return blogs.map(blog => ({
    image: blog.image,
    caption: blog.caption || blog.title,
    link: `/blog/${blog.slug}`
  }));
}

// Server-side function to read all blogs and get tags
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

// Server-side function to get blogs by tag
async function getBlogsByTag(tag) {
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
    const filteredBlogs = [];
    
    // Read each blog file and check if it has the requested tag
    for (const blog of publishedBlogs) {
      try {
        const blogFile = path.join(blogsDir, `${blog.id}.json`);
        if (fs.existsSync(blogFile)) {
          const fileContent = fs.readFileSync(blogFile, 'utf8');
          const blogData = JSON.parse(fileContent);
          if (blogData.tags && blogData.tags.includes(tag)) {
            filteredBlogs.push(blog);
          }
        }
      } catch (error) {
        console.error(`Error reading blog file ${blog.id}:`, error.message);
        // Continue with next blog instead of crashing
      }
    }
    
    return filteredBlogs.sort((a, b) => (a.index || 0) - (b.index || 0));
  } catch (error) {
    console.error('Error reading blogs by tag:', error);
    return [];
  }
}

export default async function BlogTagPage({ params }) {
  const { tag } = params;
  
  // Get blogs for this tag
  const taggedBlogs = await getBlogsByTag(tag);
  
  // Get all available tags for the tag cloud
  const allTags = await getAllTags();
  
  // Check if tag exists
  const tagExists = allTags.some(t => t.name === tag);
  
  if (!tagExists) {
    notFound();
  }
  
  const blogData = transformBlogData(taggedBlogs);
  const currentTag = allTags.find(t => t.name === tag);
  const displayName = currentTag?.displayName || tag.replace(/-/g, ' ');
  
  return (
    <>
      <TitleBanner 
        title={`${displayName} Articles`} 
        sub={`Found ${taggedBlogs.length} article${taggedBlogs.length !== 1 ? 's' : ''} with this tag`}
      />

      <div className={styles.blogPageWrapper}>
        {/* Blog Articles */}
        {blogData.length > 0 ? (
          <ServiceImage
            head={`${displayName} Articles`}
            data={blogData}
            anim="x"
            showSelect={false}
          />
        ) : (
          <div className={styles.noResults}>
            <div className="container">
              <h3>No articles found for "{displayName}"</h3>
              <p>Try browsing other tags or <Link href="/blog">view all articles</Link></p>
            </div>
          </div>
        )}

        {/* Tag Navigation */}
        <div className={styles.tagNavigation}>
          <div className="container">
            <div className={styles.tagHeader}>
              <h2>Browse by Tags</h2>
              <Link href="/blog" className={styles.viewAllLink}>
                View All Articles
              </Link>
            </div>
            
            <CollapsibleTagCloud 
              tags={allTags.map(t => t.name)} 
              activeTag={tag} 
            />
          </div>
        </div>
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