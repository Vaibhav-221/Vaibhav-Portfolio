'use client';

import React from 'react';
import { personalInfo, impactMetrics, achievementsData } from '@/data/portfolioData';

export default function AboutView() {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '32px', fontWeight: 700, margin: 0 }}>About Me</h2>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
            {personalInfo.tagline} • {personalInfo.location}
          </p>
        </div>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            background: 'rgba(197, 255, 65, 0.1)',
            border: '1px solid rgba(197, 255, 65, 0.3)',
            borderRadius: '20px',
            color: '#c5ff41',
            fontSize: '13px',
            fontWeight: 600,
          }}
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#c5ff41',
              boxShadow: '0 0 8px #c5ff41',
            }}
          />
          Open for SDE Internships &amp; Roles
        </div>
      </div>

      {/* Metrics Row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px',
          marginBottom: '28px',
        }}
      >
        {impactMetrics.map((item) => (
          <div
            key={item.id}
            style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              borderRadius: '16px',
              padding: '18px 20px',
              transition: 'transform 0.2s, border-color 0.2s',
            }}
          >
            <div style={{ fontSize: '26px', fontWeight: 700, color: item.accent, fontFamily: 'var(--font-oswald)', marginBottom: '4px' }}>
              {item.value}
            </div>
            <div style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '2px' }}>
              {item.label}
            </div>
            <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', lineHeight: 1.4 }}>
              {item.sublabel}
            </div>
          </div>
        ))}
      </div>

      {/* Primary Bio Card */}
      <div
        style={{
          background: 'var(--glass-bg)',
          border: '1px solid var(--glass-border)',
          borderRadius: '20px',
          padding: '28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          marginBottom: '30px',
        }}
      >
        <h3 style={{ fontSize: '18px', fontWeight: 600, margin: 0, color: '#0a84ff', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
          My Background &amp; Engineering Philosophy
        </h3>

        {personalInfo.bioParagraphs.map((paragraph, index) => (
          <p
            key={index}
            style={{
              fontSize: '15px',
              lineHeight: 1.75,
              color: 'var(--text-main)',
              margin: 0,
            }}
          >
            {paragraph}
          </p>
        ))}
      </div>

      {/* Education & Academic Journey */}
      <div
        style={{
          background: 'var(--glass-bg)',
          border: '1px solid var(--glass-border)',
          borderRadius: '20px',
          padding: '28px',
          marginBottom: '30px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, margin: 0, color: '#bf5af2', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
            Academic Profile
          </h3>
          <span
            style={{
              fontSize: '13px',
              fontWeight: 600,
              padding: '4px 12px',
              borderRadius: '12px',
              background: 'rgba(191, 90, 242, 0.15)',
              color: '#bf5af2',
            }}
          >
            CGPA: {personalInfo.cgpa} / 10.0
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ fontSize: '17px', fontWeight: 600, color: 'var(--text-main)' }}>
            Bachelor of Technology (B.Tech) — {personalInfo.department}
          </div>
          <div style={{ fontSize: '14.5px', color: '#0a84ff', fontWeight: 500 }}>
            {personalInfo.institution}
          </div>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Duration: Aug 2025 – May 2029 (Expected) • Full-Time
          </div>
          <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--text-muted)', marginTop: '8px', margin: 0 }}>
            Focusing on Distributed Systems, Algorithms, Object-Oriented Software Design, Web Architectures, and Database Systems.
          </p>
        </div>
      </div>

      {/* What I Do - Pillars */}
      <div>
        <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '20px' }}>Core Engineering Domains</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          <div
            style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              borderRadius: '16px',
              padding: '24px',
            }}
          >
            <h4 style={{ fontSize: '17px', fontWeight: 600, margin: '0 0 8px 0', color: '#0a84ff' }}>Full Stack &amp; Next.js</h4>
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--text-muted)', margin: 0 }}>
              Engineering performant React and Next.js App Router applications with Server Actions, REST APIs, and responsive design systems.
            </p>
          </div>

          <div
            style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              borderRadius: '16px',
              padding: '24px',
            }}
          >
            <h4 style={{ fontSize: '17px', fontWeight: 600, margin: '0 0 8px 0', color: '#ff9f0a' }}>Open Source &amp; Systems</h4>
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--text-muted)', margin: 0 }}>
              Active contributor in nationwide open source initiatives (GSSoC Top 1%), writing modular, tested code with Git &amp; CI/CD workflows.
            </p>
          </div>

          <div
            style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              borderRadius: '16px',
              padding: '24px',
            }}
          >
            <h4 style={{ fontSize: '17px', fontWeight: 600, margin: '0 0 8px 0', color: '#c5ff41' }}>AI &amp; Vector Search</h4>
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--text-muted)', margin: 0 }}>
              Building RAG pipelines and intelligent assessment tools leveraging FastAPI, Gemini 1.5, LangChain, and ChromaDB vector stores.
            </p>
          </div>
        </div>
      </div>

      {/* Hackathons & Honors Preview */}
      <div style={{ marginTop: '32px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '20px' }}>Key Hackathons &amp; Honors</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          {achievementsData.slice(0, 3).map((item, idx) => (
            <div
              key={idx}
              style={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                borderRadius: '16px',
                padding: '20px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
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
              <h4 style={{ fontSize: '15.5px', fontWeight: 600, margin: '0 0 4px 0', color: 'var(--text-main)' }}>
                {item.title}
              </h4>
              <p style={{ fontSize: '13px', lineHeight: 1.5, color: 'var(--text-muted)', margin: 0 }}>
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
