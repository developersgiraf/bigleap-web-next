import React from 'react';
import GenericEditor from '../genericEditor/GenericEditor';
import { blogEditorConfig } from '../editorConfigs/blogEditorConfig';

const BlogEditor = ({ blog, blogs, onSave, onCancel }) => {
  return (
    <GenericEditor
      isOpen={true}
      item={blog}
      items={blogs}
      onSave={(data) => onSave(data)}
      onCancel={onCancel}
      config={blogEditorConfig}
    />
  );
};

export default BlogEditor;