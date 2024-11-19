import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const companyLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Our Team', href: '/team' },
    { name: 'Careers', href: '/careers' },
    { name: 'Blog', href: '/blog' },
  ];

  const legalLinks = [
    { name: 'Terms & Conditions', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Accessibility', href: '/accessibility' },
  ];

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      text: 'fluentpro@languagekey.com',
      href: 'mailto:fluentpro@languagekey.com',
    },
    {
      icon: <Phone className="h-5 w-5" />,
      text: '+852 8191 4858',
      href: 'tel:+852 8191 4858',
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      text: '10a, Eton Building, 288 Des Voeux Road Central, Hong Kong',
      href: 'https://maps.google.com',
    },
  ];

  return (
    <footer className="bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 px-6 py-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <Image
                src="/icons/logo.svg"
                alt="LanguageKey Logo"
                width={160}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed">
              Empowering global communication through innovative language learning solutions.
            </p>
            
            {/* LinkedIn Link */}
            <div className="flex gap-4">
              <Link
                href="https://www.linkedin.com/company/the-language-key-ltd/?viewAsMember=true"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
              >
                <Image
                  src="/icons/linkedin.png"
                  alt="LinkedIn"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </Link>
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
                    className="text-gray-600 hover:text-blue-600 text-sm transition-colors duration-200"
                  >
                    {link.name}
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
                    className="text-gray-600 hover:text-blue-600 text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-gray-900 font-semibold">Contact Us</h3>
            <ul className="space-y-4">
              {contactInfo.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 text-gray-600 hover:text-blue-600 text-sm transition-colors duration-200 group"
                  >
                    <span className="group-hover:text-blue-600 transition-colors duration-200">
                      {item.icon}
                    </span>
                    <span className="break-words">{item.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200">
          <div className="px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              © {currentYear} The LanguageKey Ltd. All rights reserved.
            </p>
            
            {/* Language Selector */}
            <div className="flex items-center gap-3">
              <select
                className="bg-transparent text-sm text-gray-600 border border-gray-200 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
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