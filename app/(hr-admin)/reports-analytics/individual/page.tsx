"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, SlidersHorizontal, Download, ArrowUpDown, UserCircle } from 'lucide-react';
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import UserDetail from '../components/UserDetail';

// Define interfaces for type safety
interface LearnerData {
  username: string;
  level: number;
  hoursSpent: number;
  completedLessons: number;
  progression: number;
  email?: string;
  avgPerformance?: number;
  lastActivity?: {
    action: string;
    date: string;
  };
}

interface SortConfig {
  key: keyof LearnerData;
  direction: 'asc' | 'desc';
}

const LearnerDashboard = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<SortConfig>({ 
    key: 'username', 
    direction: 'asc' 
  });
  const [selectedUser, setSelectedUser] = useState<LearnerData | null>(null);
  
  const initialData: LearnerData[] = [
    { 
      username: 'Wan Xiang', 
      level: 2, 
      hoursSpent: 27, 
      completedLessons: 24, 
      progression: 46,
      avgPerformance: 73.5 
    },
    { 
      username: 'Kevin Cheng', 
      level: 1, 
      hoursSpent: 12, 
      completedLessons: 10, 
      progression: 10,
      avgPerformance: 72.5
    },
    { 
      username: 'Michael Li', 
      level: 2, 
      hoursSpent: 31, 
      completedLessons: 29, 
      progression: 50,
      avgPerformance: 83
    },
    { 
      username: 'Jessica Chen', 
      level: 4, 
      hoursSpent: 16, 
      completedLessons: 13, 
      progression: 13,
      avgPerformance: 85
    },
    { 
      username: 'Linda Zhang', 
      level: 3, 
      hoursSpent: 19, 
      completedLessons: 17, 
      progression: 17,
      avgPerformance: 79
    }
  ];

  const [data, setData] = useState<LearnerData[]>(initialData);

  // Reset sidebar when navigating away
  useEffect(() => {
    const handleRouteChange = () => {
      resetSidebar();
    };

    window.addEventListener('popstate', handleRouteChange);
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  const resetSidebar = () => {
    setSelectedUser(null);
    // Dispatch event to reset sidebar in parent layout
    const event = new CustomEvent('updateSidebar', { 
      detail: { component: null, props: null }
    });
    window.dispatchEvent(event);
  };

  const handleCohortView = () => {
    resetSidebar();
    router.push('/reports-analytics/cohort');
  };

  const sortData = (key: keyof LearnerData) => {
    const direction = 
      sortConfig.key === key && sortConfig.direction === 'asc' 
        ? 'desc' 
        : 'asc';
    
    setSortConfig({ key, direction });

    const sortedData = [...data].sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];

      if (aValue === undefined || bValue === undefined) return 0;
      
      if (aValue < bValue) return direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setData(sortedData);
  };

  const filteredData = data.filter(item =>
    item.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getLevelBadgeColor = (level: number): string => {
    const colors: Record<number, string> = {
      1: 'bg-blue-100 text-blue-700',
      2: 'bg-green-100 text-green-700',
      3: 'bg-purple-100 text-purple-700',
      4: 'bg-orange-100 text-orange-700'
    };
    return colors[level] || 'bg-gray-100 text-gray-700';
  };

  const handleRowClick = (user: LearnerData) => {
    setSelectedUser(user);
    // Trigger a custom event to update the parent layout
    const event = new CustomEvent('updateSidebar', { 
      detail: { 
        component: UserDetail,
        props: { 
          user,
          onClose: resetSidebar
        }
      }
    });
    window.dispatchEvent(event);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Learning Management Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">Track your learners' performance and progress</p>
          </div>
          <div className="flex gap-4">
            <Button
              className="text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
              onClick={() => {
                resetSidebar();
                router.push('/reports-analytics/individual');
              }}
            >
              Individual Members
            </Button>
            <Button
              variant="outline"
              onClick={handleCohortView}
              className="text-sm font-medium"
            >
              Cohort
            </Button>
          </div>
        </div>

        <Card className="overflow-hidden bg-white">
          <CardContent className="p-6">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search learners..."
                  className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex gap-3">
                <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                </button>
                <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  <Download className="h-4 w-4" />
                  Export
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {[
                      { key: 'username', label: 'Username' },
                      { key: 'level', label: 'Level' },
                      { key: 'hoursSpent', label: 'Total Hours Spent' },
                      { key: 'completedLessons', label: 'Completed Lessons' },
                      { key: 'progression', label: 'Course Progression' }
                    ].map((column) => (
                      <th
                        key={column.key}
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        <button
                          className="inline-flex items-center gap-1 hover:text-gray-700"
                          onClick={() => sortData(column.key as keyof LearnerData)}
                        >
                          {column.label}
                          <ArrowUpDown className="h-4 w-4" />
                        </button>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredData.map((item, index) => (
                    <tr 
                      key={index} 
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleRowClick(item)}
                    >
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="font-medium text-gray-900">{item.username}</div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getLevelBadgeColor(item.level)}`}>
                          Level {item.level}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-gray-500">
                        {item.hoursSpent} hrs
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-gray-500">
                        {item.completedLessons}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-full rounded-full bg-gray-200">
                            <div
                              className="h-2 rounded-full bg-blue-600 transition-all duration-300"
                              style={{ width: `${item.progression}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600">
                            {item.progression}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LearnerDashboard;