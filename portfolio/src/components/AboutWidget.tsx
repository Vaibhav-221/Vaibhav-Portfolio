'use client';

import React from 'react';
import { PageId } from '@/types';

interface AboutWidgetProps {
  onNavigate: (page: PageId) => void;
}

export default function AboutWidget({ onNavigate }: AboutWidgetProps) {
  return (
    <div
      className="about-widget"
      onClick={() => onNavigate('about')}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onNavigate('about');
      }}
    >
      <h2>About me</h2>
      <p>
        Hi, I&apos;m Aditya, a Web Developer and Designer from Kota, Rajasthan. I specialize in full-stack development,
        working on both frontend and backend to create seamless digital experiences. My focus is on building
        websites that are functional, user-friendly, and visually engaging.
      </p>
      <p>
        I bring a personal touch to every project, ensuring it reflects the brand&apos;s identity while delivering an
        intuitive experience. My aim is to combine creativity and technology to transform ideas into impactful
        designs and scalable solutions.
      </p>
    </div>
  );
}
