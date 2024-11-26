// components/ErrorDistributionChart.tsx
import React from 'react';
import { Card } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const errorDistributionData = [
  { name: 'Level 1', value: 25, color: '#87CEEB' },
  { name: 'Level 2', value: 63, color: '#D7BDE2' },
  { name: 'Level 3', value: 12, color: '#98FB98' },
];

const ErrorDistributionChart: React.FC = () => (
  <Card className="p-6 bg-white shadow-sm border border-gray-100">
    <h2 className="text-lg font-semibold mb-6">Staff Business English Levels</h2>
    <div className="h-[260px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={errorDistributionData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            dataKey="value"
            label={({ value }) => `${value}%`}
            labelLine={false}
          >
            {errorDistributionData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
    <div className="flex flex-wrap justify-center gap-4 mt-4 px-2">
      {errorDistributionData.map((item) => (
        <div key={item.name} className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-full flex-shrink-0" 
            style={{ backgroundColor: item.color }} 
          />
          <span className="text-sm text-gray-600 whitespace-nowrap">{item.name}</span>
        </div>
      ))}
    </div>
  </Card>
);

export default ErrorDistributionChart;