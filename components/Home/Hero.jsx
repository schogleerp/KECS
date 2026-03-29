'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useArchitecturalLines } from '../../hooks/useArchitecturalLines';
import '../../styles/hero.scss';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const vLineRef = useRef(null);
  const scrollLineRef = useRef(null);
  const scrollRef = useRef(null);
  const kickerRef = useRef(null);
  const headlineRef = useRef(null);

  useArchitecturalLines(heroRef, [
    { ref: vLineRef, axis: 'y', origin: 'top center' }
  ], { start: 'top top', end: 'bottom 40%', scrub: 1 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      const tl = gsap.timeline();
      
      // 1. Kicker Fade
      tl.fromTo(kickerRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 1, ease: 'power3.out', delay: 0.3 }
      );

      // 2. User-Friendly Unified Fade & Rise
      tl.fromTo(headlineRef.current.children, 
        { y: 30, opacity: 0, filter: 'blur(10px)' }, 
        { 
          y: 0, 
          opacity: 1, 
          filter: 'blur(0px)', 
          duration: 1.8, 
          stagger: 0.4, 
          ease: 'power3.out' 
        },
        "-=0.5"
      );

      // Scroll Indicator
      const scrollTl = gsap.timeline({ repeat: -1 });
      gsap.fromTo(scrollRef.current, { opacity: 0 }, { opacity: 1, duration: 1.5, delay: 1.5 });

      scrollTl.fromTo(scrollLineRef.current, 
        { scaleY: 0, transformOrigin: 'top' },
        { scaleY: 1, duration: 1.5, ease: 'power2.inOut' }
      ).to(scrollLineRef.current, 
        { scaleY: 0, transformOrigin: 'bottom', duration: 1.5, ease: 'power2.inOut' }
      );

      // Cinematic Video Parallax
      gsap.to(videoRef.current, {
        y: '15%',
        scale: 1.05, // Slight scale push on scroll
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero-section" ref={heroRef}>
      
      <div className="hero-video-container">
        <video 
          ref={videoRef}
          className="hero-video"
          autoPlay 
          muted 
          loop 
          playsInline
        >
          <source src="https://res.cloudinary.com/dyymektyt/video/upload/v1774623739/cugx1xqropskldicxrna.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay"></div>
      </div>
      
      <div className="hero-content">
        <div className="hero-v-line ds-line-v" ref={vLineRef} />

        {/* User-Friendly Bottom-Left Layout */}
        <div className="hero-bottom-left-content">
          
          <div className="hero-kicker" ref={kickerRef}>
            <span className="tiny-label">OUR MISSION VISION //</span>
          </div>

          <div className="hero-unified-title" ref={headlineRef}>
            
            <div className="mission-line primary-pogonia">
               We Mould Globally Competent Citizens<span className="pogonia-dot">.</span>
            </div>
            
            <div className="mission-line secondary-technical-stack">
               <div className="technical-bold">STEP IN AS A STUDENT.</div>
               <div className="technical-light">LEAVE AS A GLOBALLY COMPETENT CITIZEN.</div>
            </div>

          </div>

        </div>
      </div>

      <div className="hero-scroll-indicator" ref={scrollRef}>
        <div className="indicator-track">
          <div className="indicator-line" ref={scrollLineRef}></div>
        </div>
        <span className="indicator-text">SCROLL TO EXPLORE</span>
      </div>

    </section>
  );
}
