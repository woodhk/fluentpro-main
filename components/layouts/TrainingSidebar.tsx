"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, PlayCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarContextType {
  isOpen: boolean;
  toggleSidebar: () => void;
}

interface TrainingSidebarProps {
  children: React.ReactNode;
}

const SidebarContext = createContext<SidebarContextType>({
  isOpen: true,
  toggleSidebar: () => {},
});

export const SidebarProvider: React.FC<TrainingSidebarProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen(!isOpen);
  
  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

const TrainingSidebar: React.FC<TrainingSidebarProps> = ({ children }) => {
  const { isOpen, toggleSidebar } = useContext(SidebarContext);
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const trainingVideos = [
    {
      id: 1,
      title: "Meet FluentPro",
      subtitle: "Training Video 1",
      path: "/training-video-1",
      duration: "5:00"
    },
    {
      id: 2,
      title: "Science Behind FluentPro",
      path: "/training-video-2",
      duration: "6:00"
    },
    {
      id: 3,
      title: "L&D Portal for Admins & Leaders",
      path: "/training-video-3",
      duration: "6:00"
    },
    {
      id: 4,
      title: "The Hybrid Approach",
      path: "/training-video-4",
      duration: "4:00"
    }
  ];

  if (!mounted) return null;

  return (
    <div className="flex min-h-screen">
      <aside className={cn(
        "fixed left-0 top-0 h-screen bg-[#382C6E] transition-all duration-300 ease-in-out z-50",
        "border-r border-[#4A3D8B]",
        isOpen ? "w-80" : "w-20"
      )}>
        <button
          onClick={toggleSidebar}
          className={cn(
            "absolute -right-6 top-8",
            "flex items-center justify-center",
            "w-12 h-12 rounded-full",
            "bg-[#4A3D8B]",
            "transition-all duration-300",
            "hover:bg-[#5B4BA8] hover:scale-105",
            "focus:outline-none focus:ring-2 focus:ring-[#6B5BC8] focus:ring-offset-2"
          )}
        >
          {isOpen ? (
            <ChevronLeft className="h-6 w-6 text-[#E6E1FF]" />
          ) : (
            <ChevronRight className="h-6 w-6 text-[#E6E1FF]" />
          )}
        </button>

        <div className="p-6">
          <h2 className={cn(
            "font-semibold transition-all duration-300",
            isOpen ? "text-xl text-[#E6E1FF] opacity-100" : "text-0 opacity-0 h-0"
          )}>
            Training Videos
          </h2>
        </div>

        <nav className="px-4">
          {trainingVideos.map((video) => (
            <Link
              key={video.id}
              href={video.path}
              className={cn(
                "flex items-center gap-3 p-4 rounded-lg mb-2",
                "transition-all duration-200",
                "hover:bg-[#4A3D8B]",
                pathname === video.path 
                  ? "bg-[#4A3D8B] shadow-lg border border-[#5B4BA8]" 
                  : "border border-transparent",
                isOpen ? "justify-start" : "justify-center"
              )}
            >
              <PlayCircle className={cn(
                "flex-shrink-0 w-6 h-6",
                pathname === video.path ? "text-[#B8ADFF]" : "text-[#9D8FFF]"
              )} />
              
              {isOpen && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#E6E1FF] truncate">
                    {video.title}
                  </p>
                  <p className="text-xs text-[#B8ADFF]">
                    Duration: {video.duration}
                  </p>
                </div>
              )}
            </Link>
          ))}
        </nav>
      </aside>

      <main className={cn(
        "flex-1 transition-all duration-300 ease-in-out",
        isOpen ? "ml-80" : "ml-20"
      )}>
        {children}
      </main>
    </div>
  );
};

export default TrainingSidebar;