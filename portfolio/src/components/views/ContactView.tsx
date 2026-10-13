'use client';

import React, { useState } from 'react';
import { personalInfo } from '@/data/portfolioData';
import PortfolioPage from './PortfolioPage';

export default function ContactView() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isFormExpanded, setIsFormExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <PortfolioPage
      eyebrow="LET’S TALK"
      title="Let’s build something useful."
      description="Have a project in mind, an opportunity, or an open-source collaboration? Let’s connect."
    >
    <div className="portfolio-view-content">
      <div className="portfolio-contact-layout">
        {/* Contact Info Cards */}
        <div className="portfolio-contact-details">
          {/* Email */}
          <div
            className="portfolio-card portfolio-contact-info portfolio-reveal"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              background: 'var(--glass-bg)',
              padding: '16px',
              borderRadius: '16px',
              border: '1px solid var(--glass-border)',
            }}
          >
            <div
              style={{
                background: 'var(--portfolio-accent-soft)',
                padding: '12px',
                borderRadius: '12px',
                display: 'flex',
                color: 'var(--portfolio-accent)',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '2px' }}>
                Email
              </div>
              <a
                href={`mailto:${personalInfo.email}`}
                style={{
                  fontSize: '13.5px',
                  fontWeight: 600,
                  color: 'var(--text-main)',
                  textDecoration: 'none',
                  overflowWrap: 'anywhere',
                  wordBreak: 'break-word',
                }}
              >
                {personalInfo.email}
              </a>
            </div>
          </div>

          {/* Phone */}
          <div
            className="portfolio-card portfolio-contact-info portfolio-reveal"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              background: 'var(--glass-bg)',
              padding: '16px',
              borderRadius: '16px',
              border: '1px solid var(--glass-border)',
            }}
          >
            <div
              style={{
                background: 'var(--portfolio-accent-soft)',
                padding: '12px',
                borderRadius: '12px',
                display: 'flex',
                color: 'var(--portfolio-accent)',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '2px' }}>
                Phone / WhatsApp
              </div>
              <a
                href={`tel:${personalInfo.phone}`}
                style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-main)', textDecoration: 'none' }}
              >
                {personalInfo.phoneDisplay}
              </a>
            </div>
          </div>

          {/* Location */}
          <div
            className="portfolio-card portfolio-contact-info portfolio-reveal"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              background: 'var(--glass-bg)',
              padding: '16px',
              borderRadius: '16px',
              border: '1px solid var(--glass-border)',
            }}
          >
            <div
              style={{
                background: 'var(--portfolio-accent-soft)',
                padding: '12px',
                borderRadius: '12px',
                display: 'flex',
                color: 'var(--portfolio-accent)',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '2px' }}>
                Location
              </div>
              <div style={{ fontSize: '14px', fontWeight: 600 }}>{personalInfo.location}</div>
            </div>
          </div>

          {/* Social Profiles Row */}
          <div className="portfolio-contact-socials portfolio-reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <a
              href={personalInfo.github}
              className="portfolio-action-link"
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '12px',
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                borderRadius: '14px',
                color: '#ffffff',
                textDecoration: 'none',
                fontSize: '13px',
                fontWeight: 600,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
              GitHub
            </a>

            <a
              href={personalInfo.linkedin}
              className="portfolio-action-link"
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '12px',
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                borderRadius: '14px',
                color: 'var(--portfolio-accent)',
                textDecoration: 'none',
                fontSize: '13px',
                fontWeight: 600,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              LinkedIn
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div
          className="portfolio-card portfolio-contact-form portfolio-reveal"
        >
          <h3 className="portfolio-contact-form-title">Send a Direct Message</h3>
          <button
            type="button"
            className="portfolio-contact-form-toggle"
            aria-expanded={isFormExpanded}
            aria-controls="portfolio-contact-form-body"
            onClick={() => setIsFormExpanded((expanded) => !expanded)}
          >
            <span>Send a Direct Message</span>
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>

          <div
            id="portfolio-contact-form-body"
            className={`portfolio-contact-form-content${isFormExpanded ? ' is-open' : ''}`}
          >
            <div className="portfolio-contact-form-inner">
              {submitted ? (
            <div
              style={{
                padding: '24px',
                borderRadius: '14px',
                background: 'rgba(48, 209, 88, 0.15)',
                border: '1px solid rgba(48, 209, 88, 0.4)',
                color: '#30d158',
                textAlign: 'center',
                fontSize: '14.5px',
              }}
            >
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>✓</div>
              <strong>Thank you for reaching out!</strong>
              <div style={{ marginTop: '4px', fontSize: '13px', color: 'var(--text-muted)' }}>
                Your message has been noted. I will reply to you promptly.
              </div>
            </div>
              ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="portfolio-contact-fields">
                <div className="portfolio-contact-field">
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Smith"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--glass-border)',
                      borderRadius: '10px',
                      color: 'var(--text-main)',
                      fontSize: '14px',
                      outline: 'none',
                    }}
                  />
                </div>
                <div className="portfolio-contact-field">
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>
                    YOUR EMAIL
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--glass-border)',
                      borderRadius: '10px',
                      color: 'var(--text-main)',
                      fontSize: '14px',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div className="portfolio-contact-field">
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>
                  SUBJECT
                </label>
                <input
                  type="text"
                  placeholder="Opportunity / Collaboration / Project Inquiry"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '10px',
                    color: 'var(--text-main)',
                    fontSize: '14px',
                    outline: 'none',
                  }}
                />
              </div>

              <div className="portfolio-contact-field">
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>
                  MESSAGE
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Hello Vaibhav, I would like to discuss..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '10px',
                    color: 'var(--text-main)',
                    fontSize: '14px',
                    outline: 'none',
                    resize: 'vertical',
                  }}
                />
              </div>

              <button
                type="submit"
                className="portfolio-primary-button"
                style={{
                  padding: '12px 24px',
                  background: 'var(--portfolio-accent)',
                  color: 'var(--portfolio-accent-contrast)',
                  border: 'none',
                  borderRadius: '12px',
                  fontWeight: 600,
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px var(--portfolio-accent-soft)',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
                Send Message
              </button>
            </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </PortfolioPage>
  );
}
