"use client";

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  GraduationCap, 
  ChartBar, 
  Settings,
  UserCircle,
  ChevronDown,
  MenuIcon,
  ChevronLeft,
  BookOpen
} from 'lucide-react'

interface DashboardLayoutProps {
  children: React.ReactNode
  activeTab?: string
}

const DashboardLayout = ({ children, activeTab = 'learning-path' }: DashboardLayoutProps) => {
  const router = useRouter()
  const [currentTab, setCurrentTab] = useState(activeTab)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  // Mock enrolled courses data
  const enrolledCourses = [
    { id: 1, title: "Business English Fundamentals", progress: 65 },
    { id: 2, title: "Professional Communication", progress: 30 }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Header */}
      <header className="bg-white border-b shadow-sm px-6 py-4 sticky top-0 z-50 transition-all duration-300">
        <div className="flex items-center justify-between max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors duration-200"
              >
                {isSidebarOpen ? (
                  <ChevronLeft className="h-5 w-5 text-blue-600" />
                ) : (
                  <MenuIcon className="h-5 w-5 text-blue-600" />
                )}
              </Button>
              <Image 
                src="/icons/logo.svg" 
                alt="FluentPro Logo" 
                width={120}
                height={30}
                className="h-8 transform hover:scale-105 transition-transform duration-200"
              />
            </div>
          </div>

          <h1 className="text-2xl font-light absolute left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Welcome Back <span className="font-semibold">Alex</span>
          </h1>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 hover:bg-blue-50 transition-colors duration-200">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <UserCircle className="h-6 w-6 text-blue-600" />
                </div>
                <ChevronDown className="h-4 w-4 text-blue-600" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 p-2 bg-white border shadow-lg rounded-xl mt-2">
              <DropdownMenuItem className="rounded-lg hover:bg-blue-50 focus:bg-blue-50 cursor-pointer p-3 transition-colors duration-200" onSelect={() => router.push('/settings')}>
                <Settings className="h-4 w-4 mr-2 text-blue-600" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-lg hover:bg-red-50 focus:bg-red-50 cursor-pointer p-3 text-red-600 transition-colors duration-200" onSelect={() => router.push('/sign-in')}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="flex max-w-screen-2xl mx-auto">
        {/* Enhanced Left Sidebar */}
        <aside className={`${isSidebarOpen ? 'w-72' : 'w-0'} bg-white shadow-sm min-h-[calc(100vh-73px)] overflow-hidden transition-all duration-300 ease-in-out`}>
          <div className="p-6">
            <nav className="space-y-3">
              <Button
                variant={currentTab === 'learning-path' ? 'default' : 'ghost'}
                className={`w-full justify-start gap-3 text-lg rounded-xl h-12 transition-all duration-200 ${
                  currentTab === 'learning-path' 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'hover:bg-blue-50 text-gray-600'
                }`}
                onClick={() => {
                  setCurrentTab('learning-path')
                  router.push('/learning-path')
                }}
              >
                <GraduationCap className="h-5 w-5" />
                Learning Path
              </Button>
              
              {/* Courses Tab */}
              <Button
                variant={currentTab === 'courses' ? 'default' : 'ghost'}
                className={`w-full justify-start gap-3 text-lg rounded-xl h-12 transition-all duration-200 ${
                  currentTab === 'courses' 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'hover:bg-blue-50 text-gray-600'
                }`}
                onClick={() => {
                  setCurrentTab('courses')
                  router.push('/courses')
                }}
              >
                <BookOpen className="h-5 w-5" />
                Courses
              </Button>

              <Button
                variant={currentTab === 'performance' ? 'default' : 'ghost'}
                className={`w-full justify-start gap-3 text-lg rounded-xl h-12 transition-all duration-200 ${
                  currentTab === 'performance' 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'hover:bg-blue-50 text-gray-600'
                }`}
                onClick={() => {
                  setCurrentTab('performance')
                  router.push('/performance/unit-performance')
                }}
              >
                <ChartBar className="h-5 w-5" />
                Performance
              </Button>
            </nav>

            <div className="absolute bottom-8 w-[calc(100%-3rem)]">
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 text-lg rounded-xl h-12 hover:bg-blue-50 text-gray-600 transition-all duration-200"
                onClick={() => router.push('/settings')}
              >
                <Settings className="h-5 w-5" />
                Settings
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {children}
        </main>

        {/* Enhanced Right Sidebar */}
        <aside className="w-80 bg-white shadow-sm p-8">
          <div className="flex flex-col items-center text-center">
            <div className="relative group">
              <div className="w-28 h-28 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full flex items-center justify-center transform group-hover:scale-105 transition-all duration-300">
                <UserCircle className="w-20 h-20 text-blue-600" />
              </div>
              <div className="absolute -bottom-2 right-0 bg-green-500 w-6 h-6 rounded-full border-4 border-white"></div>
            </div>
            
            <h3 className="font-semibold text-xl mt-6 mb-1">Alex Chen</h3>
            <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium mb-2">
              Level 1
            </div>
            <p className="text-gray-500 mb-8">Software Engineer</p>

            {/* Enrolled Courses Section */}
            <div className="w-full space-y-4 mb-8">
              <h4 className="text-left font-semibold text-gray-700">Enrolled Courses</h4>
              {enrolledCourses.map(course => (
                <div key={course.id} className="bg-gray-50 rounded-xl p-4 text-left">
                  <h5 className="font-medium text-gray-800 mb-2">{course.title}</h5>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{course.progress}% complete</p>
                </div>
              ))}
            </div>
            
            <Button
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-xl h-12 shadow-sm transition-all duration-300 transform hover:scale-[1.02]"
              onClick={() => window.open('https://www.workplace-english-training.com/emagazine/en/', '_blank')}
            >
              Open E-Platform
            </Button>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default DashboardLayout