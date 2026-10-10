'use client';

import React, { useState, useEffect, useRef } from 'react';

interface ControlCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ControlCenter({ isOpen, onClose }: ControlCenterProps) {
  const [wifiOn, setWifiOn] = useState(true);
  const [btOn, setBtOn] = useState(true);
  const [airplaneOn, setAirplaneOn] = useState(false);
  const [brightness, setBrightness] = useState(85);
  const [sound, setSound] = useState(65);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={panelRef}
      className={`cc-panel ${isOpen ? 'show' : ''}`}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Wi-Fi Tile */}
      <div className="cc-tile">
        <div className="cc-row">
          <span
            className={`cc-icon ${wifiOn ? 'on' : ''}`}
            onClick={() => setWifiOn(!wifiOn)}
          >
            <svg viewBox="0 0 16 12" width="16" height="12" fill="currentColor">
              <path d="M8 10.4a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6z" />
              <path d="M8 5.4c1.65 0 3.15.62 4.3 1.64a.7.7 0 0 1 .04 1.02l-.78.8a.62.62 0 0 1-.86.02A4.9 4.9 0 0 0 8 7.5c-1.06 0-2.04.36-2.7.94a.62.62 0 0 1-.86-.02l-.78-.8a.7.7 0 0 1 .04-1.02A6.6 6.6 0 0 1 8 5.4z" />
              <path d="M8 1.9c2.55 0 4.86.95 6.6 2.53a.7.7 0 0 1 .04 1.02l-.74.76a.6.6 0 0 1-.83.03A8.1 8.1 0 0 0 8 4.3a8.1 8.1 0 0 0-5.07 1.94.6.6 0 0 1-.83-.03l-.74-.76a.7.7 0 0 1 .04-1.02A9.9 9.9 0 0 1 8 1.9z" />
            </svg>
          </span>
          <div>
            <div style={{ fontWeight: 600 }}>Wi-Fi</div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{wifiOn ? 'Home Network' : 'Off'}</div>
          </div>
        </div>
      </div>

      {/* Bluetooth Tile */}
      <div className="cc-tile">
        <div className="cc-row">
          <span
            className={`cc-icon ${btOn ? 'on' : ''}`}
            onClick={() => setBtOn(!btOn)}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 8l12 8-6 5V3l6 5-12 8" />
            </svg>
          </span>
          <div>
            <div style={{ fontWeight: 600 }}>Bluetooth</div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{btOn ? 'Connected' : 'Off'}</div>
          </div>
        </div>
      </div>

      {/* Airplane Mode */}
      <div className="cc-tile wide">
        <div className="cc-row">
          <span
            className={`cc-icon ${airplaneOn ? 'on' : ''}`}
            onClick={() => setAirplaneOn(!airplaneOn)}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M12 3 2 13h4v8h12v-8h4z" />
            </svg>
          </span>
          <span>Airplane Mode</span>
        </div>
      </div>

      {/* Display Brightness Slider */}
      <div className="cc-tile wide" style={{ gridTemplateColumns: '1fr' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span>Display</span>
          <span style={{ color: 'var(--text-muted)' }}>{brightness}%</span>
        </div>
        <div
          className="cc-slider"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const pct = Math.round(((e.clientX - rect.left) / rect.width) * 100);
            setBrightness(Math.max(10, Math.min(100, pct)));
          }}
        >
          <div
            className="cc-slider-fill"
            style={{ width: `${brightness}%` }}
          />
        </div>
      </div>

      {/* Sound Volume Slider */}
      <div className="cc-tile wide" style={{ gridTemplateColumns: '1fr' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span>Sound</span>
          <span style={{ color: 'var(--text-muted)' }}>{sound}%</span>
        </div>
        <div
          className="cc-slider"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const pct = Math.round(((e.clientX - rect.left) / rect.width) * 100);
            setSound(Math.max(0, Math.min(100, pct)));
          }}
        >
          <div
            className="cc-slider-fill"
            style={{ width: `${sound}%` }}
          />
        </div>
      </div>
    </div>
  );
}
