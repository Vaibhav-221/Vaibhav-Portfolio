'use client';

import React, { useState } from 'react';

export default function ContactView() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <div>
      <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '30px' }}>Contact Me</h2>

      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        {/* Contact Info */}
        <div style={{ flex: 1, minWidth: '260px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '20px', color: 'var(--text-main)' }}>
            Get In Touch
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Email */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                background: 'var(--glass-bg)',
                padding: '16px',
                borderRadius: '16px',
                border: '1px solid var(--glass-border)',
              }}
            >
              <div
                style={{
                  background: 'var(--glass-bg-light)',
                  padding: '12px',
                  borderRadius: '12px',
                  display: 'flex',
                  color: '#0a84ff',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
                  Email
                </div>
                <div style={{ fontSize: '14px', fontWeight: 500, overflowWrap: 'anywhere', wordBreak: 'break-word' }}>
                  adityachauhan8079@gmail.com
                </div>
              </div>
            </div>

            {/* Phone */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                background: 'var(--glass-bg)',
                padding: '16px',
                borderRadius: '16px',
                border: '1px solid var(--glass-border)',
              }}
            >
              <div
                style={{
                  background: 'var(--glass-bg-light)',
                  padding: '12px',
                  borderRadius: '12px',
                  display: 'flex',
                  color: '#30d158',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
                  Phone
                </div>
                <div style={{ fontSize: '14px', fontWeight: 500 }}>+91 78498 13424</div>
              </div>
            </div>

            {/* Birthday */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                background: 'var(--glass-bg)',
                padding: '16px',
                borderRadius: '16px',
                border: '1px solid var(--glass-border)',
              }}
            >
              <div
                style={{
                  background: 'var(--glass-bg-light)',
                  padding: '12px',
                  borderRadius: '12px',
                  display: 'flex',
                  color: '#ff375f',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
                  Birthday
                </div>
                <div style={{ fontSize: '14px', fontWeight: 500 }}>May 16, 2005</div>
              </div>
            </div>

            {/* Location */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                background: 'var(--glass-bg)',
                padding: '16px',
                borderRadius: '16px',
                border: '1px solid var(--glass-border)',
              }}
            >
              <div
                style={{
                  background: 'var(--glass-bg-light)',
                  padding: '12px',
                  borderRadius: '12px',
                  display: 'flex',
                  color: '#bf5af2',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
                  Location
                </div>
                <div style={{ fontSize: '14px', fontWeight: 500 }}>Kota, Rajasthan, India</div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div
          style={{
            flex: 1.5,
            minWidth: '280px',
            background: 'var(--glass-bg)',
            border: '1px solid var(--glass-border)',
            padding: '30px',
            borderRadius: '20px',
          }}
        >
          <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '24px', color: 'var(--text-main)' }}>
            Send me a Message
          </h3>

          {submitted ? (
            <div
              style={{
                padding: '20px',
                borderRadius: '14px',
                background: 'rgba(48, 209, 88, 0.15)',
                border: '1px solid rgba(48, 209, 88, 0.4)',
                color: '#30d158',
                textAlign: 'center',
                fontSize: '15px',
                fontWeight: 500,
              }}
            >
              ✓ Thank you! Your message has been received. I will get back to you soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <input
                type="text"
                placeholder="Your Name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  borderRadius: '12px',
                  border: '1px solid var(--glass-border)',
                  background: 'rgba(0,0,0,0.2)',
                  color: 'var(--text-main)',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
              />
              <input
                type="email"
                placeholder="Your Email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  borderRadius: '12px',
                  border: '1px solid var(--glass-border)',
                  background: 'rgba(0,0,0,0.2)',
                  color: 'var(--text-main)',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
              />
              <input
                type="text"
                placeholder="Subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  borderRadius: '12px',
                  border: '1px solid var(--glass-border)',
                  background: 'rgba(0,0,0,0.2)',
                  color: 'var(--text-main)',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
              />
              <textarea
                placeholder="Your Message"
                rows={5}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  borderRadius: '12px',
                  border: '1px solid var(--glass-border)',
                  background: 'rgba(0,0,0,0.2)',
                  color: 'var(--text-main)',
                  fontSize: '14px',
                  outline: 'none',
                  resize: 'none',
                  transition: 'border-color 0.2s',
                  fontFamily: 'inherit',
                }}
              />
              <button
                type="submit"
                style={{
                  alignSelf: 'flex-start',
                  padding: '14px 28px',
                  background: '#0a84ff',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '12px',
                  fontWeight: 600,
                  fontSize: '14.5px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px rgba(10, 132, 255, 0.3)',
                  transition: 'background 0.2s, transform 0.1s',
                }}
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

