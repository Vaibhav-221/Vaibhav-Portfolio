'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { PageId, Wallpaper, AppWindow } from '@/types';
import Lockscreen from '@/components/Lockscreen';
import Menubar from '@/components/Menubar';
import Spotlight from '@/components/Spotlight';
import ControlCenter from '@/components/ControlCenter';
import WallpaperPicker from '@/components/WallpaperPicker';
import Dock from '@/components/Dock';
import ProfileWidget from '@/components/ProfileWidget';
import ServicesWidget from '@/components/ServicesWidget';
import AboutWidget from '@/components/AboutWidget';
import MusicPlayerWidget from '@/components/MusicPlayerWidget';
import WindowManager from '@/components/WindowManager';
import MobilePageNav from '@/components/MobilePageNav';

import AboutView from '@/components/views/AboutView';
import ProjectsView from '@/components/views/ProjectsView';
import ExperienceView from '@/components/views/ExperienceView';
import SkillsView from '@/components/views/SkillsView';
import ResumeView from '@/components/views/ResumeView';
import ContactView from '@/components/views/ContactView';

const defaultWallpapers: Wallpaper[] = [
  { type: 'image', label: 'Default', value: '/assets/images/6fba6553c9606fe12ebdc15512e1c6da.jpg' },
  { type: 'image', label: 'Batman', value: '/assets/images/BATMAN__.jfif' },
  { type: 'image', label: 'Dark Scenery', value: '/assets/images/090846e8bea467388a24988b6239e86d.jpg' },
  { type: 'image', label: '4K Space', value: '/assets/images/4K_WALLPAPER.jpg' },
  { type: 'image', label: 'Aesthetic', value: '/assets/images/download.jfif' },
  { type: 'original', label: 'Aurora' },
  { type: 'gradient', label: 'Nebula', value: 'linear-gradient(135deg, #1a0040 0%, #6600cc 30%, #cc00aa 60%, #ff6600 100%)' },
  { type: 'gradient', label: 'Sunset', value: 'linear-gradient(160deg, #0d0221 0%, #8b005d 30%, #e8003d 60%, #ff8c00 85%, #ffd000 100%)' },
  { type: 'gradient', label: 'Ocean', value: 'linear-gradient(160deg, #000428 0%, #004e92 40%, #009fff 75%, #00e4ff 100%)' },
  { type: 'gradient', label: 'Forest', value: 'linear-gradient(160deg, #0a1a00 0%, #1a5c00 35%, #00aa44 65%, #00ff99 100%)' },
  { type: 'gradient', label: 'Candy', value: 'linear-gradient(135deg, #fc466b 0%, #3f5efb 50%, #00d2ff 100%)' },
  { type: 'gradient', label: 'Volcano', value: 'linear-gradient(160deg, #0d0000 0%, #7a0000 30%, #cc2200 55%, #ff6600 75%, #ffcc00 100%)' },
  { type: 'gradient', label: 'Galaxy', value: 'linear-gradient(135deg, #020024 0%, #090979 40%, #00d4ff 100%)' },
  { type: 'gradient', label: 'Rose', value: 'linear-gradient(135deg, #1a0010 0%, #880055 40%, #ff0088 70%, #ffaacc 100%)' },
  { type: 'gradient', label: 'Arctic', value: 'linear-gradient(160deg, #000d1a 0%, #002244 35%, #0066cc 65%, #66ccff 100%)' },
];

