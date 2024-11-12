"use client";

import React, { useState, ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

// Type definitions

interface ValidationState {
  isValid: boolean;
  message: string;
}

interface ScreenProps {
  onNext: () => void;
  onBack?: () => void;
  showValidation?: boolean;
}

interface ValidatedNavigationProps extends NavigationButtonsProps {
  isValid: boolean;
  showValidation: boolean;
  validationMessage: string;
}

interface HeadingProps {
  children: ReactNode;
}

interface QuestionProps {
  children: ReactNode;
}

interface NavigationButtonsProps {
  onNext: () => void;
  onBack?: () => void;
  showBack?: boolean;
}

interface ScreenProps {
  onNext: () => void;
  onBack?: () => void;
}

// Reusable components

const ProgressBar: React.FC<{ currentStep: number; totalSteps: number }> = ({ 
  currentStep, 
  totalSteps 
}) => {
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <div className="w-full max-w-2xl mx-auto mb-28">
      <div className="flex justify-between mb-2 text-sm text-gray-600">
        <span>Part 1: Initial Setup</span>
        <span>{Math.round(progress)}% Complete</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full">
        <div 
          className="h-full bg-blue-600 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

const ValidatedNavigation: React.FC<ValidatedNavigationProps> = ({
  onNext,
  onBack,
  showBack = true,
  isValid,
  showValidation,
  validationMessage
}) => (
  <div className="space-y-2">
    <Button
      onClick={onNext}
      className={`w-full ${isValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-400 cursor-not-allowed'}`}
      disabled={!isValid}
    >
      Next
    </Button>
    {showBack && (
      <button
        onClick={onBack}
        className="text-blue-600 hover:underline text-sm w-full text-center"
      >
        Back
      </button>
    )}
    {showValidation && !isValid && (
      <p className="text-red-500 text-sm text-center">{validationMessage}</p>
    )}
  </div>
);

const Heading: React.FC<HeadingProps> = ({ children }) => (
  <CardHeader>
    <CardTitle className="text-xl font-semibold">{children}</CardTitle>
  </CardHeader>
);

const Question: React.FC<QuestionProps> = ({ children }) => (
  <div className="mb-6 text-gray-700">{children}</div>
);

const NavigationButtons: React.FC<NavigationButtonsProps> = ({ onNext, onBack, showBack = true }) => (
  <div className="flex flex-col gap-2">
    <Button onClick={onNext} className="w-full bg-blue-600 hover:bg-blue-700">
      Next
    </Button>
    {showBack && (
      <button onClick={onBack} className="text-blue-600 hover:underline text-sm">
        Back
      </button>
    )}
  </div>
);

// Screen components
const WelcomeScreen: React.FC<ScreenProps> = ({ onNext }) => (
  <Card className="w-full max-w-md mx-auto">
    <Heading>Welcome to FluentPro!</Heading>
    <CardContent>
      <Question>
        In the next 5 minutes, we'll ask a few simple questions and guide you through a
        quick assessment to personalize your Business English learning path.
        Let's get started!
      </Question>
      <NavigationButtons onNext={onNext} showBack={false} />
    </CardContent>
  </Card>
);

const LanguageScreen: React.FC<ScreenProps> = ({ onNext, onBack, showValidation }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");

  const validate = (): ValidationState => ({
    isValid: selectedLanguage !== "",
    message: "Please select your first language"
  });

  const { isValid, message } = validate();

  return (
    <Card className="w-full max-w-md mx-auto">
      <Heading>General Information</Heading>
      <CardContent>
        <Question>What is your first language?</Question>
        <div className="mb-6">
          <Select onValueChange={setSelectedLanguage} value={selectedLanguage}>
            <SelectTrigger>
              <SelectValue placeholder="Select the options" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="spanish">Spanish</SelectItem>
              <SelectItem value="french">French</SelectItem>
              <SelectItem value="german">German</SelectItem>
              <SelectItem value="chinese">Chinese</SelectItem>
              <SelectItem value="japanese">Japanese</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <ValidatedNavigation
          onNext={onNext}
          onBack={onBack}
          isValid={isValid}
          showValidation={showValidation || false}
          validationMessage={message}
        />
      </CardContent>
    </Card>
  );
};


const UsageScreen: React.FC<ScreenProps> = ({ onNext, onBack, showValidation }) => {
  const [selectedUsage, setSelectedUsage] = useState<string>("");

  const validate = (): ValidationState => ({
    isValid: selectedUsage !== "",
    message: "Please select how often you use English"
  });

  const { isValid, message } = validate();

  return (
    <Card className="w-full max-w-md mx-auto">
      <Heading>General Information</Heading>
      <CardContent>
        <Question>
          How often do you use English in your professional life?
        </Question>
        <RadioGroup 
          className="flex flex-col gap-4 mb-6"
          value={selectedUsage}
          onValueChange={setSelectedUsage}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="daily" id="daily" />
            <Label htmlFor="daily">Daily</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="weekly" id="weekly" />
            <Label htmlFor="weekly">Weekly</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="seldom" id="seldom" />
            <Label htmlFor="seldom">Seldom</Label>
          </div>
        </RadioGroup>
        <ValidatedNavigation 
          onNext={onNext} 
          onBack={onBack} 
          isValid={isValid}
          showValidation={showValidation || false}
          validationMessage={message}
        />
      </CardContent>
    </Card>
  );
};

const SkillsAssessmentScreen: React.FC<ScreenProps> = ({ onNext, onBack, showValidation }) => {
  const [selectedSkill, setSelectedSkill] = useState<string>("");
  
  const skillLevels = [
    { value: "elementary", label: "Elementary" },
    { value: "pre-intermediate", label: "Pre-Intermediate" },
    { value: "intermediate", label: "Intermediate" },
    { value: "higher-intermediate", label: "Higher Intermediate" },
    { value: "advanced", label: "Advanced" }
  ];

  const validate = (): ValidationState => ({
    isValid: selectedSkill !== "",
    message: "Please select your current Business English skill level"
  });

  const { isValid, message } = validate();

  return (
    <Card className="w-full max-w-md mx-auto">
      <Heading>General Information</Heading>
      <CardContent>
        <Question>
          How would you rate your current Business English skills?
        </Question>
        <RadioGroup
          className="flex flex-col gap-3 mb-6"
          value={selectedSkill}
          onValueChange={setSelectedSkill}
        >
          {skillLevels.map(({ value, label }) => (
            <div key={value} className="flex items-center space-x-2">
              <RadioGroupItem value={value} id={value} />
              <Label htmlFor={value}>{label}</Label>
            </div>
          ))}
        </RadioGroup>
        <ValidatedNavigation 
          onNext={onNext} 
          onBack={onBack}
          isValid={isValid}
          showValidation={showValidation || false}
          validationMessage={message}
        />
      </CardContent>
    </Card>
  );
};

const LearningGoalsScreen: React.FC<ScreenProps> = ({ onNext, onBack, showValidation }) => {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const goals = [
    { id: "general", label: "Improve my general Business English" },
    { id: "speaking", label: "Focus on speaking and fluency" },
    { id: "conversations", label: "Practice for real-life business conversations" },
    { id: "presentation", label: "Prepare for a specific event (e.g., presentation)" },
    { id: "pronunciation", label: "Improve Pronunciation" },
    { id: "vocabulary", label: "Learn job-specific business vocabulary and jargon" }
  ];

  const validate = (): ValidationState => ({
    isValid: selectedGoals.length > 0,
    message: "Please select at least one learning goal"
  });

  const { isValid, message } = validate();

  const toggleGoal = (id: string) => {
    setSelectedGoals(current =>
      current.includes(id)
        ? current.filter(goal => goal !== id)
        : [...current, id]
    );
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <Heading>Learning Goals</Heading>
      <CardContent>
        <Question>
          What is your main goal for using FluentPro?
          <div className="text-sm text-gray-500 mt-1">(select all that apply)</div>
        </Question>
        <div className={`flex flex-col gap-4 mb-6 ${showValidation && !isValid ? 'pb-2 border-b border-red-200' : ''}`}>
          {goals.map(({ id, label }) => (
            <div key={id} className="flex items-start space-x-2">
              <Checkbox
                id={id}
                checked={selectedGoals.includes(id)}
                onCheckedChange={(checked) => {
                  if (checked) toggleGoal(id);
                  else {
                    setSelectedGoals(current => 
                      current.filter(goalId => goalId !== id)
                    );
                  }
                }}
              />
              <Label
                htmlFor={id}
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {label}
              </Label>
            </div>
          ))}
        </div>
        <ValidatedNavigation 
          onNext={onNext} 
          onBack={onBack}
          isValid={isValid}
          showValidation={showValidation || false}
          validationMessage={message}
        />
      </CardContent>
    </Card>
  );
};

const LearningStyleScreen: React.FC<ScreenProps> = ({ onNext, onBack, showValidation }) => {
  const [selectedTime, setSelectedTime] = useState<string>("");
  
  const timeOptions = [
    { value: "5-10", label: "5-10 minutes" },
    { value: "10-20", label: "10-20 minutes" },
    { value: "20-30", label: "20-30 minutes" },
    { value: "30+", label: "30+ minutes" }
  ];

  const validate = (): ValidationState => ({
    isValid: selectedTime !== "",
    message: "Please select your preferred daily learning time"
  });

  const { isValid, message } = validate();

  return (
    <Card className="w-full max-w-md mx-auto">
      <Heading>Preferred Learning Style</Heading>
      <CardContent>
        <Question>
          How much time per day are you willing to spend using Fluent Pro?
        </Question>
        <RadioGroup
          className="flex flex-col gap-3 mb-6"
          value={selectedTime}
          onValueChange={setSelectedTime}
        >
          {timeOptions.map(({ value, label }) => (
            <div key={value} className="flex items-center space-x-2">
              <RadioGroupItem value={value} id={value} />
              <Label htmlFor={value}>{label}</Label>
            </div>
          ))}
        </RadioGroup>
        <ValidatedNavigation 
          onNext={onNext} 
          onBack={onBack}
          isValid={isValid}
          showValidation={showValidation || false}
          validationMessage={message}
        />
      </CardContent>
    </Card>
  );
};

const ConfidenceScreen: React.FC<ScreenProps> = ({ onNext, onBack, showValidation }) => {
  const [confidenceLevel, setConfidenceLevel] = useState<string>("");
  
  const confidenceLevels = [
    { value: "very", label: "Very confident" },
    { value: "somewhat", label: "Somewhat confident" },
    { value: "not", label: "Not confident at all" }
  ];

  const validate = (): ValidationState => ({
    isValid: confidenceLevel !== "",
    message: "Please select your confidence level"
  });

  const { isValid, message } = validate();

  return (
    <Card className="w-full max-w-md mx-auto">
      <Heading>Confidence</Heading>
      <CardContent>
        <Question>
          How confident do you feel using English in your current role?
        </Question>
        <RadioGroup
          className="flex flex-col gap-3 mb-6"
          value={confidenceLevel}
          onValueChange={setConfidenceLevel}
        >
          {confidenceLevels.map(({ value, label }) => (
            <div key={value} className="flex items-center space-x-2">
              <RadioGroupItem value={value} id={value} />
              <Label htmlFor={value}>{label}</Label>
            </div>
          ))}
        </RadioGroup>
        <ValidatedNavigation 
          onNext={onNext} 
          onBack={onBack}
          isValid={isValid}
          showValidation={showValidation || false}
          validationMessage={message}
        />
      </CardContent>
    </Card>
  );
};

const MotivationScreen: React.FC<ScreenProps> = ({ onNext, onBack, showValidation }) => {
  const [selectedMotivations, setSelectedMotivations] = useState<string[]>([]);

  const motivations = [
    { id: "career", label: "Career progression" },
    { id: "communication", label: "Improved communication with colleagues" },
    { id: "confidence", label: "Increased confidence in meetings" },
    { id: "personal", label: "Personal development" }
  ];

  const validate = (): ValidationState => ({
    isValid: selectedMotivations.length > 0,
    message: "Please select at least one motivation"
  });

  const { isValid, message } = validate();

  const toggleMotivation = (motivationId: string) => {
    setSelectedMotivations(current =>
      current.includes(motivationId)
        ? current.filter(id => id !== motivationId)
        : [...current, motivationId]
    );
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <Heading>Motivation</Heading>
      <CardContent>
        <Question>
          What motivates you to improve your Business English?
          <div className="text-sm text-gray-500 mt-1">(Select all that apply)</div>
        </Question>
        <div className={`flex flex-col gap-4 mb-6 ${showValidation && !isValid ? 'pb-2 border-b border-red-200' : ''}`}>
          {motivations.map(({ id, label }) => (
            <div key={id} className="flex items-start space-x-2">
              <Checkbox
                id={id}
                checked={selectedMotivations.includes(id)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    toggleMotivation(id);
                  } else {
                    setSelectedMotivations(current => 
                      current.filter(motId => motId !== id)
                    );
                  }
                }}
              />
              <Label
                htmlFor={id}
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {label}
              </Label>
            </div>
          ))}
        </div>
        <ValidatedNavigation 
          onNext={onNext} 
          onBack={onBack}
          isValid={isValid}
          showValidation={showValidation || false}
          validationMessage={message}
        />
      </CardContent>
    </Card>
  );
};

