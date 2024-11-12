"use client";

import React, { useState } from 'react';
import { Copy, Users, Mail, CheckCircle } from 'lucide-react';

const StaffInvite = () => {
  const [copied, setCopied] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const magicLink = 'https://fluentpro.com/my-merger-meeting-room';
  const emailTemplate = `Hi there,

I'd like to invite you to join our meeting room. Please click the link below to join:

${magicLink}

Best regards,
[Your name]`;

  const copyToClipboard = async (text: string, type: 'link' | 'email') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'link') {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        setEmailCopied(true);
        setTimeout(() => setEmailCopied(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Invite Staff</h1>
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-blue-600" />
          <span className="text-sm font-medium text-gray-600">
            Spots Remaining: 34
          </span>
        </div>
      </div>

      {/* Magic Link Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Mail className="h-5 w-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">Magic Link</h2>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">
          Email the following link to staff members for them to be added to your "meeting room"
        </p>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={magicLink}
            readOnly
            className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800"
          />
          <button
            onClick={() => copyToClipboard(magicLink, 'link')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              copied
                ? 'bg-green-50 text-green-600 border border-green-200'
                : 'bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100'
            }`}
          >
            {copied ? (
              <>
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm font-medium">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span className="text-sm font-medium">Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Email Template Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Mail className="h-5 w-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">Email Template</h2>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">
          Copy and paste the following template email (rewrite it if you'd like)
        </p>

        <div className="flex flex-col gap-2">
          <textarea
            value={emailTemplate}
            readOnly
            className="w-full h-32 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 resize-none"
          />
          <div className="flex justify-end">
            <button
              onClick={() => copyToClipboard(emailTemplate, 'email')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                emailCopied
                  ? 'bg-green-50 text-green-600 border border-green-200'
                  : 'bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100'
              }`}
            >
              {emailCopied ? (
                <>
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm font-medium">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span className="text-sm font-medium">Copy Template</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffInvite;