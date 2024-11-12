"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, X, Loader2, MessageCircle, List, ArrowRight, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { rolePlayData } from '@/app/data/role-play';

interface DialogueLine {
  speaker: string;
  text: string;
}

const RolePlayPart1 = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lessonSlug = searchParams.get('lesson') || 'offering-help';

  // State variables for conversation management
  const [conversationHistory, setConversationHistory] = useState<DialogueLine[]>([]);
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const [currentUserPromptIndex, setCurrentUserPromptIndex] = useState(0);
  const [conversationEnded, setConversationEnded] = useState(false);

  const currentPrompt = rolePlayData[lessonSlug].userPrompts[currentUserPromptIndex];

  // States for recording functionality
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [audioData, setAudioData] = useState<number[]>(new Array(50).fill(0));
  const [showSubmit, setShowSubmit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Refs
  const recognitionRef = useRef<any>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number>();
  const isSetupComplete = useRef<boolean>(false);
  const fullTranscriptRef = useRef('');

  const initializeAudioContext = async () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }
    if (!analyserRef.current) {
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
    }
  };

  const setupAudioVisualization = async () => {
    try {
      await initializeAudioContext();

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      if (audioContextRef.current && analyserRef.current) {
        const source = audioContextRef.current.createMediaStreamSource(stream);
        source.connect(analyserRef.current);

        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const animate = () => {
          if (!analyserRef.current) return;

          analyserRef.current.getByteFrequencyData(dataArray);
          const audioLevels = Array.from(dataArray.slice(0, 50));
          setAudioData(audioLevels);
          animationFrameRef.current = requestAnimationFrame(animate);
        };

        animate();
        isSetupComplete.current = true;
      }
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  useEffect(() => {
    initializeAudioContext();
    return () => cleanup();
  }, []);

  const cleanup = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = undefined;
    }
    setAudioData(new Array(50).fill(0));
    isSetupComplete.current = false;
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    cleanup();
    setIsRecording(false);
    setShowSubmit(true);
  };

  const toggleRecording = async () => {
    if (!isRecording) {
      try {
        await setupAudioVisualization();

        const SpeechRecognition =
          (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (SpeechRecognition) {
          const recognition = new SpeechRecognition();
          recognition.continuous = true;
          recognition.interimResults = true;

          recognition.onresult = (event: any) => {
            let interimTranscript = '';
            let finalTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
              const result = event.results[i][0];
              if (event.results[i].isFinal) {
                finalTranscript += result.transcript;
              } else {
                interimTranscript += result.transcript;
              }
            }
            if (finalTranscript) {
              fullTranscriptRef.current += finalTranscript;
            }
            setTranscript(fullTranscriptRef.current + interimTranscript);
          };

          recognition.onerror = (event: any) => {
            console.error('Recognition error:', event.error);
            stopRecording();
          };

          recognitionRef.current = recognition;
          recognitionRef.current.start();
        } else {
          console.error('Speech Recognition API not supported in this browser.');
        }

        setIsRecording(true);
        setShowSubmit(false);
      } catch (error) {
        console.error('Error starting recording:', error);
      }
    } else {
      stopRecording();
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 1000));

    setConversationHistory(prevHistory => [
      ...prevHistory,
      { speaker: 'You', text: transcript.trim() },
    ]);

    setTranscript('');
    fullTranscriptRef.current = '';

    const dialogue = rolePlayData[lessonSlug].dialogue;

    if (currentDialogueIndex < dialogue.length) {
      const assistantResponse = dialogue[currentDialogueIndex + 1];

      if (assistantResponse) {
        setConversationHistory(prevHistory => [...prevHistory, assistantResponse]);
        setCurrentDialogueIndex(currentDialogueIndex + 2);

        if (currentUserPromptIndex + 1 < rolePlayData[lessonSlug].userPrompts.length) {
          setCurrentUserPromptIndex(currentUserPromptIndex + 1);
        } else {
          setConversationEnded(true);
        }
      } else {
        setConversationEnded(true);
      }
    } else {
      setConversationEnded(true);
    }

    setShowSubmit(false);
    setIsSubmitting(false);
  };

  const renderAudioWaveform = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-end justify-center h-16 gap-0.5"
    >
      {audioData.map((value, index) => (
        <motion.div
          key={index}
          initial={{ height: 0 }}
          animate={{ 
            height: `${(value / 255) * 100}%`,
            transition: { duration: 0.1, delay: index * 0.01 }
          }}
          className="w-1 bg-blue-500 rounded-full"
        />
      ))}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
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

      <main className="pt-24 px-4 pb-16 max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4 mb-8"
        >
          <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-blue-500 text-transparent bg-clip-text">
            {currentPrompt.head}
          </h1>
          <p className="text-gray-600 text-center text-lg max-w-2xl mx-auto">
            {currentPrompt.detailed}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="h-full border-none shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <MessageCircle className="h-5 w-5 text-blue-500" />
                  <h2 className="font-semibold">Conversation History</h2>
                </div>
                <div
                  className="bg-gray-50 rounded-lg p-4 space-y-4 custom-scrollbar"
                  style={{ maxHeight: '300px', overflowY: 'auto' }}
                >
                  {conversationHistory.map((line, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-3 rounded-lg ${
                        line.speaker === 'You' 
                          ? 'bg-blue-50 border-l-4 border-blue-500' 
                          : 'bg-white border border-gray-100'
                      }`}
                    >
                      <span className={`font-medium ${
                        line.speaker === 'You' ? 'text-blue-600' : 'text-gray-700'
                      }`}>
                        {line.speaker}:
                      </span>{' '}
                      <span className="text-gray-600">{line.text}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="h-full border-none shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <List className="h-5 w-5 text-blue-500" />
                  <h2 className="font-semibold">Suggested Responses</h2>
                </div>
                <p className="text-gray-600 mb-4">
                  Choose and repeat one of these responses:
                </p>
                <ol className="space-y-4">
                  {currentPrompt.suggestions.slice(0, 3).map((suggestion, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="flex gap-4 p-3 bg-white rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-colors"
                    >
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 font-medium text-sm">
                        {index + 1}
                      </span>
                      <span className="text-gray-600">{suggestion}</span>
                    </motion.li>
                  ))}
                </ol>
                <div className="mt-6 pt-4 border-t">
                  <div className="flex items-start gap-3 text-sm text-gray-600">
                    <Volume2 className="h-4 w-4 mt-0.5 text-blue-500" />
                    <p>
                      <span className="font-medium text-blue-600">Tip:</span> {currentPrompt.tip}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center space-y-6 max-w-2xl mx-auto"
        >
          <Button
            onClick={toggleRecording}
            className={`p-8 rounded-full border-2 transition-all duration-300 ${
              isRecording 
                ? 'border-red-500 bg-red-50 hover:bg-red-100' 
                : 'border-blue-500 hover:bg-blue-50'
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
            {isRecording ? 'Recording in progress...' : 'Press the microphone and speak your answer'}
          </p>
          <div className="space-y-4">
            <div className="p-6 bg-white rounded-lg shadow-md min-h-[80px] transition-all">
              {transcript ? (
                <p className="text-gray-700">{transcript}</p>
              ) : (
                <p className="text-gray-400 italic">Your response will appear here...</p>
              )}
            </div>

            {isRecording && renderAudioWaveform()}
          </div>

          {conversationEnded ? (
            <Button
              onClick={() => router.push(`/lesson-practice/role-play-simulation/part2?lesson=${lessonSlug}`)}
              className="w-full py-6 bg-gradient-to-r from-blue-600 to-blue-500 hover:opacity-90 text-white text-lg group"
            >
              Continue to Next Part
              <ArrowRight className="ml-2 h-5 w-5 inline-block group-hover:translate-x-1 transition-transform" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || !showSubmit}
              className="w-full py-6 bg-gradient-to-r from-blue-600 to-blue-500 hover:opacity-90 text-white text-lg disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Processing Response...</span>
                </div>
              ) : (
                'Submit Response'
              )}
            </Button>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default RolePlayPart1;

        