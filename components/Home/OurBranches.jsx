'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../../styles/ourbranches.scss';

gsap.registerPlugin(ScrollTrigger);

const branches = [
  { 
    id: '01', 
    branch: 'Amtala', 
    location: 'South 24 Pgs', 
    image: '/images/1.webp', 
    website: 'https://www.kecarmelamtala.com/', 
    stats: { est: '1992', students: '1200+', focus: 'Faith & Knowledge' } 
  },
  { 
    id: '02', 
    branch: 'Sarisha', 
    location: 'South 24 Pgs', 
    image: '/images/2.webp', 
    website: 'https://www.kecarmelsarisha.in/', 
    stats: { est: '1998', students: '800+', focus: 'Holistic Development' } 
  },
  { 
    id: '03', 
    branch: 'Sarsuna', 
    location: 'Kolkata', 
    image: '/images/3.webp', 
    website: 'https://www.kecarmelsarsuna.in/', 
    stats: { est: '2005', students: '1500+', focus: 'Urban Excellence' } 
  },
  { 
    id: '04', 
    branch: 'Gushkura', 
    location: 'Purba Bardhaman', 
    image: '/images/4.webp', 
    website: 'https://www.kecarmelguskara.in/', 
    stats: { est: '2010', students: '650+', focus: 'Rural Empowerment' } 
  },
  { 
    id: '05', 
    branch: 'Suri', 
    location: 'Birbhum', 
    image: '/images/5.webp', 
    website: 'https://www.kecarmelsuri.org/', 
    stats: { est: '2012', students: '900+', focus: 'Values & Ethics' } 
  },
  { 
    id: '06', 
    branch: 'Bankura', 
    location: 'Bankura', 
    image: '/images/6.webp', 
    website: 'https://kecarmelbankura.in/', 
    stats: { est: '1992', students: '1500+', focus: 'Institutional Hub' } 
  },
  { 
    id: '07', 
    branch: 'Ambari', 
    location: 'Siliguri', 
    image: '/images/7.webp', 
    website: 'https://www.kecarmelsiliguri.in/', 
    stats: { est: '2015', students: '450+', focus: 'Modern Pedagogy' } 
  },
  { 
    id: '08', 
    branch: 'Behala', 
    location: 'Kolkata', 
    image: '/images/8.webp', 
    website: 'https://www.kecarmelbehala.in/', 
    stats: { est: '2008', students: '2000+', focus: 'Tech-Driven Learning' } 
  },
];

export default function OurBranches() {
  const sectionRef = useRef(null);
  const [activeBranch, setActiveBranch] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered entrance for the cards
      gsap.from('.ob-interactive-card', {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        }
      });
      
      // Header subtitle/title entrance
      gsap.from('.ob-v2-header > *', {
        x: -40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="ob-v2-section" ref={sectionRef}>
      
      {/* ── BACKGROUND STAGE: CROSS-FADES BETWEEN CAMPUSES ── */}
      <div className="ob-v2-background">
        <div className="ob-v2-overlay" />
        
        {/* Default Background */}
        <div className={`ob-v2-bg-img ${activeBranch === null ? 'active' : ''}`}>
           <Image 
             src="/images/6.webp" 
             alt="Default Campus" 
             fill 
             className="object-cover"
             priority
           />
        </div>

        {/* Dynamic Branch Backgrounds */}
        {branches.map((b) => (
          <div 
             key={b.id} 
             className={`ob-v2-bg-img ${activeBranch?.id === b.id ? 'active' : ''}`}
          >
            <Image 
              src={b.image} 
              alt={b.branch} 
              fill 
              className="object-cover"
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      <div className="ob-v2-content">
        <header className="ob-v2-header">
          <span className="ds-label-small kicker">EDUCATIONAL NETWORK</span>
          <h2 className="ds-heading-large">Our Branches</h2>
          <p className="ob-v2-sub">
            Our Group of Schools spans across the vibrant landscape of West Bengal, 
            nurturing eight beacons of excellence.
          </p>
        </header>

        {/* ── INTERACTIVE 4x2 GRID ── */}
        <div className="ob-v2-grid">
          {branches.map((b) => (
            <div 
              key={b.id} 
              className={`ob-interactive-card ${activeBranch?.id === b.id ? 'active' : ''}`}
              onMouseEnter={() => setActiveBranch(b)}
              onMouseLeave={() => setActiveBranch(null)}
            >
              <div className="ob-card-glass" />
              
              <div className="ob-card-top">
                <span className="ob-card-index">{b.id}</span>
                <span className="ob-card-loc">{b.location}</span>
              </div>

              <div className="ob-card-main">
                <h3 className="ob-card-name">{b.branch}</h3>
                <div className="ob-card-details">
                  <div className="detail">
                    <span className="label">EST.</span>
                    <span className="value">{b.stats.est}</span>
                  </div>
                  <div className="detail">
                    <span className="label">PRIMARY</span>
                    <span className="value">{b.stats.focus}</span>
                  </div>
                </div>
              </div>

              <div className="ob-card-cta">
                <Link href={b.website} target="_blank" className="ob-card-link">
                  EXPLORE PORTAL
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="16" height="16" strokeWidth="2.5">
                    <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
