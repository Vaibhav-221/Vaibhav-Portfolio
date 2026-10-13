'use client';

import React, { useState } from 'react';
import { AppWindow } from '@/types';
import AppleMusicApp from './AppleMusicApp';

interface WindowManagerProps {
  windows: AppWindow[];
  onCloseWindow: (id: string) => void;
  onMinimizeWindow: (id: string) => void;
  onMaximizeWindow: (id: string) => void;
  onBringToFront: (id: string) => void;
}

export default function WindowManager({
  windows,
  onCloseWindow,
  onMinimizeWindow,
  onMaximizeWindow,
  onBringToFront,
}: WindowManagerProps) {
  const [dragState, setDragState] = useState<{
    id: string;
    startX: number;
    startY: number;
    initialX: number;
    initialY: number;
  } | null>(null);

  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>({});

  const handleMouseDown = (e: React.MouseEvent, id: string) => {
    onBringToFront(id);
    const target = e.target as HTMLElement;
    if (target.classList.contains('win-btn') || target.closest('.win-btn')) return;

    const currentPos = positions[id] || {
      x: window.innerWidth / 2 - 410,
      y: window.innerHeight / 2 - 270,
    };

    setDragState({
      id,
      startX: e.clientX,
      startY: e.clientY,
      initialX: currentPos.x,
      initialY: currentPos.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragState) return;
    const deltaX = e.clientX - dragState.startX;
    const deltaY = e.clientY - dragState.startY;

    setPositions((prev) => ({
      ...prev,
      [dragState.id]: {
        x: Math.max(0, Math.min(window.innerWidth - 300, dragState.initialX + deltaX)),
        y: Math.max(28, Math.min(window.innerHeight - 100, dragState.initialY + deltaY)),
      },
    }));
  };

  const handleMouseUp = () => {
    setDragState(null);
  };

  return (
    <div
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 300 }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {windows.map((win) => {
        if (win.minimized) return null;

        const pos = positions[win.id] || {
          x: typeof window !== 'undefined' ? Math.max(20, (window.innerWidth - 820) / 2) : 50,
          y: typeof window !== 'undefined' ? Math.max(50, (window.innerHeight - 540) / 2) : 50,
        };

        const isSolid = win.url?.includes('freeriderhd') || win.url?.includes('gettingoverit') || win.url?.includes('retrogames');

        return (
          <div
            key={win.id}
            className={`mac-window ${isSolid ? 'solid-mode' : ''} ${win.maximized ? 'maximized' : ''}`}
            style={{
              pointerEvents: 'auto',
              zIndex: win.zIndex,
              left: win.maximized ? 0 : `${pos.x}px`,
              top: win.maximized ? 'var(--menubar-h)' : `${pos.y}px`,
              transform: 'none',
            }}
            onClick={() => onBringToFront(win.id)}
          >
            {/* Window Titlebar */}
            <div
              className="window-titlebar"
              onMouseDown={(e) => !win.maximized && handleMouseDown(e, win.id)}
            >
              <div className="window-controls">
                <button
                  type="button"
                  className="win-btn close"
                  aria-label={`Close ${win.title}`}
                  title={`Close ${win.title}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onCloseWindow(win.id);
                  }}
                />
                <button
                  type="button"
                  className="win-btn minimize"
                  aria-label={`Minimize ${win.title}`}
                  title={`Minimize ${win.title}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onMinimizeWindow(win.id);
                  }}
                />
                <button
                  type="button"
                  className="win-btn maximize"
                  aria-label={`${win.maximized ? 'Restore' : 'Maximize'} ${win.title}`}
                  title={`${win.maximized ? 'Restore' : 'Maximize'} ${win.title}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onMaximizeWindow(win.id);
                  }}
                />
              </div>

              <div className="window-title">{win.title}</div>
            </div>

            {/* Window Content */}
            <div className="window-content">
              {win.isApp === 'apple-music' ? (
                <AppleMusicApp />
              ) : win.url ? (
                <iframe
                  src={win.url}
                  title={win.title}
                  allowFullScreen
                  scrolling="no"
                  allow="cross-origin-isolated"
                />
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}

