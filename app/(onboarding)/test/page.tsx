"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { 
  MessageSquare, 
  Clock, 
  CheckSquare, 
  ChevronRight,
  ArrowRight,
  Star,
  Volume2 
} from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const WelcomePage = () => {
  const router = useRouter();

  const sections = [
    {
      icon: <MessageSquare className="h-6 w-6 text-blue-600" />,
      title: "Short Interview",
      duration: "4-5 minutes",
      description: "Initial questions to understand your English level"
    },
    {
      icon: <Volume2 className="h-6 w-6 text-blue-600" />,
      title: "Short Presentation",
      duration: "4-5 minutes",
      description: "Present on a chosen topic with follow-up questions"
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-blue-600" />,
      title: "Discussion",
      duration: "4-5 minutes",
      description: "Extended conversation on a specific topic"
    }
  ];

  const handleStart = () => {
    router.push('/first-section'); // Replace with your first section route
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Image
              src="/icons/logo.svg"
              alt="FluentPro Logo"
              width={200}
              height={50}
              className="h-12 w-auto"
            />
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Your English Assessment
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            This assessment will evaluate your English speaking skills through three interactive sections
          </p>
        </motion.div>

        {/* Test Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          {sections.map((section, index) => (
            <Card key={index} className="relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    {section.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {section.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <Clock className="h-4 w-4" />
                      <span>{section.duration}</span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      {section.description}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </motion.div>

        {/* Key Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <Card className="bg-blue-50 border-blue-200">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-blue-900 mb-4">
                Before You Begin
              </h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckSquare className="h-5 w-5 text-blue-600 mt-0.5" />
                  <p className="text-blue-800">
                    Ensure you're in a quiet environment with a working microphone
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckSquare className="h-5 w-5 text-blue-600 mt-0.5" />
                  <p className="text-blue-800">
                    Each section has specific time limits that will be clearly displayed
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckSquare className="h-5 w-5 text-blue-600 mt-0.5" />
                  <p className="text-blue-800">
                    Speak clearly and try to provide detailed responses
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Start Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center"
        >
          <Button
            onClick={handleStart}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-xl text-lg font-semibold shadow-lg transform transition-all hover:scale-105 active:scale-95"
          >
            <span className="flex items-center gap-3">
              Get Started
              <ArrowRight className="h-6 w-6" />
            </span>
          </Button>
        </motion.div>

        {/* Decorative Elements */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-20 left-10">
            <Star className="h-6 w-6 text-blue-200" />
          </div>
          <div className="absolute bottom-20 right-10">
            <Star className="h-6 w-6 text-blue-200" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;