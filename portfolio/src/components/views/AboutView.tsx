'use client';

import React, { useEffect, useRef } from 'react';
import { personalInfo, impactMetrics, achievementsData } from '@/data/portfolioData';
import './AboutView.css';

export default function AboutView() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Setup scroll-triggered reveals using IntersectionObserver
  useEffect(() => {
    const currentContainer = containerRef.current;
    if (!currentContainer) return;

    const scrollParent = currentContainer.closest('.page-content') as HTMLElement | null;
    const revealElements = currentContainer.querySelectorAll('.about-v-reveal-item');

    const updateScrollProgress = () => {
      if (!scrollParent) return;
      const maxScroll = Math.max(scrollParent.scrollHeight - scrollParent.clientHeight, 1);
      const progress = maxScroll > 0 ? scrollParent.scrollTop / maxScroll : 0;
      currentContainer.style.setProperty('--about-scroll', progress.toFixed(4));
    };

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
        rootMargin: '0px 0px -42px 0px',
        threshold: 0.12,
      }
    );

    revealElements.forEach((el) => observer.observe(el));

    updateScrollProgress();
    scrollParent?.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', updateScrollProgress);

    return () => {
      observer.disconnect();
      scrollParent?.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', updateScrollProgress);
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
              <span>{'//'}</span> 01 · VAIBHAV SINGH · FULL-STACK DEVELOPER
            </div>

            <div className="about-v-status-pill">
              <span className="about-v-pulsing-dot" />
              Available for product &amp; engineering roles
            </div>
          </div>

          {/* Oversized Mask-Revealed Headline */}
          <h1 className="about-v-headline">
            <span className="about-v-reveal-mask">
              <span className="about-v-reveal-text" style={{ animationDelay: '0.08s' }}>
                Crafting
              </span>
            </span>
            <span className="about-v-reveal-mask">
              <span className="about-v-reveal-text" style={{ animationDelay: '0.2s' }}>
                <span className="about-v-gradient-accent">full-stack</span> solutions
              </span>
            </span>
            <span className="about-v-reveal-mask">
              <span className="about-v-reveal-text" style={{ animationDelay: '0.32s' }}>
                for real users.
              </span>
            </span>
          </h1>

          {/* Subtitle / Executive Summary */}
          <p className="about-v-hero-subtitle">
            Full Stack Developer and Open Source Contributor pursuing B.Tech in Computer Science and Engineering at
            Veer Bahadur Singh Purvanchal University. I enjoy building practical web products, clean interfaces,
            and reliable backend systems that make real work easier for real people.
          </p>
        </header>

        {/* ====================================================================
            Section 02: Measurable Impact Metrics (Interactive Counter Cards)
            ==================================================================== */}
        <section className="about-v-section-block">
          <div className="about-v-section-header about-v-reveal-item">
            <span className="about-v-section-label">02 {'//'} IMPACT &amp; METRICS</span>
            <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.45)' }}>Verified Outcomes</span>
          </div>

          <div className="about-v-metrics-grid">
            {impactMetrics.map((item) => (
              <div
                key={item.id}
                className="about-v-glass-card about-v-reveal-item"
              >
                <div className="about-v-card-accent-bar" />
                <div className="about-v-metric-value">{item.value}</div>
                <div className="about-v-metric-label">{item.label}</div>
                <div className="about-v-metric-sublabel">{item.sublabel}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ====================================================================
            Section 03: Narrative Bio & Engineering Philosophy
            ==================================================================== */}
        <section className="about-v-section-block">
          <div className="about-v-section-header about-v-reveal-item">
            <span className="about-v-section-label">03 {'//'} BIOGRAPHY &amp; VISION</span>
            <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.45)' }}>In-Depth Background</span>
          </div>

          <div className="about-v-bio-lead-card about-v-reveal-item">
            <div className="about-v-card-accent-bar" />
            <h2 className="about-v-section-heading about-v-inline-heading">
              My Background &amp; Engineering Philosophy
            </h2>

            {personalInfo.bioParagraphs.map((paragraph, index) => (
              <p key={index} className="about-v-bio-paragraph">
                {index === 0 && (
                  <>
                    Hi, I&apos;m <strong>{personalInfo.name}</strong>, a{' '}
                    <span className="about-v-bio-highlight">Full Stack Developer</span> and{' '}
                    <span className="about-v-bio-highlight">Open Source Contributor</span> pursuing B.Tech in Computer
                    Science and Engineering at {personalInfo.institution} (<strong>CGPA {personalInfo.cgpa}</strong>).
                  </>
                )}
                {index === 1 && (
                  <>
                    I enjoy turning product ideas into usable software—from responsive frontends and clean UI systems to
                    backend APIs, database flows, and deployment workflows. My focus is on building maintainable systems
                    that feel smooth for users and reliable for teams.
                  </>
                )}
                {index === 2 && (
                  <>
                    I&apos;ve contributed to open-source work, student-first platforms, and practical projects that solve
                    everyday problems. I&apos;m still learning and exploring AI-assisted workflows, but my core interest remains
                    building solid software with thoughtful engineering and collaboration.
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
        <section className="about-v-section-block">
          <div className="about-v-section-header about-v-reveal-item">
            <span className="about-v-section-label">04 {'//'} ACADEMIC PROFILE</span>
            <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.45)' }}>Foundational CS</span>
          </div>

          <div className="about-v-academic-card about-v-reveal-item">
            <div className="about-v-card-accent-bar" />
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
        <section className="about-v-section-block">
          <div className="about-v-section-header about-v-reveal-item">
            <span className="about-v-section-label">05 {'//'} CORE DISCIPLINES &amp; ARCHITECTURES</span>
            <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.45)' }}>Technical Focus</span>
          </div>

          <div className="about-v-pillars-grid">
            <div className="about-v-pillar-card about-v-reveal-item">
              <div className="about-v-card-accent-bar" />
              <div className="about-v-pillar-header">
                <div className="about-v-pillar-icon">
                  ⚡
                </div>
                <h3 className="about-v-pillar-title">
                  Full Stack &amp; Next.js
                </h3>
              </div>
              <p className="about-v-pillar-desc">
                Architecting performant Next.js App Router applications with Server Actions, REST APIs, TypeScript, and fluid responsive design systems.
              </p>
            </div>

            <div className="about-v-pillar-card about-v-reveal-item">
              <div className="about-v-card-accent-bar" />
              <div className="about-v-pillar-header">
                <div className="about-v-pillar-icon">
                  🌐
                </div>
                <h3 className="about-v-pillar-title">
                  Open Source &amp; Systems
                </h3>
              </div>
              <p className="about-v-pillar-desc">
                Ranked Top 1% in nationwide open source (GSSoC), delivering modular, well-tested code with Git, CI/CD, and Agile team sprint leadership.
              </p>
            </div>

            <div className="about-v-pillar-card about-v-reveal-item">
              <div className="about-v-card-accent-bar" />
              <div className="about-v-pillar-header">
                <div className="about-v-pillar-icon">
                  🧠
                </div>
                <h3 className="about-v-pillar-title">
                  AI &amp; Product Thinking
                </h3>
              </div>
              <p className="about-v-pillar-desc">
                Exploring AI-assisted workflows and prototypes to improve developer productivity, while keeping the core user value, reliability, and usability front and center.
              </p>
            </div>
          </div>
        </section>

        {/* ====================================================================
            Section 06: Key Hackathons & Honors Preview
            ==================================================================== */}
        <section className="about-v-section-block">
          <div className="about-v-section-header about-v-reveal-item">
            <span className="about-v-section-label">06 {'//'} HONORS &amp; RECOGNITION</span>
            <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.45)' }}>Competitive Milestones</span>
          </div>

          <div className="about-v-honors-grid">
            {achievementsData.map((item, idx) => (
              <div
                key={idx}
                className="about-v-honor-card about-v-reveal-item"
              >
                <div className="about-v-card-accent-bar" />
                <span className="about-v-honor-badge">{item.badge}</span>

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
