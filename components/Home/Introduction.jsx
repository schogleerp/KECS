'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AwwwardsButton from '../UI/AwwwardsButton';
import '../../styles/introduction.scss';

gsap.registerPlugin(ScrollTrigger);

export default function Introduction() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = textRef.current.innerText.split(' ');
      textRef.current.innerHTML = words
        .map(word => `<span class="intro-word" style="display:inline-block; opacity:0; transform:translateY(20px)">${word}</span>`)
        .join(' ');

      // Word-level reveal
      gsap.to(".intro-word", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        }
      });

      // Sidebar content reveal
      gsap.from(".intro-side-meta", {
        opacity: 0,
        y: 30,
        duration: 1.5,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%'
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="intro-section" ref={sectionRef}>
      <div className="intro-layout">
        <div className="intro-side-meta">
          <span className="intro-subtitle">02 / INSTITUTIONAL IDENTITY</span>
          <div className="intro-establishment">REGISTRY EST. 2004</div>
        </div>

        <div className="intro-main-content">
          <h2 className="intro-heading" ref={textRef}>
            We mould globally competent citizens through an environment of academic excellence, moral integrity, and social awareness.
          </h2>
          
          <div className="intro-details">
            <p className="intro-paragraph">
              A premier hub for holistic learning, K.E. Carmel School stands as a testament to the educational vision of Saint Kuriakose Elias Chavara, nurturing original thinkers since 2004.
            </p>
            
            <div className="intro-cta">
              <AwwwardsButton href="/about">Discover Our Journey</AwwwardsButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



