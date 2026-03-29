'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useArchitecturalLines } from '../../hooks/useArchitecturalLines';
import '../../styles/gallery.scss';

gsap.registerPlugin(ScrollTrigger);

// Server-side proxy route avoids CORS errors when fetching from Google Apps Script.
// See: app/api/gallery/route.js
const API_URL = '/api/gallery';

function GalleryOverlay({ selectedImage, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedImage]);

  if (!selectedImage) return null;

  const collection = selectedImage.collection || [];
  const activeMedia = collection[currentIndex];

  const navigatePhotos = (direction) => {
    let next = currentIndex + direction;
    if (next < 0) next = collection.length - 1;
    if (next >= collection.length) next = 0;
    setCurrentIndex(next);
  };

  const handleDownload = async () => {
    if (!activeMedia || activeMedia.type !== 'image') {
      window.open(activeMedia?.url || '#', '_blank');
      return;
    }
    const rawUrl = activeMedia.url.split('=w1000')[0];
    try {
      const proxiedUrl = `/_next/image?url=${encodeURIComponent(rawUrl)}&w=1920&q=75`;
      const response = await fetch(proxiedUrl);
      if (!response.ok) throw new Error('Proxy fetch failed');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Gallery-${selectedImage.title}-${currentIndex + 1}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      window.open(rawUrl, '_blank');
    }
  };

  return createPortal(
    <div className="gi-overlay open">
      
      {/* ── LEFT: CINEMATIC MEDIA STAGE ── */}
      <div className="gi-overlay-stage">
        {activeMedia?.type === 'video' ? (
          <div className="gi-video-container">
            <iframe 
               src={activeMedia.url} 
               className="stage-video" 
               allow="autoplay; encrypted-media" 
               allowFullScreen
            />
          </div>
        ) : (
          <Image 
            key={activeMedia?.url}
            src={activeMedia?.url?.split('=w1000')[0] || ''} 
            alt={selectedImage.title} 
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 75vw"
            className="stage-img"
          />
        )}

        <div className="gi-stage-counter">
           {currentIndex + 1} / {collection.length}
        </div>

        {collection.length > 1 && (
          <>
            <button className="gi-side-arrow prev" onClick={(e) => { e.stopPropagation(); navigatePhotos(-1); }}>
               <span className="arrow-box"><span className="arrow-icon" /></span>
            </button>
            <button className="gi-side-arrow next" onClick={(e) => { e.stopPropagation(); navigatePhotos(1); }}>
               <span className="arrow-box"><span className="arrow-icon" /></span>
            </button>
          </>
        )}
      </div>

      {/* ── RIGHT: COLLECTION SIDEBAR ── */}
      <div className="gi-overlay-sidebar">
        <div className="gi-sidebar-header">
          <div className="gi-sh-top">
            <div className="gi-sh-meta">
              <span className="ds-label-small year">{selectedImage.year}</span>
              <span className="ds-label-small dot">•</span>
              <span className="ds-label-small cat">{selectedImage.title}</span>
            </div>
            <button className="gi-sidebar-close" onClick={onClose}>
               <span className="close-text">CLOSE</span>
               <span className="close-icon" />
            </button>
          </div>
          <h2 className="gi-sh-title">{selectedImage.title}</h2>
          
          <div className="gi-sh-actions">
            <button className="gi-action-btn" onClick={handleDownload}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
              <span>{activeMedia?.type === 'video' ? 'OPEN' : 'SAVE'}</span>
            </button>
          </div>
        </div>

        <div className="gi-sidebar-collection" data-lenis-prevent="true">
          <div className="gi-collection-title">
            <span className="ds-label-small">THE COLLECTION</span>
          </div>
          
          <div className="gi-sidebar-grid">
            {collection.map((item, idx) => (
              <div 
                key={idx} 
                className={`gi-subimage-card ${idx === currentIndex ? 'active' : ''} ${item.type === 'video' ? 'is-video' : ''}`}
                onClick={() => setCurrentIndex(idx)}
              >
                {item.type === 'image' ? (
                  <Image src={item.url.replace('=w1000', '=w300')} alt="Thumb" fill sizes="150px" className="object-cover" />
                ) : (
                  <div className="gi-video-thumb">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="white"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

// ─────────────────────────────────────────────────────────────
// COMPONENT: MAIN SECTION
// ─────────────────────────────────────────────────────────────
export default function Gallery() {
  const [mounted, setMounted] = useState(false);
  const [galleryData, setGalleryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeYear, setActiveYear] = useState('ALL');
  const [selectedImage, setSelectedImage] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const sectionRef = useRef(null);
  const lineRefs = useRef([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const addLineRef = (el, axis) => {
    if (el && !lineRefs.current.some(l => l.ref.current === el)) {
      lineRefs.current.push({ ref: { current: el }, axis });
    }
  };

  useArchitecturalLines(sectionRef, lineRefs.current, { scrub: 1 });

  // Fetch from Google Apps Script Bridge
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        const res = await fetch(API_URL);
        const data = await res.json();
        
        // Defensive check: Ensure data is an array
        if (!Array.isArray(data)) {
          console.error("Gallery API Error: Expected array, got:", data);
          setGalleryData([]);
          return;
        }

        // Map the default category if not present
        const formattedData = data.map(item => ({
          ...item,
          category: item.category || 'GALLERY'
        }));
        
        setGalleryData(formattedData);
      } catch (err) {
        console.error("Gallery Fetch Error:", err);
        setGalleryData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  // Filter Logic
  const years = ['ALL', ...new Set(galleryData.map(item => item.year))].sort((a, b) => b - a);

  const filteredData = galleryData.filter(item => {
    return activeYear === 'ALL' || item.year === activeYear;
  });

  useEffect(() => { setCurrentPage(1); }, [activeYear]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const openLightbox = (item) => setSelectedImage(item);
  const closeLightbox = () => setSelectedImage(null);

  // Prevent background scrolling when lightbox is open
  useEffect(() => {
    if (selectedImage) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedImage]);

  return (
    <section className="gi-section ds-padding-top ds-padding-bottom ds-bg-light" id="gallery" ref={sectionRef}>
      
      {/* ── Top Bar ── */}
      <div className="gi-topbar">
        <div className="gi-topbar-left">
          <span className="gi-topbar-label">THE ARCHIVES</span>
        </div>
        <span className="gi-topbar-index">06</span>
      </div>

      {/* ── Header & Filters ── */}
      <div className="gi-header">
        <div className="gi-title-block">
          <h2 className="ds-heading-large">Our Chronicles</h2>
          <p className="gi-subtitle">
            Exploring the vibrant tapestry of student life through our curated visual archives.
          </p>
        </div>

        <div className="gi-nav-block">
          {/* Year Filter */}
          <div className="gi-filter-row">
            <span className="gi-nav-label">YEAR</span>
            <div className="gi-filter-items">
              {years.map(year => (
                <button 
                  key={year} 
                  className={`gi-year-btn ${activeYear === year ? 'active' : ''}`}
                  onClick={() => setActiveYear(year)}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
          
        </div>
      </div>

      <div className="gi-grid-container">
        
        <div className="gi-grid">
          {loading ? (
            <div className="gi-loading">
              <div className="loading-line" />
              <p>FETCHING DRIVE ARCHIVES...</p>
            </div>
          ) : filteredData.length === 0 ? (
            <div className="gi-empty">No experiences found for the selected criteria.</div>
          ) : (
            <>
              {paginatedData.map((item, index) => (
                <div key={item.id} className="gi-card" onClick={() => openLightbox(item)}>
                  
                  {/* Vertical Divider Line for GSAP */}
                  {(index + 1) % 3 !== 0 && (
                     <span className="ds-border-anim-v divider-right" ref={el => addLineRef(el, 'y')}></span>
                  )}
                  
                  {/* Horizontal Divider Line for subsequent rows */}
                  {index >= 3 && (
                     <span className="ds-border-anim-h item-top" ref={el => addLineRef(el, 'x')}></span>
                  )}
  
                  <div className="gi-card-inner">
                    <div className="gi-image-wrap">
                      {item.cover?.type === 'video' ? (
                        <div className="gi-video-placeholder">
                           {/* Show a static icon or thumbnail for videos */}
                           <div className="play-icon-overlay">
                             <svg viewBox="0 0 24 24" width="40" height="40" fill="white"><path d="M8 5v14l11-7z"/></svg>
                           </div>
                        </div>
                      ) : (
                        <Image 
                          src={item.cover?.url?.replace('=w1000', '=w600') || ''} 
                          alt={item.title} 
                          fill 
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover" 
                        />
                      )}
                      <div className="gi-card-overlay">
                         <span className="gi-view-label">VIEW {item.cover?.type === 'video' ? 'VIDEO' : 'EVENT'}</span>
                      </div>
                    </div>
  
                    <div className="gi-card-content">
                      <div className="gi-card-meta">
                        <span className="gi-card-year">{item.year}</span>
                        <span className="ds-label-small">•</span>
                        <span className="gi-card-cat">{item.title}</span>
                      </div>
                      <h4 className="gi-card-title">{item.title}</h4>
                    </div>
                  </div>
  
                </div>
              ))}
              
              {/* ── PAGINATION CONTROLS ── */}
              {totalPages > 1 && (
                <div className="gi-pagination">
                  <button 
                    className="gi-page-btn" 
                    disabled={currentPage === 1} 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  >
                    PREV
                  </button>
                  
                  <div className="gi-page-numbers">
                    {Array.from({length: totalPages}, (_, i) => i + 1).map(num => (
                      <button 
                        key={num}
                        className={`gi-page-num ${currentPage === num ? 'active' : ''}`}
                        onClick={() => setCurrentPage(num)}
                      >
                        {num < 10 ? `0${num}` : num}
                      </button>
                    ))}
                  </div>
  
                  <button 
                    className="gi-page-btn" 
                    disabled={currentPage === totalPages} 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  >
                    NEXT
                  </button>
                </div>
              )}
            </>
          )}
        </div>

      </div>

      {/* ── React Portal Split-Screen Overlay ── */}
      {mounted && (
        <GalleryOverlay 
          selectedImage={selectedImage}
          onClose={closeLightbox}
        />
      )}

    </section>
  );
}
