'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../../styles/quote.scss';

gsap.registerPlugin(ScrollTrigger);

export default function QuoteSection() {
  const quoteRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(quoteRef.current,
      { yPercent: 110, opacity: 0 },
      {
        yPercent: 0, opacity: 1, duration: 1.4, ease: 'power4.out',
        scrollTrigger: { trigger: quoteRef.current, start: 'top 85%' }
      }
    );
  }, []);

  return (
    <section className="quote-section">
      <div className="quote-container" style={{ overflow: 'hidden' }}>
        <h2 ref={quoteRef} style={{ display: 'block', willChange: 'transform' }}>
          “Intellectual freedom is valuable not just for its own sake but also for its essential role in enabling the pursuit of truth and sharing of knowledge.”
        </h2>
      </div>
    </section>
  );
}
