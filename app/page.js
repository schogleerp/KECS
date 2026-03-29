'use client';

import Hero from '../components/Home/Hero';
import HomeAdmission from '../components/Home/HomeAdmission';
import FacilitiesStrengths from '../components/Home/FacilitiesStrengths';
import OurStrengths from '../components/Home/OurStrengths';
import Gallery from '../components/Home/Gallery';
import OurBranches from '../components/Home/OurBranches';

export default function Home() {
  return (
    <div className="home-page-wrapper">
      <Hero />
      <HomeAdmission />
      <FacilitiesStrengths />
      <OurStrengths />
      <Gallery />
      <OurBranches />
    </div>
  );
}
