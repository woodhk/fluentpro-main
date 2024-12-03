import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import Image from 'next/image';

const HeroSection = () => {
  const features = [
    'Professional Business English Training',
    'Corporate Language Solutions',
    'Language Proficiency Testing',
    'Customized Learning Programs'
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-blue-100/30 to-violet-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-blue-100/30 to-violet-100/30 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Column */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
          >
            {/* Tag Line */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex mb-6"
            >
              <span className="bg-blue-50 text-blue-600 rounded-full px-4 py-1.5 text-sm font-medium border border-blue-100">
                Leading Language Training in Hong Kong
              </span>
            </motion.div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Providing Key Solutions to your{' '}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                  Business Language
                </span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-blue-200/30 -z-10 transform -rotate-1" />
              </span>{' '}
              Training Needs
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              The Language Key is an established language training consultancy based in Hong Kong. 
              Our focus is on corporate language training in English, language proficiency testing/benchmarking and soft skills training.
            </p>

            {/* Feature List */}
            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                    <Check className="w-3 h-3 text-blue-600" />
                  </div>
                  <span className="text-gray-600">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <Button 
                className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                Claim Your Free Business English Level Test
                <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
          >
            <div className="relative aspect-square w-full">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-violet-100/50 rounded-3xl transform rotate-3 transition-transform group-hover:rotate-6" />
              <div className="relative w-full h-full rounded-3xl overflow-hidden border border-gray-200 bg-white shadow-2xl">
                <Image
                  src="/public/icons/hongkong.svg"
                  alt="Business Language Training"
                  fill
                  className="object-cover"
                  priority
                />
                
                {/* Decorative elements */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-100 rounded-full opacity-50" />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-violet-100 rounded-full opacity-50" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;