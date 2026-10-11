'use client';

import React, { useEffect, useRef } from 'react';
import { personalInfo, impactMetrics, achievementsData } from '@/data/portfolioData';
import './AboutView.css';

export default function AboutView() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Setup scroll-triggered reveals using IntersectionObserver
  useEffect(() => {
    // If reduced motion is preferred, reveal all immediately
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const items = containerRef.current?.querySelectorAll('.about-v-reveal-item');
      items?.forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    const currentContainer = containerRef.current;
    if (!currentContainer) return;

    // Find the scrollable ancestor (either .page-content or the window)
    const scrollParent = currentContainer.closest('.page-content') || null;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
          }
        });
      },
      {
        root: scrollParent,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.08,
      }
    );

    const revealElements = currentContainer.querySelectorAll('.about-v-reveal-item');
    revealElements.forEach((el) => observer.observe(el));

    // Fallback safeguard: Reveal all elements after a short timeout so content is never hidden
    const timer = setTimeout(() => {
      revealElements.forEach((el) => el.classList.add('is-revealed'));
    }, 450);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="about-v-container" id="about-page-view">
      {/* Decorative ambient lighting - non-interactive depth layers */}
      <div className="about-v-glow-top" aria-hidden="true" />
      <div className="about-v-glow-bottom" aria-hidden="true" />

      <div className="about-v-content">
        {/* ====================================================================
            Hero Header & Expressive Headings (References A & B Inspired)
            ==================================================================== */}
        <header className="about-v-hero-header">
          {/* Eyebrow metadata & Live status badge */}
          <div className="about-v-eyebrow-row">
            <div className="about-v-eyebrow-tag">
              <span style={{ color: '#c5ff41' }}>{'//'}</span> 01 · VAIBHAV SINGH · PHILOSOPHY &amp; PROFILE
            </div>

            <div className="about-v-status-pill">
              <span className="about-v-pulsing-dot" />
              Open for SDE Roles &amp; Internships
            </div>
          </div>

          {/* Oversized Mask-Revealed Headline */}
          <h1 className="about-v-headline">
            <span className="about-v-reveal-mask">
              <span className="about-v-reveal-text" style={{ animationDelay: '0.08s' }}>
                Architecting High-Impact
              </span>
            </span>
            <span className="about-v-reveal-mask">
              <span className="about-v-reveal-text" style={{ animationDelay: '0.2s' }}>
                <span className="about-v-gradient-accent">Web Systems</span> &amp; AI Workflows
              </span>
            </span>
            <span className="about-v-reveal-mask">
              <span className="about-v-reveal-text" style={{ animationDelay: '0.32s' }}>
                With Real-World Scale.
              </span>
            </span>
          </h1>

          {/* Subtitle / Executive Summary */}
          <p className="about-v-hero-subtitle">
            Full Stack Engineer &amp; Open Source Contributor pursuing B.Tech in CSE (CGPA {personalInfo.cgpa}).
            Ranked Top 1% nationwide in GSSoC &apos;26 and creator of platforms serving 500+ active students.
            Focused on high-performance React architectures, FastAPI microservices, and Retrieval-Augmented Generation (RAG).
          </p>
        </header>

        {/* ====================================================================
            Section 02: Measurable Impact Metrics (Interactive Counter Cards)
            ==================================================================== */}
        <section className="about-v-section-block about-v-reveal-item" style={{ transitionDelay: '0.1s' }}>
          <div className="about-v-section-header">
            <span className="about-v-section-label">02 {'//'} IMPACT &amp; METRICS</span>
            <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.45)' }}>Verified Outcomes</span>
          </div>

          <div className="about-v-metrics-grid">
            {impactMetrics.map((item, idx) => (
              <div
                key={item.id}
                className="about-v-glass-card"
                style={{ transitionDelay: `${idx * 0.06}s` }}
              >
                <div
                  className="about-v-card-accent-bar"
                  style={{ backgroundColor: item.accent }}
                />
                <div className="about-v-metric-value" style={{ color: item.accent }}>
                  {item.value}
                </div>
                <div className="about-v-metric-label">{item.label}</div>
                <div className="about-v-metric-sublabel">{item.sublabel}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ====================================================================
            Section 03: Narrative Bio & Engineering Philosophy
            ==================================================================== */}
        <section className="about-v-section-block about-v-reveal-item" style={{ transitionDelay: '0.15s' }}>
          <div className="about-v-section-header">
            <span className="about-v-section-label">03 {'//'} BIOGRAPHY &amp; VISION</span>
            <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.45)' }}>In-Depth Background</span>
          </div>

          <div className="about-v-bio-lead-card">
            <div
              className="about-v-card-accent-bar"
              style={{ backgroundColor: '#38bdf8' }}
            />
            <h2 className="about-v-section-heading" style={{ color: '#38bdf8', fontSize: '20px' }}>
              My Background &amp; Engineering Philosophy
            </h2>

            {personalInfo.bioParagraphs.map((paragraph, index) => (
              <p key={index} className="about-v-bio-paragraph">
                {index === 0 && (
                  <>
                    Hi, I&apos;m <strong>{personalInfo.name}</strong>, a passionate{' '}
                    <span className="about-v-bio-highlight">Full Stack Developer</span> and{' '}
                    <span className="about-v-bio-highlight">Open Source Contributor</span> pursuing B.Tech in Computer
                    Science and Engineering at {personalInfo.institution} (<strong>CGPA {personalInfo.cgpa}</strong>).
                  </>
                )}
                {index === 1 && (
                  <>
                    I specialize in engineering high-impact, real-time web architectures and AI-driven workflows using{' '}
                    <strong>Next.js, React, FastAPI, Node.js, and Firebase</strong>. From university platforms serving
                    hundreds of active students to micro-funding platforms and generative AI assessment engines, I focus
                    on delivering <strong>scalable, bulletproof software with delightful user experience</strong>.
                  </>
                )}
                {index === 2 && (
                  <>
                    Recognized in the <span className="about-v-bio-highlight">top 1% nationwide</span> among 50,000+
                    contributors in GirlScript Summer of Code (GSSoC &apos;26), I thrive in collaborative environments
                    where performance, accessibility, and clean component systems meet creative interaction design.
                  </>
                )}
              </p>
            ))}

            <div className="about-v-bio-quote">
              &ldquo;Great software isn&apos;t just about writing code that compiles—it&apos;s about designing resilient
              systems that solve authentic user problems with speed, elegance, and zero friction.&rdquo;
            </div>
          </div>
        </section>

        {/* ====================================================================
            Section 04: Academic Profile & University Rigor
            ==================================================================== */}
        <section className="about-v-section-block about-v-reveal-item" style={{ transitionDelay: '0.2s' }}>
          <div className="about-v-section-header">
            <span className="about-v-section-label">04 {'//'} ACADEMIC PROFILE</span>
            <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.45)' }}>Foundational CS</span>
          </div>

          <div className="about-v-academic-card">
            <div
              className="about-v-card-accent-bar"
              style={{ backgroundColor: '#bf5af2' }}
            />
            <div className="about-v-academic-header">
              <div>
                <h3 className="about-v-degree-title">
                  Bachelor of Technology (B.Tech) — {personalInfo.department}
                </h3>
                <p className="about-v-institution-name">{personalInfo.institution}</p>
              </div>

              <div className="about-v-cgpa-badge">
                CGPA: {personalInfo.cgpa} / 10.0
              </div>
            </div>

            <div className="about-v-academic-meta">
              Duration: Aug 2025 – May 2029 (Expected) • Full-Time Degree • Focus on Core Engineering &amp; Systems
            </div>

            <div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(255, 255, 255, 0.6)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Key Coursework &amp; Theoretical Foundations:
              </div>
              <div className="about-v-coursework-tags">
                {[
                  'Data Structures & Algorithms',
                  'Distributed Systems',
                  'Object-Oriented Software Design',
                  'Database Management (SQL/NoSQL)',
                  'Web Architectures & Protocols',
                  'Operating Systems',
                  'Computer Networks',
                ].map((course, idx) => (
                  <span key={idx} className="about-v-course-tag">
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ====================================================================
            Section 05: Core Engineering Domains (Pillars)
            ==================================================================== */}
        <section className="about-v-section-block about-v-reveal-item" style={{ transitionDelay: '0.25s' }}>
          <div className="about-v-section-header">
            <span className="about-v-section-label">05 {'//'} CORE DISCIPLINES &amp; ARCHITECTURES</span>
            <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.45)' }}>Technical Focus</span>
          </div>

          <div className="about-v-pillars-grid">
            <div className="about-v-pillar-card">
              <div className="about-v-card-accent-bar" style={{ backgroundColor: '#38bdf8' }} />
              <div className="about-v-pillar-header">
                <div className="about-v-pillar-icon" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>
                  ⚡
                </div>
                <h3 className="about-v-pillar-title" style={{ color: '#38bdf8' }}>
                  Full Stack &amp; Next.js
                </h3>
              </div>
              <p className="about-v-pillar-desc">
                Architecting performant Next.js App Router applications with Server Actions, REST APIs, TypeScript, and fluid responsive design systems.
              </p>
            </div>

            <div className="about-v-pillar-card">
              <div className="about-v-card-accent-bar" style={{ backgroundColor: '#ff9f0a' }} />
              <div className="about-v-pillar-header">
                <div className="about-v-pillar-icon" style={{ background: 'rgba(255, 159, 10, 0.15)', color: '#ff9f0a' }}>
                  🌐
                </div>
                <h3 className="about-v-pillar-title" style={{ color: '#ff9f0a' }}>
                  Open Source &amp; Systems
                </h3>
              </div>
              <p className="about-v-pillar-desc">
                Ranked Top 1% in nationwide open source (GSSoC), delivering modular, well-tested code with Git, CI/CD, and Agile team sprint leadership.
              </p>
            </div>

            <div className="about-v-pillar-card">
              <div className="about-v-card-accent-bar" style={{ backgroundColor: '#c5ff41' }} />
              <div className="about-v-pillar-header">
                <div className="about-v-pillar-icon" style={{ background: 'rgba(197, 255, 65, 0.15)', color: '#c5ff41' }}>
                  🧠
                </div>
                <h3 className="about-v-pillar-title" style={{ color: '#c5ff41' }}>
                  AI &amp; Vector Search
                </h3>
              </div>
              <p className="about-v-pillar-desc">
                Developing RAG pipelines and intelligent assessment platforms using FastAPI, Google Gemini API, LangChain, and ChromaDB vector stores.
              </p>
            </div>
          </div>
        </section>

        {/* ====================================================================
            Section 06: Key Hackathons & Honors Preview
            ==================================================================== */}
        <section className="about-v-section-block about-v-reveal-item" style={{ transitionDelay: '0.3s' }}>
          <div className="about-v-section-header">
            <span className="about-v-section-label">06 {'//'} HONORS &amp; RECOGNITION</span>
            <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.45)' }}>Competitive Milestones</span>
          </div>

          <div className="about-v-honors-grid">
            {achievementsData.map((item, idx) => (
              <div key={idx} className="about-v-honor-card">
                <div className="about-v-card-accent-bar" style={{ backgroundColor: item.color }} />
                <span
                  className="about-v-honor-badge"
                  style={{
                    color: item.color,
                    background: `${item.color}18`,
                    border: `1px solid ${item.color}35`,
                  }}
                >
                  {item.badge}
                </span>

                <h4 className="about-v-honor-title">{item.title}</h4>
                <div className="about-v-honor-org">{item.organization}</div>
                <p className="about-v-honor-detail">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
