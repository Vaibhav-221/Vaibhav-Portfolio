'use client';

import React, { useEffect, useRef, useState } from 'react';
import { PageId } from '@/types';
import PageIcon from './PageIcon';

interface MobilePageNavProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  isHidden: boolean;
}

const navItems: { id: PageId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
];

export default function MobilePageNav({
  currentPage,
  onNavigate,
  isHidden,
}: MobilePageNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    document.body.classList.add('mobile-nav-open');

    const handlePointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !navRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.classList.remove('mobile-nav-open');
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleNavigate = (page: PageId) => {
    setIsOpen(false);
    onNavigate(page);
  };

  return (
    <div
      ref={navRef}
      className={`mobile-page-nav${isHidden && !isOpen ? ' mp-nav-hidden' : ''}${isOpen ? ' mp-menu-open' : ''}`}
    >
      <button
        type="button"
        className={`mp-menu-scrim${isOpen ? ' is-open' : ''}`}
        aria-label="Close page navigation"
        aria-hidden={!isOpen}
        tabIndex={isOpen ? 0 : -1}
        onClick={() => setIsOpen(false)}
      />
      <button
        ref={toggleRef}
        type="button"
        className="mp-menu-toggle"
        aria-label={isOpen ? 'Close page navigation' : 'Open page navigation'}
        aria-expanded={isOpen}
        aria-controls="mobile-page-nav-menu"
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className="mp-menu-icon" aria-hidden="true">
          <span className="mp-menu-line" />
          <span className="mp-menu-line" />
          <span className="mp-menu-line" />
        </span>
      </button>
      <nav
        id="mobile-page-nav-menu"
        className={`mp-menu-panel${isOpen ? ' is-open' : ''}`}
        aria-label="Portfolio pages"
        onClick={(event) => {
          if (!(event.target instanceof Element) || !event.target.closest('.mp-nav-btn')) {
            setIsOpen(false);
          }
        }}
      >
        <span className="mp-menu-eyebrow">PORTFOLIO / NAVIGATION</span>
        {navItems.map((item, index) => (
          <button
            key={item.id}
            type="button"
            className={`mp-nav-btn ${currentPage === item.id ? 'active' : ''}`}
            aria-current={currentPage === item.id ? 'page' : undefined}
            onClick={() => handleNavigate(item.id)}
          >
            <span className="mp-nav-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <PageIcon page={item.id} className="mp-nav-icon" />
            <span className="mp-nav-label">{item.label}</span>
            <span className="mp-nav-arrow" aria-hidden="true">↗</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

