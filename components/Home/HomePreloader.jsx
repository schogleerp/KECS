'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import '../../styles/preloader.scss';

export default function HomePreloader() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);
  const narrativeRef = useRef(null);
  const [currentText, setCurrentText] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  const narrativeBeats = [
    { text: "WE MOULD", phase: 'text' },
    { videoStart: 1, duration: 1.5, phase: 'video' },
    { text: "GLOBALLY", phase: 'text' },
    { videoStart: 4, duration: 1.5, phase: 'video' },
    { text: "COMPETENT", phase: 'text' },
    { videoStart: 7, duration: 1.5, phase: 'video' },
    { text: "CITIZENS.", phase: 'text' },
    { videoStart: 10, duration: 2, phase: 'video' },
    { text: "STEP IN", phase: 'text' },
    { videoStart: 13, duration: 1.5, phase: 'video' },
    { text: "AS A STUDENT", phase: 'text' },
    { videoStart: 16, duration: 1.5, phase: 'video' },
    { text: "LEAVE AS", phase: 'text' },
    { videoStart: 19, duration: 1.5, phase: 'video' },
    { text: "A GLOBALLY", phase: 'text' },
    { videoStart: 22, duration: 1.5, phase: 'video' },
    { text: "COMPETENT", phase: 'text' },
    { videoStart: 25, duration: 1.5, phase: 'video' },
    { text: "CITIZEN.", phase: 'text' },
  ];

  useEffect(() => {
    // FAIL-SAFE: The preloader MUST disappear after 12 seconds to ensure site visibility
    const timeout = setTimeout(() => {
      if (containerRef.current) {
        gsap.to(containerRef.current, {
           opacity: 0,
           duration: 1.5,
           onComplete: () => setIsVisible(false)
        });
      }
    }, 12000);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 1.5,
            ease: 'power4.inOut',
            onComplete: () => {
              setIsVisible(false);
              clearTimeout(timeout);
            }
          });
        }
      });

      tl.set(videoContainerRef.current, { opacity: 0 });

      narrativeBeats.forEach((beat, index) => {
        if (beat.phase === 'text') {
          tl.call(() => setCurrentText(beat.text));
          tl.to(videoContainerRef.current, { opacity: 0, duration: 0.4 })
            .fromTo(narrativeRef.current, 
              { opacity: 0, y: 30, filter: 'blur(15px)', scale: 0.9 },
              { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1, duration: 0.8, ease: 'expo.out' }
            )
            .to(narrativeRef.current, { 
              opacity: 0, y: -20, filter: 'blur(10px)', duration: 0.5, ease: 'expo.in', delay: 0.8
            });
        } else {
          tl.call(() => {
            if (videoRef.current) {
              videoRef.current.currentTime = beat.videoStart;
              videoRef.current.play();
            }
          });
          tl.to(videoContainerRef.current, { opacity: 1, duration: 0.5, ease: 'power2.inOut' })
            .to({}, { duration: beat.duration })
            .to(videoContainerRef.current, { opacity: 0, duration: 0.4 });
        }
      });
    }, containerRef);

    return () => {
      ctx.revert();
      clearTimeout(timeout);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="home-preloader" ref={containerRef}>
      <div className="preloader-video-container" ref={videoContainerRef}>
        <video 
          ref={videoRef}
          className="preloader-video"
          muted 
          playsInline
        >
          <source src="https://res.cloudinary.com/dyymektyt/video/upload/v1774623739/cugx1xqropskldicxrna.mp4" type="video/mp4" />
        </video>
        <div className="preloader-overlay"></div>
      </div>

      <div className="preloader-narrative">
        <div className="narrative-box" ref={narrativeRef}>
           <h1 className="narrative-title">{currentText}</h1>
        </div>
      </div>
    </div>
  );
}
