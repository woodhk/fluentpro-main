"use client";

// pages/index.tsx

import React, { useState } from 'react';

// ---------- Define Types for the Steps ----------

type StepType = 'welcome' | 'timeline' | 'quiz' | 'final';

interface BaseStep {
  type: StepType;
}

interface WelcomeStepType extends BaseStep {
  type: 'welcome';
  title: string;
  subtitle: string;
  image: string;
}

interface TimelineStepType extends BaseStep {
  type: 'timeline';
  title: string;
  description: string;
  image: string;
}

interface QuizOption {
  text: string;
  isCorrect: boolean;
}

interface QuizStepType extends BaseStep {
  type: 'quiz';
  question: string;
  options: QuizOption[];
}

interface FinalStepType extends BaseStep {
  type: 'final';
  title: string;
  message: string;
  image: string;
}

type Step = WelcomeStepType | TimelineStepType | QuizStepType | FinalStepType;

// ---------- Define the steps array ----------

const steps: Step[] = [
  {
    type: 'welcome',
    title: 'Welcome to Our Love Quest!',
    subtitle: "Let's journey through our memories together.",
    image: 'teddy_welcome.png', // Place your teddy welcome image in public/images/teddy_welcome.png
  },
  {
    type: 'timeline',
    title: 'Our First Date',
    description:
      'Remember our first date at that charming cafe? I was nervous, but you made everything perfect.',
    image: 'first_date.png', // Place your first date image in public/images/first_date.png
  },
  {
    type: 'quiz',
    question: 'Where did we have our first date?',
    options: [
      { text: 'Romantic Cafe', isCorrect: true },
      { text: 'Cozy Restaurant', isCorrect: false },
      { text: 'Lively Bar', isCorrect: false },
    ],
  },
  {
    type: 'timeline',
    title: 'Our First Trip Together',
    description:
      'That spontaneous trip to the beach was one of the best adventures ever!',
    image: 'first_trip.png', // Place your first trip image in public/images/first_trip.png
  },
  {
    type: 'quiz',
    question: 'What was the destination of our first trip?',
    options: [
      { text: 'Mountains', isCorrect: false },
      { text: 'Beach', isCorrect: true },
      { text: 'City', isCorrect: false },
    ],
  },
  {
    type: 'final',
    title: 'You Won!',
    message:
      "Congratulations! Your prize is a romantic dinner reservation, a surprise getaway, and all my love!",
    image: 'teddy_final.png', // Place your final teddy image in public/images/teddy_final.png
  },
];

// ---------- Components ----------

// Welcome Step Component Props & Component
type WelcomeStepProps = {
  title: string;
  subtitle: string;
  image: string;
  onNext: () => void;
};

const WelcomeStep: React.FC<WelcomeStepProps> = ({ title, subtitle, image, onNext }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100 p-4">
      <h1 className="text-4xl font-bold text-pink-800 text-center">{title}</h1>
      <p className="mt-4 text-xl text-pink-700 text-center">{subtitle}</p>
      <img
        src={`/images/${image}`}
        alt="Welcome Teddy"
        className="mt-8 w-64 h-auto rounded-full shadow-lg"
      />
      <button
        onClick={onNext}
        className="mt-12 px-6 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 focus:outline-none"
      >
        Start
      </button>
    </div>
  );
};

// Timeline Step Component Props & Component
type TimelineStepProps = {
  title: string;
  description: string;
  image: string;
  onNext: () => void;
};

const TimelineStep: React.FC<TimelineStepProps> = ({ title, description, image, onNext }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100 p-4">
      <h2 className="text-3xl font-bold text-pink-800 text-center">{title}</h2>
      <p className="mt-4 text-lg text-pink-700 text-center">{description}</p>
      <img
        src={`/images/${image}`}
        alt={title}
        className="mt-8 w-64 h-auto rounded-full shadow-md"
      />
      <button
        onClick={onNext}
        className="mt-12 px-6 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 focus:outline-none"
      >
        Next
      </button>
    </div>
  );
};

// Quiz Step Component Props & Component
type QuizStepProps = {
  question: string;
  options: QuizOption[];
  onCorrect: () => void;
};

const QuizStep: React.FC<QuizStepProps> = ({ question, options, onCorrect }) => {
  const [feedback, setFeedback] = useState<string>('');

  const handleOptionClick = (option: QuizOption) => {
    if (option.isCorrect) {
      setFeedback('Correct! Great memory!');
      // Pause to show feedback then advance
      setTimeout(() => {
        onCorrect();
      }, 1000);
    } else {
      setFeedback('Oops! Try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100 p-4">
      <h2 className="text-3xl font-bold text-pink-800 text-center">{question}</h2>
      <div className="mt-8 space-y-4">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(option)}
            className="w-full max-w-xs px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 focus:outline-none"
          >
            {option.text}
          </button>
        ))}
      </div>
      {feedback && (
        <p className="mt-6 text-xl text-pink-700 text-center">{feedback}</p>
      )}
    </div>
  );
};

// Final Step Component Props & Component
type FinalStepProps = {
  title: string;
  message: string;
  image: string;
};

const FinalStep: React.FC<FinalStepProps> = ({ title, message, image }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100 p-4">
      <h2 className="text-4xl font-bold text-pink-800 text-center">{title}</h2>
      <p className="mt-4 text-xl text-pink-700 text-center">{message}</p>
      <img
        src={`/images/${image}`}
        alt="Final Teddy"
        className="mt-8 w-64 h-auto rounded-full shadow-lg"
      />
    </div>
  );
};

// ---------- Main Page Component ----------
const Home: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const currentStep = steps[currentStepIndex];

  const handleNext = () => {
    setCurrentStepIndex((prevIndex) => prevIndex + 1);
  };

  switch (currentStep.type) {
    case 'welcome':
      return (
        <WelcomeStep
          title={currentStep.title}
          subtitle={currentStep.subtitle}
          image={currentStep.image}
          onNext={handleNext}
        />
      );
    case 'timeline':
      return (
        <TimelineStep
          title={currentStep.title}
          description={currentStep.description}
          image={currentStep.image}
          onNext={handleNext}
        />
      );
    case 'quiz':
      return (
        <QuizStep
          question={currentStep.question}
          options={currentStep.options}
          onCorrect={handleNext}
        />
      );
    case 'final':
      return (
        <FinalStep
          title={currentStep.title}
          message={currentStep.message}
          image={currentStep.image}
        />
      );
    default:
      return null;
  }
};

export default Home;
