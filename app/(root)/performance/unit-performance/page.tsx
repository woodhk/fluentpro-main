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

// Pastel backgrounds for each difficulty level
function getPastelBackground(difficulty?: string) {
  switch (difficulty) {
    case 'Beginner':
      return 'bg-green-50';
    case 'Intermediate':
      return 'bg-blue-50';
    case 'Advanced':
      return 'bg-purple-50';
    default:
      return 'bg-gray-50';
  }
}

export default function CoursePerformancePage() {
  const router = useRouter();
  const [hoveredCourse, setHoveredCourse] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title + Subtitle */}
        <div className="space-y-2 mb-6">
          <h2 className="text-3xl font-bold text-gray-900">
            Learning Path Performance
          </h2>
          <p className="text-lg text-gray-500 max-w-3xl">
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
              className={`${getPastelBackground(course.difficulty)} 
                relative rounded-lg p-6 shadow-md transition-shadow 
                hover:shadow-lg`}
            >
              {/* Top row: Icon, Course title, Time */}
              <div className="flex items-start justify-between mb-4">
                {/* Icon + Title */}
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-full shadow-sm">
                    <BookOpen className="h-6 w-6 text-gray-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {course.title}
                  </h3>
                </div>
                {/* Time spent */}
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>{course.timeSpent}</span>
                </div>
              </div>

              {/* Middle row: Completion, Average Score, Lessons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Completion */}
                <div className="bg-white rounded-md p-4 flex flex-col shadow-sm">
                  <span className="text-sm text-gray-600 mb-1">
                    Completion
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {course.completion}%
                  </span>
                  <div className="relative mt-2 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="absolute h-full bg-blue-500 transition-all duration-500 ease-out"
                      style={{ width: `${course.completion}%` }}
                    />
                  </div>
                </div>

                {/* Average Score */}
                <div className="bg-white rounded-md p-4 flex flex-col shadow-sm">
                  <span className="text-sm text-gray-600 mb-1">
                    Average Score
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-900">
                      {course.averageScore}%
                    </span>
                  </div>
                  <div className="relative mt-2 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="absolute h-full bg-gradient-to-r from-yellow-400 to-orange-400 transition-all duration-500 ease-out"
                      style={{ width: `${course.averageScore}%` }}
                    />
                  </div>
                </div>

                {/* Lessons */}
                <div className="bg-white rounded-md p-4 flex flex-col shadow-sm">
                  <span className="text-sm text-gray-600 mb-1">
                    Lessons
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {course.lessonsCompleted}/{course.totalLessons} completed
                  </span>
                  <div className="relative mt-2 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="absolute h-full bg-green-500 transition-all duration-500 ease-out"
                      style={{
                        width: `${
                          (course.lessonsCompleted / course.totalLessons) * 100
                        }%`
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Bottom row: View details button */}
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() =>
                    router.push('/performance/lesson-performance')
                  }
                  className="flex items-center gap-2 bg-white px-4 py-2 rounded-md text-gray-600 
                    font-medium shadow-sm hover:bg-gray-50 transition-colors"
                >
                  View Details
                  <ChevronRight
                    className={`h-5 w-5 text-gray-400 transition-transform 
                      duration-200 ${hoveredCourse === course.id ? 'translate-x-1' : ''}`}
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
