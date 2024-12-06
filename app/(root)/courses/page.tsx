"use client";

import React from 'react'
import { useRouter } from 'next/navigation'
import { Book, Clock, ChevronRight } from 'lucide-react'
import DashboardLayout from '../../../components/layouts/DashboardLayout'

const CoursesPage = () => {
  const router = useRouter()

  // Mock courses data
  const courses = [
    {
      id: 1,
      unit: "Unit 1",
      title: "Business Communication Skills",
      description: "Master essential business communication techniques for professional success",
      lessons: 4,
      duration: "6 weeks"
    },
    {
      id: 2,
      unit: "Unit 2",
      title: "Business Meetings",
      description: "Learn to conduct and participate in effective business meetings",
      lessons: 4,
      duration: "4 weeks"
    },
    {
      id: 3,
      unit: "Unit 3",
      title: "Business Presentations",
      description: "Develop compelling presentation skills for business contexts",
      lessons: 4,
      duration: "5 weeks"
    }
  ]

  const handleViewCourse = (courseId: number) => {
    router.push(`/modules?courseId=${courseId}`)
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-semibold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Available Courses
          </h2>
          <div className="flex items-center gap-2 bg-blue-50 text-blue-600 rounded-lg px-4 py-2 font-medium">
            {courses.length} Courses Available
          </div>
        </div>

        <div className="space-y-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl border shadow-sm p-6 transform transition-all duration-300 hover:shadow-md hover:scale-[1.01]"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-gray-500 mb-1">
                      {course.unit}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{course.title}</h3>
                  </div>
                  
                  <p className="text-gray-600">{course.description}</p>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      <span className="text-sm text-gray-500">{course.lessons} Lessons</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-violet-500"></div>
                      <span className="text-sm text-gray-500">{course.duration}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleViewCourse(course.id)}
                  className="text-blue-600 hover:bg-blue-50 px-6 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
                >
                  View Course
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default CoursesPage