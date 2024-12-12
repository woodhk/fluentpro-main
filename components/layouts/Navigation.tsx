import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { X, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavigationProps {
  isScrolled: boolean;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (value: boolean) => void;
}

const Navigation = ({ isScrolled, isMobileMenuOpen, setIsMobileMenuOpen }: NavigationProps) => {
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Learn More', path: '/training-video-1' },
    { name: 'Contact', path: '#' }
  ];

  return (
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

          {/* Desktop Navigation */}
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
              Sign-Up for Early Access
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

        {/* Mobile Menu */}
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
  );
};

export default Navigation;