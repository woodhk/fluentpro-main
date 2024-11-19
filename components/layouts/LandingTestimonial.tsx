import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

// Testimonial interface
interface Testimonial {
  logo: string;
  companyName: string;
  role: string;
  testimonial: string;
}

// First row testimonials
const firstRowTestimonials: Testimonial[] = [
  {
    logo: '/testimonials/bank-east-asia.png',
    companyName: 'Bank of East Asia',
    role: 'Training Manager',
    testimonial:
      'The Language Key Ltd provided a very professional approach to language training and were flexible in order to meet the needs of the trainees. We are very grateful for their quality services.',
  },
  {
    logo: '/testimonials/wing-hang.png',
    companyName: 'Wing Hang Bank',
    role: 'Head of Training Dept.',
    testimonial:
      'Practical and intensive training. Excellent trainers who are flexible enough to cater for our needs.',
  },
  {
    logo: '/testimonials/dksh.png',
    companyName: 'DKSH',
    role: 'Human Resource Manager',
    testimonial:
      'We want to thank The Language Key Ltd for organizing an engaging and tailored English workshop that met our needs. Participants found it valuable for improving workplace communication and gave positive feedback, especially for the trainer, who was friendly and approachable. The workshop was well-planned, interactive, and practical. We highly recommend The Language Key Ltd for English training.',
  },
  {
    logo: '/testimonials/adidas.png',
    companyName: 'Adidas',
    role: 'Human Resource Manager',
    testimonial:
      'The Language Key Ltd has provided a very professional approach to language training especially in the development process of workshop outline. Furthermore, the trainer is friendly and approachable. He always encourages an active learning environment and fosters an enjoyable class. Overall, we have received positive feedback from the workshop participants.',
  },
];

// Second row testimonials
const secondRowTestimonials: Testimonial[] = [
  {
    logo: '/testimonials/mtr.png',
    companyName: 'MTR',
    role: 'Corporate Training Manager',
    testimonial:
      'Thoroughly practical and appropriate to Hong Kong employees. The Language Key Ltd trainers are sincere, committed to their work and flexible enough to cater to our needs.',
  },
  {
    logo: '/testimonials/land-registry.png',
    companyName: 'The Land Registry',
    role: 'Deputy Registry Manager',
    testimonial:
      'We have been impressed by the professionalism in language training shown by The Language Key Ltd and have been satisfied with its service in all aspects. Very positive feedback has been received from the workshop participants. Overall, it has been an enjoyable workshop and just what we were looking for.',
  },
  {
    logo: '/testimonials/csx.png',
    companyName: 'CSX World Terminals',
    role: 'Training & Development Manager',
    testimonial:
      'Sealand has used The Language Key Ltd for three years and found that their English teachers come from outstanding teaching backgrounds and are able to exceed our very demanding requirements.',
  },
  {
    logo: '/testimonials/phillips.png',
    companyName: 'Philips',
    role: 'Human Resource Manager',
    testimonial:
      'Positive feedback was received from the workshop participants especially for the trainers, the teaching methodology and the workshop materials. We have been using The Language Key Ltd for 4 years and have found that with all the workshops they have taught, they have been able to meet our objectives and those of the participants.',
  },
];

const StarRating = () => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
    ))}
  </div>
);

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
  <div className="w-1/3 flex-shrink-0 bg-white rounded-2xl p-6 mx-2 mb-8 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
    {/* Header */}
    <div className="flex items-center gap-4 mb-4">
      <div className="relative w-12 h-12 flex-shrink-0">
        <Image src={testimonial.logo} alt={testimonial.companyName} fill className="object-contain" />
      </div>
      <div>
        <h3 className="font-semibold text-gray-900">{testimonial.companyName}</h3>
        <p className="text-sm text-gray-500">{testimonial.role}</p>
      </div>
    </div>

    {/* Content wrapper with flex-grow */}
    <div className="flex flex-col flex-grow justify-between">
      {/* Testimonial text */}
      <blockquote className="text-gray-600 text-sm leading-relaxed mb-4">
        "{testimonial.testimonial}"
      </blockquote>

      {/* Star rating at bottom */}
      <StarRating />
    </div>
  </div>
);

const LandingTestimonial = () => {
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
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="text-sm font-medium text-violet-600 mb-2">TESTIMONIALS</div>
          <h2 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-4">
            Hear from Our Clients
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-xl">
            Join hundreds of satisfied industry leaders who have improved their teams Business English with our specialized training programs.
          </p>
        </div>

        {/* Testimonials Container */}
        <div className="space-y-12">
          {/* First Row - Left to Right */}
          <div className="relative overflow-hidden">
            <motion.div
              ref={containerRef1}
              animate={contentWidth1 ? { x: [0, -contentWidth1] } : {}}
              transition={{
                x: {
                  duration: 40,
                  repeat: Infinity,
                  repeatType: 'loop',
                  ease: 'linear',
                },
              }}
              className="flex"
            >
              {/* Original set */}
              {firstRowTestimonials.map((testimonial, index) => (
                <TestimonialCard key={index} testimonial={testimonial} />
              ))}
              {/* Duplicate set for seamless loop */}
              {firstRowTestimonials.map((testimonial, index) => (
                <TestimonialCard key={`duplicate-${index}`} testimonial={testimonial} />
              ))}
            </motion.div>
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
          </div>

          {/* Second Row - Right to Left */}
          <div className="relative overflow-hidden">
            <motion.div
              ref={containerRef2}
              animate={contentWidth2 ? { x: [-contentWidth2, 0] } : {}}
              transition={{
                x: {
                  duration: 40,
                  repeat: Infinity,
                  repeatType: 'loop',
                  ease: 'linear',
                },
              }}
              className="flex"
            >
              {/* Original set */}
              {secondRowTestimonials.map((testimonial, index) => (
                <TestimonialCard key={index} testimonial={testimonial} />
              ))}
              {/* Duplicate set for seamless loop */}
              {secondRowTestimonials.map((testimonial, index) => (
                <TestimonialCard key={`duplicate-${index}`} testimonial={testimonial} />
              ))}
            </motion.div>
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingTestimonial;
