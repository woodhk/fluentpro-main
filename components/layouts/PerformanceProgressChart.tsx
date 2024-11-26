// components/PerformanceProgressChart.tsx
"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// Data types
interface MonthlyDataPoint {
  month: string;
  proficiencyProgress: number;
  lessonCompletion: number;
  industryBenchmark: number;
  cohortEngagement: number;
  timeSpentCorrelation: number;
}

// Sample data with proper typing
const monthlyData: MonthlyDataPoint[] = [
  {
    month: 'Jan',
    proficiencyProgress: 45,
    lessonCompletion: 62,
    industryBenchmark: 55,
    cohortEngagement: 58,
    timeSpentCorrelation: 51
  },
  {
    month: 'Feb',
    proficiencyProgress: 52,
    lessonCompletion: 68,
    industryBenchmark: 56,
    cohortEngagement: 65,
    timeSpentCorrelation: 59
  },
  {
    month: 'Mar',
    proficiencyProgress: 58,
    lessonCompletion: 73,
    industryBenchmark: 57,
    cohortEngagement: 70,
    timeSpentCorrelation: 64
  },
  {
    month: 'Apr',
    proficiencyProgress: 65,
    lessonCompletion: 78,
    industryBenchmark: 58,
    cohortEngagement: 75,
    timeSpentCorrelation: 69
  },
  {
    month: 'May',
    proficiencyProgress: 71,
    lessonCompletion: 82,
    industryBenchmark: 59,
    cohortEngagement: 78,
    timeSpentCorrelation: 73
  },
  {
    month: 'Jun',
    proficiencyProgress: 75,
    lessonCompletion: 85,
    industryBenchmark: 60,
    cohortEngagement: 80,
    timeSpentCorrelation: 76
  }
];

interface DataKey {
  key: keyof Omit<MonthlyDataPoint, 'month'>;
  name: string;
  color: string;
}

const dataKeys: DataKey[] = [
  { key: 'proficiencyProgress', name: 'Proficiency Progress', color: '#3B82F6' },
  { key: 'lessonCompletion', name: 'Lesson Completion', color: '#10B981' },
  { key: 'industryBenchmark', name: 'Industry Benchmark', color: '#6B7280' },
  { key: 'cohortEngagement', name: 'Cohort Engagement', color: '#8B5CF6' },
  { key: 'timeSpentCorrelation', name: 'Time-Performance Correlation', color: '#F59E0B' }
];

const PerformanceProgressChart = () => {
  const [selectedMetrics, setSelectedMetrics] = useState<Array<keyof Omit<MonthlyDataPoint, 'month'>>>([
    'proficiencyProgress',
    'lessonCompletion',
    'industryBenchmark'
  ]);

  const toggleMetric = (metric: keyof Omit<MonthlyDataPoint, 'month'>) => {
    setSelectedMetrics(prev => 
      prev.includes(metric)
        ? prev.filter(m => m !== metric)
        : [...prev, metric]
    );
  };

  return (
    <Card className="p-6 bg-white shadow-sm border border-gray-100">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Performance Progress Over Time
          </h2>
          <p className="text-sm text-gray-500">
            Track proficiency improvements, completion rates, and engagement metrics
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {dataKeys.map(({ key, name, color }) => (
            <Button
              key={key}
              variant="outline"
              size="sm"
              onClick={() => toggleMetric(key)}
              className={`text-xs border rounded-full px-3 py-1 ${
                selectedMetrics.includes(key)
                  ? 'bg-gray-100 border-gray-300'
                  : 'bg-white border-gray-200 opacity-50'
              }`}
            >
              <span
                className="w-2 h-2 rounded-full mr-2 inline-block"
                style={{ backgroundColor: color }}
              />
              {name}
            </Button>
          ))}
        </div>

        <div className="h-[400px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                dy={10}
                tick={{ fill: '#6B7280', fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                dx={-10}
                tick={{ fill: '#6B7280', fontSize: 12 }}
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  padding: '12px'
                }}
                labelStyle={{ color: '#111827', fontWeight: 600 }}
                formatter={(value: number) => [`${value}%`]}
              />
              <Legend 
                verticalAlign="top"
                height={36}
                iconType="circle"
                iconSize={8}
                formatter={(value) => (
                  <span className="text-sm text-gray-600">{value}</span>
                )}
              />
              {dataKeys
                .filter(({ key }) => selectedMetrics.includes(key))
                .map(({ key, name, color }) => (
                  <Line
                    key={key}
                    type="monotone"
                    dataKey={key}
                    name={name}
                    stroke={color}
                    strokeWidth={2}
                    dot={{ r: 4, fill: color }}
                    activeDot={{ r: 6, fill: color }}
                  />
                ))}
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {selectedMetrics.slice(0, 3).map(metric => {
            const data = monthlyData[monthlyData.length - 1][metric];
            const prevData = monthlyData[monthlyData.length - 2][metric];
            const change = data - prevData;
            const dataKey = dataKeys.find(dk => dk.key === metric);

            return (
              <div key={metric} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: dataKey?.color }}
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {dataKey?.name}
                  </span>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-bold text-gray-900">
                    {data}%
                  </span>
                  <span className={`text-sm ${
                    change >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {change >= 0 ? '+' : ''}{change}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};

export default PerformanceProgressChart;