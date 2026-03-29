'use client';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * useArchitecturalLines
 *
 * Implements premium, scroll-trigger-mapped animations for decorative lines.
 * Maps line extension ('drawing' effect) directly to scroll progress for a fluid, weighted feel.
 *
 * @param {object}  sectionRef  — ref to the containing section or trigger element
 * @param {Array}   lineRefs    — [{ ref, axis: 'x'|'y', origin: 'left'|'right'|'top'|'bottom'|'center' }]
 * @param {object}  options     — { start, end, scrub, ease }
 */
export function useArchitecturalLines(
  sectionRef,
  lineRefs = [],
  options = {}
) {
  const {
    start = 'top 95%',
    end = 'bottom 20%',
    scrub = 1.2, // Weighted scrubbing for premium feel
    ease = 'none', // 'none' often works best for scrubbed animations to maintain direct 1:1 mapping
  } = options;

  useEffect(() => {
    if (!sectionRef?.current || lineRefs.length === 0) return;

    const ctx = gsap.context(() => {
      lineRefs.forEach(({ ref, axis, origin }) => {
        if (!ref?.current) return;

        const isVertical = axis === 'y';
        const defaultOrigin = isVertical ? 'top center' : 'left center';
        const transformOrigin = origin || defaultOrigin;

        // Initial state
        if (isVertical) {
          gsap.set(ref.current, { scaleY: 0, opacity: 0, transformOrigin });
        } else {
          gsap.set(ref.current, { scaleX: 0, opacity: 0, transformOrigin });
        }

        // Animation mapped to scroll
        gsap.to(ref.current, {
          [isVertical ? 'scaleY' : 'scaleX']: 1,
          opacity: 1,
          ease: ease,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: start,
            end: end,
            scrub: scrub,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [sectionRef, lineRefs, start, end, scrub, ease]);
}

