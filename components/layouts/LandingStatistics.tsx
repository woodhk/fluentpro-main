import React from 'react';
import { Card } from '@/components/ui/card';
import { Users, Clock, Target } from 'lucide-react';

interface StatCardProps {
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
  description: string;
  gradient: string;
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({ 
  icon, 
  value, 
  suffix, 
  label, 
  description, 
  gradient, 
  delay = 0 
}) => {
  return (
    <div className="group relative transform transition-all duration-300 hover:scale-105">
      {/* Glowing border effect on hover */}
      <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 blur transition duration-300 group-hover:opacity-30" />
      
      <Card className="relative z-10 h-full overflow-hidden rounded-xl border-2 border-transparent bg-white/80 backdrop-blur-sm p-8 shadow-2xl">
        <div className="mb-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-blue-50 transition-colors duration-300 group-hover:bg-blue-100">
            {icon}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-baseline gap-2">
            <span className={`text-6xl font-bold tracking-tight ${gradient}`}>
              {value}
            </span>
            <span className="text-xl font-medium text-gray-500">{suffix}</span>
          </div>

          <h3 className="text-xl font-semibold text-gray-900">
            {label}
          </h3>

          <p className="text-base text-gray-600">
            {description}
          </p>
        </div>

        {/* Background decoration */}
        <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 transform rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-30" />
      </Card>
    </div>
  );
};

const LandingStatistics: React.FC = () => {
  const stats: StatCardProps[] = [
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      value: 60,
      suffix: "%",
      label: "Enhanced Employee Engagement",
      description: "AI-driven personalization can boost employee engagement by up to 60%, making training more dynamic and effective.",
      gradient: "bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
    },
    {
      icon: <Target className="h-8 w-8 text-indigo-600" />,
      value: 70,
      suffix: "%",
      label: "Higher Adoption Rates",
      description: "70% of workers are already using AI-based tools in their training, indicating a strong preference for AI-powered solutions over traditional methods.",
      gradient: "bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
    },
    {
      icon: <Clock className="h-8 w-8 text-pink-600" />,
      value: 245,
      suffix: "Hours",
      label: "Increased Efficiency and Productivity",
      description: "AI integration in training programs can lead to significant time savings for employees.",
      gradient: "bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent"
    }
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-blue-50/30 to-white">
      {/* Grid Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-radial from-blue-100/20 to-transparent opacity-40 blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-radial from-indigo-100/20 to-transparent opacity-40 blur-3xl" />
      </div>

      {/* Top and Bottom Gradients */}
      <div className="absolute inset-0">
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>

      <div className="relative px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            A Personal AI English-Speaking Coach For Every Employee
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            FluentPro helps your employees build confidence and improve speaking skills through practicing real-world scenarios for their work, without the pressure. No physical classes needed...
          </p>
        </div>

        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-3">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} delay={index * 200} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingStatistics;