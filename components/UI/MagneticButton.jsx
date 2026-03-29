'use client';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import '../../styles/magneticButton.scss';

export default function MagneticButton({ children, href, className = '' }) {
  const buttonRef = useRef(null);
  const textRef = useRef(null);
  const arrowRef = useRef(null);

  useEffect(() => {
    const btn = buttonRef.current;
    if (!btn) return;
    
    const moveMagnet = (e) => {
      const boundBox = btn.getBoundingClientRect();
      const magnetStrength = 30; 
      const newX = ((e.clientX - boundBox.left) / btn.offsetWidth) - 0.5;
      const newY = ((e.clientY - boundBox.top) / btn.offsetHeight) - 0.5;
      
      gsap.to(btn, {
        duration: 1,
        x: newX * magnetStrength,
        y: newY * magnetStrength,
        ease: 'power4.out'
      });
      
      gsap.to(textRef.current, { duration: 1, x: newX * 15, y: newY * 15, ease: 'power4.out' });
      gsap.to(arrowRef.current, { duration: 1, x: newX * 15, y: newY * 15, ease: 'power4.out' });
    };

    const leaveMagnet = () => {
      gsap.to(btn, { duration: 1.5, x: 0, y: 0, ease: 'elastic.out(1, 0.3)' });
      gsap.to(textRef.current, { duration: 1.5, x: 0, y: 0, ease: 'elastic.out(1, 0.3)' });
      gsap.to(arrowRef.current, { duration: 1.5, x: 0, y: 0, ease: 'elastic.out(1, 0.3)' });
    };

    btn.addEventListener('mousemove', moveMagnet);
    btn.addEventListener('mouseleave', leaveMagnet);

    return () => {
      btn.removeEventListener('mousemove', moveMagnet);
      btn.removeEventListener('mouseleave', leaveMagnet);
    };
  }, []);

  const Content = () => (
    <span className="magnetic-content">
      <span className="magnetic-text" ref={textRef}>
        <span className="text-inner">{children}</span>
        <span className="text-duplicate">{children}</span>
      </span>
      <span className="magnetic-arrow" ref={arrowRef}>
        <ArrowUpRight size={20} strokeWidth={1.5} />
        <ArrowUpRight className="arrow-duplicate" size={20} strokeWidth={1.5} />
      </span>
    </span>
  );

  if (href) {
    return (
      <a href={href} className={`magnetic-btn ${className}`} ref={buttonRef}>
        <Content />
      </a>
    );
  }

  return (
    <button className={`magnetic-btn ${className}`} ref={buttonRef}>
      <Content />
    </button>
  );
}
