"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Settings, MessageSquareText, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function SupportFeedback() {
  const [feedback, setFeedback] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { toast } = useToast();

  const breadcrumbItems = [
    { label: 'Settings', href: '/settings/my-details', icon: Settings },
    { label: 'Support & Feedback', href: '/settings/support-feedback', icon: MessageSquareText }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) {
      toast({
        title: "Error",
        description: "Please enter your feedback before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Here you would typically send the feedback to your backend
    console.log('Feedback submitted:', feedback);
    
    toast({
      title: "Success",
      description: "Your feedback has been submitted successfully. Thank you!",
    });
    
    setIsSubmitting(false);
    setFeedback('');
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
      <Tabs defaultValue="support" className="w-full">
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

        {/* Feedback Form Card */}
        <Card className="border border-gray-200 shadow-sm bg-white">
          <CardHeader className="flex flex-row items-center justify-between border-b bg-gray-50/50">
            <CardTitle className="text-lg font-semibold text-gray-900">Feedback</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
              <div className="space-y-2">
                <Label htmlFor="feedback" className="text-sm font-medium text-gray-700">
                  Share your thoughts, suggestions, or report issues
                </Label>
                <Textarea
                  id="feedback"
                  placeholder="Enter your feedback here..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="min-h-[150px] resize-y border-gray-300 bg-white focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className={cn(
                    "bg-blue-600 hover:bg-blue-700 text-white",
                    "flex items-center gap-2"
                  )}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin">●</span>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
}