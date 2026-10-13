'use client';

import React, { useState } from 'react';
import { projectsData, ProjectItem } from '@/data/portfolioData';
import PortfolioPage from './PortfolioPage';

export default function ProjectsView() {
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', 'Full Stack', 'AI & ML'];

  const filteredProjects = projectsData.filter((p) => {
    if (filter === 'All') return true;
    return p.category === filter;
  });

  return (
    <PortfolioPage
      eyebrow="SELECTED WORK"
      title="Built to solve real problems."
      description="Production platforms, open-source systems, and applied AI, designed around real users."
    >
      <div className="portfolio-view-content portfolio-project-view">
        <div className="portfolio-view-toolbar portfolio-reveal">
          <div className="portfolio-filter" role="group" aria-label="Filter projects by category">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                aria-pressed={filter === cat}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="portfolio-project-grid">
          {filteredProjects.map((project: ProjectItem, index) => (
            <article
              key={project.id}
              className="portfolio-card portfolio-project-card portfolio-reveal"
              style={{ '--project-accent': project.color, '--project-wash': project.accentColor } as React.CSSProperties}
            >
              <div className="portfolio-project-visual" aria-hidden="true">
                <span className="portfolio-project-system">Build log / {project.timeline}</span>
                <span className="portfolio-project-monogram">
                  {project.title.split(/\s+/).map((word) => word[0]).join('').slice(0, 2)}
                </span>
                <span className="portfolio-project-visual-index">{String(index + 1).padStart(2, '0')}</span>
                <span className="portfolio-project-visual-category">{project.category}</span>
                <span className="portfolio-project-trace" />
              </div>

              <div className="portfolio-project-content">
                <div className="portfolio-project-heading">
                  <div>
                    <span className="portfolio-project-category">{project.category}</span>
                    <h2>{project.title}</h2>
                    <p className="portfolio-project-subtitle">{project.subtitle}</p>
                  </div>
                  <span className="portfolio-project-timeline">{project.timeline}</span>
                </div>

                <p className="portfolio-project-description">{project.description}</p>

                <div className="portfolio-project-footer">
                  <div className="portfolio-project-tech">
                    {project.techStack.slice(0, 4).map((tech) => <span key={tech}>{tech}</span>)}
                    {project.techStack.length > 4 && (
                      <span title={project.techStack.slice(4).join(', ')}>+{project.techStack.length - 4}</span>
                    )}
                  </div>
                  <div className="portfolio-project-actions">
                    <a
                      className="portfolio-project-action"
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.title} source code on GitHub`}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09.65 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                      </svg>
                      <span>Source</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                    {project.liveUrl ? (
                      <a
                        className="portfolio-project-action"
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${project.title} live project`}
                      >
                        <span>Live link</span>
                        <span aria-hidden="true">↗</span>
                      </a>
                    ) : (
                      <button
                        type="button"
                        className="portfolio-project-action is-unavailable"
                        disabled
                        title="Add this project's liveUrl in portfolioData.ts"
                      >
                        <span>Live link</span>
                        <span aria-hidden="true">↗</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </PortfolioPage>
  );
}
