import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  LayoutDashboard,
  Users,
  FileSpreadsheet,
  Settings,
  UserCircle,
  ChevronDown,
  MenuIcon,
  ChevronLeft,
} from 'lucide-react';
import CostTrackingSidebar from '@/components/admin/CostTrackingSidebar';

interface MasterAdminLayoutProps {
  children: React.ReactNode;
  activeTab?: string;
}

interface SidebarContent {
  component: React.ComponentType<any>;
  props: any;
}

const MasterAdminLayout = ({ children, activeTab = 'dashboard' }: MasterAdminLayoutProps) => {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState(activeTab);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sidebarContent, setSidebarContent] = useState<SidebarContent | null>(null);

  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: '/admin/dashboard'
    },
    {
      id: 'invite-users',
      label: 'Invite Users',
      icon: Users,
      path: '/admin/invite-users'
    },
    {
      id: 'account-manage',
      label: 'Manage Accounts',
      icon: FileSpreadsheet,
      path: '/admin/manage'
    },
    {
      id: 'marking',
      label: 'Marking',
      icon: FileSpreadsheet,
      path: '/admin/marking'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      path: '/admin/settings/my-details'
    }
  ];

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
            Admin Dashboard
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
                    setCurrentTab(item.id);
                    router.push(item.path);
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
            <CostTrackingSidebar />
          )}
        </aside>
      </div>
    </div>
  );
};

export default MasterAdminLayout;