'use client';

import React, { useState } from 'react';
import { skillCategoriesData } from '@/data/portfolioData';
import PortfolioPage from './PortfolioPage';

export default function SkillsView() {
  const [selectedCat, setSelectedCat] = useState<string>('All');

  const categories = ['All', ...skillCategoriesData.map((c) => c.categoryName)];

  const displayCategories = skillCategoriesData.filter((cat) => {
    if (selectedCat === 'All') return true;
    return cat.categoryName === selectedCat;
  });

  return (
    <PortfolioPage
      eyebrow="SYSTEMS / CAPABILITIES"
      title="A practical technical toolkit."
      description="Full-stack engineering, applied AI, and the tools that carry ideas from interface to production."
    >
    <div className="portfolio-view-content">
      <div className="portfolio-view-toolbar portfolio-reveal">
        {/* Category Filter Pills */}
        <div
          className="portfolio-filter"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px',
            background: 'var(--glass-bg)',
            padding: '4px',
            borderRadius: '14px',
            border: '1px solid var(--glass-border)',
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              style={{
                padding: '6px 12px',
                borderRadius: '10px',
                border: 'none',
                background: selectedCat === cat ? 'var(--portfolio-accent-soft)' : 'transparent',
                color: selectedCat === cat ? 'var(--portfolio-accent)' : 'var(--text-muted)',
                fontSize: '12.5px',
                fontWeight: selectedCat === cat ? 600 : 500,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Category Grid */}
      <div className="portfolio-card-grid">
        {displayCategories.map((cat, idx) => (
          <div
            key={idx}
            className="portfolio-card portfolio-reveal"
            style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              borderRadius: '20px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: 'var(--text-main)' }}>
                {cat.categoryName}
              </h3>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: 'var(--portfolio-accent)',
                  background: 'var(--portfolio-accent-soft)',
                  padding: '3px 8px',
                  borderRadius: '8px',
                }}
              >
                {cat.skills.length} Technologies
              </span>
            </div>

            {/* Skill list with progress indicators */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {cat.skills.map((skill, sIdx) => (
                <div key={sIdx}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontSize: '13.5px', fontWeight: skill.highlight ? 600 : 500, color: skill.highlight ? 'var(--portfolio-accent)' : 'var(--text-main)' }}>
                      {skill.name} {skill.highlight && <span style={{ color: 'var(--portfolio-accent)', fontSize: '11px', marginLeft: '4px' }}>★</span>}
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 500 }}>
                      {skill.level}%
                    </span>
                  </div>

                  {/* Meter bar */}
                  <div
                    style={{
                      height: '6px',
                      background: 'var(--glass-bg-light)',
                      borderRadius: '3px',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: `${skill.level}%`,
                        height: '100%',
                        background: skill.highlight
                          ? 'linear-gradient(90deg, var(--portfolio-accent), color-mix(in srgb, var(--portfolio-accent) 42%, transparent))'
                          : 'linear-gradient(90deg, var(--portfolio-border), var(--text-muted))',
                        borderRadius: '3px',
                        transition: 'width 0.8s ease-in-out',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Cloud & Architecture Summary Pill Strip */}
      <div
        className="portfolio-card portfolio-skills-summary portfolio-reveal"
        style={{
          marginTop: '30px',
          background: 'var(--glass-bg)',
          border: '1px solid var(--glass-border)',
          borderRadius: '16px',
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '14px',
        }}
      >
        <div>
          <h4 style={{ fontSize: '15px', fontWeight: 600, margin: '0 0 2px 0', color: 'var(--text-main)' }}>
            Architecture &amp; Best Practices
          </h4>
          <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', margin: 0 }}>
            Component-Driven Architecture • REST &amp; Server Actions • RAG Pipelines • Agile/Scrum
          </p>
        </div>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '12px',
            color: 'var(--portfolio-accent)',
            background: 'var(--portfolio-accent-soft)',
            padding: '6px 12px',
            borderRadius: '10px',
            fontWeight: 600,
          }}
        >
          <span>✓</span> Production Ready
        </div>
      </div>
    </div>
    </PortfolioPage>
  );
}
