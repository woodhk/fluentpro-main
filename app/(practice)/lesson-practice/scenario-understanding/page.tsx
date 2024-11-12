"use client";

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { X, ArrowRight, BookOpen, Target, MessageSquare, CheckCircle, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { scenarios } from '@/app/data/scenario';

const ScenarioUnderstandingPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lessonSlug = searchParams.get('lesson') || 'offering-help';
  const scenarioData = scenarios[lessonSlug];

  if (!scenarioData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md p-6 text-center">
          <div className="space-y-4">
            <X className="mx-auto h-12 w-12 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900">Lesson not found</h1>
            <Button 
              variant="outline" 
              onClick={() => router.push('/learning-path')}
              className="w-full"
            >
              Return to Learning Path
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => window.history.back()}
              className="rounded-full hover:bg-gray-100"
            >
              <X className="h-5 w-5 text-gray-500" />
            </Button>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-semibold text-gray-900">Lesson Overview</h1>
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <span className="text-gray-500">{scenarioData.lessonTitle}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {scenarioData.lessonTitle}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Master essential communication skills for real-world scenarios
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Introduction Card */}
            <Card className="bg-white overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-0">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6">
                  <BookOpen className="h-8 w-8 text-white mb-4" />
                  <h2 className="text-xl font-semibold text-white mb-2">Introduction</h2>
                  <p className="text-blue-100">Understanding the context and goals</p>
                </div>
                <div className="p-6 space-y-4">
                  {scenarioData.introduction.text.split('\n').map((paragraph, index) => (
                    <p key={index} className="text-gray-600 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Skills Aim Card */}
            <Card className="bg-white overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-0">
                <div className="bg-gradient-to-br from-green-500 to-green-600 p-6">
                  <Target className="h-8 w-8 text-white mb-4" />
                  <h2 className="text-xl font-semibold text-white mb-2">Skills Aim</h2>
                  <p className="text-green-100">Key competencies you'll develop</p>
                </div>
                <div className="p-6">
                  <ul className="space-y-4">
                    {scenarioData.skillsAim.points.map((point, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Language Learning Aims Card */}
            <Card className="bg-white overflow-hidden hover:shadow-lg transition-shadow duration-300 md:col-span-2 lg:col-span-1">
              <CardContent className="p-0">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6">
                  <MessageSquare className="h-8 w-8 text-white mb-4" />
                  <h2 className="text-xl font-semibold text-white mb-2">Language Goals</h2>
                  <p className="text-purple-100">Linguistic skills you'll master</p>
                </div>
                <div className="p-6">
                  <ul className="space-y-4">
                    {scenarioData.languageLearningAim.points.map((point, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-purple-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Start Button */}
          <div className="mt-12 text-center">
            <Button
              onClick={() => router.push(`/lesson-practice/scenario-understanding/introduction?lesson=${lessonSlug}`)}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-6 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <span>Start Learning</span>
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ScenarioUnderstandingPage;