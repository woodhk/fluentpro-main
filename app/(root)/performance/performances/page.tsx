"use client";

import { useRouter } from 'next/navigation';
import { BarChart3, BookOpen, GraduationCap, ArrowRight } from 'lucide-react';

export default function PerformancePage() {
  const router = useRouter();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-8">
        {/* Header Section */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Performance
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Track your learning progress and performance metrics across different areas of study
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Courses Card */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="flex items-center justify-between mb-6">
              <div className="bg-white rounded-full p-3 shadow-sm">
                <BookOpen className="h-6 w-6 text-indigo-500" />
              </div>
              <BarChart3 className="h-5 w-5 text-gray-400" />
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Courses
                </h2>
                <p className="text-gray-600">
                  Track your progress and performance across individual courses
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium text-gray-900">
                    12/15 completed
                  </span>
                </div>
                <div className="relative h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="absolute h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500 ease-out"
                    style={{ width: "80%" }}
                  />
                </div>
              </div>

              <button
                onClick={() => router.push("/performance/course-performance")}
                className="group w-full bg-white text-gray-900 rounded-xl px-4 py-3 font-medium shadow-sm hover:bg-gray-50 transition-all duration-200 flex items-center justify-between"
              >
                View Results
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
              </button>
            </div>
          </div>

          {/* Learning Path Card */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="flex items-center justify-between mb-6">
              <div className="bg-white rounded-full p-3 shadow-sm">
                <GraduationCap className="h-6 w-6 text-blue-500" />
              </div>
              <BarChart3 className="h-5 w-5 text-gray-400" />
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Learning Path
                </h2>
                <p className="text-gray-600">
                  Monitor your advancement through structured learning paths
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium text-gray-900">
                    3/5 completed
                  </span>
                </div>
                <div className="relative h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="absolute h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500 ease-out"
                    style={{ width: "60%" }}
                  />
                </div>
              </div>

              <button
                onClick={() => router.push("/performance/unit-performance")}
                className="group w-full bg-white text-gray-900 rounded-xl px-4 py-3 font-medium shadow-sm hover:bg-gray-50 transition-all duration-200 flex items-center justify-between"
              >
                View Results
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}