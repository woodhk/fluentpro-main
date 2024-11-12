"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { X, Mic, Volume2, ArrowLeft, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { motion, AnimatePresence } from 'framer-motion';
import { scenarios } from '@/app/data/scenario';

const GuessVocabularyPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lessonSlug = searchParams.get('lesson') || 'offering-help';
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [audioData, setAudioData] = useState<number[]>([]);
  const [hasRecorded, setHasRecorded] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number>();
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const resultsRef = useRef<string[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  const scenarioData = scenarios[lessonSlug];
  const dialogue = scenarioData.dialogue;
  const numVocabulary = scenarioData.keyVocabulary.length;

  const toggleAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/mp3-files/dialogue-audio.mp3');
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

  const initializeRecognition = () => {
    if (!('webkitSpeechRecognition' in window)) {
      console.error('Speech recognition not supported');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interim = '';
      let final = '';
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i][0].transcript;
        
        if (event.results[i].isFinal) {
          if (!resultsRef.current.includes(result)) {
            resultsRef.current.push(result);
            final += result + ' ';
            setTranscript(prev => prev + result + ' ');
          }
        } else {
          interim += result;
        }
      }
      setInterimTranscript(interim);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event.error);
      if (event.error === 'aborted') return;
      setIsRecording(false);
    };

    recognition.onend = () => {
      if (isRecording) {
        try {
          recognition.start();
        } catch (e) {
          console.error('Failed to restart recognition:', e);
          setIsRecording(false);
        }
      }
    };

    recognitionRef.current = recognition;
  };

  useEffect(() => {
    initializeRecognition();
    return () => cleanup();
  }, []);

  const cleanup = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  const setupAudioVisualization = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);
      
      analyserRef.current.fftSize = 256;
      const bufferLength = analyserRef.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const animate = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);
        const audioDataArray = Array.from(dataArray).slice(0, 40);
        setAudioData(audioDataArray);
        animationFrameRef.current = requestAnimationFrame(animate);
      };

      animate();
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const startRecording = async () => {
    try {
      await setupAudioVisualization();
      if (recognitionRef.current) {
        setIsRecording(true);
        await recognitionRef.current.start();
      }
    } catch (error) {
      console.error('Error starting recording:', error);
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    cleanup();
    setHasRecorded(true);
    setAudioData([]);
    setInterimTranscript('');
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Updated routing path to match the correct file structure
      router.push(`/lesson-practice/key-vocabulary-pt1/feedback-vocabulary?lesson=${lessonSlug}`);
    } catch (error) {
      console.error('Error submitting:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
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

      <main className="pt-24 pb-16 px-4 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-slate-900 mb-8">
          Key Vocabulary (Pt.1)
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Dialogue Box */}
          <div className="border rounded-lg p-6 bg-white shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <button
                onClick={toggleAudio}
                className="p-2 rounded-full hover:bg-slate-100"
              >
                <Volume2 className="h-5 w-5 text-slate-600" />
              </button>
              <h2 className="text-xl font-semibold">Dialogue</h2>
            </div>
            <div className="space-y-4">
              {dialogue.map((line, index) => (
                <div key={index} className="space-y-1">
                  <p className="font-semibold">{line.speaker}:</p>
                  <p className="text-slate-600">{line.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Response Section */}
          <div className="space-y-6">
            <div className="border rounded-lg p-6 bg-white shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Transcript of your Response</h2>
              <div className="min-h-[200px] border rounded-lg p-4 bg-slate-50">
                {transcript}
                <span className="text-slate-400">{interimTranscript}</span>
              </div>
            </div>

            <div className="text-center">
              <p className="text-lg font-medium mb-4">
                Number of Key Vocabulary: {numVocabulary}
              </p>

              {/* Recording Controls */}
              <div className="flex flex-col items-center gap-4">
                {isRecording ? (
                  <button
                    onClick={stopRecording}
                    className="p-4 rounded-full border-2 border-red-500 hover:bg-red-50"
                  >
                    <X className="h-6 w-6 text-red-500" />
                  </button>
                ) : (
                  <button
                    onClick={startRecording}
                    className="p-4 rounded-full border-2 border-blue-500 hover:bg-blue-50"
                  >
                    <Mic className="h-6 w-6 text-blue-500" />
                  </button>
                )}
                <p className="text-slate-600">
                  {isRecording 
                    ? "Click to stop recording" 
                    : "Press the microphone and speak your answer"}
                </p>
              </div>

              {/* Audio Visualization */}
              {isRecording && (
                <div className="h-20 flex items-center justify-center">
                  <div className="flex items-end gap-1 h-16">
                    {audioData.map((value, index) => (
                      <div
                        key={index}
                        className="w-1 bg-blue-500 rounded-full transition-all duration-75"
                        style={{ height: `${(value / 255) * 100}%` }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Submit Button */}
              {hasRecorded && !isRecording && (
                <Button
                  className="w-full max-w-sm mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    'Submit'
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GuessVocabularyPage;