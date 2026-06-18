import DashboardSibebar from "@/components/dashboard/DashboardSibdbar";
import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex">
      <DashboardSibebar></DashboardSibebar>
      <main>{children}</main>
    </div>
  );
};

export default DashboardLayout;
