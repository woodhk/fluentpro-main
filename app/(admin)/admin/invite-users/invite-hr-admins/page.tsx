// app/(admin)/admin/invite-users/invite-hr-admins/page.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle, Send, X } from 'lucide-react';

interface AdminUser {
  fullName: string;
  email: string;
}

interface Company {
  id: string;
  name: string;
}

export default function InviteHRAdminsPage() {
  const [selectedCompany, setSelectedCompany] = useState('');
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([
    { fullName: '', email: '' },
    { fullName: '', email: '' }
  ]);

  // Sample companies data - replace with actual data source
  const companies: Company[] = [
    { id: '1', name: 'Company A' },
    { id: '2', name: 'Company B' },
  ];

  const handleAdminChange = (index: number, field: keyof AdminUser, value: string) => {
    const newAdminUsers = [...adminUsers];
    newAdminUsers[index] = {
      ...newAdminUsers[index],
      [field]: value
    };
    setAdminUsers(newAdminUsers);
  };

  const addNewAdmin = () => {
    setAdminUsers([...adminUsers, { fullName: '', email: '' }]);
  };

  const removeAdmin = (index: number) => {
    if (adminUsers.length > 1) { // Ensure at least one admin remains
      const newAdminUsers = adminUsers.filter((_, i) => i !== index);
      setAdminUsers(newAdminUsers);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      company: selectedCompany,
      admins: adminUsers
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Invite HR Admins</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            {/* Company Selection */}
            <Select
              value={selectedCompany}
              onValueChange={setSelectedCompany}
            >
              <SelectTrigger className="w-full h-12">
                <SelectValue placeholder="Select Company" />
              </SelectTrigger>
              <SelectContent>
                {companies.map((company) => (
                  <SelectItem key={company.id} value={company.id}>
                    {company.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Admin Users */}
            <div className="space-y-6">
              {adminUsers.map((admin, index) => (
                <div key={index} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">HR Admin {index + 1}</h3>
                    {adminUsers.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => removeAdmin(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="space-y-4">
                    <Input
                      placeholder="Full Name"
                      value={admin.fullName}
                      onChange={(e) => handleAdminChange(index, 'fullName', e.target.value)}
                      className="h-12"
                    />
                    <Input
                      type="email"
                      placeholder="Email Address"
                      value={admin.email}
                      onChange={(e) => handleAdminChange(index, 'email', e.target.value)}
                      className="h-12"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Add More Button */}
            <div className="flex justify-center">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="rounded-full h-8 w-8"
                onClick={addNewAdmin}
              >
                <PlusCircle className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-12"
            disabled={!selectedCompany || adminUsers.some(admin => !admin.fullName || !admin.email)}
          >
            <Send className="w-4 h-4 mr-2" />
            Send Invite
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}