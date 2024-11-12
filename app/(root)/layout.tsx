import type { Metadata } from "next";
import { Toaster } from 'sonner';
import localFont from "next/font/local";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      {children}
      <Toaster />
    </main>
  );
}