import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Mail, 
  MapPin, 
  Phone, 
  ArrowUpRight, 
  Linkedin,
  Facebook,
  Twitter,
  Instagram 
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const companyLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Our Team', href: '/team' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' }
  ];

  const legalLinks = [
    { name: 'Terms & Conditions', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Accessibility', href: '/accessibility' }
  ];

  const socialLinks = [
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' }
  ];

  return (
    <footer className="relative bg-gradient-to-b from-white to-gray-50">
      {/* Top border gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Column */}
            <div className="space-y-8">
              <Link href="/" className="inline-block">
                <div className="relative w-48 h-12">
                  <Image
                    src="/icons/langkey-logo.png"
                    alt="LanguageKey Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </Link>
              <p className="text-gray-600 leading-relaxed">
                Empowering global communication through innovative language learning solutions tailored for business professionals.
              </p>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="group p-2 rounded-full bg-gray-50 hover:bg-blue-50 transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <social.icon className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Company Links */}
            <div className="space-y-6">
              <h3 className="text-gray-900 font-semibold">Company</h3>
              <ul className="space-y-4">
                {companyLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="group flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200"
                    >
                      <span>{link.name}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div className="space-y-6">
              <h3 className="text-gray-900 font-semibold">Legal</h3>
              <ul className="space-y-4">
                {legalLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="group flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200"
                    >
                      <span>{link.name}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <h3 className="text-gray-900 font-semibold">Contact Us</h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="mailto:enquiry@languagekey.com"
                    className="group flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors duration-200"
                  >
                    <Mail className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
                    <span>enquiry@languagekey.com</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="tel:+85281914858"
                    className="group flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors duration-200"
                  >
                    <Phone className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
                    <span>+852 8191 4858</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-3 text-gray-600 hover:text-blue-600 transition-colors duration-200"
                  >
                    <MapPin className="w-5 h-5 mt-1 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
                    <span>10a, Eton Building, 288 Des Voeux Road Central, Hong Kong</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200">
          <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              © {currentYear} The LanguageKey Ltd. All rights reserved.
            </p>
            
            {/* Language Selector */}
            <div className="flex items-center gap-3">
              <select
                className="bg-transparent text-sm text-gray-600 border border-gray-200 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-colors duration-200"
                defaultValue="en"
              >
                <option value="en">English</option>
                <option value="zh">中文</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;