'use client';

import React from 'react';

export default function ServicesWidget() {
  return (
    <div className="services-widget">
      <div className="home-widget-heading">
        <div>
          <span className="home-widget-kicker">CAPABILITIES / 02</span>
          <h2>Where I focus.</h2>
        </div>
        <span className="home-widget-tag">Core areas</span>
      </div>

      <div className="service-item">
        <div className="service-icon" style={{ color: 'var(--portfolio-accent)' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
        </div>
        <div className="service-text">
          <h4>Full Stack Engineering</h4>
          <p>Production-ready web apps with Next.js, React, Node.js &amp; Tailwind CSS.</p>
        </div>
      </div>

      <div className="service-item">
        <div className="service-icon" style={{ color: 'var(--portfolio-accent)' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="18" r="3" />
            <circle cx="6" cy="6" r="3" />
            <path d="M13 6h3a2 2 0 0 1 2 2v7" />
            <line x1="6" y1="9" x2="6" y2="21" />
          </svg>
        </div>
        <div className="service-text">
          <h4>Open Source &amp; Systems</h4>
          <p>Top 1% contributor in GSSoC &apos;26 with merged PRs in active community codebases.</p>
        </div>
      </div>

    </div>
  );
}
