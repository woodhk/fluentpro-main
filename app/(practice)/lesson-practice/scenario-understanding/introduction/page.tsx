"use client";

import React, { useState, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { X, Volume2, VolumeX, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const ScenarioIntroductionPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lessonSlug = searchParams.get('lesson');
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
      audioRef.current = new Audio('/mp3-files/scenario-introduction.mp3');
      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false);
      });
    }

    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(true);
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="px-6 py-4 bg-white border-b shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Image
            src="/icons/logo.svg"
            alt="FluentPro Logo"
            width={120}
            height={30}
            className="h-8 w-auto"
          />
          <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              onClick={() => router.push(`/lesson-practice/scenario-understanding/context-understanding?lesson=${lessonSlug}`)}
              className="text-gray-600 hover:text-gray-900"
            >
              Skip
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="rounded-full w-10 h-10 hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center flex-1 px-6 py-8">
        <div className="w-full max-w-2xl mt-12">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Introduction
          </h1>
          
          <Card className="bg-white shadow-lg border-0 overflow-hidden">
            <CardContent className="p-8">
              <div className="flex flex-col items-center gap-6">
                <h2 className="text-xl font-semibold text-gray-900">Overview</h2>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleAudio}
                    className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100"
                  >
                    <Volume2 className="h-4 w-4" />
                    <span className="text-sm">
                      {isPlaying ? "Playing..." : "Listen"}
                    </span>
                  </Button>
                  {isPlaying && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={stopAudio}
                      className="p-2"
                    >
                      <VolumeX className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <p className="text-gray-700 text-lg leading-relaxed text-center max-w-xl">
                  When you're ready, click 'Read and Listen' to follow a conversation 
                  between two people. Just relax and listen – no need to do anything else!
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-12 flex justify-center">
          <Button
             size="lg"
             className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-xl flex items-center gap-2 shadow-lg           hover:shadow-xl transition-all"
             onClick={() => router.push(`/lesson-practice/scenario-understanding/context-understanding?lesson=${lessonSlug}`)}
            >
             Context Understanding
             <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ScenarioIntroductionPage;