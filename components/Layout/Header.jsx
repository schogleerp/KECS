'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MenuOverlay from './MenuOverlay';
import PaymentModal from './PaymentModal';
import '../../styles/header.scss';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Header() {
  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const payBtnRef = useRef(null);
  const menuBtnRef = useRef(null);
  const actionsRef = useRef(null);
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  // --- GSAP Premium Interactions ---
  useGSAP(() => {
    // 1. High-Performance Awwwards Entrance
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' }});
    gsap.set([logoRef.current, actionsRef.current], { opacity: 0, y: 12 });
    tl.to(logoRef.current, { opacity: 1, y: 0, duration: 1.2, delay: 0.8 })
      .to(actionsRef.current, { opacity: 1, y: 0, duration: 1.2 }, "-=0.9");

    // 2. Synchronized Scroll State (Lenis/SmoothScroll Compatible)
    ScrollTrigger.create({
      start: 'top -50',
      onUpdate: (self) => {
        setIsScrolled(self.scroll() > 50);
      }
    });

    // 3. Ultra-Smooth Magnetic System (REMOVED AS REQUESTED)
  }, { scope: headerRef });

  return (
    <>
      <header 
        ref={headerRef}
        className={`site-header-awwwards ${isScrolled ? 'scrolled' : ''} ${!isHome ? 'not-home' : ''}`}
      >
        <div className="header-grid">
          
          <div className="branding-zone" ref={logoRef}>
            <Link href="/" className="logo-anchor">
              <div className="logo-identity">
                <Image 
                  src="/images/kecs-logo.png" 
                  alt="K.E. Carmel School Bankura" 
                  width={240} 
                  height={80} 
                  priority 
                  className="main-logo"
                />
              </div>
            </Link>
          </div>

          <div className="actions-zone" ref={actionsRef}>
            
            <button 
              ref={payBtnRef}
              className="action-btn pay-trigger"
              onClick={() => setIsPayModalOpen(true)}
              aria-label="Pay Institutional Fee"
            >
              <div className="btn-label-stack">
                <span className="label-primary">PAY FEE</span>
              </div>
              <div className="btn-status-stack">
                 <Image src="/images/upi-logo.svg" alt="UPI" width={30} height={12} className="header-upi" />
              </div>
            </button>

            <button 
              ref={menuBtnRef}
              className="action-btn menu-trigger"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Toggle Navigation Index"
            >
              <div className="trigger-icon-architectural">
                <span className="line l-top"></span>
                <span className="line l-mid"></span>
                <span className="line l-bot"></span>
              </div>
              <span className="trigger-label">MENU</span>
            </button>

          </div>

        </div>
      </header>

      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <PaymentModal isOpen={isPayModalOpen} onClose={() => setIsPayModalOpen(false)} />
    </>
  );
}
