'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import '../../styles/menu.scss';

const navItems = [
  {
    title: 'About Us',
    url: '/about',
    subLinks: [
      { title: 'About Us', url: '/about' },
      { title: 'Our Vision', url: '/about/vision' },
      { title: 'Our Mission', url: '/about/mission' },
      { title: 'Our Motto', url: '/about/motto' },
      { title: 'School Managing Committee', url: '/about/committee' },
      { title: 'Principal’s Message', url: '/about/principals-message' },
    ],
  },
  {
    title: 'Admissions',
    url: '/admissions',
    subLinks: [
      { title: 'Admission Process', url: '/admissions/process' },
      { title: 'Fee Structure', url: '/admissions/fees' },
      { title: 'Apply Now', url: '/admissions/apply' },
    ],
  },
  {
    title: 'Academic',
    url: '/academic',
    subLinks: [
      { title: 'Curriculum — CISCE', url: '/academic/curriculum' },
      { title: 'Departments', url: '/academic/departments' },
      { title: 'Library & Labs', url: '/academic/library' },
    ],
  },
  {
    title: 'Boarding',
    url: '/boarding',
    subLinks: [
      { title: 'Facilities', url: '/boarding/facilities' },
      { title: 'Daily Life', url: '/boarding/daily-life' },
      { title: 'Pastoral Care', url: '/boarding/pastoral' },
    ],
  },
  {
    title: 'Co-Curricular',
    url: '/co-curricular',
    subLinks: [
      { title: 'Sports & Athletics', url: '/co-curricular/sports' },
      { title: 'Arts & Music', url: '/co-curricular/arts' },
      { title: 'Clubs & Societies', url: '/co-curricular/clubs' },
    ],
  },
  {
    title: 'Media',
    url: '/media',
    subLinks: [
       { title: 'Latest News', url: '/media/news' },
       { title: 'Gallery', url: '/media/gallery' },
       { title: 'Videos', url: '/media/videos' },
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
  const menuListRef = useRef(null);
  const subMenuRef = useRef(null);
  const headerRef = useRef(null);

  const [activeLevel, setActiveLevel] = useState('main'); // 'main' or 'sub'
  const [activeCategory, setActiveCategory] = useState(null);

  // ─── Initial hidden state ────────────────────────────────────────────────
  useEffect(() => {
    gsap.set(overlayRef.current, { visibility: 'hidden', opacity: 0 });
    gsap.set(subMenuRef.current, { xPercent: 100, display: 'none' });
  }, []);

  // ─── Handle Open/Close ────────────────────────────────────────────────────
  useEffect(() => {
    const tl = gsap.timeline();

    if (isOpen) {
      gsap.set(overlayRef.current, { visibility: 'visible' });
      tl.to(overlayRef.current, {
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out'
      }).fromTo(headerRef.current, 
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, "-=0.3"
      ).fromTo('.ds-menu-item', 
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power2.out' }, "-=0.3"
      );
    } else {
      tl.to('.ds-menu-item', {
        x: 30,
        opacity: 0,
        duration: 0.3,
        stagger: { each: 0.03, from: 'end' },
        ease: 'power2.in'
      }).to(overlayRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: 'power3.in',
        onComplete: () => {
          gsap.set(overlayRef.current, { visibility: 'hidden' });
          setActiveLevel('main');
          setActiveCategory(null);
          gsap.set(menuListRef.current, { xPercent: 0, opacity: 1 });
          gsap.set(subMenuRef.current, { xPercent: 100, display: 'none' });
        }
      });
    }
  }, [isOpen]);

  // ─── Transition between Levels ───────────────────────────────────────────
  const handleCategoryClick = (category) => {
    if (category.subLinks.length === 0) {
      onClose();
      return;
    }
    setActiveCategory(category);
    setActiveLevel('sub');

    const tl = gsap.timeline();
    tl.to(menuListRef.current, {
      xPercent: -20,
      opacity: 0,
      duration: 0.5,
      ease: 'power3.inOut'
    });
    
    gsap.set(subMenuRef.current, { display: 'flex' });
    tl.fromTo(subMenuRef.current, 
      { xPercent: 100, opacity: 0 },
      { xPercent: 0, opacity: 1, duration: 0.6, ease: 'power4.out' }, "-=0.3"
    ).fromTo('.ds-submenu-item', 
      { x: 20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.4, stagger: 0.04, ease: 'power2.out' }, "-=0.2"
    );
  };

  const handleBack = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        setActiveLevel('main');
        setActiveCategory(null);
        gsap.set(subMenuRef.current, { display: 'none' });
      }
    });

    tl.to(subMenuRef.current, {
      xPercent: 100,
      opacity: 0,
      duration: 0.5,
      ease: 'power3.inOut'
    });

    tl.to(menuListRef.current, {
      xPercent: 0,
      opacity: 1,
      duration: 0.6,
      ease: 'power4.out'
    }, "-=0.3");
  };

  return (
    <div className="ds-menu-overlay" ref={overlayRef}>
      
      <div className="ds-menu-header" ref={headerRef}>
        <div className="ds-header-left">
          {activeLevel === 'sub' ? (
            <button className="ds-back-pill" onClick={handleBack}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              <span>Menu</span>
            </button>
          ) : (
            <span className="ds-menu-label">Menu</span>
          )}
        </div>
        <button className="ds-close-cross" onClick={onClose} aria-label="Close Menu">
           <span>Close</span>
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
             <path d="M18 6L6 18M6 6l12 12" />
           </svg>
        </button>
      </div>

      <div className="ds-menu-viewport">
        
        {/* Level 1: Main Menu */}
        <nav className="ds-menu-list" ref={menuListRef}>
          <ul className="ds-items-container">
            {navItems.map((item, index) => (
              <li key={index} className="ds-menu-item">
                <button 
                  className="ds-item-link"
                  onClick={() => handleCategoryClick(item)}
                >
                  <span className="ds-item-title">{item.title}</span>
                  {item.subLinks.length > 0 && (
                    <span className="ds-item-count">
                      {String(item.subLinks.length).padStart(2, '0')}
                    </span>
                  )}
                </button>
                <div className="ds-item-underline" />
              </li>
            ))}
          </ul>
        </nav>

        {/* Level 2: Sub Menu */}
        <nav className="ds-submenu-list" ref={subMenuRef}>
          {activeCategory && (
            <div className="ds-submenu-inner">
               <div className="ds-sub-header">
                  <h2 className="ds-sub-title">{activeCategory.title}</h2>
                  <Link href={activeCategory.url} className="ds-view-all" onClick={onClose}>
                    VIEW ALL
                  </Link>
               </div>
               <ul className="ds-sub-items">
                  {activeCategory.subLinks.map((sub, j) => (
                    <li key={j} className="ds-submenu-item">
                      <Link href={sub.url} className="ds-sub-link" onClick={onClose}>
                        <span className="ds-sub-text">{sub.title}</span>
                        <svg className="ds-sub-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </Link>
                      <div className="ds-sub-underline" />
                    </li>
                  ))}
               </ul>
            </div>
          )}
        </nav>

      </div>

      <div className="ds-menu-footer">
        <div className="ds-footer-content">
          <div className="ds-footer-brand">
            <span className="brand-name">K.E. Carmel School</span>
            <span className="brand-loc">Bankura, WB</span>
          </div>
          <div className="ds-footer-cta">
            <a href="tel:+917865964842" className="footer-call">
              +91 78659 64842
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}
