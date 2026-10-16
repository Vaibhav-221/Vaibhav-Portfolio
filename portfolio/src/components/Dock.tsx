'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { PageId } from '@/types';
import { personalInfo } from '@/data/portfolioData';
import PageIcon from './PageIcon';

interface DockProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenApp: (name: string, url: string, isApp?: 'apple-music' | 'iframe') => void;
  onToggleAppleMusic: () => void;
  onToggleWallpaperPicker: () => void;
}

export default function Dock({
  currentPage,
  onNavigate,
  onOpenApp,
  onToggleAppleMusic,
  onToggleWallpaperPicker,
}: DockProps) {
  const dockRef = useRef<HTMLDivElement>(null);
  const [bouncingIcon, setBouncingIcon] = useState<string | null>(null);

  const triggerBounce = (name: string) => {
    setBouncingIcon(name);
    setTimeout(() => {
      setBouncingIcon(null);
    }, 550);
  };

  const resetDockIcons = () => {
    if (!dockRef.current) return;
    const icons = dockRef.current.querySelectorAll<HTMLElement>('.dock-icon');
    icons.forEach((icon) => {
      icon.style.removeProperty('transform');
      icon.style.removeProperty('z-index');
    });
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') {
      resetDockIcons();
      return;
    }
    if (!dockRef.current) return;
    const icons = dockRef.current.querySelectorAll<HTMLElement>('.dock-icon');
    const mouseX = e.clientX;
    const MAX_SCALE = 1.14;
    const RANGE = 88;

    icons.forEach((icon) => {
      const rect = icon.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const dist = Math.abs(mouseX - centerX);
      let scale = 1;
      if (dist < RANGE) {
        scale = 1 + (MAX_SCALE - 1) * (1 - dist / RANGE);
      }
      icon.style.transform = `scale(${scale})`;
      icon.style.zIndex = scale > 1.02 ? '5' : '1';
    });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') resetDockIcons();
  };

  const renderPageLink = (page: Exclude<PageId, 'home'>, label: string) => (
    <button
      key={page}
      type="button"
      className={`link-box${currentPage === page ? ' is-active' : ''}`}
      aria-label={`Open ${label} section`}
      aria-current={currentPage === page ? 'page' : undefined}
      title={label}
      onClick={() => onNavigate(page)}
    >
      <PageIcon page={page} />
      <span className="link-text">{label}</span>
    </button>
  );

  return (
    <div className="desktop-bottom-bar">
      {/* Links (Left of Dock) */}
      <div className="links-left">
        {renderPageLink('about', 'About')}
        {renderPageLink('projects', 'Projects')}
        {renderPageLink('skills', 'Skills')}
      </div>

      {/* Center Dock */}
      <div className="dock-wrap">
        <div
          className="dock"
          ref={dockRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={resetDockIcons}
          onPointerUp={handlePointerUp}
          onPointerCancel={resetDockIcons}
        >
          {/* GitHub */}
          <div
            className={`dock-icon ${bouncingIcon === 'GitHub' ? 'bouncing' : ''}`}
            data-name="GitHub"
            onClick={() => {
              triggerBounce('GitHub');
              window.open(personalInfo.github, '_blank');
            }}
          >
            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
              <Image
                src="/assets/icons/github.png"
                alt="GitHub"
                fill
                sizes="56px"
                style={{ objectFit: 'contain', transform: 'scale(1.15)', filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.4))' }}
              />
            </div>
            <span className="dock-tooltip">GitHub</span>
          </div>

          {/* Gmail */}
          <div
            className={`dock-icon hide-on-mobile ${bouncingIcon === 'Gmail' ? 'bouncing' : ''}`}
            data-name="Gmail"
            onClick={() => {
              triggerBounce('Gmail');
              window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${personalInfo.email}`, '_blank');
            }}
          >
            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
              <Image
                src="/assets/icons/gmail.png"
                alt="Gmail"
                fill
                sizes="56px"
                style={{ objectFit: 'contain', transform: 'scale(1.15)', filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.4))' }}
              />
            </div>
            <span className="dock-tooltip">Gmail</span>
          </div>

          {/* LinkedIn */}
          <div
            className={`dock-icon ${bouncingIcon === 'LinkedIn' ? 'bouncing' : ''}`}
            data-name="LinkedIn"
            onClick={() => {
              triggerBounce('LinkedIn');
              window.open(personalInfo.linkedin, '_blank');
            }}
          >
            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
              <Image
                src="/assets/icons/linkedin.png"
                alt="LinkedIn"
                fill
                sizes="56px"
                style={{ objectFit: 'contain', transform: 'scale(1.15)', filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.4))' }}
              />
            </div>
            <span className="dock-tooltip">LinkedIn</span>
          </div>

          {/* Home */}
          <button
            type="button"
            className={`dock-icon ${bouncingIcon === 'Home' ? 'bouncing' : ''}`}
            data-name="Home"
            aria-label="Go to home"
            onClick={() => {
              triggerBounce('Home');
              onNavigate('home');
            }}
          >
            <div
              className="icon-tile"
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #0a84ff 0%, #30d158 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m3 10 9-7 9 7" />
                <path d="M5 9v12h14V9" />
                <path d="M9 21v-7h6v7" />
              </svg>
            </div>
            <span className="dock-tooltip">Home</span>
          </button>

          {/* Free Rider HD */}
          <button
            type="button"
            className={`dock-icon ${bouncingIcon === 'Free Rider HD' ? 'bouncing' : ''}`}
            data-name="Free Rider HD"
            aria-label="Open Free Rider HD game"
            onClick={() => {
              triggerBounce('Free Rider HD');
              onOpenApp('Free Rider HD', 'https://www.freeriderhd.com/', 'iframe');
            }}
          >
            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
              <Image
                src="/assets/images/freerider.jfif"
                alt="Free Rider HD"
                fill
                unoptimized
                sizes="56px"
                style={{ objectFit: 'cover', borderRadius: '14px', transform: 'scale(0.95)', filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.4))' }}
              />
            </div>
            <span className="dock-tooltip">Free Rider HD</span>
          </button>

          {/* Apple Music */}
          <button
            type="button"
            className={`dock-icon hide-on-mobile ${bouncingIcon === 'Apple Music' ? 'bouncing' : ''}`}
            data-name="Apple Music"
            aria-label="Toggle Apple Music"
            onClick={() => {
              triggerBounce('Apple Music');
              onToggleAppleMusic();
            }}
          >
            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
              <Image
                src="/assets/icons/vecteezy_apple-music-logo-square-rounded-apple-music-logo-apple_55138482.png"
                alt="Apple Music"
                fill
                sizes="56px"
                style={{ objectFit: 'contain', transform: 'scale(1.15)', filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.4))' }}
              />
            </div>
            <span className="dock-tooltip">Apple Music</span>
          </button>

          {/* Wallpaper Picker */}
          <div
            className={`dock-icon ${bouncingIcon === 'Wallpaper' ? 'bouncing' : ''}`}
            data-name="Wallpaper"
            onClick={(e) => {
              e.stopPropagation();
              triggerBounce('Wallpaper');
              onToggleWallpaperPicker();
            }}
          >
            <div
              className="icon-tile"
              style={{ background: 'linear-gradient(160deg, #1a1a2e 0%, #16213e 40%, #0f3460 70%, #533483 100%)' }}
            >
              <svg viewBox="0 0 100 100" fill="none">
                <rect x="18" y="24" width="64" height="46" rx="5" fill="var(--text-muted)" stroke="var(--text-muted)" strokeWidth="3" />
                <circle cx="34" cy="40" r="6" fill="#febc2e" />
                <path d="M18 56 L36 42 L52 54 L66 44 L82 56 L82 70 L18 70Z" fill="var(--text-muted)" />
                <path d="M52 54 L66 44 L82 56" stroke="var(--text-muted)" strokeWidth="2" fill="none" />
              </svg>
            </div>
            <span className="dock-tooltip">Wallpaper</span>
          </div>
        </div>
      </div>

      {/* Links (Right of Dock) */}
      <div className="links-right">
        {renderPageLink('experience', 'Experience')}
        {renderPageLink('resume', 'Resume')}
        {renderPageLink('contact', 'Contact')}
      </div>
    </div>
  );
}

