"use client";

import { useState, useCallback } from 'react';
import styles from './gradient-color-picker.module.css';
import ColorPicker from './ColorPicker';

const GradientColorPicker = ({ 
  value = 'linear-gradient(to bottom, #000000, #000000)', 
  onChange, 
  label = "Background Gradient" 
}) => {
  // Helper functions for gradient colors
  const extractGradientColors = useCallback((gradientString) => {
    const match = gradientString.match(/#[a-fA-F0-9]{6}/g);
    return match && match.length >= 2 ? match : ['#000000', '#000000'];
  }, []);

  const getGradientColors = useCallback(() => {
    return extractGradientColors(value);
  }, [value, extractGradientColors]);

  const updateGradientColor = useCallback((colorIndex, newColor) => {
    const colors = getGradientColors();
    colors[colorIndex] = newColor;
    const newGradient = `linear-gradient(to bottom, ${colors[0]}, ${colors[1]})`;
    onChange?.(newGradient);
  }, [getGradientColors, onChange]);

  const handlePresetGradientClick = useCallback((gradient) => {
    onChange?.(gradient);
  }, [onChange]);

  const handleCopyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      // Could add a toast notification here
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  }, [value]);

  const currentColors = getGradientColors();
  
  const presetGradients = [
    'linear-gradient(to bottom, #000000, #1a1a1a)',
    'linear-gradient(to bottom, #2d0404, #000000)',
    'linear-gradient(to bottom, #ed232a, #4a0e0e)',
    'linear-gradient(to bottom, #ff6b6b, #ed232a)',
    'linear-gradient(to bottom, #1a1a1a, #2d0404)',
    'linear-gradient(to bottom, #4a0e0e, #000000)'
  ];

  return (
    <div className={styles.gradientColorPicker}>
      {label && <label className={styles.mainLabel}>{label}</label>}
      
      <div className={styles.gradientControls}>
        {/* Gradient Preview */}
        <div className={styles.gradientPreview}>
          <div 
            className={styles.previewBox}
            style={{ background: value }}
          >
            <span className={styles.previewLabel}>Preview</span>
          </div>
        </div>

        {/* Color Pickers */}
        <div className={styles.colorPickersContainer}>
          <div className={styles.colorPickerSection}>
            <ColorPicker
              value={currentColors[0]}
              onChange={(color) => updateGradientColor(0, color)}
              label="Top Color"
              showPresets={true}
              showCustomColors={true}
            />
          </div>

          <div className={styles.colorPickerSection}>
            <ColorPicker
              value={currentColors[1]}
              onChange={(color) => updateGradientColor(1, color)}
              label="Bottom Color"
              showPresets={true}
              showCustomColors={true}
            />
          </div>
        </div>

        {/* Gradient Presets */}
        <div className={styles.gradientPresets}>
          <label className={styles.presetsLabel}>Popular Gradients</label>
          <div className={styles.presetGradients}>
            {presetGradients.map((gradient, index) => (
              <div
                key={index}
                className={styles.presetGradient}
                style={{ background: gradient }}
                onClick={() => handlePresetGradientClick(gradient)}
                title={gradient}
              />
            ))}
          </div>
        </div>

        {/* CSS Output */}
        <div className={styles.cssOutput}>
          <label className={styles.cssLabel}>CSS Value</label>
          <div className={styles.cssValue}>
            <code>{value}</code>
            <button
              type="button"
              className={styles.copyButton}
              onClick={handleCopyToClipboard}
              title="Copy to clipboard"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradientColorPicker;