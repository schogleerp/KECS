'use client';
import '../../styles/dsGridOverlay.scss';

/**
 * DsGridOverlay
 *
 * Renders 6 persistent 1px vertical lines across the full viewport height,
 * dividing the page into a 7-column Decor Systems grid. Purely decorative —
 * pointer-events: none, z-index: 0.
 */
export default function DsGridOverlay() {
  return (
    <div className="ds-grid-overlay" aria-hidden="true">
      {[...Array(15)].map((_, i) => (
        <div key={i} className="ds-grid-line-v"></div>
      ))}
    </div>
  );
}
