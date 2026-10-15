'use client';

import React, { useEffect, useRef, useState } from 'react';
import { personalInfo, projectsData, ProjectItem } from '@/data/portfolioData';
import PortfolioPage from './PortfolioPage';

export default function ProjectsView() {
  const [filter, setFilter] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const projectGridRef = useRef<HTMLDivElement>(null);

  const categories = ['All', 'Full Stack', 'AI & ML', 'Automation'];
  const filteredProjects = projectsData.filter((project) => filter === 'All' || project.category === filter);

  useEffect(() => {
    const dialog = dialogRef.current;
    document.body.classList.toggle('portfolio-project-dialog-open', Boolean(selectedProject));
    if (!dialog) return;

    let revealFrame = 0;
    if (selectedProject) {
      if (!dialog.open) dialog.showModal();
      const revealItems = Array.from(dialog.querySelectorAll<HTMLElement>('.portfolio-project-dialog-reveal'));
      revealItems.forEach((item, index) => {
        item.classList.remove('is-revealed');
        item.style.setProperty('--dialog-reveal-delay', `${index * 70}ms`);
      });
      revealFrame = window.requestAnimationFrame(() => {
        revealItems.forEach((item) => item.classList.add('is-revealed'));
      });
    } else if (dialog.open) {
      dialog.close();
    }

    return () => {
      document.body.classList.remove('portfolio-project-dialog-open');
      if (revealFrame) window.cancelAnimationFrame(revealFrame);
    };
  }, [selectedProject]);

  useEffect(() => {
    const grid = projectGridRef.current;
    if (!grid) return;

    const projectView = grid.closest('.portfolio-project-view') as HTMLElement | null;
    const scrollParent = grid.closest('.page-content') as HTMLElement | null;
    const cards = projectView?.querySelectorAll<HTMLElement>('.portfolio-project-scroll-reveal') ?? [];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle('is-in-view', entry.isIntersecting);
      });
    }, {
      root: scrollParent,
      rootMargin: '-4% 0px -8% 0px',
      threshold: 0.12,
    });

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [filter]);

  const openProject = (project: ProjectItem) => setSelectedProject(project);

  return (
    <PortfolioPage
      eyebrow="SELECTED WORK"
      title={(
        <>
          <span className="portfolio-project-title-mask">
            <span className="portfolio-project-title-line" style={{ animationDelay: '0.12s' }}>Built to solve</span>
          </span>
          <span className="portfolio-project-title-mask">
            <span className="portfolio-project-title-line" style={{ animationDelay: '0.26s' }}>real problems.</span>
          </span>
        </>
      )}
      description="Production platforms, open-source systems, and applied AI, designed around real users."
    >
      <div className="portfolio-view-content portfolio-project-view">
        <div className="portfolio-view-toolbar portfolio-reveal">
          <div className="portfolio-filter" role="group" aria-label="Filter projects by category">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                aria-pressed={filter === category}
                onClick={() => setFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <p className="portfolio-project-count" aria-live="polite">
            <span>{String(filteredProjects.length).padStart(2, '0')}</span>
            {filteredProjects.length === 1 ? ' project' : ' projects'}
          </p>
        </div>

        <div ref={projectGridRef} className="portfolio-project-grid">
          {filteredProjects.map((project: ProjectItem, index) => (
            <article
              key={project.id}
              className="portfolio-card portfolio-project-card portfolio-project-scroll-reveal"
              style={{
                '--project-accent': project.color,
                '--project-wash': project.accentColor,
                '--project-reveal-delay': `${index * 75}ms`,
              } as React.CSSProperties}
              onClick={(event) => {
                if ((event.target as HTMLElement).closest('button, a')) return;
                openProject(project);
              }}
            >
              <div className="portfolio-project-visual" aria-hidden="true">
                <span className="portfolio-project-system">Project / {project.timeline}</span>
                <span className="portfolio-project-monogram">
                  {project.title.split(/\s+/).map((word) => word[0]).join('').slice(0, 2)}
                </span>
                <span className="portfolio-project-orbit" />
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
                {project.metrics && <p className="portfolio-project-metrics">{project.metrics}</p>}

                <div className="portfolio-project-highlight">
                  <span>BUILD NOTE</span>
                  <p>{project.keyHighlights[0]}</p>
                </div>

                <div className="portfolio-project-footer">
                  <div className="portfolio-project-tech" aria-label="Technology highlights">
                    {project.techStack.slice(0, 4).map((technology) => <span key={technology}>{technology}</span>)}
                    {project.techStack.length > 4 && (
                      <span title={project.techStack.slice(4).join(', ')}>+{project.techStack.length - 4}</span>
                    )}
                  </div>
                  <div className="portfolio-project-card-actions" role="group" aria-label={`${project.title} project links`}>
                    <a
                      className="portfolio-project-action is-source"
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.title} source code on GitHub`}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09.65 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                      </svg>
                      <span>Source link</span><span aria-hidden="true">↗</span>
                    </a>
                    {project.liveUrl ? (
                      <a
                        className="portfolio-project-action is-live"
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${project.title} live project`}
                      >
                        <span>Live link</span><span aria-hidden="true">↗</span>
                      </a>
                    ) : (
                      <button type="button" className="portfolio-project-action is-unavailable" disabled title="No live demo URL is configured for this project">
                        <span>Live unavailable</span>
                      </button>
                    )}
                  </div>
                  <button
                    type="button"
                    className="portfolio-project-open"
                    aria-haspopup="dialog"
                    aria-controls="project-details-dialog"
                    onClick={() => openProject(project)}
                  >
                    <span>Explore the full case study</span>
                    <span aria-hidden="true">→</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <section className="portfolio-project-outro portfolio-project-scroll-reveal" aria-labelledby="portfolio-project-outro-title">
          <span className="portfolio-project-outro-kicker">BEYOND THE PORTFOLIO</span>
          <h2 id="portfolio-project-outro-title">Want to see what else<br /><span>I&apos;m building?</span></h2>
          <p>Explore more of my projects, experiments, and open-source contributions on GitHub.</p>
          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">
            <span>Explore my GitHub</span><span aria-hidden="true">↗</span>
          </a>
        </section>
      </div>

      <dialog
        ref={dialogRef}
        id="project-details-dialog"
        className="portfolio-project-dialog"
        aria-labelledby="project-dialog-title"
        aria-describedby="project-dialog-overview"
        onClose={() => setSelectedProject(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
      >
        {selectedProject && (
          <div
            className="portfolio-project-dialog-shell"
            style={{ '--project-accent': selectedProject.color } as React.CSSProperties}
          >
            <header className="portfolio-project-dialog-header portfolio-project-dialog-reveal">
              <div>
                <span className="portfolio-project-dialog-eyebrow">
                  {selectedProject.category} <span aria-hidden="true">/</span> {selectedProject.timeline}
                </span>
                <h2 id="project-dialog-title">{selectedProject.title}</h2>
                <p>{selectedProject.subtitle}</p>
              </div>
              <button
                type="button"
                className="portfolio-project-dialog-close"
                aria-label="Close project details"
                onClick={() => dialogRef.current?.close()}
              >
                <span aria-hidden="true">×</span>
              </button>
            </header>

            <div className="portfolio-project-dialog-body">
              <section className="portfolio-project-dialog-section portfolio-project-dialog-reveal" aria-labelledby="project-overview-heading">
                <h3 id="project-overview-heading">Overview</h3>
                <div id="project-dialog-overview" className="portfolio-project-dialog-copy">
                  {selectedProject.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </section>

              <div className="portfolio-project-dialog-facts portfolio-project-dialog-reveal">
                <section className="portfolio-project-dialog-section">
                  <h3>Architecture</h3>
                  <p>{selectedProject.architecture}</p>
                </section>
                <section className="portfolio-project-dialog-section">
                  <h3>Database</h3>
                  <p>{selectedProject.database}</p>
                </section>
              </div>

              <section className="portfolio-project-dialog-section portfolio-project-dialog-reveal">
                <h3>Implementation notes</h3>
                <ul className="portfolio-project-dialog-highlights">
                  {selectedProject.keyHighlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                </ul>
              </section>

              <section className="portfolio-project-dialog-section portfolio-project-dialog-reveal">
                <h3>Technology</h3>
                <div className="portfolio-project-dialog-tech">
                  {selectedProject.techStack.map((technology) => <span key={technology}>{technology}</span>)}
                </div>
              </section>
            </div>

            <footer className="portfolio-project-dialog-actions portfolio-project-dialog-reveal">
              <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="portfolio-project-dialog-link is-primary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.32-3.76-1.32-.5-1.28-1.24-1.62-1.24-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.7 1.15 1.7 1.15.99 1.69 2.6 1.2 3.23.92.1-.71.39-1.2.7-1.48-2.48-.28-5.08-1.24-5.08-5.52 0-1.22.44-2.21 1.15-2.99-.12-.28-.5-1.42.11-2.95 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.56 0c2.12-1.44 3.05-1.14 3.05-1.14.61 1.53.23 2.67.11 2.95.72.78 1.15 1.77 1.15 2.99 0 4.29-2.61 5.24-5.1 5.51.4.35.75 1.03.75 2.08v3.08c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
                </svg>
                <span>Source code</span><span aria-hidden="true">↗</span>
              </a>
              {selectedProject.liveUrl ? (
                <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer" className="portfolio-project-dialog-link">
                  <span>Live project</span><span aria-hidden="true">↗</span>
                </a>
              ) : (
                <button type="button" className="portfolio-project-dialog-link is-unavailable" disabled>
                  <span>Live unavailable</span>
                </button>
              )}
            </footer>
          </div>
        )}
      </dialog>
    </PortfolioPage>
  );
}
