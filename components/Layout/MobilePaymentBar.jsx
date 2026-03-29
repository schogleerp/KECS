'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ShieldCheck, ChevronRight } from 'lucide-react';
import PaymentModal from './PaymentModal';
import gsap from 'gsap';

export default function MobilePaymentBar() {
  const [payModalOpen, setPayModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const barRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 150);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Subtle Pulse Animation for the Pay Button
    if (btnRef.current) {
      gsap.to(btnRef.current, {
        scale: 1.03,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div 
        ref={barRef}
        className={`mobile-pay-sticky ${isScrolled ? 'visible' : ''}`}
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          right: '20px',
          zIndex: 1000,
          transform: isScrolled ? 'translateY(0)' : 'translateY(100px)',
          opacity: isScrolled ? 1 : 0,
          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: isScrolled ? 'auto' : 'none'
        }}
      >
        <button 
          ref={btnRef}
          className="mobile-pay-btn" 
          onClick={() => setPayModalOpen(true)}
          style={{
            width: '100%',
            background: '#1a1a1a', // $color-brand-blue
            color: '#fff',
            border: 'none',
            borderRadius: '50px',
            padding: '12px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            cursor: 'pointer',
            overflow: 'hidden',
            position: 'relative'
          }}
        >
           <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
             <div style={{ 
               background: '#9a0000', // $color-brand-red
               width: '32px', 
               height: '32px', 
               borderRadius: '50%', 
               display: 'flex', 
               alignItems: 'center', 
               justifyContent: 'center' 
             }}>
               <ShieldCheck size={18} color="#fff" strokeWidth={2.5} />
             </div>
             <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
               <span style={{ fontSize: '11px', fontWeight: 'bold', letterSpacing: '0.1em', opacity: 0.6 }}>INSTITUTIONAL</span>
               <span style={{ fontSize: '13px', fontWeight: '900', letterSpacing: '0.02em' }}>PAY SCHOOL FEES</span>
             </div>
           </div>

           <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
             <Image 
               src="/images/upi-logo.svg" 
               alt="UPI" 
               width={30} 
               height={12} 
               style={{ filter: 'brightness(0) invert(1)', opacity: 0.8 }}
             />
             <div style={{ background: 'rgba(255,255,255,0.1)', height: '24px', width: '1px' }}></div>
             <ChevronRight size={18} color="#fff" />
           </div>
        </button>
      </div>
      <PaymentModal isOpen={payModalOpen} onClose={() => setPayModalOpen(false)} />
    </>
  );
}
