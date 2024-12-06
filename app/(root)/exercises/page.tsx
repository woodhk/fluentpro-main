"use client";

import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Book, Clock, PlayCircle, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import DashboardLayout from '../../../components/layouts/DashboardLayout'

interface SubSection {
  id: string
  title: string
  isCompleted: boolean
}

interface Exercise {
  id: string
  title: string
  duration: string
  isCompleted: boolean
  icon: React.ReactNode
  hasSubSections?: boolean
  subSections?: SubSection[]
  progress?: number
}

const ExercisesPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const moduleId = searchParams.get('moduleId')
  const moduleTitle = searchParams.get('title') || "Module Title"
  const [expandedCard, setExpandedCard] = useState<string | null>(null)

  // Mock completion status
  const completedExercises = ['scenario']
  const completedSubSections = ['intro', 'section1']

  const exercises: Exercise[] = [
    {
      id: 'scenario',
      title: 'Scenario Understanding',
      duration: '2min',
      isCompleted: completedExercises.includes('scenario'),
      icon: <Book className="h-6 w-6 text-purple-600" />
    },
    {
      id: 'key-languages',
      title: 'Key Languages',
      duration: '10min',
      isCompleted: false,
      progress: 50, // This would be calculated based on completed subsections
      icon: <MessageCircle className="h-6 w-6 text-emerald-600" />,
      hasSubSections: true,
      subSections: [
        { 
          id: 'intro',
          title: 'Introduction',
          isCompleted: completedSubSections.includes('intro')
        },
        { 
          id: 'section1',
          title: 'Section 1',
          isCompleted: completedSubSections.includes('section1')
        },
        { 
          id: 'section2',
          title: 'Section 2',
          isCompleted: completedSubSections.includes('section2')
        },
        { 
          id: 'section3',
          title: 'Section 3',
          isCompleted: completedSubSections.includes('section3')
        }
      ]
    },
    {
      id: 'roleplay',
      title: 'Role-Play Simulation',
      duration: '10min',
      isCompleted: completedExercises.includes('roleplay'),
      icon: <PlayCircle className="h-6 w-6 text-rose-600" />
    }
  ]

  // Calculate overall progress
  const progress = (completedExercises.length / exercises.length) * 100

  const toggleExpand = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id)
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-start gap-6 mb-8">
          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
            <Book className="h-6 w-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <div className="text-sm text-gray-500 mb-1">Module {moduleId}</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">{moduleTitle}</h1>
            
            <div className="space-y-2">
              <div className="text-sm text-gray-500">Overall Progress</div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="text-right text-sm font-medium text-blue-600">{Math.round(progress)}%</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {exercises.map((exercise) => (
            <div key={exercise.id} className="space-y-2">
              <div className="bg-white rounded-xl border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl ${
                      exercise.id === 'scenario' ? 'bg-purple-50' :
                      exercise.id === 'key-languages' ? 'bg-emerald-50' :
                      'bg-rose-50'
                    } flex items-center justify-center`}>
                      {exercise.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{exercise.title}</h3>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-500">{exercise.duration}</span>
                      </div>
                      {exercise.hasSubSections && (
                        <div className="mt-2 w-48">
                          <div className="w-full bg-gray-100 rounded-full h-1.5">
                            <div 
                              className="bg-emerald-600 h-1.5 rounded-full transition-all duration-300"
                              style={{ width: `${exercise.progress}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {exercise.isCompleted && (
                      <span className="text-sm text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                        Completed
                      </span>
                    )}
                    {exercise.hasSubSections ? (
                      <Button
                        variant="ghost"
                        className="ml-4"
                        onClick={() => toggleExpand(exercise.id)}
                      >
                        {expandedCard === exercise.id ? 
                          <ChevronUp className="h-5 w-5 text-gray-600" /> : 
                          <ChevronDown className="h-5 w-5 text-gray-600" />
                        }
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        className={`font-medium rounded-lg ${
                          !exercise.isCompleted
                            ? 'bg-rose-50 text-rose-600 hover:bg-rose-100'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                        onClick={() => router.push(`/exercise/${exercise.id}`)}
                      >
                        {exercise.isCompleted ? 'Review' : 'Start'} →
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Expanded subsections */}
              {exercise.hasSubSections && expandedCard === exercise.id && (
                <div className="pl-16 space-y-2">
                  {exercise.subSections?.map((section) => (
                    <div 
                      key={section.id}
                      className="bg-white rounded-lg border p-4 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <h4 className="font-medium text-gray-900">{section.title}</h4>
                      </div>
                      <div className="flex items-center gap-3">
                        {section.isCompleted && (
                          <span className="text-sm text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                            Completed
                          </span>
                        )}
                        <Button
                          variant="ghost"
                          className={`font-medium rounded-lg ${
                            !section.isCompleted
                              ? 'bg-rose-50 text-rose-600 hover:bg-rose-100'
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                          onClick={() => router.push(`/exercise/${exercise.id}/${section.id}`)}
                        >
                          {section.isCompleted ? 'Review' : 'Start'} →
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default ExercisesPage