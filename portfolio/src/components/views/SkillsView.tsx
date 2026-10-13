'use client';

import React, { useState } from 'react';
import { skillCategoriesData } from '@/data/portfolioData';
import PortfolioPage from './PortfolioPage';

function SkillCategoryIcon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    code: <><path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14" /></>,
    layout: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M9 9v11" /></>,
    server: <><rect x="3" y="4" width="18" height="7" rx="2" /><rect x="3" y="13" width="18" height="7" rx="2" /><path d="M7 7.5h.01M7 16.5h.01" /></>,
    database: <><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" /></>,
    settings: <><path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" /><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.7a8 8 0 0 1-1.6.9L16 20.5h-2.8l-.3-1.8a8 8 0 0 1-1.8-.7l-1.5 1L7.7 17l.9-1.6a8 8 0 0 1-.4-1.8l-1.7-.6v-2.8l1.8-.3a8 8 0 0 1 .7-1.7L8 6.7l2.1-2 1.6.9a8 8 0 0 1 1.8-.4l.6-1.7h2.8l.3 1.8a8 8 0 0 1 1.7.7l1.5-1 1.9 2.1-.9 1.6a8 8 0 0 1 .4 1.8l1.7.6v2.8l-1.8.3a8 8 0 0 1-.3.8Z" /></>,
  };

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {icons[name] ?? icons.code}
    </svg>
  );
}

export default function SkillsView() {
  const [selectedCat, setSelectedCat] = useState<string>('All');

  const categories = ['All', ...skillCategoriesData.map((c) => c.categoryName)];

  const displayCategories = skillCategoriesData.filter((cat) => {
    if (selectedCat === 'All') return true;
    return cat.categoryName === selectedCat;
  });

  return (
    <PortfolioPage
      eyebrow="SYSTEMS / CAPABILITIES"
      title="A practical technical toolkit."
      description="Full-stack engineering, applied AI, and the tools that carry ideas from interface to production."
    >
      <div className="portfolio-view-content portfolio-skill-view">
        <div className="portfolio-view-toolbar portfolio-reveal">
          <div className="portfolio-filter" role="group" aria-label="Filter skills by category">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                aria-pressed={selectedCat === cat}
                onClick={() => setSelectedCat(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className={`portfolio-skill-grid${selectedCat === 'All' ? '' : ' is-filtered'}`}>
          {displayCategories.map((cat, idx) => (
            <article
              key={cat.categoryName}
              className="portfolio-card portfolio-skill-card portfolio-reveal"
            >
              <header className="portfolio-skill-card-header">
                <span className="portfolio-skill-icon"><SkillCategoryIcon name={cat.iconName} /></span>
                <div>
                  <span className="portfolio-skill-kicker">Stack / {String(idx + 1).padStart(2, '0')}</span>
                  <h2>{cat.categoryName}</h2>
                </div>
                <span className="portfolio-skill-count">{String(cat.skills.length).padStart(2, '0')}</span>
              </header>

              <div className="portfolio-skill-list" role="list" aria-label={`${cat.categoryName} technologies`}>
                {cat.skills.map((skill) => (
                  <span className={`portfolio-skill-chip${skill.highlight ? ' is-core' : ''}`} key={skill.name} role="listitem">
                    {skill.name}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <aside className="portfolio-skills-summary portfolio-reveal">
          <div>
            <span className="portfolio-skill-kicker">Engineering practice</span>
            <h2>Architecture &amp; Best Practices</h2>
            <p>Component-Driven Architecture · REST &amp; Server Actions · RAG Pipelines · Agile/Scrum</p>
          </div>
          <span className="portfolio-skills-ready"><span aria-hidden="true">✓</span> Production Ready</span>
        </aside>
      </div>
    </PortfolioPage>
  );
}
