// app/(admin)/admin/manage/company-list/page.tsx
'use client';

import React, { useState } from 'react';
import { Plus, Check, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Admin {
  id: string;
  name: string;
  inviteStatus: 'accepted' | 'pending';
  accountSetup: 'completed' | 'pending';
}

interface Company {
  id: string;
  name: string;
  invitesSent: number;
  isExpanded?: boolean;
  admins: Admin[];
}

// Mock data - replace with actual data fetching
const initialCompanies: Company[] = [
  {
    id: '1',
    name: 'J.P Morgan',
    invitesSent: 2,
    admins: [
      {
        id: '1',
        name: 'Kathy Wu',
        inviteStatus: 'accepted',
        accountSetup: 'completed'
      },
      {
        id: '2',
        name: 'Leong Wang',
        inviteStatus: 'pending',
        accountSetup: 'pending'
      }
    ]
  },
  {
    id: '2',
    name: 'Deloitte',
    invitesSent: 3,
    admins: [
      {
        id: '3',
        name: 'John Smith',
        inviteStatus: 'accepted',
        accountSetup: 'completed'
      },
      {
        id: '4',
        name: 'Sarah Chen',
        inviteStatus: 'pending',
        accountSetup: 'pending'
      }
    ]
  },
  {
    id: '3',
    name: 'ICBC',
    invitesSent: 1,
    admins: []
  },
  {
    id: '4',
    name: 'Hutchison',
    invitesSent: 4,
    admins: []
  },
  {
    id: '5',
    name: 'HSBC',
    invitesSent: 3,
    admins: []
  },
  {
    id: '6',
    name: 'BDO',
    invitesSent: 2,
    admins: []
  }
];

export default function CompanyListPage() {
  const [companies, setCompanies] = useState<Company[]>(initialCompanies);

  const handleExpandClick = (companyId: string) => {
    setCompanies(prevCompanies =>
      prevCompanies.map(company => ({
        ...company,
        isExpanded: company.id === companyId ? !company.isExpanded : company.isExpanded
      }))
    );
  };

  const StatusIcon = ({ status }: { status: 'accepted' | 'pending' | 'completed' }) => {
    if (status === 'accepted' || status === 'completed') {
      return (
        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100">
          <Check className="w-4 h-4 text-emerald-600" />
        </div>
      );
    }
    return (
      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-100">
        <Minus className="w-4 h-4 text-amber-600" />
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Company Name:</h2>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Number of Invites Sent:</h2>
        </div>
      </div>

      {/* Company List */}
      <div className="space-y-4">
        {companies.map((company) => (
          <div 
            key={company.id}
            className="relative"
          >
            {/* Company Row */}
            <div className="flex items-center border rounded-lg hover:border-gray-300 transition-colors">
              <div className="flex-1 grid grid-cols-2 gap-4 p-4">
                <div className="text-lg text-gray-900">{company.name}</div>
                <div className="flex items-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 text-sm font-medium text-white bg-blue-600 rounded-full">
                    {company.invitesSent}
                  </span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2"
                onClick={() => handleExpandClick(company.id)}
              >
                <Plus className="h-5 w-5 text-gray-500" />
                <span className="sr-only">Expand {company.name}</span>
              </Button>
            </div>

            {/* Expanded Content */}
            {company.isExpanded && (
              <div className="mt-2 p-6 border rounded-lg bg-gray-50">
                <div className="grid grid-cols-3 gap-8">
                  {/* Admin Names Column */}
                  <div>
                    <h3 className="font-bold text-gray-900 mb-4">Admin Names:</h3>
                    <div className="space-y-4">
                      {company.admins.map(admin => (
                        <div key={admin.id} className="text-gray-700">
                          {admin.name}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Invite Status Column */}
                  <div>
                    <h3 className="font-bold text-gray-900 mb-4">Invite Status</h3>
                    <div className="space-y-4">
                      {company.admins.map(admin => (
                        <div key={admin.id} className="flex items-center">
                          <StatusIcon status={admin.inviteStatus} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Account Setup Column */}
                  <div>
                    <h3 className="font-bold text-gray-900 mb-4">Account Setup:</h3>
                    <div className="space-y-4">
                      {company.admins.map(admin => (
                        <div key={admin.id} className="flex items-center">
                          <StatusIcon status={admin.accountSetup} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {company.admins.length === 0 && (
                  <p className="text-gray-500 italic">No administrators found.</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}