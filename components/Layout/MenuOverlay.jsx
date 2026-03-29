'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { STATS, PILLARS } from '../../constants/aboutContent';
import '../../styles/menu.scss';

const navItems = [
  {
    title: 'About Us',
    url: '/about',
    preview: {
      tag: 'THE INSTITUTION',
      title: 'About Us',
      text: 'Eight decades of faith, formation & excellence — rooted in the values of Saint Kuriakose Elias Chavara and the CMI congregation.',
      image: '/images/about-group-students.png',
      link: 'EXPLORE THE INSTITUTION',
      stats: STATS.map(s => ({ value: s.value, label: s.label })),
      highlights: PILLARS.map(p => p.title)
    },
    subLinks: [
      { 
        title: 'About Us', 
        url: '/about', 
        preview: {
          tag: 'THE INSTITUTION',
          title: 'About Us',
          text: 'Eight decades of faith, formation & excellence — rooted in the values of Saint Kuriakose Elias Chavara and the CMI congregation.',
          image: '/images/about-group-students.png',
          link: 'EXPLORE THE INSTITUTION',
          stats: STATS.slice(0, 3).map(s => ({ value: s.value, label: s.label })),
          highlights: ['Heritage', 'Inclusivity', 'Vision 2030']
        }
      },
      { 
        title: 'Our Vision', 
        url: '/about/vision', 
        preview: {
          tag: 'THE VISION',
          title: 'Our Vision',
          text: 'Reason must be guided by Faith, and Faith by Reason. We mould globally competent citizens through education beyond discrimination.',
          image: '/images/vision-heritage.png',
          link: 'EXPLORE OUR VISION',
          stats: STATS.slice(1, 4).map(s => ({ value: s.value, label: s.label })),
          highlights: PILLARS.map(p => p.title)
        }
      },
      { 
        title: 'Our Mission', 
        url: '/about/mission',
        preview: {
          tag: 'THE MISSION',
          title: 'Agents of Social Change',
          text: 'Character formation, mental strength, and intellectual expansion. We aim to create a just society where personhood and cultural heritage are upheld.',
          image: '/images/mission-heritage.png',
          link: 'LEARN OUR MISSION'
        }
      },
      { 
        title: 'Our Motto', 
        url: '/about/motto',
        preview: {
          tag: 'THE MOTTO',
          title: 'To Plant and Nurture',
          text: 'Representing value-laden Kinship, Excellence, and Character. We plant seeds of divine wisdom and nurture their growth with dedication and love.',
          image: '/images/motto-heritage.png',
          link: 'DISCOVER THE MOTTO'
        }
      },
      { 
        title: 'School Managing Committee', 
        url: '/about/committee',
        preview: {
          tag: 'COMMITTEE',
          title: 'Trustees of the Future',
          text: 'Managed by the C.M.I Dharmanivas Educational Trust (DET). A board dedicated to integral development and quality education in rural West Bengal.',
          image: '/images/committee-heritage.png',
          link: 'MEET THE COMMITTEE'
        }
      },
      { 
        title: 'PRINCIPAL’S MESSAGE', 
        url: '/about/principals-message',
        preview: {
          tag: 'LEADERSHIP',
          title: 'Learning to Learn',
          text: 'In the age of Artificial Intelligence, we prepare students to face uncertainty with adaptability, confidence, commitment, and passion.',
          image: '/images/principal-heritage.png',
          link: 'READ THE MESSAGE'
        }
      },
    ],
  },
  {
    title: 'Admissions',
    url: '/admissions',
    preview: {
      tag: 'ADMISSIONS',
      title: 'Joining Our Community',
      text: 'Explore our inclusive admission process and fee structure for the 2025–26 academic session.',
      image: '/images/pillar_academic.png',
      link: 'START APPLICATION'
    },
    subLinks: [
      { title: 'Admission Process', url: '/admissions/process', count: '03' },
      { title: 'Fee Structure', url: '/admissions/fees', count: '04' },
      { title: 'Apply Now', url: '/admissions/apply', count: null },
    ],
  },
  {
    title: 'Academic',
    url: '/academic',
    preview: {
      tag: 'ACADEMICS',
      title: 'Intellectual Expansion',
      text: 'Follow the world-class CISCE curriculum designed for holistic student development.',
      image: '/images/pillar_cisce.png',
      link: 'VIEW CURRICULUM'
    },
    subLinks: [
      { title: 'Curriculum — CISCE', url: '/academic/curriculum', count: '01' },
      { title: 'Departments', url: '/academic/departments', count: '08' },
      { title: 'Library & Labs', url: '/academic/library', count: '05' },
    ],
  },
  {
    title: 'Boarding',
    url: '/boarding',
    preview: {
      tag: 'BOARDING',
      title: 'A Home Away from Home',
      text: 'Our boarding facilities provide a nurturing environment focused on pastoral care and balanced student life.',
      image: '/images/facility_boarding.png',
      link: 'EXPLORE FACILITIES'
    },
    subLinks: [
      { title: 'Facilities', url: '/boarding/facilities', count: '06' },
      { title: 'Daily Life', url: '/boarding/daily-life', count: null },
      { title: 'Pastoral Care', url: '/boarding/pastoral', count: null },
    ],
  },
  {
    title: 'Co-Curricular',
    url: '/co-curricular',
    preview: {
      tag: 'CO-CURRICULAR',
      title: 'Beyond Academic Borders',
      text: 'Nurture physical, artistic, and social skills through our diverse clubs and athletics programs.',
      image: '/images/pillar_legacy.png',
      link: 'SEE ACTIVITIES'
    },
    subLinks: [
      { title: 'Sports & Athletics', url: '/co-curricular/sports', count: '07' },
      { title: 'Arts & Music', url: '/co-curricular/arts', count: '05' },
      { title: 'Clubs & Societies', url: '/co-curricular/clubs', count: '12' },
    ],
  },
  {
    title: 'Contact',
    url: '/contact',
    subLinks: [],
  },
];

