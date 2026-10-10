'use client';

import React from 'react';

export default function ServicesWidget() {
  return (
    <div className="services-widget">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <h2 style={{ margin: 0 }}>Core Expertise</h2>
        <span
          style={{
            fontSize: '11px',
            color: '#0a84ff',
            background: 'rgba(10, 132, 255, 0.12)',
            padding: '2px 8px',
            borderRadius: '10px',
            fontWeight: 600,
          }}
        >
          Specializations
        </span>
      </div>

      <div className="service-item">
        <div className="service-icon" style={{ color: '#0a84ff' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
        </div>
        <div className="service-text">
          <h4>Full Stack Engineering</h4>
          <p>Production-ready web apps with Next.js, React, Node.js, FastAPI &amp; Tailwind CSS.</p>
        </div>
      </div>

      <div className="service-item">
        <div className="service-icon" style={{ color: '#ff9f0a' }}>
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

      <div className="service-item">
        <div className="service-icon" style={{ color: '#bf5af2' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          </svg>
        </div>
        <div className="service-text">
          <h4>AI Integrations &amp; Cloud</h4>
          <p>RAG pipelines, Gemini API, LangChain, ChromaDB vector search &amp; Firestore.</p>
        </div>
      </div>
    </div>
  );
}
