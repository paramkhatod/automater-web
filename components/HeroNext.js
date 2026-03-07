"use client";

import React from 'react';
import FlowingMenu from './FlowingMenu';

/**
 * COMPANY COMPONENT - DISTILLED VERSION
 * * I have converted your "Problem & Solution" cards into these 
 * four high-impact flowing items.
 */
const companyItems = [
  
  { 
    link: '#solution', 
    text: 'Simple & Open Source', 
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop' 
  },
  { 
    link: '#community', 
    text: 'Built For Students', 
    image: 'https://images.unsplash.com/photo-1523240715632-d984bb4b995e?q=80&w=600&auto=format&fit=crop' 
  },
  { 
    link: '#vision', 
    text: 'Community Driven Logic', 
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop' 
  }
];

function Company() {
  return (
    <section id="company" className="w-full bg-[#060010]">
      {/* CONTAINER DEPTH:
          We set a height of 600px as requested to give the 
          FlowingMenu room to breathe and tilt.
      */}
      <div style={{ height: '500px', position: 'relative' }} className="w-full">
        <FlowingMenu 
          items={companyItems}
          speed={15}
          textColor="#060010"
          bgColor="#fce7f3"
          marqueeBgColor="#F9A8D4" // Using your Brand Pink for the hover marquee
          marqueeTextColor="#2e2626"
          borderColor="rgba(255, 255, 255, 0.1)"
        />
      </div>
    </section>
  );
}

export default Company;