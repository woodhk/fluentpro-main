"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Settings, Lock, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

export default function AdminPasswordSettings() {
  const [showCurrentPassword, setShowCurrentPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [formData, setFormData] = React.useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const breadcrumbItems = [
    { label: 'Settings', href: '/admin/settings/my-details', icon: Settings },
    { label: 'Password', href: '/admin/settings/password', icon: Lock }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Here you would typically handle the password change logic
    console.log('Password change submitted:', formData);
    
    setIsSubmitting(false);
    setFormData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

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
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h1>

      {/* Tabs */}
      <Tabs defaultValue="password" className="w-full">
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

        {/* Password Change Form */}
        <Card className="border border-gray-200 shadow-sm bg-white">
          <CardHeader className="flex flex-row items-center justify-between border-b bg-gray-50/50">
            <CardTitle className="text-lg font-semibold text-gray-900">Change Password</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
              {/* Current Password */}
              <div className="space-y-2">
                <Label htmlFor="currentPassword" className="text-sm font-medium text-gray-700">
                  Current Password
                </Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showCurrentPassword ? "text" : "password"}
                    value={formData.currentPassword}
                    onChange={(e) => setFormData({...formData, currentPassword: e.target.value})}
                    className="pr-10 border-gray-300 bg-white focus:border-blue-500 focus:ring-blue-500"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                </div>
              </div>

              {/* New Password */}
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-sm font-medium text-gray-700">
                  New Password
                </Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    value={formData.newPassword}
                    onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                    className="pr-10 border-gray-300 bg-white focus:border-blue-500 focus:ring-blue-500"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Confirm New Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                  Confirm New Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    className="pr-10 border-gray-300 bg-white focus:border-blue-500 focus:ring-blue-500"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white w-full md:w-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin mr-2">●</span>
                    Saving...
                  </>
                ) : (
                  'Save'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
}