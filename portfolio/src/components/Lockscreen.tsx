'use client';

import React, { useState, useEffect, useRef } from 'react';
import './Lockscreen.css';

interface LockscreenProps {
  unlocked?: boolean;
  onUnlock: () => void;
}

const lsDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const lsMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function Lockscreen({ unlocked = false, onUnlock }: LockscreenProps) {
  const [timeStr, setTimeStr] = useState('12:00');
  const [dateStr, setDateStr] = useState('Thu Jul 17');
  const pointerStartY = useRef<number>(0);

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
    if (unlocked) return;
    onUnlock();
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    pointerStartY.current = e.clientY;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (pointerStartY.current - e.clientY > 48) {
      handleUnlock();
    }
  };

  return (
    <div
      className={`lockscreen ${unlocked ? 'unlocking' : ''}`}
      inert={unlocked}
      onClick={handleUnlock}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      <div className="ls-bg" />

      <header className="ls-topline">
        <div className="ls-brand">
          <span className="ls-brand-mark" aria-hidden="true">V.</span>
          <span>VAIBHAV SINGH <i>/</i> PORTFOLIO</span>
        </div>
        <span className="ls-open-state"><i aria-hidden="true" /> OPEN TO BUILD</span>
      </header>

      <main className="ls-main">
        <section className="ls-clock-block" aria-label={`Local time ${timeStr}, ${dateStr}`}>
          <span className="ls-label">LOCAL TIME</span>
          <div className="ls-clock">{timeStr}</div>
          <div className="ls-day">{dateStr}</div>
          <span className="ls-clock-rule" aria-hidden="true" />
          <span className="ls-clock-note">INDIA STANDARD TIME</span>
        </section>

        <section className="ls-identity" aria-labelledby="lockscreen-title">
          <span className="ls-label">FULL STACK DEVELOPER <i>·</i> OPEN SOURCE</span>
          <h1 className="ls-name" id="lockscreen-title">
            Vaibhav&apos;s<br />
            <span>Portfolio</span><b>.</b>
          </h1>
          <p className="ls-description">
            Thoughtful interfaces. Useful systems. Built with intent.
          </p>
          <div className="ls-specialisms" aria-label="Areas of focus">
            <span>WEB ENGINEERING</span>
            <span>APPLIED AI</span>
            <span>OPEN SOURCE</span>
          </div>
        </section>
      </main>

      <footer className="ls-footer">
        <button
          type="button"
          className="ls-enter-button"
          autoFocus
          onClick={(event) => {
            event.stopPropagation();
            handleUnlock();
          }}
        >
          <span className="ls-enter-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19V5M6 11l6-6 6 6" />
            </svg>
          </span>
          <span className="ls-enter-copy">
            <strong>Swipe up to enter</strong>
            <small>Or press Enter / click anywhere</small>
          </span>
          <span className="ls-enter-key" aria-hidden="true">ENTER <i>↗</i></span>
        </button>
        <div className="ls-footer-note">
          <span>PORTFOLIO / 2026</span>
          <span>MADE TO BE EXPLORED</span>
        </div>
      </footer>
    </div>
  );
}