export default function MenuOverlay({ isOpen, onClose }) {
  const overlayRef = useRef(null);
  const col1Ref = useRef(null);
  const col2Ref = useRef(null);
  const col2InnerRef = useRef(null);
  const linkRefs = useRef([]);
  const subLinkRefs = useRef([]);

  const [activeIndex, setActiveIndex] = useState(null);
  const [hoveredSubLink, setHoveredSubLink] = useState(null);
  const [isSubView, setIsSubView] = useState(false); // Mobile drill-down state

  // ─── Initial hidden state ────────────────────────────────────────────────
  useEffect(() => {
    gsap.set(overlayRef.current, { pointerEvents: 'none', visibility: 'hidden' });
    gsap.set([col1Ref.current, col2Ref.current, '.ds-col--preview'], { xPercent: -100, opacity: 0 });
  }, []);

  // ─── Reset states on close ──────────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) { 
      setTimeout(() => {
        setIsSubView(false);
        setActiveIndex(null);
        setHoveredSubLink(null);
      }, 500); 
    }
  }, [isOpen]);

  // ─── Open / Close ────────────────────────────────────────────────────────
  useEffect(() => {
    if (isOpen) {
      gsap.set(overlayRef.current, { visibility: 'visible', pointerEvents: 'auto' });

      const tl = gsap.timeline();

      // Cinematic Left-to-Right staggered entrance
      tl.to([col1Ref.current, col2Ref.current, '.ds-col--preview'], {
        xPercent: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power4.out',
      });

      // Nav links stagger in
      tl.fromTo(
        linkRefs.current.filter(Boolean),
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.04, ease: 'power2.out' },
        "-=0.5"
      );

      // Default to first item and its sub-links
      if (window.innerWidth > 1024) setActiveIndex(0);

    } else {
      gsap.set(overlayRef.current, { pointerEvents: 'none' });

      // Slide everything back to the left
      gsap.to([col1Ref.current, col2Ref.current, '.ds-col--preview'], {
        xPercent: -100,
        opacity: 0,
        duration: 0.6,
        stagger: { each: 0.05, from: "end" },
        ease: 'power3.in',
        onComplete: () => {
          gsap.set(overlayRef.current, { visibility: 'hidden' });
        },
      });
    }
  }, [isOpen]);

  // ─── Transition logic for Columns ────────────────────────────────────────
  useEffect(() => {
    if (activeIndex === null) return;

    const item = navItems[activeIndex];
    const isMobile = window.innerWidth <= 1024;

    if (item.subLinks.length > 0) {
      if (isMobile && isSubView) {
        // Mobile Drill-down: Slide col1 out, col2 in
        gsap.to(col1Ref.current, { xPercent: -100, duration: 0.5, ease: 'power4.inOut' });
        gsap.to(col2Ref.current, { xPercent: 0, duration: 0.5, ease: 'power4.inOut' });
      } else if (!isMobile) {
        // Desktop: Slide col2 in from the right of col1 (but centered relative to screen)
        gsap.to(col2Ref.current, { xPercent: 0, duration: 0.45, ease: 'power3.out' });
      }

      // Animate sub-links
      gsap.fromTo(
        subLinkRefs.current.filter(Boolean),
        { opacity: 0, x: 10 },
        { opacity: 1, x: 0, duration: 0.35, stagger: 0.06, ease: 'power2.out', delay: 0.15 }
      );
    } else {
      // No sub-links — reverse
      if (isMobile) {
        gsap.to(col1Ref.current, { xPercent: 0, duration: 0.5, ease: 'power4.inOut' });
        gsap.to(col2Ref.current, { xPercent: 100, duration: 0.5, ease: 'power4.inOut' });
      } else {
        gsap.to(col2Ref.current, { xPercent: 100, duration: 0.35, ease: 'power3.in' });
      }
    }
  }, [activeIndex, isSubView]);

  // Keyboard close
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape' && isOpen) onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // Reset hover state when category changes
  useEffect(() => {
    setHoveredSubLink(null);
  }, [activeIndex]);

  const activeItem = activeIndex !== null ? navItems[activeIndex] : null;

  // ─── Fallback Preview Logic ─────────────────────────────────────────────────
  const currentPreview = (hoveredSubLink && hoveredSubLink.preview) || (activeItem && activeItem.preview);

  // ─── GSAP: Animate preview panel on change (rich editorial previews) ────────
  useEffect(() => {
    if (!currentPreview) return;
    const targets = [
      '.ds-inst-badge',
      '.ds-inst-tag',
      '.ds-inst-heading',
      '.ds-inst-body',
      '.ds-inst-stats',
      '.ds-inst-divider',
      '.ds-inst-highlights',
      '.ds-inst-cta',
    ];
    // Kill any ongoing tweens on these targets
    targets.forEach(sel => {
      const el = document.querySelector(sel);
      if (el) gsap.killTweensOf(el);
    });
    gsap.fromTo(
      targets.filter(sel => document.querySelector(sel)),
      { y: 18, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.65, stagger: 0.07, ease: 'power3.out', clearProps: 'transform,opacity' }
    );
    // Image ken-burns
    const bg = document.querySelector('.ds-inst-bg img');
    if (bg) {
      gsap.fromTo(bg, { scale: 1.08 }, { scale: 1.0, duration: 8, ease: 'power1.out' });
    }
  }, [currentPreview]);

  return (
    <div className={`ds-menu-overlay ${isSubView ? 'is-sub-active' : ''}`} ref={overlayRef} aria-hidden={!isOpen}>

      {/* ── COLUMN 1: Primary Navigation ─────────────────────────────── */}
      <nav className="ds-col ds-col--primary" ref={col1Ref} aria-label="Main navigation">

        <ul className="ds-primary-list">
          {navItems.map((item, i) => (
            <li key={i}>
              <button
                ref={el => (linkRefs.current[i] = el)}
                className={`ds-primary-link ${activeIndex === i ? 'is-active' : ''}`}
                onMouseEnter={() => {
                   if (window.innerWidth > 1024) setActiveIndex(i);
                }}
                onClick={() => {
                  if (item.subLinks.length === 0) { onClose(); return; }
                  setActiveIndex(i);
                  setIsSubView(true);
                }}
              >
                {item.title}
              </button>
            </li>
          ))}
        </ul>

        <div className="ds-col-footer">
          <a
            href="tel:+917865964842"
            className="ds-call-pill"
          >
            CALL <span>+91 78659 64842</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </nav>

      {/* ── COLUMN 2: Sub Navigation ──────────────────────────────────── */}
      <div
        className={`ds-col ds-col--secondary`}
        ref={col2Ref}
        onMouseLeave={() => setHoveredSubLink(null)}
      >
        {/* Close button */}
        <button
          className="ds-close-btn"
          onClick={onClose}
        >
          ×
        </button>

        <div className="ds-col2-inner" ref={col2InnerRef}>
          {activeItem && activeItem.subLinks.length > 0 && (
            <>
              {/* Back Button (Mobile Only) */}
              <button 
                className="ds-back-btn" 
                onClick={() => {
                  setIsSubView(false);
                  gsap.to(col2Ref.current, { xPercent: 100, duration: 0.5, ease: 'power4.inOut' });
                  gsap.to(col1Ref.current, { xPercent: 0, duration: 0.5, ease: 'power4.inOut' });
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Main Menu
              </button>

              {/* See All link */}
              <Link
                href={activeItem.url}
                className="ds-see-all"
                onClick={onClose}
              >
                See All
                <span className="ds-see-all__count">
                  ({String(activeItem.subLinks.length).padStart(2, '0')})
                </span>
              </Link>

              <div className="ds-sub-divider" />

              <ul className="ds-sub-list">
                {activeItem.subLinks.map((sub, j) => (
                  <li key={`${activeIndex}-${j}`}>
                    <Link
                      href={sub.url}
                      className={`ds-sub-link ${hoveredSubLink === sub ? 'is-hovered' : ''}`}
                      ref={el => (subLinkRefs.current[j] = el)}
                      onClick={onClose}
                      onMouseEnter={() => setHoveredSubLink(sub)}
                    >
                      <span className="ds-sub-link__title">{sub.title}</span>
                      {sub.count && (
                        <span className="ds-sub-link__count">
                          {sub.count}
                        </span>
                      )}
                      <svg className="ds-sub-link__arrow" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                    <div className="ds-sub-divider" />
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>

      {/* ── COLUMN 3 & 4: Immersive "Mini-Landing Page" Preview Zone ───────────────── */}
      <div className={`ds-col ds-col--preview ${currentPreview ? 'is-visible' : ''}`}>
        <div className="ds-preview-inner">
          {currentPreview && (
            <div
              className="ds-preview-content ds-preview-institutional"
              key={currentPreview.title + (currentPreview.tag || '')}
            >
              {/* Full-bleed background image with Ken-Burns */}
              <div className="ds-inst-bg">
                <img src={currentPreview.image} alt={currentPreview.title} />
              </div>

              {/* Cinematic structural overlay */}
              <div className="ds-inst-overlay" />

              {/* Architectural Grid Intersections (Sync with Eyesight) */}
              <div className="ds-preview-grid">
                <div className="ds-line-v col-6" />
                <div className="ds-line-v col-9" />
                <div className="ds-line-h row-mid" />
              </div>

              {/* Content layer */}
              <div className="ds-inst-content">

                {/* Institutional branding removed for minimalist cinematic feel */}

                {/* Main Reveal Text */}
                <div className="ds-inst-main">
                  <div className="ds-inst-tag">
                    <span>{currentPreview.tag || 'MANAGED BY CMI'}</span>
                  </div>
                  <h4 className="ds-inst-heading">{currentPreview.title}</h4>
                  <p className="ds-inst-body">{currentPreview.text}</p>
                </div>

                {/* Footer Interaction Zone */}
                <div className="ds-inst-footer">
                  {/* Stats strip - conditionally rendered if data exists */}
                  {currentPreview.stats && (
                    <div className="ds-inst-stats">
                      {currentPreview.stats.map((s, i) => (
                        <div key={i} className="ds-inst-stat">
                          <strong>{s.value}</strong>
                          <span>{s.label}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <Link
                    href={hoveredSubLink ? hoveredSubLink.url : (activeItem ? activeItem.url : '/')}
                    className="ds-inst-cta"
                    onClick={onClose}
                  >
                    <span>EXPLORE THIS CHAPTER</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>

              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
