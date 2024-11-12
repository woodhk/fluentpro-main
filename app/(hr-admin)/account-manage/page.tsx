"use client";

import React, { useState } from 'react';
import { Search, CheckCircle, Clock, Trash2, Users, UserCheck } from 'lucide-react';

interface StaffMember {
  name: string;
  email: string;
  inviteStatus: 'accepted' | 'pending';
  setupStatus: 'completed' | 'pending';
}

const AccountManagement = () => {
  const [activeTab, setActiveTab] = useState<string>('invite-summary');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Sample data - replace with actual data
  const staffMembers: StaffMember[] = [
    {
      name: "Wan Xiang",
      email: "xiangwan@jpmorgan.com",
      inviteStatus: "accepted",
      setupStatus: "completed"
    },
    {
      name: "Kevin Cheng",
      email: "chengkevin@jpmorgan.com",
      inviteStatus: "pending",
      setupStatus: "pending"
    },
    {
      name: "Michael Li",
      email: "limichael@jpmorgan.com",
      inviteStatus: "accepted",
      setupStatus: "pending"
    },
    {
      name: "Jessica Chen",
      email: "jessicachen@jpmorgan.com",
      inviteStatus: "accepted",
      setupStatus: "completed"
    },
    {
      name: "Linda Zhang",
      email: "zhanglinda@jpmorgan.com",
      inviteStatus: "accepted",
      setupStatus: "completed"
    }
  ];

  // Calculate statistics
  const stats = {
    totalInvites: staffMembers.length,
    acceptedInvites: staffMembers.filter(member => member.inviteStatus === 'accepted').length,
    pendingInvites: staffMembers.filter(member => member.inviteStatus === 'pending').length
  };

  const filteredStaff = staffMembers.filter(staff =>
    staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    staff.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const StatCircle = ({ 
    value, 
    label, 
    icon: Icon 
  }: { 
    value: number; 
    label: string; 
    icon: React.ElementType;
  }) => (
    <div className="flex flex-col items-center">
      <div className="relative mb-4">
        <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center">
          <span className="text-4xl font-bold text-gray-900">{value}</span>
        </div>
        <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center">
          <Icon className="h-5 w-5 text-blue-600" />
        </div>
      </div>
      <span className="text-sm font-medium text-gray-600">{label}</span>
    </div>
  );

  const StatusIndicator = ({ 
    status, 
    type 
  }: { 
    status: 'accepted' | 'pending' | 'completed';
    type: 'invite' | 'setup';
  }) => (
    <div className="flex items-center justify-center">
      {status === 'accepted' || status === 'completed' ? (
        <CheckCircle className="h-5 w-5 text-green-500" />
      ) : (
        <Clock className="h-5 w-5 text-yellow-500" />
      )}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Account Management</h1>
        
        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex gap-6">
            <button
              onClick={() => setActiveTab('invite-summary')}
              className={`pb-4 relative ${
                activeTab === 'invite-summary'
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className="text-sm font-medium">Invite Summary</span>
              {activeTab === 'invite-summary' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('staff-list')}
              className={`pb-4 relative ${
                activeTab === 'staff-list'
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className="text-sm font-medium">Staff List Table</span>
              {activeTab === 'staff-list' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
              )}
            </button>
          </nav>
        </div>
      </div>

      {/* Invite Summary View */}
      {activeTab === 'invite-summary' && (
        <div className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 justify-items-center">
            <StatCircle
              value={stats.totalInvites}
              label="Total Invites Sent"
              icon={Users}
            />
            <StatCircle
              value={stats.acceptedInvites}
              label="Invites Accepted"
              icon={UserCheck}
            />
            <StatCircle
              value={stats.pendingInvites}
              label="Pending Invites"
              icon={Clock}
            />
          </div>
        </div>
      )}

      {/* Staff List Table View */}
      {activeTab === 'staff-list' && (
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Invite Status
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Setup
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredStaff.map((staff, index) => (
                    <tr 
                      key={index}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {staff.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {staff.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusIndicator status={staff.inviteStatus} type="invite" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusIndicator status={staff.setupStatus} type="setup" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <button 
                          className="text-red-500 hover:text-red-700 transition-colors"
                          onClick={() => {
                            // Add delete functionality here
                            console.log('Delete clicked for:', staff.name);
                          }}
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountManagement;