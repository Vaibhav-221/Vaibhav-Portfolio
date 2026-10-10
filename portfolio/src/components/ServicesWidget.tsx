import React from 'react';

export default function ServicesWidget() {
  return (
    <div className="services-widget">
      <h2>What I&apos;m doing</h2>

      <div className="service-item">
        <div className="service-icon">
          <svg viewBox="0 0 24 24">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <line x1="3" y1="9" x2="21" y2="9" />
            <line x1="9" y1="21" x2="9" y2="9" />
          </svg>
        </div>
        <div className="service-text">
          <h4>Web Design</h4>
          <p>The most modern and high-quality design made at a professional level.</p>
        </div>
      </div>

      <div className="service-item">
        <div className="service-icon">
          <svg viewBox="0 0 24 24">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
        </div>
        <div className="service-text">
          <h4>Web Development</h4>
          <p>High-quality development of sites at the professional level.</p>
        </div>
      </div>

      <div className="service-item">
        <div className="service-icon">
          <svg viewBox="0 0 24 24">
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
            <line x1="12" y1="18" x2="12.01" y2="18" />
          </svg>
        </div>
        <div className="service-text">
          <h4>App Development</h4>
          <p>Android and iOS app development in React, Kotlin.</p>
        </div>
      </div>
    </div>
  );
}
