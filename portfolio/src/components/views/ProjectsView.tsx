'use client';

import React, { useState } from 'react';
import { projectsData, ProjectItem } from '@/data/portfolioData';

export default function ProjectsView() {
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', 'Full Stack', 'AI & ML'];

  const filteredProjects = projectsData.filter((p) => {
    if (filter === 'All') return true;
    return p.category === filter;
  });

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '32px', fontWeight: 700, margin: 0 }}>Featured Projects</h2>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
            Production web platforms, open-source systems, and AI-powered applications.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            background: 'var(--glass-bg)',
            padding: '4px',
            borderRadius: '14px',
            border: '1px solid var(--glass-border)',
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                padding: '6px 14px',
                borderRadius: '10px',
                border: 'none',
                background: filter === cat ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                color: filter === cat ? '#ffffff' : 'var(--text-muted)',
                fontSize: '13px',
                fontWeight: filter === cat ? 600 : 500,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '20px' }}>
        {filteredProjects.map((project: ProjectItem) => (
          <div
            key={project.id}
            style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              borderRadius: '20px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'transform 0.2s ease, border-color 0.2s ease',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Top Accent Line */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: `linear-gradient(90deg, ${project.color}, ${project.accentColor})`,
              }}
            />

            <div>
              {/* Header row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px', marginBottom: '12px' }}>
                <div>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.8px',
                      color: project.color,
                      background: `${project.color}15`,
                      padding: '3px 8px',
                      borderRadius: '8px',
                      display: 'inline-block',
                      marginBottom: '6px',
                    }}
                  >
                    {project.category}
                  </span>
                  <h3 style={{ fontSize: '22px', fontWeight: 700, margin: '0 0 2px 0', color: 'var(--text-main)' }}>
                    {project.title}
                  </h3>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 500 }}>
                    {project.subtitle}
                  </div>
                </div>

                <span style={{ fontSize: '12px', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                  {project.timeline}
                </span>
              </div>

              {/* Verified Metrics Badge if present */}
              {project.metrics && (
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 10px',
                    borderRadius: '8px',
                    background: 'rgba(197, 255, 65, 0.1)',
                    border: '1px solid rgba(197, 255, 65, 0.25)',
                    color: '#c5ff41',
                    fontSize: '12px',
                    fontWeight: 600,
                    marginBottom: '14px',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                    <polyline points="16 7 22 7 22 13" />
                  </svg>
                  {project.metrics}
                </div>
              )}

              {/* Description */}
              <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--text-main)', margin: '0 0 16px 0' }}>
                {project.description}
              </p>

              {/* Key Highlights */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.5px', marginBottom: '6px' }}>
                  Key Highlights:
                </div>
                <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  {project.keyHighlights.slice(0, 3).map((item, i) => (
                    <li key={i} style={{ marginBottom: '4px' }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              {/* Tech Stack Chips */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px' }}>
                {project.techStack.map((tech, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: '11.5px',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      background: 'var(--glass-bg-light)',
                      border: '1px solid var(--glass-border)',
                      color: 'var(--text-main)',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Links */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    flex: 1,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid var(--glass-border)',
                    color: '#ffffff',
                    fontSize: '13px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'background 0.2s ease',
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                  Source Code
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
