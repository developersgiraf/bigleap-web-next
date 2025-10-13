import React from 'react';
import GenericEditor from '../genericEditor/GenericEditor';
import { portfolioEditorConfig } from '../editorConfigs/portfolioEditorConfig';

const PortfolioEditor = ({ isOpen, portfolio, portfolios, onSave, onCancel }) => {
  return (
    <GenericEditor
      isOpen={isOpen}
      item={portfolio}
      items={portfolios}
      onSave={onSave}
      onCancel={onCancel}
      config={portfolioEditorConfig}
    />
  );
};

export default PortfolioEditor;