// app/(admin)/admin/invite-users/layout.tsx
'use client';

import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Send, Building2 } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const InviteUsersLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const currentTab = pathname?.split('/').pop() || 'create-hr-admins';

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto p-6 sm:p-8">
        {/* Header Section */}
        <div className="mb-8 space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Company & User Management
          </h1>
          <p className="text-gray-500">
            Manage your organization's HR administrators and company settings
          </p>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={currentTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 gap-3 p-1 bg-gray-100/50 rounded-xl">
            {[
              {
                value: 'create-hr-admins',
                label: 'Create HR Admins',
                icon: Users,
                description: 'Add new HR administrators',
                href: '/admin/invite-users/create-hr-admins',
              },
              {
                value: 'invite-hr-admins',
                label: 'Invite HR Admins',
                icon: Send,
                description: 'Send invitations to HR admins',
                href: '/admin/invite-users/invite-hr-admins',
              },
              {
                value: 'edit-companies',
                label: 'Edit Companies',
                icon: Building2,
                description: 'Modify company settings',
                href: '/admin/invite-users/edit-companies',
              },
            ].map((tab) => (
              <Link key={tab.value} href={tab.href} className="w-full">
                <TabsTrigger
                  value={tab.value}
                  className={`w-full p-4 space-y-1 transition-all duration-200 ${
                    currentTab === tab.value
                      ? 'bg-white shadow-lg shadow-blue-100/50 border-blue-100'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-center sm:justify-start space-x-3">
                    <div className={`p-2 rounded-lg ${
                      currentTab === tab.value 
                        ? 'bg-blue-50 text-blue-600'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      <tab.icon className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-gray-900">
                        {tab.label}
                      </div>
                      <div className="text-xs text-gray-500 hidden sm:block">
                        {tab.description}
                      </div>
                    </div>
                  </div>
                </TabsTrigger>
              </Link>
            ))}
          </TabsList>
        </Tabs>

        {/* Content Area */}
        <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default InviteUsersLayout;