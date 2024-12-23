"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DashboardLayout from '../../../components/layouts/DashboardLayout';

interface Lesson {
  id: number;
  title: string;
  description: string;
  lessons: number;
}

type CourseLessons = {
  [key: number]: Lesson[];
};

const courseLessons: CourseLessons = {
  1: [
    {
      id: 1,
      title: 'Lesson Name 1',
      description: 'Learn to write clear and effective professional emails',
      lessons: 3,
    },
    {
      id: 2,
      title: 'Lesson Name 2',
      description: 'Master the basics of business documentation and reports',
      lessons: 4,
    },
    {
      id: 3,
      title: 'Lesson Name 3',
      description: 'Understanding professional communication protocols',
      lessons: 3,
    },
  ],
  2: [
    {
      id: 1,
      title: 'Meeting Preparation',
      description: 'Learn how to effectively prepare for business meetings',
      lessons: 2,
    },
    {
      id: 2,
      title: 'Meeting Facilitation',
      description: 'Techniques for running productive meetings',
      lessons: 3,
    },
    {
      id: 3,
      title: 'Virtual Meeting Management',
      description: 'Best practices for online business meetings',
      lessons: 3,
    },
  ],
  3: [
    {
      id: 1,
      title: 'Presentation Structure',
      description: 'Learn to organize compelling business presentations',
      lessons: 3,
    },
    {
      id: 2,
      title: 'Visual Design Elements',
      description: 'Creating effective slides and visual aids',
      lessons: 4,
    },
    {
      id: 3,
      title: 'Delivery Techniques',
      description: 'Master professional presentation delivery',
      lessons: 4,
    },
  ],
};

const courseTitles: { [key: number]: string } = {
  1: 'Course 1',
  2: 'Course 2',
  3: 'Course 3',
};

const LessonsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseId = Number(searchParams.get('courseId')) || 1;
  const [lessonsData, setLessonsData] = useState<Lesson[]>([]);
  const [courseTitle, setCourseTitle] = useState('');

  useEffect(() => {
    setLessonsData(courseLessons[courseId] || []);
    setCourseTitle(courseTitles[courseId] || '');
  }, [courseId]);

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            className="text-gray-600 hover:text-gray-900"
            onClick={() => router.push('/courses')}
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Courses
          </Button>
        </div>

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-semibold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            {courseTitle} - Lessons
          </h2>
          <div className="flex items-center gap-2 bg-blue-50 text-blue-600 rounded-lg px-4 py-2 font-medium">
            {lessonsData.length} Lessons Available
          </div>
        </div>

        <div className="space-y-6">
          {lessonsData.map((lesson, index) => (
            <div
              key={lesson.id}
              className="bg-white rounded-xl border shadow-sm p-6 transform transition-all duration-300 hover:shadow-md hover:scale-[1.01]"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-gray-500 mb-1">
                      Lesson {index + 1}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {lesson.title}
                    </h3>
                  </div>
                  <p className="text-gray-600">{lesson.description}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      <span className="text-sm text-gray-500">
                        {lesson.lessons} Lessons
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() =>
                    router.push(
                      `/exercises?lessonId=${lesson.id}&courseId=${courseId}&title=${encodeURIComponent(
                        lesson.title
                      )}`
                    )
                  }
                  className="text-blue-600 hover:bg-blue-50 px-6 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
                >
                  Start Lesson
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LessonsPage;
