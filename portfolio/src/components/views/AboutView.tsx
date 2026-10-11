'use client';

import React, { useEffect, useRef } from 'react';
import { personalInfo, impactMetrics, achievementsData, skillCategoriesData } from '@/data/portfolioData';
import './AboutView.css';

export default function AboutView() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Setup scroll-triggered reveals using IntersectionObserver
  useEffect(() => {
    const currentContainer = containerRef.current;
    if (!currentContainer) return;

    const scrollParent = currentContainer.closest('.page-content') as HTMLElement | null;
    const revealElements = currentContainer.querySelectorAll('.about-v-reveal-item');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: scrollParent,
        rootMargin: '0px',
        threshold: 0.02,
      }
    );

    revealElements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  const terminalRows = [
    { label: 'LOCATION', value: personalInfo.location },
    { label: 'STATUS', value: 'Open to product and engineering roles' },
    { label: 'EDUCATION', value: `${personalInfo.department} · ${personalInfo.institution}` },
    { label: 'GRAD', value: 'May 2029 (Expected)' },
    { label: 'STACK', value: 'Next.js · React · FastAPI · Node.js · Firebase' },
    { label: 'FOCUS', value: 'Student platforms · open source · applied AI' },
  ];

  const journeyItems = [
    {
      period: '2025–2029',
      title: 'B.Tech in Computer Science & Engineering',
      detail: `${personalInfo.institution} · CGPA ${personalInfo.cgpa}`,
    },
    ...achievementsData.map((item) => ({
      period: item.title.includes('2026') || item.title.includes("'26") ? '2026' : 'BUILD LOG',
      title: item.title,
      detail: `${item.badge} · ${item.organization}. ${item.detail}`,
    })),
  ];

  return (
    <div ref={containerRef} className="about-v-container" id="about-page-view">
      <div className="about-v-content">
        <section className="about-sheet about-sheet-profile" aria-labelledby="about-profile-title">
          <div className="about-sheet-kicker about-v-reveal-item">
            <span>01 — ABOUT</span>
            <span className="about-v-status-pill"><span className="about-v-pulsing-dot" /> Open to engineering roles</span>
          </div>

          <div className="about-sheet-profile-grid">
            <div className="about-sheet-story">
              <h1 className="about-sheet-editorial-title" id="about-profile-title">
                <span className="about-v-reveal-mask"><span className="about-v-reveal-text" style={{ animationDelay: '0.12s' }}>I don&apos;t just write code.</span></span>
                <span className="about-v-reveal-mask"><span className="about-v-reveal-text" style={{ animationDelay: '0.26s' }}><span className="about-v-gradient-accent">I build systems</span></span></span>
                <span className="about-v-reveal-mask"><span className="about-v-reveal-text" style={{ animationDelay: '0.4s' }}>that solve real problems.</span></span>
              </h1>
              <div className="about-sheet-story-copy">
                <p className="about-sheet-prose about-v-reveal-item">
                  I&apos;m {personalInfo.name}, a full-stack developer and open-source contributor studying Computer Science and Engineering at {personalInfo.institution}. I build with Next.js, React, FastAPI, Node.js, and Firebase.
                </p>
                <p className="about-sheet-prose about-v-reveal-item">
                  My work centers on student-first platforms, dependable APIs, and interfaces that make complex tasks straightforward. I care about the system beneath the screen as much as the experience above it.
                </p>
              </div>
            </div>

            <aside className="about-sheet-terminal about-v-reveal-item" aria-label="Profile details">
              <div className="about-sheet-terminal-head">
                <span className="about-sheet-terminal-dots" aria-hidden="true"><i /><i /><i /></span>
                <span>vaibhav@portfolio ~ $ profile</span>
              </div>
              <dl className="about-sheet-terminal-body">
                {terminalRows.map((row) => (
                  <div className="about-sheet-terminal-row" key={row.label}>
                    <dt>{row.label}</dt>
                    <dd>{row.value}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>

          <div className="about-sheet-scroll-cue" aria-hidden="true"><span /> Scroll to explore</div>
        </section>

        <section className="about-sheet about-sheet-impact" aria-labelledby="about-impact-title">
          <div className="about-sheet-section-intro about-v-reveal-item">
            <span className="about-sheet-kicker-label">02 — MEASURED IMPACT</span>
            <h2 className="about-sheet-section-title" id="about-impact-title">Work should leave <em>evidence.</em></h2>
          </div>
          <div className="about-sheet-impact-grid">
            {impactMetrics.map((item) => (
              <article className="about-sheet-impact-item about-v-reveal-item" key={item.id}>
                <span className="about-sheet-impact-index">{item.id}</span>
                <strong>{item.value}</strong>
                <span className="about-sheet-impact-label">{item.label}</span>
                <span className="about-sheet-impact-detail">{item.sublabel}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="about-sheet about-sheet-matrix" aria-labelledby="about-matrix-title">
          <div className="about-sheet-section-intro about-v-reveal-item">
            <span className="about-sheet-kicker-label">03 — SYSTEM INTELLIGENCE</span>
            <h2 className="about-sheet-matrix-title" id="about-matrix-title">TECHNICAL<br />MATRIX<span>.</span></h2>
            <p className="about-sheet-section-copy">The tools I use to move an idea from interface to production.</p>
          </div>
          <div className="about-sheet-matrix-grid">
            {skillCategoriesData.map((category, index) => (
              <article className="about-sheet-matrix-group about-v-reveal-item" key={category.categoryName}>
                <span className="about-sheet-matrix-index">{String(index + 1).padStart(2, '0')}</span>
                <h3>{category.categoryName}</h3>
                <ul>
                  {category.skills.map((skill) => (
                    <li className={skill.highlight ? 'is-highlighted' : ''} key={skill.name}>{skill.name}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="about-sheet about-sheet-journey" aria-labelledby="about-journey-title">
          <div className="about-sheet-section-intro about-v-reveal-item">
            <span className="about-sheet-kicker-label">04 — THE JOURNEY</span>
            <h2 className="about-sheet-matrix-title" id="about-journey-title">HOW I GOT<br />HERE<span>.</span></h2>
          </div>
          <div className="about-sheet-timeline">
            {journeyItems.map((item, index) => (
              <article className="about-sheet-timeline-item about-v-reveal-item" key={`${item.period}-${item.title}`}>
                <span className="about-sheet-timeline-index">{String(index + 1).padStart(2, '0')}</span>
                <span className="about-sheet-timeline-period">{item.period}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="about-sheet about-sheet-closing" aria-labelledby="about-closing-title">
          <span className="about-sheet-kicker-label about-v-reveal-item">05 — LET&apos;S TALK</span>
          <h2 className="about-sheet-closing-title about-v-reveal-item" id="about-closing-title">LET&apos;S BUILD<br />SOMETHING <span>USEFUL.</span></h2>
          <p className="about-sheet-closing-copy about-v-reveal-item">For thoughtful products, practical systems, and teams that care about the details.</p>
          <a className="about-sheet-contact-link about-v-reveal-item" href={`mailto:${personalInfo.email}`}>Start a conversation <span aria-hidden="true">-&gt;</span></a>
        </section>
      </div>
    </div>
  );
}
