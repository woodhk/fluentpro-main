"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Mic, X } from 'lucide-react';
import { rolePlayData } from '@/app/data/role-play';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const scenarioData = rolePlayData[lessonSlug];

  // Core states
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const [conversationHistory, setConversationHistory] = useState<DialogueLine[]>([]);
  const [activeTab, setActiveTab] = useState('conversation');
  
  // Practice states
  const [isPracticing, setIsPracticing] = useState(false);
  const [practiceStep, setPracticeStep] = useState(0);
  const [practiceResponse, setPracticeResponse] = useState('');

  // Recording states
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [audioData, setAudioData] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);

  // Refs
  const recognitionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number>();

  // Computed values
  const isConversationOver = currentPromptIndex >= scenarioData.userPrompts.length;
  const currentPrompt = isConversationOver ? null : scenarioData.userPrompts[currentPromptIndex];
  
  // Get practice phrases safely
  const getPracticePhrases = () => {
    if (!currentPrompt?.suggestions) return [];
    const suggestions = currentPrompt.suggestions;
    // Always get last two unique suggestions
    const uniqueSuggestions = [...new Set(suggestions)];
    if (uniqueSuggestions.length < 2) return uniqueSuggestions;
    return uniqueSuggestions.slice(-2);
  };

  const practicePhrases = getPracticePhrases();

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      console.error('Speech recognition not supported');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event: any) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptSegment = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcriptSegment + ' ';
        } else {
          interimTranscript += transcriptSegment;
        }
      }

      setTranscript(finalTranscript + interimTranscript);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsRecording(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
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
    setTranscript('');
    setIsRecording(true);
    await setupAudioVisualization();
    if (recognitionRef.current) {
      recognitionRef.current.start();
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    setHasRecorded(true);

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

    setAudioData([]);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    if (!isPracticing) {
      // Initial response submitted
      setConversationHistory(prev => [...prev, { speaker: 'You', text: transcript }]);
      setIsPracticing(true);
      setPracticeStep(0);
      setActiveTab('feedback');
    } else {
      // Practice response submitted
      setPracticeResponse(transcript);
      
      if (practiceStep < 1) {
        // Move to next practice step
        setPracticeStep(prev => prev + 1);
      } else {
        // Practice complete, move to next conversation phase
        setIsPracticing(false);
        setActiveTab('conversation');
        
        if (currentDialogueIndex + 1 < scenarioData.dialogue.length) {
          setConversationHistory(prev => [
            ...prev, 
            scenarioData.dialogue[currentDialogueIndex + 1]
          ]);
          setCurrentDialogueIndex(prev => prev + 2);
          if (currentPromptIndex < scenarioData.userPrompts.length - 1) {
            setCurrentPromptIndex(prev => prev + 1);
          }
        } else {
          setCurrentPromptIndex(scenarioData.userPrompts.length);
        }
      }
    }

    // Reset states
    setTranscript('');
    setPracticeResponse('');
    setHasRecorded(false);
    setIsSubmitting(false);
  };

  const handleNextStage = () => {
    router.push(`/lesson-practice/role-play-simulation/part3-introduction?lesson=${lessonSlug}`);
  };

  const renderAudioVisualization = () => (
    <div className="flex items-end justify-center h-16 gap-1">
      {audioData.map((value, index) => (
        <div
          key={index}
          className="w-1 bg-blue-500 rounded-full transition-all duration-75"
          style={{ height: `${(value / 255) * 100}%` }}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 w-full bg-white border-b z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center">
          <Image
            src="/icons/logo.svg"
            alt="FluentPro Logo"
            width={120}
            height={30}
            className="h-8 w-auto"
          />
        </div>
      </header>

      <main className="max-w-2xl mx-auto pt-24 px-4 pb-16 flex flex-col items-center">
        {/* Instructions Section */}
        {!isConversationOver && currentPrompt && (
          <div className="w-full space-y-6 text-center mb-8">
            <p className="text-xl text-gray-900">
              {currentPrompt.head}
            </p>
            <p className="text-gray-700 max-w-xl mx-auto">
              {currentPrompt.detailed}
            </p>
          </div>
        )}

        {/* Practice Area */}
        <div className="w-full">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="conversation">Conversation History</TabsTrigger>
              <TabsTrigger value="feedback" disabled={!isPracticing}>
                Feedback Practice
              </TabsTrigger>
            </TabsList>

            {/* Conversation Tab Content */}
            <TabsContent value="conversation" className="border rounded-lg p-6 min-h-[200px]">
              {conversationHistory.map((line, index) => (
                <div key={index} className={`p-2 ${line.speaker === 'You' ? 'text-blue-600' : 'text-gray-700'}`}>
                  <strong>{line.speaker}:</strong> {line.text}
                </div>
              ))}
              {transcript && !isPracticing && (
                <div className="p-4 border rounded-lg mb-4 bg-gray-50">
                  <p className="text-gray-700">{transcript}</p>
                </div>
              )}
              {isRecording && !isPracticing && renderAudioVisualization()}
            </TabsContent>

            {/* Feedback Practice Tab Content */}
            <TabsContent value="feedback" className="border rounded-lg p-6 min-h-[200px]">
              {isPracticing && practicePhrases.length > 0 && (
                <>
                  <div className="space-y-4">
                    {practiceResponse && (
                      <div className="p-4 border rounded-lg mb-4 bg-gray-50">
                        <p className="text-gray-700">{practiceResponse}</p>
                      </div>
                    )}
                    {!practiceResponse && (
                      <>
                        {practiceStep === 0 ? (
                          <>
                            <p className="font-medium">
                              Let's try another way to say it. Repeat after me:
                            </p>
                            <p className="text-gray-700">{practicePhrases[0]}</p>
                          </>
                        ) : (
                          <>
                            <p className="font-medium">
                              Good job! Let's try one final alternative, repeat after me
                            </p>
                            <p className="font-medium">Try saying:</p>
                            <p className="text-gray-700">{practicePhrases[1]}</p>
                          </>
                        )}
                      </>
                    )}
                  </div>
                  {transcript && (
                    <div className="p-4 border rounded-lg mb-4 bg-gray-50">
                      <p className="text-gray-700">{transcript}</p>
                    </div>
                  )}
                  {isRecording && renderAudioVisualization()}

                  {/* Recording Controls in Feedback Practice */}
                  <div className="mt-4 space-y-4 w-full max-w-sm mx-auto">
                    <button
                      onClick={isRecording ? stopRecording : startRecording}
                      className="mx-auto p-4 rounded-lg border-2 hover:bg-gray-50 transition-colors flex items-center justify-center bg-white"
                    >
                      {isRecording ? (
                        <X className="h-6 w-6 text-red-500" />
                      ) : (
                        <Mic className="h-6 w-6 text-gray-600" />
                      )}
                    </button>

                    <p className="text-center text-gray-600">
                      Press the microphone and repeat the phrase
                    </p>

                    {hasRecorded && (
                      <Button
                        onClick={handleSubmit}
                        className="w-full bg-blue-600 text-white hover:bg-blue-700"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Submitting...</span>
                          </div>
                        ) : (
                          'Submit Response'
                        )}
                      </Button>
                    )}
                  </div>
                </>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Recording Controls for Conversation Tab */}
        {!isPracticing && !isConversationOver && (
          <div className="mt-12 space-y-4 w-full max-w-sm mx-auto">
            <button
              onClick={isRecording ? stopRecording : startRecording}
              className="mx-auto p-4 rounded-lg border-2 hover:bg-gray-50 transition-colors flex items-center justify-center bg-white"
            >
              {isRecording ? (
                <X className="h-6 w-6 text-red-500" />
              ) : (
                <Mic className="h-6 w-6 text-gray-600" />
              )}
            </button>

            <p className="text-center text-gray-600">
              Press the microphone and speak your answer
            </p>

            {hasRecorded && (
              <Button
                onClick={handleSubmit}
                className="w-full bg-blue-600 text-white hover:bg-blue-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Submitting...</span>
                  </div>
                ) : (
                  'Submit Response'
                )}
              </Button>
            )}
          </div>
        )}

        {/* Next Stage Button */}
        {isConversationOver && (
          <div className="mt-12">
            <Button
              onClick={handleNextStage}
              className="w-full bg-green-600 text-white hover:bg-green-700"
            >
              Next Stage
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default RolePlayPractice;
