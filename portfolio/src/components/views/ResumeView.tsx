'use client';

import React from 'react';

export default function ResumeView() {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/assets/docs/aditya-resume.pdf';
    link.download = 'Aditya_Chauhan_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
          flexWrap: 'wrap',
          gap: '20px',
        }}
      >
        <h2 style={{ fontSize: '32px', fontWeight: 700, margin: 0 }}>Resume</h2>

        <button
          onClick={handleDownload}
          style={{
            padding: '12px 24px',
            background: '#0a84ff',
            color: '#ffffff',
            border: 'none',
            borderRadius: '12px',
            fontWeight: 600,
            fontSize: '14px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            transition: 'background 0.2s, transform 0.1s',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download Resume
        </button>
      </div>

      {/* Resume Document Content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '30px',
          padding: '30px',
          background: 'var(--glass-bg)',
          border: '1px solid var(--glass-border)',
          borderRadius: '20px',
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', borderBottom: '1px solid var(--glass-border)', paddingBottom: '20px' }}>
          <h1 style={{ fontSize: '36px', margin: '0 0 10px 0', fontWeight: 700 }}>ADITYA CHAUHAN</h1>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '16px',
              flexWrap: 'wrap',
              fontSize: '15px',
              color: 'var(--text-main)',
            }}
          >
            <span>adityachauhan8079@gmail.com</span>
            <span>•</span>
            <span>+91 7849813424</span>
            <span>•</span>
            <span>GitHub: mihir-aditya</span>
          </div>
        </div>

        {/* Education */}
        <div>
          <h3
            style={{
              fontSize: '18px',
              fontWeight: 600,
              color: '#0a84ff',
              marginBottom: '16px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            Education
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '17px' }}>University Of Kota</div>
                <div style={{ fontSize: '15px', color: 'var(--text-main)' }}>
                  Integrated Master of Computer Application (GPA: 7.46)
                </div>
              </div>
              <div style={{ fontSize: '14px', color: 'var(--text-muted)', textAlign: 'right' }}>
                Kota, India<br />Aug 2023 - Aug 2028
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '17px' }}>Global Public School</div>
                <div style={{ fontSize: '15px', color: 'var(--text-main)' }}>
                  Senior Secondary Education, Mathematics (GPA: 7.90)
                </div>
              </div>
              <div style={{ fontSize: '14px', color: 'var(--text-muted)', textAlign: 'right' }}>
                Kota, India<br />Mar 2021 - Mar 2023
              </div>
            </div>
          </div>
        </div>

        {/* Experience */}
        <div>
          <h3
            style={{
              fontSize: '18px',
              fontWeight: 600,
              color: '#0a84ff',
              marginBottom: '16px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            Experience
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: '8px', gap: '8px' }}>
                <div style={{ fontWeight: 600, fontSize: '17px' }}>
                  Freelance Full Stack Developer{' '}
                  <span style={{ fontWeight: 400, color: 'var(--text-muted)' }}>| International Clients</span>
                </div>
                <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>Jan 2026 - Present</div>
              </div>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: '20px',
                  fontSize: '15px',
                  color: 'var(--text-main)',
                  lineHeight: 1.8,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                }}
              >
                <li>Developing and maintaining scalable web solutions for e-commerce and digital marketing clients.</li>
                <li>Led projects like AyitiBook (multi-vendor e-commerce) and Peyebouste (marketing automation) using Laravel, PHP, Python, and MySQL.</li>
                <li>Integrated third-party APIs (like Meta Ads), automated workflows with cron jobs, and managed cloud deployments.</li>
              </ul>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: '8px', gap: '8px' }}>
                <div style={{ fontWeight: 600, fontSize: '17px' }}>
                  Full Stack Web Development Intern{' '}
                  <span style={{ fontWeight: 400, color: 'var(--text-muted)' }}>| ASDN Cybernetics Inc.</span>
                </div>
                <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>May 2025 - July 2025</div>
              </div>
              <ul
                style={{
                  margin: 0,
                  paddingLeft: '20px',
                  fontSize: '15px',
                  color: 'var(--text-main)',
                  lineHeight: 1.8,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                }}
              >
                <li>Independently developed multiple live applications including an Employee Management System and a Vulnerability Scanner.</li>
                <li>Designed database structures with PHP/MySQL and built responsive interfaces using React, Tailwind CSS, and Bootstrap.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Projects */}
        <div>
          <h3
            style={{
              fontSize: '18px',
              fontWeight: 600,
              color: '#0a84ff',
              marginBottom: '16px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            Projects
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '16px', marginBottom: '4px' }}>
                macOS Web Environment (This Portfolio!){' '}
                <span style={{ fontSize: '13px', fontWeight: 400, color: 'var(--text-muted)', float: 'right' }}>Present</span>
              </div>
              <p style={{ margin: 0, fontSize: '14.5px', color: 'var(--text-main)', lineHeight: 1.7 }}>
                Architected a fully functional, interactive macOS replica directly in Next.js/React to serve as an engaging portfolio.
                Engineered a Multi-Window Manager with background media rendering, dynamic Light/Dark glassmorphism themes, and Apple-authentic physics.
              </p>
            </div>

            <div>
              <div style={{ fontWeight: 600, fontSize: '16px', marginBottom: '4px' }}>
                <a href="https://peyebouste.com" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                  Peyebouste Marketing Platform
                </a>{' '}
                <span style={{ fontSize: '13px', fontWeight: 400, color: 'var(--text-muted)', float: 'right' }}>Apr 2026 - Jun 2026</span>
              </div>
              <p style={{ margin: 0, fontSize: '14.5px', color: 'var(--text-main)', lineHeight: 1.7 }}>
                Scalable marketing automation using PHP/Python. Integrated Meta Ads APIs, an AI-powered chatbot, and automated cron jobs for campaign tracking.
              </p>
            </div>

            <div>
              <div style={{ fontWeight: 600, fontSize: '16px', marginBottom: '4px' }}>
                AyitiBook E-Commerce Platform{' '}
                <span style={{ fontSize: '13px', fontWeight: 400, color: 'var(--text-muted)', float: 'right' }}>Jan 2026 - Present</span>
              </div>
              <p style={{ margin: 0, fontSize: '14.5px', color: 'var(--text-main)', lineHeight: 1.7 }}>
                Large-scale Laravel e-commerce platform with dedicated portals for customers, sellers, affiliates, and admins utilizing role-based access control.
              </p>
            </div>

            <div>
              <div style={{ fontWeight: 600, fontSize: '16px', marginBottom: '4px' }}>
                <a href="http://peelr.myddns.net" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                  Peelr Sticker Store
                </a>{' '}
                <span style={{ fontSize: '13px', fontWeight: 400, color: 'var(--text-muted)', float: 'right' }}>Recent Project</span>
              </div>
              <p style={{ margin: 0, fontSize: '14.5px', color: 'var(--text-main)', lineHeight: 1.7 }}>
                Built a full-stack Laravel e-commerce website. Engineered an automated product uploading pipeline using JS and Python that crawls sites, removes backgrounds, generates mockups using OpenCV, and uploads them to the store.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
