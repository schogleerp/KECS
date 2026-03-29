'use client';
import { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useArchitecturalLines } from '../../hooks/useArchitecturalLines';
import '../../styles/facilitiesstrengths.scss';

gsap.registerPlugin(ScrollTrigger);

const facilities = [
  {
    title: "Safe Transportation",
    category: "LOGISTICS",
    meta: "FLEET / 15+ UNITS",
    desc: "A fleet of modern, GPS-equipped buses ensures the safest commute for our students. Our transportation system is managed with precision, featuring real-time tracking and trained safety personnel.",
    image: "/images/facility_transportation.png",
    status: "MISSION CRITICAL"
  },
  {
    title: "Smart Classrooms",
    category: "ACADEMIC",
    meta: "DIGITAL / 24 UNITS",
    desc: "Interactive learning environments equipped with high-definition smart boards and ergonomic furniture. These spaces are designed to foster collaboration and bring abstract concepts to life through digital integration.",
    image: "/images/facility_classroom.png",
    status: "HIGH-FIDELITY"
  },
  {
    title: "Science Laboratories",
    category: "RESEARCH",
    meta: "LABS / 3 UNITS",
    desc: "State-of-the-art facilities for Physics, Chemistry, and Biology. Our labs are equipped with professional-grade instruments, allowing students to engage in deep scientific inquiry and hands-on experimentation.",
    image: "/images/facility_science.png",
    status: "ADVANCED SPEC"
  },
  {
    title: "Boarding House",
    category: "RESIDENCE",
    meta: "CAPACITY / 300+",
    desc: "A premium residential experience that emphasizes comfort, discipline, and community. Our boarding facilities provide a secure 'home away from home' with dedicated study areas and recreational spaces.",
    image: "/images/facility_boarding.png",
    status: "PREMIUM LIVING"
  },
  {
    title: "Digital IT Center",
    category: "TECHNOLOGY",
    meta: "NODES / 50 UNITS",
    desc: "A high-speed computing hub that serves as the backbone of our digital curriculum. Equipped with the latest hardware and software, it prepares students for the technological demands of the future.",
    image: "/images/facility_it.png",
    status: "FIBER OPTIC"
  },
  {
    title: "Central Library",
    category: "RESOURCES",
    meta: "TITLES / 10K+",
    desc: "An expansive collection of literature and academic resources. Our library is a sanctuary for quiet study and intellectual exploration, featuring both physical volumes and digital archives.",
    image: "/images/facility_library.png",
    status: "OPEN ACCESS"
  }
];

export default function FacilitiesStrengths() {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);
  const listRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal each facility item
      itemsRef.current.forEach((item, index) => {
        if (!item) return;
        
        const imageInset = item.querySelector('.fs-image-inset');
        // ... internal animations handled by list progress or separate triggers ...
        // We still keep the clip-path for entry feel
        gsap.fromTo(imageInset, 
          { clipPath: 'inset(0 0 100% 0)' },
          { 
            clipPath: 'inset(0 0 0 0)', 
            duration: 1.5,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%', 
              once: true
            }
          }
        );

        // Parallax REMOVED
      });


      // ── Container Bound Animations ──
      gsap.utils.toArray('.ds-border-anim-v').forEach((line) => {
        gsap.fromTo(line, 
          { scaleY: 0 },
          { scaleY: 1, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: line.parentElement, start: 'top 85%', once: true } }
        );
      });

      gsap.utils.toArray('.ds-border-anim-h').forEach((line) => {
        gsap.fromTo(line, 
          { scaleX: 0 },
          { scaleX: 1, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: line.parentElement, start: 'top 85%', once: true } }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="fs-section ds-section-border" ref={sectionRef}>

      {/* Top identifier bar matching Principal's Desk */}
      <div className="fs-topbar">
        <div className="fs-topbar-left">
          <span className="fs-topbar-rule" />
          <span className="fs-topbar-label">CAMPUS ECOSYSTEM</span>
        </div>
        <span className="fs-topbar-index">05</span>
      </div>

      {/* Header Strip */}
      <header className="fs-header">
        <h2 className="fs-heading">Our School <br />Facilities.</h2>
      </header>

      {/* "Selected Works" Architectural List (Identity: The Environment) */}
      <div className="fs-scroll-window">
        <div className="fs-works-list" ref={listRef}>
          {facilities.map((f, i) => (
          <div 
            key={i} 
            className="fs-works-row"
            ref={el => itemsRef.current[i] = el}
          >
            {/* Horizontal terminal lines */}
            <div className="ds-border-anim-h top"></div>

            {/* Text Block (40%) - Anchored to Left */}
            <div className="fs-works-text">
              <div className="fs-text-inner">
                <span className="ds-label-small">FACILITY</span>
                <h3 className="fs-works-title">{f.title}</h3>
                <div className="fs-detailed-explaining">
                  <p>{f.desc}</p>
                  <p>Designed for excellence, our {f.title.toLowerCase()} provides a state-of-the-art environment for modern learning and growth.</p>
                </div>
                <div className="fs-meta-row">
                  <div className="meta-item">
                    <span className="ds-label-mini">CATEGORY</span>
                    <span className="meta-val">{f.category}</span>
                  </div>
                  <div className="meta-item">
                    <span className="ds-label-mini">STATUS</span>
                    <span className="meta-val">{f.status}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Block (60%) - Anchored to Right with Inset Gap */}
            <div className="fs-works-image">
              {/* Vertical Divider Line with Gapping */}
              <div className="ds-border-anim-v divider"></div>
              
              <div className="fs-image-inset">
                <Image 
                  src={f.image} 
                  alt={f.title} 
                  fill 
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
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
