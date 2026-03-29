'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../../../styles/vision.scss';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: '189+', label: 'YEARS LEGACY', note: 'CMI EDUCATIONAL HERITAGE' },
  { value: '700+', label: 'INSTITUTIONS', note: 'WORLDWIDE PRESENCE' },
  { value: '100%', label: 'EXCELLENCE', note: 'ACADEMIC & SPIRITUAL' },
  { value: 'GLOBAL', label: 'CITIZENS', note: 'COMPETENT & RESPONSIBLE' },
];

export default function OurVisionPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Hero: Character Reveal ─────────────────────────────────────────
      const heroEl = document.querySelector('.hero-heading');
      if (heroEl) {
        const text = heroEl.innerText;
        const chars = text.split('');
        heroEl.innerHTML = chars.map(c =>
          `<span class="char-wrap"><span class="char">${c === ' ' ? '&nbsp;' : c}</span></span>`
        ).join('');
        gsap.from('.char', {
          yPercent: 110, skewY: 6, opacity: 0,
          duration: 1.6, stagger: 0.035, ease: 'power4.out', delay: 0.5
        });
      }

      gsap.from(['.au-hero-logo', '.au-hero-tag', '.au-hero-sub'], {
        y: 24, opacity: 0, duration: 1.1, stagger: 0.18, ease: 'power3.out', delay: 0.9
      });

      // ── Stats ─────────────────────────────────────────────────────────
      gsap.from('.au-stat-item', {
        y: 50, opacity: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.au-stats', start: 'top 85%', once: true }
      });

      // ── Section labels & titles ────────────────────────────────────────
      gsap.utils.toArray('.au-section-label').forEach(el => {
        gsap.from(el, {
          x: -20, opacity: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true }
        });
      });
      gsap.utils.toArray('.au-section-title').forEach(el => {
        gsap.from(el, {
          y: 30, opacity: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true }
        });
      });

      // ── Body paragraphs — clean reveal ────────────────────────────────
      gsap.utils.toArray('.au-section-body p').forEach((p, i) => {
        gsap.from(p, {
          y: 25, opacity: 0, duration: 0.9, ease: 'power2.out',
          scrollTrigger: { trigger: p, start: 'top 90%', once: true },
          delay: (i % 2) * 0.12
        });
      });

      // ── Saint card ────────────────────────────────────────────────────
      gsap.from('.au-saint-card', {
        x: 40, opacity: 0, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: '.au-saint-card', start: 'top 82%', once: true }
      });



      // ── Vision focus card ─────────────────────────────────────────────
      gsap.from('.au-vision-card', {
        y: 40, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.au-vision-card', start: 'top 82%', once: true }
      });

      // ── Conclusion ────────────────────────────────────────────────────
      gsap.from(['.au-quote p', '.au-conclusion-note', '.au-cta-link'], {
        y: 30, opacity: 0, duration: 1.1, stagger: 0.18, ease: 'power3.out',
        scrollTrigger: { trigger: '.au-conclusion', start: 'top 82%', once: true }
      });

      // ── Watermark parallax ────────────────────────────────────────────
      gsap.to('.au-watermark', {
        xPercent: -30, ease: 'none',
        scrollTrigger: { trigger: containerRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 }
      });

      // ── Progress bar ──────────────────────────────────────────────────
      gsap.to('.au-progress-fill', {
        scaleY: 1, ease: 'none',
        scrollTrigger: { trigger: '.au-main-content', start: 'top 12%', end: 'bottom 88%', scrub: true }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="au-page" ref={containerRef}>

      <div className="au-grid-overlay" />

      {/* Progress Sidebar */}
      <aside className="au-progress-sidebar" aria-hidden="true">
        <div className="au-progress-track">
          <div className="au-progress-fill" />
        </div>
        <div className="au-progress-labels">
          {['01','02','03','04'].map(n => (
            <span key={n} className="au-progress-label">{n}</span>
          ))}
        </div>
      </aside>

      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <section className="au-hero">
        <div className="au-hero-logo">
          <Image src="/images/logo-kecs.png" alt="K.E. Carmel School crest" width={68} height={68} />
        </div>
        <span className="au-hero-tag">THE PATRON&apos;S VISION</span>
        <h1 className="hero-heading">Our Vision</h1>
        <p className="au-hero-sub">
          We imbibe our vision from the educational vision of 
          <strong> St. Kuriakose Elias Chavara</strong>, our Heavenly Patron.
        </p>
      </section>

      {/* ══ VISION AT A GLANCE (STATS) ════════════════════════════════════════ */}
      <section className="au-stats" aria-label="Key facts">
        <div className="au-stats-inner">
          {STATS.map((s, i) => (
            <div key={i} className="au-stat-item">
              <strong className="au-stat-value">{s.value}</strong>
              <span className="au-stat-label">{s.label}</span>
              <span className="au-stat-note">{s.note}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ══ MAIN CONTENT ══════════════════════════════════════════════════════ */}
      <div className="au-main-content">

        {/* ─ Section 01: Heritage ─ */}
        <section className="au-section au-section--foundations">
          <div className="au-section-header">
            <span className="au-section-label">01 / HERITAGE</span>
            <h2 className="au-section-title">A Vision Of<br />Educational Patronage</h2>
          </div>

          <div className="au-foundations-grid">
            <div className="au-section-body">
              <p>
                He believed that Reason must be guided by one’s Faith in God and the 
                later should be strengthened by one’s Reason.
              </p>
            </div>

            {/* Saint Card */}
            <div className="au-saint-card">
              <div className="au-saint-img-wrap">
                <Image
                  src="/images/st-kuriakose-elias-chavara.jpg"
                  alt="Saint Kuriakose Elias Chavara"
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                  style={{ objectFit: 'cover', objectPosition: 'center top' }}
                />
              </div>
              <div className="au-saint-info">
                <span className="au-saint-tag">PATRON SAINT</span>
                <h3>Saint Kuriakose Elias Chavara</h3>
                <span className="au-saint-dates">1805 – 1871 · Kerala, India</span>
                <p>
                   He believed that Reason must be guided by one’s Faith in God and the 
                   later should be strengthened by one’s Reason.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─ Section 02: Synergetic Reason ─ */}
        <section className="au-section">
          <div className="au-section-header">
            <span className="au-section-label">02 / FORMATION</span>
            <h2 className="au-section-title">The Vital Process<br />Of Moulding</h2>
          </div>
          <div className="au-section-body">
            <p>
               We believe that the process of being educated is vital in one’s life due 
               to it’s ability to mould.
            </p>
            <p>
               We open our institution to <strong>students beyond discrimination</strong>.
            </p>
          </div>
        </section>



        {/* ─ Section 03: Integral Value ─ */}
        <section className="au-section au-section--inclusivity">
          <div className="au-section-header">
            <span className="au-section-label">03 / VALUES</span>
            <h2 className="au-section-title">Human Integrity &amp;<br />Peaceful Co-existence</h2>
          </div>
          <div className="au-section-body">
            <p>
               We never compromise with human values and promote <strong>Christian virtues of Love, 
               Charity and peaceful co-existence.</strong>
            </p>
            <p>
               All our schools cater <strong>best education with modern technologies and amenities</strong> 
               with a host of experienced and committed staff.
            </p>
          </div>
        </section>

        {/* ─ Section 04: Future Manifest (VISION STATEMENT) ─ */}
        <section className="au-section au-section--vision">
          <div className="au-section-header">
            <span className="au-section-label">04 / GLOBAL</span>
            <h2 className="au-section-title">Moulding Better<br />Globally Competent Citizens</h2>
          </div>
          <div className="au-vision-card">
            <div className="au-vision-text">
              <p>
                We see the <strong>latent potential of our students</strong> and mould them 
                into better individuals and <strong>globally competent citizens</strong>.
              </p>
            </div>
          </div>
        </section>

        {/* ─ Conclusion (Absolute Text Integrity) ─ */}
        <section className="au-conclusion">
          <div className="au-quote">
            <span className="au-quote-mark">"</span>
            <p>
               Reason must be guided by one’s Faith in God 
               and the later should be strengthened by one’s Reason.
            </p>
          </div>
          <p className="au-conclusion-note">
             We imbibe our vision from the educational vision of St. Kuriakose Elias Chavara, 
             our Heavenly Patron.
          </p>
          <Link href="/about/mission" className="au-cta-link">
            Explore Our Mission
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </section>

      </div>

      <span className="au-watermark" aria-hidden="true">VISION</span>
    </main>
  );
}
