'use client';

import React from 'react';
import { PageId } from '@/types';
import { personalInfo, impactMetrics } from '@/data/portfolioData';

interface AboutWidgetProps {
  onNavigate: (page: PageId) => void;
}

export default function AboutWidget({ onNavigate }: AboutWidgetProps) {
  return (
    <div
      className="about-widget"
      onClick={() => onNavigate('about')}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onNavigate('about');
      }}
    >
      <div className="home-widget-heading">
        <div>
          <span className="home-widget-kicker">PROFILE / 01</span>
          <h2>Built around people.</h2>
        </div>
        <span className="home-widget-tag">CSE &apos;29</span>
      </div>


      <p>
        I&apos;m <strong style={{ color: 'var(--text-main)', fontWeight: 600 }}>{personalInfo.name}</strong>, a full-stack developer based in {personalInfo.location}, building dependable products with Next.js, React, FastAPI, and Firebase.
      </p>
      <p>
        Ranked in the <span style={{ color: 'var(--portfolio-accent)', fontWeight: 600 }}>Top 1%</span> nationwide in GSSoC &apos;26 and creator of platforms serving 500+ active students. Driven to turn complex system requirements into seamless, performant digital experiences.
      </p>

      {/* Mini metric counters row */}
      <div
        style={{
          marginTop: '12px',
          paddingTop: '10px',
          borderTop: '1px solid var(--glass-border)',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '8px',
        }}
      >
        {impactMetrics.slice(0, 2).map((m) => (
          <div key={m.id} style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--portfolio-accent)', fontFamily: 'var(--font-oswald)' }}>
              {m.value}
            </span>
            <span style={{ fontSize: '10.5px', color: 'var(--text-muted)', lineHeight: 1.2 }}>
              {m.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
