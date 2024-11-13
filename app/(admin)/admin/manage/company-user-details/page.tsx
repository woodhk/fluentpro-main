// app/(admin)/admin/manage/company-user-details/page.tsx
'use client';

import React, { useState, useCallback } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Check, Minus, Search, Filter, Trash2 } from 'lucide-react';

interface Staff {
  id: string;
  name: string;
  email: string;
  inviteStatus: 'accepted' | 'pending';
  setupStatus: 'completed' | 'pending';
}

interface Company {
  id: string;
  name: string;
  staffList: Staff[];
  totalInvites: number;
  acceptedInvites: number;
  pendingInvites: number;
}

const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'HSBC',
    totalInvites: 5,
    acceptedInvites: 3,
    pendingInvites: 2,
    staffList: [
      {
        id: '1',
        name: 'Alice Smith',
        email: 'alice.smith@hsbc.com',
        inviteStatus: 'accepted',
        setupStatus: 'completed',
      },
      {
        id: '2',
        name: 'Bob Johnson',
        email: 'bob.johnson@hsbc.com',
        inviteStatus: 'pending',
        setupStatus: 'pending',
      },
    ],
  },
  {
    id: '2',
    name: 'J.P. Morgan',
    totalInvites: 4,
    acceptedInvites: 2,
    pendingInvites: 2,
    staffList: [
      {
        id: '3',
        name: 'Carol Williams',
        email: 'carol.williams@jpmorgan.com',
        inviteStatus: 'accepted',
        setupStatus: 'completed',
      },
      {
        id: '4',
        name: 'David Brown',
        email: 'david.brown@jpmorgan.com',
        inviteStatus: 'pending',
        setupStatus: 'pending',
      },
    ],
  },
  {
    id: '3',
    name: 'Hutchison',
    totalInvites: 3,
    acceptedInvites: 1,
    pendingInvites: 2,
    staffList: [
      {
        id: '5',
        name: 'Emma Davis',
        email: 'emma.davis@hutchison.com',
        inviteStatus: 'accepted',
        setupStatus: 'completed',
      },
      {
        id: '6',
        name: 'Frank Miller',
        email: 'frank.miller@hutchison.com',
        inviteStatus: 'pending',
        setupStatus: 'pending',
      },
    ],
  },
  {
    id: '4',
    name: 'Sony',
    totalInvites: 6,
    acceptedInvites: 4,
    pendingInvites: 2,
    staffList: [
      {
        id: '7',
        name: 'Grace Wilson',
        email: 'grace.wilson@sony.com',
        inviteStatus: 'accepted',
        setupStatus: 'completed',
      },
      {
        id: '8',
        name: 'Henry Moore',
        email: 'henry.moore@sony.com',
        inviteStatus: 'pending',
        setupStatus: 'pending',
      },
    ],
  },
  {
    id: '5',
    name: 'Bank of China',
    totalInvites: 5,
    acceptedInvites: 3,
    pendingInvites: 2,
    staffList: [
      {
        id: '9',
        name: 'Isabella Taylor',
        email: 'isabella.taylor@bankofchina.com',
        inviteStatus: 'accepted',
        setupStatus: 'completed',
      },
      {
        id: '10',
        name: 'Jack Anderson',
        email: 'jack.anderson@bankofchina.com',
        inviteStatus: 'pending',
        setupStatus: 'pending',
      },
    ],
  },
  {
    id: '6',
    name: 'Sony',
    totalInvites: 4,
    acceptedInvites: 2,
    pendingInvites: 2,
    staffList: [
      {
        id: '11',
        name: 'Karen Thomas',
        email: 'karen.thomas@sony.com',
        inviteStatus: 'accepted',
        setupStatus: 'completed',
      },
      {
        id: '12',
        name: 'Leo Jackson',
        email: 'leo.jackson@sony.com',
        inviteStatus: 'pending',
        setupStatus: 'pending',
      },
    ],
  },
  {
    id: '7',
    name: 'DHL',
    totalInvites: 7,
    acceptedInvites: 5,
    pendingInvites: 2,
    staffList: [
      {
        id: '13',
        name: 'Mia White',
        email: 'mia.white@dhl.com',
        inviteStatus: 'accepted',
        setupStatus: 'completed',
      },
      {
        id: '14',
        name: 'Noah Harris',
        email: 'noah.harris@dhl.com',
        inviteStatus: 'pending',
        setupStatus: 'pending',
      },
    ],
  },
  {
    id: '8',
    name: 'Shangri-La',
    totalInvites: 5,
    acceptedInvites: 3,
    pendingInvites: 2,
    staffList: [
      {
        id: '15',
        name: 'Olivia Martin',
        email: 'olivia.martin@shangri-la.com',
        inviteStatus: 'accepted',
        setupStatus: 'completed',
      },
      {
        id: '16',
        name: 'Peter Thompson',
        email: 'peter.thompson@shangri-la.com',
        inviteStatus: 'pending',
        setupStatus: 'pending',
      },
    ],
  },
  {
    id: '9',
    name: 'BDO',
    totalInvites: 3,
    acceptedInvites: 1,
    pendingInvites: 2,
    staffList: [
      {
        id: '17',
        name: 'Quinn Garcia',
        email: 'quinn.garcia@bdo.com',
        inviteStatus: 'accepted',
        setupStatus: 'completed',
      },
      {
        id: '18',
        name: 'Ryan Martinez',
        email: 'ryan.martinez@bdo.com',
        inviteStatus: 'pending',
        setupStatus: 'pending',
      },
    ],
  },
  {
    id: '10',
    name: 'Deloitte',
    totalInvites: 8,
    acceptedInvites: 6,
    pendingInvites: 2,
    staffList: [
      {
        id: '19',
        name: 'Sophia Robinson',
        email: 'sophia.robinson@deloitte.com',
        inviteStatus: 'accepted',
        setupStatus: 'completed',
      },
      {
        id: '20',
        name: 'Thomas Clark',
        email: 'thomas.clark@deloitte.com',
        inviteStatus: 'pending',
        setupStatus: 'pending',
      },
    ],
  },
];

