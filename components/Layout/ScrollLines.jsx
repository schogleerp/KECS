'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollLines Component — The "Eyesight" Grid System
 * Implements a global 12-column vertical grid and horizontal rows 
 * that expand/contract perfectly with scroll velocity.
 */
export default function ScrollLines() {
  const containerRef = useRef(null);
  
  // Refs for the Grid
  const vLineRefs = useRef([]);
  const hLineRefs = useRef([]);

  useEffect(() => {
    // Collect all lines for bulk animation
    const vLines = vLineRefs.current.filter(Boolean);
    const hLines = hLineRefs.current.filter(Boolean);

    const ctx = gsap.context(() => {
      
      // ── Vertical "Eyesight" Column Drawings ──────────────────────
      vLines.forEach((line, i) => {
        // Initial state
        gsap.set(line, { scaleY: 0, opacity: 0, transformOrigin: 'top center' });

        // Scroll Mapping
        gsap.to(line, {
          scaleY: 1,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.5, // Fluid, weighted feel
          }
        });
      });

      // ── Horizontal "Eyesight" Row Drawings ────────────────────────
      hLines.forEach((line, i) => {
        // Initial state
        gsap.set(line, { scaleX: 0, opacity: 0, transformOrigin: 'left center' });

        // Scroll Mapping - slightly staggered triggers for row reveals
        gsap.to(line, {
          scaleX: 1,
          opacity: 1,
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: document.body,
            start: `${10 + (i * 20)}% top`, // Staggered start based on row position
            end: `${50 + (i * 20)}% top`,
            scrub: 2, // Even slower for horizontal intersection
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Helper to render columns
  const renderCols = () => {
    const cols = [];
    // 11 internal columns + 2 edges
    for (let i = 1; i <= 11; i++) {
      cols.push(
        <div 
          key={`v-${i}`} 
          className={`grid-line-v col-${i}`} 
          ref={el => (vLineRefs.current[i-1] = el)} 
        />
      );
    }
    return cols;
  };

  return (
    <div className="ds-grid-overlay" ref={containerRef} aria-hidden="true">
      {/* Edge Framing */}
      <div className="grid-line-v left-edge" ref={el => (vLineRefs.current[11] = el)} />
      <div className="grid-line-v right-edge" ref={el => (vLineRefs.current[12] = el)} />
      
      {/* 12-Column Internal Grid */}
      {renderCols()}

      {/* Horizontal Keylines */}
      <div className="grid-line-h row-top" ref={el => (hLineRefs.current[0] = el)} />
      <div className="grid-line-h row-mid" ref={el => (hLineRefs.current[1] = el)} />
      <div className="grid-line-h row-bot" ref={el => (hLineRefs.current[2] = el)} />
    </div>
  );
}
