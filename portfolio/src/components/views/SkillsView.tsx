'use client';

import React from 'react';

const coreSkills = [
  { name: 'Web Development', percentage: 80, gradient: 'linear-gradient(90deg, #0a84ff, #00d2ff)' },
  { name: 'Content Writing', percentage: 70, gradient: 'linear-gradient(90deg, #ff375f, #ff7e5f)' },
  { name: 'App Development', percentage: 75, gradient: 'linear-gradient(90deg, #30d158, #34e89e)' },
  { name: 'Canva, Figma', percentage: 70, gradient: 'linear-gradient(90deg, #bf5af2, #e0c3fc)' },
];

const technologies = [
  'Hosting',
  'Laravel',
  'Python',
  'C',
  'C++',
  'Java',
  'OOPs',
  'Linux',
  'Next.js',
  'React',
  'TypeScript',
  'Tailwind CSS',
  'REST APIs',
  'Firebase',
  'MySQL',
  'Git / GitHub',
];

export default function SkillsView() {
  return (
    <div>
      <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '30px' }}>My Skills</h2>

      <div style={{ display: 'flex', gap: '50px', flexWrap: 'wrap' }}>
        {/* Core Skills (Progress Bars) */}
        <div style={{ flex: 1.5, minWidth: '280px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '24px', color: 'var(--text-main)' }}>
            Core Expertise
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {coreSkills.map((skill, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontWeight: 500, fontSize: '15px' }}>{skill.name}</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>{skill.percentage}%</span>
                </div>
                <div
                  style={{
                    height: '8px',
                    background: 'var(--glass-bg-light)',
                    borderRadius: '4px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${skill.percentage}%`,
                      height: '100%',
                      background: skill.gradient,
                      borderRadius: '4px',
                      transition: 'width 1s ease-in-out',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Other Skills (Tags) */}
        <div style={{ flex: 1, minWidth: '250px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '24px', color: 'var(--text-main)' }}>
            Technologies &amp; Tools
          </h3>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {technologies.map((tech, idx) => (
              <span
                key={idx}
                style={{
                  padding: '10px 18px',
                  background: 'var(--glass-bg)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: 500,
                  transition: 'background 0.2s, transform 0.15s',
                  cursor: 'default',
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

