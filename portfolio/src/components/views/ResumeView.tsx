'use client';

import React from 'react';
import { personalInfo, experienceData, projectsData, achievementsData } from '@/data/portfolioData';

export default function ResumeView() {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = personalInfo.resumeUrl;
    link.download = personalInfo.resumeFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <h2 style={{ fontSize: '32px', fontWeight: 700, margin: 0 }}>Resume</h2>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
            Verified curriculum vitae, professional history, and project portfolio.
          </p>
        </div>

        <button
          onClick={handleDownload}
          style={{
            padding: '12px 22px',
            background: 'linear-gradient(135deg, #0a84ff 0%, #0070f3 100%)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '12px',
            fontWeight: 600,
            fontSize: '14px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(10, 132, 255, 0.35)',
            transition: 'transform 0.15s ease, box-shadow 0.15s ease',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download PDF Resume
        </button>
      </div>

      {/* Resume Document Content Box */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '28px',
          padding: '32px',
          background: 'var(--glass-bg)',
          border: '1px solid var(--glass-border)',
          borderRadius: '20px',
        }}
      >
        {/* Header Section */}
        <div style={{ textAlign: 'center', borderBottom: '1px solid var(--glass-border)', paddingBottom: '24px' }}>
          <h1 style={{ fontSize: '32px', margin: '0 0 8px 0', fontWeight: 700, letterSpacing: '0.5px' }}>
            {personalInfo.name.toUpperCase()}
          </h1>
          <div style={{ fontSize: '15px', color: '#0a84ff', fontWeight: 600, marginBottom: '10px' }}>
            {personalInfo.role} • {personalInfo.location}
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '14px',
              flexWrap: 'wrap',
              fontSize: '13.5px',
              color: 'var(--text-main)',
            }}
          >
            <span>{personalInfo.email}</span>
            <span>•</span>
            <span>{personalInfo.phoneDisplay}</span>
            <span>•</span>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              style={{ color: '#c5ff41', textDecoration: 'none' }}
            >
              GitHub: {personalInfo.githubUsername}
            </a>
            <span>•</span>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              style={{ color: '#0a84ff', textDecoration: 'none' }}
            >
              LinkedIn Profile
            </a>
          </div>
        </div>

        {/* Education */}
        <div>
          <h3
            style={{
              fontSize: '16px',
              fontWeight: 700,
              color: '#0a84ff',
              marginBottom: '14px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            Education
          </h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
            <div>
              <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-main)' }}>
                {personalInfo.institution}
              </div>
              <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                Bachelor of Technology (B.Tech) in {personalInfo.department}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '13.5px', fontWeight: 600, color: '#c5ff41' }}>
                CGPA: {personalInfo.cgpa} / 10.0
              </div>
              <div style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>
                Aug 2025 – May 2029
              </div>
            </div>
          </div>
        </div>

        {/* Experience */}
        <div>
          <h3
            style={{
              fontSize: '16px',
              fontWeight: 700,
              color: '#0a84ff',
              marginBottom: '16px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            Work &amp; Open Source Experience
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {experienceData.map((exp) => (
              <div key={exp.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '6px', marginBottom: '6px' }}>
                  <div>
                    <span style={{ fontSize: '15.5px', fontWeight: 600, color: 'var(--text-main)' }}>
                      {exp.role}
                    </span>
                    <span style={{ fontSize: '14px', color: exp.color, fontWeight: 500, marginLeft: '6px' }}>
                      — {exp.company}
                    </span>
                  </div>
                  <span style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>
                    {exp.period}
                  </span>
                </div>
                <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                  {exp.achievements.map((bullet, idx) => (
                    <li key={idx} style={{ marginBottom: '4px' }}>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Key Projects */}
        <div>
          <h3
            style={{
              fontSize: '16px',
              fontWeight: 700,
              color: '#0a84ff',
              marginBottom: '16px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            Featured Projects
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {projectsData.map((proj) => (
              <div key={proj.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '6px', marginBottom: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-main)' }}>
                      {proj.title}
                    </span>
                    <span style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>
                      | {proj.subtitle}
                    </span>
                  </div>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    {proj.timeline}
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: '#c5ff41', fontWeight: 500, marginBottom: '4px' }}>
                  Tech: {proj.techStack.join(' • ')}
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                  {proj.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Honors & Hackathons */}
        <div>
          <h3
            style={{
              fontSize: '16px',
              fontWeight: 700,
              color: '#0a84ff',
              marginBottom: '14px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            Honors &amp; Hackathon Achievements
          </h3>

          <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13.5px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            {achievementsData.map((item, idx) => (
              <li key={idx} style={{ marginBottom: '4px' }}>
                <strong style={{ color: 'var(--text-main)' }}>{item.title}</strong> — {item.badge} ({item.organization}): {item.detail}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
