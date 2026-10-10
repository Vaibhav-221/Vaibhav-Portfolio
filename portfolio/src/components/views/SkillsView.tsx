'use client';

import React, { useState } from 'react';
import { skillCategoriesData } from '@/data/portfolioData';

export default function SkillsView() {
  const [selectedCat, setSelectedCat] = useState<string>('All');

  const categories = ['All', ...skillCategoriesData.map((c) => c.categoryName)];

  const displayCategories = skillCategoriesData.filter((cat) => {
    if (selectedCat === 'All') return true;
    return cat.categoryName === selectedCat;
  });

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '32px', fontWeight: 700, margin: 0 }}>Technical Skills</h2>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
            Comprehensive toolkit spanning full-stack web development, AI engineering, and cloud platforms.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div
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
                background: selectedCat === cat ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                color: selectedCat === cat ? '#ffffff' : 'var(--text-muted)',
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
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '20px' }}>
        {displayCategories.map((cat, idx) => (
          <div
            key={idx}
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
                  color: '#0a84ff',
                  background: 'rgba(10, 132, 255, 0.12)',
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
                    <span style={{ fontSize: '13.5px', fontWeight: skill.highlight ? 600 : 500, color: skill.highlight ? '#ffffff' : 'var(--text-main)' }}>
                      {skill.name} {skill.highlight && <span style={{ color: '#c5ff41', fontSize: '11px', marginLeft: '4px' }}>★</span>}
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
                          ? 'linear-gradient(90deg, #0a84ff, #c5ff41)'
                          : 'linear-gradient(90deg, rgba(255,255,255,0.4), rgba(255,255,255,0.8))',
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
            color: '#c5ff41',
            background: 'rgba(197, 255, 65, 0.1)',
            padding: '6px 12px',
            borderRadius: '10px',
            fontWeight: 600,
          }}
        >
          <span>✓</span> Production Ready
        </div>
      </div>
    </div>
  );
}
