"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { X, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const ScenarioRecordPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lessonSlug = searchParams.get('lesson') || 'offering-help';
  
  const [isRecording, setIsRecording] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [audioData, setAudioData] = useState<number[]>([]);
  const [hasRecorded, setHasRecorded] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number>();
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const resultsRef = useRef<string[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

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
      
      if (event.error === 'aborted') {
        return;
      }

      setIsRecording(false);
      
      if (event.error === 'no-speech' || event.error === 'network') {
        recognition.stop();
        setTimeout(() => {
          if (isRecording) {
            try {
              recognition.start();
            } catch (e) {
              console.error('Failed to restart recognition:', e);
            }
          }
        }, 1000);
      }
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
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => {
          track.stop();
        });
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

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
      if (!recognitionRef.current) {
        initializeRecognition();
      }

      await setupAudioVisualization();
      if (recognitionRef.current) {
        setIsRecording(true);
        try {
          await recognitionRef.current.start();
        } catch (e) {
          console.error('Failed to start recognition:', e);
          initializeRecognition();
          await recognitionRef.current?.start();
        }
      }
    } catch (error) {
      console.error('Error starting recording:', error);
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        track.stop();
      });
      streamRef.current = null;
    }

    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    setHasRecorded(true);
    setAudioData([]);
    setInterimTranscript('');
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      router.push(`/lesson-practice/scenario-understanding/scenario-feedback?lesson=${lessonSlug}`);
    } catch (error) {
      console.error('Error submitting recording:', error);
      setIsSubmitting(false);
    }
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
            Summarise Scenario
          </h1>

          <p className="text-lg text-center text-slate-700">
            In your <span className="font-semibold">native language</span> briefly summarise 
            the situation you're about to discuss.
          </p>

          {/* Transcript Area */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Transcript
            </label>
            <Textarea
              value={transcript + interimTranscript}
              onChange={(e) => setTranscript(e.target.value)}
              className="min-h-[160px] resize-none border-2"
              placeholder="Your transcribed speech will appear here..."
            />
          </div>

          {/* Audio Visualization */}
          {isRecording && (
            <div className="flex justify-center items-center h-20">
              <div className="flex items-center gap-1 h-16">
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

          {/* Recording Controls */}
          <div className="flex flex-col items-center gap-4">
            {isRecording ? (
              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={stopRecording}
                  className="p-3 rounded-full border-2 border-slate-200 hover:border-red-500 transition-colors"
                >
                  <X className="h-6 w-6 text-red-500" />
                </button>
                <p className="text-sm text-slate-600">
                  Click the 'x' to stop recording
                </p>
              </div>
            ) : (
              <button
                onClick={startRecording}
                className="p-4 rounded-full border-2 border-slate-200 hover:border-blue-500 transition-colors"
              >
                <Mic className="h-6 w-6 text-slate-600" />
              </button>
            )}
            {!isRecording && (
              <p className="text-slate-600">
                Press the microphone and speak your answer
              </p>
            )}
          </div>

          {/* Submit Button */}
          {hasRecorded && !isRecording && (
            <div className="flex justify-center pt-4">
              <Button
                className="w-full max-w-sm h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg disabled:bg-blue-400 disabled:cursor-not-allowed"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Submitting...</span>
                  </div>
                ) : (
                  'Submit'
                )}
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ScenarioRecordPage;