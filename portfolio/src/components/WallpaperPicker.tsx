'use client';

import React, { useRef } from 'react';
import { Wallpaper } from '@/types';

interface WallpaperPickerProps {
  isOpen: boolean;
  isLightTheme: boolean;
  onClose: () => void;
  wallpapers: Wallpaper[];
  activeWpIndex: number;
  onSelectWallpaper: (index: number) => void;
  onUploadWallpaper: (file: File) => void;
  onToggleTheme: () => void;
}

export default function WallpaperPicker({
  isOpen,
  isLightTheme,
  onClose,
  wallpapers,
  activeWpIndex,
  onSelectWallpaper,
  onUploadWallpaper,
  onToggleTheme,
}: WallpaperPickerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUploadWallpaper(file);
      e.target.value = '';
    }
  };

  return (
    <div
      ref={pickerRef}
      className={`wp-picker ${isOpen ? 'show' : ''}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="wp-picker-heading">
        <div>
          <span className="wp-picker-eyebrow">DESKTOP / APPEARANCE</span>
          <div className="wp-picker-title">Choose Wallpaper</div>
        </div>
        <span className="wp-theme-indicator" aria-live="polite">
          <span className="wp-theme-dot" />
          {isLightTheme ? 'Light appearance' : 'Dark appearance'}
        </span>
      </div>

      <div className="wp-grid" role="group" aria-label="Available wallpapers">
        {wallpapers.map((wp, i) => (
          <button
            key={i}
            type="button"
            className={`wp-thumb ${activeWpIndex === i ? 'active' : ''}`}
            title={wp.label}
            aria-label={`${wp.label} wallpaper`}
            aria-pressed={activeWpIndex === i}
            onClick={() => onSelectWallpaper(i)}
            style={
              wp.type === 'image'
                ? { backgroundImage: `url(${wp.thumbnail ?? wp.value})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                : wp.type === 'gradient'
                ? { background: wp.value }
                : { background: 'linear-gradient(135deg, #0a0c18, #1a0533 50%, #0a3a36)' }
            }
          >
            {wp.type === 'original' && (
              <svg viewBox="0 0 160 100" preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%', display: 'block' }}>
                <defs>
                  <linearGradient id={`tg-${i}`} x1="15%" y1="0%" x2="85%" y2="100%">
                    <stop offset="0%" stopColor="#0a0c18" />
                    <stop offset="50%" stopColor="#070811" />
                    <stop offset="100%" stopColor="#04050a" />
                  </linearGradient>
                  <radialGradient id={`pg-${i}`} cx="80%" cy="8%" r="55%">
                    <stop offset="0%" stopColor="#8855ff" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#8855ff" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id={`cg-${i}`} cx="10%" cy="100%" r="65%">
                    <stop offset="0%" stopColor="#15d6c4" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#15d6c4" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id={`ribbonGrad-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8855ff" />
                    <stop offset="50%" stopColor="#ff55aa" />
                    <stop offset="100%" stopColor="#15d6c4" />
                  </linearGradient>
                </defs>
                <rect width="160" height="100" fill={`url(#tg-${i})`} />
                <rect width="160" height="100" fill={`url(#pg-${i})`} />
                <rect width="160" height="100" fill={`url(#cg-${i})`} />
                <path
                  d="M-4,-4 C10,2 15,12 27,14 C40,17 43,10 56,15 C70,20 68,30 82,36 C96,42 104,36 118,43 C133,51 141,47 164,54 L164,73 C141,66 133,70 118,63 C104,55 96,62 82,56 C68,50 70,40 56,35 C43,30 40,37 27,34 C15,31 10,22 -4,15 Z"
                  fill={`url(#ribbonGrad-${i})`}
                  opacity="0.6"
                />
              </svg>
            )}
          </button>
        ))}
      </div>

      <div className="wp-divider" />

      <div className="wp-upload-row">
        <label className="wp-action-btn wp-upload-btn">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M8 2v9M4 6l4-4 4 4" />
            <path d="M2 13h12" strokeLinecap="round" />
          </svg>
          Upload
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>

        <button
          type="button"
          className="wp-action-btn wp-theme-btn"
          onClick={onToggleTheme}
          aria-label={`Switch to ${isLightTheme ? 'dark' : 'light'} appearance`}
          aria-pressed={isLightTheme}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
          {isLightTheme ? 'Dark theme' : 'Light theme'}
        </button>

        <button type="button" className="wp-action-btn wp-close-btn" onClick={onClose}>
          Done
        </button>
      </div>
    </div>
  );
}

