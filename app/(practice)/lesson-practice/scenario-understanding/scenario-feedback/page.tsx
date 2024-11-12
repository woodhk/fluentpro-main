"use client";

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { markSectionComplete } from '@/app/utils/progress';

const ScenarioFeedbackPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lessonSlug = searchParams.get('lesson') || 'offering-help';

  // Hardcoded feedback for the prototype
  const feedbackText = `Your summary accurately captured the key elements of the scenario. You demonstrated good understanding of the context and the main points of discussion. You've identified the primary concerns and objectives of both participants in the conversation.

To further enhance your understanding, try to also consider the underlying motivations and emotions of the speakers. This will help you better anticipate and respond to similar situations in real-world conversations.`;

  const handleContinue = () => {
    // Mark the scenario understanding section as complete
    markSectionComplete(lessonSlug, 'Scenario Understanding');
    
    // Redirect back to lesson details
    router.push(`/learning-path-lesson-details/${lessonSlug}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white border-b z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Image
            src="/icons/logo.svg"
            alt="FluentPro Logo"
            width={120}
            height={30}
            className="h-8 w-auto"
          />
          <Button
            variant="link"
            className="text-blue-600 hover:text-blue-700 font-medium"
            onClick={() => router.push(`/learning-path-lesson-details/${lessonSlug}`)}
          >
            Skip
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-16 px-4 max-w-2xl mx-auto">
        <div className="space-y-8">
          <h1 className="text-4xl font-bold text-center text-slate-900">
            Summarise Scenario Feedback
          </h1>

          <Card className="border shadow-lg overflow-hidden">
            <CardContent className="p-8">
              <div className="space-y-6">
                {/* Audio Icon */}
                <div className="flex justify-center">
                  <button className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition-colors">
                    <Volume2 className="h-6 w-6 text-slate-700" />
                  </button>
                </div>

                {/* Feedback Text */}
                <div className="bg-slate-50 rounded-lg p-6">
                  <div className="flex gap-3 mb-4">
                    <Image
                      src="/icons/logo.png"
                      alt="FluentPro Assistant"
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                    <span className="font-medium text-slate-900">FluentPro Assistant</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                    {feedbackText}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Continue Button */}
          <div className="flex justify-center pt-4">
            <Button
              className="w-full max-w-sm h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
              onClick={handleContinue}
            >
              Continue
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ScenarioFeedbackPage;