'use client';

import React from 'react';
import { experienceData, achievementsData } from '@/data/portfolioData';
import PortfolioPage from './PortfolioPage';

export default function ExperienceView() {
  return (
    <PortfolioPage
      className="portfolio-page-experience"
      eyebrow="THE JOURNEY"
      title="Work that moves forward."
      description="A record of the teams, contributions, and milestones behind the work."
    >
      <div className="portfolio-view-content experience-view-content">
        <section className="portfolio-experience-timeline" aria-label="Work and open-source experience">
          <div className="portfolio-experience-line" aria-hidden="true" />

          {experienceData.map((exp, index) => (
            <article key={exp.id} className="portfolio-experience-entry portfolio-reveal">
              <span className="portfolio-experience-marker" aria-hidden="true" />

              <div className="portfolio-card experience-card">
                <header className="experience-card-header">
                  <div className="experience-card-heading">
                    <span className="experience-card-index">EXPERIENCE / {String(index + 1).padStart(2, '0')}</span>
                    <h2 className="experience-card-title">{exp.role}</h2>
                    <p className="experience-card-organization">{exp.company}</p>
                    <span className="experience-card-type">{exp.type}</span>
                  </div>

                  <div className="experience-card-meta">
                    <span className="experience-card-period">{exp.period}</span>
                    {exp.statusTag && <span className="experience-card-status">{exp.statusTag}</span>}
                  </div>
                </header>

                <p className="experience-card-summary">{exp.description}</p>

                <div className="experience-card-impact">
                  <h3 className="experience-card-label">Selected impact</h3>
                  <ul className="experience-impact-list">
                    {exp.achievements.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>

                <footer className="experience-card-footer">
                  <span className="experience-card-label">Tools &amp; practice</span>
                  <div className="experience-skill-list">
                    {exp.skills.map((skill) => <span className="experience-skill" key={skill}>{skill}</span>)}
                  </div>
                </footer>
              </div>
            </article>
          ))}
        </section>

        <section className="experience-recognition" aria-labelledby="experience-recognition-title">
          <header className="experience-recognition-header portfolio-reveal">
            <span className="experience-section-eyebrow">RECOGNITION / BUILD LOG</span>
            <h2 className="experience-recognition-title" id="experience-recognition-title">Milestones beyond the role.</h2>
            <p className="experience-recognition-description">
              Hackathon selections, community recognition, and a steady practice of sharing the build.
            </p>
          </header>

          <div className="portfolio-card-grid experience-recognition-grid">
            {achievementsData.map((item, index) => (
              <article
                key={item.title}
                className="portfolio-card portfolio-reveal experience-recognition-card"
              >
                <div className="experience-recognition-topline">
                  <span className="experience-recognition-index">{String(index + 1).padStart(2, '0')}</span>
                  <span className="experience-recognition-badge">{item.badge}</span>
                </div>
                <p className="experience-recognition-organization">{item.organization}</p>
                <h3 className="experience-recognition-name">{item.title}</h3>
                <p className="experience-recognition-detail">{item.detail}</p>
                <span className="experience-recognition-rule" aria-hidden="true" />
              </article>
            ))}
          </div>
        </section>
      </div>
    </PortfolioPage>
  );
}
