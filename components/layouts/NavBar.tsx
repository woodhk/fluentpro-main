import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const NavBar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Product & Services', href: '#', hasDropdown: true },
    { name: 'Blogs', href: '#' },
    { name: 'Contact Us', href: '#' }
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' 
          : 'bg-white/50 backdrop-blur-sm py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <motion.div 
          className="relative w-40 h-12"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Image
            src="/icons/langkey-logo.png"
            alt="Language Key Logo"
            fill
            className="object-contain"
            priority
          />
        </motion.div>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <motion.div
              key={link.name}
              className="relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                className={`flex items-center gap-1 px-1 py-2 text-sm font-medium transition-colors
                  ${activeLink === link.name 
                    ? 'text-blue-600' 
                    : 'text-gray-600 hover:text-blue-600'
                  }`}
                onClick={() => setActiveLink(link.name)}
              >
                {link.name}
                {link.hasDropdown && (
                  <ChevronDown className="h-4 w-4 opacity-50" />
                )}
              </button>
              
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-blue-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: activeLink === link.name ? '100%' : 0 }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>
          ))}
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 rounded-full bg-blue-600 text-white text-sm font-medium
              shadow-md hover:shadow-lg hover:bg-blue-700 transition-all duration-300"
          >
            Get Started
          </motion.button>
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </motion.button>
      </div>
    </motion.nav>
  );
};

export default NavBar;