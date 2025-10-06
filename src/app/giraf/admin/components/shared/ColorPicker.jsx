"use client";

import { useState, useCallback, useRef, useEffect } from 'react';
import styles from './color-picker.module.css';

const ColorPicker = ({ 
  value = '#000000', 
  onChange, 
  label = "Color",
  showPresets = true,
  showCustomColors = true,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customColors, setCustomColors] = useState(() => {
    // Load custom colors from localStorage
    try {
      const saved = localStorage.getItem('colorPicker-customColors');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [lightness, setLightness] = useState(50);
  const [inputValue, setInputValue] = useState(value);

  const pickerRef = useRef(null);
  const colorAreaRef = useRef(null);
  const hueSliderRef = useRef(null);

  // Convert hex to HSL
  const hexToHsl = useCallback((hex) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
        default: h = 0;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  }, []);

  // Convert HSL to hex
  const hslToHex = useCallback((h, s, l) => {
    h /= 360;
    s /= 100;
    l /= 100;

    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    let r, g, b;
    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    const toHex = (c) => {
      const hex = Math.round(c * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }, []);

  // Initialize HSL values from hex value
  useEffect(() => {
    if (value && value.match(/^#[0-9A-Fa-f]{6}$/)) {
      const hsl = hexToHsl(value);
      setHue(hsl.h);
      setSaturation(hsl.s);
      setLightness(hsl.l);
      setInputValue(value.toUpperCase());
    }
  }, [value, hexToHsl]);

  // Update color from HSL
  const updateColorFromHSL = useCallback((newHue, newSat, newLight) => {
    const hex = hslToHex(newHue, newSat, newLight);
    setInputValue(hex.toUpperCase());
    onChange?.(hex);
  }, [hslToHex, onChange]);

  // Handle input change
  const handleInputChange = useCallback((e) => {
    const newValue = e.target.value.toUpperCase();
    setInputValue(newValue);
    
    if (newValue.match(/^#[0-9A-Fa-f]{6}$/)) {
      const hsl = hexToHsl(newValue);
      setHue(hsl.h);
      setSaturation(hsl.s);
      setLightness(hsl.l);
      onChange?.(newValue);
    }
  }, [hexToHsl, onChange]);

  // Add to custom colors
  const addToCustomColors = useCallback((color) => {
    if (!customColors.includes(color)) {
      const newCustomColors = [color, ...customColors.slice(0, 15)]; // Keep max 16 colors
      setCustomColors(newCustomColors);
      try {
        localStorage.setItem('colorPicker-customColors', JSON.stringify(newCustomColors));
      } catch (e) {
        console.warn('Could not save custom colors to localStorage');
      }
    }
  }, [customColors]);

  // Handle color area click
  const handleColorAreaClick = useCallback((e) => {
    if (!colorAreaRef.current) return;
    
    const rect = colorAreaRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newSat = Math.round((x / rect.width) * 100);
    const newLight = Math.round(100 - (y / rect.height) * 100);
    
    setSaturation(Math.max(0, Math.min(100, newSat)));
    setLightness(Math.max(0, Math.min(100, newLight)));
    updateColorFromHSL(hue, newSat, newLight);
  }, [hue, updateColorFromHSL]);

  // Handle hue slider change
  const handleHueChange = useCallback((e) => {
    const newHue = parseInt(e.target.value);
    setHue(newHue);
    updateColorFromHSL(newHue, saturation, lightness);
  }, [saturation, lightness, updateColorFromHSL]);

  // Close picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Preset colors
  const presetColors = [
    '#000000', '#1a1a1a', '#333333', '#4a4a4a', '#666666', '#808080', '#999999', '#b3b3b3',
    '#cccccc', '#e0e0e0', '#f0f0f0', '#ffffff', '#ed232a', '#ff6b6b', '#ff9999', '#ffcccc',
    '#ff4500', '#ff8c00', '#ffa500', '#ffb347', '#ffd700', '#fff700', '#9aff9a', '#00ff00',
    '#00fa9a', '#00ffff', '#87ceeb', '#4169e1', '#0000ff', '#8a2be2', '#9932cc', '#ff1493'
  ];

  const currentHex = hslToHex(hue, saturation, lightness);

  return (
    <div className={`${styles.colorPicker} ${className}`} ref={pickerRef}>
      {label && <label className={styles.label}>{label}</label>}
      
      {/* Color Display Button */}
      <div 
        className={styles.colorButton}
        style={{ backgroundColor: value }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={styles.colorDisplay}>
          <span className={styles.colorValue}>{value}</span>
        </div>
        <div className={styles.dropdownIcon}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 10l5 5 5-5z"/>
          </svg>
        </div>
      </div>

      {/* Color Picker Panel */}
      {isOpen && (
        <div className={styles.pickerPanel}>
          {/* Color Area */}
          <div 
            className={styles.colorArea}
            ref={colorAreaRef}
            style={{ backgroundColor: `hsl(${hue}, 100%, 50%)` }}
            onClick={handleColorAreaClick}
          >
            <div className={styles.saturationOverlay}>
              <div className={styles.lightnessOverlay}>
                <div 
                  className={styles.colorThumb}
                  style={{
                    left: `${saturation}%`,
                    top: `${100 - lightness}%`
                  }}
                />
              </div>
            </div>
          </div>

          {/* Hue Slider */}
          <div className={styles.hueSlider}>
            <input
              ref={hueSliderRef}
              type="range"
              min="0"
              max="360"
              value={hue}
              onChange={handleHueChange}
              className={styles.hueInput}
            />
          </div>

          {/* Color Input */}
          <div className={styles.colorInputSection}>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              className={styles.colorInput}
              placeholder="#000000"
              pattern="#[a-fA-F0-9]{6}"
              maxLength="7"
            />
            <button
              type="button"
              className={styles.addCustomButton}
              onClick={() => addToCustomColors(currentHex)}
              title="Add to custom colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
              </svg>
            </button>
          </div>

          {/* Preset Colors */}
          {showPresets && (
            <div className={styles.presetSection}>
              <label className={styles.sectionLabel}>Basic Colors</label>
              <div className={styles.presetGrid}>
                {presetColors.map((color, index) => (
                  <div
                    key={index}
                    className={`${styles.presetColor} ${value === color ? styles.selected : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      onChange?.(color);
                      setIsOpen(false);
                    }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Custom Colors */}
          {showCustomColors && customColors.length > 0 && (
            <div className={styles.customSection}>
              <label className={styles.sectionLabel}>Custom Colors</label>
              <div className={styles.customGrid}>
                {customColors.map((color, index) => (
                  <div
                    key={index}
                    className={`${styles.customColor} ${value === color ? styles.selected : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      onChange?.(color);
                      setIsOpen(false);
                    }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className={styles.actionButtons}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className={styles.okButton}
              onClick={() => {
                onChange?.(currentHex);
                setIsOpen(false);
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
