// app/(admin)/admin/invite-users/create-hr-admins/page.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building2, Users, Plus, MinusCircle } from 'lucide-react';

interface Company {
  id: string;
  name: string;
}

export default function CreateHRAdminsPage() {
  const [companyName, setCompanyName] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [adminCount, setAdminCount] = useState(2);
  const [staffCount, setStaffCount] = useState(20);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [step, setStep] = useState(1);

  const handleCreateCompany = (e: React.FormEvent) => {
    e.preventDefault();
    if (companyName.trim()) {
      const newCompany = {
        id: Date.now().toString(),
        name: companyName.trim()
      };
      setCompanies([...companies, newCompany]);
      setCompanyName('');
      setStep(2); // Move to next step
    }
  };

  const handleCreateAccounts = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      company: selectedCompany,
      adminCount,
      staffCount
    });
  };

  return (
    <div className="space-y-6">
      {/* Create Company Section */}
      <Card className={`transition-all duration-300 ${step === 2 ? 'opacity-50' : ''}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            Create Company
          </CardTitle>
          <CardDescription>
            Start by creating a new company profile
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateCompany} className="space-y-4">
            <div className="relative">
              <Input
                placeholder="Enter Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="pr-4 h-12"
                disabled={step === 2}
              />
              <Button 
                type="submit"
                className="absolute right-0 top-0 h-12 px-6"
                disabled={!companyName.trim() || step === 2}
              >
                Create
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Create Accounts Section */}
      <Card className={`transition-all duration-300 ${step === 1 ? 'opacity-50' : ''}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Create Accounts
          </CardTitle>
          <CardDescription>
            Set up administrator and staff accounts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateAccounts} className="space-y-6">
            <Select 
              value={selectedCompany} 
              onValueChange={setSelectedCompany}
              disabled={step === 1}
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

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Number of HR Admin Users</label>
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setAdminCount(Math.max(1, adminCount - 1))}
                    disabled={step === 1}
                    className="h-12 w-12"
                  >
                    <MinusCircle className="h-5 w-5" />
                  </Button>
                  <div className="w-20 h-12 flex items-center justify-center border rounded-md bg-background">
                    {adminCount}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setAdminCount(adminCount + 1)}
                    disabled={step === 1}
                    className="h-12 w-12"
                  >
                    <Plus className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Number of Staff Users</label>
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setStaffCount(Math.max(1, staffCount - 1))}
                    disabled={step === 1}
                    className="h-12 w-12"
                  >
                    <MinusCircle className="h-5 w-5" />
                  </Button>
                  <div className="w-20 h-12 flex items-center justify-center border rounded-md bg-background">
                    {staffCount}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setStaffCount(staffCount + 1)}
                    disabled={step === 1}
                    className="h-12 w-12"
                  >
                    <Plus className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12"
              disabled={step === 1 || !selectedCompany}
            >
              Create Accounts
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}