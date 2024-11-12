"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Mic, X, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { rolePlayData } from '@/app/data/role-play';

declare global {
  interface Window {
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

interface DialogueLine {
  speaker: string;
  text: string;
}

const RolePlayPractice = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lessonSlug = searchParams.get('lesson') || 'offering-help';

  // State for recording and responses
  const [isRecording, setIsRecording] = useState(false);
  const [audioData, setAudioData] = useState<number[]>(new Array(40).fill(0));
  const [transcript, setTranscript] = useState('');
  const [timeLeft, setTimeLeft] = useState(45);
  const [responseSubmitted, setResponseSubmitted] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<DialogueLine[]>([]);
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const [currentUserPromptIndex, setCurrentUserPromptIndex] = useState(0);

  // Get current prompt from rolePlayData
  const currentPrompt = rolePlayData[lessonSlug].userPrompts[currentUserPromptIndex];

  // Refs for audio handling
  const recognitionRef = useRef<any>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number>();

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !responseSubmitted) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !responseSubmitted) {
      handleSubmit();
    }
  }, [timeLeft, responseSubmitted]);

  // Audio visualization setup
  const setupAudioVisualization = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;

      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);

      const animate = () => {
        if (!analyserRef.current) return;
        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(dataArray);
        setAudioData(Array.from(dataArray.slice(0, 40)));
        animationFrameRef.current = requestAnimationFrame(animate);
      };

      animate();
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  // Toggle recording
  const toggleRecording = async () => {
    if (!isRecording) {
      try {
        await setupAudioVisualization();

        const SpeechRecognition =
          window.SpeechRecognition || window.webkitSpeechRecognition;
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;

        recognitionRef.current.onresult = (event: any) => {
          let finalTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            finalTranscript += event.results[i][0].transcript;
          }
          setTranscript(finalTranscript);
        };

        recognitionRef.current.start();
        setIsRecording(true);
      } catch (error) {
        console.error('Error starting recording:', error);
      }
    } else {
      stopRecording();
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    setIsRecording(false);
    setResponseSubmitted(true);
    setAudioData(new Array(40).fill(0));
  };

  // Submit response
  const handleSubmit = () => {
    const newResponse = { speaker: 'You', text: transcript || '(No response)' };
    
    setConversationHistory((prev) => [...prev, newResponse]);
    
    const dialogue = rolePlayData[lessonSlug].dialogue;
    if (currentDialogueIndex < dialogue.length) {
      const assistantResponse = dialogue[currentDialogueIndex + 1];
      if (assistantResponse) {
        setConversationHistory((prev) => [...prev, assistantResponse]);
        setCurrentDialogueIndex(currentDialogueIndex + 2);
        setCurrentUserPromptIndex((prev) => prev + 1);
      }
    }

    setTranscript('');
    setResponseSubmitted(false);
    setTimeLeft(45);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="fixed top-0 w-full bg-white/90 border-b backdrop-blur-sm z-50">
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
            onClick={() => router.push(`/learning-path-lesson-details/${lessonSlug}`)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-600" />
          </Button>
        </div>
      </header>

      <main className="pt-24 px-4 pb-16 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-3xl font-bold text-blue-600">
            {currentPrompt.head}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {currentPrompt.detailed}
          </p>
        </div>

        {/* Level and Timer */}
        <div className="flex items-center gap-4 mb-8">
          <div className="border rounded px-4 py-2 bg-white">Level {2}</div>
          <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center">
            {timeLeft}
          </div>
        </div>

        {/* Conversation History */}
        <Card className="p-6 bg-white mb-8">
          <div className="flex items-center gap-2 mb-4">
            <MessageCircle className="h-5 w-5 text-blue-500" />
            <h2 className="font-semibold">Conversation History</h2>
          </div>
          <div className="space-y-4 min-h-[200px]">
            {conversationHistory.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-lg ${
                  message.speaker === 'You'
                    ? 'bg-blue-50 border-l-4 border-blue-500'
                    : 'bg-gray-50'
                }`}
              >
                <span className="font-medium">{message.speaker}:</span>{' '}
                {message.text}
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Recording Interface */}
        <div className="text-center space-y-6">
          <Button
            onClick={toggleRecording}
            className={`p-8 rounded-full transition-all ${
              isRecording
                ? 'bg-red-50 border-2 border-red-500'
                : 'bg-white border-2 border-blue-500'
            }`}
          >
            <AnimatePresence mode="wait">
              {isRecording ? (
                <motion.div
                  key="stop"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <X className="h-6 w-6 text-red-500" />
                </motion.div>
              ) : (
                <motion.div
                  key="mic"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <Mic className="h-6 w-6 text-blue-500" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>

          <p className="text-gray-600">
            {isRecording
              ? 'Recording in progress...'
              : 'Press the microphone and speak your answer'}
          </p>

          {/* Audio Visualization */}
          {isRecording && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-end justify-center h-16 gap-0.5"
            >
              {audioData.map((value, index) => (
                <motion.div
                  key={index}
                  className="w-1 bg-blue-500 rounded-full"
                  style={{ height: `${(value / 255) * 100}%` }}
                />
              ))}
            </motion.div>
          )}

          {/* Transcript Display */}
          <div className="p-4 min-h-[100px] bg-white rounded-lg border">
            {transcript ? (
              <p>{transcript}</p>
            ) : (
              <p className="text-gray-400">
                Your response will appear here...
              </p>
            )}
          </div>

          {responseSubmitted && (
            <p className="text-green-600">Response captured successfully!</p>
          )}

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={!responseSubmitted && !timeLeft}
            className="w-full py-4 bg-blue-600 text-white disabled:opacity-50"
          >
            Submit Response
          </Button>
        </div>
      </main>
    </div>
  );
};

export default RolePlayPractice;