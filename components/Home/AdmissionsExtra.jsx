'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useArchitecturalLines } from '../../hooks/useArchitecturalLines';
import MagneticLink from '../UI/MagneticLink';
import '../../styles/admissionsExtra.scss';

gsap.registerPlugin(ScrollTrigger);

export default function AdmissionsExtra() {
  const sectionRef   = useRef(null);
  const lineTopRef   = useRef(null);
  const lineRightRef = useRef(null);

  useArchitecturalLines(sectionRef, [
    { ref: lineRightRef, axis: 'y' },
  ]);
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Watermark Parallax
      gsap.to(".block-watermark", {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });

      // Content Stagger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%'
        }
      });

      tl.from(".block-header", { y: 30, opacity: 0, duration: 1, stagger: 0.2, ease: 'power3.out' })
        .from(".admissions-list li", { 
          x: -30, 
          opacity: 0, 
          duration: 1, 
          stagger: 0.1, 
          ease: 'power3.out' 
        }, "-=0.5");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="admissions-extra-section ds-section-border" ref={sectionRef} style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="ds-line-v hide-mobile" style={{ left: '50%', top: 0, height: '100%' }} ref={lineRightRef} />
      
      <div className="admissions-wrapper">
        {/* Block 1: Admissions */}
        <div className="admissions-block admissions-bg">
          <div className="block-watermark" data-text="ADMISSIONS">ADMISSIONS</div>
          
          <div className="block-header">
            <span className="block-num">01</span>
            <h3>Admissions</h3>
          </div>

          <ul className="admissions-list">
            <li>
              <div className="list-item-header">
                <h4>13+ Entry</h4>
                <div className="item-line"></div>
              </div>
              <p>Entry at 13+ for boys | Full boarding</p>
              <MagneticLink href="#13">Discover more</MagneticLink>
            </li>
            <li>
              <div className="list-item-header">
                <h4>16+ Entry</h4>
                <div className="item-line"></div>
              </div>
              <p>Entry at 16+ for boys & girls | Day and boarding</p>
              <MagneticLink href="#16">Find out more</MagneticLink>
            </li>
            <li>
              <div className="list-item-header">
                <h4>16+ Girls Boarding</h4>
                <div className="item-line"></div>
              </div>
              <p>Sixth Form girls boarding | Available from September 2026</p>
              <MagneticLink href="#16girls">Discover more</MagneticLink>
            </li>
            <li>
              <div className="list-item-header">
                <h4>Visit Us</h4>
                <div className="item-line"></div>
              </div>
              <p>Join us at one of our open events held throughout the year</p>
              <MagneticLink href="#visit">Book a visit</MagneticLink>
            </li>
          </ul>
        </div>

        {/* Block 2: Extra-curricular */}
        <div className="admissions-block extra-bg">
          <div className="block-watermark" data-text="STUDENT LIFE">STUDENT LIFE</div>

          <div className="block-header">
            <span className="block-num">02</span>
            <h3>Extra-curricular</h3>
          </div>

          <ul className="admissions-list">
            <li>
              <div className="list-item-header">
                <h4>Music</h4>
                <div className="item-line"></div>
              </div>
              <p>Performance opportunities for all levels, promoting musical excellence and participation.</p>
              <MagneticLink href="#music">Learn more</MagneticLink>
            </li>
            <li>
              <div className="list-item-header">
                <h4>Sport</h4>
                <div className="item-line"></div>
              </div>
              <p>From elite performers to enthusiastic beginners, every pupil’s sporting contribution counts.</p>
              <MagneticLink href="#sport">Discover more</MagneticLink>
            </li>
            <li>
              <div className="list-item-header">
                <h4>The Arts</h4>
                <div className="item-line"></div>
              </div>
              <p>Pupils benefit from exceptional facilities, expert staff, and a vibrant programme of activities.</p>
              <MagneticLink href="#arts">Learn more</MagneticLink>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
