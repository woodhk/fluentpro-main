"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Upload, AlertCircle, Settings, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

const CertificateTab = () => {
  const breadcrumbItems = [
    { label: 'Settings', href: '/settings/my-details', icon: Settings },
    { label: 'Certificate', href: '/settings/certificate', icon: User }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center space-x-2">
          {breadcrumbItems.map((item, index) => (
            <li key={index} className="flex items-center">
              {index !== 0 && (
                <ChevronRight className="mx-2 h-4 w-4 flex-shrink-0 text-gray-400" />
              )}
              <div className={cn(
                "flex items-center py-1 px-2 rounded-md",
                index === breadcrumbItems.length - 1 
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100 transition-colors"
              )}>
                <item.icon className="h-4 w-4 flex-shrink-0 mr-1.5" />
                <Link href={item.href} className={cn(
                  "text-sm font-medium",
                  index === breadcrumbItems.length - 1 && "text-blue-700"
                )}>
                  {item.label}
                </Link>
              </div>
            </li>
          ))}
        </ol>
      </nav>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h1>

      {/* Tabs */}
      <Tabs defaultValue="certificate" className="w-full">
        <TabsList className="w-full md:w-auto border-b bg-transparent mb-6">
          <Link href="/settings/my-details" className="flex-1 md:flex-none">
            <TabsTrigger value="my-details" className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none px-6">
              My Details
            </TabsTrigger>
          </Link>
          <Link href="/settings/password" className="flex-1 md:flex-none">
            <TabsTrigger value="password" className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none px-6">
              Password
            </TabsTrigger>
          </Link>
          <Link href="/settings/certificate" className="flex-1 md:flex-none">
            <TabsTrigger value="certificate" className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none px-6">
              Certificate
            </TabsTrigger>
          </Link>
          <Link href="/settings/support-feedback" className="flex-1 md:flex-none">
            <TabsTrigger value="support" className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none px-6">
              Support & Feedback
            </TabsTrigger>
          </Link>
        </TabsList>

        <div className="space-y-6">
          <Card className="bg-gray-50 border-2 border-dashed">
            <CardHeader>
              <div className="flex items-center gap-3">
                <AlertCircle className="h-6 w-6 text-blue-600" />
                <CardTitle>Certificate Not Available</CardTitle>
              </div>
              <CardDescription>
                After completing all courses and lessons to the required standard, your certificate will appear here.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg bg-white p-8 text-center">
                <div className="mb-6">
                  <div className="mx-auto w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                    <AlertCircle className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">Course Completion Required</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Continue working through your lessons and maintain the required performance standards to unlock your certificate.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </Tabs>
    </div>
  );
};

export default CertificateTab;