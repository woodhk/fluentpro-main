"use client";

import React from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const LessonSummary = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lessonSlug = searchParams.get('lesson') || 'offering-help';

  // Mock data - in real app would come from props or API
  const summaryData = {
    title: "Lesson Summary",
    introduction: "In this lesson, you learned how to manage hostile situations at work using effective communication techniques. You explored two different scenarios where conflicts arose and saw how different approaches to handling them can lead to very different outcomes.",
    practicePoints: [
      "Using neutral and respectful language to avoid escalating conflicts.",
      "Asking open-ended questions to get to the root of the problem.",
      "Listening actively and considering the other person's viewpoint.",
      "Offering constructive feedback and proposing solutions to resolve conflicts."
    ],
    conclusion: "By applying these strategies, you can handle difficult conversations more effectively and build stronger, more cooperative relationships in the workplace."
  };

  return (
    <div className="min-h-screen bg-white px-4 py-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Logo */}
        <div>
          <Image
            src="/icons/logo.svg"
            alt="FluentPro Logo"
            width={120}
            height={30}
            className="h-8 w-auto"
          />
        </div>

        {/* Main Content */}
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold mb-16">Summary</h1>
          
          <Card className="bg-gray-50 p-8 text-left">
            <h2 className="text-2xl font-semibold mb-4">{summaryData.title}</h2>
            
            <div className="space-y-6 text-gray-600">
              {/* Introduction */}
              <p>{summaryData.introduction}</p>

              {/* Practice Points */}
              <div>
                <p className="font-semibold mb-2">Throughout this lesson, you practiced:</p>
                <ul className="space-y-2">
                  {summaryData.practicePoints.map((point, index) => (
                    <li key={index} className="flex gap-2 items-baseline">
                      <span className="text-lg">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Conclusion */}
              <p>{summaryData.conclusion}</p>
            </div>
          </Card>
        </div>

        {/* End Lesson Button */}
        <div className="flex justify-center pt-8">
          <Button
            onClick={() => router.push(`/learning-path`)}
            className="w-full max-w-md bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg"
          >
            End Lesson
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LessonSummary;