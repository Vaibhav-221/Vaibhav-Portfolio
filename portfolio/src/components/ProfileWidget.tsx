'use client';

import React from 'react';
import Image from 'next/image';
import { PageId } from '@/types';

interface ProfileWidgetProps {
  onNavigate: (page: PageId) => void;
  onOpenApp: (name: string, url: string, isApp?: 'apple-music' | 'iframe') => void;
}

export default function ProfileWidget({ onNavigate, onOpenApp }: ProfileWidgetProps) {
  return (
    <>
      <div className="profile-widget">
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <Image
            src="/assets/images/1779272491822.png"
            alt="Aditya Chauhan Profile"
            fill
            priority
            sizes="(max-width: 768px) 50vw, 280px"
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>

      {/* Mobile App Grid (Only visible on mobile) */}
      <div className="mobile-apps-grid hide-on-desktop">
        {/* Mail */}
        <div
          className="mobile-app-icon"
          onClick={() => window.open('https://mail.google.com/mail/?view=cm&fs=1&to=adityachauhan8079@gmail.com', '_blank')}
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
        </div>

        {/* Game */}
        <div
          className="mobile-app-icon"
          onClick={() => onOpenApp('Free Rider HD', 'https://www.freeriderhd.com/', 'iframe')}
        >
          <div className="mobile-app-squircle">
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <Image
                src="/assets/images/freerider.jfif"
                alt="Game"
                fill
                sizes="52px"
                style={{ objectFit: 'cover', borderRadius: '22.5%' }}
              />
            </div>
          </div>
          <span>Game</span>
        </div>

        {/* Projects */}
        <div
          className="mobile-app-icon"
          onClick={() => onNavigate('projects')}
        >
          <div className="mobile-app-squircle mobile-app-squircle--glass">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
            </svg>
          </div>
          <span>Projects</span>
        </div>

        {/* Resume */}
        <div
          className="mobile-app-icon"
          onClick={() => onNavigate('resume')}
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
        </div>
      </div>
    </>
  );
}
