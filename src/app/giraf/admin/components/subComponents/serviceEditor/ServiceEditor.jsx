import React from 'react';
import GenericEditor from '../genericEditor/GenericEditor';
import { serviceEditorConfig } from '../editorConfigs/serviceEditorConfig';

const ServiceEditor = ({ isOpen, service, services, onSave, onCancel }) => {
  return (
    <GenericEditor
      isOpen={isOpen}
      item={service}
      items={services}
      onSave={onSave}
      onCancel={onCancel}
      config={serviceEditorConfig}
    />
  );
};

export default ServiceEditor;