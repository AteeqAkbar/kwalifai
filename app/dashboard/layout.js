// app/dashboard/layout.js
import { ClerkProvider } from "@clerk/nextjs";
import DashboardHeader from "@/components/DashboardHeader";

export default function DashboardLayout({ children }) {
  return (
    <ClerkProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <DashboardHeader />

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </div>
    </ClerkProvider>
  );
}
