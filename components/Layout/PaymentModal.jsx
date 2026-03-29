'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { X, CheckCircle2, ChevronRight, QrCode, CreditCard, User, GraduationCap, ArrowLeft, Send } from 'lucide-react';
import gsap from 'gsap';
import '../../styles/payment-modal.scss';

const tuitionFees = {
  'Nursery': 1800,
  'LKG': 1800,
  'UKG': 1800,
  'Class I': 2000,
  'Class II': 2000,
  'Class III': 2000,
  'Class IV': 2000,
  'Class V': 2150,
  'Class VI': 2150,
  'Class VII': 2150,
  'Class VIII': 2200,
};

const classesWithSections = ['Nursery', 'LKG', 'UKG', 'Class I', 'Class II', 'Class III', 'Class IV'];
const classes = Object.keys(tuitionFees);
const months = [
  "04. Apr", "05. May", "06. Jun", "07. Jul", "08. Aug", "09. Sep",
  "10. Oct", "11. Nov", "12. Dec", "01. Jan", "02. Feb", "03. Mar"
];

const registrySteps = [
  { id: 1, label: 'Head' },
  { id: 2, label: 'Identity' },
  { id: 3, label: 'Method' },
  { id: 4, label: 'Payment' },
  { id: 5, label: 'Receipt' }
];

