import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface Section {
  title: string;
  description: string;
  image: string;
  isReversed: boolean;
}

const sections: Section[] = [
  {
    title: "Personalized Learning Path",
    description: "Experience a tailored educational journey designed just for you. Our advanced platform analyzes your goals, current proficiency, and learning style to create a customized path that optimizes your progress and ensures effective skill development.",
    image: "/icons/hero-section.png",
    isReversed: false,
  },
  {
    title: "AI-Driven Practice",
    description: "Engage in realistic conversations and scenarios powered by advanced AI technology. Practice your language skills in authentic situations that adapt to your level, providing immediate feedback and helping you build genuine communication confidence.",
    image: "/icons/real-world-simulation.png",
    isReversed: true,
  },
  {
    title: "User Information Management",
    description: "Take control of your learning journey with our intuitive information management system. Track your progress, manage your schedule, and access your learning materials - all in one centralized, easy-to-navigate platform.",
    image: "/icons/user-info.png",
    isReversed: false,
  },
  {
    title: "Certification Tracking",
    description: "Monitor your achievements and showcase your success. Keep track of completed courses, earned certificates, and skill validations. Build a comprehensive portfolio of your language learning accomplishments all in one place.",
    image: "/icons/certificate.png",
    isReversed: true,
  },
];

const LearningJourneySections = () => {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 pt-24 sm:px-6 lg:px-8"
      >
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            How Does <span className="text-blue-600">FluentPro</span> Work?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Master language learning through our proven 4-step process
          </p>
          <div className="flex justify-center space-x-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-1.5 w-1.5 rounded-full bg-blue-600" />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
        {sections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className={`flex flex-col ${
              index !== sections.length - 1 ? 'mb-32' : ''
            } lg:mb-40 lg:flex-row ${
              section.isReversed ? 'lg:flex-row-reverse' : ''
            } items-center gap-16`}
          >
            {/* Image Container */}
            <div className="w-full lg:w-1/2">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-lg transition-transform duration-300 hover:scale-[1.02]">
                <div className={`absolute inset-0 ${
                  section.isReversed 
                    ? 'bg-gradient-to-br from-blue-50 to-indigo-50' 
                    : 'bg-gradient-to-br from-blue-50 to-sky-50'
                } opacity-90 rounded-3xl`} />
                <Image
                  src={section.image}
                  alt={section.title}
                  fill
                  className="object-cover p-8 transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index === 0}
                />
              </div>
            </div>

            {/* Content Container */}
            <div className="w-full lg:w-1/2">
              <div className="max-w-xl space-y-8">
                <div className="flex items-center gap-4">
                  <span className="flex items-center justify-center h-12 w-12 rounded-2xl bg-blue-600 text-white font-bold text-lg shadow-lg">
                    {index + 1}
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-r from-blue-600/50 to-transparent" />
                </div>
                
                <h3 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  {section.title}
                </h3>
                
                <p className="text-lg leading-relaxed text-gray-600">
                  {section.description}
                </p>
                
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-colors duration-200"
                >
                  Learn More
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LearningJourneySections;