import React, { useState } from 'react';
import './ColorPaletteGenerator.scss';

function ColorPaletteGenerator() {
  const [baseColor, setBaseColor] = useState('#3498db');
  const [theme, setTheme] = useState('light');
  const [palette, setPalette] = useState([]);

  const colors = [
    '#c0392b', '#e74c3c', '#e67e22', '#f1c40f', '#2ecc71',
    '#1abc9c', '#3498db', '#6b29d6', '#8e44ad', '#34495e', '#7f8c8d'
  ];

  const lightThemeColors = {
    background: '#f3f3f3',
    foreground: '#ffffff',
    shadow: '#d3d3d3',
    text: '#000000'
  };
  const darkThemeColors = {
    background: '#12161c',
    foreground: '#1f232d',
    shadow: '#34495e',
    text: '#ecf0f1'
  };

  const generatePalette = (baseColor, theme) => {
    const shades = [];
    const factor = theme === 'light' ? -0.2 : 0.2;
    for (let i = 1; i <= 4; i++) {
      const shade = adjustBrightness(baseColor, i * factor);
      shades.push({ label: `Shade ${i}`, color: shade });
    }

    const accent1 = adjustHue(baseColor, 30);
    const accent2 = adjustHue(baseColor, -30);

    const themeColors = theme === 'light' ? lightThemeColors : darkThemeColors;
    setPalette([
      { label: 'Background', color: themeColors.background },
      { label: 'Foreground', color: themeColors.foreground },
      { label: 'Shadow', color: themeColors.shadow },
      { label: 'Text', color: themeColors.text },
      ...shades,
      { label: 'Accent 1', color: accent1 },
      { label: 'Accent 2', color: accent2 },
    ]);
  };

  const adjustBrightness = (color, factor) => {
    const f = parseInt(color.slice(1), 16),
      t = factor < 0 ? 0 : 255,
      p = factor < 0 ? factor * -1 : factor,
      R = f >> 16,
      G = (f >> 8) & 0x00ff,
      B = f & 0x0000ff;
    return (
      '#' +
      (
        0x1000000 +
        (Math.round((t - R) * p) + R) * 0x10000 +
        (Math.round((t - G) * p) + G) * 0x100 +
        (Math.round((t - B) * p) + B)
      )
        .toString(16)
        .slice(1)
    );
  };
  
  const adjustHue = (color, angle) => {
    const rgb = hexToRgb(color);
    const hsl = rgbToHsl(rgb);
    hsl.h = (hsl.h + angle) % 360;
    if (hsl.h < 0) hsl.h += 360;
    const newRgb = hslToRgb(hsl);
    return rgbToHex(newRgb);
  };

  const hexToRgb = (hex) => {
    let bigint = parseInt(hex.slice(1), 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;
    return { r, g, b };
  };

  const rgbToHex = (rgb) => {
    let r = rgb.r.toString(16).padStart(2, '0');
    let g = rgb.g.toString(16).padStart(2, '0');
    let b = rgb.b.toString(16).padStart(2, '0');
    return `#${r}${g}${b}`;
  };

  const rgbToHsl = ({ r, g, b }) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
        default:
          break;
      }
      h /= 6;
    }

    return { h: h * 360, s, l };
  };

  const hslToRgb = ({ h, s, l }) => {
    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      h /= 360;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
    };
  };

  const handleGenerate = () => {
    generatePalette(baseColor, theme);
  };

  return (
    <div className="color-palette-generator">
      <h2>Color Palette Generator</h2>
      <div className="input-group">
        <div className="color-options">
          {colors.map((color, index) => (
            <label key={index} style={{ backgroundColor: color }}>
              <input
                type="radio"
                name="baseColor"
                value={color}
                checked={baseColor === color}
                onChange={(e) => setBaseColor(e.target.value)}
              />
              <span className="color-preview"></span>
            </label>
          ))}
        </div>
        <div className="theme-options">
          <label>
            <input
              type="radio"
              name="theme"
              value="light"
              checked={theme === 'light'}
              onChange={() => setTheme('light')}
            />
            Light
          </label>
          <label>
            <input
              type="radio"
              name="theme"
              value="dark"
              checked={theme === 'dark'}
              onChange={() => setTheme('dark')}
            />
            Dark
          </label>
        </div>
        <button type="button" onClick={handleGenerate}>
          Generate Palette
        </button>
      </div>
      <div className="palette">
        {palette.map((item, index) => (
          <div
            key={index}
            className="color-box"
            style={{ backgroundColor: item.color }}
          >
            <p>{item.label}</p>
            <p>{item.color}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ColorPaletteGenerator;
