"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  BookOpen, 
  ChevronRight, 
  Clock,
  Star
} from 'lucide-react';

type Course = {
  id: string;
  title: string;
  completion: number;
  averageScore: number;
  lessonsCompleted: number;
  totalLessons: number;
  timeSpent: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
};

// Mock course data
const mockCourses: Course[] = [
  {
    id: 'course-1',
    title: 'Conversational English Fundamentals',
    completion: 85,
    averageScore: 92,
    lessonsCompleted: 17,
    totalLessons: 20,
    timeSpent: '24h 30m',
    difficulty: 'Beginner'
  },
  {
    id: 'course-2',
    title: 'Business Communication Skills',
    completion: 60,
    averageScore: 88,
    lessonsCompleted: 12,
    totalLessons: 20,
    timeSpent: '18h 45m',
    difficulty: 'Intermediate'
  },
  {
    id: 'course-3',
    title: 'Advanced Grammar and Composition',
    completion: 40,
    averageScore: 85,
    lessonsCompleted: 8,
    totalLessons: 20,
    timeSpent: '12h 15m',
    difficulty: 'Advanced'
  }
];

export default function CoursePerformancePage() {
  const router = useRouter();
  const [hoveredCourse, setHoveredCourse] = useState<string | null>(null);

  // Get the appropriate background color based on difficulty
  const getDifficultyColor = (difficulty: Course['difficulty']) => {
    switch (difficulty) {
      case 'Beginner':
        return 'from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100';
      case 'Intermediate':
        return 'from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100';
      case 'Advanced':
        return 'from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100';
      default:
        return 'from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100';
    }
  };

  // Get the appropriate text color based on difficulty (not currently used but left here for reference)
  const getDifficultyTextColor = (difficulty: Course['difficulty']) => {
    switch (difficulty) {
      case 'Beginner':
        return 'text-green-600';
      case 'Intermediate':
        return 'text-blue-600';
      case 'Advanced':
        return 'text-purple-600';
      default:
        return 'text-blue-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="space-y-4 mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Course Performance
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Track your progress and performance across all your enrolled courses
          </p>
        </div>

        {/* Course Cards */}
        <div className="space-y-6">
          {mockCourses.map((course) => (
            <div
              key={course.id}
              onMouseEnter={() => setHoveredCourse(course.id)}
              onMouseLeave={() => setHoveredCourse(null)}
              className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${getDifficultyColor(course.difficulty)}
                p-6 shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1`}
            >
              {/* Course Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="bg-white rounded-full p-3 shadow-sm">
                    <BookOpen className="h-6 w-6 text-gray-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {course.title}
                  </h2>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>{course.timeSpent}</span>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* Completion Progress */}
                <div className="bg-white/80 rounded-xl p-4 backdrop-blur-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Completion</span>
                    <span className="text-sm font-medium text-gray-900">
                      {course.completion}%
                    </span>
                  </div>
                  <div className="relative h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="absolute h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500 ease-out"
                      style={{ width: `${course.completion}%` }}
                    />
                  </div>
                </div>

                {/* Average Score */}
                <div className="bg-white/80 rounded-xl p-4 backdrop-blur-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Average Score</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium text-gray-900">
                        {course.averageScore}%
                      </span>
                    </div>
                  </div>
                  {/* Progress bar with benchmark line */}
                  <div className="relative h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    {/* Filled portion */}
                    <div
                      className="absolute h-full bg-gradient-to-r from-yellow-400 to-orange-400 transition-all duration-500 ease-out"
                      style={{ width: `${course.averageScore}%` }}
                    />
                    {/* Benchmark line at 80% */}
                    <div 
                      className="absolute top-0 bottom-0 left-[80%] border-l-2 border-dashed border-red-500"
                      aria-label="Benchmark line"
                    />
                    <div 
                      className="absolute top-[100%] left-[80%] transform -translate-x-1/2 mt-1 text-xs text-red-500 whitespace-nowrap"
                    >
                      Benchmark: 80%
                    </div>
                  </div>
                </div>

                {/* Lessons Progress */}
                <div className="bg-white/80 rounded-xl p-4 backdrop-blur-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Lessons</span>
                    <span className="text-sm font-medium text-gray-900">
                      {course.lessonsCompleted}/{course.totalLessons} completed
                    </span>
                  </div>
                  <div className="relative h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="absolute h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-500 ease-out"
                      style={{ 
                        width: `${(course.lessonsCompleted / course.totalLessons) * 100}%` 
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex justify-end">
                <button
                  onClick={() =>
                    router.push('/performance/course-lesson-performance')
                  }
                  className="group bg-white text-gray-900 rounded-xl px-6 py-2 font-medium shadow-sm 
                    hover:bg-gray-50 transition-all duration-200 flex items-center gap-2"
                >
                  View Details
                  <ChevronRight
                    className={`h-5 w-5 text-gray-400 transition-transform duration-200
                      ${hoveredCourse === course.id ? 'transform translate-x-1' : ''}`}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
