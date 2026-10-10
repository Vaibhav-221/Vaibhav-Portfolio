'use client';

import React from 'react';
import { PageId } from '@/types';

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
  return (
    <div className={`mobile-page-nav ${isHidden ? 'mp-nav-hidden' : ''}`}>
      {navItems.map((item) => (
        <button
          key={item.id}
          className={`mp-nav-btn ${currentPage === item.id ? 'active' : ''}`}
          onClick={() => onNavigate(item.id)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

