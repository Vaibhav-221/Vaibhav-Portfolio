'use client';

import React, { useState, useEffect, useRef } from 'react';

interface LockscreenProps {
  unlocked?: boolean;
  onUnlock: () => void;
}

const lsDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const lsMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function Lockscreen({ onUnlock }: LockscreenProps) {
  const [timeStr, setTimeStr] = useState('12:00');
  const [dateStr, setDateStr] = useState('Thu Jul 17');
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [isGone, setIsGone] = useState(false);
  const touchStartY = useRef<number>(0);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const h = now.getHours();
      const m = now.getMinutes();
      const h12 = h % 12 === 0 ? 12 : h % 12;
      setTimeStr(`${h12}:${m < 10 ? '0' + m : m}`);
      setDateStr(`${lsDays[now.getDay()]} ${lsMonths[now.getMonth()]} ${now.getDate()}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleUnlock = () => {
    if (isUnlocking || isGone) return;
    setIsUnlocking(true);
    onUnlock();
    setTimeout(() => {
      setIsGone(true);
    }, 750);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.changedTouches[0].clientY - touchStartY.current < -50) {
      handleUnlock();
    }
  };

  if (isGone) return null;

  return (
    <div
      className={`lockscreen ${isUnlocking ? 'unlocking' : ''}`}
      onClick={handleUnlock}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="button"
      tabIndex={0}
      aria-label="Unlock screen"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleUnlock();
      }}
    >
      <div className="ls-bg" />

      {/* Status Bar */}
      <div className="ls-status-bar">
        <div className="ls-status-right">
          <span>U.S.</span>
          <svg className="ls-wifi" viewBox="0 0 16 12" width="16" height="12">
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
          <span>91%</span>
          <svg className="ls-battery" width="24" height="12" viewBox="0 0 24 12" fill="none">
            <rect x="0.75" y="0.75" width="20" height="10.5" rx="2.5" stroke="currentColor" strokeWidth="1.1" />
            <rect x="2.25" y="2.25" width="17" height="7.5" rx="1.4" fill="currentColor" />
            <rect x="21.5" y="4" width="1.8" height="4" rx="0.9" fill="currentColor" />
          </svg>
        </div>
      </div>

      {/* Day + Date */}
      <div className="ls-top">
        <div className="ls-day">{dateStr}</div>
      </div>

      {/* Giant Clock */}
      <div className="ls-clock-wrap">
        <div className="ls-clock">{timeStr}</div>
      </div>
      <div className="ls-name">Aditya&apos;s Portfolio</div>

      {/* Quick Actions (Mobile) */}
      <div className="ls-quick-actions">
        <button
          className="ls-quick-btn"
          type="button"
          aria-label="Flashlight"
          onClick={(e) => e.stopPropagation()}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 2h6l1.5 3.5-1.5 1.5H9L7.5 5.5 9 2z" />
            <line x1="7.5" y1="7" x2="16.5" y2="7" />
            <rect x="8.5" y="7" width="7" height="14" rx="1.5" />
          </svg>
        </button>
        <button
          className="ls-quick-btn"
          type="button"
          aria-label="Camera"
          onClick={(e) => e.stopPropagation()}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
        </button>
      </div>

      {/* Swipe / Click hint */}
      <div className="ls-swipe-hint">
        <div className="ls-swipe-chevron">
          <svg width="22" height="13" viewBox="0 0 22 13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 1l10 10L21 1" />
          </svg>
        </div>
        <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 500 }}>
          Click anywhere to unlock
        </div>
      </div>
    </div>
  );
}

