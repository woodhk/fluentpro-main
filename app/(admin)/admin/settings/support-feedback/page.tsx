"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Settings, MessageSquareText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

export default function AdminSupportFeedback() {
  const breadcrumbItems = [
    { label: 'Settings', href: '/admin/settings/my-details', icon: Settings },
    { label: 'Support & Feedback', href: '/admin/settings/support-feedback', icon: MessageSquareText }
  ];

  const positiveUserFeedback = [
    "Best app in the world!",
    "Best Business English training app",
    "Love the Role-plays"
  ];

  const negativeUserFeedback = [
    "Levels too hard",
    "Too many bugs",
    "Not enough content"
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
                <Link 
                  href={item.href}
                  className={cn(
                    "text-sm font-medium",
                    index === breadcrumbItems.length - 1 && "text-blue-700"
                  )}
                >
                  {item.label}
                </Link>
              </div>
            </li>
          ))}
        </ol>
      </nav>

      {/* Page Title */}
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Support & Feedback</h1>

      {/* Tabs */}
      <Tabs defaultValue="support" className="w-full">
        <TabsList className="w-full md:w-auto border-b bg-transparent mb-6">
          <Link href="/admin/settings/my-details" className="flex-1 md:flex-none">
            <TabsTrigger 
              value="my-details" 
              className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none px-6"
            >
              My Details
            </TabsTrigger>
          </Link>
          <Link href="/admin/settings/password" className="flex-1 md:flex-none">
            <TabsTrigger 
              value="password" 
              className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none px-6"
            >
              Password
            </TabsTrigger>
          </Link>
          <Link href="/admin/settings/support-feedback" className="flex-1 md:flex-none">
            <TabsTrigger 
              value="support" 
              className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none px-6"
            >
              Support & Feedback
            </TabsTrigger>
          </Link>
        </TabsList>

        {/* Feedback List Card */}
        <Card className="border border-gray-200 shadow-sm bg-white">
          <CardHeader className="border-b bg-gray-50/50">
            <CardTitle className="text-lg font-semibold text-gray-900">
              List of Popular Feedback from Users
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Positive Feedback Section */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Positive</h3>
                <ul className="space-y-4">
                  {positiveUserFeedback.map((feedback, index) => (
                    <li key={`positive-${index}`} className="text-gray-700">
                      {feedback}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Negative Feedback Section */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Negative</h3>
                <ul className="space-y-4">
                  {negativeUserFeedback.map((feedback, index) => (
                    <li key={`negative-${index}`} className="text-gray-700">
                      {feedback}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
}