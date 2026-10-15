'use client';

import React, { useState } from 'react';
import { personalInfo } from '@/data/portfolioData';
import PortfolioPage from './PortfolioPage';
import RequestCallModal from '../RequestCallModal';

export default function ContactView() {
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: '',
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formFeedback, setFormFeedback] = useState('');
  const [shareFeedback, setShareFeedback] = useState('');
  const [sentMessage, setSentMessage] = useState<{ name: string; email: string; subject: string } | null>(null);
  const [isFormExpanded, setIsFormExpanded] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formStatus === 'sending') return;

    setFormStatus('sending');
    setFormFeedback('Sending your message...');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json().catch(() => null) as { error?: string } | null;

      if (!response.ok) {
        throw new Error(result?.error || 'Your message could not be sent. Please try again.');
      }

      setSentMessage({
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
      });
      setFormStatus('success');
      setFormFeedback('');
      setFormData({ name: '', email: '', subject: '', message: '', website: '' });
    } catch (error) {
      setFormStatus('error');
      setFormFeedback(error instanceof Error ? error.message : 'Your message could not be sent. Please try again.');
    }
  };

  const handleShareProfile = async () => {
    const url = new URL('/', window.location.href).toString();
    const shareData = {
      title: 'Vaibhav Singh | Portfolio',
      text: 'Explore Vaibhav Singh’s portfolio.',
      url,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setShareFeedback('Profile shared.');
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return;
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setShareFeedback('Portfolio link copied to clipboard.');
    } catch {
      setShareFeedback('Copy the page address to share this portfolio.');
    }
  };

  return (
    <PortfolioPage
      eyebrow="LET’S TALK"
      title="Let’s build something useful."
      description="Have a project in mind, an opportunity, or an open-source collaboration? Let’s connect."
    >
    <div className="portfolio-view-content">
      <div className="portfolio-contact-layout">
        {/* Contact details */}
        <div className="portfolio-contact-details">
          <div className="portfolio-contact-meta portfolio-reveal">
            <a href={`mailto:${personalInfo.email}`} className="portfolio-contact-meta-item">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M3 6.5A2.5 2.5 0 0 1 5.5 4h13A2.5 2.5 0 0 1 21 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5z" />
                <path d="m4 6 8 6 8-6" />
              </svg>
              <span>
                <small>EMAIL</small>
                <strong>{personalInfo.email}</strong>
              </span>
              <span className="portfolio-contact-meta-arrow" aria-hidden="true">↗</span>
            </a>
            <div className="portfolio-contact-meta-item">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M20 10c0 5.5-8 12-8 12S4 15.5 4 10a8 8 0 1 1 16 0Z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              <span>
                <small>BASED IN</small>
                <strong>{personalInfo.location}</strong>
              </span>
            </div>
          </div>

          <div className="portfolio-contact-social-block portfolio-reveal">
            <p className="portfolio-contact-social-heading">FIND ME AROUND THE WEB</p>
            <div className="portfolio-contact-socials">
            <a
              href={personalInfo.github}
              className="portfolio-social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
              GitHub
            </a>

            <a
              href={personalInfo.linkedin}
              className="portfolio-social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              LinkedIn
            </a>

            <a
              href={personalInfo.twitter}
              className="portfolio-social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.9 5.8 22H2.6l7.3-8.4L1.8 2h6.5l4.5 6.7L18.9 2Zm-1.1 18h1.7L7.2 3.9H5.4L17.8 20Z" />
              </svg>
              X / Twitter
            </a>

            <button type="button" className="portfolio-social-link portfolio-share-link" onClick={handleShareProfile}>
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <path d="m8.7 10.5 6.6-4M8.7 13.5l6.6 4" />
              </svg>
              Share profile
            </button>
            </div>
            <p className="portfolio-share-feedback" role="status" aria-live="polite">{shareFeedback}</p>
          </div>
        </div>

        {/* Contact Form */}
        <div
          className="portfolio-card portfolio-contact-form portfolio-reveal"
        >
          <button
            type="button"
            className="portfolio-request-call"
            aria-haspopup="dialog"
            onClick={() => setIsCallModalOpen(true)}
          >
            <span className="portfolio-request-call-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 11.2 18.8a19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.13 4.1 2 2 0 0 1 4.12 2h3a2 2 0 0 1 2 1.72c.12.9.34 1.78.65 2.62a2 2 0 0 1-.45 2.11L8.05 9.72a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.84.31 1.72.53 2.62.65A2 2 0 0 1 22 16.92Z" />
              </svg>
            </span>
            <span className="portfolio-request-call-copy">
              <strong>Rather talk it through?</strong>
              <span>Choose a time that suits you. I’ll review your request and follow up.</span>
            </span>
            <span className="portfolio-request-call-action">
              Request a call
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </button>

          <h3 className="portfolio-contact-form-title">Or send a direct message</h3>
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
              {formStatus === 'success' ? (
                <div className="contact-success" role="status" aria-live="polite">
                  <div className="contact-success-mark" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="m6 12.5 4 4L18.5 8" />
                    </svg>
                  </div>
                  <div className="contact-success-content">
                    <p className="contact-success-kicker"><span />DELIVERY CONFIRMED</p>
                    <h4>Message sent.</h4>
                    <p className="contact-success-copy">
                      Thanks, {sentMessage?.name || 'there'}. Your note is in my inbox.
                    </p>
                    {sentMessage?.subject && (
                      <div className="contact-success-subject">
                        <span>SUBJECT</span>
                        <strong>{sentMessage.subject}</strong>
                      </div>
                    )}
                    <div className="contact-success-footer">
                      <span>Reply to {sentMessage?.email}</span>
                      <button
                        type="button"
                        onClick={() => {
                          setFormStatus('idle');
                          setFormFeedback('');
                          setSentMessage(null);
                          setIsFormExpanded(true);
                        }}
                      >
                        Send another
                        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="portfolio-contact-fields">
                <div className="portfolio-contact-field">
                  <label htmlFor="contact-name" style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    required
                    maxLength={100}
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
                  <label htmlFor="contact-email" style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>
                    YOUR EMAIL
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    required
                    maxLength={254}
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
                <label htmlFor="contact-subject" style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>
                  SUBJECT
                </label>
                <input
                  type="text"
                  id="contact-subject"
                  name="subject"
                  maxLength={160}
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
                <label htmlFor="contact-message" style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>
                  MESSAGE
                </label>
                <textarea
                  required
                  id="contact-message"
                  name="message"
                  rows={4}
                  maxLength={5000}
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

              <div
                aria-hidden="true"
                style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', border: 0 }}
              >
                <label htmlFor="contact-website">Leave this field empty</label>
                <input
                  id="contact-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                />
              </div>

              <button
                type="submit"
                className="portfolio-primary-button"
                disabled={formStatus === 'sending'}
                aria-busy={formStatus === 'sending'}
                style={{
                  padding: '12px 24px',
                  background: 'var(--portfolio-accent)',
                  color: 'var(--portfolio-accent-contrast)',
                  border: 'none',
                  borderRadius: '12px',
                  fontWeight: 600,
                  fontSize: '14px',
                  cursor: formStatus === 'sending' ? 'wait' : 'pointer',
                  opacity: formStatus === 'sending' ? 0.7 : 1,
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
                {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
              {formFeedback && (
                <p
                  role={formStatus === 'error' ? 'alert' : 'status'}
                  aria-live="polite"
                  style={{ margin: 0, color: formStatus === 'error' ? '#ff6b6b' : 'var(--text-muted)', fontSize: '13px' }}
                >
                  {formFeedback}
                </p>
              )}
            </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    <RequestCallModal
      open={isCallModalOpen}
      onClose={() => setIsCallModalOpen(false)}
    />
    </PortfolioPage>
  );
}
