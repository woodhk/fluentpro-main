import { SidebarProvider } from '@/components/layouts/TrainingSidebar';
import TrainingSidebar from '@/components/layouts/TrainingSidebar';

export default function TrainingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <TrainingSidebar>{children}</TrainingSidebar>
    </SidebarProvider>
  );
}