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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
        <h2 style={{ margin: 0 }}>About Me</h2>
        <span
          style={{
            fontSize: '11px',
            color: '#c5ff41',
            background: 'rgba(197, 255, 65, 0.12)',
            padding: '2px 8px',
            borderRadius: '10px',
            fontWeight: 600,
            letterSpacing: '0.5px',
          }}
        >
          CSE &apos;29
        </span>
      </div>

      <p>
        Hi, I&apos;m <strong style={{ color: 'var(--text-main)', fontWeight: 600 }}>{personalInfo.name}</strong>, a Full Stack Developer and Open Source Contributor based in {personalInfo.location}. I specialize in architecting real-time web applications with Next.js, React, FastAPI, and Firebase.
      </p>
      <p>
        Ranked in the <span style={{ color: '#c5ff41', fontWeight: 600 }}>Top 1%</span> nationwide in GSSoC &apos;26 and creator of platforms serving 500+ active students. Driven to turn complex system requirements into seamless, performant digital experiences.
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
            <span style={{ fontSize: '15px', fontWeight: 700, color: m.accent, fontFamily: 'var(--font-oswald)' }}>
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
