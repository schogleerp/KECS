'use client';
import { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../../styles/ourstrengths.scss';

gsap.registerPlugin(ScrollTrigger);

const strengthsData = [
  {
    id: '01',
    title: 'Christian Catholic Heritage',
    desc: 'Managed by Christian Catholic Carmelite Fathers from Kerala. Built upon a foundation of profound educational excellence.',
    image: '/images/pillar_legacy.png',
  },
  {
    id: '02',
    title: 'I.C.S.E Syllabus Education',
    desc: 'A well organized co-educational school following the rigorous and holistic I.C.S.E curriculum.',
    image: '/images/pillar_cisce.png',
  },
  {
    id: '03',
    title: 'Integral Formation',
    desc: 'Imparted with integral formation by a highly competent and permanently committed teaching faculty.',
    image: '/images/pillar_formation.png',
  }
];

export default function OurStrengths() {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);
  const listRef = useRef(null);

  useEffect(() => {
    let mm = gsap.matchMedia(sectionRef);

    mm.add("(min-width: 769px)", () => {
      // REMOVED: Deep Variable Parallax (Decor-Style Staggered)

      // Reveal each strength row
      const rows = gsap.utils.toArray('.os-works-row');
      rows.forEach((row, index) => {
        const imageInset = row.querySelector('.os-image-inset');
        
        // Clip-path wipe for image (One-time reveal)
        gsap.fromTo(imageInset, 
          { clipPath: 'inset(0 0 100% 0)' },
          { 
            clipPath: 'inset(0 0 0 0)', 
            duration: 1.5,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: row,
              start: 'top 85%', 
              once: true
            }
          }
        );
      });
    });

    // Mobile specific fades
    mm.add("(max-width: 768px)", () => {
      const rows = gsap.utils.toArray('.os-v-row');
      rows.forEach((row) => {
        gsap.from(row, {
           y: 40,
           opacity: 0,
           duration: 1,
           ease: 'power3.out',
           scrollTrigger: {
             trigger: row,
             start: 'top 90%'
           }
        });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section className="os-section ds-section-border" ref={sectionRef}>
      {/* Top identifier bar */}
      <div className="os-topbar">
        <div className="os-topbar-left">
          <span className="os-topbar-rule" />
          <span className="os-topbar-label">OUR FOUNDATION</span>
        </div>
        <span className="os-topbar-index">06</span>
      </div>

      <div className="os-header">
        <h2>Core Strengths.</h2>
      </div>

      <div className="os-scroll-window">
        <div className="os-works-list" ref={listRef}>
          {strengthsData.map((st, i) => (
          <div className="os-works-row" key={st.id} ref={el => itemsRef.current[i] = el}>
            {/* Horizontal terminal lines */}
            <div className="ds-border-anim-h top"></div>

            {/* Image Block (60%) - Anchored to Left with Inset Gap */}
            <div className="os-works-image">
              <div className="os-image-inset">
                <Image 
                  src={st.image}
                  alt={st.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
              </div>
              {/* Vertical Divider Line with Gapping (End of column) */}
              <div className="ds-border-anim-v divider"></div>
            </div>

            {/* Text Block (40%) - Anchored to Right */}
            <div className="os-works-text">
              <div className="os-text-inner">
                <span className="ds-label-small">STRENGTH {st.id}</span>
                <h3 className="os-works-title">{st.title}</h3>
                <div className="os-detailed-explaining">
                  <p>{st.desc}</p>
                  <ul className="os-benefit-list">
                    <li>Modernized architectural infrastructure.</li>
                    <li>User-centric environment for growth.</li>
                    <li>Precision-engineered learning spaces.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* Final closing terminal line */}
        <div className="ds-border-anim-h bottom"></div>
      </div>
      </div>
    </section>
  );
}
