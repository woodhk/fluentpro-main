"use client";

import React from 'react';
import NavBar from '@/components/layouts/NavBar';
import HeroSection from '@/components/layouts/HeroSection';
import Testimonial1 from '@/components/layouts/Testimonial1';
import ProductsServices from '@/components/layouts/Products-Services';
import IndustriesSection from '@/components/layouts/IndustrySection';
import LandingTestimonial from '@/components/layouts/LandingTestimonial';
import Team from '@/components/layouts/Team';
import BusinessEnglishAssessment from '@/components/layouts/LandingCtaLkey';
import Footer from '@/components/layouts/FooterLkey';

export default function Page() {
  return (
    <>
      <NavBar />
      <HeroSection />
      <Testimonial1 />
      <ProductsServices />
      <IndustriesSection />
      <Team />
      <LandingTestimonial />
      <BusinessEnglishAssessment />
      <Footer />
      {/* Rest of your page content */}
    </>
  );
}
