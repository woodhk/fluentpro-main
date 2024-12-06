"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Building2, 
  Briefcase, 
  ShieldCheck, 
  Store, 
  Building, 
  Ship, 
  Router, 
  Hotel, 
  Plane,
  Banknote,
  ArrowLeft,
  ChevronRight
} from 'lucide-react';

const PersonalizationFlow = () => {
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [hotelRole, setHotelRole] = useState('');
  const [step, setStep] = useState(1);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const industries = [
    { id: 'accounting', label: 'Accounting, Banking & Finance', icon: Banknote },
    { id: 'insurance', label: 'Insurance', icon: ShieldCheck },
    { id: 'trading', label: 'Trading', icon: Briefcase },
    { id: 'retail', label: 'Retail', icon: Store },
    { id: 'government', label: 'Public Services & Government', icon: Building },
    { id: 'property', label: 'Property Management', icon: Building2 },
    { id: 'shipping', label: 'Shipping & Logistics', icon: Ship },
    { id: 'technology', label: 'Technology & Telecoms', icon: Router },
    { id: 'hotels', label: 'Hotels', icon: Hotel },
    { id: 'leisure', label: 'Leisure & Travel', icon: Plane }
  ];

  const hotelRoles = [
    { 
      category: 'Front of House',
      icon: Hotel, 
      roles: [
        'Front Desk and Reception Staff',
        'Concierge Staff',
        'Guest Relations Officers',
        'Bellhops & Porters'
      ]
    },
    { 
      category: 'Food & Beverage',
      icon: Store,
      roles: [
        'Bar Staff',
        'Waiters and Waitresses',
        'Room Service Staff',
        'Kitchen Staff'
      ]
    },
    { 
      category: 'Events & Activities',
      icon: Building2,
      roles: [
        'Banquet and Event Staff',
        'Event Coordinators',
        'Kids\' Club Staff',
        'Fitness Instructors'
      ]
    }
  ];

  const handleIndustrySelect = (industry: string) => {
    setSelectedIndustry(industry);
    if (industry === 'hotels') {
      setTimeout(() => setStep(2), 300);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div 
          className="bg-white rounded-3xl shadow-lg overflow-hidden"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Header */}
          <div className="relative h-48 bg-gradient-to-r from-blue-600 to-blue-400 px-8 py-6">
            <motion.div 
              className="absolute inset-0 opacity-10"
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
                backgroundSize: ['100% 100%', '120% 120%']
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              style={{
                backgroundImage: 'url("/pattern.svg")'
              }}
            />
            
            <div className="relative flex justify-between items-start">
              <div className="space-y-2">
                <img src="/public/icons/logo.png" alt="FluentPro Logo" className="h-8 mb-4" />
                <h1 className="text-3xl font-bold text-white">Let's Personalize Your Experience</h1>
                <p className="text-blue-100">Tell us about your work to get the most relevant content</p>
              </div>
              
              {/* Progress Steps */}
              <div className="flex items-center gap-2 bg-white/10 rounded-full p-2">
                {[1, 2, 3].map((dot) => (
                  <motion.div
                    key={dot}
                    className={`h-2 w-2 rounded-full ${
                      dot <= step ? 'bg-white' : 'bg-blue-200'
                    }`}
                    initial={false}
                    animate={{
                      scale: dot === step ? 1.2 : 1
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="px-8 py-12">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="step1"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={containerVariants}
                  className="space-y-8"
                >
                  <motion.div variants={itemVariants}>
                    <h2 className="text-2xl font-semibold text-gray-900">
                      What's your industry?
                    </h2>
                    <p className="text-gray-500 mt-2">
                      Select your industry to help us customize your learning experience
                    </p>
                  </motion.div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {industries.map((industry, index) => {
                      const Icon = industry.icon;
                      const isHovered = hoverIndex === index;
                      
                      return (
                        <motion.button
                          key={industry.id}
                          variants={itemVariants}
                          onHoverStart={() => setHoverIndex(index)}
                          onHoverEnd={() => setHoverIndex(null)}
                          onClick={() => handleIndustrySelect(industry.id)}
                          className={`group relative flex items-center gap-4 p-6 rounded-xl border-2 transition-all
                            ${selectedIndustry === industry.id 
                              ? 'border-blue-600 bg-blue-50' 
                              : 'border-gray-200 hover:border-blue-200'
                            }`}
                          whileHover={{ y: -4 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <motion.div 
                            className={`p-3 rounded-xl transition-colors ${
                              selectedIndustry === industry.id 
                                ? 'bg-blue-100' 
                                : 'bg-gray-100 group-hover:bg-blue-50'
                            }`}
                            animate={{
                              rotate: isHovered ? 360 : 0
                            }}
                            transition={{
                              duration: 0.4,
                              ease: "easeInOut"
                            }}
                          >
                            <Icon className={`h-6 w-6 ${
                              selectedIndustry === industry.id 
                                ? 'text-blue-600' 
                                : 'text-gray-600 group-hover:text-blue-500'
                            }`} />
                          </motion.div>
                          
                          <span className={`text-lg font-medium ${
                            selectedIndustry === industry.id 
                              ? 'text-blue-600' 
                              : 'text-gray-700'
                          }`}>
                            {industry.label}
                          </span>
                          
                          <motion.div
                            className="absolute right-4"
                            initial={false}
                            animate={{
                              opacity: selectedIndustry === industry.id ? 1 : 0,
                              x: selectedIndustry === industry.id ? 0 : 10
                            }}
                          >
                            <ChevronRight className="h-5 w-5 text-blue-600" />
                          </motion.div>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="step2"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={containerVariants}
                  className="space-y-8"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <Button
                      variant="ghost"
                      onClick={() => setStep(1)}
                      className="p-2 hover:bg-blue-50"
                    >
                      <ArrowLeft className="h-5 w-5 text-blue-600" />
                    </Button>
                    <div>
                      <h2 className="text-2xl font-semibold text-gray-900">
                        What's your role?
                      </h2>
                      <p className="text-gray-500 mt-1">
                        Select your specific role in the hospitality industry
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {hotelRoles.map((category, index) => {
                      const Icon = category.icon;
                      return (
                        <motion.div
                          key={category.category}
                          variants={itemVariants}
                          className="space-y-4"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-blue-50">
                              <Icon className="h-5 w-5 text-blue-600" />
                            </div>
                            <h3 className="font-medium text-gray-900">
                              {category.category}
                            </h3>
                          </div>
                          
                          <div className="space-y-2">
                            {category.roles.map((role) => (
                              <motion.button
                                key={role}
                                onClick={() => setHotelRole(role)}
                                className={`w-full p-4 text-left rounded-xl border-2 transition-all
                                  ${hotelRole === role 
                                    ? 'border-blue-600 bg-blue-50 text-blue-600' 
                                    : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50/50'
                                  }`}
                                whileHover={{ x: 4 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                {role}
                              </motion.button>
                            ))}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  <motion.div 
                    className="flex justify-end pt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hotelRole ? 1 : 0 }}
                  >
                    <Button
                      onClick={() => console.log('Next step')}
                      disabled={!hotelRole}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-xl"
                    >
                      Continue
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PersonalizationFlow;