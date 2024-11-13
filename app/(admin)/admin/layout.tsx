"use client";

import MasterAdminLayout from '@/components/layouts/AdminLayout'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <MasterAdminLayout activeTab="dashboard">
      {children}
    </MasterAdminLayout>
  )
}