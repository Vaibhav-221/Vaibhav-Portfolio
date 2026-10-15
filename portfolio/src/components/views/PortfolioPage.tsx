'use client';

import { ReactNode, useEffect, useRef } from 'react';

interface PortfolioPageProps {
  eyebrow: string;
  title: ReactNode;
  description: string;
  children: ReactNode;
}

export default function PortfolioPage({ eyebrow, title, description, children }: PortfolioPageProps) {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const scrollParent = page.closest('.page-content') as HTMLElement | null;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { root: scrollParent, rootMargin: '0px 0px -32px 0px', threshold: 0.02 }
    );

    const observePendingItems = () => {
      page.querySelectorAll('.portfolio-reveal:not(.is-visible)').forEach((item) => observer.observe(item));
    };
    const mutations = new MutationObserver(observePendingItems);

    observePendingItems();
    mutations.observe(page, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, []);

  return (
    <div className="portfolio-page" ref={pageRef}>
      <header className="portfolio-page-header portfolio-reveal is-visible">
        <span className="portfolio-page-eyebrow">PORTFOLIO / {eyebrow}</span>
        <h1 className="portfolio-page-title">{title}</h1>
        <p className="portfolio-page-description">{description}</p>
      </header>
      <div className="portfolio-page-content">{children}</div>
    </div>
  );
}
