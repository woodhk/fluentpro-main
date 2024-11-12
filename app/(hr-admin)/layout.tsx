"use client";

import HRAdminLayout from '@/components/layouts/HRAdminLayout'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <HRAdminLayout activeTab="dashboard">
      {children}
    </HRAdminLayout>
  )
}