const TechnicalSupportScreen: React.FC<ScreenProps> = ({ onNext, onBack, showValidation }) => {
  const [platform, setPlatform] = useState<string>("");
  
  const platformOptions = [
    { value: "desktop", label: "Desktop" },
    { value: "mobile", label: "Mobile" },
    { value: "both", label: "Both" }
  ];

  const validate = (): ValidationState => ({
    isValid: platform !== "",
    message: "Please select your preferred platform"
  });

  const { isValid, message } = validate();

  return (
    <Card className="w-full max-w-md mx-auto">
      <Heading>Technical and Support</Heading>
      <CardContent>
        <Question>
          Do you prefer using FluentPro on
        </Question>
        <RadioGroup
          className="flex flex-col gap-3 mb-6"
          value={platform}
          onValueChange={setPlatform}
        >
          {platformOptions.map(({ value, label }) => (
            <div key={value} className="flex items-center space-x-2">
              <RadioGroupItem value={value} id={value} />
              <Label htmlFor={value}>{label}</Label>
            </div>
          ))}
        </RadioGroup>
        <ValidatedNavigation 
          onNext={onNext} 
          onBack={onBack}
          isValid={isValid}
          showValidation={showValidation || false}
          validationMessage={message}
        />
      </CardContent>
    </Card>
  );
};

