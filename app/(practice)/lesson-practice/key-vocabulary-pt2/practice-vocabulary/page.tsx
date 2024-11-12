"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { X, Mic, Volume2, ChevronRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { scenarios } from '@/app/data/scenario';
import { alternativeVocab } from '@/app/data/alternative-vocab';
import { markSectionComplete } from '@/app/utils/progress';

enum ScreenType {
  VOCABULARY_INTRO,
  PRACTICE_EXAMPLE,
  FEEDBACK,
}

const PracticeVocabulary = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lessonSlug = searchParams.get('lesson') || 'offering-help';
  
  // States for screens and progress
  const [currentScreen, setCurrentScreen] = useState<ScreenType>(ScreenType.VOCABULARY_INTRO);
  const [currentVocabIndex, setCurrentVocabIndex] = useState(0);
  const [currentAltIndex, setCurrentAltIndex] = useState(0);
  
  // States for recording and audio
  const [isRecording, setIsRecording] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [audioData, setAudioData] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingCaptured, setRecordingCaptured] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');

  // Refs
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number>();
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const resultsRef = useRef<string[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  const scenarioData = scenarios[lessonSlug];
  const totalVocabulary = scenarioData.keyVocabulary.length;
  const currentVocab = scenarioData.keyVocabulary[currentVocabIndex];
  const currentAltVocab = alternativeVocab[lessonSlug]?.[currentVocabIndex];
  const currentAlt = currentAltVocab?.alternatives[currentAltIndex];

  // Initialize speech recognition
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
    setRecordingCaptured(true);
    setAudioData([]);
    setInterimTranscript('');
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setCurrentScreen(ScreenType.FEEDBACK);
    setIsSubmitting(false);
  };

  const handleNext = () => {
    setHasRecorded(false);
    setRecordingCaptured(false);
    
    if (currentAltIndex < 2) {
      setCurrentAltIndex(prev => prev + 1);
      setCurrentScreen(ScreenType.PRACTICE_EXAMPLE);
    } else if (currentVocabIndex < totalVocabulary - 1) {
      setCurrentVocabIndex(prev => prev + 1);
      setCurrentAltIndex(0);
      setCurrentScreen(ScreenType.VOCABULARY_INTRO);
    } else {
      markSectionComplete(lessonSlug, 'Lesson Vocabulary Pt.2');
      router.push(`/learning-path-lesson-details/${lessonSlug}`);
    }
  };

  const handleProgressClick = (index: number) => {
    if (index <= currentVocabIndex) {
      setTimeout(() => {
        setCurrentVocabIndex(index);
        setCurrentAltIndex(0);
        setCurrentScreen(ScreenType.VOCABULARY_INTRO);
        setHasRecorded(false);
        setRecordingCaptured(false);
        setTranscript('');
        setInterimTranscript('');
      }, 300);
    }
  };

  const handleSkip = () => {
    if (currentAltIndex < 2) {
      setCurrentAltIndex(prev => prev + 1);
      setCurrentScreen(ScreenType.PRACTICE_EXAMPLE);
    } else if (currentVocabIndex < totalVocabulary - 1) {
      setCurrentVocabIndex(prev => prev + 1);
      setCurrentAltIndex(0);
      setCurrentScreen(ScreenType.VOCABULARY_INTRO);
    } else {
      markSectionComplete(lessonSlug, 'Lesson Vocabulary Pt.2');
      router.push(`/learning-path-lesson-details/${lessonSlug}`);
    }
    
    setHasRecorded(false);
    setRecordingCaptured(false);
    setTranscript('');
    setInterimTranscript('');
    setIsRecording(false);
    setIsSubmitting(false);
    
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const playAudio = (audioUrl?: string) => {
    if (!audioRef.current) {
      audioRef.current = new Audio(audioUrl);
    }
    audioRef.current.src = audioUrl || '';
    setIsPlaying(true);
    
    const animate = () => {
      setAudioData(Array.from({ length: 40 }, () => Math.random() * 255));
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animate();

    audioRef.current.onended = () => {
      setIsPlaying(false);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      setAudioData([]);
    };

    void audioRef.current.play();
  };

  const renderProgressBar = () => {
    const calculateDetailedProgress = () => {
      const vocabProgress = currentVocabIndex / totalVocabulary;
      const altProgress = (currentAltIndex) / 3;
      const sectionProgress = 1 / totalVocabulary;
      return ((vocabProgress + (altProgress * sectionProgress)) * 100);
    };
  
    return (
      <div className="fixed top-16 left-0 right-0 bg-white border-b shadow-sm z-40">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-700">Your Progress</h2>
              <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                {Math.round(calculateDetailedProgress())}% Complete
              </span>
            </div>
            
            <div className="space-y-4">
              <div className="flex gap-2">
                {Array.from({ length: totalVocabulary }).map((_, index) => (
                  <button
                    key={`progress-${index}`}
                    onClick={() => index <= currentVocabIndex && handleProgressClick(index)}
                    className="flex-1 group relative"
                  >
                    <div className={`h-2 rounded-full transition-all duration-300 ${
                      index < currentVocabIndex ? 'bg-blue-600' : 
                      index === currentVocabIndex ? 'bg-blue-200' : 
                      'bg-gray-100'
                    }`}>
                      {index === currentVocabIndex && (
                        <motion.div
                          className="absolute inset-0 bg-blue-600 rounded-full"
                          initial={{ width: "0%" }}
                          animate={{ width: `${(currentAltIndex / 3) * 100}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </div>
                    
                    <div className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 
                      ${index <= currentVocabIndex ? 'cursor-pointer' : 'cursor-not-allowed'}`}>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
                        ${index === currentVocabIndex ? 'border-blue-600 bg-white' :
                          index < currentVocabIndex ? 'border-blue-600 bg-blue-600' :
                          'border-gray-200 bg-white'}`}>
                        {index < currentVocabIndex && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              
              <div className="flex justify-between pt-6">
                {Array.from({ length: totalVocabulary }).map((_, index) => (
                  <div
                    key={`label-${index}`}
                    className={`text-sm font-medium w-full text-center ${
                      index === currentVocabIndex ? 'text-blue-600' :
                      index < currentVocabIndex ? 'text-gray-600' :
                      'text-gray-400'
                    }`}
                  >
                    Vocab {index + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderAudioVisualization = () => (
    <div className="flex items-end justify-center h-16 gap-0.5">
      {audioData.map((value, index) => (
        <motion.div
          key={index}
          initial={{ height: 0 }}
          animate={{ height: `${(value / 255) * 100}%` }}
          transition={{ duration: 0.1 }}
          className="w-1 bg-blue-500 rounded-full"
        />
      ))}
    </div>
  );

  const renderVocabularyIntro = () => (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="max-w-2xl mx-auto space-y-8"
      >
        <Card className="overflow-hidden">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center gap-3 px-4 py-2 bg-blue-50 rounded-full">
                <Volume2 className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-blue-600">
                  {currentVocab.word}
                </h2>
              </div>

              <p className="text-gray-600 text-lg leading-relaxed">
                {currentVocab.context}
              </p>
            </div>
          </CardContent>
        </Card>
        
        <div className="text-center space-y-6">
          <p className="text-lg text-gray-700">
            Let's practice this phrase in 3 different ways
          </p>
          
          <Button
            className="w-full max-w-sm h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl
              transition-all duration-300 ease-out hover:shadow-lg"
            onClick={() => setCurrentScreen(ScreenType.PRACTICE_EXAMPLE)}
          >
            <span className="mr-2">Start Practice</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );

  const renderPracticeExample = () => (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="max-w-2xl mx-auto space-y-8"
      >
        <div className="text-center space-y-3">
          <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            Example {currentAltIndex + 1} of 3
          </span>
          <h2 className="text-2xl font-semibold text-gray-900">
            Practice: "{currentVocab.word}"
          </h2>
        </div>

        <Card className="overflow-hidden">
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <button 
                  onClick={() => playAudio(currentAlt?.audioUrl)}
                  className="p-3 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors"
                  disabled={isPlaying}
                >
                  <Volume2 className="h-5 w-5 text-blue-600" />
                </button>
                <p className="flex-1 text-lg text-gray-700 leading-relaxed pt-2">
                  {currentAlt?.example}
                </p>
              </div>
              
              {(isPlaying || isRecording) && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {renderAudioVisualization()}
                </motion.div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="text-center space-y-6">
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`w-16 h-16 rounded-full transition-all duration-300 
              ${isRecording ? 
                'bg-red-50 hover:bg-red-100 border-2 border-red-500' : 
                'bg-blue-50 hover:bg-blue-100 border-2 border-blue-500'
              }`}
          >
            {isRecording ? (
              <X className="h-6 w-6 text-red-500 mx-auto" />
            ) : (
              <Mic className="h-6 w-6 text-blue-500 mx-auto" />
            )}
          </button>
          
          <p className="text-gray-600">
            {isRecording ? "Tap to finish recording" : "Tap to start recording"}
          </p>

          {recordingCaptured && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-green-600 font-medium"
            >
              Recording captured successfully!
            </motion.p>
          )}

          {hasRecorded && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Button 
                className="w-full max-w-sm h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl
                  transition-all duration-300 ease-out hover:shadow-lg disabled:opacity-50"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing...</span>
                  </div>
                ) : (
                  'Submit Recording'
                )}
              </Button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="fixed top-0 w-full bg-white border-b z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Image
            src="/icons/logo.svg"
            alt="FluentPro Logo"
            width={120}
            height={30}
            className="h-8 w-auto"
          />
          <Button
            variant="ghost"
            className="text-gray-600 hover:text-gray-900 font-medium"
            onClick={handleSkip}
          >
            Skip
          </Button>
        </div>
      </header>

      {renderProgressBar()}

      <main className="pt-80 pb-16 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">
          Key Vocabulary (Pt.2)
        </h1>
        <AnimatePresence mode="wait">
          {currentScreen === ScreenType.VOCABULARY_INTRO && renderVocabularyIntro()}
          {currentScreen === ScreenType.PRACTICE_EXAMPLE && renderPracticeExample()}
          {currentScreen === ScreenType.FEEDBACK && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto space-y-8 text-center"
            >
              <Card>
                <CardContent className="p-8 space-y-6">
                  <p className="text-lg text-gray-700">
                    Analyzing your pronunciation...
                  </p>
                  {renderAudioVisualization()}
                </CardContent>
              </Card>
              
              <Button
                className="w-full max-w-sm h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl
                  transition-all duration-300 ease-out hover:shadow-lg"
                onClick={handleNext}
              >
                Continue
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default PracticeVocabulary;