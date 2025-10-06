// Blog Editor Configuration
export const blogEditorConfig = {
  editTitle: 'Edit Blog Post',
  addTitle: 'Add New Blog Post',
  saveButtonText: 'Save Blog Post',
  
  defaultData: {
    title: '',
    slug: '',
    customSlug: '',
    image: '',
    caption: '',
    description: '',
    publishedDate: '',
    lastModified: '',
    category: '',
    tags: [],
    featured: false,
    status: 'draft',
    author: 'BigLeap Team',
    seo: {
      metaTitle: '',
      metaDescription: '',
      keywords: []
    }
  },
  
  defaultState: {
    useCustomSlug: false,
    tagInput: '',
    showTagSuggestions: false,
    availableTags: [],
    availableCategories: [],
    showAddCategory: false,
    newCategory: ''
  },
  
  fields: {
    title: {
      type: 'text',
      label: 'Blog Title',
      placeholder: 'e.g., The Art of 2D Animation',
      required: true
    },
    caption: {
      type: 'text',
      label: 'Caption',
      placeholder: 'Short display caption'
    },
    image: {
      type: 'image',
      label: 'Blog Image',
      folder: 'blog',
      placeholder: 'Upload blog featured image or enter URL'
    },
    description: {
      type: 'textarea',
      label: 'Description',
      placeholder: 'Detailed blog content description',
      rows: 6,
      required: true
    },
    category: {
      type: 'custom',
      label: 'Category',
      render: ({ value, onChange, additionalState, onStateChange }) => (
        <div className="categoryInputContainer">
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required
            className="selectInput"
          >
            <option value="">Select Category</option>
            {additionalState.availableCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
            <option value="Animation">Animation</option>
            <option value="Design">Design</option>
            <option value="Post Production">Post Production</option>
            <option value="Technology">Technology</option>
            <option value="Industry News">Industry News</option>
            <option value="Tutorials">Tutorials</option>
          </select>
          <button 
            type="button" 
            onClick={() => onStateChange('showAddCategory', !additionalState.showAddCategory)}
            className="addCategoryBtn"
          >
            + Add New Category
          </button>
          {additionalState.showAddCategory && (
            <div style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
              <input
                type="text"
                value={additionalState.newCategory}
                onChange={(e) => onStateChange('newCategory', e.target.value)}
                placeholder="Enter new category"
                style={{ flex: 1 }}
                className="textInput"
              />
              <button 
                type="button" 
                onClick={() => {
                  const newCat = additionalState.newCategory.trim();
                  if (newCat && !additionalState.availableCategories.includes(newCat)) {
                    onStateChange('availableCategories', [...additionalState.availableCategories, newCat]);
                    onChange(newCat);
                    onStateChange('newCategory', '');
                    onStateChange('showAddCategory', false);
                  }
                }}
                className="addCategoryBtn"
              >
                Add
              </button>
            </div>
          )}
        </div>
      )
    },
    author: {
      type: 'text',
      label: 'Author',
      placeholder: 'Author name'
    },
    publishedDate: {
      type: 'date',
      label: 'Published Date',
      note: 'This date will be preserved once the blog is created'
    },
    status: {
      type: 'select',
      label: 'Publication Status',
      options: [
        { value: 'draft', label: 'Draft' },
        { value: 'published', label: 'Published' }
      ]
    },
    featured: {
      type: 'checkbox',
      label: 'Featured blog post',
      note: 'Featured posts are highlighted on the blog homepage.'
    },
    seo: {
      type: 'section',
      label: 'SEO Settings',
      defaultValue: {
        metaTitle: '',
        metaDescription: '',
        keywords: []
      },
      sections: {
        metaTitle: {
          type: 'text',
          label: 'SEO Meta Title',
          placeholder: 'SEO optimized title for search engines',
          note: 'Recommended: 50-60 characters'
        },
        metaDescription: {
          type: 'textarea',
          label: 'SEO Meta Description',
          placeholder: 'Brief description for search engine results',
          rows: 3,
          note: 'Recommended: 150-160 characters'
        }
      }
    }
  },
  
  sections: [
    {
      key: 'basic',
      title: 'Basic Information',
      layout: 'grid',
      fields: ['title', 'caption']
    },
    {
      key: 'content',
      title: 'Content',
      layout: 'single',
      fields: ['image', 'description']
    },
    {
      key: 'meta',
      title: 'Metadata',
      layout: 'grid',
      fields: ['category', 'author']
    },
    {
      key: 'settings',
      title: 'Settings',
      layout: 'grid',
      fields: ['status', 'featured']
    },
    {
      key: 'seo',
      title: 'SEO',
      layout: 'single',
      fields: ['seo']
    }
  ],
  
  validation: (formData, item, state) => {
    if (!item && state.useCustomSlug && formData.customSlug) {
      const isValidSlug = /^[a-z0-9-]+$/.test(formData.customSlug);
      if (!isValidSlug) {
        return {
          isValid: false,
          message: 'Invalid slug format. Slug must contain only lowercase letters, numbers, and hyphens.'
        };
      }
    }
    return { isValid: true };
  },
  
  transformData: (data, item, state) => {
    const submitData = { ...data };
    
    // Add custom slug only for NEW blogs
    if (!item && state.useCustomSlug && data.customSlug) {
      submitData.customSlug = data.customSlug;
    }
    
    // Set current date if new blog and no published date set
    if (!item && !data.publishedDate) {
      submitData.publishedDate = new Date().toISOString().split('T')[0];
    }
    
    return submitData;
  }
};