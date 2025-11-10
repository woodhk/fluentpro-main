"use client";

import React, { useState, useEffect } from 'react';
import { Copy, Mail, CheckCircle, Users, ArrowRight, Clipboard, Share2, Info, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tooltip } from '@/components/ui/tooltip';
import { Progress } from '@/components/ui/progress';

const NewInviteStaff = () => {
  const [copied, setCopied] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [showCopiedAnimation, setShowCopiedAnimation] = useState(false);
  const [inviteProgress, setInviteProgress] = useState(0);
  const [showTip, setShowTip] = useState(false);
  const magicLink = 'https://fluentpro.com/my-merger-meeting-room';
  const emailTemplate = `Hi there,

I'd like to invite you to join our meeting room. Please click the link below to join:

${magicLink}`;

  // Simulate progress on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setInviteProgress(34);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Show tip after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTip(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const copyToClipboard = async (text: string, type: 'link' | 'email') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'link') {
        setCopied(true);
        setShowCopiedAnimation(true);
        setTimeout(() => {
          setCopied(false);
          setShowCopiedAnimation(false);
        }, 2000);
      } else {
        setEmailCopied(true);
        setTimeout(() => setEmailCopied(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="relative">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-between mb-2"
        >
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Invite Staff</h1>
          <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
            <Users className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">
              Spots Remaining: <span className="font-bold">34</span>
            </span>
          </div>
        </motion.div>
        
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Invitation Progress</span>
            <span className="font-medium">{inviteProgress}%</span>
          </div>
          <Progress value={inviteProgress} className="h-2" />
        </div>
        
        <AnimatePresence>
          {showTip && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6 flex items-start gap-3"
            >
              <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-blue-800 mb-1">Quick Tip</h3>
                <p className="text-sm text-blue-700">
                  You can track who has accepted your invitations in the "Staff Management" section after they join.
                </p>
              </div>
              <button 
                onClick={() => setShowTip(false)}
                className="ml-auto text-blue-600 hover:text-blue-800"
              >
                <span className="sr-only">Dismiss</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Magic Link Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Card className="overflow-hidden border-0 shadow-lg bg-white">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-6">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Mail className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl">Magic Link</CardTitle>
            </div>
            <CardDescription className="text-blue-100 mt-2">
              Email the following link to staff members for them to be added to your "meeting room"
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-6">
            <div className="flex items-stretch gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={magicLink}
                  readOnly
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 pr-10 font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
                <AnimatePresence>
                  {showCopiedAnimation && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center bg-blue-500/10 rounded-lg"
                    >
                      <span className="flex items-center gap-2 text-blue-600 font-medium">
                        <CheckCircle className="h-5 w-5" />
                        Copied!
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <Button
                onClick={() => copyToClipboard(magicLink, 'link')}
                className={`px-5 py-3 rounded-lg transition-all ${
                  copied
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {copied ? (
                  <span className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Copied
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Copy className="h-5 w-5" />
                    Copy
                  </span>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Email Template Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Card className="overflow-hidden border-0 shadow-lg bg-white">
          <CardHeader className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white p-6">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Clipboard className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl">Email Template</CardTitle>
            </div>
            <CardDescription className="text-indigo-100 mt-2">
              Copy and paste the following template email (rewrite it if you'd like)
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="relative">
                <textarea
                  value={emailTemplate}
                  readOnly
                  className="w-full h-40 px-5 py-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 resize-none font-medium leading-relaxed focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                />
                <div className="absolute top-3 right-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white hover:bg-gray-100 text-gray-600"
                    onClick={() => copyToClipboard(emailTemplate, 'email')}
                  >
                    {emailCopied ? (
                      <span className="flex items-center gap-1 text-green-600">
                        <CheckCircle className="h-3.5 w-3.5" />
                        <span className="text-xs">Copied</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <Copy className="h-3.5 w-3.5" />
                        <span className="text-xs">Copy</span>
                      </span>
                    )}
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button
                  onClick={() => copyToClipboard(emailTemplate, 'email')}
                  className={`px-5 py-3 rounded-lg transition-all ${
                    emailCopied
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  {emailCopied ? (
                    <span className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      Copied Template
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Share2 className="h-5 w-5" />
                      Copy Template
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="bg-gray-50 p-4 border-t border-gray-100">
            <div className="flex items-center text-sm text-gray-500">
              <ArrowRight className="h-4 w-4 mr-2 text-indigo-500" />
              <span>Pro tip: Personalize the email for better response rates</span>
            </div>
          </CardFooter>
        </Card>
      </motion.div>

      {/* Additional Help Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-start gap-3"
      >
        <AlertCircle className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="font-medium text-gray-700 mb-1">Need Help?</h3>
          <p className="text-sm text-gray-600">
            If you're having trouble with invitations, contact our support team at{' '}
            <a href="mailto:support@fluentpro.com" className="text-blue-600 hover:underline">
              support@fluentpro.com
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default NewInviteStaff; 