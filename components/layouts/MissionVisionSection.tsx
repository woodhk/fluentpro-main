import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const MissionVisionSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Column with proper z-indexing */}
          <div className="relative group">
            {/* Background decorative elements */}
            <div className="absolute inset-0 bg-blue-600/10 rounded-3xl transform rotate-3 transition-transform group-hover:rotate-6 z-10" />
            
            {/* Main image container */}
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-xl transition-transform transform group-hover:scale-[1.02] z-20">
              {/* The actual image */}
              <div className="absolute inset-0 bg-white z-0" /> {/* Fallback background */}
              <Image
                src="/icons/langkey-logo.png"
                alt="LanguageKey Logo"
                className="z-10 relative"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{
                  objectFit: 'contain',
                  objectPosition: 'center',
                  backgroundColor: 'white'
                }}
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent z-20 pointer-events-none" />
            </div>
            
            {/* Decorative circles */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-100 rounded-full opacity-50 z-0" />
            <div className="absolute -top-6 -left-6 w-16 h-16 bg-blue-200 rounded-full opacity-30 z-0" />
          </div>

          {/* Content Column */}
          <div className="space-y-8">
            <div className="space-y-2">
              <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold tracking-wide">
                WHAT IS FLUENTPRO?
              </span>
              <h2 className="text-4xl font-bold text-gray-900">
                Our Mission and Vision
              </h2>
            </div>

            <div className="space-y-6 text-lg text-gray-600">
              <p>
                Established in Hong Kong, The LanguageKey has collaborated with industry leaders like{' '}
                <span className="font-semibold text-gray-900">J.P. Morgan and Deloitte</span>, showcasing our commitment to excellence and effective learning solutions.
              </p>
              
              <p>
                Our latest product <span className="font-semibold text-gray-900">"FluentPro"</span> uses AI to bring{' '}
                <span className="font-semibold text-gray-900">30 years of Business English training material</span>, originally developed for in-house classes and workshops, right to your desktop.
              </p>
              
              <p>
                Our goal is to offer{' '}
                <span className="font-semibold text-gray-900">private Business English tutoring</span> to anyone, anywhere, at any time, for a fraction of the cost.
              </p>
            </div>

            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <a
                href="https://www.languagekey.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                Learn More
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M13 7l5 5m0 0l-5 5m5-5H6" 
                  />
                </svg>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVisionSection;