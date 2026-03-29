'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../../styles/whoweare.scss';

gsap.registerPlugin(ScrollTrigger);

export default function WhoWeAre() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal items on scroll
      const plates = gsap.utils.toArray('.wa-archive-plate');
      plates.forEach((plate) => {
        gsap.from(plate, {
          y: 60,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: plate,
            start: 'top 85%',
          }
        });
      });

      // Portrait reveal
      gsap.from('.wa-portrait-unit', {
        scale: 0.95,
        opacity: 0,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%'
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="who-we-are" ref={sectionRef}>
      <div className="wa-topbar">
        <div className="wa-topbar-left">
          <span className="wa-topbar-label">ABOUT THE INSTITUTION</span>
        </div>
        <span className="wa-topbar-index">03</span>
      </div>

      <div className="wa-container">
        <div className="wa-grid">
          {/* Portrait Column */}
          <div className="wa-portrait-col">
            <div className="wa-portrait-unit">
              <Image
                src="/images/st-kuriakose-elias-chavara.jpg"
                alt="St. Kuriakose Elias Chavara"
                width={480}
                height={580}
                priority
                className="wa-actual-portrait"
              />
              <div className="wa-portrait-caption">
                <span className="wa-name">Saint Kuriakose Elias Chavara</span>
                <span className="wa-dates">1805 — 1871</span>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div className="wa-content-col" ref={contentRef}>
            <article className="wa-archive-plate">
              <h2 className="wa-plate-title">Heritage & Ownership</h2>
              <p>
                K.E. Carmel Group of Schools, West Bengal belongs to the Christian Catholic Religious 
                Congregation of Carmelites of Mary Immaculate (C.M.I) Fathers. It is solely owned and 
                managed by <strong>C.M.I Dharmanivas Educational Trust (DET)</strong> and <strong>C.M.I. Dharmaniketan Educational Trust (Eastern Region)</strong> 
                under the aegis of Dharmaniketan C.M.I Sub Region, West Bengal of C.M.I St. Joseph’s Province, Trivandrum, Kerala, India.
              </p>
            </article>

            <article className="wa-archive-plate">
              <h2 className="wa-plate-title">The Visionary Saint</h2>
              <p>
                It draws inspiration from <strong>Saint Kuriakose Elias Chavara (1805-71)</strong>, a Saint and Social Reformer of the 
                19th Century in the state of Kerala, India. He is one of the founders of the C.M.I Congregation, which 
                is the first Catholic Religious Congregation for men in India. 
              </p>
            </article>

            <article className="wa-archive-plate">
              <h2 className="wa-plate-title">Integral Formation</h2>
              <p>
                The vision of education provided by C.M.I Congregation focuses exclusively on the 
                integral development of rural areas of India by providing quality education. 
                <strong> K. E. Carmel Group with this noble vision</strong>, flourishes with eight educational 
                institutions in the state of West Bengal. 
              </p>
              
              <div className="wa-archive-stats">
                <div className="wa-stat-card">
                  <span className="wa-stat-val">700+</span>
                  <span className="wa-stat-tag">GLOBAL INSTITUTIONS</span>
                </div>
                <div className="wa-stat-card">
                  <span className="wa-stat-val">08</span>
                  <span className="wa-stat-tag">BENGAL CAMPUSES</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

