"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Menu, X, Building2, Users2, Award, Lightbulb } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const AboutPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/landing-page' },
    { name: 'About', path: '/landing-page/about' },
    { name: 'Contact', path: '#' }
  ];

  const features = [
    {
      icon: <Building2 className="w-6 h-6 text-blue-600" />,
      title: "Established Excellence",
      description: "Founded in Hong Kong with a legacy of corporate partnerships including J.P. Morgan and Deloitte."
    },
    {
      icon: <Users2 className="w-6 h-6 text-blue-600" />,
      title: "Expert Training",
      description: "30 years of refined Business English training material adapted for modern professionals."
    },
    {
      icon: <Lightbulb className="w-6 h-6 text-blue-600" />,
      title: "AI-Powered Learning",
      description: "Cutting-edge AI technology delivering personalized language learning experiences."
    },
    {
      icon: <Award className="w-6 h-6 text-blue-600" />,
      title: "Professional Focus",
      description: "Specialized content designed for career advancement and business communication."
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/">
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
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link key={item.name} href={item.path}>
                  <motion.span
                    className="text-gray-600 hover:text-violet-600 transition-colors cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.name}
                  </motion.span>
                </Link>
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
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </motion.button>
          </div>

          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg"
            >
              <div className="px-4 pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                  <Link key={item.name} href={item.path}>
                    <motion.div
                      className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-violet-600 hover:bg-gray-50 rounded-md"
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </motion.div>
                  </Link>
                ))}
                <Button 
                  className="w-full mt-4 bg-violet-600 hover:bg-violet-700 text-white rounded-full"
                  variant="default"
                >
                  Join the Waitlist
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">About Us</h1>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </motion.div>

          {/* Main Section with Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Logo Card */}
              <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:-translate-y-1 transition-all duration-300">
                <div className="relative w-full" style={{ paddingBottom: "40%" }}>
                  <Image
                    src="/icons/langkey-logo.png"
                    alt="LanguageKey Professional"
                    fill
                    className="object-contain"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="bg-blue-50 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Column */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-2xl shadow-xl p-8 lg:p-10"
            >
              <div className="space-y-8">
                <div className="space-y-4">
                  <span className="inline-block px-4 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold">
                    WHAT IS FLUENTPRO?
                  </span>
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                    Our Mission and Vision
                  </h2>
                </div>

                <div className="space-y-6 text-gray-600">
                  <motion.p 
                    className="text-lg leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    Established in Hong Kong, The LanguageKey has collaborated with industry leaders like 
                    <span className="text-gray-900 font-semibold"> J.P. Morgan and Deloitte, </span> 
                    showcasing our commitment to excellence and effective learning solutions.
                  </motion.p>

                  <motion.p 
                    className="text-lg leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    Our latest product "FluentPro" uses AI to bring 
                    <span className="text-gray-900 font-semibold"> 30 years of Business English training material, </span> 
                    originally developed for in-house classes and workshops, right to your desktop. It offers 
                    <span className="text-gray-900 font-semibold"> customized lessons </span> 
                    that make learning easier and help professionals in various industries build the skills needed for their specific jobs and roles.
                  </motion.p>

                  <motion.p 
                    className="text-lg leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    Our goal is to offer 
                    <span className="text-gray-900 font-semibold"> private Business English tutoring </span> 
                    to anyone, anywhere, at any time, for a fraction of the cost.
                  </motion.p>
                </div>


                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="pt-6"
                >
                  <Button 
                    asChild
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <a 
                      href="https://www.languagekey.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2"
                    >
                      <span>Learn More</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AboutPage;