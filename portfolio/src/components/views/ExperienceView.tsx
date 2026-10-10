'use client';

import React from 'react';

export default function ExperienceView() {
  return (
    <div>
      <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '30px' }}>Experience</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', position: 'relative' }}>
        {/* Timeline line */}
        <div
          style={{
            position: 'absolute',
            left: '19px',
            top: '20px',
            bottom: '20px',
            width: '2px',
            background: 'var(--glass-border)',
          }}
        />

        {/* Experience 1 */}
        <div style={{ position: 'relative', paddingLeft: '50px' }}>
          <div
            style={{
              position: 'absolute',
              left: '14px',
              top: '6px',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: '#0a84ff',
              boxShadow: '0 0 0 4px rgba(10,132,255,0.2)',
            }}
          />
          <div
            style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              padding: '24px',
              borderRadius: '16px',
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
                <h3 style={{ fontSize: '20px', fontWeight: 600, margin: '0 0 4px 0' }}>Founder &amp; CEO</h3>
                <div style={{ fontSize: '15px', fontWeight: 500, color: '#0a84ff' }}>
                  SYPNOWEB <span style={{ color: 'var(--text-muted)', fontWeight: 400, marginLeft: '6px' }}>| Freelancer</span>
                </div>
              </div>
              <div
                style={{
                  padding: '6px 12px',
                  background: 'var(--glass-bg-light)',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: 500,
                }}
              >
                Present
              </div>
            </div>
            <p style={{ fontSize: '16px', lineHeigth: 1.7, color: 'var(--text-main)', margin: 0 } as React.CSSProperties}>
              As the founder of SypnoWeb, I lead a web service provider firm focused on building powerful digital identities for
              businesses and professionals. From innovative web development to portfolio design and LinkedIn
              optimization, I ensure that every project reflects creativity, technical excellence, and strategic
              growth. My role involves not only shaping the vision of SypnoWeb but also working closely on
              execution—bridging design, development, and branding to deliver complete end-to-end solutions for our
              clients.
            </p>
          </div>
        </div>

        {/* Experience 2 */}
        <div style={{ position: 'relative', paddingLeft: '50px' }}>
          <div
            style={{
              position: 'absolute',
              left: '14px',
              top: '6px',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: '#bf5af2',
              boxShadow: '0 0 0 4px rgba(191,90,242,0.2)',
            }}
          />
          <div
            style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              padding: '24px',
              borderRadius: '16px',
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
                <h3 style={{ fontSize: '20px', fontWeight: 600, margin: '0 0 4px 0' }}>Web Developer Intern</h3>
                <div style={{ fontSize: '15px', fontWeight: 500, color: '#bf5af2' }}>ASDN Cybernetics</div>
              </div>
              <div
                style={{
                  padding: '6px 12px',
                  background: 'var(--glass-bg-light)',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: 500,
                }}
              >
                2025 (May - July)
              </div>
            </div>
            <p style={{ fontSize: '16px', lineHeight: 1.7, color: 'var(--text-main)', margin: 0 }}>
              I completed an internship at ASDN Cybernetics, where I gained hands-on experience in real-world projects and practical
              applications of my skills. During this time, I independently developed several projects, including an
              Employee Management website for HR and employees, as well as a Vulnerability Scanner and a Penetration
              Testing tool website. These experiences not only enhanced my technical expertise but also strengthened
              my ability to design, develop, and deliver complete solutions from start to finish.
            </p>
          </div>
        </div>

        {/* Experience 3 */}
        <div style={{ position: 'relative', paddingLeft: '50px' }}>
          <div
            style={{
              position: 'absolute',
              left: '14px',
              top: '6px',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: '#30d158',
              boxShadow: '0 0 0 4px rgba(48,209,88,0.2)',
            }}
          />
          <div
            style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              padding: '24px',
              borderRadius: '16px',
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
                <h3 style={{ fontSize: '20px', fontWeight: 600, margin: '0 0 4px 0' }}>Designer</h3>
                <div style={{ fontSize: '15px', fontWeight: 500, color: '#30d158' }}>Freelance / Independent</div>
              </div>
              <div
                style={{
                  padding: '6px 12px',
                  background: 'var(--glass-bg-light)',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: 500,
                }}
              >
                2023 - Present
              </div>
            </div>
            <p style={{ fontSize: '16px', lineHeight: 1.7, color: 'var(--text-main)', margin: 0 }}>
              I create logos, color schemes and typography for a brand&apos;s identity. Also I develop graphics for websites, social media and
              digital ads with applications that enhance user experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

