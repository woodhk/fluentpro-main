"use client";

import React from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ChevronRight, BookOpen, Users, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { rolePlayData } from '@/app/data/role-play';
import { scenarios } from '@/app/data/scenario';

const RolePlayIntroduction = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lessonSlug = searchParams.get('lesson') || 'offering-help';

  const scenarioData = scenarios[lessonSlug];
  const rolePlayInfo = rolePlayData[lessonSlug];

  const handleContinue = () => {
    router.push(`/lesson-practice/role-play-simulation/part1?lesson=${lessonSlug}`);
  };

  const progressSteps = [
    { status: 'completed' },
    { status: 'completed' },
    { status: 'pending' },
    { status: 'pending' },
    { status: 'pending' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white border-b z-50 backdrop-blur-sm bg-white/90">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/icons/logo.svg"
              alt="FluentPro Logo"
              width={120}
              height={30}
              className="h-8 w-auto"
            />
          </div>
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-900"
          >
            Exit
          </Button>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="pt-24 pb-8 px-4">
        <div className="max-w-md mx-auto">
          <div className="flex justify-between items-center">
            {progressSteps.map((step, index) => (
              <div key={index} className="flex items-center flex-1">
                <div
                  className={`h-3 w-3 rounded-full transition-all duration-300 ${
                    step.status === 'completed' ? 'bg-blue-600 scale-110' : 'bg-gray-200'
                  }`}
                />
                {index < progressSteps.length - 1 && (
                  <div
                    className={`h-0.5 w-full mx-1 ${
                      step.status === 'completed' ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 pb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-12"
        >
          Role-play Practice
        </motion.h1>

        <div className="grid gap-8">
          {/* Context Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="overflow-hidden border-none shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-500 text-white">
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Context Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-600 leading-relaxed">{rolePlayInfo.contextSummary}</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Full Dialogue Script */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="overflow-hidden border-none shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-500 text-white">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Full Dialogue Script
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {scenarioData.dialogue.map((line, index) => (
                    <div key={index} className="flex gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <span className="font-semibold text-blue-600 min-w-20">{line.speaker}:</span>
                      <p className="text-gray-600">{line.text}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* 3 Parts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="overflow-hidden border-none shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-500 text-white">
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Learning Path
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ol className="space-y-4">
                  {[
                    'Role-play simulation (Guided Practice)',
                    'Role-Play simulation (Feedback Practice)',
                    'Role-Play simulation (No Help)'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-4 p-3 rounded-lg bg-gray-50">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-semibold">
                        {index + 1}
                      </span>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12"
        >
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg group relative overflow-hidden"
            onClick={handleContinue}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Continue
              <ChevronRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 transform group-hover:scale-105 transition-transform" />
          </Button>
        </motion.div>
      </main>
    </div>
  );
};

export default RolePlayIntroduction;