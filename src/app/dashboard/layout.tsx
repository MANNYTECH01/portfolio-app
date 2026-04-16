import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import DashboardSidebar from '@/components/dashboard/Sidebar';

export const metadata: Metadata = {
  title: 'Dashboard — Folio.AI',
  description: 'Manage and publish your AI-powered portfolio.',
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#040817] text-slate-100 flex">
      {/* Fixed sidebar — renders as a client component internally */}
      <DashboardSidebar />

      {/* Main scrollable area, offset by sidebar width on desktop */}
      <main className="flex-1 min-h-screen lg:ml-64 transition-all duration-300">
        <div className="relative min-h-screen">
          {/* Ambient gradient blobs */}
          <div className="pointer-events-none fixed inset-0 overflow-hidden z-0" aria-hidden>
            <div
              className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-[0.04]"
              style={{
                background:
                  'radial-gradient(circle at center, #6366f1 0%, transparent 70%)',
                filter: 'blur(80px)',
              }}
            />
            <div
              className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full opacity-[0.03]"
              style={{
                background:
                  'radial-gradient(circle at center, #8b5cf6 0%, transparent 70%)',
                filter: 'blur(60px)',
              }}
            />
          </div>

          {/* Page content */}
          <div className="relative z-10">{children}</div>
        </div>
      </main>
    </div>
  );
}
