"use client";

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { cn } from "@/lib/utils";

type QuestionType = 'slider' | 'radio' | 'text';

interface FormData {
  difficulty: number;
  relevance: string | undefined;
  effectiveness: string | undefined;
  technicalIssues: string | undefined;
  removeFeature: string;
  keepFeature: string;
}

interface Step {
  title: string;
  type: QuestionType;
  field: keyof FormData;
  min?: number;
  max?: number;
  labels?: string[];
  options?: string[];
}

const FeedbackForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lessonSlug = searchParams.get('lesson') || '';
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [formData, setFormData] = useState<FormData>({
    difficulty: 50,
    relevance: undefined,
    effectiveness: undefined,
    technicalIssues: undefined,
    removeFeature: '',
    keepFeature: ''
  });

  const steps: Step[] = [
    {
      title: 'How would you rate the lessons difficulty?',
      type: 'slider',
      field: 'difficulty',
      min: 0,
      max: 100,
      labels: ['Too Easy', 'Balanced', 'Too Hard']
    },
    {
      title: 'How relevant were the topics and scenarios to your work environment?',
      type: 'radio',
      field: 'relevance',
      options: ['Very Relevant', 'Somewhat Relevant', 'Not Relevant']
    },
    {
      title: 'How effective was the feedback in helping you improve your skills?',
      type: 'radio',
      field: 'effectiveness',
      options: ['Very Effective', 'Somewhat Effective', 'Neutral', 'Not Effective']
    },
    {
      title: 'Did you experience any technical issues while using FluentPro?',
      type: 'radio',
      field: 'technicalIssues',
      options: ['No issues', 'Minor issues', 'Frequent issues']
    },
    {
      title: 'If you had to remove one feature and leave the rest, what feature would it be?',
      type: 'text',
      field: 'removeFeature'
    },
    {
      title: 'If you had to keep one feature and remove the rest, what feature would it be?',
      type: 'text',
      field: 'keepFeature'
    }
  ];

  const handleClose = () => {
    router.push(`/learning-path-lesson-details/${lessonSlug}`);
  };

  const handleSliderChange = (value: number[]) => {
    setFormData(prev => ({ ...prev, difficulty: value[0] }));
  };

  const handleRadioChange = (value: string) => {
    const field = steps[currentStep].field;
    if (field === 'relevance' || field === 'effectiveness' || field === 'technicalIssues') {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const field = steps[currentStep].field;
    if (field === 'removeFeature' || field === 'keepFeature') {
      setFormData(prev => ({ ...prev, [field]: e.target.value }));
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Handle form submission
      console.log('Form submitted:', formData);
      handleClose();
    }
  };

  const isStepComplete = () => {
    const currentStepData = steps[currentStep];
    const currentValue = formData[currentStepData.field];
    
    switch (currentStepData.type) {
      case 'slider':
        return true;
      case 'radio':
        return Boolean(currentValue);
      case 'text':
        return typeof currentValue === 'string' && currentValue.trim().length > 0;
      default:
        return false;
    }
  };

  const renderQuestion = () => {
    const step = steps[currentStep];

    switch (step.type) {
      case 'slider':
        return (
          <div className="w-full max-w-md mx-auto space-y-8">
            <div className="space-y-6">
              <div className="relative pt-6 pb-2">
                <Slider
                  defaultValue={[50]}
                  max={100}
                  step={1}
                  value={[formData.difficulty]}
                  onValueChange={handleSliderChange}
                  className="relative flex items-center select-none touch-none w-full transition-colors bg-gray-200 h-2 rounded-full"
                />
              </div>
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                {step.labels?.map((label) => (
                  <span key={label}>{label}</span>
                ))}
              </div>
            </div>
          </div>
        );

      case 'radio':
        return (
          <RadioGroup
            value={formData[step.field]?.toString()}
            onValueChange={handleRadioChange}
            className="space-y-4"
          >
            {step.options?.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={option} />
                <Label htmlFor={option}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        );

      case 'text':
        return (
          <Textarea
            value={formData[step.field]}
            onChange={handleTextChange}
            placeholder="Type your response here"
            className="min-h-[100px] border border-gray-300 rounded-md p-3 resize-none w-full"
          />
        );

      default:
        return null;
    }
  };

  const renderProgressDots = () => {
    return (
      <div className="flex justify-center space-x-2 mb-8">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full ${
              index === currentStep
                ? 'bg-blue-600'
                : index < currentStep
                ? 'bg-blue-600'
                : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
    );
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl mx-auto bg-white shadow-lg">
        <CardHeader className="relative border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <Image
              src="/icons/logo.svg"
              alt="FluentPro Logo"
              width={120}
              height={30}
              className="h-8 w-auto"
            />
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          {renderProgressDots()}
        </CardHeader>

        <CardContent className="p-6 space-y-8">
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold">Feedback</h2>
            <p className="text-lg font-medium">
              {currentStepData.title}
            </p>
          </div>

          <div className="w-full max-w-md mx-auto">
            {renderQuestion()}
          </div>

          <div className="flex flex-col gap-2 pt-4">
            <Button
              onClick={handleNext}
              disabled={!isStepComplete()}
              className={cn(
                "w-full py-2 rounded-md text-white",
                isStepComplete() 
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-300 cursor-not-allowed"
              )}
            >
              Continue
            </Button>
            {(currentStepData.field === 'removeFeature' || currentStepData.field === 'keepFeature') && (
              <Button
                variant="link"
                onClick={handleClose}
                className="text-blue-600 hover:text-blue-700"
              >
                Skip
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeedbackForm;