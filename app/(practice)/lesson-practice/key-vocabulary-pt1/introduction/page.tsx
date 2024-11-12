"use client";

import React, { useState, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { X, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const KeyVocabularyIntroduction = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lessonSlug = searchParams.get('lesson') || 'offering-help';
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleClose = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    router.push(`/learning-path-lesson-details/${lessonSlug}`);
  };

  const toggleAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/mp3-files/key-vocabulary-intro.mp3');
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
          <div className="flex items-center gap-4">
            <Button
              variant="link"
              className="text-blue-600 hover:text-blue-700 font-medium"
              onClick={() => router.push(`/learning-path-lesson-details/${lessonSlug}`)}
            >
              Skip
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="text-slate-600 hover:text-slate-900 w-8 h-8 p-0"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-16 px-4 max-w-2xl mx-auto">
        <div className="space-y-8">
          <h1 className="text-4xl font-bold text-center text-slate-900">
            Key Vocabulary (Pt.1)
          </h1>

          <Card className="border shadow-lg overflow-hidden bg-slate-100">
            <CardContent className="p-8">
              <div className="flex flex-col items-center text-center space-y-6">
                {/* Audio Button */}
                <button 
                  onClick={toggleAudio}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
                >
                  {isPlaying ? (
                    <VolumeX className="h-6 w-6 text-slate-700" />
                  ) : (
                    <Volume2 className="h-6 w-6 text-slate-700" />
                  )}
                </button>

                <div className="space-y-6 max-w-lg">
                  <h2 className="text-2xl font-semibold text-slate-900">
                    Overview
                  </h2>

                  <p className="text-lg leading-relaxed text-slate-700">
                    In this next section you will read the script again and then speak out (in English) any language or phrases that are key to the aims of the lesson.
                  </p>

                  <p className="text-base text-slate-600">
                    Click "Key Language" when ready
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col items-center gap-4 pt-4">
            <Button
              className="w-full max-w-sm h-12 bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
              onClick={() => router.push(`/lesson-practice/key-vocabulary-pt1/guess-vocabulary?lesson=${lessonSlug}`)}
            >
              Key Language
            </Button>
            
            <Button
              variant="link"
              className="text-blue-600 hover:text-blue-700"
              onClick={() => router.back()}
            >
              Back
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default KeyVocabularyIntroduction;