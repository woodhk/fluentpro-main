"use client";

import React, { useState, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { scenarios } from '@/app/data/scenario';
import { markSectionComplete } from '@/app/utils/progress';

const KeyVocabularyFeedback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lessonSlug = searchParams.get('lesson') || 'offering-help';
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const scenarioData = scenarios[lessonSlug];
  const keyVocabulary = scenarioData.keyVocabulary;

  const toggleAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/mp3-files/ai-feedback.mp3');
      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false);
      });
    }

    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    } else {
      void audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleContinue = () => {
    // Mark the current section as complete
    markSectionComplete(lessonSlug, 'Lesson Vocabulary Pt.1');
    
    // Navigate back to lesson details
    router.push(`/learning-path-lesson-details/${lessonSlug}`);
  };

  // Mock AI response
  const aiResponse = `Great work identifying the key vocabulary from the dialogue! You've correctly recognized several important phrases used for offering and accepting help in a professional context. Let's review the key vocabulary and their usage:`;

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
            Key Vocabulary Feedback
          </h1>

          <Card className="border shadow-lg overflow-hidden bg-slate-50">
            <CardContent className="p-8">
              <div className="space-y-6">
                {/* Audio Control */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleAudio}
                    className="p-2 rounded-full hover:bg-white transition-colors"
                  >
                    <Volume2 className="h-5 w-5 text-slate-600" />
                  </button>
                </div>

                {/* AI Response */}
                <div className="flex items-start gap-3">
                  <Image
                    src="/icons/logo.png"
                    alt="FluentPro AI"
                    width={24}
                    height={24}
                    className="mt-1"
                  />
                  <p className="text-slate-700 leading-relaxed">
                    {aiResponse}
                  </p>
                </div>

                {/* Key Vocabulary List */}
                <div className="space-y-4 mt-6">
                  {keyVocabulary.map((vocab, index) => (
                    <div key={index} className="space-y-1">
                      <p className="font-semibold">
                        Key Vocabulary {index + 1}: {vocab.word}
                      </p>
                      <p className="text-slate-600 pl-4">
                        {vocab.context}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Text */}
          <p className="text-center text-lg text-slate-700">
            Click "continue" to visit the next section where we'll dive deeper into these key vocabularies
          </p>

          {/* Continue Button */}
          <div className="flex justify-center">
            <Button
              className="w-full max-w-sm bg-blue-600 hover:bg-blue-700 text-white font-medium"
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

export default KeyVocabularyFeedback;