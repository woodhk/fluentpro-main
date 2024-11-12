"use client";

import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Lock, Unlock, ChevronRight, Trophy } from 'lucide-react'
import DashboardLayout from '../../../components/layouts/DashboardLayout'
import { units } from '@/app/data/units'
import type { Unit } from '@/app/types'

const LearningPath = () => {
  const router = useRouter()

  const getUnitColors = (index: number) => {
    // Rotating color schemes for different units
    const schemes = [
      { bg: 'bg-blue-50', icon: 'bg-blue-100 text-blue-600', progress: 'from-blue-600 to-blue-400' },
      { bg: 'bg-purple-50', icon: 'bg-purple-100 text-purple-600', progress: 'from-purple-600 to-purple-400' },
      { bg: 'bg-emerald-50', icon: 'bg-emerald-100 text-emerald-600', progress: 'from-emerald-600 to-emerald-400' },
      { bg: 'bg-amber-50', icon: 'bg-amber-100 text-amber-600', progress: 'from-amber-600 to-amber-400' }
    ]
    return schemes[index % schemes.length]
  }

  const handleContinueClick = (unit: Unit) => {
    if (unit.isUnlocked) {
      router.push('/learning-path-lesson')
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-semibold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Your Learning Journey
          </h2>
          <div className="flex items-center gap-2 bg-amber-50 rounded-lg px-4 py-2">
            <Trophy className="h-5 w-5 text-amber-600" />
            <span className="text-amber-700 font-medium">0/4 Units Complete</span>
          </div>
        </div>

        <div className="space-y-6">
          {units.map((unit, index) => {
            const colors = getUnitColors(index)
            
            return (
              <div
                key={unit.number}
                className={`bg-white rounded-xl border shadow-sm p-6 transform transition-all duration-300 hover:shadow-md hover:scale-[1.01] ${
                  unit.isUnlocked ? 'cursor-pointer' : 'opacity-75'
                }`}
                onClick={() => unit.isUnlocked && handleContinueClick(unit)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                      unit.isUnlocked 
                        ? colors.icon
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      {unit.isUnlocked ? (
                        <Unlock className="h-6 w-6" />
                      ) : (
                        <Lock className="h-6 w-6" />
                      )}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500 mb-1">
                        Unit {unit.number}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{unit.title}</h3>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                          <span className="text-sm text-gray-500">4 Lessons</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-violet-500"></div>
                          <span className="text-sm text-gray-500">2 Quizzes</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant={unit.isUnlocked ? "default" : "secondary"}
                    className={`h-12 px-6 rounded-xl transform transition-all duration-300 ${
                      unit.isUnlocked 
                        ? `${colors.bg} hover:bg-opacity-80 text-gray-800 shadow-sm hover:shadow hover:scale-[1.02]`
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                    }`}
                    disabled={!unit.isUnlocked}
                  >
                    <span className="mr-2">{unit.buttonText}</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* Progress bar */}
                {unit.isUnlocked && (
                  <div className="mt-6">
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${colors.progress} rounded-full transition-all duration-500`}
                        style={{ width: `${index * 20}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default LearningPath