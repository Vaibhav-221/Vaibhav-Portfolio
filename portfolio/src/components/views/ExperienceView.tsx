'use client';

import React from 'react';
import { experienceData, achievementsData } from '@/data/portfolioData';

export default function ExperienceView() {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 700, margin: 0 }}>Experience &amp; Leadership</h2>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
          Open-source contributions, distributed software engineering, and technical leadership milestones.
        </p>
      </div>

      {/* Connected Timeline */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', position: 'relative', marginBottom: '40px' }}>
        {/* Timeline line */}
        <div
          style={{
            position: 'absolute',
            left: '19px',
            top: '20px',
            bottom: '20px',
            width: '2px',
            background: 'var(--glass-border)',
          }}
        />

        {experienceData.map((exp) => (
          <div key={exp.id} style={{ position: 'relative', paddingLeft: '50px' }}>
            {/* Timeline Dot */}
            <div
              style={{
                position: 'absolute',
                left: '13px',
                top: '6px',
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                background: exp.color,
                boxShadow: `0 0 0 4px ${exp.color}30`,
              }}
            />

            <div
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
                          background: `${exp.color}18`,
                          color: exp.color,
                          border: `1px solid ${exp.color}40`,
                        }}
                      >
                        {exp.statusTag}
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: 600, color: exp.color }}>
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px' }}>
          {achievementsData.map((item, idx) => (
            <div
              key={idx}
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
                      color: item.color,
                      background: `${item.color}15`,
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
                <div style={{ fontSize: '12px', color: '#0a84ff', fontWeight: 600, marginBottom: '8px' }}>
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
  );
}
