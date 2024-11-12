"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { 
  X, Play, Pause, SkipBack, SkipForward, 
  Volume2, Maximize2, ChevronRight 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { scenarios } from '@/app/data/scenario';

interface DialogueLine {
  speaker: string;
  text: string;
  startTime?: number;
  endTime?: number;
}

const ScenarioReadListenPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lessonSlug = searchParams.get('lesson') || 'offering-help';
  const scenarioData = scenarios[lessonSlug];

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasListenedOnce, setHasListenedOnce] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create new audio element
    const audio = new Audio(`/mp3-files/${lessonSlug}-dialogue.mp3`);
    audioRef.current = audio;
    
    const handleLoadedMetadata = () => {
      if (audio) setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      if (audio) setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setHasListenedOnce(true);
    };

    // Add event listeners
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    // Cleanup function
    return () => {
      if (audio) {
        audio.pause();
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('ended', handleEnded);
        audio.remove();
      }
    };
  }, [lessonSlug]);

  const handleClose = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    router.push(`/learning-path-lesson-details/${lessonSlug}`);
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      void audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSkip = (seconds: number) => {
    if (!audioRef.current) return;
    const newTime = Math.max(0, Math.min(audioRef.current.currentTime + seconds, duration));
    audioRef.current.currentTime = newTime;
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percentage = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = percentage * duration;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
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
      <main className="pt-24 pb-16 px-4 max-w-4xl mx-auto">
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-slate-900">
              Read and Listen
            </h1>
            <p className="text-slate-600">
              Follow along with the dialogue while listening
            </p>
          </div>

          <Card className="overflow-hidden bg-white shadow-lg">
            <CardContent className="p-0">
              {/* Dialogue Section */}
              <div className="p-6 space-y-6">
                {scenarioData.dialogue.map((line: DialogueLine, index: number) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-lg transition-colors ${
                      currentTime >= (line.startTime || 0) && currentTime <= (line.endTime || duration)
                        ? 'bg-blue-50 border border-blue-100'
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="font-medium text-blue-600 mb-2">
                      {line.speaker}
                    </div>
                    <div className="text-slate-700 leading-relaxed">
                      {line.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Audio Player */}
              <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-6 text-white">
                <div className="space-y-4">
                  {/* Progress Bar */}
                  <div
                    className="h-1.5 bg-white/30 rounded-full cursor-pointer"
                    onClick={handleProgressClick}
                  >
                    <div
                      className="h-full bg-white rounded-full transition-all"
                      style={{ width: `${(currentTime / duration) * 100}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleSkip(-10)}
                        className="text-white hover:bg-white/10"
                      >
                        <SkipBack className="h-5 w-5" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={togglePlayPause}
                        className="h-12 w-12 rounded-full bg-white/10 hover:bg-white/20"
                      >
                        {isPlaying ? (
                          <Pause className="h-6 w-6" />
                        ) : (
                          <Play className="h-6 w-6 ml-1" />
                        )}
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleSkip(10)}
                        className="text-white hover:bg-white/10"
                      >
                        <SkipForward className="h-5 w-5" />
                      </Button>

                      <span className="text-sm font-medium">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white/10"
                      >
                        <Volume2 className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white/10"
                      >
                        <Maximize2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Continue Button */}
          <div className="flex flex-col items-center gap-3">
            <Button
              className={`w-full max-w-sm h-12 rounded-full text-base font-medium transition-all ${
                hasListenedOnce
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
              disabled={!hasListenedOnce}
              onClick={() => router.push(`/lesson-practice/scenario-understanding/scenario-summarise?lesson=${lessonSlug}`)}
            >
              Continue
              <ChevronRight className="h-5 w-5 ml-1" />
            </Button>
            {!hasListenedOnce && (
              <p className="text-sm text-slate-500">
                Please listen to the dialogue first
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ScenarioReadListenPage;