const AIFamiliarityScreen: React.FC<ScreenProps> = ({ onNext, onBack, showValidation }) => {
  const [familiarity, setFamiliarity] = useState<string>("");
  
  const familiarityLevels = [
    { value: "very", label: "Very familiar" },
    { value: "somewhat", label: "Somewhat familiar" },
    { value: "not", label: "Not familiar at all" }
  ];

  const validate = (): ValidationState => ({
    isValid: familiarity !== "",
    message: "Please select your familiarity level with AI tools"
  });

  const { isValid, message } = validate();

  return (
    <Card className="w-full max-w-md mx-auto">
      <Heading>Technical and Support</Heading>
      <CardContent>
        <Question>
          How familiar are you with AI-powered tools for language learning?
        </Question>
        <RadioGroup
          className="flex flex-col gap-3 mb-6"
          value={familiarity}
          onValueChange={setFamiliarity}
        >
          {familiarityLevels.map(({ value, label }) => (
            <div key={value} className="flex items-center space-x-2">
              <RadioGroupItem value={value} id={value} />
              <Label htmlFor={value}>{label}</Label>
            </div>
          ))}
        </RadioGroup>
        <ValidatedNavigation 
          onNext={onNext} 
          onBack={onBack}
          isValid={isValid}
          showValidation={showValidation || false}
          validationMessage={message}
        />
      </CardContent>
    </Card>
  );
};

