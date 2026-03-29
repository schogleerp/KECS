'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../../styles/about-us.scss';

gsap.registerPlugin(ScrollTrigger);

import { STATS, PILLARS } from '../../constants/aboutContent';

export default function AboutUsPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Hero: Character Reveal ─────────────────────────────────────────
      const heroEl = document.querySelector('.hero-heading');
      if (heroEl) {
        const chars = heroEl.innerText.split('');
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

      // ── Body paragraphs — clean appear (NOT scrub opacity) ─────────────
      gsap.utils.toArray('.au-section-body p, .au-vision-text p').forEach((p, i) => {
        gsap.from(p, {
          y: 25, opacity: 0, duration: 0.9, ease: 'power2.out',
          scrollTrigger: { trigger: p, start: 'top 90%', once: true },
          delay: (i % 2) * 0.12
        });
      });

      // ── Pillars ────────────────────────────────────────────────────────
      gsap.from('.au-pillar-card', {
        y: 60, opacity: 0, duration: 1, stagger: 0.18, ease: 'power3.out',
        scrollTrigger: { trigger: '.au-pillars-grid', start: 'top 82%', once: true }
      });

      // ── Saint card ────────────────────────────────────────────────────
      gsap.from('.au-saint-card', {
        x: 40, opacity: 0, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: '.au-saint-card', start: 'top 82%', once: true }
      });

      // ── Foundation text cols ──────────────────────────────────────────
      gsap.from('.au-foundations-grid .au-section-body', {
        y: 30, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.au-foundations-grid', start: 'top 82%', once: true }
      });

      // ── Vision card ───────────────────────────────────────────────────
      gsap.from('.au-vision-card', {
        y: 40, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.au-vision-card', start: 'top 82%', once: true }
      });

      // ── Conclusion ────────────────────────────────────────────────────
      gsap.from(['.au-quote p', '.au-conclusion-note', '.au-cta-link'], {
        y: 30, opacity: 0, duration: 1.1, stagger: 0.18, ease: 'power3.out',
        scrollTrigger: { trigger: '.au-conclusion', start: 'top 82%', once: true }
      });

      // ── Mural clip-path ───────────────────────────────────────────────
      gsap.fromTo('.au-mural-wrapper',
        { clipPath: 'inset(0 38% 0 38%)' },
        { clipPath: 'inset(0 0% 0 0%)', ease: 'none',
          scrollTrigger: { trigger: '.au-mural', start: 'top bottom', end: 'bottom top', scrub: true }
        }
      );

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
        <span className="au-hero-tag">THE INSTITUTION</span>
        <h1 className="hero-heading">About Us</h1>
        <p className="au-hero-sub">
          Eight decades of faith, formation &amp; excellence — rooted in the values of&nbsp;
          <strong>Saint Kuriakose Elias Chavara</strong> and the CMI congregation.
        </p>
      </section>

      {/* ══ AT A GLANCE ═══════════════════════════════════════════════════════ */}
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

        {/* ─ Section 01: Our Foundation ─ */}
        <section className="au-section au-section--foundations">
          <div className="au-section-header">
            <span className="au-section-label">01 / FOUNDATIONS</span>
            <h2 className="au-section-title">Faith, Mission &amp;<br />Educational Heritage</h2>
          </div>

          <div className="au-foundations-grid">
            <div className="au-section-body">
              <p>
                <strong>K.E. Carmel Group of Schools, West Bengal</strong> belongs to the Christian Catholic
                Religious Congregation of Carmelites of Mary Immaculate (C.M.I) Fathers. Solely owned and
                managed by C.M.I Dharmanivas Educational Trust (DET) and C.M.I. Dharmaniketan Educational
                Trust (Eastern Region) under the Dharmaniketan C.M.I Sub Region, West Bengal.
              </p>
              <p>
                C.M.I Congregation has established more than 700 educational institutions all over India and
                abroad. The most reputed universities, colleges and schools run by C.M.I always stand forth in
                excellence. K.E. Carmel Group flourishes with <strong>eight institutions in West Bengal</strong>,
                imparting education from Nursery to Class XII under the CISCE curriculum.
              </p>
            </div>

            {/* Saint Chavara Card */}
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
                  Saint, social reformer, and co-founder of the C.M.I Congregation — the first Catholic
                  religious congregation for men in India. His vision drives the school's mission today.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─ Pillars ─ */}
        <section className="au-section au-section--pillars">
          <div className="au-section-header">
            <span className="au-section-label">02 / OUR PILLARS</span>
            <h2 className="au-section-title">What We Stand For</h2>
          </div>
          <div className="au-pillars-grid">
            {PILLARS.map((p, i) => (
              <div key={i} className="au-pillar-card">
                <span className="au-pillar-num">{p.num}</span>
                <h3 className="au-pillar-title">{p.title}</h3>
                <p className="au-pillar-body">{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─ Mural Break ─ */}
        <div className="au-mural" aria-hidden="true">
          <div className="au-mural-wrapper">
            <Image
              src="/images/about-group-students.png"
              alt=""
              fill
              sizes="100vw"
              style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
              priority={false}
            />
            <div className="au-mural-overlay">
              <p className="au-mural-copy">700+ Institutions · All over India &amp; Abroad</p>
            </div>
          </div>
        </div>

        {/* ─ Section 03: Inclusivity ─ */}
        <section className="au-section au-section--inclusivity">
          <div className="au-section-header">
            <span className="au-section-label">03 / INCLUSIVITY</span>
            <h2 className="au-section-title">Human Resource<br />Development</h2>
          </div>
          <div className="au-section-body">
            <p>
              Being aware that the educational process is the most important human resource development,
              we open our institutions to <strong>all — irrespective of sex, caste, colour or faith</strong>.
              Catholics receive religious formation; others receive moral and spiritual formation.
            </p>
            <p>
              For the integral development of our students, we organise a wide range of curricular and
              co-curricular activities that nurture the whole person.
            </p>
          </div>
        </section>

        {/* ─ Section 04: Vision 2030 ─ */}
        <section className="au-section au-section--vision">
          <div className="au-section-header">
            <span className="au-section-label">04 / VISION 2030</span>
            <h2 className="au-section-title">National Development &amp;<br />A Superpower India</h2>
          </div>
          <div className="au-vision-card">
            <div className="au-vision-text">
              <p>
                The CMI Missionary Fathers invest their best for the excellent formation of the next generation
                — our contribution to national development. We respond to the national need of preparing youth
                to be socially responsible so that <strong>India becomes a superpower by 2030</strong>.
              </p>
              <p>
                We select and train committed teachers who stand by our students in their physical, intellectual,
                moral, cultural and spiritual developments. We have been nurturing them with <strong>189 years
                of CMI educational experience</strong>, upholding the spiritual traditions of India.
              </p>
            </div>
          </div>
        </section>

        {/* ─ Conclusion ─ */}
        <section className="au-conclusion">
          <div className="au-quote">
            <span className="au-quote-mark">"</span>
            <p>
              We pay attention in forming leaders who are intellectually competent, spiritually mature,
              morally upright, psychologically integrated, physically healthy, socially acceptable
              and God-loving.
            </p>
          </div>
          <p className="au-conclusion-note">
            Young minds are inspired to imbibe genuine human values in a world of: rampant injustice,
            cultural fundamentalism, environmental exploitation and the spread of materialistic culture.
          </p>
          <Link href="/about/vision" className="au-cta-link">
            Explore Our Vision &amp; Mission
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </section>

      </div>

      <span className="au-watermark" aria-hidden="true">KECS</span>
    </main>
  );
}
