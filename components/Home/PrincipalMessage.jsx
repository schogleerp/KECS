'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../../styles/principalmessage.scss';

gsap.registerPlugin(ScrollTrigger);

export default function PrincipalMessage() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in content
      gsap.from(contentRef.current, {
        y: 50,
        opacity: 0,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      });

      // Portrait reveal
      gsap.from('.pm-portrait-container', {
        x: -50,
        opacity: 0,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%'
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="principal-message-section" ref={sectionRef}>
      <div className="pm-container">
        <div className="pm-topbar">
          <span className="pm-label">FROM THE PRINCIPAL</span>
          <span className="pm-index">04</span>
        </div>

        <div className="pm-grid" ref={contentRef}>
          {/* Portrait Column */}
          <div className="pm-portrait-col">
            <div className="pm-portrait-container">
              <Image
                src="/images/Principal.JPG"
                alt="Fr. George Panamthottam CMI"
                width={500}
                height={650}
                priority
                className="pm-portrait-img"
              />
              <div className="pm-portrait-info">
                <h3 className="pm-name">Fr. George Panamthottam CMI</h3>
                <p className="pm-title">Principal</p>
              </div>
            </div>
          </div>

          {/* Message Column */}
          <div className="pm-message-col">
            <div className="pm-message-content">
              <p className="pm-lead">
                Thank you for visiting our website. Welcome to <strong>K.E Carmel C.M.I School, Bankura</strong>, 
                in the State of West Bengal, India.
              </p>

              <p>
                With the pace of change accelerating in the 21th century, a key requirement to thrive is 
                lifelong learning and the ability to acquire new skills quickly. The question before us is: 
                How can &ldquo;learning to learn&rdquo; and the ability to be continually reinventing oneself 
                are fostered in children from a young age? 
              </p>
              
              <p>
                It starts with recognition amongst all of us that the world is changing. To prepare people 
                for the future, we need to design an education system that is forward-looking. In today's 
                world of Artificial Intelligence, we have to prepare our students to face uncertainty 
                and promote adaptability. 
              </p>

              <blockquote className="pm-quote">
                &ldquo;Instead of learning to memorize facts and figures, students need to learn <strong>how to learn</strong> and <strong>how to solve problems</strong>.&rdquo;
              </blockquote>

              <p>
                This requires a reorientation all the way from early childhood itself. We identify our role in this scenario to pursue academic 
                excellence and to motivate and encourage our students to be lifelong learners. 
                We are always ahead of the time!!
              </p>

              <p>
                K. E Carmel School, Bankura is an innovative School drawing on the talents and skills 
                of staff, students and parents to provide a host of educational programme. Wholesome 
                participation is encouraged in the extensive range of extra &ndash; curricular activities on offer 
                and care is also taken to ensure the well &ndash; being and happiness of each and every 
                student in the School. 
              </p>

              <p>
                Our School campus is situated in a very serene place and the most fertile and richest 
                platform to reflect upon the wonderful reality of thoughts and imaginations of our 
                students. With a long and rewarding history of achievement in education behind us, our 
                School community continues to move forward with confidence, commitment, passion and enthusiasm. 
              </p>

              <p className="pm-invitation">
                I cordially invite you to be the part of our family and be proud to become a Carmelite.
              </p>

              <div className="pm-signature">
                <span className="pm-sig-name">Fr. George Panamthottam CMI</span>
                <span className="pm-sig-creds">MA, BEd., MBA - Edu. Mgt., MSc - Cl. Psy, Ph.D (Research Scholar)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

