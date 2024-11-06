import React, { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import ToolLayout from '../../../components/layout/ToolLayout/ToolLayout';
import './ColorConverter.css';

type ColorFormat = 'hex' | 'rgb' | 'hsl' | 'hsv' | 'cmyk';

interface ColorValues {
    hex: string;
    rgb: { r: number; g: number; b: number };
    hsl: { h: number; s: number; l: number };
    hsv: { h: number; s: number; v: number };
    cmyk: { c: number; m: number; y: number; k: number };
}

const ColorConverter: React.FC = () => {
    const [format, setFormat] = useState<ColorFormat>('hex');
    const [color, setColor] = useState<ColorValues>({
        hex: '#000000',
        rgb: { r: 0, g: 0, b: 0 },
        hsl: { h: 0, s: 0, l: 0 },
        hsv: { h: 0, s: 0, v: 0 },
        cmyk: { c: 0, m: 0, y: 0, k: 100 }
    });

    const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : { r: 0, g: 0, b: 0 };
    };

    const rgbToHex = (r: number, g: number, b: number): string => {
        return '#' + [r, g, b].map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }).join('');
    };

    const rgbToHsl = (r: number, g: number, b: number): { h: number; s: number; l: number } => {
        r /= 255;
        g /= 255;
        b /= 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h = 0, s = 0, l = (max + min) / 2;

        if (max !== min) {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return {
            h: Math.round(h * 360),
            s: Math.round(s * 100),
            l: Math.round(l * 100)
        };
    };

    const rgbToHsv = (r: number, g: number, b: number): { h: number; s: number; v: number } => {
        r /= 255;
        g /= 255;
        b /= 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h = 0, s = 0, v = max;

        const d = max - min;
        s = max === 0 ? 0 : d / max;

        if (max !== min) {
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return {
            h: Math.round(h * 360),
            s: Math.round(s * 100),
            v: Math.round(v * 100)
        };
    };

    const rgbToCmyk = (r: number, g: number, b: number): { c: number; m: number; y: number; k: number } => {
        if (r === 0 && g === 0 && b === 0) {
            return { c: 0, m: 0, y: 0, k: 100 };
        }

        r /= 255;
        g /= 255;
        b /= 255;

        const k = 1 - Math.max(r, g, b);
        const c = (1 - r - k) / (1 - k);
        const m = (1 - g - k) / (1 - k);
        const y = (1 - b - k) / (1 - k);

        return {
            c: Math.round(c * 100),
            m: Math.round(m * 100),
            y: Math.round(y * 100),
            k: Math.round(k * 100)
        };
    };

    const updateAllFormats = useCallback((newColor: ColorValues) => {
        setColor(newColor);
    }, []);

    const handleHexInput = (value: string) => {
        if (!/^#[0-9A-F]{6}$/i.test(value)) {
            return;
        }

        const rgb = hexToRgb(value);
        const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
        const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
        const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);

        updateAllFormats({
            hex: value,
            rgb,
            hsl,
            hsv,
            cmyk
        });
    };

    const handleRgbInput = (r: number, g: number, b: number) => {
        if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
            return;
        }

        const hex = rgbToHex(r, g, b);
        const hsl = rgbToHsl(r, g, b);
        const hsv = rgbToHsv(r, g, b);
        const cmyk = rgbToCmyk(r, g, b);

        updateAllFormats({
            hex,
            rgb: { r, g, b },
            hsl,
            hsv,
            cmyk
        });
    };

    const handleCopy = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            toast.success('Copied to clipboard!');
        } catch (err) {
            toast.error('Failed to copy text. Please try again.');
            console.error('Copy error:', err);
        }
    };

    const renderColorInput = () => {
        switch (format) {
            case 'hex':
                return (
                    <div className="color-input">
                        <input
                            type="text"
                            value={color.hex}
                            onChange={(e) => handleHexInput(e.target.value)}
                            placeholder="#000000"
                        />
                        <button onClick={() => handleCopy(color.hex)}>Copy</button>
                    </div>
                );
            case 'rgb':
                return (
                    <div className="color-input rgb-input">
                        <div className="rgb-sliders">
                            <label>R:</label>
                            <input
                                type="range"
                                min="0"
                                max="255"
                                value={color.rgb.r}
                                onChange={(e) => handleRgbInput(parseInt(e.target.value), color.rgb.g, color.rgb.b)}
                            />
                            <input
                                type="number"
                                min="0"
                                max="255"
                                value={color.rgb.r}
                                onChange={(e) => handleRgbInput(parseInt(e.target.value), color.rgb.g, color.rgb.b)}
                            />
                        </div>
                        <div className="rgb-sliders">
                            <label>G:</label>
                            <input
                                type="range"
                                min="0"
                                max="255"
                                value={color.rgb.g}
                                onChange={(e) => handleRgbInput(color.rgb.r, parseInt(e.target.value), color.rgb.b)}
                            />
                            <input
                                type="number"
                                min="0"
                                max="255"
                                value={color.rgb.g}
                                onChange={(e) => handleRgbInput(color.rgb.r, parseInt(e.target.value), color.rgb.b)}
                            />
                        </div>
                        <div className="rgb-sliders">
                            <label>B:</label>
                            <input
                                type="range"
                                min="0"
                                max="255"
                                value={color.rgb.b}
                                onChange={(e) => handleRgbInput(color.rgb.r, color.rgb.g, parseInt(e.target.value))}
                            />
                            <input
                                type="number"
                                min="0"
                                max="255"
                                value={color.rgb.b}
                                onChange={(e) => handleRgbInput(color.rgb.r, color.rgb.g, parseInt(e.target.value))}
                            />
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <ToolLayout
            title="Color Converter"
            description="Convert between different color formats (HEX, RGB, HSL, HSV, CMYK)."
        >
            <div className="color-converter">
                <div className="format-selector">
                    <button
                        className={format === 'hex' ? 'active' : ''}
                        onClick={() => setFormat('hex')}
                    >
                        HEX
                    </button>
                    <button
                        className={format === 'rgb' ? 'active' : ''}
                        onClick={() => setFormat('rgb')}
                    >
                        RGB
                    </button>
                    <button
                        className={format === 'hsl' ? 'active' : ''}
                        onClick={() => setFormat('hsl')}
                    >
                        HSL
                    </button>
                    <button
                        className={format === 'hsv' ? 'active' : ''}
                        onClick={() => setFormat('hsv')}
                    >
                        HSV
                    </button>
                    <button
                        className={format === 'cmyk' ? 'active' : ''}
                        onClick={() => setFormat('cmyk')}
                    >
                        CMYK
                    </button>
                </div>

                <div className="color-preview" style={{ backgroundColor: color.hex }} />

                <div className="converter-section">
                    {renderColorInput()}
                </div>

                <div className="color-values">
                    <div className="value-group">
                        <label>HEX:</label>
                        <div className="value-display">
                            <span>{color.hex}</span>
                            <button onClick={() => handleCopy(color.hex)}>Copy</button>
                        </div>
                    </div>
                    <div className="value-group">
                        <label>RGB:</label>
                        <div className="value-display">
                            <span>{`rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`}</span>
                            <button onClick={() => handleCopy(`rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`)}>Copy</button>
                        </div>
                    </div>
                    <div className="value-group">
                        <label>HSL:</label>
                        <div className="value-display">
                            <span>{`hsl(${color.hsl.h}°, ${color.hsl.s}%, ${color.hsl.l}%)`}</span>
                            <button onClick={() => handleCopy(`hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`)}>Copy</button>
                        </div>
                    </div>
                    <div className="value-group">
                        <label>HSV:</label>
                        <div className="value-display">
                            <span>{`hsv(${color.hsv.h}°, ${color.hsv.s}%, ${color.hsv.v}%)`}</span>
                            <button onClick={() => handleCopy(`hsv(${color.hsv.h}, ${color.hsv.s}%, ${color.hsv.v}%)`)}>Copy</button>
                        </div>
                    </div>
                    <div className="value-group">
                        <label>CMYK:</label>
                        <div className="value-display">
                            <span>{`cmyk(${color.cmyk.c}%, ${color.cmyk.m}%, ${color.cmyk.y}%, ${color.cmyk.k}%)`}</span>
                            <button onClick={() => handleCopy(`cmyk(${color.cmyk.c}%, ${color.cmyk.m}%, ${color.cmyk.y}%, ${color.cmyk.k}%)`)}>Copy</button>
                        </div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
};

export default ColorConverter;