export default function PaymentModal({ isOpen, onClose }) {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  
  const initialState = {
    head: 'Tuition Fee',
    studentName: '',
    className: 'Nursery',
    section: 'A',
    month: months[0], // April
    amount: 1800,
    transactionId: '',
    screenshot: null,
    screenshotName: '',
    screenshotMime: '',
  };

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialState);
  const [paymentMethod, setPaymentMethod] = useState(null); // 'qr' or 'app'
  const [screenshotPreview, setScreenshotPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [submitError, setSubmitError] = useState('');

  const resetForm = () => {
    setStep(1);
    setFormData(initialState);
    setPaymentMethod(null);
    setScreenshotPreview(null);
    setIsSubmitting(false);
    setIsSuccess(false);
    setUploadError('');
  };

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    } else {
      const isMobile = window.innerWidth <= 768;
      const ctx = gsap.context(() => {
        gsap.fromTo(".pm-modal", 
          isMobile ? { yPercent: 100, xPercent: 0 } : { xPercent: 100, yPercent: 0 },
          { 
            yPercent: 0, 
            xPercent: 0, 
            duration: 0.8, 
            ease: "power4.out"
          }
        );
      }, containerRef);
      return () => ctx.revert();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      const ctx = gsap.context(() => {
        gsap.fromTo(contentRef.current.children, 
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power4.out" }
        );
      }, contentRef);
      return () => ctx.revert();
    }
  }, [step, isOpen]);

  useEffect(() => {
    if (formData.head === 'Tuition Fee') {
      setFormData(prev => ({ ...prev, amount: tuitionFees[formData.className] || 0 }));
    }
  }, [formData.className, formData.head]);

  const handleScreenshot = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadError('');

    if (!file.type.startsWith('image/')) {
      setUploadError('Please upload an image file.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File is too large (Max 5MB).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64 = ev.target.result.split(',')[1];
      setFormData(prev => ({
        ...prev,
        screenshot: base64,
        screenshotName: file.name,
        screenshotMime: file.type,
      }));
      setScreenshotPreview(ev.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);
  
  const handleClose = () => {
    const isMobile = window.innerWidth <= 768;
    gsap.to(".pm-modal", {
      xPercent: isMobile ? 0 : 100,
      yPercent: isMobile ? 100 : 0,
      duration: 0.6,
      ease: "power4.in",
      onComplete: onClose
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      const res = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (!res.ok || !result.success) throw new Error(result.error || 'Submission failed.');

      setIsSuccess(true);
      setStep(6);
      
      gsap.from(".success-box", { scale: 0, duration: 0.8, ease: "back.out(1.7)" });
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const upiId = formData.head === 'Tuition Fee' ? 'boim-419548420074@boi' : 'boim-419548420075@boi';
  const upiUrl = `upi://pay?pa=${upiId}&pn=K.E.%20Carmel%20School&am=${formData.amount}&cu=INR&tn=FEES_${formData.studentName.replace(/\s+/g, '_')}_${formData.month}`;
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(upiUrl)}`;

  return (
    <div className="pm-overlay">
      <div className="pm-modal">
        <button className="pm-close" onClick={handleClose} aria-label="Close">
          <X size={20} strokeWidth={1.5} />
        </button>

        <header className="pm-header">
          <div className="pm-crest-box">
            <div className="crest-line"></div>
            <Image src="/images/logo-kecs.png" alt="crest" width={30} height={30} />
          </div>
          <h2 className="pm-title">Secure Fee Payment</h2>
          <span className="pm-registry-id">OFFICIAL TRANSACTION GATEWAY // {new Date().getFullYear()}</span>
        </header>

        <div className="pm-container" ref={containerRef}>
          <div className="pm-steps-registry">
            {registrySteps.map(s => (
              <div key={s.id} className={`registry-step ${step === s.id ? 'active' : ''} ${step > s.id ? 'completed' : ''}`}>
                <span className="step-num">{s.id}</span>
                <span className="step-label">{s.label}</span>
              </div>
            ))}
          </div>

          <div className="pm-content" ref={contentRef}>
            {step === 1 && (
              <div className="pm-step-content">
                <span className="pm-step-label">01 / CATEGORY</span>
                <h3 className="pm-step-title">Select Fee Head</h3>
                <div className="pm-registry-grid">
                  <div 
                    className={`pm-registry-card ${formData.head === 'Tuition Fee' ? 'active' : ''}`}
                    onClick={() => setFormData({ ...formData, head: 'Tuition Fee' })}
                  >
                    <div className="card-icon"><GraduationCap size={24} strokeWidth={1.5} /></div>
                    <div className="card-info">
                      <span className="card-title">Tuition Fee</span>
                      <span className="card-desc">Standard academic enrollment fees</span>
                    </div>
                  </div>
                  <div 
                    className={`pm-registry-card ${formData.head === 'Bus Fee' ? 'active' : ''}`}
                    onClick={() => setFormData({ ...formData, head: 'Bus Fee', amount: '' })}
                  >
                    <div className="card-icon"><CreditCard size={24} strokeWidth={1.5} /></div>
                    <div className="card-info">
                      <span className="card-title">Bus Fee</span>
                      <span className="card-desc">School transportation services</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="pm-step-content">
                <span className="pm-step-label">02 / IDENTITY</span>
                <h3 className="pm-step-title">Student Details</h3>
                <div className="pm-registry-form">
                  <div className="pm-field-group has-icon">
                    <label>Full Name of Student</label>
                    <input 
                      type="text" 
                      placeholder="ENTER FULL NAME"
                      value={formData.studentName}
                      onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    />
                    <User size={18} strokeWidth={1.5} className="field-icon" />
                  </div>
                  <div className="pm-field-row">
                    <div className="pm-field-group">
                      <label>Class</label>
                      <select value={formData.className} onChange={(e) => setFormData({ ...formData, className: e.target.value })}>
                        {classes.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    {classesWithSections.includes(formData.className) && (
                      <div className="pm-field-group">
                        <label>Section</label>
                        <select value={formData.section} onChange={(e) => setFormData({ ...formData, section: e.target.value })}>
                          <option value="A">SECTION A</option>
                          <option value="B">SECTION B</option>
                        </select>
                      </div>
                    )}
                  </div>
                  <div className="pm-field-group">
                    <label>Payment Month</label>
                    <select value={formData.month} onChange={(e) => setFormData({ ...formData, month: e.target.value })}>
                      {months.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="pm-step-content">
                <span className="pm-step-label">03 / VERIFICATION</span>
                <h3 className="pm-step-title">Payment Method</h3>
                
                {formData.head === 'Bus Fee' && (
                  <div className="pm-field-group" style={{ marginBottom: '3rem' }}>
                    <label>Confirm Bus Fee Amount</label>
                    <input 
                      type="number" 
                      placeholder="₹ 0.00"
                      style={{ fontSize: '2rem', fontWeight: '800' }}
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                    />
                  </div>
                )}

                <div className="pm-registry-grid">
                  <div className={`pm-registry-card ${paymentMethod === 'qr' ? 'active' : ''}`} onClick={() => setPaymentMethod('qr')}>
                    <div className="card-icon"><QrCode size={24} strokeWidth={1.5} /></div>
                    <div className="card-info">
                      <span className="card-title">Scan QR Code</span>
                      <span className="card-desc">Ideal for desktop/tablet payment</span>
                    </div>
                  </div>
                  <div className={`pm-registry-card ${paymentMethod === 'app' ? 'active' : ''}`} onClick={() => setPaymentMethod('app')}>
                    <div className="card-icon"><CreditCard size={24} strokeWidth={1.5} /></div>
                    <div className="card-info">
                      <span className="card-title">Pay via UPI App</span>
                      <span className="card-desc">Directly launch payment applications</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="pm-step-content pm-registry-payment">
                <span className="pm-amount-label">TOTAL AMOUNT DUE</span>
                <div className="pm-amount-value">₹{formData.amount}</div>

                {paymentMethod === 'qr' ? (
                  <div className="pm-qr-frame">
                    <Image src={qrImageUrl} alt="UPI QR" width={220} height={220} />
                  </div>
                ) : (
                  <a href={upiUrl} className="pm-upi-btn" style={{ marginBottom: '2rem' }}>
                    <Image src="/images/upi-logo.svg" alt="UPI" width={60} height={24} />
                    LAUNCH APP
                  </a>
                )}

                <p style={{ fontSize: '10px', color: 'rgba(0,0,0,0.3)', textTransform: 'uppercase', letterSpacing: '0.15em', fontFamily: 'Inter Tight, sans-serif' }}>
                  K.E. Carmel School, Bankura
                </p>
              </div>
            )}

            {step === 5 && (
              <div className="pm-step-content">
                <span className="pm-step-label">05 / RECEIPT</span>
                <h3 className="pm-step-title">Submit Reference</h3>
                
                <div className="pm-registry-form">
                  <div className="pm-field-group">
                    <label>UTR NUMBER / TRANSACTION ID</label>
                    <input 
                      type="text" 
                      placeholder="12-DIGIT REFERENCE NO."
                      value={formData.transactionId}
                      onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })}
                    />
                  </div>
                  
                  <div className="pm-field-group">
                    <label>TRANSACTION SCREENSHOT</label>
                    <label className="pm-upload-placeholder" style={{ cursor: 'pointer', display: 'block' }}>
                      <input type="file" onChange={handleScreenshot} style={{ display: 'none' }} accept="image/*" />
                      {screenshotPreview ? (
                        <div style={{ position: 'relative' }}>
                          <img src={screenshotPreview} alt="Preview" style={{ width: '100%', borderRadius: '0' }} />
                          <div style={{ position: 'absolute', bottom: '10px', right: '10px', background: '#000', color: '#fff', padding: '6px 12px', fontSize: '9px', borderRadius: '0' }}>CHANGE FILE</div>
                        </div>
                      ) : (
                        <div style={{ padding: '2.5rem 2rem', border: '1px dashed rgba(0,0,0,0.1)', textAlign: 'center', background: 'rgba(255,255,255,0.4)', borderRadius: '0' }}>
                          <span style={{ fontSize: '10px', color: 'rgba(0,0,0,0.3)', letterSpacing: '0.1em', fontWeight: 'bold' }}>UPLOAD PAYMENT RECEIPT</span>
                        </div>
                      )}
                    </label>
                    {uploadError && <p style={{ color: '#9a0000', fontSize: '10px', marginTop: '8px' }}>{uploadError}</p>}
                  </div>
                </div>
              </div>
            )}

            {step === 6 && (
              <div className="pm-step-content pm-registry-success">
                <div className="success-box"><CheckCircle2 size={60} strokeWidth={1.5} /></div>
                <h3 className="success-title">Payment Submitted</h3>
                
                <div className="success-summary">
                  <div className="summary-item"><span>Student</span><span>{formData.studentName}</span></div>
                  <div className="summary-item"><span>Reference</span><span>{formData.transactionId}</span></div>
                  <div className="summary-item"><span>Amount</span><span>₹{formData.amount}</span></div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button className="registry-primary-btn" onClick={resetForm} style={{ flex: 1 }}>
                    <span className="btn-label">New Payment</span>
                    <div className="btn-icon-stack"><ChevronRight size={18} strokeWidth={2.5} /></div>
                  </button>
                  <button className="registry-back-btn" onClick={handleClose} style={{ width: 'auto', padding: '0 2rem' }}>LEAVE</button>
                </div>
              </div>
            )}
          </div>
        </div>

        {step < 6 && (
          <footer className="pm-registry-actions">
            {step > 1 && (
              <button className="registry-back-btn" onClick={handleBack} aria-label="Back">
                <ArrowLeft size={20} strokeWidth={1.5} />
              </button>
            )}
            <button 
              className="registry-primary-btn" 
              onClick={step === 5 ? handleSubmit : handleNext}
              disabled={(step === 2 && !formData.studentName) || (step === 3 && !paymentMethod) || (step === 5 && (!formData.transactionId || !formData.screenshot || isSubmitting))}
            >
              <span className="btn-label">
                {isSubmitting ? 'SUBMITTING...' : step === 5 ? 'FINALIZE PAYMENT' : step === 4 ? 'PAYMENT DONE' : 'CONTINUE'}
              </span>
              <div className="btn-icon-stack">
                <ChevronRight size={18} strokeWidth={2.5} />
              </div>
            </button>
          </footer>
        )}
      </div>
    </div>
  );
}
