"use client";

import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ChevronRight, BookOpen, Clock, ChevronLeft, BarChart, BeakerIcon, Lightbulb, MessagesSquare } from 'lucide-react'
import DashboardLayout from '../../../components/layouts/DashboardLayout'
import { lessons } from '@/app/data/lessons'
import type { Lesson } from '@/app/types'

const LearningPathLesson = () => {
  const router = useRouter()

  // Define lesson type colors and icons
  const getLessonStyle = (index: number) => {
    const styles = [
      { icon: BookOpen, colors: { bg: 'bg-purple-50', iconBg: 'bg-purple-100', text: 'text-purple-600', hover: 'hover:bg-purple-700', gradient: 'from-purple-600 to-purple-400' } },
      { icon: Lightbulb, colors: { bg: 'bg-emerald-50', iconBg: 'bg-emerald-100', text: 'text-emerald-600', hover: 'hover:bg-emerald-700', gradient: 'from-emerald-600 to-emerald-400' } },
      { icon: BeakerIcon, colors: { bg: 'bg-amber-50', iconBg: 'bg-amber-100', text: 'text-amber-600', hover: 'hover:bg-amber-700', gradient: 'from-amber-600 to-amber-400' } },
      { icon: MessagesSquare, colors: { bg: 'bg-rose-50', iconBg: 'bg-rose-100', text: 'text-rose-600', hover: 'hover:bg-rose-700', gradient: 'from-rose-600 to-rose-400' } }
    ]
    return styles[index % styles.length]
  }

  const handleLearnClick = (lesson: Lesson) => {
    const slugifiedTitle = lesson.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
    
    router.push(`/learning-path-lesson-details/${slugifiedTitle}`)
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        {/* Enhanced Breadcrumb Navigation */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/learning-path')}
              className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 font-medium transition-colors duration-200"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="text-2xl">Units</span>
            </button>
            <span className="text-gray-400 text-2xl">/</span>
            <span className="text-2xl font-semibold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Unit 1 Lessons
            </span>
          </div>

          {/* Progress Overview */}
          <div className="flex items-center gap-2 bg-emerald-50 rounded-lg px-4 py-2">
            <BarChart className="h-5 w-5 text-emerald-600" />
            <span className="text-emerald-700 font-medium">2/6 Completed</span>
          </div>
        </div>

        <div className="space-y-6">
          {lessons.map((lesson, index) => {
            const style = getLessonStyle(index)
            const LessonIcon = style.icon

            return (
              <div
                key={lesson.number}
                className="bg-white rounded-xl border shadow-sm p-6 transform transition-all duration-300 hover:shadow-md hover:scale-[1.01]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    {/* Lesson Icon */}
                    <div className={`w-14 h-14 rounded-xl ${style.colors.iconBg} flex items-center justify-center`}>
                      <LessonIcon className={`h-6 w-6 ${style.colors.text}`} />
                    </div>

                    <div>
                      <div className="text-sm font-medium text-gray-500 mb-1">
                        Lesson {lesson.number}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {lesson.title}
                      </h3>

                      {/* Lesson Metadata */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-500">15 mins</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-violet-500"></div>
                          <span className="text-sm text-gray-500">4 Activities</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button
                    className={`h-12 px-6 rounded-xl ${style.colors.bg} text-gray-800 shadow-sm hover:shadow transform transition-all duration-300 hover:scale-[1.02]`}
                    onClick={() => handleLearnClick(lesson)}
                  >
                    <span className="mr-2">Start Learning</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                {/* Progress Bar */}
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">Progress</span>
                    <span className={`text-sm font-medium ${style.colors.text}`}>
                      {index === 0 ? '100%' : index === 1 ? '60%' : '0%'}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${style.colors.gradient} rounded-full transition-all duration-500`}
                      style={{ 
                        width: index === 0 ? '100%' : index === 1 ? '60%' : '0%'
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default LearningPathLesson