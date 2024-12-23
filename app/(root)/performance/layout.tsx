"use client";

import DashboardLayout from '@/components/layouts/DashboardLayout'

export default function PerformanceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardLayout activeTab="performance">{children}</DashboardLayout>
}