'use client';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * useImageReveal
 *
 * Implements a premium 'fade and slide' reveal for image containers.
 * Coordinates with scroll progress for a professional, editorial feel.
 *
 * @param {object}  containerRef — ref to the image container
 * @param {object}  imageRef     — ref to the actual image element
 * @param {object}  options      — { start, end, yOffset, scrub, ease }
 */
export function useImageReveal(
  containerRef,
  imageRef,
  options = {}
) {
  const {
    start = 'top 85%',
    end = 'bottom 15%',
    yOffset = 30, // Subtle slide distance
    scrub = 1,
    ease = 'power2.out',
    once = true, // Usually image reveals feel better if they happen once
  } = options;

  useEffect(() => {
    if (!containerRef?.current || !imageRef?.current) return;

    const ctx = gsap.context(() => {
      // Initial state
      gsap.set(imageRef.current, {
        opacity: 0,
        y: yOffset,
        scale: 1.05, // Slight scale-down effect adds to premium feel
      });

      gsap.to(imageRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.5,
        ease: ease,
        scrollTrigger: {
          trigger: containerRef.current,
          start: start,
          end: end,
          scrub: once ? false : scrub,
          once: once,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef, imageRef, start, end, yOffset, scrub, ease, once]);
}