const TechnologyComfortScreen: React.FC<ScreenProps> = ({ onNext, onBack, showValidation }) => {
  const [comfort, setComfort] = useState<string>("");
  
  const comfortLevels = [
    { value: "very", label: "Very comfortable" },
    { value: "somewhat", label: "Somewhat comfortable" },
    { value: "not", label: "Not comfortable" }
  ];

  const validate = (): ValidationState => ({
    isValid: comfort !== "",
    message: "Please select your comfort level with technology"
  });

  const { isValid, message } = validate();

  return (
    <Card className="w-full max-w-md mx-auto">
      <Heading>Technical and Support</Heading>
      <CardContent>
        <Question>
          How would you rate your comfort level with using new technology or apps?
        </Question>
        <RadioGroup
          className="flex flex-col gap-3 mb-6"
          value={comfort}
          onValueChange={setComfort}
        >
          {comfortLevels.map(({ value, label }) => (
            <div key={value} className="flex items-center space-x-2">
              <RadioGroupItem value={value} id={value} />
              <Label htmlFor={value}>{label}</Label>
            </div>
          ))}
        </RadioGroup>
        <ValidatedNavigation 
          onNext={onNext} 
          onBack={onBack}
          isValid={isValid}
          showValidation={showValidation || false}
          validationMessage={message}
        />
      </CardContent>
    </Card>
  );
};

