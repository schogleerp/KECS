'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useArchitecturalLines } from '../../hooks/useArchitecturalLines';
import MagneticLink from '../UI/MagneticLink';
import AwwwardsButton from '../UI/AwwwardsButton';
import '../../styles/manners.scss';

gsap.registerPlugin(ScrollTrigger);

export default function MannersMakythMan() {
  const sectionRef = useRef(null);
  const blocksRef = useRef([]);
  const lineTopRef = useRef(null);
  const lineV1Ref = useRef(null);
  const lineV2Ref = useRef(null);

  useArchitecturalLines(sectionRef, [
    { ref: lineTopRef, axis: 'x' },
    { ref: lineV1Ref, axis: 'y' },
    { ref: lineV2Ref, axis: 'y' }
  ]);
  
  useEffect(() => {
    gsap.fromTo(
      blocksRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' }
      }
    );
  }, []);

  return (
    <section className="admissions-portals-section ds-section-border" ref={sectionRef}>
      <div className="ds-line-h" style={{ top: 0 }} ref={lineTopRef} />
      
      <div className="ap-grid">
        {/* Admissions Block (Col 1-4) */}
        <div className="ap-block" ref={el => blocksRef.current[0] = el}>
          <span className="ap-kicker">01</span>
          <h3 className="ap-title">Admissions</h3>
          <p className="ap-desc">An introduction to joining at 13+</p>
          <AwwwardsButton href="#admissions">Explore Process</AwwwardsButton>
        </div>

        <div className="ds-line-v hide-mobile" style={{ left: '33.33%', top: 0 }} ref={lineV1Ref} />

        {/* Extra-Curricular Block (Col 5-8) */}
        <div className="ap-block" ref={el => blocksRef.current[1] = el}>
          <span className="ap-kicker">02</span>
          <h3 className="ap-title">Beyond Academics</h3>
          <p className="ap-desc">Discover our Extra-curriculars</p>
          <AwwwardsButton href="#extra">View Activities</AwwwardsButton>
        </div>

        <div className="ds-line-v hide-mobile" style={{ left: '66.66%', top: 0 }} ref={lineV2Ref} />

        {/* Portals Block (Col 9-12) */}
        <div className="ap-block portals-block" ref={el => blocksRef.current[2] = el}>
          <div className="portals-inner">
            <span className="ap-kicker">03</span>
            <h3 className="ap-title">Access Portals</h3>
            <ul className="portal-list">
                <li><MagneticLink href="https://kecarmelbankura.in/main/parentlogin.aspx" target="_blank" rel="noopener noreferrer">Parents Portal</MagneticLink></li>
                <li><MagneticLink href="https://kecarmelbankura.in/main/" target="_blank" rel="noopener noreferrer">Staff Portal</MagneticLink></li>
                <li><MagneticLink href="#pupils">Pupils Portal</MagneticLink></li>
            </ul>
          </div>
          <div className="enquiries-inner">
            <h3 className="ap-title small">General Enquiries</h3>
            <p>+91 78659 64842</p>
            <p>kecsbankura@gmail.com</p>
          </div>
        </div>
      </div>
    </section>
  );
}
