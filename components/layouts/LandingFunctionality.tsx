import React from 'react';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const sections = [
  {
    title: "Personalized Learning Path",
    description: "Staff will experience a tailored educational journey designed just for their work role. Our advanced platform analyzes your goals, current proficiency, and learning style to create a customized path that optimizes their progress and ensures effective skill development.",
    image: "/icons/hero-section.png",
    isReversed: false,
  },
  {
    title: "Real-World Scenarios",
    description: "Employees engage in realistic conversations and scenarios powered by advanced AI technology. Staff will practice their language skills in authentic situations that adapt to their level, providing immediate feedback and helping them build genuine communication confidence.",
    image: "/icons/real-world-simulation.png",
    isReversed: true,
  },
  {
    title: "Measure Progress",
    description: "Take control of staffs' learning journey with our intuitive information management system. Measure the progress of employees, departments, or the whole company using FluentPro's Admin dashboards.",
    image: "/icons/user-info.png",
    isReversed: false,
  },
  {
    title: "Certificate of Completion",
    description: "Monitor employees' achievements and showcase their success. Keep track of completed courses, earned certificates, and skill validations. Build a comprehensive portfolio of staffs' language learning accomplishments all in one place.",
    image: "/icons/certificate.png",
    isReversed: true,
  },
];

const LearningJourneySections = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-radial from-blue-100/20 to-transparent opacity-40 blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-radial from-indigo-100/20 to-transparent opacity-40 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      {/* Hero Section */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 pt-24 pb-16 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-8"
          >
            {/* Animated Dots */}
            <div className="inline-flex">
              <div className="flex items-center justify-center space-x-2 bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                    className="h-2 w-2 rounded-full bg-blue-600"
                  />
                ))}
              </div>
            </div>
            
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Designed for{' '}
              <span className="relative inline-block">
                <span className="text-blue-600">Learners</span>
                <motion.span
                  className="absolute -bottom-2 left-0 h-1 w-full bg-blue-600/30"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                />
              </span>
              .{' '}Loved by{' '}
              <span className="relative inline-block">
                <span className="text-blue-600">HR</span>
                <motion.span
                  className="absolute -bottom-2 left-0 h-1 w-full bg-blue-600/30"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                />
              </span>
            </h2>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              FluentPro streamlines the recruitment and learning & development process.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="space-y-40">
          {sections.map((section, index) => (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              key={index}
              className={`group relative flex flex-col lg:flex-row ${
                section.isReversed ? 'lg:flex-row-reverse' : ''
              } items-center gap-16`}
            >
              {/* Enhanced Glass Card Effect */}
              <div className="absolute -inset-8 rounded-3xl bg-white/40 backdrop-blur-lg shadow-xl ring-1 ring-gray-100/50 -z-10 transition-all duration-500 group-hover:shadow-2xl group-hover:-inset-10" />

              {/* Gradient Background */}
              <div className="absolute inset-0 -z-20">
                <div className={`absolute ${
                  section.isReversed ? 'right-0' : 'left-0'
                } top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-blue-100/30 to-indigo-100/30 rounded-full blur-3xl opacity-60 transition-all duration-700 group-hover:scale-110`} />
              </div>

              {/* Image Section */}
              <motion.div 
                className="w-full lg:w-1/2"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-white/80 backdrop-blur-sm shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/90 to-white/90" />
                  <Image
                    src={section.image}
                    alt={section.title}
                    fill
                    className="object-cover p-8 transition-all duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={index === 0}
                  />
                </div>
              </motion.div>

              {/* Content Section */}
              <div className="w-full lg:w-1/2">
                <div className="max-w-xl space-y-8">
                  {/* Step Indicator */}
                  <motion.div 
                    className="flex items-center gap-4"
                    initial={{ width: 0 }}
                    whileInView={{ width: "auto" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      className="relative"
                    >
                      <div className="absolute inset-0 bg-blue-300 rounded-2xl blur-xl opacity-40" />
                      <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold text-2xl shadow-lg">
                        {index + 1}
                      </div>
                    </motion.div>
                    <motion.div 
                      className="h-px flex-1 bg-gradient-to-r from-blue-600/50 to-transparent"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    {section.title}
                  </h3>

                  {/* Description */}
                  <p className="text-lg leading-relaxed text-gray-600">
                    {section.description}
                  </p>

                  {/* Enhanced CTA Button */}
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-base font-semibold text-white shadow-lg transition-all duration-300"
                  >
                    <span className="relative z-10">Learn More</span>
                    <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearningJourneySections;