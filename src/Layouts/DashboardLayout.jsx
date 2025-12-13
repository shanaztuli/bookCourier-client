import React from "react";
import { Outlet } from "react-router";
import Sidebar from "../Components/Dashboard/Sidebar/SideBar";
import useRole from "../hooks/useRole";
import LoadingSpinner from "../Components/LoadingSpinner";


const DashboardLayout = () => {
  const [role, isRoleLoading] = useRole();
if (isRoleLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <Sidebar role={role} />

      {/* Main content */}
      <div className="flex-1 p-6 md:ml-64">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
