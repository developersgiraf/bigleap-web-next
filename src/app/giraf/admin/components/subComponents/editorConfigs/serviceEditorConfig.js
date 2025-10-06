// Service Editor Configuration
export const serviceEditorConfig = {
  editTitle: 'Edit Service',
  addTitle: 'Add New Service',
  saveButtonText: 'Save Service',
  
  defaultData: {
    title: '',
    bannerTitle: '',
    customSlug: '',
    archived: false,
    index: 0,
    thumbnail: '',
    section01: {
      image: '',
      heading: '',
      description: ''
    },
    section02: {
      DescTitle: '',
      Descpara: '',
      subsections: []
    },
    listHead: '',
    listPara: '',
    list: []
  },
  
  defaultState: {
    useCustomSlug: false
  },
  
  autoIndex: {
    field: 'index'
  },
  
  fields: {
    title: {
      type: 'text',
      label: 'Service Title',
      placeholder: 'e.g., 2D Animation',
      required: true
    },
    bannerTitle: {
      type: 'text',
      label: 'Banner Title',
      placeholder: 'Title for banner section',
      required: true
    },
    index: {
      type: 'number',
      label: 'Display Order',
      placeholder: '0',
      min: 0,
      max: 999,
      note: 'Services will be displayed in ascending order (0, 1, 2, etc.). Lower numbers appear first.'
    },
    thumbnail: {
      type: 'image',
      label: 'Thumbnail Image',
      folder: 'services',
      placeholder: 'Upload thumbnail image for card display',
      note: 'This image will be used for the service card thumbnail. Recommended size: 400x300px.'
    },
    archived: {
      type: 'checkbox',
      label: 'Archive this service',
      note: 'Archived services are hidden from the public website but can be restored later.'
    },
    section01: {
      type: 'section',
      label: 'Section 1 - Main Content',
      defaultValue: {
        image: '',
        heading: '',
        description: ''
      },
      sections: {
        image: {
          type: 'image',
          label: 'Service Image',
          folder: 'services',
          placeholder: 'Upload service image or enter URL'
        },
        heading: {
          type: 'text',
          label: 'Heading',
          placeholder: 'Main heading for the service',
          required: true
        },
        description: {
          type: 'textarea',
          label: 'Description',
          placeholder: 'Detailed description of the service',
          rows: 4,
          required: true
        }
      }
    },
    section02: {
      type: 'section',
      label: 'Section 2 - Detailed Information',
      defaultValue: {
        DescTitle: '',
        Descpara: '',
        subsections: []
      },
      sections: {
        DescTitle: {
          type: 'text',
          label: 'Description Title',
          placeholder: 'Title for detailed section',
          note: '💡 Styling Tip: Use "||" to split text for alternating colors. Example: "Our ||Creative||Process" will style "Our","Process" white and "Creative" red.'
        },
        Descpara: {
          type: 'textarea',
          label: 'Description Paragraph',
          placeholder: 'Detailed explanation',
          rows: 4
        }
      }
    },
    listHead: {
      type: 'text',
      label: 'List Heading',
      placeholder: 'Heading for services list'
    },
    listPara: {
      type: 'textarea',
      label: 'List Paragraph',
      placeholder: 'Description for services list',
      rows: 2
    }
  },
  
  sections: [
    {
      key: 'basic',
      title: 'Basic Information',
      layout: 'grid',
      fields: ['title', 'bannerTitle', 'index']
    },
    {
      key: 'media',
      title: 'Media',
      layout: 'single',
      fields: ['thumbnail']
    },
    {
      key: 'settings',
      title: 'Settings',
      layout: 'single',
      fields: ['archived']
    },
    {
      key: 'content1',
      title: 'Main Content',
      layout: 'single',
      fields: ['section01']
    },
    {
      key: 'content2',
      title: 'Detailed Information',
      layout: 'single',
      fields: ['section02']
    },
    {
      key: 'list',
      title: 'Services List',
      layout: 'grid',
      fields: ['listHead', 'listPara']
    }
  ],
  
  validation: (formData, item, state) => {
    if (!item && state.useCustomSlug && formData.customSlug) {
      const isValidSlug = /^[a-zA-Z][a-zA-Z0-9-_]*$/.test(formData.customSlug);
      if (!isValidSlug) {
        return {
          isValid: false,
          message: 'Invalid slug format. Slug must start with a letter and contain only letters, numbers, hyphens, and underscores.'
        };
      }
    }
    return { isValid: true };
  },
  
  transformData: (data, item, state) => {
    const submitData = { ...data };
    
    // Add custom slug only for NEW services
    if (!item && state.useCustomSlug && data.customSlug) {
      submitData.customSlug = data.customSlug;
    }
    
    return submitData;
  }
};