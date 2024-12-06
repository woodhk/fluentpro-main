"use client";

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { X, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const ScenarioContextPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lessonSlug = searchParams.get('lesson') || 'offering-help';

  // Mock scenario context data (this would typically come from your data store)
  const scenarioContext = {
    title: "At the Coffee Shop",
    situation: "Sarah is a regular customer at a local coffee shop. Today, she notices another customer, John, struggling to carry multiple drinks back to his table. This presents an opportunity to offer assistance in a polite and culturally appropriate way.",
    keyPoints: [
      "The setting is informal but public",
      "The situation requires quick but polite intervention",
      "Cultural norms about helping strangers should be considered"
    ]
  };

  const handleClose = () => {
    router.push(`/learning-path-lesson-details/${lessonSlug}`);
  };

  const handleContinue = () => {
    router.push(`/lesson-practice/scenario-understanding/read-listen?lesson=${lessonSlug}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Image
            src="/icons/logo.svg"
            alt="FluentPro Logo"
            width={120}
            height={30}
            className="h-8 w-auto"
          />
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={() => router.push(`/learning-path-lesson-details/${lessonSlug}`)}
              className="text-gray-600 hover:text-gray-900"
            >
              Skip
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="text-slate-600 hover:text-slate-900"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-slate-900">
              Understand the Context
            </h1>
            <p className="text-slate-600">
              Before we begin, let's understand the scenario
            </p>
          </div>

          <Card className="bg-white shadow-lg border-0">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {scenarioContext.title}
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {scenarioContext.situation}
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-medium text-gray-900">
                    Key Points to Consider:
                  </h3>
                  <ul className="space-y-2">
                    {scenarioContext.keyPoints.map((point, index) => (
                      <li 
                        key={index}
                        className="flex items-start gap-2 text-gray-700"
                      >
                        <span className="text-blue-600 font-medium">•</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <Button
              size="lg"
              onClick={handleContinue}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-6 text-lg rounded-xl flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
            >
              Continue to Dialogue
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ScenarioContextPage;