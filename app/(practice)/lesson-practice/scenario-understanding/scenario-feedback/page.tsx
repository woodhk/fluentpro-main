"use client";

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Volume2, Mic, Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { markSectionComplete } from '@/app/utils/progress';

const ScenarioFeedbackPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lessonSlug = searchParams.get('lesson') || 'offering-help';
  
  const [messages, setMessages] = useState([
    {
      type: 'assistant',
      content: `Your summary accurately captured the key elements of the scenario. You demonstrated good understanding of the context and the main points of discussion. You've identified the primary concerns and objectives of both participants in the conversation.

To further enhance your understanding, try to also consider the underlying motivations and emotions of the speakers. This will help you better anticipate and respond to similar situations in real-world conversations.`
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  
  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { type: 'user', content: inputMessage }]);
      setInputMessage('');
      
      // Simulate AI response after a delay
      setTimeout(() => {
        setMessages(prev => [...prev, {
          type: 'assistant',
          content: "Thank you for your question! I'm analyzing the scenario further to provide more detailed feedback."
        }]);
      }, 1000);
    }
  };

  const handleContinue = () => {
    markSectionComplete(lessonSlug, 'Scenario Understanding');
    router.push(`/learning-path-lesson-details/${lessonSlug}`);
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

      <main className="pt-24 pb-16 px-4 max-w-2xl mx-auto">
        <div className="space-y-8">
          <h1 className="text-4xl font-bold text-center text-slate-900">
            Summarise Scenario Feedback
          </h1>

          <Card className="border shadow-lg">
            <CardContent className="p-0">
              {/* Messages Container */}
              <div className="h-96 overflow-y-auto p-6 space-y-6">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex gap-3 ${
                      message.type === 'user' ? 'flex-row-reverse' : ''
                    }`}
                  >
                    {message.type === 'assistant' && (
                      <div className="flex-shrink-0">
                        <Image
                          src="/icons/logo.png"
                          alt="FluentPro Assistant"
                          width={32}
                          height={32}
                          className="w-8 h-8 rounded-full"
                        />
                      </div>
                    )}
                    <div
                      className={`rounded-2xl p-4 max-w-[80%] ${
                        message.type === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-slate-700'
                      }`}
                    >
                      {message.type === 'assistant' && (
                        <div className="font-medium text-slate-900 mb-2">
                          FluentPro Assistant
                        </div>
                      )}
                      <p className="whitespace-pre-line">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Container */}
              <div className="border-t p-4">
                <div className="flex gap-2 items-center">
                  <button
                    onClick={() => setIsRecording(!isRecording)}
                    className={`p-2 rounded-full transition-colors ${
                      isRecording ? 'bg-red-100 text-red-600' : 'hover:bg-gray-100'
                    }`}
                  >
                    {isRecording ? (
                      <X className="h-5 w-5" />
                    ) : (
                      <Mic className="h-5 w-5" />
                    )}
                  </button>
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask a follow-up question..."
                    className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button
                    onClick={handleSendMessage}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center pt-4">
            <Button
              className="w-full max-w-sm h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
              onClick={handleContinue}
            >
              Continue
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ScenarioFeedbackPage;