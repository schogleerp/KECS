'use client';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight, FileText, Info, Search, Layout, ClipboardList, ArrowUpRight } from 'lucide-react';
import '../../styles/home-admission.scss';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const admissionDocuments = [
  { id: 'notes', title: 'Admission Notes', icon: <Info size={18} strokeWidth={1.5} />, label: 'DETAILS' },
  { id: 'age', title: 'Age Criteria', icon: <Search size={18} strokeWidth={1.5} />, label: 'CRITERIA' },
  { id: 'fees', title: 'Fees Structure', icon: <Layout size={18} strokeWidth={1.5} />, label: 'FEES' },
  { id: 'procedure', title: 'Procedure', icon: <ClipboardList size={18} strokeWidth={1.5} />, label: 'PROCESS' }
];

export default function HomeAdmission() {
  const sectionRef = useRef(null);
  const narrativeRef = useRef(null);
  const formRef = useRef(null);
  const [activeTab, setActiveTab] = useState('updates');
  const [session, setSession] = useState({ start: 2026, end: 2027 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  // CMS States
  const [notices, setNotices] = useState([]);
  const [isLoadingNotices, setIsLoadingNotices] = useState(true);
  const [selectedNotice, setSelectedNotice] = useState(null);

  const registryRef = useRef(null);

  useEffect(() => {
    // CMS Fetch Logic
    const fetchNotices = async () => {
      try {
        const url = 'https://script.google.com/macros/s/AKfycbzPUSSiWKHzH6frvTCleeU9oXEhTLz3Pf7HzhDh3OWOzusRRxlcu0U-oxmG5PTM73lR/exec';
        // Cache bypass to ensure admins see sheet updates instantly
        const res = await fetch(url + '?t=' + new Date().getTime(), { cache: 'no-store' });
        const data = await res.json();
        if (Array.isArray(data)) setNotices(data);
      } catch (err) {
        console.error('Failed to fetch CMS updates:', err);
      } finally {
        setIsLoadingNotices(false);
      }
    };
    fetchNotices();

    const currentMonth = new Date().getMonth(); // 0 is Jan, 7 is Aug
    const currentYear = new Date().getFullYear();
    const startYear = currentMonth >= 7 ? currentYear + 1 : currentYear;
    setSession({ start: startYear, end: startYear + 1 });
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal narrative text
      gsap.from(".ha-reveal", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: narrativeRef.current,
          start: "top 80%",
          once: true
        }
      });

      // Reveal form container
      gsap.from(formRef.current, {
        x: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%",
          once: true
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    // Tab switching within sidebar
    if (registryRef.current) {
      gsap.fromTo(registryRef.current,
        { opacity: 0, x: 10 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power4.out" }
      );
    }
  }, [activeTab]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Convert FormData to JSON object for cleaner API handling
    const rawData = new FormData(e.target);
    const data = Object.fromEntries(rawData.entries());

    try {
      const res = await fetch('/api/admission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok || !result.success) throw new Error(result.error || 'Submission failed.');

      setShowSuccessModal(true);
      e.target.reset(); // Clear the form
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Transmission failed. Please try again or contact the school desk directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="ha-section" ref={sectionRef}>
      <div className="ha-grid">
        
        {/* Left Column: Narrative */}
        <div className="ha-narrative" ref={narrativeRef}>
          <div className="ha-topbar ha-reveal">
            <span className="ha-topbar-rule" />
            <span className="ha-topbar-label">ABOUT THE SCHOOL</span>
            <span className="ha-topbar-index">04</span>
          </div>

          <header className="ha-heading-wrap ha-reveal">
            <span className="ha-label">ADMISSION PORTAL</span>
            <h2 className="ha-title" style={{ fontSize: 'clamp(2.5rem, 4vw, 3.8rem)', letterSpacing: '-0.03em', lineHeight: '1.1' }}>
              Admissions Open. <br />
              <span style={{ 
                display: 'block', 
                fontSize: 'clamp(1.2rem, 1.8vw, 1.6rem)', 
                fontWeight: 600, 
                color: 'rgba(0,0,0,0.4)', 
                letterSpacing: '0.05em',
                marginTop: '1.2rem',
                textTransform: 'uppercase'
              }}>
                For Academic Session {session.start} - {session.end}
              </span>
            </h2>
          </header>

          <div className="ha-body">
            <div className="ha-lead ha-reveal">
              K.E. Carmel School Bankura - The No. 1 ICSE school in Bankura where future leaders are shaped. 
              We nurture and mould globally competent citizens with the complete potential of your child.
            </div>
            
            <div className="ha-text ha-reveal">
              <p>
                Through a perfect blend of rigorous academics, dynamic co-curricular activities, and sports, 
                we open doors to extraordinary opportunities that transform ambitious learners into future-ready global citizens.
              </p>
              <p>
                K.E. Carmel School Bankura belongs to the Christian Catholic Religious Congregation of 
                Carmelites of Mary Immaculate (C.M.I) Fathers. It is solely owned and managed by C.M.I 
                Dharmanivas Educational Trust (DET) and C.M.I. Dharmaniketan Educational Trust (Eastern Region) 
                under the aegis of Dharmaniketan C.M.I Sub Region, West Bengal of C.M.I St. Joseph’s Province, Trivandrum, Kerala, India.
              </p>
              <p>
                It draws inspiration from Saint Kuriakose Elias Chavara (1805-71), a Saint and Social Reformer 
                of the 19th Century in the state of Kerala, India. He is one of the founders of the C.M.I Congregation, 
                which is the first Catholic Religious Congregation for men in India.
              </p>
              <p>
                Following his vision, C.M.I Congregation has established more than 700 educational institutions 
                all over India and abroad. The most reputed universities, colleges, schools, and other educational 
                institutions run by C.M.I Congregation in India always stand forth in excellence.
              </p>
              <p>
                The vision of education provided by C.M.I Congregation focuses exclusively on the integral 
                development of rural areas of India by providing quality education.
              </p>
              <p>
                K. E. Carmel Group with this noble vision, flourishes with eight educational institutions in the state of West Bengal. The group is approved as a Minority Educational Institution as F.No.1525 of 2006-143/8. It imparts instructions to students under CISCE curriculum, New Delhi, India.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="ha-form-zone">
          <div className="ha-form-container" ref={formRef}>
            <div className="ha-form-header">
              <h3 className="form-title">Admission Inquiry</h3>
              <span className="form-desc">ESTABLISH YOUR CHILD'S FUTURE LEGACY</span>
            </div>

            <form className="ha-form" onSubmit={handleSubmit}>
              <div className="ha-field-group">
                <label>Student's Full Name</label>
                <input type="text" name="studentName" placeholder="ENTER NAME" required />
              </div>

              <div className="ha-field-group">
                <label>Parent's Full Name</label>
                <input type="text" name="guardianName" placeholder="ENTER GUARDIAN NAME" required />
              </div>

              <div className="ha-field-row">
                <div className="ha-field-group">
                  <label>Class for Admission</label>
                  <select name="studentClass" required>
                    <option value="">SELECT CLASS</option>
                    <option value="Nursery">Nursery</option>
                    <option value="LKG">LKG</option>
                    <option value="UKG">UKG</option>
                    <option value="I">Class I</option>
                    <option value="II">Class II</option>
                    <option value="III">Class III</option>
                    <option value="IV">Class IV</option>
                    <option value="V">Class V</option>
                    <option value="VI">Class VI</option>
                    <option value="VII">Class VII</option>
                    <option value="VIII">Class VIII</option>
                  </select>
                </div>
                <div className="ha-field-group">
                  <label>Mobile Number</label>
                  <input type="tel" name="mobile" placeholder="+91" required />
                </div>
              </div>

              <div className="ha-field-group">
                <label>Residential Address</label>
                <textarea name="address" placeholder="STREET, CITY, DISTRICT" rows={2} style={{ resize: 'none' }} required></textarea>
              </div>

              <button type="submit" className="ha-submit-btn" disabled={isSubmitting} style={{ opacity: isSubmitting ? 0.7 : 1 }}>
                <span className="btn-label">{isSubmitting ? 'SUBMITTING...' : 'SUBMIT ADMISSION INQUIRY'}</span>
                <div className="btn-icon"><ChevronRight size={20} /></div>
              </button>
            </form>

            <div className="ha-registry-sidebar">
              <div className="sidebar-divider"></div>
              
              <nav className="sidebar-tabs">
                <button 
                  className={`sidebar-tab ${activeTab === 'updates' ? 'active' : ''}`}
                  onClick={() => setActiveTab('updates')}
                >
                  RECENT UPDATES
                </button>
                <button 
                  className={`sidebar-tab ${activeTab === 'admissions' ? 'active' : ''}`}
                  onClick={() => setActiveTab('admissions')}
                >
                  ADMISSION DETAILS
                </button>
              </nav>

              <div className="sidebar-tab-content" ref={registryRef}>
                {activeTab === 'updates' ? (
                  <div className="sidebar-updates">
                    {isLoadingNotices ? (
                      <div className="sidebar-state-msg">FETCHING LIVE DATA...</div>
                    ) : notices.length > 0 ? (
                      notices.map(notice => (
                        <div key={notice.id} className="sidebar-update-row" onClick={() => setSelectedNotice(notice)} style={{ cursor: 'pointer' }}>
                          <span className="row-date">{notice.date}</span>
                          <div className="row-content-wrapper">
                            <h4 className="row-title">{notice.title}</h4>
                            {notice.message && (
                              <div className="row-marquee-container">
                                <span className="marquee-text">
                                  {notice.message.replace(/\n/g, '   •   ')}
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="row-action">VIEW</div>
                        </div>
                      ))
                    ) : (
                      <div className="sidebar-state-msg">No recent updates available at this time.</div>
                    )}
                  </div>
                ) : (
                  <div className="sidebar-registry-grid">
                    {admissionDocuments.map(doc => (
                      <div key={doc.id} className="sidebar-reg-card">
                        <div className="reg-card-top">
                          <span className="reg-label">{doc.label}</span>
                          <span className="reg-icon">{doc.icon}</span>
                        </div>
                        <h4 className="reg-title">{doc.title}</h4>
                        <div className="reg-link">DETAILS <ArrowUpRight size={12} /></div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Architectural Success Modal */}
      {showSuccessModal && (
        <div className="ha-success-overlay">
          <div className="ha-success-modal">
            <div className="modal-header">
              <span className="modal-label">STATUS: RECEIVED</span>
              <button className="modal-close" onClick={() => setShowSuccessModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="success-icon-box">
                <span className="success-mark">✓</span>
              </div>
              <h3 className="success-title">Admission Inquiry<br/>Successfully Submitted.</h3>
              <p className="success-desc">
                Thank you for choosing K.E. Carmel School Bankura. Our admissions desk will contact you shortly.
              </p>
              <button className="modal-btn-primary" onClick={() => setShowSuccessModal(false)}>CONTINUE</button>
            </div>
          </div>
        </div>
      )}

      {/* Notice Message Modal (Option B) */}
      {selectedNotice && (
        <div
          className="ha-notice-overlay"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          <div className="ha-notice-modal">
            <div className="modal-header">
              <span className="modal-label">OFFICIAL NOTICE: {selectedNotice.tag}</span>
              <button className="modal-close" onClick={() => setSelectedNotice(null)}>✕</button>
            </div>
            <div
              className="modal-body"
              style={{ overflowY: 'scroll', maxHeight: '60vh' }}
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
              <span className="notice-date">{selectedNotice.date}</span>
              <h3 className="notice-title">{selectedNotice.title}</h3>

              <div className="notice-content-box">
                {selectedNotice.message ? (
                  <p className="notice-message">{selectedNotice.message}</p>
                ) : (
                  <p className="notice-message no-msg">No additional details provided.</p>
                )}
              </div>
            </div>

            <div className="modal-footer">
              {selectedNotice.link && selectedNotice.link !== '#' ? (
                <a href={selectedNotice.link} target="_blank" rel="noopener noreferrer" className="notice-btn-primary">
                  DOWNLOAD ATTACHMENT
                </a>
              ) : (
                <button className="notice-btn-secondary" onClick={() => setSelectedNotice(null)}>ACKNOWLEDGE</button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
