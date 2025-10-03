// Firebase utility functions for admin dashboard operations
import { db } from '../firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  serverTimestamp 
} from 'firebase/firestore';

// Blog management (Admin only)
export const addBlogPost = async (blogData) => {
  try {
    const docRef = await addDoc(collection(db, 'blogs'), {
      ...blogData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      published: blogData.published || false
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding blog post:', error);
    return { success: false, error: error.message };
  }
};

export const updateBlogPost = async (id, blogData) => {
  try {
    const docRef = doc(db, 'blogs', id);
    await updateDoc(docRef, {
      ...blogData,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating blog post:', error);
    return { success: false, error: error.message };
  }
};

export const getBlogPosts = async (limitCount = 10, publishedOnly = true) => {
  try {
    let q;
    if (publishedOnly) {
      q = query(
        collection(db, 'blogs'), 
        where('published', '==', true),
        orderBy('createdAt', 'desc'), 
        limit(limitCount)
      );
    } else {
      q = query(
        collection(db, 'blogs'), 
        orderBy('createdAt', 'desc'), 
        limit(limitCount)
      );
    }
    
    const querySnapshot = await getDocs(q);
    const blogs = [];
    querySnapshot.forEach((doc) => {
      blogs.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, data: blogs };
  } catch (error) {
    console.error('Error getting blog posts:', error);
    return { success: false, error: error.message };
  }
};

export const getBlogPost = async (id) => {
  try {
    const docRef = doc(db, 'blogs', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { success: true, data: { id: docSnap.id, ...docSnap.data() } };
    } else {
      return { success: false, error: 'Blog post not found' };
    }
  } catch (error) {
    console.error('Error getting blog post:', error);
    return { success: false, error: error.message };
  }
};

export const deleteBlogPost = async (id) => {
  try {
    await deleteDoc(doc(db, 'blogs', id));
    return { success: true };
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return { success: false, error: error.message };
  }
};

// Portfolio management (Admin only)
export const addPortfolioItem = async (portfolioData) => {
  try {
    const docRef = await addDoc(collection(db, 'portfolio'), {
      ...portfolioData,
      createdAt: serverTimestamp(),
      featured: portfolioData.featured || false
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding portfolio item:', error);
    return { success: false, error: error.message };
  }
};

export const updatePortfolioItem = async (id, portfolioData) => {
  try {
    const docRef = doc(db, 'portfolio', id);
    await updateDoc(docRef, {
      ...portfolioData,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating portfolio item:', error);
    return { success: false, error: error.message };
  }
};

export const getPortfolioItems = async (category = null, featuredOnly = false) => {
  try {
    let q;
    if (category && featuredOnly) {
      q = query(
        collection(db, 'portfolio'), 
        where('category', '==', category),
        where('featured', '==', true),
        orderBy('createdAt', 'desc')
      );
    } else if (category) {
      q = query(
        collection(db, 'portfolio'), 
        where('category', '==', category),
        orderBy('createdAt', 'desc')
      );
    } else if (featuredOnly) {
      q = query(
        collection(db, 'portfolio'), 
        where('featured', '==', true),
        orderBy('createdAt', 'desc')
      );
    } else {
      q = query(collection(db, 'portfolio'), orderBy('createdAt', 'desc'));
    }
    
    const querySnapshot = await getDocs(q);
    const items = [];
    querySnapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, data: items };
  } catch (error) {
    console.error('Error getting portfolio items:', error);
    return { success: false, error: error.message };
  }
};

export const deletePortfolioItem = async (id) => {
  try {
    await deleteDoc(doc(db, 'portfolio', id));
    return { success: true };
  } catch (error) {
    console.error('Error deleting portfolio item:', error);
    return { success: false, error: error.message };
  }
};

// Website content management (Admin only)
export const updateWebsiteContent = async (section, content) => {
  try {
    const docRef = doc(db, 'website_content', section);
    await updateDoc(docRef, {
      ...content,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating website content:', error);
    return { success: false, error: error.message };
  }
};

export const getWebsiteContent = async (section) => {
  try {
    const docRef = doc(db, 'website_content', section);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { success: true, data: docSnap.data() };
    } else {
      return { success: false, error: 'Content section not found' };
    }
  } catch (error) {
    console.error('Error getting website content:', error);
    return { success: false, error: error.message };
  }
};

// General CRUD operations (Admin only)
export const createDocument = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error(`Error creating document in ${collectionName}:`, error);
    return { success: false, error: error.message };
  }
};

export const getDocument = async (collectionName, id) => {
  try {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { success: true, data: { id: docSnap.id, ...docSnap.data() } };
    } else {
      return { success: false, error: 'Document not found' };
    }
  } catch (error) {
    console.error(`Error getting document from ${collectionName}:`, error);
    return { success: false, error: error.message };
  }
};

export const updateDocument = async (collectionName, id, data) => {
  try {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error(`Error updating document in ${collectionName}:`, error);
    return { success: false, error: error.message };
  }
};

export const deleteDocument = async (collectionName, id) => {
  try {
    await deleteDoc(doc(db, collectionName, id));
    return { success: true };
  } catch (error) {
    console.error(`Error deleting document from ${collectionName}:`, error);
    return { success: false, error: error.message };
  }
};

// Get all documents from a collection (Admin only)
export const getAllDocuments = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const documents = [];
    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, data: documents };
  } catch (error) {
    console.error(`Error getting all documents from ${collectionName}:`, error);
    return { success: false, error: error.message };
  }
};