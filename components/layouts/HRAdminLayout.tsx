import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  LayoutDashboard,
  Users,
  FileSpreadsheet,
  BarChart3,
  Settings,
  UserCircle,
  ChevronDown,
  MenuIcon,
  ChevronLeft,
  Trophy,
  TrendingUp,
  Activity,
  ArrowUpRight,
  Medal,
} from 'lucide-react'

interface HRAdminLayoutProps {
  children: React.ReactNode
  activeTab?: string
}

interface SidebarContent {
  component: React.ComponentType<any>;
  props: any;
}

const DefaultSidebarStats = () => {
  const [selectedPerformer, setSelectedPerformer] = useState<number | null>(null)
  
  const topPerformers = [
    { 
      name: "Jessica Chen", 
      level: 4, 
      avgGrade: "85%",
      growth: "+12%",
      streak: "15 days",
      badge: "🏆 Top Achiever"
    },
    { 
      name: "Linda Zhang", 
      level: 3, 
      avgGrade: "79%",
      growth: "+8%",
      streak: "12 days",
      badge: "⭐ Rising Star"
    },
    { 
      name: "Michael Li", 
      level: 2, 
      avgGrade: "83%",
      growth: "+15%",
      streak: "10 days",
      badge: "🚀 Fast Learner"
    },
    { 
      name: "Wan Xiang", 
      level: 2, 
      avgGrade: "73%",
      growth: "+5%",
      streak: "7 days",
      badge: "💪 Consistent"
    },
    { 
      name: "Kevin Cheung", 
      level: 1, 
      avgGrade: "72%",
      growth: "+7%",
      streak: "5 days",
      badge: "📈 Improving"
    }
  ]

  const recentActivity = [
    {
      user: "Sarah Kim",
      action: "Completed Advanced Communication",
      performance: 92,
      time: "2 hours ago",
      impact: "high"
    },
    {
      user: "David Chen",
      action: "Finished Customer Service Module",
      performance: 88,
      time: "4 hours ago",
      impact: "medium"
    },
    {
      user: "Maria Garcia",
      action: "Started Leadership Training",
      performance: 85,
      time: "5 hours ago",
      impact: "medium"
    }
  ]

  return (
    <div className="space-y-8">
      {/* Profile Card */}
      <Card className="p-6 bg-white shadow-sm border border-gray-100">
        <div className="flex flex-col items-center text-center">
          <div className="relative group">
            <div className="w-28 h-28 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full flex items-center justify-center transform group-hover:scale-105 transition-all duration-300">
              <UserCircle className="w-20 h-20 text-blue-600" />
            </div>
            <div className="absolute -bottom-2 right-0 bg-green-500 w-6 h-6 rounded-full border-4 border-white"></div>
          </div>
          <h3 className="font-semibold text-xl mt-6 mb-1">Admin Name</h3>
          <p className="text-gray-500 mb-2">HR Administrator</p>
          <p className="text-sm text-gray-400">Company Name</p>
        </div>
      </Card>

      {/* Top Performers Section */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <h4 className="font-semibold text-gray-900">Top Performers</h4>
          </div>
          <span className="text-sm text-blue-600 font-medium flex items-center gap-1 cursor-pointer hover:text-blue-700 transition-colors">
            View All
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>

        <div className="space-y-4">
          {topPerformers.map((performer, index) => (
            <div
              key={performer.name}
              className={`group relative rounded-xl transition-all duration-200 cursor-pointer ${
                selectedPerformer === index 
                  ? 'bg-blue-50 p-4' 
                  : 'hover:bg-gray-50 p-4'
              }`}
              onClick={() => setSelectedPerformer(selectedPerformer === index ? null : index)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      index === 0 ? 'bg-yellow-100' : 'bg-gray-100'
                    }`}>
                      <UserCircle className={`w-6 h-6 ${
                        index === 0 ? 'text-yellow-600' : 'text-gray-600'
                      }`} />
                    </div>
                    {index === 0 && (
                      <div className="absolute -top-1 -right-1">
                        <Medal className="w-4 h-4 text-yellow-500" />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{performer.name}</p>
                    <p className="text-sm text-gray-500">Level {performer.level}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-blue-600">{performer.avgGrade}</p>
                  <p className="text-sm text-green-600">{performer.growth}</p>
                </div>
              </div>

              <div className={`grid grid-cols-2 gap-4 mt-4 transition-all duration-200 ${
                selectedPerformer === index ? 'opacity-100 h-20' : 'opacity-0 h-0 overflow-hidden'
              }`}>
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <p className="text-sm text-gray-500">Learning Streak</p>
                  <p className="font-medium text-gray-900">{performer.streak}</p>
                </div>
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <p className="text-sm text-gray-500">Achievement</p>
                  <p className="font-medium text-gray-900">{performer.badge}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Staff Activity Section */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-500" />
            <h4 className="font-semibold text-gray-900">Staff Activity</h4>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-sm text-gray-500">Live Updates</span>
          </div>
        </div>

        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div
              key={index}
              className="group relative rounded-xl p-4 hover:bg-gray-50 transition-all duration-200"
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                    <UserCircle className="w-7 h-7 text-blue-600" />
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center ${
                    activity.impact === 'high' 
                      ? 'bg-green-100' 
                      : 'bg-blue-100'
                  }`}>
                    <TrendingUp className={`w-3 h-3 ${
                      activity.impact === 'high'
                        ? 'text-green-600'
                        : 'text-blue-600'
                    }`} />
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-900">{activity.user}</p>
                    <span className="text-sm text-gray-500">{activity.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{activity.action}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 h-1.5 rounded-full bg-gray-100">
                      <div 
                        className="h-full rounded-full bg-blue-600 transition-all duration-500"
                        style={{ width: `${activity.performance}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-blue-600">
                      {activity.performance}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const HRAdminLayout = ({ children, activeTab = 'dashboard' }: HRAdminLayoutProps) => {
  const router = useRouter()
  const [currentTab, setCurrentTab] = useState(activeTab)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [sidebarContent, setSidebarContent] = useState<SidebarContent | null>(null)

  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: '/dashboard'
    },
    {
      id: 'invite-users',
      label: 'Invite Users',
      icon: Users,
      path: '/invite-users'
    },
    {
      id: 'account-manage',
      label: 'Manage Account',
      icon: FileSpreadsheet,
      path: '/account-manage'
    },
    {
      id: 'reports',
      label: 'Reports + Analytics',
      icon: BarChart3,
      path: '/reports-analytics/individual'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      path: '/settings/my-details'
    }
  ]

  useEffect(() => {
    const handleSidebarUpdate = (event: CustomEvent) => {
      const { component, props } = event.detail;
      setSidebarContent({ component, props });
    };

    window.addEventListener('updateSidebar', handleSidebarUpdate as EventListener);
    
    return () => {
      window.removeEventListener('updateSidebar', handleSidebarUpdate as EventListener);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
                className="h-8 w-auto transform hover:scale-105 transition-transform duration-200" 
              />
            </div>
          </div>

          <h1 className="text-2xl font-light absolute left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            HR Admin Dashboard
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
              <DropdownMenuItem 
                className="rounded-lg hover:bg-red-50 focus:bg-red-50 cursor-pointer p-3 text-red-600 transition-colors duration-200" 
                onSelect={() => router.push('/sign-in')}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="flex max-w-screen-2xl mx-auto">
        {/* Left Sidebar */}
        <aside 
          className={`${
            isSidebarOpen ? 'w-72' : 'w-0'
          } bg-white shadow-sm min-h-[calc(100vh-73px)] transition-all duration-300 ease-in-out overflow-hidden`}
        >
          <div className="p-6">
            <nav className="space-y-3">
              {navigationItems.map((item) => (
                <Button
                  key={item.id}
                  variant={currentTab === item.id ? 'default' : 'ghost'}
                  className={`w-full justify-start gap-3 text-lg rounded-xl h-12 transition-all duration-200 ${
                    currentTab === item.id 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'hover:bg-blue-50 text-gray-600'
                  }`}
                  onClick={() => {
                    setCurrentTab(item.id)
                    router.push(item.path)
                  }}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-auto">
          {children}
        </main>

        {/* Right Sidebar */}
        <aside className="w-96 bg-gray-50 p-6 space-y-6">
          {sidebarContent?.component ? (
          React.createElement(sidebarContent.component, sidebarContent.props)
            ) : (
          <DefaultSidebarStats />
          )}
        </aside>
      </div>
    </div>
  )
}

export default HRAdminLayout