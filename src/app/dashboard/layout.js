import DashboardSibebar from "@/components/dashboard/DashboardSibdbar";
import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex">
      <DashboardSibebar className="flex-1"></DashboardSibebar>
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default DashboardLayout;
