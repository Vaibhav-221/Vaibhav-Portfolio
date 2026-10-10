'use client';

import React, { useState, useEffect, useRef } from 'react';
import { PageId } from '@/types';
import { personalInfo } from '@/data/portfolioData';

interface SpotlightProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: PageId) => void;
  onOpenApp: (name: string, url: string, isApp?: 'apple-music' | 'iframe') => void;
}

interface SearchItem {
  id: string;
  title: string;
  category: string;
  action: () => void;
}

export default function Spotlight({
  isOpen,
  onClose,
  onNavigate,
  onOpenApp,
}: SpotlightProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const searchItems: SearchItem[] = [
    {
      id: 'about',
      title: `About Me — ${personalInfo.name} Bio & Overview`,
      category: 'Portfolio Section',
      action: () => onNavigate('about'),
    },
    {
      id: 'projects',
      title: 'Projects — StatKarmyog, VBSPU PYQ Hub, Get-Me-A-Chai & more',
      category: 'Portfolio Section',
      action: () => onNavigate('projects'),
    },
    {
      id: 'experience',
      title: 'Experience — GSSoC \'26 (Top 1%), GAOTek Inc. (3 Promotions)',
      category: 'Portfolio Section',
      action: () => onNavigate('experience'),
    },
    {
      id: 'skills',
      title: 'Skills — Full Stack, Next.js, FastAPI, Python, React, Firebase',
      category: 'Portfolio Section',
      action: () => onNavigate('skills'),
    },
    {
      id: 'resume',
      title: 'Resume — B.Tech CSE \'29 & Verified Experience PDF',
      category: 'Portfolio Section',
      action: () => onNavigate('resume'),
    },
    {
      id: 'contact',
      title: 'Contact Me — Get In Touch & Send Message',
      category: 'Portfolio Section',
      action: () => onNavigate('contact'),
    },
    {
      id: 'apple-music',
      title: 'Apple Music Player — Focus Playlist',
      category: 'macOS Application',
      action: () => onOpenApp('Apple Music', '', 'apple-music'),
    },
    {
      id: 'free-rider',
      title: 'Free Rider HD — Classic Game',
      category: 'macOS Application',
      action: () => onOpenApp('Free Rider HD', 'https://www.freeriderhd.com/', 'iframe'),
    },
    {
      id: 'github',
      title: `GitHub — @${personalInfo.githubUsername}`,
      category: 'External Link',
      action: () => window.open(personalInfo.github, '_blank'),
    },
    {
      id: 'linkedin',
      title: `LinkedIn — ${personalInfo.name}`,
      category: 'External Link',
      action: () => window.open(personalInfo.linkedin, '_blank'),
    },
    {
      id: 'mail',
      title: `Email — ${personalInfo.email}`,
      category: 'Contact',
      action: () => window.open(`mailto:${personalInfo.email}`, '_blank'),
    },
  ];

  const filteredItems = searchItems.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else inputRef.current?.focus();
      }
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].action();
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredItems, onClose]);

  const handleClose = () => {
    setQuery('');
    setSelectedIndex(0);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={`overlay ${isOpen ? 'show' : ''}`}>
      <div className="overlay-dim" onClick={handleClose} />
      <div className="spotlight-bar" style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
          <svg viewBox="0 0 16 16" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6">
            <circle cx="7" cy="7" r="5.4" />
            <line x1="11" y1="11" x2="15" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="Spotlight Search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            autoComplete="off"
          />
        </div>

        {filteredItems.length > 0 && (
          <div className="spotlight-results">
            {filteredItems.map((item, idx) => (
              <div
                key={item.id}
                className={`spotlight-item ${selectedIndex === idx ? 'selected' : ''}`}
                onClick={() => {
                  item.action();
                  handleClose();
                }}
                onMouseEnter={() => setSelectedIndex(idx)}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: 500 }}>{item.title}</div>
                  <div style={{ fontSize: '11px', opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '2px' }}>
                    {item.category}
                  </div>
                </div>
                <span style={{ fontSize: '12px', opacity: 0.6 }}>↵ Select</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

