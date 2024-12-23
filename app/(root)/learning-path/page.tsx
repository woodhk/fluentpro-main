"use client";

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Lock, Unlock, ChevronRight, PlayCircle, GripVertical } from 'lucide-react'
import DashboardLayout from '../../../components/layouts/DashboardLayout'
import { units as initialUnits } from '@/app/data/units'
import type { Unit } from '@/app/types'

const LearningPath = () => {
  const router = useRouter()
  const [units, setUnits] = useState(initialUnits)
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [hasSelectedFirst, setHasSelectedFirst] = useState(false)
  const [hoveredUnit, setHoveredUnit] = useState<number | null>(null)

  const getUnitColors = (index: number) => {
    const schemes = [
      { bg: 'bg-blue-50', icon: 'bg-blue-100 text-blue-600', progress: 'from-blue-600 to-blue-400' },
      { bg: 'bg-purple-50', icon: 'bg-purple-100 text-purple-600', progress: 'from-purple-600 to-purple-400' },
      { bg: 'bg-emerald-50', icon: 'bg-emerald-100 text-emerald-600', progress: 'from-emerald-600 to-emerald-400' },
      { bg: 'bg-amber-50', icon: 'bg-amber-100 text-amber-600', progress: 'from-amber-600 to-amber-400' }
    ]
    return schemes[index % schemes.length]
  }

  const handleInitialSelection = (selectedIndex: number) => {
    // Create a new array with the selected unit first and the rest following
    const selectedUnit = units[selectedIndex]
    const remainingUnits = units.filter((_, index) => index !== selectedIndex)
    
    const reorderedUnits = [
      { ...selectedUnit, isUnlocked: true },
      ...remainingUnits.map(unit => ({ ...unit, isUnlocked: false }))
    ]
    
    setUnits(reorderedUnits)
    setHasSelectedFirst(true)
  }

  const handleContinueClick = (unit: Unit) => {
    if (unit.isUnlocked) {
      router.push('/learning-path-lesson')
    }
  }

  const handleDragStart = (e: React.DragEvent, index: number) => {
    // Prevent dragging the first (unlocked) card
    if (index === 0) {
      e.preventDefault()
      return
    }
    setDraggedIndex(index)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (draggedIndex === null || draggedIndex === index) return
    
    // Prevent dropping to the first position (unlocked card)
    if (index === 0) return
    
    setUnits(prevUnits => {
      const newUnits = [...prevUnits]
      const draggedUnit = newUnits[draggedIndex]
      newUnits.splice(draggedIndex, 1)
      newUnits.splice(index, 0, draggedUnit)
      setDraggedIndex(index)
      return newUnits
    })
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
  }
  const calculateOverallProgress = () => {
    const unlockedUnits = units.filter(unit => unit.isUnlocked).length;
    return (unlockedUnits / units.length) * 100;
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col gap-4 mb-8">
          {/* Header with Progress */}
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {!hasSelectedFirst ? "Select Your Starting Point" : "My Learning Path"}
            </h2>

            {hasSelectedFirst && (
              <div className="flex items-center gap-3">
                <div className="w-48 bg-gray-100 rounded-full h-3 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-500"
                    style={{ width: `${calculateOverallProgress()}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-600">
                  {Math.round(calculateOverallProgress())}%
                </span>
              </div>
            )}
          </div>
          </div>

        {!hasSelectedFirst ? (
          <div className="space-y-6">
            <p className="text-lg text-gray-600 mb-8">
              Choose the unit you'd like to start with. After selection, you can arrange the remaining units in your preferred order.
            </p>
            {units.map((unit, index) => {
              const colors = getUnitColors(index)
              const isHovered = hoveredUnit === index
              
              return (
                <div
                  key={unit.number}
                  className={`bg-white rounded-xl border shadow-sm p-6 transform transition-all duration-300 
                    ${isHovered ? 'shadow-lg scale-[1.01] border-blue-200' : 'hover:shadow-md hover:scale-[1.01]'} 
                    cursor-pointer`}
                  onClick={() => handleInitialSelection(index)}
                  onMouseEnter={() => setHoveredUnit(index)}
                  onMouseLeave={() => setHoveredUnit(null)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${colors.icon}`}>
                        <PlayCircle className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{unit.title}</h3>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                            <span className="text-sm text-gray-500">12 Lessons</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="default"
                      className={`h-12 px-6 rounded-xl transform transition-all duration-300
                        ${colors.bg} hover:bg-opacity-80 text-gray-800 shadow-sm 
                        hover:shadow hover:scale-[1.02]`}
                    >
                      <span className="mr-2">Start Here</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="space-y-6">
            {units.map((unit, index) => {
              const colors = getUnitColors(index)
              const isFirst = index === 0
              
              return (
                <div
                  key={unit.number}
                  draggable={!isFirst}
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnd={handleDragEnd}
                  className={`bg-white rounded-xl border shadow-sm p-6 transform transition-all duration-300 
                    ${isFirst ? 'border-blue-500 shadow-md' : 'opacity-75'} 
                    ${draggedIndex === index ? 'border-dashed border-gray-400' : ''}`}
                  onClick={() => unit.isUnlocked && handleContinueClick(unit)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      {!isFirst && (
                        <div className="cursor-grab">
                          <GripVertical className="h-5 w-5 text-gray-400" />
                        </div>
                      )}
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                        isFirst ? colors.icon : 'bg-gray-100 text-gray-400'
                      }`}>
                        {isFirst ? (
                          <Unlock className="h-6 w-6" />
                        ) : (
                          <Lock className="h-6 w-6" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{unit.title}</h3>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                            <span className="text-sm text-gray-500">12 Lessons</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Button
                        variant={isFirst ? "default" : "secondary"}
                        className={`h-12 px-6 rounded-xl transform transition-all duration-300 ${
                          isFirst 
                            ? `${colors.bg} hover:bg-opacity-80 text-gray-800 shadow-sm hover:shadow hover:scale-[1.02]`
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                        }`}
                        disabled={!isFirst}
                      >
                        <span className="mr-2">
                          {isFirst ? 'Continue' : `Complete ${unit.title}`}
                        </span>
                        <ChevronRight className="h-4 w-4" />
                      </Button>

                      {isFirst && (
                        <div className="w-full">
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full bg-gradient-to-r ${colors.progress} rounded-full transition-all duration-500`}
                              style={{ width: '0%' }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default LearningPath