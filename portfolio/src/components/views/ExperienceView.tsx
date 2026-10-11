'use client';

import React from 'react';
import { experienceData, achievementsData } from '@/data/portfolioData';
import PortfolioPage from './PortfolioPage';

export default function ExperienceView() {
  return (
    <PortfolioPage
      eyebrow="THE JOURNEY"
      title="How I got here."
      description="Open-source contributions, engineering practice, and the milestones that keep moving the work forward."
    >
    <div className="portfolio-view-content">
      {/* Connected Timeline */}
      <div className="portfolio-experience-timeline">
        {/* Timeline line */}
        <div className="portfolio-experience-line" />

        {experienceData.map((exp) => (
          <div key={exp.id} className="portfolio-experience-entry portfolio-reveal">
            {/* Timeline Dot */}
            <div className="portfolio-experience-marker" />

            <div
              className="portfolio-card"
              style={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                padding: '26px',
                borderRadius: '18px',
                transition: 'border-color 0.2s ease',
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '10px',
                  marginBottom: '14px',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '4px' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 700, margin: 0, color: 'var(--text-main)' }}>
                      {exp.role}
                    </h3>
                    {exp.statusTag && (
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: '8px',
                              background: 'var(--portfolio-accent-soft)',
                              color: 'var(--portfolio-accent)',
                              border: '1px solid var(--portfolio-accent-border)',
                        }}
                      >
                        {exp.statusTag}
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--portfolio-accent)' }}>
                    {exp.company} <span style={{ color: 'var(--text-muted)', fontWeight: 400, marginLeft: '6px' }}>• {exp.type}</span>
                  </div>
                </div>

                <div
                  style={{
                    padding: '4px 12px',
                    background: 'var(--glass-bg-light)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '20px',
                    fontSize: '12.5px',
                    fontWeight: 500,
                    color: 'var(--text-muted)',
                  }}
                >
                  {exp.period}
                </div>
              </div>

              {/* Description */}
              <p style={{ fontSize: '14.5px', lineHeight: 1.65, color: 'var(--text-main)', margin: '0 0 16px 0' }}>
                {exp.description}
              </p>

              {/* Achievements Bullet Points */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.6px', marginBottom: '8px' }}>
                  Key Impact &amp; Contributions:
                </div>
                <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13.5px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  {exp.achievements.map((item, i) => (
                    <li key={i} style={{ marginBottom: '6px' }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Skills Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {exp.skills.map((s, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: '11.5px',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      background: 'var(--glass-bg-light)',
                      border: '1px solid var(--glass-border)',
                      color: 'var(--text-main)',
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Honors & Hackathon Achievements Grid */}
      <div>
        <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '20px' }}>Recognitions &amp; Hackathons</h3>
        <div className="portfolio-card-grid">
          {achievementsData.map((item, idx) => (
            <div
              key={idx}
              className="portfolio-card portfolio-reveal"
              style={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                borderRadius: '16px',
                padding: '22px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      color: 'var(--portfolio-accent)',
                      background: 'var(--portfolio-accent-soft)',
                      padding: '3px 8px',
                      borderRadius: '8px',
                    }}
                  >
                    {item.badge}
                  </span>
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 6px 0', color: 'var(--text-main)' }}>
                  {item.title}
                </h4>
                <div style={{ fontSize: '12px', color: 'var(--portfolio-accent)', fontWeight: 600, marginBottom: '8px' }}>
                  {item.organization}
                </div>
                <p style={{ fontSize: '13px', lineHeight: 1.5, color: 'var(--text-muted)', margin: 0 }}>
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </PortfolioPage>
  );
}
