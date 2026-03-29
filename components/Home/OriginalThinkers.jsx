'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useArchitecturalLines } from '../../hooks/useArchitecturalLines';
import MagneticLink from '../UI/MagneticLink';
import '../../styles/thinkers.scss';

gsap.registerPlugin(ScrollTrigger);

const thinkers = [
  { name: 'Yash Sawhney', role: 'Entrepreneur', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop' },
  { name: 'Prof. Paul Elkington', role: 'Scientist', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop' },
  { name: 'Michelle Meitiner', role: 'Author', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop' },
  { name: 'Tom Pakenham', role: 'Historian', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop' },
  { name: 'Sarah Jenkins', role: 'Architect', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop' }
];

export default function OriginalThinkers() {
  const sectionRef = useRef(null);
  const wrapperRef = useRef(null);
  const lineTopRef = useRef(null);
  const lineBottomRef = useRef(null);

  useArchitecturalLines(sectionRef, [
    { ref: lineTopRef, axis: 'x' },
    { ref: lineBottomRef, axis: 'x' }
  ]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const totalScroll = wrapperRef.current.scrollWidth - window.innerWidth;

      // Main Horizontal Scroll & Pin
      const mainTween = gsap.to(wrapperRef.current, {
        x: -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${totalScroll}`,
          onUpdate: (self) => {
            gsap.set(".progress-fill", { scaleX: self.progress });
          }
        }
      });

      // Background Text Parallax (slower than cards)
      gsap.to(".bg-text-inner", {
        x: -totalScroll * 0.3,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${totalScroll}`,
          scrub: 1
        }
      });

      // Card Content Stagger (subtle y-parallax on cards)
      gsap.from(".thinker-card", {
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%'
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="thinkers-section ds-section-border" ref={sectionRef}>
      {/* Massive Parallax Background */}
      <div className="thinkers-bg-text hide-mobile">
        <span className="bg-text-inner">ORIGINAL THINKERS</span>
      </div>

      <div className="thinkers-header">
        <div className="header-left">
          <span className="section-label">ALUMNI / LEGACY</span>
          <h2>Original Thinkers</h2>
        </div>
        <MagneticLink href="#profiles">View All Profiles</MagneticLink>
      </div>
      
      <div className="thinkers-scroll-container">
        <div className="thinkers-wrapper" ref={wrapperRef}>
          {thinkers.map((thinker, i) => (
            <div className="thinker-card" key={i}>
              <span className="thinker-num">0{i + 1}</span>
              <div className="thinker-image">
                 {/* eslint-disable-next-line @next/next/no-img-element */}
                 <img src={thinker.image} alt={thinker.name} />
                 <div className="image-mask"></div>
              </div>
              <div className="thinker-info">
                <h3>{thinker.name}</h3>
                <p>{thinker.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="thinkers-progress-wrap hide-mobile">
        <div className="progress-bar">
          <div className="progress-fill"></div>
        </div>
      </div>
    </section>
  );
}
