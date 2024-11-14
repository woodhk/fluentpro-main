import React from 'react';
import { Card } from '@/components/ui/card';
import { BookOpen, Clock, Award, LineChart } from 'lucide-react';

const PlatformFeatures = () => {
  const features = [
    {
      icon: <BookOpen className="h-6 w-6 text-pink-600" />,
      title: "Real-World Simulations",
      description: "Master business communication through authentic workplace scenarios",
      color: "bg-pink-50",
      hoverColor: "hover:bg-pink-100/50",
      iconColor: "text-pink-600"
    },
    {
      icon: <Clock className="h-6 w-6 text-blue-600" />,
      title: "Instant Feedback",
      description: "Receive real-time AI-powered suggestions to refine your communication",
      color: "bg-blue-50",
      hoverColor: "hover:bg-blue-100/50",
      iconColor: "text-blue-600"
    },
    {
      icon: <LineChart className="h-6 w-6 text-purple-600" />,
      title: "Personalized Learning Path",
      description: "Follow a custom curriculum tailored to your industry and proficiency",
      color: "bg-purple-50",
      hoverColor: "hover:bg-purple-100/50",
      iconColor: "text-purple-600"
    },
    {
      icon: <Award className="h-6 w-6 text-emerald-600" />,
      title: "Certificate of Completion",
      description: "Validate your business English proficiency with an official certification",
      color: "bg-emerald-50",
      hoverColor: "hover:bg-emerald-100/50",
      iconColor: "text-emerald-600"
    }
  ];

  return (
    <section className="w-full py-16 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
            What is Fluent Pro?
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Your AI-powered companion for mastering Business English. Perfect for professionals aiming to enhance their workplace communication skills through practical, personalized learning experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className={`group relative overflow-hidden transition-all duration-300 ${feature.hoverColor} border-none shadow-sm hover:shadow-md`}
            >
              <div className="p-6 space-y-4">
                <div className={`${feature.color} w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110`}>
                  {feature.icon}
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>

              <div className="absolute inset-0 border-2 border-transparent group-hover:border-2 group-hover:border-blue-100 rounded-lg transition-all duration-300" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformFeatures;