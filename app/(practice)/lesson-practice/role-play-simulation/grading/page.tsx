"use client";

import React from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const RolePlayResults = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lessonSlug = searchParams.get('lesson') || 'offering-help';

  // Hardcoded data for example - in real app would come from props or state
  const mockData = {
    originalScript: `sit amet, consectetur adipiscing elit, Lorem ipsum dolor sitLorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem ipsum dolosit amet, consectetur adipiscing elit, Lorem ipsum dolor sitLorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem ipsum dolo`,
    correctiveScript: 'sit amet, consectetur Lorem ipsum dolor sit amet...',
    performance: 84.6,
    feedback: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem ipsum dolor sit Lorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem ipsum dolor sitLorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem ipsum dolor sitLorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem ipsum dolor sitLorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem ipsum dolor sitLorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem ipsum dolor si'
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 w-full bg-white border-b z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="h-5 w-5 text-gray-600" />
            </Button>
            <h1 className="text-xl font-bold">Role-play Results: Level 2</h1>
          </div>
        </div>
      </header>

      <main className="pt-24 px-4 pb-16 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Conversation History */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Conversation History</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-medium text-gray-900">Original Script</h3>
                <div className="bg-gray-50 rounded-lg p-4 max-h-[300px] overflow-y-auto text-gray-600">
                  {mockData.originalScript}
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium text-gray-900">Corrective Script</h3>
                <div className="bg-gray-50 rounded-lg p-4 text-gray-600">
                  {mockData.correctiveScript}
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">Total Performance:</span>
                  <span className="text-2xl font-bold text-blue-600">
                    {mockData.performance}%
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* Feedback */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Feedback</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex gap-2 items-start">
                <Image
                  src="/icons/logo.svg"
                  alt="FluentPro Logo"
                  width={20}
                  height={20}
                  className="mt-1"
                />
                <p className="text-gray-600">{mockData.feedback}</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-8 flex justify-between items-center">
          <Image
            src="/icons/logo.svg"
            alt="FluentPro Logo"
            width={120}
            height={30}
            className="h-8 w-auto"
          />
          <Button
            onClick={() => router.push(`/learning-path-lesson-details/${lessonSlug}`)}
            className="px-8 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            Continue
          </Button>
        </div>
      </main>
    </div>
  );
};

export default RolePlayResults;