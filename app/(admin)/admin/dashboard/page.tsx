"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { ArrowUpRight, Users, Clock, Star, AlertCircle, PlusCircle, BarChart3, Activity, ChevronRight } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
  subtitle: string;
  gradient?: string;
}

interface PerformanceData {
  date: string;
  users: number;
  engagement: number;
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  icon, 
  trend, 
  subtitle,
  gradient = "from-blue-50 to-indigo-50" 
}) => (
  <Card className={`overflow-hidden relative`}>
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-50`} />
    <CardContent className="pt-6 relative">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
        <div className="p-2 rounded-lg bg-white/80 shadow-sm">
          {icon}
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <div className="flex items-center text-green-600">
          <ArrowUpRight className="h-4 w-4" />
          <span className="text-sm font-medium">{trend}</span>
        </div>
        <span className="text-sm text-gray-500">{subtitle}</span>
      </div>
    </CardContent>
  </Card>
);

const DashboardOverview: React.FC = () => {
  const performanceData: PerformanceData[] = [
    { date: 'Week 1', users: 65, engagement: 75 },
    { date: 'Week 2', users: 72, engagement: 82 },
    { date: 'Week 3', users: 80, engagement: 78 },
    { date: 'Week 4', users: 85, engagement: 88 },
  ];

  return (
    <div className="p-8 space-y-8 bg-gray-50/50 min-h-screen">
      {/* Floating Header */}
      <div className="sticky top-0 z-50 backdrop-blur-md bg-white/70 -mx-8 px-8 py-4 border-b">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-500">Last updated: November 13, 2024</p>
          </div>
          <div className="flex gap-4">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 shadow-sm">
              Export Data
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 shadow-sm flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Add New User
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        {/* Stats Grid with Overlapping Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 -mt-4">
          <div className="lg:col-span-2">
            <Card className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white overflow-hidden">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-lg font-medium text-blue-100">Total Platform Usage</h3>
                    <p className="text-3xl font-bold mt-2">138 Active Users</p>
                  </div>
                  <BarChart3 className="h-6 w-6 text-blue-100" />
                </div>
                <div className="h-[120px] -mb-6 -mx-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={performanceData}>
                      <defs>
                        <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#fff" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#fff" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Area 
                        type="monotone" 
                        dataKey="users" 
                        stroke="#fff" 
                        fillOpacity={1}
                        fill="url(#colorUsers)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <StatsCard
              title="HR Users"
              value="8"
              icon={<Users className="h-5 w-5 text-blue-600" />}
              trend="+12.5%"
              subtitle="From last month"
              gradient="from-blue-50 to-sky-50"
            />
            <StatsCard
              title="Staff Users"
              value="102"
              icon={<Users className="h-5 w-5 text-emerald-600" />}
              trend="+5.2%"
              subtitle="From last month"
              gradient="from-emerald-50 to-teal-50"
            />
          </div>
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Engagement Metrics</CardTitle>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <button className="hover:text-blue-600">Weekly</button>
                <span>•</span>
                <button className="hover:text-blue-600">Monthly</button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ 
                        background: 'rgba(255, 255, 255, 0.9)',
                        border: 'none',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="users" 
                      stroke="#2563eb" 
                      strokeWidth={2}
                      dot={{ strokeWidth: 2 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="engagement" 
                      stroke="#16a34a" 
                      strokeWidth={2}
                      dot={{ strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <Clock className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Avg. Time</p>
                    <p className="text-xl font-semibold">20min 20s</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <Star className="h-8 w-8 text-yellow-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Rating</p>
                    <p className="text-xl font-semibold">8/10</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <Activity className="h-8 w-8 text-emerald-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Completion</p>
                    <p className="text-xl font-semibold">93%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Lesson too long', 'Skip button not working', 'Token shortage'].map((issue, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                      <div className="flex items-center gap-3">
                        <AlertCircle className="h-5 w-5 text-orange-500" />
                        <span className="text-sm font-medium text-gray-700">{issue}</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;