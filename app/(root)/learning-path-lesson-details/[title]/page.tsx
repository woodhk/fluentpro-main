"use client";

import React, { use, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { 
  Lock, 
  ChevronLeft, 
  Clock, 
  CheckCircle, 
  ChevronRight,
  BookOpen,
  PlayCircle,
  MessageCircle,
  Gamepad2
} from 'lucide-react'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import { lessons } from '@/app/data/lessons'
import { getCompletedSections, isSectionUnlocked } from '@/app/utils/progress'
import type { Lesson, Section } from '@/app/types'

interface PageProps {
  params: Promise<{
    title: string
  }>
}

interface Style {
  icon: React.ComponentType<any>,
  colors: {
    bg: string,
    iconBg: string,
    text: string,
    button: string,
    progress: string
  }
}

const LearningPathLessonDetails = ({ params }: PageProps) => {
  const router = useRouter()
  const { title } = use(params)
  const [completedSections, setCompletedSections] = useState<string[]>([])

  const normalizeTitle = (slug: string): string => {
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  const normalizedTitle = normalizeTitle(title)
  const lessonDetails = lessons.find(lesson => 
    lesson.title.toLowerCase() === normalizedTitle.toLowerCase()
  )

  const lessonSlug = title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')

  useEffect(() => {
    setCompletedSections(getCompletedSections(lessonSlug))
  }, [lessonSlug])

  if (!lessonDetails) {
    router.push('/learning-path-lesson')
    return null
  }

  const getSectionStyle = (title: string, isUnlocked: boolean) => {
    const styles: Record<string, Style> = {
      'scenario understanding': {
        icon: BookOpen,
        colors: { bg: 'bg-purple-50', iconBg: 'bg-purple-100', text: 'text-purple-600', button: 'bg-purple-50 text-purple-900 hover:bg-purple-100', progress: 'from-purple-600 to-purple-400' }
      },
      'lesson vocabulary pt.1': {
        icon: PlayCircle,
        colors: { bg: 'bg-emerald-50', iconBg: 'bg-emerald-100', text: 'text-emerald-600', button: 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100', progress: 'from-emerald-600 to-emerald-400' }
      },
      'lesson vocabulary pt.2': {
        icon: MessageCircle,
        colors: { bg: 'bg-amber-50', iconBg: 'bg-amber-100', text: 'text-amber-600', button: 'bg-amber-50 text-amber-900 hover:bg-amber-100', progress: 'from-amber-600 to-amber-400' }
      },
      'role-play simulation': {
        icon: Gamepad2,
        colors: { bg: 'bg-rose-50', iconBg: 'bg-rose-100', text: 'text-rose-600', button: 'bg-rose-50 text-rose-900 hover:bg-rose-100', progress: 'from-rose-600 to-rose-400' }
      }
    }

    const defaultStyle: Style = {
      icon: BookOpen,
      colors: { bg: 'bg-indigo-50', iconBg: 'bg-indigo-100', text: 'text-indigo-600', button: 'bg-indigo-50 text-indigo-900 hover:bg-indigo-100', progress: 'from-indigo-600 to-indigo-400' }
    }

    return styles[title.toLowerCase()] || defaultStyle
  }

  const handleStartClick = (section: Section, index: number) => {
    if (!isSectionUnlocked(lessonSlug, index, lessonDetails.sections)) return
    
    switch (section.title.toLowerCase()) {
      case 'scenario understanding':
        router.push(`/lesson-practice/scenario-understanding?lesson=${lessonSlug}`)
        break
      case 'lesson vocabulary pt.1':
        router.push(`/lesson-practice/key-vocabulary-pt1/introduction?lesson=${lessonSlug}`)
        break
      case 'lesson vocabulary pt.2':
        router.push(`/lesson-practice/key-vocabulary-pt2/introduction?lesson=${lessonSlug}`)
        break
      case 'role-play simulation':
        router.push(`/lesson-practice/role-play-simulation/introduction?lesson=${lessonSlug}`)
        break
      default:
        console.log(`Starting section: ${section.title}`)
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        {/* Enhanced Breadcrumb Navigation */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/learning-path')}
              className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="text-lg font-medium">Back to Units</span>
            </button>
          </div>

          {/* Progress Overview */}
          <div className="flex items-center gap-2 bg-violet-50 rounded-lg px-4 py-2">
            <CheckCircle className="h-5 w-5 text-violet-600" />
            <span className="text-violet-700 font-medium">
              {completedSections.length}/{lessonDetails.sections.length} Completed
            </span>
          </div>
        </div>

        {/* Enhanced Lesson Header */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center">
              <BookOpen className="h-8 w-8 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-indigo-600 mb-1">
                Lesson {lessonDetails.number}
              </h3>
              <h2 className="text-3xl font-bold text-gray-900">
                {lessonDetails.title}
              </h2>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Overall Progress</span>
              <span className="text-sm font-medium text-indigo-600">
                {Math.round((completedSections.length / lessonDetails.sections.length) * 100)}%
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-indigo-600 to-indigo-400 rounded-full transition-all duration-500"
                style={{ width: `${(completedSections.length / lessonDetails.sections.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Enhanced Sections */}
        <div className="space-y-4">
          {lessonDetails.sections.map((section, index) => {
            const isUnlocked = isSectionUnlocked(lessonSlug, index, lessonDetails.sections)
            const isCompleted = completedSections.includes(section.title)
            const style = getSectionStyle(section.title, isUnlocked)
            const SectionIcon = style.icon

            return (
              <div
                key={index}
                className={`bg-white rounded-xl border shadow-sm p-6 transform transition-all duration-300 ${
                  isUnlocked ? 'hover:shadow-md hover:scale-[1.01]' : 'opacity-75'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                      isUnlocked 
                        ? style.colors.iconBg
                        : 'bg-gray-100'
                    }`}>
                      {isUnlocked ? (
                        <SectionIcon className={`h-6 w-6 ${style.colors.text}`} />
                      ) : (
                        <Lock className="h-6 w-6 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-bold text-gray-900">
                          {section.title}
                        </h3>
                        {isCompleted && (
                          <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-sm font-medium rounded-full">
                            Completed
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-500">{section.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="default"
                    className={`h-12 px-6 rounded-xl transform transition-all duration-300 ${
                      isUnlocked 
                        ? style.colors.button
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                    disabled={!isUnlocked}
                    onClick={() => handleStartClick(section, index)}
                  >
                    <span className="mr-2">{isCompleted ? 'Review' : 'Start'}</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default LearningPathLessonDetails