"use client";

import { useState, useCallback, useRef } from 'react';
import styles from './gradient-color-picker.module.css';

const GradientColorPicker = ({ 
  value = 'linear-gradient(to bottom, #000000, #000000)', 
  onChange, 
  label = "Background Gradient" 
}) => {
  // Refs for color inputs
  const topColorInputRef = useRef(null);
  const bottomColorInputRef = useRef(null);

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

  const presetColors = ['#000000', '#1a1a1a', '#2d0404', '#4a0e0e', '#ed232a', '#ff6b6b', '#ffffff', '#f8f9fa'];
  
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
            <label className={styles.colorLabel}>
              <span>Top Color</span>
              <span className={styles.colorValue}>{currentColors[0]}</span>
            </label>
            <div className={styles.customColorPicker}>
              <div 
                className={styles.colorDisplay}
                style={{ backgroundColor: currentColors[0] }}
                onClick={() => topColorInputRef.current?.click()}
              >
                <div className={styles.colorOverlay}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-5.52-4.48-10-9-10zM5.5 12c-.83 0-1.5-.67-1.5-1.5S4.67 9 5.5 9 7 9.67 7 10.5 6.33 12 5.5 12zm3-4C7.67 8 7 7.33 7 6.5S7.67 5 8.5 5s1.5.67 1.5 1.5S9.33 8 8.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S12.67 5 13.5 5s1.5.67 1.5 1.5S14.33 8 13.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S15.67 9 16.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                  </svg>
                </div>
              </div>
              <input
                ref={topColorInputRef}
                type="color"
                value={currentColors[0]}
                onChange={(e) => updateGradientColor(0, e.target.value)}
                className={styles.hiddenColorInput}
              />
              <input
                type="text"
                value={currentColors[0]}
                onChange={(e) => updateGradientColor(0, e.target.value)}
                className={styles.colorCodeInput}
                placeholder="#000000"
                pattern="#[a-fA-F0-9]{6}"
                maxLength="7"
              />
            </div>
            {/* Preset Colors for Top */}
            <div className={styles.presetColors}>
              {presetColors.map(color => (
                <div
                  key={`top-${color}`}
                  className={styles.presetColor}
                  style={{ backgroundColor: color }}
                  onClick={() => updateGradientColor(0, color)}
                  title={color}
                />
              ))}
            </div>
          </div>

          <div className={styles.colorPickerSection}>
            <label className={styles.colorLabel}>
              <span>Bottom Color</span>
              <span className={styles.colorValue}>{currentColors[1]}</span>
            </label>
            <div className={styles.customColorPicker}>
              <div 
                className={styles.colorDisplay}
                style={{ backgroundColor: currentColors[1] }}
                onClick={() => bottomColorInputRef.current?.click()}
              >
                <div className={styles.colorOverlay}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-5.52-4.48-10-9-10zM5.5 12c-.83 0-1.5-.67-1.5-1.5S4.67 9 5.5 9 7 9.67 7 10.5 6.33 12 5.5 12zm3-4C7.67 8 7 7.33 7 6.5S7.67 5 8.5 5s1.5.67 1.5 1.5S9.33 8 8.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S12.67 5 13.5 5s1.5.67 1.5 1.5S14.33 8 13.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S15.67 9 16.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                  </svg>
                </div>
              </div>
              <input
                ref={bottomColorInputRef}
                type="color"
                value={currentColors[1]}
                onChange={(e) => updateGradientColor(1, e.target.value)}
                className={styles.hiddenColorInput}
              />
              <input
                type="text"
                value={currentColors[1]}
                onChange={(e) => updateGradientColor(1, e.target.value)}
                className={styles.colorCodeInput}
                placeholder="#000000"
                pattern="#[a-fA-F0-9]{6}"
                maxLength="7"
              />
            </div>
            {/* Preset Colors for Bottom */}
            <div className={styles.presetColors}>
              {presetColors.map(color => (
                <div
                  key={`bottom-${color}`}
                  className={styles.presetColor}
                  style={{ backgroundColor: color }}
                  onClick={() => updateGradientColor(1, color)}
                  title={color}
                />
              ))}
            </div>
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