'use client';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import '../../styles/awwwardsButton.scss';
import Link from 'next/link';

export default function AwwwardsButton({ children, href, className = '' }) {
  const boundingRef = useRef(null);
  const btnRef = useRef(null);
  const fillRef = useRef(null);
  
  const activeCharsRef = useRef([]);
  const hoverCharsRef = useRef([]);
  const arrowActiveRef = useRef(null);
  const arrowHoverRef = useRef(null);

  const textString = typeof children === 'string' ? children : '';
  const chars = textString.split('');

  useEffect(() => {
    const bounding = boundingRef.current;
    if (!bounding) return;

    // High performance magnetic binding mapped directly to the raw GPU matrices
    const btnXTo = gsap.quickTo(btnRef.current, 'x', { duration: 0.8, ease: 'power3.out' });
    const btnYTo = gsap.quickTo(btnRef.current, 'y', { duration: 0.8, ease: 'power3.out' });

    const handleMouseEnter = (e) => {
      const rect = bounding.getBoundingClientRect();
      const magnetStrength = 20; 
      const newX = ((e.clientX - rect.left) / bounding.offsetWidth) - 0.5;
      const newY = ((e.clientY - rect.top) / bounding.offsetHeight) - 0.5;
      
      btnXTo(newX * magnetStrength);
      btnYTo(newY * magnetStrength);

      // Radial Fill using the absolute cursor geometry as an origin point
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;
      gsap.set(fillRef.current, { x: relX, y: relY, scale: 0, opacity: 1 });
      gsap.to(fillRef.current, { scale: 300, duration: 0.5, ease: 'power2.out', force3D: true });

      // Character-level staggers mimicking classic Good Fella web-fluidity
      gsap.to(activeCharsRef.current, { yPercent: -100, duration: 0.4, stagger: 0.02, ease: 'power3.inOut' });
      gsap.to(hoverCharsRef.current, { yPercent: -100, duration: 0.4, stagger: 0.02, ease: 'power3.inOut' });

      // Diagonal arrow sweep replacement mechanism
      gsap.to(arrowActiveRef.current, { x: 25, y: -25, opacity: 0, duration: 0.4, ease: 'power3.inOut' });
      gsap.to(arrowHoverRef.current, { x: 0, y: 0, opacity: 1, duration: 0.4, ease: 'power3.inOut' });
    };

    const handleMouseLeave = (e) => {
      btnXTo(0);
      btnYTo(0);

      gsap.to(fillRef.current, { scale: 0, opacity: 0, duration: 0.5, ease: 'power2.out' });

      gsap.to(activeCharsRef.current, { yPercent: 0, duration: 0.4, stagger: 0.02, ease: 'power3.inOut' });
      gsap.to(hoverCharsRef.current, { yPercent: 0, duration: 0.4, stagger: 0.02, ease: 'power3.inOut' });

      gsap.to(arrowActiveRef.current, { x: 0, y: 0, opacity: 1, duration: 0.4, ease: 'power3.inOut' });
      gsap.to(arrowHoverRef.current, { x: -25, y: 25, opacity: 0, duration: 0.4, ease: 'power3.inOut' });
    };

    const handleMouseMove = (e) => {
      const rect = bounding.getBoundingClientRect();
      const magnetStrength = 20; 
      const newX = ((e.clientX - rect.left) / bounding.offsetWidth) - 0.5;
      const newY = ((e.clientY - rect.top) / bounding.offsetHeight) - 0.5;
      btnXTo(newX * magnetStrength);
      btnYTo(newY * magnetStrength);
    };

    bounding.addEventListener('mouseenter', handleMouseEnter);
    bounding.addEventListener('mousemove', handleMouseMove);
    bounding.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      bounding.removeEventListener('mouseenter', handleMouseEnter);
      bounding.removeEventListener('mousemove', handleMouseMove);
      bounding.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    gsap.set(hoverCharsRef.current, { yPercent: 0 }); 
    gsap.set(arrowHoverRef.current, { x: -25, y: 25, opacity: 0 });
  }, []);

  const content = (
    <div className={`awwwards-btn-inner ${className}`} ref={btnRef}>
      <div className="fill" ref={fillRef}></div>
      
      <div className="btn-content-flex">
        <div className="rolling-text-wrapper">
          <div className="text-row active-row">
            {chars.map((char, i) => (
              <span key={i} className="char" ref={el => activeCharsRef.current[i] = el}>
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </div>
          <div className="text-row hover-row">
            {chars.map((char, i) => (
              <span key={i} className="char" ref={el => hoverCharsRef.current[i] = el}>
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </div>
        </div>
        
        <div className="arrows-wrapper">
          <div className="arrow active-arrow" ref={arrowActiveRef}>
            <ArrowUpRight size={18} strokeWidth={2} />
          </div>
          <div className="arrow hover-arrow" ref={arrowHoverRef}>
            <ArrowUpRight size={18} strokeWidth={2} />
          </div>
        </div>
      </div>
    </div>
  );

  return href ? (
    <Link href={href} className="awwwards-magnetic-bounding" ref={boundingRef}>
      {content}
    </Link>
  ) : (
    <button className="awwwards-magnetic-bounding" ref={boundingRef}>
      {content}
    </button>
  );
}
