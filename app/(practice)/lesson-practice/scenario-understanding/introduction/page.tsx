"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { X, Volume2, VolumeX, ChevronRight, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';

const ScenarioIntroductionPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lessonSlug = searchParams.get('lesson') || '';
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationRef = useRef<number>();

  // Initialize audio and add event listeners
  useEffect(() => {
    audioRef.current = new Audio('/mp3-files/scenario-introduction.mp3');
    
    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };
    
    audioRef.current.addEventListener('ended', handleEnded);
    
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', handleEnded);
        audioRef.current.pause();
      }
      cancelAnimationFrame(animationRef.current!);
    };
  }, []);

  // Update progress bar
  const updateProgress = () => {
    if (audioRef.current) {
      const value = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(value);
      animationRef.current = requestAnimationFrame(updateProgress);
    }
  };

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      cancelAnimationFrame(animationRef.current!);
    } else {
      audioRef.current.play();
      animationRef.current = requestAnimationFrame(updateProgress);
    }
    setIsPlaying(!isPlaying);
  };

  const handleClose = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    router.push(`/learning-path-lesson-details/${lessonSlug}`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-blue-50/50 to-white"
    >
      {/* Header with improved visual hierarchy */}
      <header className="fixed top-0 w-full bg-white border-b z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex justify-between items-center">
          <Image
            src="/icons/logo.svg"
            alt="FluentPro Logo"
            width={120}
            height={30}
            className="h-8 w-auto"
          />
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => router.push(`/lesson-practice/scenario-understanding/context-understanding?lesson=${lessonSlug}`)}
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Skip
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="rounded-full w-10 h-10 hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main content with improved layout and spacing */}
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl font-bold text-center text-gray-900 mb-12"
          >
            Introduction
          </motion.h1>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-white shadow-lg border-0 overflow-hidden">
              <CardContent className="p-8">
                <div className="flex flex-col items-center gap-8">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Overview
                  </h2>
                  
                  {/* Enhanced audio player with visual feedback */}
                  <div className="w-full max-w-md">
                    <div className="flex flex-col items-center gap-4">
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={toggleAudio}
                        className="w-full flex items-center justify-center gap-3 bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700 transition-all"
                      >
                        {isPlaying ? (
                          <Pause className="h-5 w-5" />
                        ) : (
                          <Play className="h-5 w-5" />
                        )}
                        <span className="font-medium">
                          {isPlaying ? "Pause Audio" : "Play Audio"}
                        </span>
                      </Button>
                      
                      {/* Progress bar */}
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 text-lg leading-relaxed text-center max-w-xl">
                    When you're ready, click 'Start Context Understanding' to follow a conversation 
                    between two people. Just relax and listen – no need to do anything else!
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Enhanced CTA button */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-12 flex justify-center"
          >
            <Button
              size="lg"
              onClick={() => router.push(`/lesson-practice/scenario-understanding/context-understanding?lesson=${lessonSlug}`)}
              className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-xl flex items-center gap-3 shadow-lg hover:shadow-xl transition-all"
            >
              Start Context Understanding
              <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </div>
      </main>
    </motion.div>
  );
};

export default ScenarioIntroductionPage;