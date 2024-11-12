"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Clock, BookOpen, GraduationCap, DollarSign, Target, Info } from 'lucide-react';

// Types remain the same as before
interface MetricCardProps {
  label: string;
  value: string | number;
  suffix?: string;
  icon: React.ElementType;
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
}

interface PerformanceLevels {
  level1: number;
  level2: number;
  level3: number;
}

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialWeeklyLessons?: number;
  initialPerformanceLevels?: PerformanceLevels;
}

const PerformanceTargetsDialog: React.FC<DialogProps> = ({ 
  open, 
  onOpenChange, 
  initialWeeklyLessons = 3,
  initialPerformanceLevels = { level1: 80, level2: 70, level3: 60 }
}) => {
  const [weeklyLessons, setWeeklyLessons] = useState(initialWeeklyLessons);
  const [performanceLevels, setPerformanceLevels] = useState(initialPerformanceLevels);

  const handleSubmit = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl bg-white">
        <DialogHeader className="border-b pb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-blue-50">
              <Target className="h-5 w-5 text-blue-600" />
            </div>
            <DialogTitle className="text-xl font-semibold">Set Performance Targets</DialogTitle>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Configure weekly lesson goals and performance targets for your team
          </p>
        </DialogHeader>

        <div className="py-6 space-y-8">
          {/* Weekly Lessons Section */}
          <div className="space-y-6 bg-gray-50 p-6 rounded-lg">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h3 className="text-base font-medium text-gray-900">Weekly Lesson Target</h3>
                <p className="text-sm text-gray-500">How many lessons should staff complete per week?</p>
              </div>
              <div className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">
                {weeklyLessons} lessons
              </div>
            </div>
            
            <div className="px-4">
              <Slider
                value={[weeklyLessons]}
                onValueChange={([value]) => setWeeklyLessons(value)}
                max={7}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between mt-2">
                <span className="text-xs text-gray-500">1</span>
                <span className="text-xs text-gray-500">7</span>
              </div>
            </div>
          </div>

          {/* Performance Levels Section */}
          <div className="space-y-6">
            <div className="flex items-start gap-2">
              <h3 className="text-base font-medium text-gray-900">Performance Thresholds</h3>
              <button className="group relative">
                <Info className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                <div className="invisible group-hover:visible absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-md whitespace-nowrap">
                  Set minimum performance targets for each level
                </div>
              </button>
            </div>

            <div className="grid gap-6">
              {Object.entries(performanceLevels).map(([level, value], index) => (
                <div key={level} className="space-y-4 bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${
                          index === 0 ? 'bg-green-500' : 
                          index === 1 ? 'bg-blue-500' : 
                          'bg-purple-500'
                        }`} />
                        <span className="text-sm font-medium text-gray-700">
                          Level {index + 1}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">
                        Recommended: {value}%
                      </p>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">
                      {value}%
                    </div>
                  </div>
                  
                  <div className="px-4">
                    <Slider
                      value={[value]}
                      onValueChange={([newValue]) => setPerformanceLevels(prev => ({
                        ...prev,
                        [level]: newValue
                      }))}
                      max={100}
                      min={0}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between mt-2">
                      <span className="text-xs text-gray-500">0%</span>
                      <span className="text-xs text-gray-500">100%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="sm:justify-end gap-3 border-t pt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1 sm:flex-none border-gray-200 hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white flex-1 sm:flex-none"
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// The rest of the components (MetricCard, CohortDashboard) remain exactly the same as in the previous code

const MetricCard: React.FC<MetricCardProps> = ({ 
  label, 
  value, 
  suffix, 
  icon: Icon,
  trend 
}) => (
  <Card className="relative overflow-hidden group hover:shadow-lg transition-shadow duration-300 bg-white shadow-sm border border-gray-100">
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
          <Icon className="h-5 w-5" />
        </div>
        {trend && (
          <span className={`text-sm font-medium ${
            trend.direction === 'up' ? 'text-green-600' : 'text-red-600'
          }`}>
            {trend.direction === 'up' ? '+' : '-'}{trend.value}%
          </span>
        )}
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-2">
        {value}{suffix}
      </div>
      <div className="text-sm text-gray-600">
        {label}
      </div>
    </div>
    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
  </Card>
);

const CohortDashboard: React.FC = () => {
  const router = useRouter();
  const [isKPIDialogOpen, setIsKPIDialogOpen] = useState(false);
  const [weeklyLessons, setWeeklyLessons] = useState(3);
  const [performanceLevels, setPerformanceLevels] = useState({
    level1: 80,
    level2: 70,
    level3: 60
  });

  const commonErrorsData = [
    { name: 'Grammar', value: 30, color: '#60A5FA' },
    { name: 'Pronunciation', value: 25, color: '#F97316' },
    { name: 'Vocabulary', value: 25, color: '#22C55E' },
    { name: 'Sentence Structure', value: 20, color: '#4B5563' }
  ];

  const lowestPerformingData = [
    { name: 'Business English', value: 35, color: '#60A5FA' },
    { name: 'Academic Writing', value: 30, color: '#4B5563' },
    { name: 'Public Speaking', value: 35, color: '#22C55E' }
  ];

  const renderPieChart = (data: any[]) => (
    <div className="h-[280px] w-full">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              border: 'none'
            }}
          />
          <Legend 
            layout="horizontal"
            align="center"
            verticalAlign="bottom"
            formatter={(value) => (
              <span className="text-sm text-gray-600">{value}</span>
            )}
            wrapperStyle={{
              paddingTop: '20px'
            }}
            iconType="circle"
            iconSize={8}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-gray-900">Cohort Analytics</h1>
            <p className="text-sm text-gray-500">Track your cohort's performance and progress</p>
          </div>
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => router.push('/reports-analytics/individual')}
              className="text-sm font-medium"
            >
              Individual Members
            </Button>
            <Button
              className="text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
            >
              Cohort
            </Button>
          </div>
        </div>

        <div className="grid gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard 
              label="Total Hours Spent"
              value="80.6"
              icon={Clock}
              trend={{ value: 12, direction: 'up' }}
            />
            <MetricCard 
              label="Lessons Completed"
              value="40.6"
              icon={BookOpen}
              trend={{ value: 8, direction: 'up' }}
            />
            <MetricCard 
              label="Performance Grade"
              value="72.8"
              suffix="%"
              icon={GraduationCap}
              trend={{ value: 8, direction: 'up' }}
            />
            <MetricCard 
              label="Tutor Savings"
              value="$5,735"
              icon={DollarSign}
              trend={{ value: 15, direction: 'up' }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 bg-white shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Common English Errors</h3>
              {renderPieChart(commonErrorsData)}
            </Card>
            <Card className="p-6 bg-white shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Lowest Performing Lessons</h3>
              {renderPieChart(lowestPerformingData)}
            </Card>
          </div>
          <Card className="p-6 bg-white shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Weekly Lesson Target</h2>
                <p className="text-sm text-gray-600">
                  Set the required number of lessons to be completed every week
                </p>
              </div>
              <Button 
                className="bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2"
                onClick={() => setIsKPIDialogOpen(true)}
              >
                <Target className="h-4 w-4" />
                Set Target
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold text-gray-900">{weeklyLessons}</div>
              <div className="text-sm text-gray-600">lessons per week</div>
            </div>
          </Card>
        </div>

        <PerformanceTargetsDialog
          open={isKPIDialogOpen}
          onOpenChange={setIsKPIDialogOpen}
          initialWeeklyLessons={weeklyLessons}
          initialPerformanceLevels={performanceLevels}
        />
      </div>
    </div>
  );
};

export default CohortDashboard;
