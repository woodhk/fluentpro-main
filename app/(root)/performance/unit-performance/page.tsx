"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronRight, Lock, Award, AlertTriangle, CheckCircle2 } from 'lucide-react';

type UnitStatus = 'completed' | 'in-progress' | 'struggling' | 'locked';

interface Unit {
  name: string;
  progress: number;
  status: 'locked' | 'unlocked';
}

const UnitPerformancePage = () => {
  const router = useRouter();
  
  const units: Unit[] = [
    { name: 'Business Communication Skills', progress: 77.8, status: 'unlocked' },
    { name: 'Business Meetings', progress: 89.9, status: 'unlocked' },
    { name: 'Business Presentations', progress: 43.7, status: 'unlocked' },
    { name: 'Advanced Negotiations', progress: 0, status: 'locked' },
    { name: 'Professional Writing', progress: 0, status: 'locked' },
    { name: 'Leadership Communication', progress: 0, status: 'locked' }
  ];

  const getProgressConfig = (progress: number) => {
    if (progress >= 80) {
      return {
        icon: <CheckCircle2 className="h-5 w-5 text-emerald-500" />,
        progressColor: 'bg-emerald-500',
        badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        label: 'Excellent'
      };
    } else if (progress >= 50) {
      return {
        icon: <Award className="h-5 w-5 text-yellow-500" />,
        progressColor: 'bg-yellow-500',
        badge: 'bg-yellow-50 text-yellow-700 border-yellow-200',
        label: 'Good'
      };
    } else if (progress > 0) {
      return {
        icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
        progressColor: 'bg-red-500',
        badge: 'bg-red-50 text-red-700 border-red-200',
        label: 'Needs Improvement'
      };
    } else {
      return {
        icon: <Lock className="h-5 w-5 text-gray-400" />,
        progressColor: 'bg-gray-200',
        badge: 'bg-gray-50 text-gray-600 border-gray-200',
        label: 'Locked'
      };
    }
  };

  const handleUnitClick = (unit: Unit) => {
    if (unit.status !== 'locked') {
      router.push('/performance/lesson-performance');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Performance Overview</h1>
        <p className="text-lg text-blue-600 font-medium">Unit Performance Tracking</p>
      </div>

      <Card className="shadow-lg border-gray-200">
        <CardHeader className="border-b bg-gray-50">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl text-gray-800">Learning Units</CardTitle>
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span>≥80%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <span>50-79%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span>&lt;50%</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4 max-h-[600px] overflow-y-auto custom-scrollbar pr-2">
            {units.map((unit, index) => {
              const progressConfig = getProgressConfig(unit.progress);
              
              return (
                <div
                  key={index}
                  onClick={() => handleUnitClick(unit)}
                  className={`group relative border rounded-xl p-5 transition-all duration-300 ease-in-out bg-white
                    ${unit.status !== 'locked' ? 'hover:shadow-lg cursor-pointer' : 'opacity-75 cursor-not-allowed'}
                  `}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h3 className={`font-semibold text-gray-900 
                            ${unit.status !== 'locked' ? 'group-hover:text-blue-600' : ''} 
                            transition-colors`}
                          >
                            {unit.name}
                          </h3>
                          <div className="flex items-center gap-2">
                            {progressConfig.icon}
                            <span className={`text-sm px-2 py-1 rounded-full border ${progressConfig.badge}`}>
                              {progressConfig.label}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {unit.status !== 'locked' && (
                            <span className="text-lg font-semibold text-gray-700">
                              {unit.progress.toFixed(1)}%
                            </span>
                          )}
                          <ChevronRight className={`h-5 w-5 text-gray-400 
                            ${unit.status !== 'locked' ? 'group-hover:text-blue-500 group-hover:transform group-hover:translate-x-1' : ''} 
                            transition-all`} 
                          />
                        </div>
                      </div>
                      
                      <div className="relative h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`absolute left-0 top-0 h-full ${progressConfig.progressColor} transition-all duration-500 ease-out`}
                          style={{ 
                            width: `${unit.progress}%`,
                            transform: `translateX(${unit.status === 'locked' ? '-100%' : '0'})` 
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UnitPerformancePage;