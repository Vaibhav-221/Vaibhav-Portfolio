'use client';

import React, { useState } from 'react';

interface Project {
  title: string;
  category: string;
  date: string;
  color: string;
  link?: string;
  description: string;
  tags: string[];
}

const projects: Project[] = [
  {
    title: 'Peyebouste Marketing Platform',
    category: 'Marketing Automation System',
    date: 'Apr 2026 - Jun 2026',
    color: '#0a84ff',
    link: 'https://peyebouste.com',
    description:
      'Developed a scalable marketing automation platform for a Haiti-based advertising agency using PHP and Python. Integrated Meta Ads APIs to enable clients to create, manage, and track advertising campaigns directly from the website. Built an AI-powered chatbot for customer support, implemented automated cron jobs for campaign processing, and developed reporting features for real-time performance monitoring.',
    tags: ['PHP', 'Python', 'Meta Ads API', 'AI Chatbot', 'Cron Automation'],
  },
  {
    title: 'AyitiBook E-Commerce Platform',
    category: 'Large-Scale Marketplace',
    date: 'Jan 2026 - Present',
    color: '#bf5af2',
    description:
      'Developing a large-scale e-commerce platform for a Dominican Republic client, responsible for designing and implementing the complete backend architecture and database system using Laravel. Built dedicated portals for customers, sellers, affiliate marketers, administrators, and delivery partners, each with role-based access control and tailored functionalities.',
    tags: ['Laravel', 'MySQL', 'Multi-Vendor', 'Role-Based Auth', 'API Architecture'],
  },
  {
    title: 'Peelr Sticker Store',
    category: 'Automated E-Commerce Platform',
    date: 'Recent Project',
    color: '#ff375f',
    link: 'http://peelr.myddns.net',
    description:
      'Built a full-stack sticker selling website from scratch using Laravel for both frontend and backend. Engineered an automated product uploading pipeline using JavaScript and Python that crawls websites, removes image backgrounds, generates mockup images using OpenCV, automatically renames files, and uploads them to the main website for selling.',
    tags: ['Laravel', 'Python', 'OpenCV', 'Web Scraping', 'Automation'],
  },
  {
    title: 'Service Management Platform',
    category: 'Multi-Tenant Repair Shop SaaS',
    date: 'Recent Project',
    color: '#32ade6',
    link: 'https://www.linkedin.com/posts/aditya-chauhan-mihir_webdevelopment-laravel-saas-activity-7442156452510683136-bbya',
    description:
      'Developed a cross-platform service management SaaS for repair businesses with an online booking portal, admin dashboard, and a Capacitor mobile app for technicians. Successfully integrated real-time web and mobile push notifications utilizing Firebase Cloud Messaging (FCM) and VAPID authentication. Tech stack includes Laravel, MySQL, TailwindCSS, and Capacitor.',
    tags: ['Laravel', 'Capacitor', 'Firebase FCM', 'Tailwind CSS', 'SaaS'],
  },
  {
    title: 'Vulcan-Pro Vulnerability Scanner',
    category: 'Advanced Security Tool',
    date: 'Jul 2025 - Sep 2025',
    color: '#30d158',
    link: 'https://vulcanprodemo.vercel.app/',
    description:
      'Built a full-stack vulnerability scanning platform that integrates open-source security tools like Nmap, Nikto, SQLmap, and WhatWeb. Implemented real-time scan visualization, severity-based reporting, and secure email OTP verification. Combined backend logic in PHP and Express with a React and Tailwind CSS frontend to deliver clean, structured PDF reports and actionable remediation insights.',
    tags: ['React', 'Node.js/Express', 'PHP', 'Nmap', 'Security Auditing'],
  },
  {
    title: 'Employee Management System',
    category: 'HR & Payroll Management',
    date: 'Jun 2025',
    color: '#ffd60a',
    link: 'https://ems-ten-lovat.vercel.app/',
    description:
      'Developed a web application to automate employee data, attendance, and payroll management. Built comprehensive CRUD functionalities with secure authentication and role-based access control.',
    tags: ['React', 'Express', 'MySQL', 'Authentication', 'CRUD'],
  },
  {
    title: 'Vulcan Security Scanner',
    category: 'Header & Config Security Analysis',
    date: 'Recent Project',
    color: '#ff9f0a',
    link: 'https://vulcandemo.vercel.app/',
    description:
      'Built a PHP security scanner for analyzing HTTP headers and configurations. Includes secure email OTP authentication, live target validation, and actionable remediation reporting.',
    tags: ['PHP', 'Security', 'OTP Verification', 'Report Generator'],
  },
];

export default function ProjectsView() {
  const [filter, setFilter] = useState<string>('All');

  const allCategories = ['All', 'Full Stack', 'Automation', 'Security', 'E-Commerce'];

  const filteredProjects = projects.filter((p) => {
    if (filter === 'All') return true;
    if (filter === 'Full Stack') return p.tags.includes('React') || p.tags.includes('Laravel') || p.tags.includes('PHP');
    if (filter === 'Automation') return p.tags.includes('Python') || p.tags.includes('Cron Automation') || p.tags.includes('OpenCV');
    if (filter === 'Security') return p.tags.includes('Security Auditing') || p.tags.includes('Security');
    if (filter === 'E-Commerce') return p.category.includes('E-Commerce') || p.category.includes('Marketplace');
    return true;
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '16px' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 700, margin: 0 }}>Projects</h2>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                padding: '6px 14px',
                borderRadius: '20px',
                border: '1px solid var(--glass-border)',
                background: filter === cat ? 'rgba(10, 132, 255, 0.8)' : 'var(--glass-bg)',
                color: filter === cat ? '#fff' : 'var(--text-main)',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {filteredProjects.map((project, idx) => (
          <div
            key={idx}
            style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              padding: '24px',
              borderRadius: '16px',
              transition: 'transform 0.2s, background 0.2s',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: '10px',
                marginBottom: '12px',
              }}
            >
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 600, margin: '0 0 4px 0', color: project.color }}>
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'inherit', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                    >
                      {project.title}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                  ) : (
                    project.title
                  )}
                </h3>
                <div style={{ fontSize: '15px', fontWeight: 500, color: 'var(--text-muted)' }}>
                  {project.category}
                </div>
              </div>

              <div
                style={{
                  padding: '6px 12px',
                  background: 'var(--glass-bg-light)',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: 'var(--text-main)',
                }}
              >
                {project.date}
              </div>
            </div>

            <p style={{ fontSize: '15.5px', lineHeight: 1.7, color: 'var(--text-main)', margin: '0 0 16px 0' }}>
              {project.description}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {project.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  style={{
                    padding: '4px 10px',
                    background: 'var(--glass-bg-light)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: 500,
                    color: 'var(--text-muted)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
