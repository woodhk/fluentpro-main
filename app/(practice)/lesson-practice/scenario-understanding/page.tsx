"use client";

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { X, ArrowRight, BookOpen, Target, MessageSquare, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { scenarios } from '@/app/data/scenario';
import { motion, AnimatePresence } from 'framer-motion';

const ScenarioUnderstandingPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lessonSlug = searchParams.get('lesson') || 'offering-help';
  const scenarioData = scenarios[lessonSlug];
  const [activeSection, setActiveSection] = useState(0);

  if (!scenarioData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md p-8">
          <div className="space-y-4 text-center">
            <X className="mx-auto h-12 w-12 text-gray-400" />
            <h1 className="text-2xl font-bold text-gray-900">Lesson not found</h1>
            <Button 
              onClick={() => router.push('/learning-path')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Return to Learning Path
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const sections = [
    {
      title: 'Introduction',
      icon: BookOpen,
      color: 'blue',
      content: scenarioData.introduction.text,
      description: 'Understanding the context and goals'
    },
    {
      title: 'Skills Aim',
      icon: Target,
      color: 'blue',
      content: scenarioData.skillsAim.points,
      description: "Key competencies you'll develop"
    },
    {
      title: 'Language Goals',
      icon: MessageSquare,
      color: 'blue',
      content: scenarioData.languageLearningAim.points,
      description: "Linguistic skills you'll master"
    }
  ];

  const handleNext = () => {
    if (activeSection < sections.length - 1) {
      setActiveSection(prev => prev + 1);
    } else {
      router.push(`/lesson-practice/scenario-understanding/introduction?lesson=${lessonSlug}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => window.history.back()}
              className="rounded-full hover:bg-gray-100"
            >
              <X className="h-5 w-5 text-gray-500" />
            </Button>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold text-gray-900">Lesson Overview</h1>
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <span className="text-gray-500">{scenarioData.lessonTitle}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="fixed top-16 left-0 right-0 bg-white border-b z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between">
            {sections.map((section, index) => (
              <button
                key={index}
                onClick={() => setActiveSection(index)}
                className={`flex flex-col items-center w-1/3 relative ${
                  index <= activeSection ? 'text-blue-600' : 'text-gray-400'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                  index <= activeSection ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  <section.icon className={`h-4 w-4 ${
                    index <= activeSection ? 'text-blue-600' : 'text-gray-400'
                  }`} />
                </div>
                <span className="text-sm font-medium">{section.title}</span>
                {index < sections.length - 1 && (
                  <div className={`absolute top-4 left-1/2 w-full h-[2px] ${
                    index < activeSection ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="pt-40 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Section Title */}
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-gray-900">
                  {sections[activeSection].title}
                </h2>
                <p className="text-gray-600">
                  {sections[activeSection].description}
                </p>
              </div>

              {/* Section Content */}
              <Card className="p-6 bg-white shadow-lg">
                {Array.isArray(sections[activeSection].content) ? (
                  <ul className="space-y-4">
                    {sections[activeSection].content.map((point, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-blue-600 text-sm font-medium">{index + 1}</span>
                        </div>
                        <span className="text-gray-600 leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="space-y-4">
                    {sections[activeSection].content.split('\n').map((paragraph, index) => (
                      <p key={index} className="text-gray-600 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}
              </Card>

              {/* Navigation Buttons */}
              <div className="flex justify-end gap-4">
                {activeSection > 0 && (
                  <Button
                    variant="outline"
                    onClick={() => setActiveSection(prev => prev - 1)}
                    className="px-6"
                  >
                    Back
                  </Button>
                )}
                <Button
                  onClick={handleNext}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                >
                  {activeSection === sections.length - 1 ? 'Start Lesson' : 'Next'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default ScenarioUnderstandingPage;