type ViewType = 'invite-summary' | 'staff-list';

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

const InviteSummary = ({ selectedCompany }: { selectedCompany: Company }) => (
  <div className="mt-8">
    <div className="grid grid-cols-3 gap-8">
      <div className="text-center">
        <h3 className="text-xl font-bold mb-4">Total Invites Sent</h3>
        <div className="w-32 h-32 rounded-full bg-gray-100 mx-auto flex items-center justify-center">
          <span className="text-3xl font-bold">{selectedCompany.totalInvites}</span>
        </div>
      </div>
      <div className="text-center">
        <h3 className="text-xl font-bold mb-4">Invites Accepted</h3>
        <div className="w-32 h-32 rounded-full bg-gray-100 mx-auto flex items-center justify-center">
          <span className="text-3xl font-bold">{selectedCompany.acceptedInvites}</span>
        </div>
      </div>
      <div className="text-center">
        <h3 className="text-xl font-bold mb-4">Pending Invites</h3>
        <div className="w-32 h-32 rounded-full bg-gray-100 mx-auto flex items-center justify-center">
          <span className="text-3xl font-bold">{selectedCompany.pendingInvites}</span>
        </div>
      </div>
    </div>
  </div>
);

const StaffListTable = ({
  selectedCompany,
  searchQuery,
  handleSearch,
}: {
  selectedCompany: Company;
  searchQuery: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const filteredStaff = selectedCompany.staffList.filter((staff) =>
    staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    staff.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mt-8 space-y-4">
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearch}
            className="pl-9"
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Email</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Invite Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Setup</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-900"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredStaff.map((staff) => (
              <tr key={staff.id}>
                <td className="px-6 py-4 text-sm text-gray-900">{staff.name}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{staff.email}</td>
                <td className="px-6 py-4">
                  <StatusIcon status={staff.inviteStatus} />
                </td>
                <td className="px-6 py-4">
                  <StatusIcon status={staff.setupStatus} />
                </td>
                <td className="px-6 py-4">
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4 text-gray-500" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default function CompanyUserDetailsPage() {
  const [selectedCompanyId, setSelectedCompanyId] = useState(mockCompanies[0].id);
  const [currentView, setCurrentView] = useState<ViewType>('invite-summary');
  const [staffSearchQuery, setStaffSearchQuery] = useState('');
  const [companySearchQuery, setCompanySearchQuery] = useState('');

  // Filter companies based on search query
  const filteredCompanies = mockCompanies.filter((company) =>
    company.name.toLowerCase().includes(companySearchQuery.toLowerCase())
  );

  // Get selected company
  const selectedCompany =
    filteredCompanies.find((company) => company.id === selectedCompanyId) ||
    filteredCompanies[0] ||
    null;

  // Handlers
  const handleStaffSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setStaffSearchQuery(e.target.value);
  }, []);

  const handleCompanySearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanySearchQuery(e.target.value);
    setSelectedCompanyId(''); // Reset selected company when searching
  }, []);

  return (
    <div className="space-y-6">
      {/* Company Search */}
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Search Companies"
          value={companySearchQuery}
          onChange={handleCompanySearch}
          className="pl-9"
        />
      </div>

      {/* Company Selection Tabs */}
      <Tabs value={selectedCompanyId} className="w-full">
        <TabsList className="w-full overflow-x-auto flex-nowrap">
          {filteredCompanies.map((company) => (
            <TabsTrigger
              key={company.id}
              value={company.id}
              onClick={() => {
                setSelectedCompanyId(company.id);
                setStaffSearchQuery(''); // Reset staff search when changing company
              }}
              className="px-6 py-2 whitespace-nowrap"
            >
              {company.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* View Selection Tabs */}
      <Tabs value={currentView} className="w-full">
        <TabsList>
          <TabsTrigger
            value="invite-summary"
            onClick={() => setCurrentView('invite-summary')}
          >
            Invite Summary
          </TabsTrigger>
          <TabsTrigger
            value="staff-list"
            onClick={() => setCurrentView('staff-list')}
          >
            Staff List Table
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Content */}
      {selectedCompany ? (
        currentView === 'invite-summary' ? (
          <InviteSummary selectedCompany={selectedCompany} />
        ) : (
          <StaffListTable
            selectedCompany={selectedCompany}
            searchQuery={staffSearchQuery}
            handleSearch={handleStaffSearch}
          />
        )
      ) : (
        <div className="text-center mt-8">No Company Selected</div>
      )}
    </div>
  );
}
