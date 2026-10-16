'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PageId } from '@/types';
import { personalInfo } from '@/data/portfolioData';

interface ProfileWidgetProps {
  onNavigate: (page: PageId) => void;
  onOpenApp: (name: string, url: string, isApp?: 'apple-music' | 'iframe') => void;
  onToggleAppleMusic: () => void;
}

export default function ProfileWidget({ onNavigate, onOpenApp, onToggleAppleMusic }: ProfileWidgetProps) {
  const [bouncingIcon, setBouncingIcon] = useState<string | null>(null);

  const triggerBounce = (name: string) => {
    setBouncingIcon(null);
    requestAnimationFrame(() => setBouncingIcon(name));
    window.setTimeout(() => setBouncingIcon((current) => current === name ? null : current), 260);
  };

  return (
    <>
      <div className="profile-widget group relative overflow-hidden">
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <Image
            src="/assets/images/1779272491822.png"
            alt={`${personalInfo.name} Profile`}
            fill
            priority
            sizes="(max-width: 768px) 50vw, 280px"
            style={{ objectFit: 'cover' }}
          />
        </div>

        {/* Dynamic status pill overlay inspired by creative developer references */}
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            left: '12px',
            right: '12px',
            padding: '6px 10px',
            background: 'rgba(21, 19, 18, 0.85)',
            backdropFilter: 'blur(12px)',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
          }}
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'var(--portfolio-accent)',
              boxShadow: '0 0 8px var(--portfolio-accent)',
              display: 'inline-block',
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontSize: '11px',
              fontWeight: 600,
              color: '#ffffff',
              letterSpacing: '0.4px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            Open for SDE Roles • CSE &apos;29
          </span>
        </div>
      </div>

      {/* Mobile App Grid (Only visible on mobile) */}
      <div className="mobile-apps-grid hide-on-desktop">
        {/* Mail */}
        <button
          type="button"
          className={`mobile-app-icon ${bouncingIcon === 'Mail' ? 'bouncing' : ''}`}
          aria-label="Open Mail"
          onClick={() => {
            triggerBounce('Mail');
            window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${personalInfo.email}`, '_blank');
          }}
        >
          <div className="mobile-app-squircle">
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <Image
                src="/assets/icons/gmail.png"
                alt="Mail"
                fill
                sizes="52px"
                style={{ objectFit: 'contain', transform: 'scale(1.5)' }}
              />
            </div>
          </div>
          <span>Mail</span>
        </button>

        {/* Projects */}
        <button
          type="button"
          className={`mobile-app-icon ${bouncingIcon === 'Projects' ? 'bouncing' : ''}`}
          aria-label="Open Projects section"
          onClick={() => {
            triggerBounce('Projects');
            onNavigate('projects');
          }}
        >
          <div className="mobile-app-squircle mobile-app-squircle--glass">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
            </svg>
          </div>
          <span>Projects</span>
        </button>

        {/* Apple Music */}
        <button
          type="button"
          className={`mobile-app-icon ${bouncingIcon === 'Apple Music' ? 'bouncing' : ''}`}
          aria-label="Toggle Apple Music"
          onClick={() => {
            triggerBounce('Apple Music');
            onToggleAppleMusic();
          }}
        >
          <div className="mobile-app-squircle">
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <Image
                src="/assets/icons/vecteezy_apple-music-logo-square-rounded-apple-music-logo-apple_55138482.png"
                alt=""
                fill
                sizes="52px"
                style={{ objectFit: 'contain', transform: 'scale(1.08)' }}
              />
            </div>
          </div>
          <span>Apple Music</span>
        </button>

        {/* Resume */}
        <button
          type="button"
          className={`mobile-app-icon ${bouncingIcon === 'Resume' ? 'bouncing' : ''}`}
          aria-label="Open Resume section"
          onClick={() => {
            triggerBounce('Resume');
            onNavigate('resume');
          }}
        >
          <div className="mobile-app-squircle mobile-app-squircle--glass">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
          </div>
          <span>Resume</span>
        </button>
      </div>
    </>
  );
}
