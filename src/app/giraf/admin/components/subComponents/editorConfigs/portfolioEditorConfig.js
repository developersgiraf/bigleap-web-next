// Portfolio Editor Configuration
import GradientColorPicker from '../../shared/GradientColorPicker';

export const portfolioEditorConfig = {
  editTitle: 'Edit Portfolio',
  addTitle: 'Add Portfolio',
  saveButtonText: 'Save Portfolio',
  
  defaultData: {
    title: '',
    subtitle: '',
    description: '',
    content: '',
    videoUrl: '',
    titleDescription: '',
    category: '',
    tags: [],
    status: 'active',
    featured: false,
    order: 1,
    cardData: {
      title: '',
      description: '',
      image: '',
      readbtn: 'Explore More',
      background: 'linear-gradient(to bottom, #000000, #000000)',
      link: ''
    },
    projectGallery: {
      title: '',
      subtitle: '',
      projects: []
    },
    seo: {
      metaTitle: '',
      metaDescription: '',
      keywords: []
    }
  },
  
  defaultState: {},
  
  autoIndex: {
    field: 'order'
  },
  
  fields: {
    title: {
      type: 'text',
      label: 'Title',
      required: true
    },
    subtitle: {
      type: 'text',
      label: 'Subtitle'
    },
    category: {
      type: 'text',
      label: 'Category',
      placeholder: 'e.g., Creative, Development, Design, Marketing'
    },
    order: {
      type: 'number',
      label: 'Order',
      min: 1
    },
    description: {
      type: 'textarea',
      label: 'Description',
      rows: 3
    },
    content: {
      type: 'textarea',
      label: 'Content',
      rows: 4
    },
    videoUrl: {
      type: 'text',
      label: 'Video URL (YouTube ID)',
      placeholder: 'e.g., geMtgE6RmTQ'
    },
    cardData: {
      type: 'section',
      label: 'Card Display',
      defaultValue: {
        title: '',
        description: '',
        image: '',
        readbtn: 'Explore More',
        background: 'linear-gradient(to bottom, #000000, #000000)',
        link: ''
      },
      sections: {
        title: {
          type: 'text',
          label: 'Card Title'
        },
        image: {
          type: 'text',
          label: 'Card Image URL'
        },
        description: {
          type: 'textarea',
          label: 'Card Description',
          rows: 2
        },
        background: {
          type: 'custom',
          label: 'Background Gradient',
          render: ({ value, onChange }) => (
            <GradientColorPicker
              label="Background Gradient"
              value={value}
              onChange={onChange}
            />
          )
        }
      }
    },
    status: {
      type: 'select',
      label: 'Status',
      options: [
        { value: 'active', label: 'Active' },
        { value: 'draft', label: 'Draft' },
        { value: 'archived', label: 'Archived' }
      ]
    },
    featured: {
      type: 'checkbox',
      label: 'Featured Portfolio'
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
          label: 'Meta Title'
        },
        metaDescription: {
          type: 'textarea',
          label: 'Meta Description',
          rows: 2
        }
      }
    }
  },
  
  sections: [
    {
      key: 'basic',
      title: 'Basic Information',
      layout: 'grid',
      fields: ['title', 'subtitle', 'category', 'order']
    },
    {
      key: 'content',
      title: 'Content',
      layout: 'single',
      fields: ['description', 'content']
    },
    {
      key: 'media',
      title: 'Media',
      layout: 'single',
      fields: ['videoUrl']
    },
    {
      key: 'card',
      title: 'Card Display',
      layout: 'single',
      fields: ['cardData']
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
  
  validation: (formData) => {
    return { isValid: true };
  },
  
  transformData: (data, item) => {
    const submitData = { ...data };
    
    if (item) {
      // When editing, preserve the original ID and slug
      submitData.id = item.id;
      submitData.slug = item.slug;
      submitData.cardData = {
        ...submitData.cardData,
        title: submitData.cardData.title || submitData.title,
        link: `/portfolio/${item.slug}`
      };
      submitData.createdDate = item.createdDate;
    } else {
      // For new portfolios, generate slug from title
      const slug = submitData.title.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      submitData.slug = slug;
      submitData.id = slug;
      submitData.cardData = {
        ...submitData.cardData,
        title: submitData.cardData.title || submitData.title,
        link: `/portfolio/${slug}`
      };
      submitData.createdDate = new Date().toISOString().split('T')[0];
    }
    
    return submitData;
  }
};