'use client';

import React, { useState, useEffect, useRef } from 'react';
import { PageId } from '@/types';

interface MenubarProps {
  currentPage?: PageId;
  onNavigate: (page: PageId) => void;
  onOpenSpotlight: () => void;
  onToggleControlCenter: () => void;
  onLockScreen: () => void;
}

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

function pad(n: number) {
  return n < 10 ? '0' + n : `${n}`;
}

export default function Menubar({
  onNavigate,
  onOpenSpotlight,
  onToggleControlCenter,
  onLockScreen,
}: MenubarProps) {
  const [clockText, setClockText] = useState('');
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const menubarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      let h = now.getHours();
      const ampm = h >= 12 ? 'PM' : 'AM';
      h = h % 12;
      if (h === 0) h = 12;
      setClockText(
        `${days[now.getDay()]} ${months[now.getMonth()]} ${now.getDate()}  ${h}:${pad(now.getMinutes())} ${ampm}`
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menubarRef.current && !menubarRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenMenu(null);
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleMenuClick = (menuName: string, defaultPage?: PageId) => {
    if (defaultPage) {
      onNavigate(defaultPage);
    }
    setOpenMenu(openMenu === menuName ? null : menuName);
  };

  const handleMenuHover = (menuName: string) => {
    if (openMenu !== null) {
      setOpenMenu(menuName);
    }
  };

  const handleItemClick = (action?: () => void) => {
    if (action) action();
    setOpenMenu(null);
  };

  return (
    <div className="menubar" ref={menubarRef}>
      <div className="menubar-left">
        {/* Apple Menu */}
        <div
          className="menu-root"
          onMouseEnter={() => handleMenuHover('apple')}
        >
          <span
            className={`menu-item apple-logo ${openMenu === 'apple' ? 'active' : ''}`}
            onClick={() => handleMenuClick('apple')}
          >
            <svg viewBox="0 0 384 512" fill="currentColor">
              <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
            </svg>
          </span>
          <div className={`menu-dropdown ${openMenu === 'apple' ? 'open' : ''}`}>
            <div className="mi" onClick={() => handleItemClick(() => onNavigate('about'))}>About This Mac</div>
            <div className="menu-divider" />
            <div className="mi" onClick={() => handleItemClick(() => onNavigate('projects'))}>System Settings...</div>
            <div className="mi" onClick={() => handleItemClick(() => onNavigate('skills'))}>App Store...</div>
            <div className="menu-divider" />
            <div className="mi disabled">Recent Items</div>
            <div className="menu-divider" />
            <div className="mi" onClick={() => handleItemClick(onLockScreen)}>Lock Screen<span className="kbd">⌃⌘Q</span></div>
            <div className="mi" onClick={() => handleItemClick(() => onNavigate('home'))}>Log Out Aditya...<span className="kbd">⇧⌘Q</span></div>
          </div>
        </div>

        {/* Portfolio / Home */}
        <span
          className="menu-item bold"
          style={{ cursor: 'pointer' }}
          onClick={() => {
            onNavigate('home');
            setOpenMenu(null);
          }}
        >
          Portfolio
        </span>

        {/* Resume */}
        <div
          className="menu-root"
          onMouseEnter={() => handleMenuHover('resume')}
        >
          <span
            className={`menu-item ${openMenu === 'resume' ? 'active' : ''}`}
            style={{ cursor: 'pointer' }}
            onClick={() => handleMenuClick('resume', 'resume')}
          >
            Resume
          </span>
        </div>

        {/* About */}
        <div
          className="menu-root"
          onMouseEnter={() => handleMenuHover('about')}
        >
          <span
            className={`menu-item ${openMenu === 'about' ? 'active' : ''}`}
            style={{ cursor: 'pointer' }}
            onClick={() => handleMenuClick('about', 'about')}
          >
            About
          </span>
          <div className={`menu-dropdown ${openMenu === 'about' ? 'open' : ''}`}>
            <div className="mi" onClick={() => handleItemClick(() => onNavigate('about'))}>Overview<span className="kbd">⌘O</span></div>
            <div className="mi" onClick={() => handleItemClick(() => onNavigate('experience'))}>Background<span className="kbd">⌘B</span></div>
            <div className="menu-divider" />
            <div className="mi" onClick={() => handleItemClick(() => onNavigate('contact'))}>Get In Touch<span className="kbd">⌘T</span></div>
          </div>
        </div>

        {/* Projects */}
        <div
          className="menu-root"
          onMouseEnter={() => handleMenuHover('projects')}
        >
          <span
            className={`menu-item ${openMenu === 'projects' ? 'active' : ''}`}
            style={{ cursor: 'pointer' }}
            onClick={() => handleMenuClick('projects', 'projects')}
          >
            Projects
          </span>
          <div className={`menu-dropdown ${openMenu === 'projects' ? 'open' : ''}`}>
            <div className="mi" onClick={() => handleItemClick(() => onNavigate('projects'))}>All Projects<span className="kbd">⌘P</span></div>
            <div className="mi" onClick={() => handleItemClick(() => window.open('https://github.com/mihir-aditya', '_blank'))}>GitHub Repositories</div>
          </div>
        </div>

        {/* Experience */}
        <div
          className="menu-root"
          onMouseEnter={() => handleMenuHover('experience')}
        >
          <span
            className={`menu-item ${openMenu === 'experience' ? 'active' : ''}`}
            style={{ cursor: 'pointer' }}
            onClick={() => handleMenuClick('experience', 'experience')}
          >
            Experience
          </span>
          <div className={`menu-dropdown ${openMenu === 'experience' ? 'open' : ''}`}>
            <div className="mi" onClick={() => handleItemClick(() => onNavigate('experience'))}>Work History<span className="kbd">⌘E</span></div>
            <div className="mi" onClick={() => handleItemClick(() => onNavigate('skills'))}>Technical Capabilities</div>
          </div>
        </div>

        {/* Skills */}
        <div
          className="menu-root"
          onMouseEnter={() => handleMenuHover('skills')}
        >
          <span
            className={`menu-item ${openMenu === 'skills' ? 'active' : ''}`}
            style={{ cursor: 'pointer' }}
            onClick={() => handleMenuClick('skills', 'skills')}
          >
            Skills
          </span>
          <div className={`menu-dropdown ${openMenu === 'skills' ? 'open' : ''}`}>
            <div className="mi" onClick={() => handleItemClick(() => onNavigate('skills'))}>Core Expertise</div>
            <div className="mi" onClick={() => handleItemClick(() => onNavigate('skills'))}>Tools & Technologies</div>
          </div>
        </div>

        {/* Contact */}
        <div
          className="menu-root"
          onMouseEnter={() => handleMenuHover('contact')}
        >
          <span
            className={`menu-item ${openMenu === 'contact' ? 'active' : ''}`}
            style={{ cursor: 'pointer' }}
            onClick={() => handleMenuClick('contact', 'contact')}
          >
            Contact
          </span>
          <div className={`menu-dropdown ${openMenu === 'contact' ? 'open' : ''}`}>
            <div className="mi" onClick={() => handleItemClick(() => onNavigate('contact'))}>Send Message<span className="kbd">⌘M</span></div>
            <div className="mi" onClick={() => handleItemClick(() => window.open('mailto:adityachauhan8079@gmail.com', '_blank'))}>Open Mail Client</div>
          </div>
        </div>
      </div>

      <div className="menubar-right">
        {/* Wi-Fi */}
        <span className="status-icon" title="Wi-Fi">
          <svg viewBox="0 0 16 12" width="14" height="11">
            <path fill="currentColor" d="M8 10.4a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6z" />
            <path
              fill="currentColor"
              d="M8 5.4c1.65 0 3.15.62 4.3 1.64a.7.7 0 0 1 .04 1.02l-.78.8a.62.62 0 0 1-.86.02A4.9 4.9 0 0 0 8 7.5c-1.06 0-2.04.36-2.7.94a.62.62 0 0 1-.86-.02l-.78-.8a.7.7 0 0 1 .04-1.02A6.6 6.6 0 0 1 8 5.4z"
            />
            <path
              fill="currentColor"
              d="M8 1.9c2.55 0 4.86.95 6.6 2.53a.7.7 0 0 1 .04 1.02l-.74.76a.6.6 0 0 1-.83.03A8.1 8.1 0 0 0 8 4.3a8.1 8.1 0 0 0-5.07 1.94.6.6 0 0 1-.83-.03l-.74-.76a.7.7 0 0 1 .04-1.02A9.9 9.9 0 0 1 8 1.9z"
            />
          </svg>
        </span>

        {/* Spotlight */}
        <span
          className="status-icon spotlight"
          title="Spotlight Search (⌘K)"
          onClick={onOpenSpotlight}
        >
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="5.4" stroke="currentColor" strokeWidth="1.4" />
            <line x1="11" y1="11" x2="15" y2="15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </span>

        {/* Control Centre */}
        <span
          className="status-icon control-center"
          title="Control Centre"
          onClick={onToggleControlCenter}
        >
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
            <rect x="0.5" y="0.5" width="6.5" height="6.5" rx="1.6" fill="currentColor" />
            <rect x="9" y="0.5" width="6.5" height="6.5" rx="1.6" stroke="currentColor" strokeWidth="1.2" />
            <rect x="0.5" y="9" width="6.5" height="6.5" rx="1.6" stroke="currentColor" strokeWidth="1.2" />
            <rect x="9" y="9" width="6.5" height="6.5" rx="1.6" fill="currentColor" />
          </svg>
        </span>

        {/* Menu Clock */}
        <span className="menu-clock">{clockText}</span>
      </div>
    </div>
  );
}
