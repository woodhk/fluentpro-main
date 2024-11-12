"use client";

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';

const PartThreeOverview = () => {
  const router = useRouter();

  const handleContinue = () => {
    router.push('/lesson-practice/part-three-practice');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
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
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 pt-16 pb-8 max-w-3xl mx-auto w-full">
        <div className="w-full space-y-8">
          {/* Part Indicator */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Part Three</h1>
          </div>

          {/* Overview Card */}
          <Card className="w-full bg-gray-50 border-gray-100 shadow-sm">
            <CardContent className="p-6 md:p-8 space-y-4">
              <h2 className="text-2xl font-semibold text-gray-900">Overview</h2>
              <div className="prose prose-gray">
                <p className="text-gray-600 leading-relaxed text-lg">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sitLorem ipsum Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sitLorem ipsum Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sitLorem ipsum
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Continue Button */}
          <div className="flex justify-center pt-4">
            <Button
              onClick={handleContinue}
              className="w-full max-w-md bg-blue-600 hover:bg-blue-700 text-white font-medium py-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 group"
            >
              <span className="text-lg">Continue</span>
              <ChevronRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PartThreeOverview;