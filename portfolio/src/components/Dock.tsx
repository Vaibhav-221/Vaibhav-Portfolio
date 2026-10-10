'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { PageId } from '@/types';
import { personalInfo } from '@/data/portfolioData';

interface DockProps {
  onNavigate: (page: PageId) => void;
  onOpenApp: (name: string, url: string, isApp?: 'apple-music' | 'iframe') => void;
  onToggleWallpaperPicker: () => void;
}

export default function Dock({
  onNavigate,
  onOpenApp,
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dockRef.current) return;
    const icons = dockRef.current.querySelectorAll<HTMLDivElement>('.dock-icon');
    const mouseX = e.clientX;
    const MAX_SCALE = 1.5;
    const RANGE = 120;

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

  const handleMouseLeave = () => {
    if (!dockRef.current) return;
    const icons = dockRef.current.querySelectorAll<HTMLDivElement>('.dock-icon');
    icons.forEach((icon) => {
      icon.style.transform = 'scale(1)';
      icon.style.zIndex = '1';
    });
  };

  return (
    <div className="desktop-bottom-bar">
      {/* Links (Left of Dock) */}
      <div className="links-left">
        <a
          href="#about"
          className="link-box"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('about');
          }}
        >
          <svg viewBox="0 0 24 24">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span className="link-text">About</span>
        </a>

        <a
          href="#projects"
          className="link-box"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('projects');
          }}
        >
          <svg viewBox="0 0 24 24">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
          </svg>
          <span className="link-text">Projects</span>
        </a>

        <a
          href="#resume"
          className="link-box"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('resume');
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
          <span className="link-text">Resume</span>
        </a>
      </div>

      {/* Center Dock */}
      <div className="dock-wrap">
        <div
          className="dock"
          ref={dockRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
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

          {/* Contact / Resume */}
          <div
            className={`dock-icon ${bouncingIcon === 'Contact' ? 'bouncing' : ''}`}
            data-name="Contact"
            onClick={() => {
              triggerBounce('Contact');
              onNavigate('contact');
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
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <span className="dock-tooltip">Contact Me</span>
          </div>

          {/* Free Rider HD */}
          <div
            className={`dock-icon hide-on-mobile ${bouncingIcon === 'Free Rider HD' ? 'bouncing' : ''}`}
            data-name="Free Rider HD"
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
                sizes="56px"
                style={{ objectFit: 'cover', borderRadius: '14px', transform: 'scale(0.95)', filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.4))' }}
              />
            </div>
            <span className="dock-tooltip">Free Rider HD</span>
          </div>

          {/* Apple Music */}
          <div
            className={`dock-icon ${bouncingIcon === 'Apple Music' ? 'bouncing' : ''}`}
            data-name="Apple Music"
            onClick={() => {
              triggerBounce('Apple Music');
              onOpenApp('Apple Music', '', 'apple-music');
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
          </div>

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
        <a
          href="#experience"
          className="link-box"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('experience');
          }}
        >
          <svg viewBox="0 0 24 24">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          </svg>
          <span className="link-text">Experience</span>
        </a>

        <a
          href="#skills"
          className="link-box"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('skills');
          }}
        >
          <svg viewBox="0 0 24 24">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
          <span className="link-text">Skills</span>
        </a>

        <a
          href="#contact"
          className="link-box"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('contact');
          }}
        >
          <svg viewBox="0 0 24 24">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          <span className="link-text">Contact</span>
        </a>
      </div>
    </div>
  );
}

