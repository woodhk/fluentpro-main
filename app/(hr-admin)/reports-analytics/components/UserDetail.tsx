import React from 'react';
import { motion } from 'framer-motion';
import { UserCircle, X, Trophy, Clock, BookOpen, TrendingUp, Activity, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

// Add the missing interface
export interface LearnerData {
  username: string;
  level: number;
  hoursSpent: number;
  completedLessons: number;
  progression: number;
  email?: string;
  avgPerformance?: number;
  lastActivity?: {
    action: string;
    date: string;
  };
}

interface UserDetailProps {
  user: LearnerData;
  onClose: () => void;
}

export const UserDetail: React.FC<UserDetailProps> = ({ user, onClose }) => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 }
  };

  return (
    <motion.div 
      className="h-full"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeIn}
    >
      {/* Header Section */}
      <div className="relative mb-8">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white rounded-2xl h-32 -z-10" />
        
        {/* Close Button */}
        <div className="absolute right-0 top-0 p-4">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full hover:bg-blue-100 transition-colors"
            onClick={onClose}
          >
            <X className="h-4 w-4 text-blue-600" />
          </Button>
        </div>

        {/* User Info */}
        <div className="pt-6 pb-4 px-4 text-center">
          <div className="relative inline-block">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center ring-4 ring-white shadow-lg">
              <UserCircle className="w-12 h-12 text-blue-600" />
            </div>
            <div className="absolute -bottom-1 right-0 bg-green-500 w-5 h-5 rounded-full border-4 border-white" />
          </div>
          <h3 className="mt-4 text-xl font-semibold text-gray-900">{user.username}</h3>
          <p className="text-sm text-gray-500">{user.email || `${user.username.toLowerCase().replace(' ', '.')}@email.com`}</p>
        </div>
      </div>

      {/* Progress Section */}
      <div className="px-6 space-y-6">
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Progress since joining</h4>
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: BookOpen, value: user.completedLessons, label: 'Lessons', subtext: 'Completed' },
              { icon: Clock, value: user.hoursSpent, label: 'Hours', subtext: 'Time' },
              { icon: TrendingUp, value: `${user.progression}%`, label: 'Course', subtext: 'Progression' }
            ].map((item, index) => (
              <div 
                key={index}
                className="relative overflow-hidden group rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md"
              >
                <div className="absolute top-0 right-0 w-16 h-16 -mr-8 -mt-8 bg-gradient-to-br from-blue-50 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <item.icon className="w-5 h-5 text-blue-600 mb-2" />
                <div className="font-semibold text-lg text-gray-900">{item.value}</div>
                <div className="text-xs text-gray-500">
                  {item.label}
                  <br />
                  {item.subtext}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Section */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Current Performance</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <Trophy className="w-5 h-5 text-blue-600" />
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  getLevelBadgeColor(user.level)
                }`}>
                  Level {user.level}
                </span>
              </div>
              <div className="mt-2">
                <div className="text-sm text-gray-500">Current Level</div>
                <div className="text-lg font-semibold text-gray-900">Level {user.level}</div>
                <div className="mt-2 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 rounded-full transition-all duration-500"
                    style={{ width: `${(user.progression % 100)}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <Activity className="w-5 h-5 text-green-600" />
                <span className="text-xs font-medium text-green-600">Active</span>
              </div>
              <div className="mt-2">
                <div className="text-sm text-gray-500">Avg. Performance</div>
                <div className="text-lg font-semibold text-gray-900">{user.avgPerformance || '73.5'}%</div>
                <div className="mt-2 flex items-center gap-1 text-xs text-green-600">
                  <TrendingUp className="w-3 h-3" />
                  <span>+5% this week</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Recent Activity</h4>
          <div className="space-y-3">
            {[
              {
                action: 'Completed Introducing yourself at work',
                date: '12/11/2024',
                score: 92
              },
              {
                action: 'Started Business Communication',
                date: '12/11/2024',
                score: 88
              }
            ].map((activity, index) => (
              <div 
                key={index}
                className="group rounded-xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                      <UserCircle className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-100 flex items-center justify-center">
                      <Trophy className="w-2.5 h-2.5 text-green-600" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.date}</p>
                      </div>
                      <span className="text-sm font-medium text-blue-600">{activity.score}%</span>
                    </div>
                    <div className="mt-2">
                      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-600 rounded-full transition-all duration-500"
                          style={{ width: `${activity.score}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <Button 
              variant="ghost" 
              className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-medium"
            >
              View All Activity
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Helper function for level badge colors
const getLevelBadgeColor = (level: number): string => {
  const colors: Record<number, string> = {
    1: 'bg-blue-100 text-blue-700',
    2: 'bg-green-100 text-green-700',
    3: 'bg-purple-100 text-purple-700',
    4: 'bg-orange-100 text-orange-700'
  };
  return colors[level] || 'bg-gray-100 text-gray-700';
};

export default UserDetail;