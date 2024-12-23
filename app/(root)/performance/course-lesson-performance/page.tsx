"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ArrowUp, ChevronRight, BarChart2, Book, Trophy } from 'lucide-react';

interface Lesson {
  name: string;
  repeats: number;
  performance: number;
  improvement?: number;
  lastPracticed?: string;
}

const LessonPerformancePage = () => {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('all');
  
  const lessons: Lesson[] = [
    { 
      name: "Business Meeting Etiquette", 
      repeats: 2, 
      performance: 77.8, 
      improvement: 10,
      lastPracticed: "2 days ago"
    },
    { 
      name: "Professional Email Writing", 
      repeats: 1, 
      performance: 75.3,
      lastPracticed: "1 week ago"
    },
    { 
      name: "Client Presentations", 
      repeats: 3, 
      performance: 82.0, 
      improvement: 20,
      lastPracticed: "3 days ago"
    },
    { 
      name: "Negotiation Skills", 
      repeats: 1, 
      performance: 72.5,
      lastPracticed: "2 weeks ago"
    }
  ];

  const filters = [
    { id: 'all', label: 'All Lessons' },
    { id: 'completed', label: 'Completed' },
    { id: 'in-progress', label: 'In Progress' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section with gradient background */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex items-center gap-2 text-blue-100">
            <span>Courses</span>
            <ChevronRight className="h-4 w-4" />
            <span>Course Name Lesson</span>
          </div>
          <h1 className="text-3xl font-bold">Performance Analytics</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-6">
        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Trophy className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Average Performance</p>
                  <p className="text-2xl font-bold text-gray-900">76.9%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-50 rounded-lg">
                  <BarChart2 className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Practices</p>
                  <p className="text-2xl font-bold text-gray-900">7</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-50 rounded-lg">
                  <Book className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Lessons Completed</p>
                  <p className="text-2xl font-bold text-gray-900">2/4</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Unit Title with container */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Business Communication Skills</h2>
          <div className="flex gap-2">
            {filters.map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  activeFilter === filter.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Enhanced Performance Card */}
        <Card className="shadow-sm bg-white mb-8">
          <CardHeader className="border-b bg-gray-50 p-4">
            <div className="grid grid-cols-12 w-full text-sm text-gray-600">
              {/* Adjusted column spans: removed "Repeats" column and renamed "Best Performance" to "Average Performance" */}
              <div className="col-span-4 font-medium">Lessons</div>
              <div className="col-span-4 font-medium">Average Performance</div>
              <div className="col-span-4 font-medium">Last Practiced</div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {lessons.map((lesson, index) => (
                <div 
                  key={index}
                  className="grid grid-cols-12 p-4 hover:bg-blue-50 transition-colors items-center cursor-pointer"
                >
                  {/* Lesson Name */}
                  <div className="col-span-4 text-gray-900 font-medium">
                    {lesson.name}
                  </div>

                  {/* Average Performance */}
                  <div className="col-span-4">
                    <div className="flex items-center gap-2">
                      <div
                        className={`text-white px-3 py-1 rounded-full text-sm ${
                          lesson.performance >= 80
                            ? 'bg-green-500'
                            : lesson.performance >= 70
                            ? 'bg-blue-500'
                            : 'bg-orange-500'
                        }`}
                      >
                        {lesson.performance.toFixed(1)}%
                      </div>
                      {lesson.improvement && (
                        <div className="flex items-center text-green-600 text-sm">
                          <ArrowUp className="h-4 w-4" />
                          {lesson.improvement}%
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Last Practiced */}
                  <div className="col-span-4 text-gray-600 text-sm">
                    {lesson.lastPracticed}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LessonPerformancePage;
