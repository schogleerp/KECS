'use client';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import '../../styles/magneticLink.scss';

export default function MagneticLink({ href, children, className = '' }) {
  return (
    <Link href={href} className={`gsap-link ${className}`}>
      <span className="link-text">{children}</span>
      <span className="link-arrow">
        <ArrowUpRight size={18} strokeWidth={2} />
        <ArrowUpRight className="arrow-ghost" size={18} strokeWidth={2} />
      </span>
    </Link>
  );
}