export default function HomePage() {
  const [unlocked, setUnlocked] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>(defaultWallpapers);
  const [activeWpIndex, setActiveWpIndex] = useState(0);
  const [isWpPickerOpen, setIsWpPickerOpen] = useState(false);
  const [isSpotlightOpen, setIsSpotlightOpen] = useState(false);
  const [isControlCenterOpen, setIsControlCenterOpen] = useState(false);
  const [windows, setWindows] = useState<AppWindow[]>([]);
  const [highestZ, setHighestZ] = useState(300);
  const [isNavHidden, setIsNavHidden] = useState(false);

  const activePageRef = useRef<HTMLDivElement>(null);
  const lastScrollTopRef = useRef<number>(0);
  const scrollAccumulatorRef = useRef<number>(0);

  // Viewport visual height calculation
  useEffect(() => {
    const setAppHeight = () => {
      const vh = (window.visualViewport && window.visualViewport.height) || window.innerHeight;
      document.documentElement.style.setProperty('--app-height', `${vh}px`);
    };

    setAppHeight();
    window.addEventListener('resize', setAppHeight);
    window.addEventListener('orientationchange', setAppHeight);
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', setAppHeight);
      window.visualViewport.addEventListener('scroll', setAppHeight);
    }
    return () => {
      window.removeEventListener('resize', setAppHeight);
      window.removeEventListener('orientationchange', setAppHeight);
    };
  }, []);

  // Check wallpaper luminance
  const checkBrightness = useCallback((url: string, callback: (isLight: boolean) => void) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 50;
      canvas.height = 50;
      const ctx = canvas.getContext('2d');
      if (!ctx) return callback(false);
      ctx.drawImage(img, 0, 0, 50, 50);
      try {
        const data = ctx.getImageData(0, 0, 50, 50).data;
        let r = 0, g = 0, b = 0;
        for (let i = 0; i < data.length; i += 4) {
          r += data[i];
          g += data[i + 1];
          b += data[i + 2];
        }
        const total = data.length / 4;
        const brightness = ((r / total) * 299 + (g / total) * 587 + (b / total) * 114) / 1000;
        callback(brightness > 130);
      } catch {
        callback(false);
      }
    };
    img.onerror = () => callback(false);
    img.src = url;
  }, []);

  const applyWallpaper = useCallback((index: number) => {
    setActiveWpIndex(index);
    const wp = wallpapers[index];
    if (wp?.type === 'image' && wp.value) {
      checkBrightness(wp.value, (isLight) => {
        if (isLight) document.body.classList.add('light-theme');
        else document.body.classList.remove('light-theme');
      });
    } else {
      document.body.classList.remove('light-theme');
    }
  }, [wallpapers, checkBrightness]);

  // Handle page navigation
  const navigateTo = (page: PageId) => {
    setCurrentPage(page);
    setIsNavHidden(false);
    if (page === 'home') {
      document.body.classList.remove('page-active');
    } else {
      document.body.classList.add('page-active');
      if (activePageRef.current) {
        activePageRef.current.scrollTop = 0;
      }
    }
  };

  // Scroll listener for mobile capsule nav
  const handlePageScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const current = e.currentTarget.scrollTop;
    const delta = current - lastScrollTopRef.current;
    const TOP_SLACK = 24;
    const THRESHOLD = 8;

    if (current <= TOP_SLACK) {
      setIsNavHidden(false);
      scrollAccumulatorRef.current = 0;
      lastScrollTopRef.current = current;
      return;
    }

    if (
      (delta > 0 && scrollAccumulatorRef.current < 0) ||
      (delta < 0 && scrollAccumulatorRef.current > 0)
    ) {
      scrollAccumulatorRef.current = 0;
    }
    scrollAccumulatorRef.current += delta;

    if (scrollAccumulatorRef.current > THRESHOLD) {
      setIsNavHidden(true);
      scrollAccumulatorRef.current = 0;
    } else if (scrollAccumulatorRef.current < -THRESHOLD) {
      setIsNavHidden(false);
      scrollAccumulatorRef.current = 0;
    }

    lastScrollTopRef.current = current;
  };

  // Window Manager operations
  const openApp = (name: string, url: string, isApp?: 'apple-music' | 'iframe') => {
    const id = name.replace(/\s+/g, '-').toLowerCase();
    const existing = windows.find((w) => w.id === id);

    if (existing) {
      setWindows((prev) =>
        prev.map((w) => (w.id === id ? { ...w, minimized: false, zIndex: highestZ + 1 } : w))
      );
      setHighestZ((prev) => prev + 1);
      return;
    }

    const newWin: AppWindow = {
      id,
      title: name,
      url,
      isApp,
      minimized: false,
      maximized: false,
      zIndex: highestZ + 1,
    };
    setHighestZ((prev) => prev + 1);
    setWindows((prev) => [...prev, newWin]);
  };

  const closeWindow = (id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  };

  const minimizeWindow = (id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, minimized: true } : w))
    );
  };

  const maximizeWindow = (id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, maximized: !w.maximized } : w))
    );
  };

  const bringToFront = (id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, zIndex: highestZ + 1 } : w))
    );
    setHighestZ((prev) => prev + 1);
  };

  const handleUploadWallpaper = (file: File) => {
    const url = URL.createObjectURL(file);
    const newWp: Wallpaper = { type: 'image', label: file.name, value: url };
    setWallpapers((prev) => [...prev, newWp]);
    applyWallpaper(wallpapers.length);
  };

  const toggleTheme = () => {
    document.body.classList.toggle('light-theme');
  };

  const activeWp = wallpapers[activeWpIndex] || wallpapers[0];

  return (
    <main className="desktop-wrapper">
      {/* Lockscreen */}
      <Lockscreen unlocked={unlocked} onUnlock={() => setUnlocked(true)} />

      {/* macOS Desktop */}
      <div
        className="desktop"
        style={{
          background:
            activeWp.type === 'image' && activeWp.value
              ? `url(${activeWp.value}) center/cover no-repeat`
              : activeWp.type === 'gradient' && activeWp.value
              ? activeWp.value
              : undefined,
        }}
      >
        {/* Vector Aurora Wallpaper */}
        {activeWp.type === 'original' && (
          <svg className="wallpaper" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="bgGrad" x1="15%" y1="0%" x2="85%" y2="100%">
                <stop offset="0%" stopColor="#0a0c18" />
                <stop offset="50%" stopColor="#070811" />
                <stop offset="100%" stopColor="#04050a" />
              </linearGradient>
              <radialGradient id="purpleGlow" cx="80%" cy="8%" r="55%">
                <stop offset="0%" stopColor="#8855ff" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#8855ff" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="cyanGlow" cx="10%" cy="100%" r="65%">
                <stop offset="0%" stopColor="#15d6c4" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#15d6c4" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8855ff" />
                <stop offset="50%" stopColor="#ff55aa" />
                <stop offset="100%" stopColor="#15d6c4" />
              </linearGradient>
            </defs>
            <rect width="1600" height="1000" fill="url(#bgGrad)" />
            <rect width="1600" height="1000" fill="url(#purpleGlow)" />
            <rect width="1600" height="1000" fill="url(#cyanGlow)" />
            <path
              d="M-40,-40 C100,20 150,120 270,140 C400,170 430,100 560,150 C700,200 680,300 820,360 C960,420 1040,360 1180,430 C1330,510 1410,470 1640,540 L1640,730 C1410,660 1330,700 1180,630 C1040,550 960,620 820,560 C680,500 700,400 560,350 C430,300 400,370 270,340 C150,310 100,220 -40,150 Z"
              fill="url(#ribbonGrad)"
              opacity="0.4"
            />
          </svg>
        )}

        {/* Top Menubar */}
        <Menubar
          currentPage={currentPage}
          onNavigate={navigateTo}
          onOpenSpotlight={() => setIsSpotlightOpen(true)}
          onToggleControlCenter={() => setIsControlCenterOpen(!isControlCenterOpen)}
          onLockScreen={() => setUnlocked(false)}
        />

        {/* Home View Widgets */}
        {currentPage === 'home' && (
          <div className="profile-widget-container" id="home-view">
            <div className="widget-row">
              <ProfileWidget onNavigate={navigateTo} onOpenApp={openApp} />
              <ServicesWidget />
            </div>

            <AboutWidget onNavigate={navigateTo} />
            <MusicPlayerWidget />
          </div>
        )}

        {/* Page Modal View */}
        {currentPage !== 'home' && (
          <div
            ref={activePageRef}
            className="page-content active"
            onScroll={handlePageScroll}
          >
            {currentPage === 'about' && <AboutView />}
            {currentPage === 'projects' && <ProjectsView />}
            {currentPage === 'experience' && <ExperienceView />}
            {currentPage === 'skills' && <SkillsView />}
            {currentPage === 'resume' && <ResumeView />}
            {currentPage === 'contact' && <ContactView />}
          </div>
        )}

        {/* Mobile Page Navigation Capsules */}
        <MobilePageNav
          currentPage={currentPage}
          onNavigate={navigateTo}
          isHidden={isNavHidden}
        />

        {/* Bottom Dock & Bar */}
        <Dock
          onNavigate={navigateTo}
          onOpenApp={openApp}
          onToggleWallpaperPicker={() => setIsWpPickerOpen(!isWpPickerOpen)}
        />

        {/* Draggable Window Manager */}
        <WindowManager
          windows={windows}
          onCloseWindow={closeWindow}
          onMinimizeWindow={minimizeWindow}
          onMaximizeWindow={maximizeWindow}
          onBringToFront={bringToFront}
        />

        {/* Spotlight Search */}
        <Spotlight
          isOpen={isSpotlightOpen}
          onClose={() => setIsSpotlightOpen(false)}
          onNavigate={navigateTo}
          onOpenApp={openApp}
        />

        {/* Control Center */}
        <ControlCenter
          isOpen={isControlCenterOpen}
          onClose={() => setIsControlCenterOpen(false)}
        />

        {/* Wallpaper Picker */}
        <WallpaperPicker
          isOpen={isWpPickerOpen}
          onClose={() => setIsWpPickerOpen(false)}
          wallpapers={wallpapers}
          activeWpIndex={activeWpIndex}
          onSelectWallpaper={applyWallpaper}
          onUploadWallpaper={handleUploadWallpaper}
          onToggleTheme={toggleTheme}
        />
      </div>
    </main>
  );
}
