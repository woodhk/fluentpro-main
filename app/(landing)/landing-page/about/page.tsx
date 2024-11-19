"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Menu, X, Building2, Users2, Award, Lightbulb } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import MissionVisionSection from '@/components/layouts/MissionVisionSection';

const AboutPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation items
  const navItems = [
    { name: 'Home', path: '/landing-page' },
    { name: 'About', path: '/landing-page/about' },
    { name: 'Contact', path: '#' },
  ];

  // Features to display
  const features = [
    {
      icon: <Building2 className="w-6 h-6 text-blue-600" />,
      title: 'Trusted by Industry Leaders',
      description:
        'Founded in Hong Kong, our expertise is trusted by top-tier partners such as J.P. Morgan and HSBC.',
    },
    {
      icon: <Users2 className="w-6 h-6 text-blue-600" />,
      title: 'Decades of Expertise',
      description:
        'Three decades of polished Business English training material tailored specifically for non-native English-speaking professionals.',
    },
    {
      icon: <Lightbulb className="w-6 h-6 text-blue-600" />,
      title: 'AI-Powered Learning',
      description:
        'Cutting-edge AI technology delivering personalized language learning experiences.',
    },
    {
      icon: <Award className="w-6 h-6 text-blue-600" />,
      title: 'Business English Focus',
      description:
        'Specialized content designed for career advancement and business communication.',
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/">
              <motion.div
                className="flex items-center cursor-pointer"
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
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link key={item.name} href={item.path}>
                  <motion.span
                    className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.name}
                  </motion.span>
                </Link>
              ))}
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full"
                variant="default"
              >
                Join the Waitlist
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </motion.button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg z-40"
              >
                <div className="px-4 pt-2 pb-3 space-y-1">
                  {navItems.map((item) => (
                    <Link key={item.name} href={item.path}>
                      <motion.div
                        className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </motion.div>
                    </Link>
                  ))}
                  <Button
                    className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full"
                    variant="default"
                  >
                    Join the Waitlist
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
              Respected and Trusted in Hong Kong for 30+ Years
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Delivering excellence in Business English training and personalized learning experiences.
            </p>
            <div className="mt-8">
            </div>
          </motion.div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-blue-50 rounded-full p-3 mr-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                </div>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
        <MissionVisionSection />
    </main>
  );
};

export default AboutPage;
