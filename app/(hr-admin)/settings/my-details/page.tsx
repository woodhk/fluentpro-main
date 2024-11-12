"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Upload, AlertCircle, Settings, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

export default function AccountSettings() {
  const [isEditing, setIsEditing] = React.useState(false);
  const [profileData, setProfileData] = React.useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com'
  });

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save the changes to your backend
  };

  // Enhanced breadcrumb items with icons
  const breadcrumbItems = [
    { label: 'Settings', href: '/settings/my-details', icon: Settings },
    { label: 'My Details', href: '/settings/my-details', icon: User }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Enhanced Breadcrumb */}
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
      <Tabs defaultValue="my-details" className="w-full">
        <TabsList className="w-full md:w-auto border-b bg-transparent mb-6">
          <Link href="/settings/my-details" className="flex-1 md:flex-none">
            <TabsTrigger 
              value="my-details" 
              className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none px-6"
            >
              My Details
            </TabsTrigger>
          </Link>
          <Link href="/settings/password" className="flex-1 md:flex-none">
            <TabsTrigger 
              value="password" 
              className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none px-6"
            >
              Password
            </TabsTrigger>
          </Link>
          <Link href="/settings/support-feedback" className="flex-1 md:flex-none">
            <TabsTrigger 
              value="support" 
              className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none px-6"
            >
              Support & Feedback
            </TabsTrigger>
          </Link>
        </TabsList>

        <div className="space-y-6">
          {/* Basic Details Card */}
          <Card className="border border-gray-200 shadow-sm bg-white">
            <CardHeader className="flex flex-row items-center justify-between border-b bg-gray-50/50">
              <CardTitle className="text-lg font-semibold text-gray-900">Basic Details</CardTitle>
              <Button
                variant={isEditing ? "default" : "outline"}
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                className={isEditing ? "bg-blue-600 hover:bg-blue-700 text-white" : "text-blue-600 border-blue-600 hover:bg-blue-50"}
              >
                {isEditing ? 'Save Changes' : 'Change'}
              </Button>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              {/* Avatar Section */}
              <div className="flex items-center space-x-4">
                <div className="bg-gray-100 p-1 rounded-full">
                  <Avatar className="h-20 w-20 border-2 border-white shadow-sm">
                    <AvatarImage src="/placeholder-avatar.jpg" />
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      JD
                    </AvatarFallback>
                  </Avatar>
                </div>
                {isEditing && (
                  <Button variant="outline" className="flex items-center space-x-2 border-gray-300">
                    <Upload className="h-4 w-4" />
                    <span>Upload Photo</span>
                  </Button>
                )}
              </div>

              {/* Form Fields */}
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    value={profileData.firstName}
                    onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                    disabled={!isEditing}
                    className="border-gray-300 bg-white focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    value={profileData.lastName}
                    onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                    disabled={!isEditing}
                    className="border-gray-300 bg-white focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    disabled={!isEditing}
                    className="border-gray-300 bg-white focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Delete Account Card */}
          <Card className="border border-red-200 bg-white shadow-sm">
            <CardHeader className="border-b bg-red-50/50">
              <CardTitle className="text-lg font-semibold text-red-600">Delete Account</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Delete your account and all of your data. This is irreversible.
                </p>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      variant="destructive" 
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      Delete Account
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-white border-0">
                    <AlertDialogHeader className="border-b pb-4">
                      <AlertDialogTitle className="flex items-center gap-2 text-red-600">
                        <AlertCircle className="h-5 w-5" />
                        Delete Account
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-gray-600 mt-2">
                        Are you sure you want to delete your account? This action cannot be undone
                        and will permanently delete all your data.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="border-t pt-4 mt-4 gap-2">
                      <AlertDialogCancel className="bg-gray-100 hover:bg-gray-200 border-0 text-gray-700">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction className="bg-red-600 hover:bg-red-700 text-white border-0">
                        Delete Account
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        </div>
      </Tabs>
    </div>
  );
}