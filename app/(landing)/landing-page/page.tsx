// File: app/page.tsx
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import PlatformFeatures from '@/components/layouts/PlatformFeatures';
import LearningProcessSection from '@/components/layouts/LandingFunctionality';
import LandingTestimonial from '@/components/layouts/LandingTestimonial';
import LandingCta from '@/components/layouts/LandingCta';
import Footer from '@/components/layouts/Footer';


// Testimonials Data
const row1Testimonials = [
  'adidas', 'arup', 'bank-east-asia', 'bank-of-china', 'bdo',
  'blue-cross', 'bq', 'cbre', 'db-schenker', 'deloitte',
  'dhl', 'dksh', 'hang-seng-bank', 'hk-international-airport', 'hk-jockey-club',
  'hutchison', 'icbc', 'imagine-group', 'ing', 'jp-morgan'
];

const row2Testimonials = [
  'land-registry', 'lane-crawford', 'li-fung', 'lvmh', 'manulife',
  'mothercare', 'mtr', 'parsons', 'pccw', 'phillips',
  'poly', 'pwc', 'sfc', 'sino', 'smartone',
  'sony', 'sun-hung', 'sun-life', 'towngas', 'west-kowloon',
  'zurich'
];

const LandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // State and refs for measuring content width
  const [contentWidth1, setContentWidth1] = useState(0);
  const [contentWidth2, setContentWidth2] = useState(0);
  const containerRef1 = useRef<HTMLDivElement | null>(null);
  const containerRef2 = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateWidth1 = () => {
      if (containerRef1.current) {
        setContentWidth1(containerRef1.current.scrollWidth / 2);
      }
    };
    const updateWidth2 = () => {
      if (containerRef2.current) {
        setContentWidth2(containerRef2.current.scrollWidth / 2);
      }
    };

    // Wait for images to load
    if (containerRef1.current) {
      const images1 = containerRef1.current.querySelectorAll('img');
      let imagesLoaded1 = 0;
      images1.forEach((img: HTMLImageElement) => {
        if (img.complete) {
          imagesLoaded1++;
        } else {
          img.addEventListener('load', () => {
            imagesLoaded1++;
            if (imagesLoaded1 === images1.length) {
              updateWidth1();
            }
          });
        }
      });
      if (imagesLoaded1 === images1.length) {
        updateWidth1();
      }
    }

    if (containerRef2.current) {
      const images2 = containerRef2.current.querySelectorAll('img');
      let imagesLoaded2 = 0;
      images2.forEach((img: HTMLImageElement) => {
        if (img.complete) {
          imagesLoaded2++;
        } else {
          img.addEventListener('load', () => {
            imagesLoaded2++;
            if (imagesLoaded2 === images2.length) {
              updateWidth2();
            }
          });
        }
      });
      if (imagesLoaded2 === images2.length) {
        updateWidth2();
      }
    }

    // Update widths in case images are cached
    updateWidth1();
    updateWidth2();

    // Add window resize listener to update widths
    const handleResize = () => {
      updateWidth1();
      updateWidth2();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-violet-50 overflow-hidden">
        {/* Navigation Bar */}
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className={`fixed w-full z-50 transition-all duration-300 ${
            isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <motion.div 
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src="/icons/logo.svg"
                  alt="FluentPro Logo"
                  width={120}
                  height={30}
                  className="h-8 w-auto"
                />
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {['Home', 'About Us', 'Contact'].map((item) => (
                  <motion.a
                    key={item}
                    href="#"
                    className="text-gray-600 hover:text-violet-600 transition-colors"
                  >
                    {item}
                  </motion.a>
                ))}
                <Button 
                  className="bg-violet-600 hover:bg-violet-700 text-white px-6 rounded-full"
                  variant="default"
                >
                  Join the Waitlist
                </Button>
              </div>

              <motion.button 
                className="md:hidden p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X /> : <Menu />}
              </motion.button>
            </div>
          </div>
        </motion.nav>

        {/* Hero Content */}
        <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* New Tag */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center mb-6"
            >
              <span className="bg-violet-100 text-violet-600 px-4 py-1 rounded-full text-sm font-medium inline-flex items-center gap-2">
                <span className="w-2 h-2 bg-violet-600 rounded-full"></span>
                We've just opened up 5 spots
                <ChevronRight className="w-4 h-4" />
              </span>
            </motion.div>

            {/* Main Content */}
            <div className="text-center max-w-4xl mx-auto space-y-8">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl sm:text-6xl font-bold text-gray-900"
              >
                Speak Business English{' '}
                <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Confidently</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-lg text-gray-600 max-w-2xl mx-auto"
              >
                Practice real scenarios powered by AI and develop skills designed for your specific work role. Master professional communication with personalized feedback.
              </motion.p>

              {/* Feature List */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto"
              >
                {['Personalized Learning Path', 'Real-World Scenarios', 'AI-Powered Feedback', 'Certificate of Completion'].map((feature) => (
                  <motion.div
                    key={feature}
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center gap-2"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-3 h-3 rounded-full bg-violet-600"
                    />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-6 text-lg rounded-full">
                  Join the Waitlist
                </Button>
                <Button 
                  variant="outline"
                  className="group px-8 py-6 text-lg rounded-full border-2"
                >
                  Preview Platform
                </Button>
              </motion.div>

              {/* Hero Image */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="relative mt-16"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative rounded-2xl overflow-hidden shadow-2xl bg-white"
                >
                  <Image
                    src="/icons/hero-section.png"
                    alt="Platform Interface"
                    width={1000}
                    height={600}
                    className="w-full h-auto"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-violet-500/10 to-transparent" />
                </motion.div>

                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-lg p-4 flex gap-4 items-center">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full border-2 border-white bg-gray-200"
                      />
                    ))}
                  </div>
                  <div className="pr-4 border-r border-gray-200">
                    <div className="text-xl font-bold">2,291</div>
                    <div className="text-gray-500 text-sm">Happy Users</div>
                  </div>
                  <div>
                    <div className="flex items-center text-xl font-bold">
                      4.8/5
                      <span className="ml-1 text-yellow-400">★★★★★</span>
                    </div>
                    <div className="text-gray-500 text-sm">Rating</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <section className="py-20 bg-white overflow-hidden">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-lg text-gray-600 mb-2">Clients we've helped...</p>
          <h2 className="text-4xl font-semibold text-gray-900">Respected and Trusted in Asia for 30+ Years</h2>
        </div>

        {/* Logos Container */}
        <div className="relative max-w-7xl mx-auto px-4">
          {/* First Row */}
          <div className="relative mb-16 overflow-hidden">
            <motion.div
              ref={containerRef1}
              animate={contentWidth1 ? { x: [0, -contentWidth1] } : {}}
              transition={{
                x: {
                  duration: 80,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "linear",
                },
              }}
              className="flex gap-24 whitespace-nowrap"
            >
              {/* First set */}
              {row1Testimonials.map((company) => (
                <div
                  key={company}
                  className="inline-flex items-center justify-center min-w-[180px]"
                >
                  <Image
                    src={`/testimonials/${company}.png`}
                    alt={company}
                    width={180}
                    height={90}
                    className="h-16 w-auto object-contain"
                  />
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {row1Testimonials.map((company) => (
                <div
                  key={`${company}-duplicate`}
                  className="inline-flex items-center justify-center min-w-[180px]"
                >
                  <Image
                    src={`/testimonials/${company}.png`}
                    alt={company}
                    width={180}
                    height={90}
                    className="h-16 w-auto object-contain"
                  />
                </div>
              ))}
            </motion.div>
            <div className="absolute inset-y-0 left-0 w-60 bg-gradient-to-r from-white to-transparent" />
            <div className="absolute inset-y-0 right-0 w-60 bg-gradient-to-l from-white to-transparent" />
          </div>

          {/* Second Row */}
          <div className="relative overflow-hidden">
            <motion.div
              ref={containerRef2}
              animate={contentWidth2 ? { x: [-contentWidth2, 0] } : {}}
              transition={{
                x: {
                  duration: 80,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "linear",
                },
              }}
              className="flex gap-24 whitespace-nowrap"
            >
              {/* First set */}
              {row2Testimonials.map((company) => (
                <div
                  key={company}
                  className="inline-flex items-center justify-center min-w-[180px]"
                >
                  <Image
                    src={`/testimonials/${company}.png`}
                    alt={company}
                    width={180}
                    height={90}
                    className="h-16 w-auto object-contain"
                  />
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {row2Testimonials.map((company) => (
                <div
                  key={`${company}-duplicate`}
                  className="inline-flex items-center justify-center min-w-[180px]"
                >
                  <Image
                    src={`/testimonials/${company}.png`}
                    alt={company}
                    width={180}
                    height={90}
                    className="h-16 w-auto object-contain"
                  />
                </div>
              ))}
            </motion.div>
            <div className="absolute inset-y-0 left-0 w-60 bg-gradient-to-r from-white to-transparent" />
            <div className="absolute inset-y-0 right-0 w-60 bg-gradient-to-l from-white to-transparent" />
          </div>
        </div>
      </section>
      <PlatformFeatures />
      <LearningProcessSection />
      <LandingTestimonial />
      <LandingCta />
      <Footer />
    </main>
  );
};

export default LandingPage;
