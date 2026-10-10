'use client';

import React from 'react';

export default function AboutView() {
  return (
    <div>
      <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '30px' }}>About Me</h2>

      <div
        style={{
          background: 'var(--glass-bg)',
          border: '1px solid var(--glass-border)',
          borderRadius: '20px',
          padding: '30px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <p style={{ fontSize: '16px', lineHeight: 1.8, color: 'var(--text-main)', margin: 0 }}>
          Hi, I&apos;m Aditya, a Web Developer and Designer from Kota, Rajasthan. I specialize in full-stack development,
          working on both frontend and backend to create seamless digital experiences. My focus is on building
          websites that are functional, user-friendly, and visually engaging.
        </p>
        <p style={{ fontSize: '16px', lineHeight: 1.8, color: 'var(--text-main)', margin: 0 }}>
          I bring a personal touch to every project, ensuring it reflects the brand&apos;s identity while delivering an
          intuitive experience. My aim is to combine creativity and technology to transform ideas into impactful
          designs and scalable solutions.
        </p>
        <p style={{ fontSize: '16px', lineHeight: 1.8, color: 'var(--text-main)', margin: 0 }}>
          Beyond everyday web development, I have a passion for cybersecurity, automating workflows with Python, and building
          responsive, desktop-class web applications like this macOS environment.
        </p>
      </div>

      <div style={{ marginTop: '30px' }}>
        <h3 style={{ fontSize: '22px', fontWeight: 600, marginBottom: '20px' }}>What I Do</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          <div
            style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              borderRadius: '16px',
              padding: '24px',
            }}
          >
            <h4 style={{ fontSize: '18px', fontWeight: 600, margin: '0 0 8px 0', color: '#0a84ff' }}>Full Stack Development</h4>
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--text-muted)', margin: 0 }}>
              End-to-end web applications built with Next.js, React, Laravel, PHP, and modern relational databases.
            </p>
          </div>

          <div
            style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              borderRadius: '16px',
              padding: '24px',
            }}
          >
            <h4 style={{ fontSize: '18px', fontWeight: 600, margin: '0 0 8px 0', color: '#bf5af2' }}>UI/UX & Branding</h4>
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--text-muted)', margin: 0 }}>
              Crafting distinct brand identities, interactive components, responsive layouts, and modern glassmorphism aesthetics.
            </p>
          </div>

          <div
            style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              borderRadius: '16px',
              padding: '24px',
            }}
          >
            <h4 style={{ fontSize: '18px', fontWeight: 600, margin: '0 0 8px 0', color: '#30d158' }}>Security & Automation</h4>
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--text-muted)', margin: 0 }}>
              Automated pipelines with Python/OpenCV, vulnerability scanning tools, and secure authentication workflows.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