const PersonalizationIntroScreen: React.FC<ScreenProps> = ({ onNext, onBack }) => {
  return (
    <Card className="w-full max-w-md mx-auto">
      <Heading>Personalization</Heading>
      <CardContent>
        <Question>
          To help the AI understand your Business English needs, please try your best to
          answer the following questions.
        </Question>
        <div className="mt-6">
          <Button 
            onClick={onNext} 
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const BusinessAreasScreen: React.FC<ScreenProps> = ({ onNext, onBack, showValidation }) => {
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);

  const businessAreas = [
    // Group 1: Core Business Activities
    {
      group: "Core Business Activities",
      items: [
        { id: "meetings", label: "Business Meetings" },
        { id: "presentations", label: "Business Presentations" },
        { id: "negotiations", label: "Business Negotiations" },
        { id: "sales", label: "Sales" }
      ]
    },
    // Group 2: Communication Channels
    {
      group: "Communication Channels",
      items: [
        { id: "telephoning", label: "Telephoning" },
        { id: "teleconferencing", label: "Teleconferencing" },
        { id: "customer-service", label: "Customer Service" }
      ]
    },
    // Group 3: Skills Development
    {
      group: "Skills Development",
      items: [
        { id: "speaking", label: "Business speaking skills" },
        { id: "communication", label: "Business communication skills" },
        { id: "reporting", label: "Reporting" },
        { id: "instructing", label: "Instructing" }
      ]
    }
  ];

  const validate = (): ValidationState => ({
    isValid: selectedAreas.length > 0,
    message: "Please select at least one business area"
  });

  const { isValid, message } = validate();

  const toggleArea = (areaId: string) => {
    setSelectedAreas(current =>
      current.includes(areaId)
        ? current.filter(id => id !== areaId)
        : [...current, areaId]
    );
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <Heading>Personalisation</Heading>
      <CardContent>
        <Question>
          Which areas of business English speaking do you use or want to learn to use for your daily work?
          <div className="text-sm text-gray-500 mt-1">(Select all those that apply)</div>
        </Question>
        <div className={`space-y-6 mt-6 ${showValidation && !isValid ? 'pb-2 border-b border-red-200' : ''}`}>
          {businessAreas.map((group) => (
            <div key={group.group} className="space-y-3">
              <h3 className="font-medium text-gray-700">{group.group}</h3>
              <div className="grid grid-cols-2 gap-4">
                {group.items.map(({ id, label }) => (
                  <div key={id} className="flex items-start space-x-2">
                    <Checkbox
                      id={id}
                      checked={selectedAreas.includes(id)}
                      onCheckedChange={(checked) => {
                        if (checked) toggleArea(id);
                        else {
                          setSelectedAreas(current => 
                            current.filter(areaId => areaId !== id)
                          );
                        }
                      }}
                    />
                    <Label
                      htmlFor={id}
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <ValidatedNavigation 
            onNext={onNext} 
            onBack={onBack}
            isValid={isValid}
            showValidation={showValidation || false}
            validationMessage={message}
          />
        </div>
      </CardContent>
    </Card>
  );
};

const IndustryScreen: React.FC<ScreenProps> = ({ onNext, onBack, showValidation }) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>("");
  const [otherIndustry, setOtherIndustry] = useState<string>("");

  const industries = [
    {
      group: "Financial Sector",
      items: [
        { id: "finance", label: "Accounting, Banking & Finance" },
        { id: "insurance", label: "Insurance" },
        { id: "trading", label: "Trading" }
      ]
    },
    {
      group: "Commerce & Services",
      items: [
        { id: "retail", label: "Retail" },
        { id: "property", label: "Property Management" },
        { id: "hospitality", label: "Hotels, Leisure & Travel" }
      ]
    },
    {
      group: "Technology & Logistics",
      items: [
        { id: "tech", label: "Technology & Telecoms" },
        { id: "logistics", label: "Shipping & Logistics" }
      ]
    }
  ];

  const validate = (): ValidationState => {
    if (selectedIndustry === "") {
      return {
        isValid: false,
        message: "Please select your industry"
      };
    }
    
    if (selectedIndustry === "other" && otherIndustry.trim() === "") {
      return {
        isValid: false,
        message: "Please specify your industry"
      };
    }

    return {
      isValid: true,
      message: ""
    };
  };

  const { isValid, message } = validate();

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <Heading>Personalisation</Heading>
      <CardContent>
        <Question>
          What industry is your company in?
        </Question>
        <RadioGroup 
          value={selectedIndustry} 
          onValueChange={setSelectedIndustry}
          className="space-y-6 mt-6"
        >
          {industries.map((group) => (
            <div key={group.group} className="space-y-3">
              <h3 className="font-medium text-gray-700">{group.group}</h3>
              <div className="grid grid-cols-2 gap-4">
                {group.items.map(({ id, label }) => (
                  <div key={id} className="flex items-center space-x-2">
                    <RadioGroupItem value={id} id={id} />
                    <Label htmlFor={id}>{label}</Label>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          <div className="space-y-3">
            <h3 className="font-medium text-gray-700">Other</h3>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="other" id="other" />
              <Label htmlFor="other">Other Industry</Label>
            </div>
            {selectedIndustry === "other" && (
              <div className={`${showValidation && !isValid && otherIndustry.trim() === "" ? 'border-red-200' : ''}`}>
                <input
                  type="text"
                  placeholder="Please specify"
                  value={otherIndustry}
                  onChange={(e) => setOtherIndustry(e.target.value)}
                  className={`w-full p-2 border rounded-md mt-2 
                    ${showValidation && !isValid && otherIndustry.trim() === "" 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                    }`}
                />
              </div>
            )}
          </div>
        </RadioGroup>
        <div className="mt-6">
          <ValidatedNavigation 
            onNext={onNext} 
            onBack={onBack}
            isValid={isValid}
            showValidation={showValidation || false}
            validationMessage={message}
          />
        </div>
      </CardContent>
    </Card>
  );
};

const WorkAreaScreen: React.FC<ScreenProps> = ({ onNext, onBack, showValidation }) => {
  const [selectedArea, setSelectedArea] = useState<string>("");
  const [otherArea, setOtherArea] = useState<string>("");

  const workAreas = [
    // Column 1
    {
      group: "Financial & Professional",
      items: [
        { id: "finance", label: "Accounting, Banking & Finance" },
        { id: "insurance", label: "Insurance" },
        { id: "trading", label: "Trading" }
      ]
    },
    // Column 2
    {
      group: "Services & Management",
      items: [
        { id: "retail", label: "Retail" },
        { id: "property", label: "Property Management" },
        { id: "government", label: "Public Services & Government" }
      ]
    },
    // Column 3
    {
      group: "Technology & Hospitality",
      items: [
        { id: "tech", label: "Technology & Telecoms" },
        { id: "shipping", label: "Shipping & Logistics" },
        { id: "hospitality", label: "Hotels, Leisure & Travel" }
      ]
    }
  ];

  const validate = (): ValidationState => {
    if (selectedArea === "") {
      return {
        isValid: false,
        message: "Please select your area of work"
      };
    }
    
    if (selectedArea === "other" && otherArea.trim() === "") {
      return {
        isValid: false,
        message: "Please specify your area of work"
      };
    }

    return {
      isValid: true,
      message: ""
    };
  };

  const { isValid, message } = validate();

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <Heading>Personalisation</Heading>
      <CardContent>
        <Question>
          What is your area of work?
        </Question>
        <RadioGroup 
          value={selectedArea} 
          onValueChange={setSelectedArea}
          className="space-y-6 mt-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {workAreas.map((group) => (
              <div key={group.group} className="space-y-3">
                <h3 className="font-medium text-gray-700">{group.group}</h3>
                <div className="space-y-3">
                  {group.items.map(({ id, label }) => (
                    <div key={id} className="flex items-center space-x-2">
                      <RadioGroupItem value={id} id={id} />
                      <Label htmlFor={id} className="text-sm">
                        {label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            <div className="space-y-3">
              <h3 className="font-medium text-gray-700">Other</h3>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other" className="text-sm">Other</Label>
              </div>
              {selectedArea === "other" && (
                <div className={`${showValidation && !isValid && otherArea.trim() === "" ? 'border-red-200' : ''}`}>
                  <input
                    type="text"
                    placeholder="Please specify"
                    value={otherArea}
                    onChange={(e) => setOtherArea(e.target.value)}
                    className={`w-full p-2 border rounded-md text-sm
                      ${showValidation && !isValid && otherArea.trim() === "" 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                      }`}
                  />
                </div>
              )}
            </div>
          </div>
        </RadioGroup>
        <div className="mt-6">
          <ValidatedNavigation 
            onNext={onNext} 
            onBack={onBack}
            isValid={isValid}
            showValidation={showValidation || false}
            validationMessage={message}
          />
        </div>
      </CardContent>
    </Card>
  );
};

const CompletionScreen: React.FC<ScreenProps> = ({ onNext, onBack }) => {
  return (
    <Card className="w-full max-w-2xl mx-auto text-center">
      <CardContent className="pt-6">
        <div className="mb-6">
          <div className="rounded-full bg-green-100 w-16 h-16 mx-auto flex items-center justify-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-8 w-8 text-green-600" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                clipRule="evenodd" 
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold mt-4 mb-2">
            Thanks for completing the first part of the onboarding!
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            The next few screens are optional, but by completing them, 
            you'll help us personalize your FluentPro experience even more.
            Let's make it truly tailored to your needs!
          </p>
          <div className="flex flex-col gap-3 max-w-xs mx-auto">
            <Button 
              onClick={onNext}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Continue
            </Button>
            <button
              onClick={onBack}
              className="text-blue-600 hover:underline text-sm"
            >
              Back
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Main App Component
const OnboardingFlow = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [showValidation, setShowValidation] = useState(false);
  
  const totalScreens = 16;

  const handleNext = () => {
    setShowValidation(false);
    setCurrentScreen(prev => prev + 1);
  };

  const handleBack = () => {
    setShowValidation(false);
    setCurrentScreen(prev => prev - 1);
  };

  const handleValidatedNext = (isValid: boolean) => {
    if (isValid) {
      setShowValidation(false);
      setCurrentScreen(prev => prev + 1);
    } else {
      setShowValidation(true);
    }
  };

  const screens = [
    <WelcomeScreen 
      key="welcome" 
      onNext={handleNext} 
    />,
    <LanguageScreen 
      key="language" 
      onNext={handleNext} 
      onBack={handleBack}
      showValidation={showValidation}
    />,
    <UsageScreen 
      key="usage" 
      onNext={handleNext} 
      onBack={handleBack}
      showValidation={showValidation}
    />,
    <SkillsAssessmentScreen 
      key="skills" 
      onNext={handleNext} 
      onBack={handleBack}
      showValidation={showValidation}
    />,
    <LearningGoalsScreen 
      key="goals" 
      onNext={handleNext} 
      onBack={handleBack}
      showValidation={showValidation}
    />,
    <LearningStyleScreen 
      key="style" 
      onNext={handleNext} 
      onBack={handleBack}
      showValidation={showValidation}
    />,
    <ConfidenceScreen 
      key="confidence" 
      onNext={handleNext} 
      onBack={handleBack}
      showValidation={showValidation}
    />,
    <MotivationScreen 
      key="motivation" 
      onNext={handleNext} 
      onBack={handleBack}
      showValidation={showValidation}
    />,
    <TechnicalSupportScreen 
      key="technical" 
      onNext={handleNext} 
      onBack={handleBack}
      showValidation={showValidation}
    />,
    <AIFamiliarityScreen 
      key="ai-familiarity" 
      onNext={handleNext} 
      onBack={handleBack}
      showValidation={showValidation}
    />,
    <TechnologyComfortScreen 
      key="tech-comfort" 
      onNext={handleNext} 
      onBack={handleBack}
      showValidation={showValidation}
    />,
    <PersonalizationIntroScreen 
      key="personalization" 
      onNext={handleNext} 
      onBack={handleBack}
    />,
    <BusinessAreasScreen 
      key="business-areas" 
      onNext={handleNext} 
      onBack={handleBack}
      showValidation={showValidation}
    />,
    <IndustryScreen 
      key="industry" 
      onNext={handleNext} 
      onBack={handleBack}
      showValidation={showValidation}
    />,
    <WorkAreaScreen 
      key="work-area" 
      onNext={handleNext} 
      onBack={handleBack}
      showValidation={showValidation}
    />,
    <CompletionScreen 
      key="completion" 
      onNext={handleNext} 
      onBack={handleBack}
    />
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Logo and Progress Bar Container */}
        <div className="mb-8">
          {/* Centered Logo */}
          <div className="flex justify-center mb-12">
            <img 
              src="/icons/logo.svg" 
              alt="FluentPro Logo" 
              className="h-8"
            />
          </div>
          
          {/* Progress Bar - only show for screens between welcome and completion */}
          {currentScreen > 0 && currentScreen < totalScreens - 1 && (
            <ProgressBar 
              currentStep={currentScreen} 
              totalSteps={totalScreens - 1}
            />
          )}
        </div>

        {/* Screen Content */}
        <div className="flex items-center justify-center">
          {screens[currentScreen]}
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;