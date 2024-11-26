"use client";

import React from 'react';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { LucideIcon, TrendingUp, Users, BookOpen, Award, DollarSign } from 'lucide-react';
import ErrorDistributionChart from '@/components/layouts/ErrorDistributionChart';

// TypeScript Interfaces
interface TrendData {
  month: string;
  hours: number;
}

interface UserData {
  username: string;
  level: number;
  hoursSpent: number;
  completedLessons: number;
  progress: string;
}

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  trend: string;
  bgColor: string;
}

// Data Constants
const monthlyTrendData: TrendData[] = [
  { month: 'Jan', hours: 65 },
  { month: 'Feb', hours: 68 },
  { month: 'Mar', hours: 75 },
  { month: 'Apr', hours: 80.6 },
];

const users: UserData[] = [
  { username: "Wan Xiang", level: 2, hoursSpent: 27, completedLessons: 24, progress: "73" },
  { username: "Kevin Cheng", level: 1, hoursSpent: 12, completedLessons: 10, progress: "45" },
  { username: "Michael Li", level: 2, hoursSpent: 31, completedLessons: 29, progress: "89" },
  { username: "Jessica Chen", level: 4, hoursSpent: 16, completedLessons: 13, progress: "65" },
  { username: "Linda Zhang", level: 3, hoursSpent: 19, completedLessons: 17, progress: "78" },
];

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, title, value, trend, bgColor }) => (
  <Card className="p-6 bg-white shadow-sm hover:shadow-md transition-all border border-gray-100">
    <div className="flex items-start justify-between">
      <div className={`p-3 rounded-xl ${bgColor}`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div className="flex items-center gap-1">
        <TrendingUp className="w-4 h-4 text-green-500" />
        <span className="text-sm text-green-500">+{trend}%</span>
      </div>
    </div>
    <h3 className="mt-4 text-sm font-medium text-gray-600">{title}</h3>
    <p className="mt-2 text-2xl font-bold text-gray-900">{value}</p>
  </Card>
);

const DashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Users}
            title="Total Learning Hours"
            value="80.6"
            trend="12"
            bgColor="bg-blue-500"
          />
          <StatCard
            icon={BookOpen}
            title="Completed Lessons"
            value="40.6"
            trend="8"
            bgColor="bg-green-500"
          />
          <StatCard
            icon={Award}
            title="Average Grade"
            value="72.8%"
            trend="5"
            bgColor="bg-yellow-500"
          />
          <StatCard
            icon={DollarSign}
            title="Cost Savings"
            value="$5,735"
            trend="15"
            bgColor="bg-purple-500"
          />
        </div>

        {/* Monthly Trend Chart */}
        <Card className="p-6 mb-8 bg-white shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Learning Hours Trend</h2>
            <select className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm">
              <option>Last 4 months</option>
              <option>Last 6 months</option>
              <option>Last year</option>
            </select>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyTrendData}>
                <XAxis 
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  dy={8}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  dx={-8}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="hours" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  dot={{ r: 4, fill: '#3B82F6' }}
                  activeDot={{ r: 6, fill: '#2563EB' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Student Progress and Error Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Student Progress Table */}
          <Card className="lg:col-span-2 p-6 bg-white shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Student Progress</h2>
              <button className="px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                View All
              </button>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Hours</TableHead>
                    <TableHead>Lessons</TableHead>
                    <TableHead>Progress</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.username} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium">
                            {user.username.charAt(0)}
                          </div>
                          <span className="font-medium">{user.username}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Level {user.level}
                        </span>
                      </TableCell>
                      <TableCell>{user.hoursSpent}h</TableCell>
                      <TableCell>{user.completedLessons}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-500 rounded-full transition-all duration-500"
                              style={{ width: `${user.progress}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600 min-w-[2.5rem]">
                            {user.progress}%
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>

          {/* Error Distribution Chart */}
          <div className="relative">
            <ErrorDistributionChart />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;