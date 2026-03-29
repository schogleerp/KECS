'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useArchitecturalLines } from '../../hooks/useArchitecturalLines';
import MagneticLink from '../UI/MagneticLink';
import '../../styles/news.scss';

gsap.registerPlugin(ScrollTrigger);

const newsItems = [
  { title: "Sailing Highlights from National Regatta", category: "Sport", date: "15 Oct 2024", image: "https://images.unsplash.com/photo-1544458514-6ba964fae1fa?q=80&w=800&auto=format&fit=crop" },
  { title: "Choir's Evensong Broadcast on BBC Radio 3", category: "Music", date: "10 Oct 2024", image: "https://images.unsplash.com/photo-1514330833152-edaf5d5cb2bd?q=80&w=800&auto=format&fit=crop" },
  { title: "Oxbridge Offers for Science and Mathematics", category: "Academic", date: "02 Oct 2024", image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop" }
];

export default function NewsGrid() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const lineTopRef = useRef(null);
  const lineGridTopRef = useRef(null);
  const lineV1Ref = useRef(null);
  const lineV2Ref = useRef(null);

  useArchitecturalLines(sectionRef, [
    { ref: lineTopRef, axis: 'x' },
    { ref: lineGridTopRef, axis: 'x' },
    { ref: lineV1Ref, axis: 'y' },
    { ref: lineV2Ref, axis: 'y' }
  ]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // News BG Title Parallax
      gsap.to(".bg-title-inner", {
        yPercent: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });

      // Cards Stagger Reveal
      gsap.from(cardsRef.current, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%'
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="news-section ds-section-border" ref={sectionRef}>
      {/* Massive Background Heading */}
      <div className="news-bg-title hide-mobile">
        <span className="bg-title-inner">NEWS</span>
      </div>

      <div className="news-header">
        <div className="header-left">
          <span className="section-label">UPDATES / FRONTLINE</span>
          <h2>News & Highlights</h2>
        </div>
        <MagneticLink href="#all-news">View All News</MagneticLink>
      </div>

      <div className="news-grid-container">
        {/* Vertical Architectural Lines */}
        <div className="ds-line-v hide-mobile" style={{ left: '33.33%', top: 0, height: '100%' }} ref={lineV1Ref} />
        <div className="ds-line-v hide-mobile" style={{ left: '66.66%', top: 0, height: '100%' }} ref={lineV2Ref} />

        <div className="news-grid">
          {newsItems.map((item, i) => (
            <div className="news-card" key={i} ref={el => cardsRef.current[i] = el}>
              <div className="news-image">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image} alt={item.title} />
                <div className="image-overlay"></div>
              </div>
              <div className="news-content">
                <div className="news-meta">
                  <span className="category">{item.category}</span>
                  <span className="item-line"></span>
                  <span className="date">{item.date}</span>
                </div>
                <h3>{item.title}</h3>
                <div className="news-read-more">
                  <span>Read Article</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
