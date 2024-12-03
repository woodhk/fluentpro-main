import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const row1Testimonials = [
  'adidas', 'arup', 'bank-east-asia', 'bank-of-china', 'bdo', 'deloitte',
  'jp-morgan', 'blue-cross', 'bq', 'cbre', 'db-schenker',
  'dhl', 'dksh', 'hang-seng-bank', 'hk-international-airport', 'hk-jockey-club',
  'hutchison', 'icbc', 'imagine-group', 'ing'
];

const row2Testimonials = [
  'land-registry', 'hsbc', 'lane-crawford', 'li-fung', 'lvmh', 'manulife', 'pwc',
  'mothercare', 'mtr', 'parsons', 'pccw', 'phillips',
  'poly', 'sfc', 'sino', 'smartone',
  'sony', 'sun-hung', 'sun-life', 'towngas', 'west-kowloon',
  'zurich'
];

const Testimonial1 = () => {
  const [contentWidth1, setContentWidth1] = useState(0);
  const [contentWidth2, setContentWidth2] = useState(0);
  const containerRef1 = useRef<HTMLDivElement | null>(null);
  const containerRef2 = useRef<HTMLDivElement | null>(null);

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

    const handleResize = () => {
      updateWidth1();
      updateWidth2();
    };

    // Initial update
    updateWidth1();
    updateWidth2();

    // Update on window resize
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="py-20 bg-white overflow-hidden">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-5xl font-semibold text-gray-900 mb-4">
          Trusted by 100+ Leading Brands
        </h2>
        <p className="text-xl text-gray-600">
          Leading Brands Rely on The LanguageKey for effective Business English Training
        </p>
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
            {[...row1Testimonials, ...row1Testimonials].map((company, index) => (
              <div
                key={`${company}-${index}`}
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
            {[...row2Testimonials, ...row2Testimonials].map((company, index) => (
              <div
                key={`${company}-${index}`}
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
  );
};

export default Testimonial1;