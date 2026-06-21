"use client";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/dashboard/DashboardSibdbar";
import { authClient } from "@/lib/auth-client";
import React, { useState } from "react";

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data } = authClient.useSession();
  const user = data?.user;
  return (
    <div className="min-h-screen bg-[#FCF9F6] dark:bg-[#1E1C18] flex">
      <DashboardSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      ></DashboardSidebar>
      <div className="flex-1 min-w-0">
        <DashboardNavbar
          user={user}
          onMenuToggle={() => setSidebarOpen(true)}
        ></DashboardNavbar>
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
