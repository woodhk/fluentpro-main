import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define types for the chart data
type PerformanceDataItem = {
  name: string;
  value: number;
  color: string;
};

type PerformanceLevel = "1" | "2" | "3";

type PerformanceData = {
  [K in PerformanceLevel]: PerformanceDataItem[];
};

const PerformanceChart = () => {
  const [selectedLevel, setSelectedLevel] = useState<PerformanceLevel>("1");

  // Performance data for each level
  const performanceData: PerformanceData = {
    "1": [
      { name: 'Marketing', value: 70, color: '#AFCBFF' },
      { name: 'Sales', value: 80, color: '#C5A3FF' },
      { name: 'Finance', value: 56, color: '#A9E5BB' },
      { name: 'Engineering', value: 48, color: '#E5E5E5' }
    ],
    "2": [
      { name: 'Marketing', value: 65, color: '#AFCBFF' },
      { name: 'Sales', value: 75, color: '#C5A3FF' },
      { name: 'Finance', value: 62, color: '#A9E5BB' },
      { name: 'Engineering', value: 55, color: '#E5E5E5' }
    ],
    "3": [
      { name: 'Marketing', value: 55, color: '#AFCBFF' },
      { name: 'Sales', value: 68, color: '#C5A3FF' },
      { name: 'Finance', value: 45, color: '#A9E5BB' },
      { name: 'Engineering', value: 42, color: '#E5E5E5' }
    ]
  };

  const renderPieChart = (data: PerformanceDataItem[]) => (
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
            formatter={(value: number) => [`${value}%`, 'Performance']}
          />
          <Legend 
            layout="horizontal"
            align="center"
            verticalAlign="bottom"
            formatter={(value: string) => (
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
    <Card className="p-6 bg-white shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Average Performance by Field</h3>
        <Select
          value={selectedLevel}
          onValueChange={(value: PerformanceLevel) => setSelectedLevel(value)}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Select Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Level 1</SelectItem>
            <SelectItem value="2">Level 2</SelectItem>
            <SelectItem value="3">Level 3</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {renderPieChart(performanceData[selectedLevel])}
    </Card>
  );
};

export default PerformanceChart;