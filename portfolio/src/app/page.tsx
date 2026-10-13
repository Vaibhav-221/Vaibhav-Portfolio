'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import './HomeReveal.css';
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
import GeminiChatbot from '@/components/GeminiChatbot';
import WindowManager from '@/components/WindowManager';
import MobilePageNav from '@/components/MobilePageNav';

import AboutView from '@/components/views/AboutView';
import ProjectsView from '@/components/views/ProjectsView';
import ExperienceView from '@/components/views/ExperienceView';
import SkillsView from '@/components/views/SkillsView';
import ResumeView from '@/components/views/ResumeView';
import ContactView from '@/components/views/ContactView';

const defaultWallpapers: Wallpaper[] = [
  { type: 'image', label: 'Default', value: '/assets/wallpapers/Default.jpg', thumbnail: '/assets/wallpapers/Default.jpg' },
  { type: 'image', label: 'Andrew Kliatskyi', value: '/assets/wallpapers/andrew-kliatskyi.jpg', thumbnail: '/assets/wallpapers/thumbs/andrew-kliatskyi.jpg' },
  { type: 'image', label: 'Wallpaper 02', value: '/assets/wallpapers/download-1.jpg', thumbnail: '/assets/wallpapers/thumbs/download-1.jpg' },
  { type: 'image', label: 'Wallpaper 03', value: '/assets/wallpapers/download-2.jpg', thumbnail: '/assets/wallpapers/thumbs/download-2.jpg' },
  { type: 'image', label: 'Fabric Ribbon', value: '/assets/wallpapers/fabric-ribbon.png', thumbnail: '/assets/wallpapers/thumbs/fabric-ribbon.jpg' },
  { type: 'image', label: 'Ilgmyzin', value: '/assets/wallpapers/ilgmyzin-unsplash.jpg', thumbnail: '/assets/wallpapers/thumbs/ilgmyzin-unsplash.jpg' },
  { type: 'image', label: 'iPadOS Colorful', value: '/assets/wallpapers/ipados-colorful.jpg', thumbnail: '/assets/wallpapers/thumbs/ipados-colorful.jpg' },
  { type: 'image', label: 'iPadOS Grey', value: '/assets/wallpapers/ipados-grey.jpg', thumbnail: '/assets/wallpapers/thumbs/ipados-grey.jpg' },
  { type: 'image', label: 'Enric Cruz Lopez', value: '/assets/wallpapers/pexels-enric-6039245.jpg', thumbnail: '/assets/wallpapers/thumbs/pexels-enric-6039245.jpg' },
  { type: 'image', label: 'Francesco Ungaro', value: '/assets/wallpapers/pexels-francesco-12357271.jpg', thumbnail: '/assets/wallpapers/thumbs/pexels-francesco-12357271.jpg' },
  { type: 'image', label: 'JCosta', value: '/assets/wallpapers/pexels-jcosta-14011476.jpg', thumbnail: '/assets/wallpapers/thumbs/pexels-jcosta-14011476.jpg' },
  { type: 'image', label: 'Kechno Studio', value: '/assets/wallpapers/pexels-kechno-38615169.jpg', thumbnail: '/assets/wallpapers/thumbs/pexels-kechno-38615169.jpg' },
  { type: 'image', label: 'Steve', value: '/assets/wallpapers/pexels-steve-30925664.jpg', thumbnail: '/assets/wallpapers/thumbs/pexels-steve-30925664.jpg' },
  { type: 'image', label: 'Stywo', value: '/assets/wallpapers/pexels-stywo-1054222.jpg', thumbnail: '/assets/wallpapers/thumbs/pexels-stywo-1054222.jpg' },
  { type: 'image', label: 'Vincentfotos', value: '/assets/wallpapers/pexels-vincentfotos-28947201.jpg', thumbnail: '/assets/wallpapers/thumbs/pexels-vincentfotos-28947201.jpg' },
  { type: 'image', label: 'Purple Abstract', value: '/assets/wallpapers/purple-abstract.jpg', thumbnail: '/assets/wallpapers/thumbs/purple-abstract.jpg' },
  { type: 'image', label: 'Sunset Colorful', value: '/assets/wallpapers/sunset-colorful.jpg', thumbnail: '/assets/wallpapers/thumbs/sunset-colorful.jpg' },
  { type: 'image', label: 'Vivo X Fold', value: '/assets/wallpapers/vivo-x-fold.jpg', thumbnail: '/assets/wallpapers/thumbs/vivo-x-fold.jpg' },
  { type: 'image', label: 'Windows 11 50th', value: '/assets/wallpapers/windows-11-50th.jpg', thumbnail: '/assets/wallpapers/thumbs/windows-11-50th.jpg' },
  { type: 'image', label: 'Windows 11 Abstract', value: '/assets/wallpapers/windows-11-abstract.jpg', thumbnail: '/assets/wallpapers/thumbs/windows-11-abstract.jpg' },
  { type: 'image', label: 'Windows 11 Light', value: '/assets/wallpapers/windows-11-stock-light.jpg', thumbnail: '/assets/wallpapers/thumbs/windows-11-stock-light.jpg' },
  { type: 'image', label: 'Xiaomi 18 Fold', value: '/assets/wallpapers/xiaomi-18-fold.jpg', thumbnail: '/assets/wallpapers/thumbs/xiaomi-18-fold.jpg' },
];

