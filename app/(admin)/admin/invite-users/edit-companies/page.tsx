'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PencilIcon } from 'lucide-react';

interface Company {
  id: string;
  name: string;
  adminCount: number;
  userCount: number;
}

export default function EditCompaniesPage() {
  // Sample data - replace with actual data source
  const [companies] = useState<Company[]>([
    { id: '1', name: 'Company Name 1', adminCount: 2, userCount: 20 },
    { id: '2', name: 'Company Name 1', adminCount: 1, userCount: 10 },
    { id: '3', name: 'Company Name 1', adminCount: 4, userCount: 100 },
    { id: '4', name: 'Company Name 1', adminCount: 3, userCount: 25 },
    { id: '5', name: 'Company Name 1', adminCount: 2, userCount: 20 },
  ]);

  return (
    <Card>
      <CardContent className="p-6">
        {/* Header Row */}
        <div className="grid grid-cols-[2fr,1fr,1fr,auto] gap-4 mb-4 px-4">
          <div className="font-semibold text-sm">Company Name</div>
          <div className="font-semibold text-sm text-center"># HR Admins</div>
          <div className="font-semibold text-sm text-center"># Registered Users</div>
          <div className="w-8"></div> {/* Space for edit button */}
        </div>

        {/* Company Rows */}
        <div className="space-y-2">
          {companies.map((company) => (
            <div
              key={company.id}
              className="grid grid-cols-[2fr,1fr,1fr,auto] gap-4 items-center px-4 py-3 bg-white border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="font-medium">{company.name}</div>
              <div className="text-center">{company.adminCount}</div>
              <div className="text-center">{company.userCount}</div>
              <Button
                variant="ghost"
                size="sm"
                className="w-8 h-8 p-0"
                onClick={() => console.log('Edit company:', company.id)}
              >
                <PencilIcon className="h-4 w-4 text-blue-600" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}