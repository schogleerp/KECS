'use client';
import Link from 'next/link';
import Image from 'next/image';
import '../../styles/footer.scss';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">

      {/* ── Grand Editorial Statement ── */}
      <div className="ft-statement">
        <div className="ft-statement__inner">
          <span className="ft-statement__eyebrow">EST. 1951 · BANKURA · WEST BENGAL</span>
          <h2 className="ft-statement__heading">
            Forming Minds.<br />Shaping Futures.
          </h2>
        </div>
        <div className="ft-statement__rule" />
      </div>

      {/* ── 3-Column Grid ── */}
      <div className="ft-cols">

        {/* Col 1 — Identity */}
        <div className="ft-col ft-col--identity">
          <div className="ft-col__logo">
            <Image
              src="/images/kecs-logo.png"
              alt="K.E. Carmel School Bankura"
              width={240}
              height={80}
              className="ft-logo-img"
            />
          </div>

          <div className="ft-col__body">
            <p className="ft-cmi-statement">
              K.E. Carmel Group of Schools, West Bengal belongs to the Christian
              Catholic Religious Congregation of Carmelites of Mary Immaculate
              <em> (C.M.I) Fathers.</em>
            </p>
          </div>
        </div>

        {/* Col 2 — Navigation */}
        <div className="ft-col ft-col--nav">
          <div className="ft-nav-group">
            <p className="ft-nav-head">Institution</p>
            <ul className="ft-nav-list">
              <li><Link href="/about">About the School</Link></li>
              <li><Link href="/about/vision">Our Vision</Link></li>
              <li><Link href="/about/principal">Principal's Message</Link></li>
              <li><Link href="/about/managing-committee">Managing Committee</Link></li>
            </ul>
          </div>
          <div className="ft-nav-group">
            <p className="ft-nav-head">Academics &amp; Life</p>
            <ul className="ft-nav-list">
              <li><Link href="/school-life/academics">Academics</Link></li>
              <li><Link href="/school-life/activities">Co-Curricular</Link></li>
              <li><Link href="/school-life/facilities">Facilities</Link></li>
              <li><Link href="/admissions/procedure">Admissions</Link></li>
              <li><Link href="/admissions/fees">Fee Structure</Link></li>
            </ul>
          </div>
        </div>

        {/* Col 3 — Contact */}
        <div className="ft-col ft-col--contact">
          <div className="ft-contact-group">
            <p className="ft-nav-head">Find Us</p>
            <p className="ft-address">
            Kantabari, P.O. – Hirapur<br />
            Dist – Bankura, West Bengal 722152
          </p>
          </div>

          <div className="ft-contact-group">
            <p className="ft-nav-head">Reach Us</p>
            <div className="ft-contact-links">
              <a href="tel:7865964842" className="ft-contact-link">
              <span className="ft-contact-type">M</span>
              7865964842
            </a>
            <a href="mailto:kecsbankura@gmail.com" className="ft-contact-link">
              <span className="ft-contact-type">E</span>
              kecsbankura@gmail.com
            </a>
            </div>
          </div>

          <div className="ft-contact-group ft-social-group">
            <p className="ft-nav-head">Follow</p>
            <div className="ft-social-grid">
              <a href="#" target="_blank" rel="noopener noreferrer" className="ft-social-btn" aria-label="Instagram">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="ft-social-btn" aria-label="Facebook">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="ft-social-btn" aria-label="YouTube">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/></svg>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="ft-social-btn" aria-label="LinkedIn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* ── Bottom bar ── */}
      <div className="ft-bottom">
        <span className="ft-bottom__copy">
          © {currentYear} K.E. Carmel School, Bankura. All Rights Reserved.
        </span>
        <div className="ft-bottom__links">
          <Link href="/privacy">Privacy</Link>
          <span className="ft-bottom__dot">·</span>
          <Link href="/terms">Terms</Link>
          <span className="ft-bottom__dot">·</span>
          <Link href="/admissions/apply">Apply Online</Link>
        </div>
      </div>

    </footer>
  );
}