export default function HomePage() {
  const [unlocked, setUnlocked] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [wallpapers, setWallpapers] = useState<Wallpaper[]>(defaultWallpapers);
  const [activeWpIndex, setActiveWpIndex] = useState(0);
  const [isLightTheme, setIsLightTheme] = useState(false);
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

  const applyWallpaperAppearance = useCallback((wallpaper?: Wallpaper) => {
    if (wallpaper?.type === 'image' && wallpaper.value) {
      checkBrightness(wallpaper.value, (isLight) => {
        document.body.classList.toggle('light-theme', isLight);
        setIsLightTheme(isLight);
      });
    } else {
      document.body.classList.remove('light-theme');
      setIsLightTheme(false);
    }
  }, [checkBrightness]);

  const applyWallpaper = useCallback((index: number) => {
    setActiveWpIndex(index);
    applyWallpaperAppearance(wallpapers[index]);
  }, [wallpapers, applyWallpaperAppearance]);

  // Handle page navigation
  const navigateTo = (page: PageId) => {
    setCurrentPage(page);
    setIsNavHidden(false);
    setWindows([]);
    setIsWpPickerOpen(false);
    setIsSpotlightOpen(false);
    setIsControlCenterOpen(false);
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
    setIsWpPickerOpen(false);
    setIsControlCenterOpen(false);
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

  const toggleAppleMusic = () => {
    setIsWpPickerOpen(false);
    setIsSpotlightOpen(false);
    setIsControlCenterOpen(false);
    const existing = windows.find((win) => win.id === 'apple-music');
    if (existing && !existing.minimized) {
      closeWindow(existing.id);
      return;
    }
    openApp('Apple Music', '', 'apple-music');
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
    setActiveWpIndex(wallpapers.length);
    applyWallpaperAppearance(newWp);
  };

  const toggleTheme = () => {
    const nextIsLight = !document.body.classList.contains('light-theme');
    document.body.classList.toggle('light-theme', nextIsLight);
    setIsLightTheme(nextIsLight);
  };

  const toggleWallpaperPicker = () => {
    if (!isWpPickerOpen) {
      setWindows((prev) => prev.filter((win) => win.id !== 'apple-music'));
      setIsSpotlightOpen(false);
      setIsControlCenterOpen(false);
    }
    setIsWpPickerOpen((open) => !open);
  };

  const activeWp = wallpapers[activeWpIndex] || wallpapers[0];

  return (
    <main className="desktop-wrapper">
      {/* Lockscreen */}
      <Lockscreen unlocked={unlocked} onUnlock={() => setUnlocked(true)} />

      {/* macOS Desktop */}
      <div
        className={`desktop${unlocked && currentPage === 'home' ? ' is-unlocked' : ''}`}
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

        {/* Home View Widgets: Left Bio/Services & Right Gemini AI Chatbot */}
        {currentPage === 'home' && (
          <div className="profile-widget-container" id="home-view">
            {/* Left Hero Column: Personal Bio & Specializations */}
            <div className="hero-left-column">
              <div className="widget-row">
                <ProfileWidget onNavigate={navigateTo} onOpenApp={openApp} />
                <ServicesWidget />
              </div>
              <AboutWidget onNavigate={navigateTo} />
            </div>

            {/* Right Hero Column: Interactive Gemini AI Chatbot & Player */}
            <div className="hero-right-column">
              <GeminiChatbot />
              <MusicPlayerWidget />
            </div>
          </div>
        )}

        {/* Page Modal View */}
        {currentPage !== 'home' && (
          <div
            ref={activePageRef}
            className={`page-content active${currentPage === 'about' ? '' : ' portfolio-pages'}`}
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
          currentPage={currentPage}
          onNavigate={navigateTo}
          onOpenApp={openApp}
          onToggleAppleMusic={toggleAppleMusic}
          onToggleWallpaperPicker={toggleWallpaperPicker}
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
          isLightTheme={isLightTheme}
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
